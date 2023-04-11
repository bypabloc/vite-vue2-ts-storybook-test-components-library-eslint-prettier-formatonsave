import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve as pathResolve } from 'path'

export default defineConfig({
  plugins: [vue()],
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
