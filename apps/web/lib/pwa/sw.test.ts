import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

function worker() {
  const events = new Map<string, (e: Record<string, unknown>) => void>(), written: unknown[] = [], shown: unknown[] = [], opened: string[] = []
  let offline = false, skipped = 0, html = false
  const badges: number[] = [], messages: unknown[] = [], meta = new Map<string, string>()
  const self = { addEventListener: (name: string, fn: (e: Record<string, unknown>) => void) => events.set(name, fn), skipWaiting: () => { skipped++ }, navigator: { setAppBadge: async (n: number) => { badges.push(n) }, clearAppBadge: async () => { badges.push(0) } }, clients: { claim: async () => {}, matchAll: async () => [{ url: 'https://example.test/', postMessage: (m: unknown) => messages.push(JSON.parse(JSON.stringify(m))) }], openWindow: async (url: string) => { opened.push(url) } }, registration: { showNotification: async (...args: unknown[]) => { shown.push(args) } } }
  const caches = { keys: async () => [], delete: async () => true, open: async (name: string) => name === 'talent-meta'
    ? { match: async (k: string) => meta.has(k) ? new Response(meta.get(k)) : undefined, put: async (k: string, r: Response) => { meta.set(k, await r.text()) } }
    : { addAll: async () => {}, put: async (...args: unknown[]) => { written.push(args) } }, match: async (k: unknown) => k === '/pwa/offline' ? new Response('OFFLINE') : undefined }
  vm.runInNewContext(readFileSync(new URL('../../public/sw.js', import.meta.url), 'utf8'), { self, caches, Response, Request, location: { origin: 'https://example.test' }, URL, fetch: async (input: Request | string) => {
    if (offline) throw new Error('offline')
    if (html) return new Response('<html>ngrok warning</html>', { headers: { 'Content-Type': 'text/html' } })
    const href = typeof input === 'string' ? input : input.url
    if (href.endsWith('/manifest.webmanifest')) return new Response(JSON.stringify({ name: 'AI Talent OS', icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }] }), { headers: { 'Content-Type': 'application/manifest+json' } })
    return new Response('private profile')
  } })
  async function fetchEvent(path: string, mode = 'navigate', headers = new Headers()) {
    let response: Promise<Response> | undefined
    events.get('fetch')!({ request: { url: 'https://example.test' + path, method: 'GET', mode, headers }, respondWith: (r: Promise<Response>) => { response = r }, waitUntil: () => {} })
    return response ? await (await response).text() : null
  }
  async function push(data: unknown) {
    let wait: Promise<unknown> = Promise.resolve()
    events.get('push')!({ data: { json: () => data }, waitUntil: (p: Promise<unknown>) => { wait = p } })
    await wait
  }
  return { events, written, shown, opened, self, fetchEvent, push, badges, messages, meta, offline: () => { offline = true }, htmlNext: () => { html = true }, skipped: () => skipped }
}
test('each push counts one unread on the icon and tells open pages; a server badgeCount overrides the local count', async () => {
  const w = worker()
  await w.push({ title: 'a' }); await w.push({ title: 'b' })
  assert.deepEqual([...w.badges], [1, 2])
  assert.deepEqual(w.messages.at(-1), { type: 'NOTIFICATION_RECEIVED', unread: 2 })
  await w.push({ title: 'c', badgeCount: 0 })
  assert.equal(w.badges.at(-1), 0); assert.equal(w.meta.get('/__unread'), '0')
  w.meta.set('/__unread', '"junk"'); await w.push({ title: 'd' })
  assert.equal(w.badges.at(-1), 1) // corrupted counter restarts instead of breaking the push
  assert.equal(w.shown.length, 4)
})
test('a failing badge API never blocks showing the notification', async () => {
  const w = worker()
  w.self.navigator.setAppBadge = async () => { throw new Error('denied') }
  await w.push({ title: 'x' })
  assert.equal(w.shown.length, 1)
})
test('private navigation uses network, offline fallback is generic, admin/API/RSC/authorized requests are never cached', async () => {
  const w = worker()
  assert.equal(await w.fetchEvent('/pwa/home'), 'private profile')
  assert.equal(w.written.length, 0)
  for (const url of ['/admin', '/api/v1/auth/state', '/pwa/home?_rsc=1']) assert.equal(await w.fetchEvent(url), null)
  assert.equal(await w.fetchEvent('/_next/static/private.js', 'cors', new Headers({ Authorization: 'Bearer test' })), null)
  w.offline(); assert.equal(await w.fetchEvent('/pwa/home'), 'OFFLINE')
  assert.equal(w.written.length, 0)
})
test('static files are cached, but an HTML page served for a .js URL (ngrok warning, captive portal) is not', async () => {
  const w = worker()
  assert.equal(await w.fetchEvent('/_next/static/chunks/a.js', 'no-cors'), 'private profile')
  assert.equal(w.written.length, 1) // text/plain body from the fake network: cached
  w.htmlNext()
  assert.match((await w.fetchEvent('/_next/static/chunks/b.js', 'no-cors'))!, /ngrok/)
  assert.equal(w.written.length, 1) // HTML for a chunk: served once, never cached
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
test('the in-scope manifest is fetched past the tunnel warning and its icons stay inside the worker scope', async () => {
  const w = worker()
  const manifestBody = await w.fetchEvent('/pwa/manifest', 'cors')
  assert.ok(manifestBody)
  const data = JSON.parse(manifestBody)
  assert.equal(data.icons[0].src, '/pwa/icons/icon-192.png')
  assert.equal(await w.fetchEvent('/pwa/icons/icon-192.png', 'cors'), 'private profile')
  w.htmlNext()
  const warning = await w.fetchEvent('/pwa/manifest', 'cors')
  assert.match(warning ?? '', /ngrok/)
})
test('worker activation is opt-in, never skips waiting from install', async () => {
  const w = worker(); let wait = Promise.resolve()
  w.events.get('install')!({ waitUntil: (p: Promise<void>) => { wait = p } }); await wait
  assert.equal(w.skipped(), 0)
  w.events.get('message')!({ data: 'SKIP_WAITING' }); assert.equal(w.skipped(), 1)
})
