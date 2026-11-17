import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

function worker() {
  const events = new Map<string, (e: Record<string, unknown>) => void>(), written: unknown[] = [], shown: unknown[] = [], opened: string[] = []
  let offline = false, skipped = 0
  const self = { addEventListener: (name: string, fn: (e: Record<string, unknown>) => void) => events.set(name, fn), skipWaiting: () => { skipped++ }, navigator: {}, clients: { claim: async () => {}, matchAll: async () => [], openWindow: async (url: string) => { opened.push(url) } }, registration: { showNotification: async (...args: unknown[]) => { shown.push(args) } } }
  const caches = { keys: async () => [], delete: async () => true, open: async () => ({ addAll: async () => {}, put: async (...args: unknown[]) => { written.push(args) } }), match: async () => new Response('OFFLINE') }
  vm.runInNewContext(readFileSync(new URL('../../public/sw.js', import.meta.url), 'utf8'), { self, caches, location: { origin: 'https://example.test' }, URL, fetch: async () => { if (offline) throw new Error('offline'); return new Response('private profile') } })
  async function fetchEvent(path: string, mode = 'navigate', headers = new Headers()) {
    let response: Promise<Response> | undefined
    events.get('fetch')!({ request: { url: 'https://example.test' + path, method: 'GET', mode, headers }, respondWith: (r: Promise<Response>) => { response = r }, waitUntil: () => {} })
    return response ? await (await response).text() : null
  }
  return { events, written, shown, opened, self, fetchEvent, offline: () => { offline = true }, skipped: () => skipped }
}
test('private navigation uses network, offline fallback is generic, admin/API/RSC/authorized requests are never cached', async () => {
  const w = worker()
  assert.equal(await w.fetchEvent('/pwa/home'), 'private profile')
  assert.equal(w.written.length, 0)
  for (const url of ['/admin', '/api/v1/auth/state', '/pwa/home?_rsc=1']) assert.equal(await w.fetchEvent(url), null)
  assert.equal(await w.fetchEvent('/_next/static/private.js', 'cors', new Headers({ Authorization: 'Bearer test' })), null)
  w.offline(); assert.equal(await w.fetchEvent('/pwa/home'), 'OFFLINE')
  assert.equal(w.written.length, 0)
})
test('malformed push still displays a notification and click cannot navigate outside talent scope', async () => {
  const w = worker(); let wait = Promise.resolve()
  w.events.get('push')!({ data: { json: () => { throw new Error('bad') } }, waitUntil: (p: Promise<void>) => { wait = p } })
  await wait; assert.equal(w.shown.length, 1)
  for (const url of ['https://evil.test/phishing', '/admin', 'http://[invalid']) {
    w.events.get('notificationclick')!({ notification: { close: () => {}, data: { url } }, waitUntil: (p: Promise<void>) => { wait = p } })
    await wait; assert.equal(w.opened.at(-1), 'https://example.test/pwa/home')
  }
})
test('worker activation is opt-in, never skips waiting from install', async () => {
  const w = worker(); let wait = Promise.resolve()
  w.events.get('install')!({ waitUntil: (p: Promise<void>) => { wait = p } }); await wait
  assert.equal(w.skipped(), 0)
  w.events.get('message')!({ data: 'SKIP_WAITING' }); assert.equal(w.skipped(), 1)
})
