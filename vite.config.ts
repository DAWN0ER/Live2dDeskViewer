import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {ElectronDevPlugin} from './plugins/vite.electron.dev'
import {ElectronBuildPlugin} from './plugins/vite.electron.build'
import renderer from 'vite-plugin-electron-renderer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    ElectronDevPlugin(),
    ElectronBuildPlugin(),
    renderer(),
  ],
  base:'./',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
