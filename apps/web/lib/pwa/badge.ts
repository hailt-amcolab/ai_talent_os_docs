// Unread notification count. Same Cache Storage key the service worker writes (public/sw.js).
// ponytail: device-local; when the notification inbox (6-1) exists, read the count from the API instead.
const META = 'talent-meta'
const UNREAD = '/__unread'

export async function readUnread(): Promise<number> {
  try {
    const res = await (await caches.open(META)).match(UNREAD)
    const n: unknown = res ? await res.json() : 0
    return Number.isInteger(n) && (n as number) >= 0 ? (n as number) : 0
  } catch { return 0 }
}

export async function clearUnread(): Promise<void> {
  try { await (await caches.open(META)).put(UNREAD, new Response('0')) } catch {}
  try { await navigator.clearAppBadge?.() } catch {} // not supported everywhere (e.g. Android Chrome)
}
