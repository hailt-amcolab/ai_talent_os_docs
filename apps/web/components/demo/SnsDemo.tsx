'use client'
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { AuthBoundary } from '@/components/auth/AuthBoundary'
import { DemoHeader, errorText } from '@/components/auth/AuthForms'
import { token } from '@/lib/auth/store'
import { uploadPostApi, type SnsAccounts, type SnsPlatform } from '@/lib/api/uploadPost'
import { t } from '@/lib/messages'
import { currentEnv as env, isIOS } from '@/lib/pwa/platform'

// Upload-Post connect demo (spec agent_spec/upload-post-agent-spec §6.2). The social login may come back in the PWA,
// in an in-app browser sheet or in Safari/Chrome, so the state is always re-read from the BE when the talent returns.
const ORDER: SnsPlatform[] = ['youtube', 'instagram', 'tiktok']

function Content() {
  const [data, setData] = useState<SnsAccounts | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState<SnsPlatform | null>(null)
  const load = useCallback(() => token().then(uploadPostApi.accounts).then(d => { setData(d); setError('') }).catch(e => setError(errorText(e))), [])
  useEffect(() => {
    void load()
    const onVisible = () => { if (document.visibilityState === 'visible') void load() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [load])
  const connect = async (platform: SnsPlatform) => {
    setBusy(platform)
    try {
      const { authorizeUrl } = await uploadPostApi.connect(await token(), platform)
      window.location.assign(authorizeUrl) // same window: a new tab gets blocked or lost outside the PWA
    } catch (e) { setError(errorText(e)); setBusy(null) }
  }
  const accounts = ORDER.map(p => data?.accounts.find(a => a.platform === p) ?? { platform: p, status: 'not_connected' as const })
  return <main><DemoHeader />
    <div className="notification-toolbar"><h1>{t.sns.title}</h1><Link href="/pwa/home">{t.onedrive.back}</Link></div>
    <section className="card"><p>{t.sns.help}</p><p className="muted">{t.sns.returnHint}</p></section>
    {accounts.map(a => <section className="card" key={a.platform}>
      <h2>{t.sns.names[a.platform]}</h2>
      <p>{t.sns.status[a.status]}{a.status !== 'not_connected' && (a.displayName || a.handle) ? `: ${[a.displayName, a.handle].filter(Boolean).join(' ')}` : ''}</p>
      {a.platform === 'tiktok' && <p className="muted">{t.sns.tiktokPaid}</p>}
      {a.platform === 'instagram' && a.status !== 'connected' && <p className="muted">{t.sns.instagramHint}</p>}
      {a.platform === 'youtube' && a.status !== 'connected' && <p className="muted">{t.sns.youtubeHint}</p>}
      <button className={a.platform === 'youtube' ? 'auth-primary' : undefined} disabled={busy !== null} onClick={() => connect(a.platform)}>
        {busy === a.platform ? t.common.loading : a.status === 'not_connected' ? t.sns.connect : t.sns.reconnect}
      </button>
    </section>)}
    <p><button onClick={() => { void load() }}>{t.sns.recheck}</button></p>
    {error && <p role="alert" className="auth-error">{error}</p>}
  </main>
}
export function SnsDemo() { return <AuthBoundary><Content /></AuthBoundary> }

// Upload-Post redirects here after the social login (?connect_status=success|cancelled|error&platform=…&error_code=…).
// No login needed: it may open in Safari/Chrome where the PWA session does not exist. Read once at load, then clean the URL.
type ReturnInfo = { status: string; platform: SnsPlatform | null; errorCode: string | null }
function readReturn(): ReturnInfo {
  const q = new URLSearchParams(window.location.search), p = q.get('platform'), code = q.get('error_code')
  return {
    status: q.get('connect_status') ?? 'unknown',
    platform: ORDER.includes(p as SnsPlatform) ? (p as SnsPlatform) : null,
    errorCode: code && /^[A-Z_]{1,40}$/.test(code) ? code : null, // only known-shaped codes; error_description is never shown
  }
}
const initial = typeof window === 'undefined' ? null : readReturn()
const standalone = () => window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
export function SnsReturn() {
  const info = useSyncExternalStore(() => () => {}, () => initial, () => null)
  useEffect(() => {
    window.history.replaceState(null, '', window.location.pathname)
    if (standalone()) window.location.replace('/pwa/sns') // back inside the installed app: show the re-read state
  }, [])
  if (info === null) return <main><p>{t.common.loading}</p></main>
  const { status, platform, errorCode } = info
  const title = status === 'success' ? t.sns.returnSuccess : status === 'cancelled' ? t.sns.returnCancelled : t.sns.returnError
  return <main><DemoHeader />
    <section className="card" role="status">
      <h1>{platform ? `${t.sns.names[platform]}: ${title}` : title}</h1>
      {errorCode && <p className="muted">{t.sns.errorCode(errorCode)}</p>}
      {platform === 'instagram' && status === 'error' && <p>{t.sns.instagramHint}</p>}
      <p>{t.sns.returnBack}</p>
      {/* No web API can reopen an installed PWA (iOS never, Android not reliably): tell the talent how to switch back. */}
      <p><strong>{isIOS(env()) ? t.sns.backIos : /Android/.test(navigator.userAgent) ? t.sns.backAndroid : t.sns.backOther}</strong></p>
      <p><Link href="/pwa/sns">{t.sns.open}</Link></p>
    </section>
  </main>
}
