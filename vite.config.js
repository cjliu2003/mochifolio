import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative asset URLs so the build works from any path (test hosts, subfolders).
  base: './',
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3000' } },
})
