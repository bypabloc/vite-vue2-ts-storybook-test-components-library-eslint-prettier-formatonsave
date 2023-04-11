import { defineConfig } from 'vite'
// import eslintPlugin from 'vite-plugin-eslint'
import { resolve as pathResolve } from 'path'
import { configDefaults } from 'vitest/config'
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
})
