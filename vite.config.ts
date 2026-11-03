import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const adminDbPlugin = () => ({
  name: 'admin-db-plugin',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url || '';
      if (url.startsWith('/api/_admin/db')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(url.includes('/table/') ? { columns: [], rows: [] } : { tables: [] }));
        return;
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), adminDbPlugin()],
  server: { host: true, port: 5173, strictPort: true, cors: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})