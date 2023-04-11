import { defineConfig } from 'vite'
// import eslintPlugin from 'vite-plugin-eslint'
import { resolve as pathResolve } from 'path'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // eslintPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: pathResolve(pathResolve(__dirname), 'src') + '/$1',
      },
    ],
  },
  server: {
    port: 3000,
  },
  test: {
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',

    // enable jest-like global test APIs
    globals: true,
  },
})
