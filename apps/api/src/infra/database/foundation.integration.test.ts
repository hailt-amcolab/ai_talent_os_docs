import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import pg from 'pg'
import { databaseConfig } from './config.ts'
import { connectDatabase } from './client.ts'

// Explicit disposable DB only. This suite never reads DATABASE_URL or .env.
const testUrl = process.env.TEST_DATABASE_URL
const apiRoot = fileURLToPath(new URL('../../../', import.meta.url))

test('Prisma blocks schema planning without complete provider inventory', () => {
  const result = spawnSync(process.execPath, ['node_modules/prisma/build/index.js', 'migrate', 'diff', '--from-empty', '--to-schema', 'prisma/schema.prisma'], {
    cwd: apiRoot,
    env: { ...process.env, DIRECT_URL: 'postgresql://invalid@127.0.0.1:1/not_connected', PRISMA_AUTH_INVENTORY_JSON: '' },
    encoding: 'utf8',
  })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /complete Auth namespace must be external/)
})

test('foundation SQL invariants, capability ACLs and deferred feature gates', { skip: !testUrl }, async () => {
  const db = new pg.Client(databaseConfig(testUrl!))
  await db.connect()
  try {
    // psql-only echo is omitted; transaction contains all fixtures and rolls back.
    const sql = (await readFile(new URL('../../../prisma/tests/confirmed-scope.sql', import.meta.url), 'utf8'))
      .split('\n').filter((line) => !line.startsWith('\\')).join('\n')
    await db.query(sql)
  } finally {
    await db.query('ROLLBACK')
    await db.end()
  }
})

test('real Auth FK serializes concurrent deletion and provisioning', { skip: !testUrl }, async () => {
  const owner = new pg.Client(databaseConfig(testUrl!))
  const writer = new pg.Client(databaseConfig(testUrl!))
  const deleter = new pg.Client(databaseConfig(testUrl!))
  const userId = randomUUID()
  await Promise.all([owner.connect(), writer.connect(), deleter.connect()])
  try {
    await owner.query('INSERT INTO auth.users(id) VALUES ($1)', [userId])
    await writer.query('BEGIN')
    await writer.query("INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES ($1,'talent')", [userId])
    const pid = (await deleter.query<{ pid: number }>('SELECT pg_backend_pid() AS pid')).rows[0]!.pid
    // Attach the rejection handler before committing the blocking transaction.
    const deletion = deleter.query('DELETE FROM auth.users WHERE id=$1', [userId])
      .then(() => ({ code: 'unexpected-success' }), (error: { code: string }) => error)
    const deadline = Date.now() + 3_000
    let blocked = false
    while (Date.now() < deadline) {
      blocked = (await owner.query<{ blocked: boolean }>('SELECT cardinality(pg_blocking_pids($1))>0 AS blocked', [pid])).rows[0]!.blocked
      if (blocked) break
      await new Promise((resolve) => setTimeout(resolve, 20))
    }
    assert.equal(blocked, true, 'DELETE must wait for the FK key-share lock')
    await writer.query('COMMIT')
    assert.equal((await deletion).code, '23503')
    const orphan = await owner.query('SELECT 1 FROM app_private.auth_principals p LEFT JOIN auth.users u ON u.id=p.auth_user_id WHERE p.auth_user_id=$1 AND u.id IS NULL', [userId])
    assert.equal(orphan.rowCount, 0)
  } finally {
    await writer.query('ROLLBACK')
    await owner.query('DELETE FROM app_private.auth_principals WHERE auth_user_id=$1', [userId])
    await owner.query('DELETE FROM auth.users WHERE id=$1', [userId])
    await Promise.all([owner.end(), writer.end(), deleter.end()])
  }
})

test('two writers using expected version cannot both change the same application', { skip: !testUrl }, async () => {
  const a = new pg.Client(databaseConfig(testUrl!))
  const b = new pg.Client(databaseConfig(testUrl!))
  const id = randomUUID()
  await Promise.all([a.connect(), b.connect()])
  try {
    await a.query("INSERT INTO public.talent_applications(id,display_name,email,birth_date) VALUES ($1,'before',$2,'2000-01-01')", [id, `${id}@example.test`])
    const sql = 'UPDATE public.talent_applications SET display_name=$2,version=version+1 WHERE id=$1 AND version=1'
    const results = await Promise.all([a.query(sql, [id, 'first']), b.query(sql, [id, 'second'])])
    assert.deepEqual(results.map((r) => r.rowCount).sort(), [0, 1])
    assert.equal((await a.query('SELECT version FROM public.talent_applications WHERE id=$1', [id])).rows[0].version, 2)
  } finally {
    await a.query('DELETE FROM public.talent_applications WHERE id=$1', [id])
    await Promise.all([a.end(), b.end()])
  }
})

