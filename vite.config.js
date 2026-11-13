import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' works on any GitHub Pages repo name (username.github.io/<repo>/)
export default defineConfig({
  plugins: [react()],
  base: './',
});
