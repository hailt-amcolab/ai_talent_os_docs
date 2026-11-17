// Service worker của ứng dụng tài năng. Đặc tả: agent_spec/pwa-platform-spec/PWA_PLATFORM_SPEC_VI.md §5.3, §6.4
// Chỉ lưu tệp công khai không đổi. Mọi API và trang đã đăng nhập đi thẳng ra mạng.
const VERSION = 'v3' // tăng khi đổi danh sách tệp lưu sẵn
const CACHE = `talent-static-${VERSION}`

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/offline'])))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith('talent-static-') && k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== location.origin) return

  if (req.mode === 'navigate') {
    // không lưu HTML; mất mạng thì trả trang /offline chung
    e.respondWith(fetch(req).catch(() => caches.match('/offline')))
    return
  }
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone()
              caches.open(CACHE).then((c) => c.put(req, copy))
            }
            return res
          }),
      ),
    )
  }
})

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting()
})

// Mỗi lần nhận push PHẢI hiện thông báo, nếu không Safari thu hồi đăng ký (§6.4).
self.addEventListener('push', (e) => {
  let d = {}
  try { d = e.data ? e.data.json() : {} } catch { d = { body: e.data ? e.data.text() : '' } }
  const jobs = [
    self.clients.matchAll({ type: 'window' }).then((clients) => clients.forEach((client) => client.postMessage({ type: 'NOTIFICATION_RECEIVED' }))),
    self.registration.showNotification(d.title || 'お知らせ', {
      body: d.body || '',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag: d.tag,
      data: { url: d.url || '/home' },
    }),
  ]
  if (typeof d.badgeCount === 'number' && self.navigator.setAppBadge) {
    jobs.push(d.badgeCount > 0 ? self.navigator.setAppBadge(d.badgeCount) : self.navigator.clearAppBadge())
  }
  e.waitUntil(Promise.all(jobs))
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  const raw = new URL((e.notification.data && e.notification.data.url) || '/home', location.origin)
  const target = raw.origin === location.origin ? raw.href : location.origin + '/home' // chỉ mở trong ứng dụng
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) return c.navigate(target).then(() => c.focus())
      }
      return self.clients.openWindow(target)
    }),
  )
})
