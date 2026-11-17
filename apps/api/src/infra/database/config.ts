import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { PoolConfig } from 'pg'

export function databaseUrl(value: string) {
  let url: URL
  try { url = new URL(value) } catch { throw new Error('DATABASE_URL must be a valid PostgreSQL URL') }
  if (!['postgres:', 'postgresql:'].includes(url.protocol)) throw new Error('DATABASE_URL must use postgresql://')
  if (/YOUR[-_]PASSWORD|REPLACE_ME/i.test(decodeURIComponent(url.password))) throw new Error('Replace the database password placeholder in DATABASE_URL')
  return url
}

const supabase = (url: URL) => /\.(supabase\.co|supabase\.com)$/.test(url.hostname)
// apps/api/certs: src/infra/database/ và dist/infra/database/ đều cách thư mục gốc 3 cấp
const caPath = () => process.env.DATABASE_CA_CERT ?? fileURLToPath(new URL('../../../certs/supabase-ca.crt', import.meta.url))

export function databaseConfig(value: string, options: { schema?: string; max?: number } = {}): PoolConfig {
  const url = databaseUrl(value)
  const max = options.max ?? Number(process.env.DATABASE_POOL_MAX ?? 5)
  if (!Number.isInteger(max) || max < 1 || max > 20) throw new Error('DATABASE_POOL_MAX must be an integer between 1 and 20')
  const config: PoolConfig = {
    max,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
    statement_timeout: 15_000,
  }
  if (options.schema) {
    if (!/^[a-z_][a-z0-9_]*$/.test(options.schema)) throw new Error('Invalid database schema')
    config.options = `-c search_path=${options.schema}`
  }
  if (supabase(url)) {
    // pg URL SSL options override the explicit TLS object; always verify CA and hostname.
    for (const key of ['sslmode', 'ssl', 'sslrootcert', 'sslcert', 'sslkey', 'uselibpqcompat']) url.searchParams.delete(key)
    config.ssl = { rejectUnauthorized: true, ca: readFileSync(caPath(), 'utf8') }
  }
  config.connectionString = url.toString()
  return config
}

export function migrationUrl(value: string) {
  const url = databaseUrl(value)
  if (supabase(url)) {
    if (url.hostname.endsWith('.pooler.supabase.com') && url.port === '6543') {
      throw new Error('DIRECT_URL must use a direct connection or session pooler (5432) for migrations')
    }
    url.searchParams.set('sslmode', 'verify-full')
    url.searchParams.set('sslrootcert', caPath())
    url.searchParams.delete('pgbouncer')
  }
  return url.toString()
}
