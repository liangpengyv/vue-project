import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        {
          src: './node_modules/libpag/lib/libpag.wasm',
          dest: process.env.NODE_ENV === 'production' ? 'dist/' : 'public/',
        },
      ],
      hook: process.env.NODE_ENV === 'production' ? 'writeBundle' : 'buildStart',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
