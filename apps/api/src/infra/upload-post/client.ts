// infra/upload-post/client.ts: chỉ BE và worker gọi. Không log API key, URL có chữ ký, chú thích.
// Tài liệu: https://docs.upload-post.com/api/upload-video/ , /guides/rate-limits , /guides/error-handling
// Đặc tả: agent_spec/upload-post-agent-spec/HUONG_DAN_TICH_HOP_VI.md §5.
import { AppError } from '../../core/errors.ts'

export type Platform = 'instagram' | 'tiktok' | 'youtube'
export const PLATFORMS: readonly Platform[] = ['instagram', 'tiktok', 'youtube']
export type UploadPostConfig = { apiBase: string; settingsBase: string; apiKey: string; timeoutMs: number }

// kind quyết định bước tiếp theo; worker đọc kind, không đọc message của nhà cung cấp.
export type FailureKind =
  | 'outcome_unknown' // lệnh ghi có thể đã được nhận: đối soát, KHÔNG gửi lại bằng khóa mới
  | 'rate_limited'    // chờ tới retryAfterSeconds
  | 'quota'           // hết hạn mức gói / số bài 24 giờ / số lịch chờ: không thử lại vòng ngắn
  | 'auth'            // API key sai: mở cầu dao, không thử lại (10 lần sai liên tiếp bị chặn IP)
  | 'plan'            // 403: vượt số profile, TikTok trên gói Free, ghế bị khóa
  | 'invalid' | 'not_found' | 'conflict' | 'unavailable'

export class UploadPostError extends AppError {
  readonly kind: FailureKind
  readonly providerCode: string | null
  readonly retryAfterSeconds: number | null
  constructor(kind: FailureKind, providerCode: string | null = null, retryAfterSeconds: number | null = null) {
    super(`UPLOAD_POST_${kind.toUpperCase()}`, kind === 'invalid' ? 422 : kind === 'not_found' ? 404 : kind === 'conflict' ? 409 : 503)
    this.kind = kind
    this.providerCode = providerCode
    this.retryAfterSeconds = retryAfterSeconds
  }
}

type Body = Record<string, unknown>
const text = (v: unknown) => (typeof v === 'string' ? v : null)

// Trạng thái HTTP + thân lỗi → FailureKind. write=true với POST/DELETE/PATCH.
export function classify(status: number, body: Body, headers: Headers, write: boolean): UploadPostError {
  const code = text(body.error_code) ?? text(body.code)
  if (status === 401) return new UploadPostError('auth', code)
  if (status === 403) return new UploadPostError('plan', code)
  if (status === 404) return new UploadPostError('not_found', code)
  if (status === 409) return new UploadPostError('conflict', code) // IDEMPOTENCY_KEY_IN_USE: đợi rồi đối soát cùng khóa
  if (status === 429) {
    const message = text(body.message) ?? ''
    if (code === 'SCHEDULED_POSTS_LIMIT' || Array.isArray(body.violations) || /monthly limit/i.test(message)) return new UploadPostError('quota', code)
    const reset = Number(headers.get('X-RateLimit-Reset'))
    const wait = Number.isFinite(reset) && reset > 0 ? Math.max(5, Math.ceil(reset - Date.now() / 1000)) : 60
    return new UploadPostError('rate_limited', code, wait)
  }
  if (status === 400 || status === 422) return new UploadPostError('invalid', code)
  return new UploadPostError(write ? 'outcome_unknown' : 'unavailable', code)
}

type CallOptions = { json?: unknown; form?: FormData; query?: Record<string, string>; idempotencyKey?: string; base?: 'api' | 'settings' }

export class UploadPostClient {
  private readonly cfg: UploadPostConfig
  private readonly http: typeof fetch
  constructor(cfg: UploadPostConfig, http: typeof fetch = fetch) { this.cfg = cfg; this.http = http }

  // path cố định trong mã (ví dụ '/api/upload'); id do người dùng gửi phải qua encodeURIComponent.
  async call<T extends Body>(method: 'GET' | 'POST' | 'DELETE' | 'PATCH', path: string, o: CallOptions = {}): Promise<T> {
    if (!path.startsWith('/api/')) throw new Error('UPLOAD_POST_PATH_INVALID')
    const url = new URL(path, o.base === 'settings' ? this.cfg.settingsBase : this.cfg.apiBase)
    for (const [k, v] of Object.entries(o.query ?? {})) url.searchParams.set(k, v)
    const headers: Record<string, string> = { Authorization: `Apikey ${this.cfg.apiKey}`, Accept: 'application/json' }
    if (o.idempotencyKey) headers['Idempotency-Key'] = o.idempotencyKey
    let body: BodyInit | undefined
    if (o.form) body = o.form // để fetch tự đặt Content-Type kèm boundary
    else if (o.json !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(o.json) }
    const write = method !== 'GET'
    let res: Response
    try {
      // redirect 'manual': không mang Authorization sang host khác
      res = await this.http(url, { method, headers, body, redirect: 'manual', signal: AbortSignal.timeout(this.cfg.timeoutMs) })
    } catch {
      throw new UploadPostError(write ? 'outcome_unknown' : 'unavailable', 'NETWORK')
    }
    const parsed = (await res.json().catch(() => ({}))) as Body
    if (res.status >= 300 && res.status < 400) throw new UploadPostError('unavailable', 'REDIRECT')
    if (!res.ok) throw classify(res.status, parsed, res.headers, write)
    return parsed as T
  }

  // Connect API: https://docs.upload-post.com/api/connect-api
  // Returns the network's own sign-in URL (Google, Instagram, TikTok); state is single use, valid 900 s.
  // After consent the browser comes back to redirect_url with connect_status, platform, error_code.
  async startConnect(profile: string, platform: Platform, redirectUrl: string) {
    const r = await this.call('POST', `/api/uploadposts/oauth/${platform}/start`, { json: { profile, redirect_url: redirectUrl } })
    const authorizeUrl = text(r.authorize_url)
    let url: URL | null = null
    try { if (authorizeUrl) url = new URL(authorizeUrl) } catch { url = null }
    if (!url || url.protocol !== 'https:') throw new UploadPostError('unavailable', 'BAD_RESPONSE')
    return { authorizeUrl: url.toString(), expiresInSeconds: typeof r.expires_in === 'number' ? r.expires_in : 900 }
  }

  async cancelSchedule(jobId: string) {
    await this.call('DELETE', `/api/uploadposts/schedule/${encodeURIComponent(jobId)}`)
  }
}
