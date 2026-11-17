import { rememberInstallPrompt } from '@/lib/pwa/install-prompt'

if ('serviceWorker' in navigator) {
  void (async () => {
    const registrations = await navigator.serviceWorker.getRegistrations()
    let legacy = false
    for (const reg of registrations) {
      if (reg.scope === location.origin + '/' && [reg.active, reg.waiting, reg.installing].some(w => w?.scriptURL === location.origin + '/sw.js')) {
        legacy = true
        await reg.unregister()
      }
    }
    if (legacy) {
      for (const key of await caches.keys()) if (key.startsWith('talent-static-')) await caches.delete(key)
      if (navigator.serviceWorker.controller && !location.pathname.startsWith('/pwa/')) { location.reload(); return }
    }
    await navigator.serviceWorker.register('/sw.js', { scope: '/pwa/', updateViaCache: 'none' })
  })().catch(() => {})
}
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault()
  rememberInstallPrompt(e as BeforeInstallPromptEvent)
})
