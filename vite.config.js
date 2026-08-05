import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mission-control/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.le-systeme-solaire.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
