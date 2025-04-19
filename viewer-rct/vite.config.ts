import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//https://dev.to/rashidshamloo/exporting-declaration-files-in-vitejs-f6m

import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
})
