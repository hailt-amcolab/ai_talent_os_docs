// Microsoft Graph adapter for one drive. The token comes from a TokenSource:
//   app-only   → shared organization drive (OneDrive for Business / SharePoint), client credentials
//   delegated  → the signed-in user's own drive (personal or work), auth code + PKCE, per-user refresh token
// Tokens never leave the BE and are never logged.
// Docs: https://learn.microsoft.com/graph/api/resources/driveitem
//       https://learn.microsoft.com/graph/api/driveitem-createuploadsession
//       https://learn.microsoft.com/graph/throttling
import { AppError } from '../../core/errors.ts'
import { currentRequestId, msLog } from './log.ts'
import type { MicrosoftIdentity } from './identity.ts'

export interface DriveItem {
  id: string; name: string; eTag: string; size: number; lastModifiedDateTime: string
  folder?: { childCount: number }; file?: { mimeType: string }; parentReference?: { id?: string }
}
// token(stale): pass the token Graph just rejected with 401 to force a new one. unauthorized(): what to throw after that also fails.
export interface TokenSource { token(stale?: string): Promise<string>; unauthorized(): Promise<AppError> }
export const GRAPH = 'https://graph.microsoft.com/v1.0'
// Upload session fragments must be multiples of 320 KiB and < 60 MiB per request.
export const CHUNK = 320 * 1024 * 16 // 5 MiB
const RETRY_MAX_SECONDS = 5 // longer Retry-After → tell the caller instead of holding the request
const SELECT = '$select=id,name,eTag,size,lastModifiedDateTime,folder,file,parentReference'
type Init = Omit<RequestInit, 'headers'> & { headers?: Record<string, string> }
const json = (method: string, body: unknown, headers: Record<string, string> = {}): Init => ({ method, headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) })
const seg = (name: string) => encodeURIComponent(name)
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// Graph status → app error code the FE can act on.
function graphError(status: number, message: string) {
  if (status === 400 && /SPO license/i.test(message)) return new AppError('ONEDRIVE_DRIVE_UNSUPPORTED', 502) // app-only on a tenant without SharePoint (e.g. personal OneDrive)
  if (status === 403) return new AppError('ONEDRIVE_FORBIDDEN', 403)
  if (status === 404) return new AppError('NOT_FOUND', 404)
  if (status === 409) return new AppError('NAME_TAKEN', 409)
  if (status === 412) return new AppError('VERSION_CONFLICT', 409)
  if (status === 413) return new AppError('MEDIA_TOO_LARGE', 413)
  if (status === 423) return new AppError('ONEDRIVE_LOCKED', 409)
  if (status === 429 || status === 503) return new AppError('ONEDRIVE_THROTTLED', 503)
  if (status === 507) return new AppError('ONEDRIVE_QUOTA_EXCEEDED', 507)
  if (status >= 500) return new AppError('ONEDRIVE_UNAVAILABLE', 503)
  return new AppError('ONEDRIVE_REJECTED', 502)
}

export class Graph {
  private readonly auth: TokenSource | null
  private readonly http: typeof fetch
  constructor(auth: TokenSource | null, http: typeof fetch = fetch) { this.auth = auth; this.http = http }

  // op: fixed label for logs ("item.get"), never an ID or file name. auth=false for pre-authenticated URLs.
  async request(op: string, url: string, init: Init = {}, auth = true): Promise<Response> {
    let token = auth && this.auth ? await this.auth.token() : '', refreshed = false
    const rid = currentRequestId()
    for (let attempt = 0; ; attempt++) {
      const headers: Record<string, string> = { ...init.headers, ...(rid ? { 'client-request-id': rid } : {}) }
      if (token) headers.Authorization = `Bearer ${token}`
      let res: Response
      try { res = await this.http(url, { ...init, headers }) } catch { msLog({ code: 'GRAPH_NETWORK_ERROR', op }); throw new AppError('ONEDRIVE_UNAVAILABLE', 503) }
      if (res.ok || (init.redirect === 'manual' && res.status >= 300 && res.status < 400)) return res
      // 401 once: token expired or revoked → force a new token and retry
      if (res.status === 401 && token && !refreshed) { await res.body?.cancel(); refreshed = true; token = await this.auth!.token(token); continue }
      const retryAfter = Number(res.headers.get('Retry-After') ?? '1')
      if ((res.status === 429 || res.status === 503) && attempt < 2 && retryAfter >= 0 && retryAfter <= RETRY_MAX_SECONDS) { await res.body?.cancel(); await sleep(retryAfter * 1000); continue }
      const body = await res.json().catch(() => null) as { error?: { code?: string; message?: string; innerError?: { code?: string; 'request-id'?: string } } } | null
      msLog({ code: 'GRAPH_ERROR', op, status: res.status, msCode: body?.error?.code, msInnerCode: body?.error?.innerError?.code, msRequestId: res.headers.get('request-id') ?? body?.error?.innerError?.['request-id'], retryAfter: res.headers.get('Retry-After') ?? undefined })
      if (res.status === 401 && token) throw await this.auth!.unauthorized()
      throw graphError(res.status, body?.error?.message ?? '')
    }
  }
  async json<T>(op: string, url: string, init?: Init) { return await (await this.request(op, url, init)).json() as T }
}

export class DriveClient {
  readonly driveId: string
  private readonly graph: Graph
  constructor(graph: Graph, driveId: string) { this.graph = graph; this.driveId = driveId }
  private url(path: string) { return `${GRAPH}/drives/${seg(this.driveId)}${path}` }
  private item$(op: string, path: string, init?: Init) { return this.graph.json<DriveItem>(op, this.url(path), init) }

