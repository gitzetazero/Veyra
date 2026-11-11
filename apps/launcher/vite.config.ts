// SPDX-License-Identifier: GPL-3.0-only
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Tauri serves the built files from `dist`; in development it loads this dev server.
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: { port: 1420, strictPort: true },
  build: { target: 'es2022', outDir: 'dist' },
});
