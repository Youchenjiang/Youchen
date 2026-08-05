// ViteJS configuration for Youchen portfolio SPA
// Docs: https://vitejs.dev/config/
import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [reactPlugin()],
  // Base path must match the GitHub Pages repository subpath
  base: '/Youchen/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
