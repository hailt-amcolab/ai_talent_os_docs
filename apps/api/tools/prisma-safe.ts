import 'dotenv/config'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import pg from 'pg'
import { databaseConfig, migrationUrl } from '../src/infra/database/config.ts'

// Schema-generation commands must discover the complete provider-owned namespace,
// not only auth.users. Never read Auth row data or print connection credentials.
const args = process.argv.slice(2)
const allowed = (args[0] === 'migrate' && ['dev', 'diff'].includes(args[1] ?? ''))
  || (args[0] === 'db' && args[1] === 'pull' && args.includes('--print'))
if (!allowed) throw new Error('Use safe migrate dev/diff or db pull --print only')
const connection = process.env.DIRECT_URL
if (!connection) throw new Error('DIRECT_URL required for schema planning; never use runtime credentials')
const db = new pg.Client(databaseConfig(migrationUrl(connection)))
let inventory: { tables: string[]; enums: string[] }
try {
  await db.connect()
  const tables = await db.query<{ name: string }>(`
    SELECT n.nspname || '.' || c.relname AS name
    FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='auth' AND c.relkind IN ('r','p','v','m','f') ORDER BY 1
  `)
  const enums = await db.query<{ name: string }>(`
    SELECT n.nspname || '.' || t.typname AS name
    FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace
    WHERE n.nspname='auth' AND t.typtype='e' ORDER BY 1
  `)
  inventory = { tables: tables.rows.map((r) => r.name), enums: enums.rows.map((r) => r.name) }
  if (!inventory.tables.includes('auth.users')) throw new Error('AUTH_USERS_REQUIRED')
} catch {
  throw new Error('AUTH_SCHEMA_INVENTORY_FAILED: check DIRECT_URL, TLS and catalog access; no migration generated')
} finally {
  await db.end()
}
const result = spawnSync(process.execPath, [fileURLToPath(new URL('../node_modules/prisma/build/index.js', import.meta.url)), ...args], {
  cwd: fileURLToPath(new URL('..', import.meta.url)),
  env: { ...process.env, PRISMA_AUTH_INVENTORY_JSON: JSON.stringify(inventory) },
  stdio: 'inherit',
})
if (result.error) throw new Error('PRISMA_SAFE_START_FAILED')
process.exitCode = result.status ?? 1
