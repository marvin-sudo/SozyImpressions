import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// Plugin to ensure compatibility with host platforms expecting 'build' (React preset) or 'dist' (Vite preset)
function copyToBuildDir() {
  return {
    name: 'copy-to-build-dir',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const buildDir = path.resolve(process.cwd(), 'build');
      try {
        if (fs.existsSync(distDir)) {
          fs.cpSync(distDir, buildDir, { recursive: true, force: true });
        }
      } catch (err) {
        console.warn('Could not mirror dist to build directory:', err);
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyToBuildDir(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
});