  item(id: string) { return this.item$('item.get', `/items/${seg(id)}?${SELECT}`) }
  async byPath(path: string): Promise<DriveItem | null> {
    try { return await this.item$('item.byPath', `/root:/${path.split('/').map(seg).join('/')}?${SELECT}`) } catch (e) { if (e instanceof AppError && e.status === 404) return null; throw e }
  }
  // ponytail: first page only (200 items); follow @odata.nextLink when folders grow.
  async children(id: string) { return (await this.graph.json<{ value: DriveItem[] }>('children.list', this.url(`/items/${seg(id)}/children?$top=200&${SELECT}`))).value }
  // conflictBehavior=fail: a retry never silently creates "name 1".
  createFolder(parentId: string, name: string) { return this.item$('folder.create', `/items/${seg(parentId)}/children`, json('POST', { name, folder: {}, '@microsoft.graph.conflictBehavior': 'fail' })) }
  async ensureFolder(parentId: string, name: string) {
    try { return await this.createFolder(parentId, name) } catch (e) {
      if (!(e instanceof AppError && e.code === 'NAME_TAKEN')) throw e
      const found = (await this.children(parentId)).find(i => i.name === name && i.folder)
      if (!found) throw e
      return found
    }
  }
  // Simple upload (≤ 250 MB, used here for small text files only).
  createFile(parentId: string, name: string, body: string, type: string) {
    return this.item$('file.create', `/items/${seg(parentId)}:/${seg(name)}:/content?@microsoft.graph.conflictBehavior=fail`, { method: 'PUT', headers: { 'Content-Type': type }, body })
  }
  // If-Match eTag: someone else changed it → 412, never overwrite blindly.
  replaceFile(id: string, body: string, type: string, eTag: string) { return this.item$('file.replace', `/items/${seg(id)}/content`, { method: 'PUT', headers: { 'Content-Type': type, 'If-Match': eTag }, body }) }
  rename(id: string, name: string, eTag: string) { return this.item$('item.rename', `/items/${seg(id)}`, json('PATCH', { name }, { 'If-Match': eTag })) }
  async remove(id: string, eTag: string) { await this.graph.request('item.delete', this.url(`/items/${seg(id)}`), { method: 'DELETE', headers: { 'If-Match': eTag } }) } // goes to the recycle bin
  // /content answers 302 to a short-lived pre-authenticated URL: follow it ourselves so the bearer token is never sent there.
  async download(id: string) {
    const res = await this.graph.request('file.download', this.url(`/items/${seg(id)}/content`), { redirect: 'manual' })
    if (res.status < 300) return res
    await res.body?.cancel()
    const location = res.headers.get('Location')
    if (!location?.startsWith('https://')) throw new AppError('ONEDRIVE_REJECTED', 502)
    return this.graph.request('file.download.redirect', location, {}, false)
  }
  async text(id: string) { return (await this.download(id)).text() }

  // Resumable upload: stream in CHUNK-sized fragments, never buffer the whole file.
  async upload(parentId: string, name: string, size: number, chunks: AsyncIterable<Uint8Array>): Promise<DriveItem> {
    if (size <= 0) throw new AppError('MEDIA_EMPTY', 422)
    const { uploadUrl } = await this.graph.json<{ uploadUrl: string }>('upload.session', this.url(`/items/${seg(parentId)}:/${seg(name)}:/createUploadSession`), json('POST', { item: { '@microsoft.graph.conflictBehavior': 'fail' } }))
    // The upload URL is pre-authenticated: sending Authorization to it is an error.
    const put = (data: Uint8Array<ArrayBuffer>, offset: number) => this.graph.request('upload.fragment', uploadUrl, { method: 'PUT', headers: { 'Content-Range': `bytes ${offset}-${offset + data.length - 1}/${size}` }, body: data }, false)
    const buf = new Uint8Array(CHUNK)
    let offset = 0, fill = 0, received = 0
    try {
      for await (const piece of chunks) {
        received += piece.length
        if (received > size) throw new AppError('MEDIA_SIZE_MISMATCH', 422)
        for (let p = 0; p < piece.length;) {
          const n = Math.min(CHUNK - fill, piece.length - p)
          buf.set(piece.subarray(p, p + n), fill); fill += n; p += n
          // keep the last fragment for the final PUT, whose response carries the DriveItem
          if (fill === CHUNK && offset + fill < size) { await put(buf, offset); offset += fill; fill = 0 }
        }
      }
      if (received !== size) throw new AppError('MEDIA_SIZE_MISMATCH', 422)
      return await (await put(buf.subarray(0, fill), offset)).json() as DriveItem
    } catch (e) {
      await this.graph.request('upload.cancel', uploadUrl, { method: 'DELETE' }, false).catch(() => undefined) // cancel the session
      throw e
    }
  }
}

// App-only token for the shared organization drive. Concurrent first calls may both fetch: harmless.
export function appTokenSource(identity: MicrosoftIdentity): TokenSource {
  let cached: { value: string; expiresAt: number } | undefined
  return {
    async token(stale) {
      if (cached && cached.value !== stale && cached.expiresAt > Date.now() + 120_000) return cached.value
      const t = await identity.app()
      cached = { value: t.accessToken, expiresAt: t.expiresAt }
      return t.accessToken
    },
    async unauthorized() { return new AppError('ONEDRIVE_FORBIDDEN', 403) },
  }
}