test('outbox rollback, claim exclusion and stale lease fencing', { skip: !testUrl }, async () => {
  const a = new pg.Client(databaseConfig(testUrl!))
  const b = new pg.Client(databaseConfig(testUrl!))
  const operation = randomUUID()
  const event = randomUUID()
  const token = randomUUID()
  await Promise.all([a.connect(), b.connect()])
  try {
    const createOperation = "INSERT INTO app_private.domain_operations(id,operation_key,kind,payload_hash) VALUES ($1,$2,'talent.notify',repeat('a',64))"
    await a.query('BEGIN')
    await a.query(createOperation, [operation, operation])
    await a.query("INSERT INTO app_private.outbox_events(id,operation_id,generation,event_type) VALUES ($1,$2,1,'notification.push')", [event, operation])
    await a.query('ROLLBACK')
    assert.equal((await b.query('SELECT id FROM app_private.outbox_events WHERE id=$1', [event])).rowCount, 0)
    await a.query(createOperation, [operation, operation])
    await a.query("INSERT INTO app_private.outbox_events(id,operation_id,generation,event_type) VALUES ($1,$2,1,'notification.push')", [event, operation])
    await a.query('BEGIN')
    assert.equal((await a.query('SELECT id FROM app_private.outbox_events WHERE id=$1 FOR UPDATE SKIP LOCKED', [event])).rowCount, 1)
    assert.equal((await b.query('SELECT id FROM app_private.outbox_events WHERE id=$1 FOR UPDATE SKIP LOCKED', [event])).rowCount, 0)
    await a.query("UPDATE app_private.outbox_events SET state='leased',lease_token=$2,lease_until=now()+interval '1 minute',attempts=attempts+1 WHERE id=$1", [event, token])
    await a.query('COMMIT')
    const finish = "UPDATE app_private.outbox_events SET state='done',lease_token=NULL,lease_until=NULL WHERE id=$1 AND state='leased' AND lease_token=$2"
    assert.equal((await b.query(finish, [event, randomUUID()])).rowCount, 0)
    assert.equal((await b.query(finish, [event, token])).rowCount, 1)
  } finally {
    await a.query('ROLLBACK')
    await a.query('DELETE FROM app_private.outbox_events WHERE operation_id=$1', [operation])
    await a.query('DELETE FROM app_private.domain_operations WHERE id=$1', [operation])
    await Promise.all([a.end(), b.end()])
  }
})

test('API startup refuses the migration owner as runtime identity', { skip: !testUrl }, async () => {
  await assert.rejects(connectDatabase(testUrl!), /DATABASE_RUNTIME_ROLE_REQUIRED/)
})

test('safe Prisma diff preserves unmodeled provider Auth tables and enums', { skip: !testUrl }, async () => {
  const owner = new pg.Client(databaseConfig(testUrl!))
  const suffix = randomUUID().replaceAll('-', '')
  const name = `auth.boundary_${suffix}`
  const enumName = `auth.enum_${suffix}`
  await owner.connect()
  try {
    await owner.query(`CREATE TYPE ${enumName} AS ENUM ('sample')`)
    await owner.query(`CREATE TABLE ${name}(id uuid PRIMARY KEY, kind ${enumName})`)
    const result = spawnSync(process.execPath, ['tools/prisma-safe.ts', 'migrate', 'diff', '--from-config-datasource', '--to-schema', 'prisma/schema.prisma', '--script'], {
      cwd: apiRoot,
      env: { ...process.env, DIRECT_URL: testUrl!, PRISMA_AUTH_INVENTORY_JSON: '' },
      encoding: 'utf8',
    })
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /This is an empty migration/)
    assert.doesNotMatch(result.stdout, /DROP TABLE|DROP TYPE|ALTER TABLE/)
  } finally {
    await owner.query(`DROP TABLE IF EXISTS ${name}`)
    await owner.query(`DROP TYPE IF EXISTS ${enumName}`)
    await owner.end()
  }
})

test('a separate runtime LOGIN can start the API without owner privileges', { skip: !testUrl || !new URL(testUrl).searchParams.get('host')?.startsWith('/') }, async () => {
  const owner = new pg.Client(databaseConfig(testUrl!))
  const login = `foundation_test_${randomUUID().replaceAll('-', '')}`
  await owner.connect()
  try {
    // Identifier is generated locally from UUID hex, never request input.
    await owner.query(`CREATE ROLE ${login} LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS`)
    await owner.query(`GRANT talent_runtime TO ${login}`)
    const url = new URL(testUrl!)
    url.username = login
    url.password = ''
    // The disposable cluster uses Unix socket trust. This is not credential
    // provisioning for Supabase; real environments must use a secret manager.
    const db = await connectDatabase(url.toString())
    try {
      await db.$queryRaw`SELECT id FROM public.system_settings`
      await assert.rejects(db.$executeRaw`TRUNCATE public.activity_logs`)
    } finally {
      await db.$disconnect()
    }
  } finally {
    await owner.query(`DROP ROLE IF EXISTS ${login}`)
    await owner.end()
  }
})
