
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          navigation: ['@react-navigation/native', '@react-navigation/bottom-tabs'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@react-navigation/native'],
  },
});
