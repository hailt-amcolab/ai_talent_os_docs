'use client'
import { useEffect, useState } from 'react'
import { clearUnread, readUnread } from '@/lib/pwa/badge'
import { t } from '@/lib/messages'

// Unread count in the app; the service worker also puts it on the Home Screen icon.
export function NotificationBadge() {
  const [unread, setUnread] = useState(0)
  useEffect(() => {
    let active = true
    void readUnread().then(n => { if (active) setUnread(n) })
    const sw = 'serviceWorker' in navigator ? navigator.serviceWorker : null
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== 'NOTIFICATION_RECEIVED') return
      if (Number.isInteger(e.data.unread)) setUnread(e.data.unread)
      else void readUnread().then(setUnread)
    }
    sw?.addEventListener('message', onMessage)
    return () => { active = false; sw?.removeEventListener('message', onMessage) }
  }, [])
  return (
    <p className="notification-toolbar">
      <span aria-live="polite">{t.badge.unread(unread)}</span>
      {unread > 0 && <button onClick={() => { setUnread(0); void clearUnread() }}>{t.badge.markRead}</button>}
    </p>
  )
}
