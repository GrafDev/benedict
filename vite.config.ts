import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/shared/ui': path.resolve(__dirname, 'src/shared/ui'),
      '@/shared/store': path.resolve(__dirname, 'src/shared/store'),
      '@/shared/hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@/shared/types': path.resolve(__dirname, 'src/shared/types'),
      '@/shared/api': path.resolve(__dirname, 'src/shared/api'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/widgets': path.resolve(__dirname, 'src/widgets'),
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/features': path.resolve(__dirname, 'src/features'),
    },
  }

})
