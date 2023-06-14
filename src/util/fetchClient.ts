type FetchClientConfig = {
  baseUrlId: string,
  baseUrls: { [key: string]: string },
  authToken?: string,
  authTokenKey?: string,
  headers?: HeadersInit,
  timeout?: number,
  cacheLifetime?: number,
};

type FetchClientResponseType = 'json' | 'blob';

type FetchClientRequest = {
  url: string,
  params?: { [key: string]: string },
  body?: { [key: string]: any },
  responseType?: FetchClientResponseType,
  options?: RequestInit,
}

class FetchClient {
  private baseUrls: { [key: string]: string };
  private baseUrlId: string;
  private baseUrl: string;
  private authToken: string | undefined;
  private authTokenKey: string;
  private headers: HeadersInit;
  private timeout: number;
  private cacheLifetime: number | undefined;
  private requestInterceptors: ((request: RequestInit) => RequestInit)[];
  private responseInterceptors: ((response: Response) => Response)[];

  constructor(config: FetchClientConfig) {
    this.baseUrls = config.baseUrls;
    this.baseUrlId = config.baseUrlId;
    this.baseUrl = this.getBaseUrl();
    this.authToken = config.authToken;
    this.authTokenKey = config.authTokenKey || 'Authorization';
    this.headers = config.headers || {};
    this.timeout = config.timeout || 0;
    this.cacheLifetime = config.cacheLifetime;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  private responseHandlers = {
    'json': async (response: Response) => response.json(),
    'blob': async (response: Response) => {
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
  };

  private async fetch(url: string, options: RequestInit = {}, responseType: FetchClientResponseType): Promise<any> {

    const responseHandler = this.responseHandlers?.[responseType];

    if (!responseHandler) {
      throw new Error(`Invalid response type: ${responseType}`);
    }

    this.setHeaders(options);
    let config = {
      ...options,
      ...this.headers,
    };
    this.requestInterceptors.forEach((interceptor) => {
      config = interceptor(config);
    });

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);

    const requestKey = `${url}${JSON.stringify(options)}`;

    // Cache lookup
    if (this.cacheLifetime) {
      try {
        const cached = await this.getCachedRequest(requestKey);
        if (cached) {
          let { data: response, timestamp } = cached;
          if (Date.now() - timestamp < this.cacheLifetime) {

            response = await responseHandler(response);
        
            this.responseInterceptors.forEach((interceptor) => {
              response = interceptor(response);
            });
            return response;
          }
        }
      } catch (e) {
        // Fall back to localStorage if IndexedDB is not available
        const cached = localStorage.getItem(requestKey);
        if (cached) {
          let { data: response, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < this.cacheLifetime) {
            response = await responseHandler(response);
        
            this.responseInterceptors.forEach((interceptor) => {
              response = interceptor(response);
            });
            return response;
          }
        }
      }
    }

    const requestUrl = `${this.baseUrl}${url}`;

    const request = new Request(requestUrl, config);

    if (this.timeout) {
      setTimeout(() => controller.abort(), this.timeout);
    }
    
    let response: Response;
    try {
      response = await fetch(request, {
        ...options,
        headers: this.headers,
        signal: controller.signal,
      });
    } catch (e: any) {
      if (e.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      if (e.name === 'TypeError' && e.message.includes('Failed to fetch')) {
        throw new Error('CORS Error: Failed to fetch');
      }
      throw e;
    }

    clearTimeout(id);
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    response = await responseHandler(response);

    // Cache store
    if (this.cacheLifetime) {
      try {
        await this.cacheRequest(requestKey, { response, timestamp: Date.now() });
      } catch (e) {
        // Fall back to localStorage if IndexedDB is not available
        localStorage.setItem(requestKey, JSON.stringify({ response, timestamp: Date.now() }));
      }
    }

    this.responseInterceptors.forEach((interceptor) => {
      response = interceptor(response);
    });

    return response;
  }

  get(request: FetchClientRequest): Promise<any> {
    const { url, params } = request;
    
    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryString}`;

    return this.fetch(requestUrl, { method: 'GET' }, 'json');
  }

  post(request: FetchClientRequest): Promise<any> {
    const { url, params, body } = request;

    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryString}`;

    return this.fetch(requestUrl, { method: 'POST', body: JSON.stringify(body) }, 'json');
  }

  getFile(request: FetchClientRequest): Promise<any> {
    const { url, params } = request;
    
    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryString}`;

    return this.fetch(requestUrl, { method: 'GET' }, 'blob');
  }

  postFile(request: FetchClientRequest): Promise<any> {
    const { url, params, body, responseType = 'json' } = request;

    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryString}`;

    const formData = new FormData();
    if (body) {
      Object.keys(body).forEach((key: string) => {
        formData.append(key, body[key]);
      });
    }

    return this.fetch(requestUrl, { method: 'POST', body: formData }, responseType);
  }

