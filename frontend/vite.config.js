import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),  // Enables Tailwind CSS integration
  react(),  // Enables React support (JSX, Fast Refresh, etc.)
], 
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",  // backend URL and port
      },
    },
  },

})