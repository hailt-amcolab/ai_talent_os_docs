'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { AuthBoundary } from '@/components/auth/AuthBoundary'
import { DemoHeader, errorText } from '@/components/auth/AuthForms'
import { token } from '@/lib/auth/store'
import { agentApi, type Proposal } from '@/lib/api/agent'
import { t } from '@/lib/messages'

// Confirmation page for a proposal made through ChatGPT/MCP (agent_spec/ai-core/API_DESIGN.md §6.2). ChatGPT has no confirm tool:
// the Manager opens this link with their own MFA session; pressing save IS the save (Business Control Plane, one transaction).
function Content() {
  const { proposalId } = useParams<{ proposalId: string }>()
  const [p, setP] = useState<Proposal | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState('')
  const key = useRef<string | null>(null) // same key if a click is retried after a network error
  const load = () => token().then(tk => agentApi.proposal(tk, proposalId)).then(v => { setP(v); setError('') }).catch(e => setError(errorText(e)))
  useEffect(() => { void load() }, [proposalId]) // eslint-disable-line react-hooks/exhaustive-deps
  const act = async (kind: 'confirm' | 'reject') => {
    if (!p) return
    setBusy(true); key.current ??= crypto.randomUUID()
    try {
      const tk = await token()
      type Answer = { receipt?: { targetLabel: string; resultVersion: string | null } }
      const r = (kind === 'confirm' ? await agentApi.confirm(tk, p.proposalId, p.proposalHash, key.current) : await agentApi.reject(tk, p.proposalId, key.current)) as Answer
      key.current = null
      setDone(r.receipt ? t.agent.saved(r.receipt.targetLabel, r.receipt.resultVersion) : t.agent.decided('rejected'))
      await load()
    } catch (e) { setError(errorText(e)) } finally { setBusy(false) }
  }
  return <main><DemoHeader />
    {p && <section className="card">
      <h1>{t.agent.proposal(p.targetLabel)}</h1>
      <table><thead><tr><th>{t.agent.field}</th><th>{t.agent.before}</th><th>{t.agent.after}</th></tr></thead>
        <tbody>{p.changes.map(c => <tr key={c.field}><td>{c.field}</td><td style={{ whiteSpace: 'pre-wrap' }}>{c.before ?? '—'}</td><td style={{ whiteSpace: 'pre-wrap' }}>{c.after ?? '—'}</td></tr>)}</tbody></table>
      <p className="muted">{t.agent.expires(new Date(p.expiresAt).toLocaleString())} · {t.agent.decided(p.state)}</p>
      <p>
        {p.allowedActions.includes('confirm') && <button disabled={busy} onClick={() => { void act('confirm') }}>{t.agent.confirm}</button>}{' '}
        {p.allowedActions.includes('reject') && <button disabled={busy} onClick={() => { void act('reject') }}>{t.agent.reject}</button>}
      </p>
    </section>}
    {done && <p role="status">{done}</p>}
    {error && <p role="alert">{error}</p>}
  </main>
}

export function ProposalConfirm() { return <AuthBoundary><Content /></AuthBoundary> }
