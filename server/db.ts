import { createClient } from '@libsql/client';

export const db = createClient({
  url: 'file:local.db',
});

export async function initDb() {
  try {
    await db.execute(`CREATE TABLE "categories" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL
);`);
    await db.execute(`CREATE TABLE "orders" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "total" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'completed' CHECK ("status" IN ('pending', 'processing', 'completed', 'cancelled')),
  "customerName" TEXT,
  "customerEmail" TEXT,
  "items" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
);`);
    await db.execute(`CREATE TABLE "products" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "price" INTEGER NOT NULL,
  "category" TEXT DEFAULT 'General',
  "image" TEXT,
  "tag" TEXT
);`);
    await db.execute(`CREATE TABLE "order_items" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "orderId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "unitPrice" INTEGER NOT NULL,
  FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);`);
    await db.execute(`CREATE INDEX IF NOT EXISTS "idx_categories_name" ON "categories" ("name");`);
    await db.execute(`CREATE INDEX IF NOT EXISTS "idx_orders_createdAt" ON "orders" ("createdAt");`);
    await db.execute(`CREATE INDEX IF NOT EXISTS "idx_products_name" ON "products" ("name");`);
    await db.execute(`CREATE INDEX IF NOT EXISTS "idx_order_items_order" ON "order_items" ("orderId");`);
    console.log('[server/db] SQLite schema initialized successfully.');
  } catch (err) {
    console.error('[server/db] Schema initialization failed:', err);
    throw err;
  }
}

export async function inspectTables(): Promise<Array<{ name: string; count: number; isAuth: boolean }>> {
  const res = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
  const authSet = new Set(['user', 'session', 'account', 'verification']);
  const result = [];
  for (const r of res.rows) {
    const name = String((r as any).name || (r as any)[0]);
    const cnt = await db.execute(`SELECT COUNT(*) as count FROM "${name}"`);
    result.push({ name, count: Number((cnt.rows[0] as any).count || 0), isAuth: authSet.has(name) });
  }
  return result;
}

export async function getTableData(name: string) {
  const info = await db.execute(`PRAGMA table_info("${name}")`);
  const columns = info.rows.map((r: any) => ({ name: String(r[1]), type: String(r[2] || ''), pk: Number(r[5]) > 0 }));
  const data = await db.execute(`SELECT * FROM "${name}" LIMIT 200`);
  const rows = data.rows.map((r: any) => Object.fromEntries(data.columns.map((col, i) => [col, r[i]])));
  return { columns, rows };
}

export default db;
