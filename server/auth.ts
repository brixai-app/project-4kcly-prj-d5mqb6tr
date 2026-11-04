import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';
import { db } from './db';

export const auth = betterAuth({
  baseURL: typeof process !== 'undefined' && process.env?.BETTER_AUTH_URL ? process.env.BETTER_AUTH_URL : undefined,
  secret: 'brix-dev-secret-key-32-characters-long',
  trustedOrigins: [
    'http://localhost:*',
    'http://127.0.0.1:*',
    'https://*.webcontainer-api.io',
    'https://*.local-credentialless.webcontainer-api.io',
    'https://*.webcontainer.io',
    'https://*.brixai.app',
    'https://brixai.app',
    'https://*.vercel.app',
  ],
  advanced: {
    trustedProxyHeaders: true
  },
  database: memoryAdapter({
    user: [],
    session: [],
    account: [],
    verification: [],
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user: any) => {
          try {
            await db.execute({
              sql: 'INSERT OR REPLACE INTO user (id, name, email, emailVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
              args: [
                user.id,
                user.name || '',
                user.email,
                user.emailVerified ? 1 : 0,
                user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString(),
                user.updatedAt ? new Date(user.updatedAt).toISOString() : new Date().toISOString()
              ]
            });
          } catch (e) {
            console.error('[auth] Failed to persist user to SQLite:', e);
          }
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      name: {
        type: 'string',
        required: false,
      },
    },
  },
});

export default auth;
