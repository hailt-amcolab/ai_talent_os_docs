'use client'

import { useEffect, useState } from 'react'
import { isBusy } from '@/lib/pwa/busy'
import { t } from '@/lib/messages'

// Có bản mới của service worker thì hỏi trước khi tải lại (đặc tả §5.4).
export function UpdateBanner() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    let reloading = false
    let hadController = !!navigator.serviceWorker.controller
    const onControllerChange = () => {
      if (!hadController) { hadController = true; return }
      if (reloading) return
      reloading = true
      location.reload()
    }
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)

    navigator.serviceWorker.getRegistration('/pwa/').then((reg) => {
      if (!reg) return
      if (reg.waiting && navigator.serviceWorker.controller) setWaiting(reg.waiting)
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing
        sw?.addEventListener('statechange', () => {
          // chỉ báo khi đã có bản cũ đang chạy (lần cài đầu không cần báo)
          if (sw.state === 'installed' && navigator.serviceWorker.controller) setWaiting(sw)
        })
      })
    })
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
  }, [])

  if (!waiting) return null
  return (
    <div className="banner" role="status">
      <span>{t.update.available}</span>
      <button
        onClick={() => {
          if (isBusy()) return alert(t.update.busy)
          waiting.postMessage('SKIP_WAITING')
        }}
      >
        {t.update.button}
      </button>
    </div>
  )
}
