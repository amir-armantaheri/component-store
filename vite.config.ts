import {fileURLToPath, URL} from 'node:url'
import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: './tsconfig.json', entryRoot: './src' }),],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'vue3-component-store',
      fileName: (format) => `vue3-component-store.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
