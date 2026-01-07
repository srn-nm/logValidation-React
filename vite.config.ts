import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
            tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    port: 5174,
    hmr: {
      host: "172.16.20.98",
      port: 5174,
      protocol: "ws",
    },
  },          
})

