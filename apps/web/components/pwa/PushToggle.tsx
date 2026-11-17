'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { currentEnv, iosTooOldForPush, pushNeedsInstall, supportsPush } from '@/lib/pwa/platform'
import { currentSubscription, subscribePush, unsubscribePush } from '@/lib/pwa/push'
import { token } from '@/lib/auth/store'
import { pwaApi } from '@/lib/api/pwa'
import { markBusy } from '@/lib/pwa/busy'
import { t } from '@/lib/messages'

// Bật, tắt thông báo đẩy trên máy này (đặc tả PWA §6.2). Bước 2 của hướng dẫn lần đầu (6-2).
type State = 'loading' | 'needs-install' | 'too-old' | 'unsupported' | 'denied' | 'off' | 'on'

// Trạng thái suy ra từ trình duyệt, không cần gọi gì. 'check' = phải hỏi đăng ký hiện có.
function staticState(): State | 'check' {
  const env = currentEnv()
  if (iosTooOldForPush(env)) return 'too-old'
  if (pushNeedsInstall(env)) return 'needs-install'
  if (!supportsPush()) return 'unsupported'
  if (Notification.permission === 'denied') return 'denied'
  return 'check'
}
const noSubscribe = () => () => {}

export function PushToggle() {
  const initial = useSyncExternalStore(noSubscribe, staticState, () => 'loading' as const)
  const [dynamic, setDynamic] = useState<State | null>(null)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => { if (busy) return markBusy() }, [busy])
  useEffect(() => {
    if (initial !== 'check') return
    let active = true
    void currentSubscription().then(async sub => {
      if (!sub) return 'off' as const
      const jwt = await token()
      const state = await pwaApi.state(jwt, sub.endpoint)
      if (!state.active) await pwaApi.subscribe(jwt, sub.toJSON())
      return 'on' as const
    }).then(state => { if (active) setDynamic(state) }).catch(() => { if (active) { setDynamic('off'); setFailed(true) } })
    return () => { active = false }
  }, [initial])

  const state: State = dynamic ?? (initial === 'check' ? 'loading' : initial)

  async function toggle() {
    setBusy(true)
    setFailed(false)
    try {
      if (state === 'on') {
        const sub = await currentSubscription()
        if (sub) await pwaApi.unsubscribe(await token(), sub.endpoint)
        await unsubscribePush()
        setDynamic('off')
      } else {
        const result = await subscribePush() // gọi ngay trong onClick
        if (result.status === 'subscribed') await pwaApi.subscribe(await token(), result.subscription.toJSON())
        setDynamic(result.status === 'subscribed' ? 'on' : result.status)
      }
    } catch {
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  const notice: Partial<Record<State, string>> = {
    loading: t.common.loading,
    'needs-install': t.push.needsInstall,
    'too-old': t.push.tooOld,
    unsupported: t.push.unsupported,
    denied: t.push.denied,
  }
  if (notice[state]) return <p>{notice[state]}</p>

  return (
    <div>
      <p>{state === 'on' ? t.push.on : t.push.why}</p>
      <button onClick={toggle} disabled={busy}>{busy ? t.push.saving : state === 'on' ? t.push.disable : t.push.enable}</button>
      {failed && <p role="alert">{t.common.retry}</p>}
    </div>
  )
}
