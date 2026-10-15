import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'   // nouvelle ligne d'import



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
