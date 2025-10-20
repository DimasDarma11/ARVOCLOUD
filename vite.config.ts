import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, 
    }),
  ],

  optimizeDeps: {
    include: ['lucide-react', 'framer-motion', 'react', 'react-dom'],
  },

  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 2000, 
    rollupOptions: {
      output: {
        manualChunks: undefined, 
      },
    },
  },
});
