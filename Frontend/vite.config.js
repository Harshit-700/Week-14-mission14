import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,   // accessible on local network
    open: true,   // auto-opens browser on npm run dev
    proxy: {
      // LOCAL DEV ONLY — proxies /api/* → Express backend on :5000
      // In production (Vercel), set VITE_API_URL env var instead.
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});