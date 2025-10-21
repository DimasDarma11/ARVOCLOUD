import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc';
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
  ],
  optimizeDeps: {
    include: ["lucide-react", "framer-motion", "react", "react-dom"],
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "lucide-react", "framer-motion"],
        },
      },
    },
  },
});
