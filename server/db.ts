import { createClient } from '@libsql/client';

export const db = createClient({
  url: 'file:local.db',
});

let initPromise: Promise<void> | null = null;
let isInitialized = false;
let initError: Error | null = null;

export function isDbHealthy(): boolean {
  return isInitialized && !initError;
}

export function getDbInitError(): Error | null {
  return initError;
}

export async function initDb(): Promise<void> {
  if (isInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      await db.execute('PRAGMA foreign_keys = ON;');

      await db.execute(`CREATE TABLE IF NOT EXISTS "categories" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL
);`);
      await db.execute(`CREATE TABLE IF NOT EXISTS "orders" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "total" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'completed' CHECK ("status" IN ('pending', 'processing', 'completed', 'cancelled')),
  "customerName" TEXT,
  "customerEmail" TEXT,
  "items" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
);`);
      await db.execute(`CREATE TABLE IF NOT EXISTS "products" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "price" INTEGER NOT NULL,
  "category" TEXT DEFAULT 'General',
  "image" TEXT,
  "tag" TEXT
);`);
      await db.execute(`CREATE TABLE IF NOT EXISTS "order_items" (
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

      await db.execute(`
        CREATE TABLE IF NOT EXISTS _brix_seeds (
          seed_id TEXT PRIMARY KEY,
          table_name TEXT NOT NULL,
          target_pk TEXT NOT NULL,
          seed_hash TEXT NOT NULL,
          applied_at TEXT NOT NULL
        );
      `);

      const plannedSeeds = [{"seedId":"seed_prod_1","tableName":"products","primaryKeyField":"id","primaryKeyValue":"p1","canonicalHash":"b280ab692a4b0de75b9746e81185d4784deb63b0683986fdc0fe69a285d0b50a","sql":"INSERT INTO \"products\" (\"category\", \"description\", \"id\", \"image\", \"name\", \"price\", \"tag\") VALUES (?, ?, ?, ?, ?, ?, ?);","args":["JACKETS","Stay stylish and warm with this sleek, modern jacket perfect for city life.","p1","https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=800&auto=format&fit=crop","URBAN CHIC JACKET",149,"BESTSELLER"]},{"seedId":"seed_prod_2","tableName":"products","primaryKeyField":"id","primaryKeyValue":"p2","canonicalHash":"3cd8f12ce83854dd76699802bfa684c178fbbc6e633d8844933faa6d51790a5f","sql":"INSERT INTO \"products\" (\"category\", \"description\", \"id\", \"image\", \"name\", \"price\", \"tag\") VALUES (?, ?, ?, ?, ?, ?, ?);","args":["TEES","Soft, durable cotton crewneck tee in versatile colors for everyday wear.","p2","https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800&auto=format&fit=crop","ESSENTIAL CREWNECK TEE",29,"NEW ARRIVAL"]},{"seedId":"seed_prod_3","tableName":"products","primaryKeyField":"id","primaryKeyValue":"p3","canonicalHash":"cc613a4885aed8c4832051fb5d93eae47e4f041e4a8fcbbfa8a785e98884b8ae","sql":"INSERT INTO \"products\" (\"category\", \"description\", \"id\", \"image\", \"name\", \"price\", \"tag\") VALUES (?, ?, ?, ?, ?, ?, ?);","args":["DENIM","Classic denim jeans with a comfortable fit and timeless appeal.","p3","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop","COMFORT FIT DENIM",69,"CLASSIC"]},{"seedId":"seed_prod_4","tableName":"products","primaryKeyField":"id","primaryKeyValue":"p4","canonicalHash":"d0c4bcd3802915e43ecdee0e618b894ea7bbeec6b7c2cd2a9988280beae217c2","sql":"INSERT INTO \"products\" (\"category\", \"description\", \"id\", \"image\", \"name\", \"price\", \"tag\") VALUES (?, ?, ?, ?, ?, ?, ?);","args":["BAGS","Sleek and sturdy leather bag ideal for work and casual outings.","p4","https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop","MINIMALIST LEATHER BAG",120,"FEATURED"]},{"seedId":"seed_prod_5","tableName":"products","primaryKeyField":"id","primaryKeyValue":"p5","canonicalHash":"fa747f9995e22dea1357d31299a651c5504976dc5e883997a50c8513c3d0e6e3","sql":"INSERT INTO \"products\" (\"category\", \"description\", \"id\", \"image\", \"name\", \"price\", \"tag\") VALUES (?, ?, ?, ?, ?, ?, ?);","args":["SNEAKERS","Lightweight sneakers designed for all-day comfort and style.","p5","https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop","CASUAL SNEAKERS",85,"POPULAR"]},{"seedId":"seed_prod_6","tableName":"products","primaryKeyField":"id","primaryKeyValue":"p6","canonicalHash":"3bb21a2a28e71fe94a0500ca4ff6a4e1935d273bae1feb4af6a543332bbcd8e0","sql":"INSERT INTO \"products\" (\"category\", \"description\", \"id\", \"image\", \"name\", \"price\", \"tag\") VALUES (?, ?, ?, ?, ?, ?, ?);","args":["ACCESSORIES","Add a retro touch with our adjustable vintage cotton cap.","p6","https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop","VINTAGE INSPIRED CAP",25,"TRENDING"]}];
      for (const seed of plannedSeeds) {
        try {
          const ledgerCheck = await db.execute({
            sql: 'SELECT 1 FROM _brix_seeds WHERE seed_id = ? LIMIT 1;',
            args: [seed.seedId]
          });
          if (ledgerCheck.rows.length > 0) continue;

          const pkCheck = await db.execute({
            sql: \`SELECT 1 FROM "\${seed.tableName}" WHERE "\${seed.primaryKeyField}" = ? LIMIT 1;\`,
            args: [seed.primaryKeyValue]
          });
          if (pkCheck.rows.length > 0) continue;

          await db.execute({
            sql: seed.sql,
            args: seed.args
          });

          await db.execute({
            sql: 'INSERT INTO _brix_seeds (seed_id, table_name, target_pk, seed_hash, applied_at) VALUES (?, ?, ?, ?, ?);',
            args: [seed.seedId, seed.tableName, String(seed.primaryKeyValue), seed.canonicalHash, new Date().toISOString()]
          });
        } catch (seedErr) {
          console.warn(\`[server/db] Seed item \${seed.seedId} skipped or failed:\`, seedErr);
        }
      }

      isInitialized = true;
      initError = null;
      console.log('[server/db] SQLite schema and seeds initialized successfully.');
    } catch (err: any) {
      initError = err;
      console.error('[server/db] Schema initialization failed:', err);
      throw err;
    } finally {
      if (!isInitialized) {
        initPromise = null;
      }
    }
  })();

  return initPromise;
}

export async function inspectTables(): Promise<Array<{ name: string; count: number; isAuth: boolean }>> {
  await initDb();
  const res = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
  const authSet = new Set(['user', 'session', 'account', 'verification']);
  const result = [];
  for (const r of res.rows) {
    const name = String((r as any).name || (r as any)[0]);
    const cnt = await db.execute(\`SELECT COUNT(*) as count FROM "\${name}"\`);
    result.push({ name, count: Number((cnt.rows[0] as any).count || 0), isAuth: authSet.has(name) });
  }
  return result;
}

export async function getTableData(name: string) {
  await initDb();
  const info = await db.execute(\`PRAGMA table_info("\${name}")\`);
  const columns = info.rows.map((r: any) => ({ name: String(r[1]), type: String(r[2] || ''), pk: Number(r[5]) > 0 }));
  const data = await db.execute(\`SELECT * FROM "\${name}" LIMIT 200\`);
  const rows = data.rows.map((r: any) => Object.fromEntries(data.columns.map((col, i) => [col, r[i]])));
  return { columns, rows };
}

export default db;
