'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { currentEnv, iosTooOldForPush, pushNeedsInstall, supportsPush } from '@/lib/pwa/platform'
import { currentSubscription, subscribePush, unsubscribePush } from '@/lib/pwa/push'
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

  useEffect(() => {
    if (initial !== 'check') return
    let active = true
    void currentSubscription().then((sub) => { if (active) setDynamic(sub ? 'on' : 'off') })
    return () => { active = false }
  }, [initial])

  const state: State = dynamic ?? (initial === 'check' ? 'loading' : initial)

  async function toggle() {
    setBusy(true)
    setFailed(false)
    try {
      if (state === 'on') {
        await unsubscribePush()
        setDynamic('off')
      } else {
        const result = await subscribePush() // gọi ngay trong onClick
        // ponytail: khi có API lưu đăng ký (6-1), gửi result.subscription lên BE ở đây trước khi báo 'on'.
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
