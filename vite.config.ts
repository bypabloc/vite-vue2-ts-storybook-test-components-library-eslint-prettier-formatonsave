import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve as pathResolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: pathResolve(pathResolve(__dirname), 'src') + '/$1'
      }
    ]
  }
})
