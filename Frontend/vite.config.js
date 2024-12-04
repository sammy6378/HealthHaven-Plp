import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: false, // Disable source maps in development
},
  server: {
    proxy: {
      '/api': {
        target: 'https://tel-med-application.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/auth': { // Adding proxy for /auth route
        target: 'https://tel-med-application.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, 'auth')
      }
    }
  }
})
