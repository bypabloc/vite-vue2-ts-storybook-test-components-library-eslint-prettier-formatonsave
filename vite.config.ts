import { defineConfig } from 'vite'
// import eslintPlugin from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue2'
import { resolve as pathResolve } from 'path'

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
})
