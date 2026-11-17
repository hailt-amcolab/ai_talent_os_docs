import { apiFetch } from './client.ts'
import type { components } from './schema'
export const pwaApi = {
  subscribe: (token: string, body: PushSubscriptionJSON) => apiFetch<{ active: boolean }>('/api/v1/me/push-subscriptions', { token, method: 'POST', body: { endpoint: body.endpoint, keys: body.keys, label: /iPhone|iPad/.test(navigator.userAgent) ? 'iPhone / iPad' : /Android/.test(navigator.userAgent) ? 'Android' : 'Desktop browser' } }),
  state: (token: string, endpoint: string) => apiFetch<{ active: boolean }>('/api/v1/me/push-subscriptions/state', { token, method: 'POST', body: { endpoint } }),
  unsubscribe: (token: string, endpoint: string) => apiFetch<void>('/api/v1/me/push-subscriptions', { token, method: 'DELETE', body: { endpoint } }),
  devices: (token: string) => apiFetch<components['schemas']['PushDeviceList']>('/api/v1/me/push-devices', { token }),
  test: (token: string, recipientUserId: string) => apiFetch<components['schemas']['PushTestResult']>('/api/v1/dev/push-test', { token, method: 'POST', body: { recipientUserId } }),
}
