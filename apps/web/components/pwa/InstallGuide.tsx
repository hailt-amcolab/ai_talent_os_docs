'use client'

import { useState, useSyncExternalStore } from 'react'
import { currentEnv, installGuide, type InstallGuide as Guide } from '@/lib/pwa/platform'
import { canPromptInstall, onInstallPromptChange, promptInstall } from '@/lib/pwa/install-prompt'
import { t } from '@/lib/messages'

// Hướng dẫn cài lên màn hình chính (đặc tả §4). Bước 1 của hướng dẫn lần đầu (6-2).
// Theo dõi trạng thái đã cài: đổi khi Android cài xong (appinstalled) hoặc chế độ hiển thị đổi.
function subscribeInstallState(onChange: () => void) {
  const mq = window.matchMedia('(display-mode: standalone)')
  window.addEventListener('appinstalled', onChange)
  mq.addEventListener('change', onChange)
  return () => {
    window.removeEventListener('appinstalled', onChange)
    mq.removeEventListener('change', onChange)
  }
}

export function InstallGuide() {
  // server không biết trình duyệt nên trả null; trình duyệt tính lại sau khi gắn
  const guide = useSyncExternalStore<Guide | null>(subscribeInstallState, () => installGuide(currentEnv()), () => null)
  const canPrompt = useSyncExternalStore(onInstallPromptChange, canPromptInstall, () => false)
  const [copied, setCopied] = useState(false)

  if (guide === null) return null

  if (guide === 'installed') return <p className="muted">{t.install.installed}</p>

  if (guide === 'in-app') {
    return (
      <div>
        <p>{t.install.inApp}</p>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(location.href)
            setCopied(true)
          }}
        >
          {copied ? t.install.copied : t.install.copyLink}
        </button>
      </div>
    )
  }

  if (guide === 'ios-other') return <p>{t.install.iosOther}</p>

  if (guide === 'ios-safari') {
    return <ol>{t.install.iosSteps.map((step) => <li key={step}>{step}</li>)}</ol>
  }

  // android, desktop
  return canPrompt ? <button onClick={() => promptInstall()}>{t.install.androidButton}</button> : <p>{t.install.androidMenu}</p>
}
