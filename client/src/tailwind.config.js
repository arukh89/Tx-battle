/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",   // ✅ fix: definisi warna border
        background: "#ffffff",
        foreground: "#111827",
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#6b7280",
          foreground: "#ffffff",
        },
      },
      borderColor: {
        DEFAULT: "#e5e7eb",
      },
    },
  },
  plugins: [],
}
