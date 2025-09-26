import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config diperbaiki agar build output konsisten dan dev proxy ke backend Replit.
// Perubahan ini minimal: menetapkan base ./, outDir 'dist', dan proxy '/api' untuk dev.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://eb0cfc01-fe64-4864-b040-a73e372b5e93-00-1lhwoxp54udnj.kirk.replit.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
