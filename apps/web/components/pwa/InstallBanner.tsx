'use client'

import { useState, useSyncExternalStore } from 'react'
import { currentEnv, installGuide } from '@/lib/pwa/platform'
import { canPromptInstall, onInstallPromptChange, promptInstall } from '@/lib/pwa/install-prompt'
import { t } from '@/lib/messages'

// Quick install bar on every /pwa page (login and sign-up included) for Android Chrome.
// Only shown when Chrome offered the install prompt (beforeinstallprompt), so never when already installed.
// iPhone has no install API: the step-by-step guide stays in InstallGuide.
const DISMISSED = 'pwa-install-dismissed'
const wasDismissed = () => { try { return sessionStorage.getItem(DISMISSED) === '1' } catch { return false } }

export function InstallBanner() {
  const canPrompt = useSyncExternalStore(onInstallPromptChange, canPromptInstall, () => false)
  const android = useSyncExternalStore(() => () => {}, () => installGuide(currentEnv()) === 'android', () => false)
  const [hidden, setHidden] = useState(wasDismissed)

  if (!canPrompt || !android || hidden) return null
  return (
    <div className="banner banner-top" role="region" aria-label={t.install.bannerLabel}>
      <span>{t.install.bannerText}</span>
      <span className="banner-actions">
        <button onClick={() => { void promptInstall() }}>{t.install.androidButton}</button>
        <button onClick={() => { try { sessionStorage.setItem(DISMISSED, '1') } catch {} ; setHidden(true) }}>{t.install.later}</button>
      </span>
    </div>
  )
}
