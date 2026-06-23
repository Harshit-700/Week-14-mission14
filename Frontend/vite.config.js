import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,          // makes it accessible on local network too
    open: true,          // auto-opens browser on npm run dev
    proxy: {
      // All /api/* calls → Express backend on :5000
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
