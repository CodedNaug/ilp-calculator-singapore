import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = 'ilp_app'

export default defineConfig({
  plugins: [react()],
  base,
})
