import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    devServer({
      entry: 'server/index.ts',
      exclude: [/^(?!\/api).*/],
    }),
  ],
  server: { host: true, port: 5173, strictPort: true, cors: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})