import { apiBlob, apiFetch } from './client.ts'
import type { components } from './schema'
export type DriveItem = components['schemas']['DriveItem']
export type TalentFolder = components['schemas']['TalentFolder']
const base = '/api/v1/dev/onedrive'
const item = (id: string) => `${base}/items/${encodeURIComponent(id)}`
export type OneDriveConnection = components['schemas']['OneDriveConnection']
export const onedriveApi = {
  connection: (token: string) => apiFetch<OneDriveConnection>(`${base}/connection`, { token }),
  connect: (token: string) => apiFetch<{ authorizeUrl: string }>(`${base}/connection/start`, { token, method: 'POST' }),
  callback: (token: string, state: string, code: string) => apiFetch<OneDriveConnection>(`${base}/connection/callback`, { token, method: 'POST', body: { state, code } }),
  disconnect: (token: string) => apiFetch<void>(`${base}/connection`, { token, method: 'DELETE' }),
  download: (token: string, id: string) => apiBlob(`${item(id)}/content`, { token }),
  talents: (token: string) => apiFetch<components['schemas']['TalentFolderList']>(`${base}/talents`, { token }),
  createTalent: (token: string, displayName: string) => apiFetch<TalentFolder>(`${base}/talents`, { token, method: 'POST', body: { displayName } }),
  children: (token: string, id: string) => apiFetch<components['schemas']['DriveItemList']>(`${item(id)}/children`, { token }),
  rename: (token: string, id: string, name: string, eTag: string) => apiFetch<DriveItem>(item(id), { token, method: 'PATCH', body: { name, eTag } }),
  remove: (token: string, id: string, eTag: string) => apiFetch<void>(item(id), { token, method: 'DELETE', body: { eTag } }),
  readText: (token: string, id: string) => apiFetch<components['schemas']['DriveText']>(`${item(id)}/text`, { token }),
  createText: (token: string, folderId: string, name: string, content: string) => apiFetch<DriveItem>(`${item(folderId)}/text`, { token, method: 'POST', body: { name, content } }),
  updateText: (token: string, id: string, content: string, eTag: string) => apiFetch<DriveItem>(`${item(id)}/text`, { token, method: 'PUT', body: { content, eTag } }),
  // Not in OpenAPI: raw streamed body (see apps/api/src/modules/onedrive/routes.ts).
  upload: (token: string, folderId: string, file: File) => apiFetch<DriveItem & { sha256: string }>(`${item(folderId)}/media?name=${encodeURIComponent(file.name)}`, { token, method: 'POST', body: file }),
}
