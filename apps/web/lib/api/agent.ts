import { apiFetch } from './client.ts'
import type { components } from './schema'
export type AgentRun = components['schemas']['AgentRun']
export type AgentMessage = components['schemas']['AgentMessage']
export type Proposal = components['schemas']['Proposal']
export type AgentRole = 'talent' | 'manager'
// The route decides the role (Talent /me, Manager /admin with an MFA session), never a body field (agent_spec/ai-core/API_DESIGN.md §2).
const base = (role: AgentRole) => role === 'talent' ? '/api/v1/me/agent' : '/api/v1/admin/agent'
const id = encodeURIComponent
export const agentApi = {
  conversation: (token: string, role: AgentRole, requestKey: string) => apiFetch<components['schemas']['AgentConversation']>(`${base(role)}/conversations`, { token, method: 'POST', body: { requestKey } }),
  send: (token: string, role: AgentRole, conv: string, requestKey: string, body: string) => apiFetch<AgentRun>(`${base(role)}/conversations/${id(conv)}/messages`, { token, method: 'POST', body: { requestKey, body } }),
  messages: (token: string, role: AgentRole, conv: string) => apiFetch<{ items: AgentMessage[]; pending: AgentMessage[] }>(`${base(role)}/conversations/${id(conv)}/messages?limit=100`, { token }),
  runs: (token: string, role: AgentRole, conv: string) => apiFetch<{ items: AgentRun[] }>(`${base(role)}/conversations/${id(conv)}/runs`, { token }),
  cancel: (token: string, role: AgentRole, run: string, requestKey: string) => apiFetch<AgentRun>(`${base(role)}/runs/${id(run)}/cancel`, { token, method: 'POST', body: { requestKey } }),
  // Proposals are confirmed at the Business Control Plane: the confirm IS the save, with its receipt (no AI run is woken).
  proposal: (token: string, p: string) => apiFetch<Proposal>(`/api/v1/admin/proposals/${id(p)}`, { token }),
  confirm: (token: string, p: string, proposalHash: string, requestKey: string) => apiFetch(`/api/v1/admin/proposals/${id(p)}/confirm`, { token, method: 'POST', body: { requestKey, proposalHash } }),
  reject: (token: string, p: string, requestKey: string) => apiFetch(`/api/v1/admin/proposals/${id(p)}/reject`, { token, method: 'POST', body: { requestKey } }),
}
