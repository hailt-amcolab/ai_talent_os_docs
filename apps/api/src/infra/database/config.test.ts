import { test } from 'node:test'
import assert from 'node:assert/strict'
import { databaseConfig, databaseUrl, migrationUrl } from './config.ts'

test('Supabase runtime connections enforce CA and hostname verification', () => {
  const config = databaseConfig('postgresql://user:encoded%40password@aws-0-example.pooler.supabase.com:6543/postgres?sslmode=disable&ssl=false')
  assert.equal(config.max, 5)
  assert.equal(config.connectionTimeoutMillis, 10_000)
  assert.ok(typeof config.ssl === 'object' && config.ssl.rejectUnauthorized)
  assert.ok(typeof config.ssl === 'object' && config.ssl.ca)
  const url = new URL(config.connectionString!)
  assert.equal(url.password, 'encoded%40password')
  assert.equal(url.searchParams.has('sslmode'), false)
  assert.equal(url.searchParams.has('ssl'), false)
})

test('migration connections use direct or session mode and verify-full', () => {
  assert.throws(() => migrationUrl('postgresql://user:password@aws-0-example.pooler.supabase.com:6543/postgres'), /session pooler/)
  const url = new URL(migrationUrl('postgresql://user:password@aws-0-example.pooler.supabase.com:5432/postgres'))
  assert.equal(url.searchParams.get('sslmode'), 'verify-full')
  assert.match(url.searchParams.get('sslrootcert')!, /supabase-ca.crt$/)
})

test('local PostgreSQL stays usable without TLS and malformed configuration fails without leaking secrets', () => {
  assert.equal(databaseConfig('postgresql://talent:local@localhost:5433/talent').ssl, undefined)
  assert.throws(() => databaseUrl('postgresql://user:[YOUR-PASSWORD]@localhost:5432/test'), /placeholder/)
  assert.throws(() => databaseUrl('not-a-url'), /valid PostgreSQL/)
  assert.throws(() => databaseConfig('postgresql://user:password@localhost/db', { schema: 'public;DROP TABLE x' }), /Invalid database schema/)
  assert.throws(() => databaseConfig('postgresql://user:password@localhost/db', { max: 0 }), /DATABASE_POOL_MAX/)
})
