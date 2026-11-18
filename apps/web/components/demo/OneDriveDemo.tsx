'use client'
import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AuthBoundary } from '@/components/auth/AuthBoundary'
import { DemoHeader, errorText } from '@/components/auth/AuthForms'
import { token } from '@/lib/auth/store'
import { ApiError } from '@/lib/api/client'
import { onedriveApi, type DriveItem, type OneDriveConnection, type TalentFolder } from '@/lib/api/onedrive'
import { markBusy } from '@/lib/pwa/busy'
import { t } from '@/lib/messages'

const m = t.onedrive
const MEDIA = 'image/jpeg,image/png,image/heic,video/mp4,video/quicktime,.jpg,.jpeg,.png,.heic,.mp4,.mov'
const isText = (name: string) => /\.(md|txt|json)$/i.test(name)
const size = (n: number) => n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`
type Crumb = { id: string; name: string }

function Content() {
  const [talents, setTalents] = useState<TalentFolder[] | null>(null), [items, setItems] = useState<DriveItem[]>([])
  const [path, setPath] = useState<Crumb[]>([]), [editing, setEditing] = useState<{ id: string; name: string; eTag: string; content: string } | null>(null)
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState('')
  useEffect(() => { if (busy) return markBusy() }, [busy])
  const [conn, setConn] = useState<OneDriveConnection | null>(null)
  useEffect(() => {
    let active = true
    void (async () => {
      const jwt = await token(), c = await onedriveApi.connection(jwt)
      if (!active) return
      setConn(c)
      if (c.status === 'connected' || c.status === 'shared') { const r = await onedriveApi.talents(jwt); if (active) setTalents(r.items) }
    })().catch(e => { if (active) setError(errorText(e)) })
    return () => { active = false }
  }, [])
  const folder = path.at(-1), usable = conn?.status === 'connected' || conn?.status === 'shared'
  // Leaves the app for Microsoft; it comes back to /pwa/onedrive/callback.
  const connect = () => run(async jwt => { const { authorizeUrl } = await onedriveApi.connect(jwt); window.location.assign(authorizeUrl); return m.connecting })
  const disconnect = () => {
    if (window.confirm(m.confirmDisconnect)) void run(async jwt => { await onedriveApi.disconnect(jwt); setConn(await onedriveApi.connection(jwt)); setTalents(null); setItems([]); setPath([]); setEditing(null); return m.disconnected })
  }
  const download = (item: DriveItem) => run(async jwt => {
    const url = URL.createObjectURL(await onedriveApi.download(jwt, item.id)), a = document.createElement('a')
    a.href = url; a.download = item.name; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 10_000)
  })

  async function run(fn: (jwt: string) => Promise<string | void>) {
    setBusy(true); setError(''); setNotice('')
    try { setNotice((await fn(await token())) ?? '') } catch (e) { setError(errorText(e)) } finally { setBusy(false) }
  }
  async function reload(jwt: string, at = path) {
    if (at.length) setItems((await onedriveApi.children(jwt, at[at.length - 1].id)).items)
    else setTalents((await onedriveApi.talents(jwt)).items)
  }
  const open = (next: Crumb[]) => run(async jwt => { await reload(jwt, next); setPath(next); setEditing(null) })
  const rename = (item: DriveItem, current: string) => {
    const name = window.prompt(m.renamePrompt, current)?.trim()
    if (name && name !== current) void run(async jwt => { await onedriveApi.rename(jwt, item.id, name, item.eTag); await reload(jwt); return m.renamed })
  }
  const remove = (item: DriveItem, label: string) => {
    if (window.confirm(m.confirmDelete(label))) void run(async jwt => { await onedriveApi.remove(jwt, item.id, item.eTag); if (editing?.id === item.id) setEditing(null); await reload(jwt); return m.deleted })
  }
  const edit = (item: DriveItem) => run(async jwt => { const f = await onedriveApi.readText(jwt, item.id); setEditing({ id: f.id, name: f.name, eTag: f.eTag, content: f.content }) })
  function submit(fn: (jwt: string, data: FormData) => Promise<string>) {
    return (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const form = e.currentTarget, data = new FormData(form); void run(async jwt => { const done = await fn(jwt, data); form.reset(); return done }) }
  }
  const createTalent = submit(async (jwt, d) => { await onedriveApi.createTalent(jwt, String(d.get('displayName'))); await reload(jwt); return m.created })
  const createFile = submit(async (jwt, d) => { await onedriveApi.createText(jwt, folder!.id, String(d.get('name')), String(d.get('content'))); await reload(jwt); return m.created })
  const upload = submit(async (jwt, d) => { const r = await onedriveApi.upload(jwt, folder!.id, d.get('file') as File); await reload(jwt); return `${m.uploaded} ${r.sha256}` })
  // Save sends the eTag read with the file: if someone changed it in OneDrive meanwhile → VERSION_CONFLICT, nothing overwritten.
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const content = String(new FormData(e.currentTarget).get('content')), current = editing!
    void run(async jwt => { const r = await onedriveApi.updateText(jwt, current.id, content, current.eTag); setEditing({ ...current, eTag: r.eTag, content }); await reload(jwt); return m.saved })
  }

  return <main><DemoHeader />
    <div className="notification-toolbar"><h1>{m.title}</h1><Link href="/pwa/home">{m.back}</Link></div>
    <p>{m.help}</p>
    <section className="card"><h2>{m.connection}</h2>
      {!conn ? <p>{t.common.loading}</p>
        : conn.status === 'not_configured' ? <p>{m.notConfigured}</p>
        : conn.status === 'shared' ? <p>{m.shared}</p>
        : conn.status === 'connected' ? <p className="drive-path"><span>{m.connected(conn.account?.displayName ?? '', conn.account?.driveType ?? '')}</span>{conn.canManage && <button onClick={disconnect} disabled={busy}>{m.disconnect}</button>}</p>
        : <><p>{conn.status === 'reconnect_required' ? m.reconnectNeeded : m.notConnected}</p>{conn.canManage ? <button className="auth-primary" onClick={connect} disabled={busy}>{conn.status === 'reconnect_required' ? m.reconnect : m.connect}</button> : <p>{m.askAdmin}</p>}</>}
    </section>
    {usable && <>
    <nav aria-label={m.path} className="drive-path"><button onClick={() => open([])} disabled={busy}>{m.root}</button>{path.map((p, i) => <span key={p.id}>/ <button onClick={() => open(path.slice(0, i + 1))} disabled={busy}>{p.name}</button></span>)}</nav>
    {!folder ? <>
      <form className="card" onSubmit={createTalent}><h2>{m.newTalent}</h2><label htmlFor="displayName">{m.displayName}</label><input id="displayName" name="displayName" required maxLength={80} /><button className="auth-primary" disabled={busy}>{busy ? t.common.loading : m.create}</button></form>
      <section className="card"><h2>{m.talents}</h2>{talents?.length === 0 && <p>{m.empty}</p>}
        <ul className="drive-list">{talents?.map(f => <li key={f.id}><button onClick={() => open([{ id: f.id, name: f.displayName }])} disabled={busy}>{f.displayName}/</button><button onClick={() => rename(f, f.displayName)} disabled={busy}>{m.rename}</button><button onClick={() => remove(f, f.displayName)} disabled={busy}>{m.delete}</button></li>)}</ul></section>
    </> : <>
      <section className="card"><h2>{folder.name}</h2>{items.length === 0 && <p>{m.empty}</p>}
        <ul className="drive-list">{items.map(i => <li key={i.id}>
          {i.kind === 'folder' ? <button onClick={() => open([...path, { id: i.id, name: i.name }])} disabled={busy}>{i.name}/</button> : <span>{i.name} · {size(i.size)}</span>}
          {isText(i.name) && <button onClick={() => edit(i)} disabled={busy}>{m.edit}</button>}
          {i.kind === 'file' && <button onClick={() => download(i)} disabled={busy}>{m.download}</button>}
          <button onClick={() => rename(i, i.name)} disabled={busy}>{m.rename}</button><button onClick={() => remove(i, i.name)} disabled={busy}>{m.delete}</button>
        </li>)}</ul></section>
      {editing && <form className="card" onSubmit={save}><h2>{m.editing}: {editing.name}</h2><label htmlFor="editContent">{m.content}</label><textarea id="editContent" name="content" defaultValue={editing.content} key={editing.eTag} rows={14} maxLength={60000} />
        <p className="drive-path"><button disabled={busy}>{m.save}</button><button type="button" onClick={() => setEditing(null)}>{m.close}</button></p></form>}
      <form className="card" onSubmit={createFile}><h2>{m.newFile}</h2><label htmlFor="fileName">{m.fileName}</label><input id="fileName" name="name" required placeholder="memo.md" pattern={'.+\\.(md|txt|json)'} />
        <label htmlFor="fileContent">{m.content}</label><textarea id="fileContent" name="content" rows={6} maxLength={60000} /><button className="auth-primary" disabled={busy}>{m.create}</button></form>
      <form className="card" onSubmit={upload}><h2>{m.upload}</h2><p>{m.uploadHelp}</p><input aria-label={m.upload} name="file" type="file" required accept={MEDIA} /><button className="auth-primary" disabled={busy}>{busy ? t.common.loading : m.uploadButton}</button></form>
    </>}
    </>}
    {notice && <p role="status" style={{ overflowWrap: 'anywhere' }}>{notice}</p>}{error && <p role="alert" className="auth-error">{error}</p>}
  </main>
}
export function OneDriveDemo() { return <AuthBoundary><Content /></AuthBoundary> }

// Microsoft redirects here (ONEDRIVE_REDIRECT_URI). Code and state go to the BE with this login's bearer token,
// which checks the state belongs to this user and session. They are removed from the URL/history first.
const DENIED = new Error('denied')
let handled: Promise<void> | null = null // StrictMode runs effects twice in dev; the state is single use
function CallbackContent() {
  const [error, setError] = useState('')
  useEffect(() => {
    handled ??= (async () => {
      const q = new URLSearchParams(window.location.search), state = q.get('state'), code = q.get('code')
      window.history.replaceState(null, '', window.location.pathname)
      if (q.get('error')) throw DENIED
      if (!state || !code) throw new ApiError(400, 'ONEDRIVE_STATE_INVALID')
      await onedriveApi.callback(await token(), state, code)
      window.location.replace('/pwa/onedrive')
    })()
    handled.catch(e => setError(e === DENIED ? m.denied : errorText(e)))
  }, [])
  return <main><DemoHeader /><h1>{m.connection}</h1>
    {error ? <><p role="alert" className="auth-error">{error}</p><p><Link href="/pwa/onedrive">{m.title}</Link></p></> : <p role="status">{m.connecting}</p>}</main>
}
export function OneDriveCallback() { return <AuthBoundary><CallbackContent /></AuthBoundary> }