  useRequestInterceptor(interceptor: (input: RequestInit) => RequestInit): number {
    this.requestInterceptors.push(interceptor);
    return this.requestInterceptors.length - 1;
  }

  ejectRequestInterceptor(id: number) {
    this.requestInterceptors = this.requestInterceptors.filter((_, index) => index !== id);
  }

  useResponseInterceptor(interceptor: (input: Response) => Response): number {
    this.responseInterceptors.push(interceptor);
    return this.responseInterceptors.length - 1;
  }

  ejectResponseInterceptor(id: number) {
    this.responseInterceptors = this.responseInterceptors.filter((_, index) => index !== id);
  }

  private getBaseUrl(): string {
    return this.baseUrls[this.baseUrlId];
  }

  private setHeaders(options: RequestInit) {
    if (this.authToken) {
      options.headers = {
        ...options.headers,
        [this.authTokenKey]: this.authToken,
      };
    }
    this.headers = {
      ...options.headers,
      ...this.headers,
    };
  }

  setBaseUrl(baseUrlKey: string) {
    if (!this.baseUrls[baseUrlKey]) {
      throw new Error(`La key de la URL base proporcionada "${baseUrlKey}" no está definida.`);
    }
    this.baseUrlId = baseUrlKey;
    this.baseUrl = this.getBaseUrl();
  }

  private async openDb() {
    if (!('indexedDB' in window)) {
      throw new Error('IndexedDB not supported');
    }
  
    return new Promise<IDBDatabase>((resolve, reject) => {
      const openRequest = indexedDB.open('ApiCache', 1);
  
      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;
        if (!db.objectStoreNames.contains('requests')) {
          db.createObjectStore('requests');
        }
      };
  
      openRequest.onerror = () => reject(openRequest.error);
      openRequest.onsuccess = () => resolve(openRequest.result);
    });
  }

  private async cacheRequest(requestKey: string, data: any) {
    const db = await this.openDb();
    const tx = db.transaction('requests', 'readwrite');
    const store = tx.objectStore('requests');

    store.put({ data, timestamp: Date.now() }, requestKey);

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve( data );
        tx.onerror = () => reject(tx.error);
    });
  }

  private async getCachedRequest(requestKey: string) : Promise<any> {
    const db = await this.openDb();
    const tx = db.transaction('requests', 'readonly');
    const store = tx.objectStore('requests');

    return new Promise((resolve, reject) => {
      const request = store.get(requestKey);
      request.onsuccess = () => resolve(request.result && request.result.data);
      request.onerror = () => reject(request.error);
    });
  }
}

// Primero, creamos una nueva instancia de FetchClient.
const fetchClient = new FetchClient({
  baseUrls: {
    'mt': 'https://markettransaction.dev.desta.cl/api',
    'accounts': 'https://accounts.dev.desta.cl/api',
    'api-gateway': 'https://api.desta.cl',
    'core': 'https://app.dev.desta.cl',
  },
  baseUrlId: 'mt',
  authToken: 'my-token-secret',
  timeout: 60000,  // 1 minuto
  cacheLifetime: 60000,  // 1 minuto
});

// https://dummyjson.com/

// Para hacer una petición GET, podemos usar el método get.
fetchClient.get({
    url: 'ruta/para/get',
    params: { 'key': 'valor' }
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// // Para hacer una petición POST, podemos usar el método post.
// client.post('ruta/para/post', { clave: 'valor' })
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// // Podemos usar el método getFile para obtener un archivo.
// client.getFile('ruta/para/archivo')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// // Para enviar un archivo, podemos usar el método postFile.
// const archivo = new File(['contenido del archivo'], 'mi-archivo.txt');
// client.postFile('ruta/para/postFile', { archivo }, 'blob')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// // Podemos agregar interceptores de solicitudes y respuestas.
// client.addRequestInterceptor(request => {
//   // Hacer algo con la solicitud.
//   return request;
// });

// client.addResponseInterceptor(response => {
//   // Hacer algo con la respuesta.
//   return response;
// });

// // También podemos cambiar la URL base en cualquier momento.
// client.setBaseUrl('api-gateway');
