import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // penting biar path static benar di Netlify
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
