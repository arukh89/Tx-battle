import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ URL backend Replit kamu
const BACKEND_URL = "https://eb0cfc01-fe64-4864-b040-a73e372b5e93-00-1lhwoxp54udnj.kirk.replit.dev";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  define: {
    __BACKEND_URL__: JSON.stringify(BACKEND_URL)
  }
});
