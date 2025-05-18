import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // абсолютный базовый URL — все пути к скриптам будут начинаться с "/"
  base: '/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // удобный алиас для импортов
    },
  },

  build: {
    // куда положить готовую сборку
    outDir: 'dist',
    // как назвать папку для ассетов внутри outDir
    assetsDir: 'assets',

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // дефолтное разделение на чанки, просто задаём шаблоны имён
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
