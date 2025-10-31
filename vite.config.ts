// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // falls du React nutzt

export default defineConfig({
  plugins: [react()],
  base: '/ai-btc-solver/', // wichtig für GitHub Pages
})
