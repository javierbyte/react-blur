import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from javier.xyz/react-blur via a vercel rewrite to
// javierbyte.github.io/react-blur.
export default defineConfig({
  base: '/react-blur/',
  plugins: [react()],
  build: { outDir: 'dist' }
});
