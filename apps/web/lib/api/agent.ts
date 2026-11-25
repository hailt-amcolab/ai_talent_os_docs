import { apiFetch } from './client.ts'
import type { components } from './schema'
export type AgentRun = components['schemas']['AgentRun']
export type AgentEntry = components['schemas']['AgentEntry']
export type AgentProposal = components['schemas']['AgentProposal']
export type AgentRole = 'talent' | 'manager'
// Report §10.1: the route decides the role (Talent /me, Manager /admin with an MFA session), never a body field.
const base = (role: AgentRole) => role === 'talent' ? '/api/v1/me/agent' : '/api/v1/admin/agent'
const key = () => crypto.randomUUID()
const id = encodeURIComponent
export const agentApi = {
  conversation: (token: string, role: AgentRole, requestKey: string) => apiFetch<components['schemas']['AgentConversation']>(`${base(role)}/conversations`, { token, method: 'POST', body: { requestKey } }),
  send: (token: string, role: AgentRole, conv: string, requestKey: string, body: string) => apiFetch<AgentRun>(`${base(role)}/conversations/${id(conv)}/messages`, { token, method: 'POST', body: { requestKey, body } }),
  entries: (token: string, role: AgentRole, conv: string) => apiFetch<{ items: AgentEntry[] }>(`${base(role)}/conversations/${id(conv)}/messages?limit=100`, { token }),
  runs: (token: string, role: AgentRole, conv: string) => apiFetch<{ items: AgentRun[] }>(`${base(role)}/conversations/${id(conv)}/runs`, { token }),
  cancel: (token: string, role: AgentRole, run: string) => apiFetch<AgentRun>(`${base(role)}/runs/${id(run)}/cancel`, { token, method: 'POST', body: { requestKey: key() } }),
  proposal: (token: string, p: string) => apiFetch<AgentProposal>(`/api/v1/admin/agent/proposals/${id(p)}`, { token }),
  confirm: (token: string, p: string, proposalHash: string) => apiFetch(`/api/v1/admin/agent/proposals/${id(p)}/confirm`, { token, method: 'POST', body: { requestKey: key(), proposalHash } }),
  reject: (token: string, p: string) => apiFetch(`/api/v1/admin/agent/proposals/${id(p)}/reject`, { token, method: 'POST', body: { requestKey: key() } }),
  commit: (token: string, p: string) => apiFetch(`/api/v1/admin/agent/proposals/${id(p)}/commit`, { token, method: 'POST', body: { requestKey: key() } }),
}
