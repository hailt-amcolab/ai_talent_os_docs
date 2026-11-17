import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from './app.ts'
import { loadEnv } from '../config/env.ts'
import { AppError } from '../core/errors.ts'
import type { AppDeps } from '../container.ts'

const env = loadEnv({ DATABASE_URL: 'postgresql://u:p@localhost:5432/db', CORS_ORIGINS: 'https://app.example.com' })
// DB giả: chỉ cần $queryRaw cho /health. Module thật dùng DB test (TEST_DATABASE_URL) khi có schema.
const fakeDb = (up: boolean) => ({ $queryRaw: async () => { if (!up) throw new Error('down'); return [] } }) as unknown as AppDeps['db']
const appWith = (up = true) => createApp({ env, db: fakeDb(up) })

test('health báo DB đang chạy', async () => {
  const res = await appWith(true).request('/health')
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true, database: 'up' })
})

test('health trả 503 khi mất DB', async () => {
  const res = await appWith(false).request('/health')
  assert.equal(res.status, 503)
})

test('đường dẫn không có trả lỗi cùng một dạng', async () => {
  const res = await appWith().request('/khong-co')
  assert.equal(res.status, 404)
  const body = (await res.json()) as { error: { code: string; requestId: string } }
  assert.equal(body.error.code, 'NOT_FOUND')
  assert.ok(body.error.requestId)
})

test('AppError đổi thành mã HTTP và code; lỗi lạ thành 500 không lộ chi tiết', async () => {
  const app = appWith()
  app.get('/boom-app', () => { throw new AppError('DEVICE_NOT_FOUND', 404) })
  app.get('/boom-raw', () => { throw new Error('secret detail') })
  const a = await app.request('/boom-app')
  assert.equal(a.status, 404)
  assert.equal(((await a.json()) as { error: { code: string } }).error.code, 'DEVICE_NOT_FOUND')
  const b = await app.request('/boom-raw')
  assert.equal(b.status, 500)
  assert.doesNotMatch(await b.text(), /secret detail/)
})

test('CORS chỉ mở cho nguồn FE đã khai báo', async () => {
  const ok = await appWith().request('/health', { headers: { Origin: 'https://app.example.com' } })
  assert.equal(ok.headers.get('access-control-allow-origin'), 'https://app.example.com')
  const bad = await appWith().request('/health', { headers: { Origin: 'https://evil.com' } })
  assert.equal(bad.headers.get('access-control-allow-origin'), null)
})

test('tài liệu OpenAPI có /health', async () => {
  const res = await appWith().request('/openapi.json')
  assert.equal(res.status, 200)
  const doc = (await res.json()) as { paths: Record<string, unknown> }
  assert.ok(doc.paths['/health'])
})

test('thiếu DATABASE_URL thì không khởi động', () => {
  assert.throws(() => loadEnv({}))
})
