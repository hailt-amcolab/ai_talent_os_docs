import { apiFetch } from './client.ts'
import type { components } from './schema'
export type CoachConversation = components['schemas']['CoachConversation']
export type CoachExecution = components['schemas']['CoachExecution']
const base = '/api/v1/me/coach'
export const coachApi = {
  conversation: (token: string) => apiFetch<CoachConversation>(`${base}/messages`, { token }),
  send: (token: string, requestKey: string, body: string, simulate = false) => apiFetch<CoachExecution>(`${base}/messages`, { token, method: 'POST', body: { requestKey, body, simulate } }),
  runMorning: (token: string, date?: string, simulate = false) => apiFetch<CoachExecution>(`${base}/daily`, { token, method: 'POST', body: { ...(date ? { date } : {}), simulate } }),
  // DEMO ONLY: removes EVERY Talent's morning runs of that day (keeps the shared trends).
  resetMorning: (token: string, date?: string) => apiFetch<components['schemas']['CoachDailyReset']>(`${base}/daily/reset`, { token, method: 'POST', body: date ? { date } : {} }),
  close: (token: string, id: string) => apiFetch<CoachExecution>(`${base}/executions/${encodeURIComponent(id)}/close`, { token, method: 'POST' }),
}
