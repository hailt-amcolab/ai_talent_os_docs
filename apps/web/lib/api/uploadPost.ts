import { apiFetch } from './client.ts'
import type { components } from './schema'
export type SnsAccounts = components['schemas']['SnsAccounts']
export type SnsPlatform = components['schemas']['SnsAccount']['platform']
const base = '/api/v1/dev/upload-post'
export const uploadPostApi = {
  accounts: (token: string) => apiFetch<SnsAccounts>(`${base}/accounts`, { token }),
  connect: (token: string, platform: SnsPlatform) => apiFetch<components['schemas']['SnsConnectStart']>(`${base}/connect`, { token, method: 'POST', body: { platform } }),
}
