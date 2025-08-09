import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({ target: 'netlify', customViteReactPlugin: true }),
    viteReact(),
  ],
})