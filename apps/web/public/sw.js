// Talent PWA only. Never cache API, auth responses, RSC, QR or private HTML.
const VERSION = 'v5'
const CACHE = `talent-static-${VERSION}`
const OFFLINE = '/pwa/offline'
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll([OFFLINE]))) })
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('talent-static-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))
})
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== location.origin || req.headers.has('Authorization') || req.headers.has('RSC') || url.searchParams.has('_rsc')) return
  if (req.mode === 'navigate') {
    if (!url.pathname.startsWith('/pwa/')) return
    e.respondWith(fetch(req).catch(() => caches.match(OFFLINE)))
  } else if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(req, copy))) }
      return res
    })))
  }
})
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting() })
self.addEventListener('push', e => {
  let d = {}
  try { d = e.data ? e.data.json() : {} } catch {}
  if (!d || typeof d !== 'object') d = {}
  const jobs = [
    self.registration.showNotification(typeof d.title === 'string' ? d.title : 'お知らせ', { body: typeof d.body === 'string' ? d.body : '', icon: '/icons/icon-192.png', badge: '/icons/badge-72.png', tag: typeof d.tag === 'string' ? d.tag : undefined, data: { url: d.url } }),
    self.clients.matchAll({ type: 'window' }).then(list => list.forEach(c => c.postMessage({ type: 'NOTIFICATION_RECEIVED' }))),
  ]
  if (Number.isInteger(d.badgeCount) && d.badgeCount >= 0 && self.navigator.setAppBadge) jobs.push(d.badgeCount > 0 ? self.navigator.setAppBadge(d.badgeCount) : self.navigator.clearAppBadge())
  e.waitUntil(Promise.all(jobs))
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
