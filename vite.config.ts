import { defineConfig } from 'vite'
import { resolve as pathResolve } from 'path'

// import eslintPlugin from 'vite-plugin-eslint'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue2'


// https://vitejs.dev/config/#build-lib
// https://vitejs.dev/guide/env-and-mode.html
// https://vitejs.dev/config/build-options.html

export default defineConfig(({ command, mode, ssrBuild }) => {
  const modes = {
    default: () => ({
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
        environment: 'happy-dom',
        globals: true,
        exclude: [
          ...configDefaults.exclude,
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/lib/**',
          '**/public/**',
          '**/.{idea,git,cache,output,temp}/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        ],
        include: [
          ...configDefaults.include,
          './src/**/*.{spec,test}.{js,jsx,ts,tsx,vue}',
        ],
      },
    }),
    library: () => ({
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
        environment: 'happy-dom',
        globals: true,
        exclude: [
          ...configDefaults.exclude,
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/lib/**',
          '**/public/**',
          '**/.{idea,git,cache,output,temp}/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        ],
        include: [
          ...configDefaults.include,
          './src/**/*.{spec,test}.{js,jsx,ts,tsx,vue}',
        ],
      },
      build: {
        commonjsOptions: {
          esmExternals: true,
        },
        // Output compiled files to /dist.
        cssCodeSplit: true,
        outDir: './lib',
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: pathResolve(__dirname, 'src/library.ts'),
          name: 'MyLib',
          // the proper extensions will be added
          fileName: 'index',
          formats: ['es', 'cjs', 'umd'],
        },
        rollupOptions: {
          // make sure to externalize deps that shouldn't be bundled
          // into your library
          external: ['vue'],
          output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    }),
  }
  const modeFn = modes[mode] || modes.default
  return modeFn()
})
