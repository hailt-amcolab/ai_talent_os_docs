// Talent PWA only. Never cache API, auth responses, RSC, QR or private HTML.
const VERSION = 'v7' // v7: answers the in-scope manifest so a tunnel warning page cannot hide Install app
const CACHE = `talent-static-${VERSION}`
const OFFLINE = '/pwa/offline'
const upstream = path => fetch(new Request(location.origin + path, { credentials: 'include', cache: 'no-store', headers: { 'ngrok-skip-browser-warning': '1' } }))
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll([OFFLINE]))) })
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('talent-static-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))
})
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== location.origin || req.headers.has('Authorization') || req.headers.has('RSC') || url.searchParams.has('_rsc')) return
  // Chrome loads the manifest and its icons without cookies. ngrok then returns its warning HTML
  // and never fires beforeinstallprompt. Answer from here, and refetch upstream with the bypass header.
  if (url.pathname === '/pwa/manifest') {
    e.respondWith(upstream('/manifest.webmanifest').then(async res => {
      const type = res.headers.get('Content-Type') || ''
      if (!res.ok || type.includes('text/html')) return res
      const data = await res.json()
      if (Array.isArray(data.icons)) data.icons = data.icons.map(icon => ({ ...icon, src: String(icon.src).replace('/icons/', '/pwa/icons/') }))
      return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'no-store' } })
    }))
    return
  }
  if (url.pathname.startsWith('/pwa/icons/')) {
    const file = url.pathname.slice('/pwa/icons/'.length)
    if (/^[\w.-]+$/.test(file)) e.respondWith(upstream('/icons/' + file))
    return
  }
  if (req.mode === 'navigate') {
    if (!url.pathname.startsWith('/pwa/')) return
    e.respondWith(fetch(req).catch(() => caches.match(OFFLINE)))
  } else if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      // A tunnel warning page, captive portal or error page can answer 200 text/html for a .js URL.
      // Caching it would break the app until the cache is cleared, so only real static files are kept.
      if (res.ok && !(res.headers.get('Content-Type') || '').includes('text/html')) { const copy = res.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(req, copy))) }
      return res
    })))
  }
})
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting() })
// Unread count shared with the page (lib/pwa/badge.ts reads/clears the same key).
// ponytail: device-local counter; replace with the server unread count (talent_notifications) sent as badgeCount when 6-1 is built.
// Two pushes landing at the same instant can lose one increment; acceptable for a badge.
const META = 'talent-meta', UNREAD = '/__unread'
const readUnread = () => caches.open(META).then(c => c.match(UNREAD)).then(r => r ? r.json() : 0).then(n => Number.isInteger(n) && n >= 0 ? n : 0).catch(() => 0)
const writeUnread = n => caches.open(META).then(c => c.put(UNREAD, new Response(JSON.stringify(n)))).then(() => n)
self.addEventListener('push', e => {
  let d = {}
  try { d = e.data ? e.data.json() : {} } catch {}
  if (!d || typeof d !== 'object') d = {}
  // Server count wins when sent; otherwise count this push locally.
  const unread = (Number.isInteger(d.badgeCount) && d.badgeCount >= 0 ? Promise.resolve(d.badgeCount) : readUnread().then(n => n + 1)).then(writeUnread).catch(() => null)
  e.waitUntil(Promise.all([
    self.registration.showNotification(typeof d.title === 'string' ? d.title : 'Notification', { body: typeof d.body === 'string' ? d.body : '', icon: '/icons/icon-192.png', badge: '/icons/badge-72.png', tag: typeof d.tag === 'string' ? d.tag : undefined, data: { url: d.url } }),
    unread.then(n => {
      const badge = n === null || !self.navigator.setAppBadge ? undefined : (n > 0 ? self.navigator.setAppBadge(n) : self.navigator.clearAppBadge())
      return Promise.all([
        Promise.resolve(badge).catch(() => {}), // badge needs notification permission; never fail the push for it
        self.clients.matchAll({ type: 'window' }).then(list => list.forEach(c => c.postMessage({ type: 'NOTIFICATION_RECEIVED', unread: n }))),
      ])
    }),
  ]))
})
self.addEventListener('notificationclick', e => {
  e.notification.close()
  let target = location.origin + '/pwa/home'
  try { const url = new URL(e.notification.data?.url || target, location.origin); if (url.origin === location.origin && url.pathname.startsWith('/pwa/')) target = url.href } catch {}
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async list => {
    for (const c of list) {
      const url = new URL(c.url)
      if (url.origin === location.origin && url.pathname.startsWith('/pwa/') && 'focus' in c) { await c.navigate(target); return c.focus() }
    }
    return self.clients.openWindow(target)
  }))
})
