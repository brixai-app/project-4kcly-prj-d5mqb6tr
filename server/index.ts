import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db, initDb, inspectTables, getTableData } from './db';
import { auth } from './auth';

const app = new Hono();

// Global CORS middleware
app.use(
  '/api/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// Initialize SQLite database
initDb().catch((err) => console.error('[server] DB init failed:', err));

// Backend Health & Readiness Check
app.get('/api/health', async (c) => {
  try {
    await initDb();
    await db.execute('SELECT 1');
    return c.json({
      status: 'healthy',
      backend: 'hono',
      database: 'connected',
      timestamp: Date.now()
    });
  } catch (err: any) {
    return c.json({ status: 'unhealthy', error: err?.message || 'Database disconnected' }, 503);
  }
});

// Better Auth endpoint mount
app.all('/api/auth/*', (c) => {
  if (auth && typeof auth.handler === 'function') {
    return auth.handler(c.req.raw);
  }
  if (typeof auth === 'function') {
    return (auth as any)(c.req.raw);
  }
  return c.json({ error: 'Auth handler unavailable' }, 500);
});

// Products API
app.get('/api/products', async (c) => {
  try {
    await initDb();
    const res = await db.execute('SELECT * FROM products');
    return c.json(res.rows);
  } catch (err: any) {
    return c.json({ error: err?.message || 'Failed to fetch products' }, 500);
  }
});

app.post('/api/products', async (c) => {
  try {
    await initDb();
    const body = await c.req.json();
    const id = body.id || ('prod-' + Math.random().toString(36).slice(2, 9));
    const name = body.name || body.title || 'Product';
    const title = body.title || body.name || name;
    const category = body.category || 'All';
    const price = Number(body.price || 0);
    const description = body.description || '';
    const image = body.image || '';
    const alt = body.alt || name;
    const tag = body.tag || (body.featured ? 'FEATURED' : 'NEW ARRIVAL');
    const featured = body.featured ? 1 : 0;
    const inStock = body.inStock !== false ? 1 : 0;

    await db.execute({
      sql: 'INSERT OR REPLACE INTO products (id, name, title, category, price, description, image, alt, tag, featured, inStock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [id, name, title, category, price, description, image, alt, tag, featured, inStock],
    });

    return c.json({ success: true, id });
  } catch (err: any) {
    return c.json({ error: err?.message || 'Failed to save product' }, 500);
  }
});

app.delete('/api/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await db.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id],
    });
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err?.message || 'Failed to delete product' }, 500);
  }
});

// Categories API
app.get('/api/categories', async (c) => {
  try {
    await initDb();
    const res = await db.execute('SELECT DISTINCT category FROM products WHERE category IS NOT NULL');
    const cats = res.rows.map((r: any) => String(r.category || (r as any)[0])).filter(Boolean);
    return c.json(cats.length > 0 ? cats : ['All', 'Tailoring', 'Women', 'Knitwear', 'Accessories']);
  } catch {
    return c.json(['All', 'Tailoring', 'Women', 'Knitwear', 'Accessories']);
  }
});

// Orders API
app.get('/api/orders', async (c) => {
  try {
    await initDb();
    const res = await db.execute('SELECT * FROM orders ORDER BY createdAt DESC LIMIT 50');
    return c.json(res.rows);
  } catch (err: any) {
    return c.json({ error: err?.message || 'Failed to fetch orders' }, 500);
  }
});

app.post('/api/orders', async (c) => {
  try {
    await initDb();
    const body = await c.req.json();
    const id = 'ord-' + Math.random().toString(36).slice(2, 9);
    const items = typeof body.items === 'string' ? body.items : JSON.stringify(body.items || []);
    const total = Number(body.total || 0);
    const customerName = String(body.customerName || 'Guest');
    const customerEmail = String(body.customerEmail || '');
    const createdAt = new Date().toISOString();

    await db.execute({
      sql: 'INSERT INTO orders (id, items, total, status, customerName, customerEmail, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [id, items, total, 'completed', customerName, customerEmail, createdAt],
    });

    return c.json({ success: true, orderId: id });
  } catch (err: any) {
    return c.json({ error: err?.message || 'Failed to create order' }, 500);
  }
});

// Admin DB inspection API
app.get('/api/_admin/db/tables', async (c) => {
  const tables = await inspectTables();
  return c.json({ tables });
});

app.get('/api/_admin/db/table/:name', async (c) => {
  const name = c.req.param('name');
  const data = await getTableData(name);
  return c.json(data);
});

export default app;
