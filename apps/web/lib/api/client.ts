import { API_URL } from '../config.ts'

// Lớp gọi BE duy nhất của FE. BE luôn trả lỗi dạng { error: { code, requestId } } (apps/api/src/http/app.ts).
// Component không gọi fetch trực tiếp tới BE; tạo hàm theo tính năng trong lib/api/<tính năng>.ts dùng apiFetch.
export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly requestId?: string
  constructor(status: number, code: string, requestId?: string) {
    super(code)
    this.status = status
    this.code = code
    this.requestId = requestId
  }
}

export function toApiError(status: number, body: unknown): ApiError {
  const error = (body as { error?: { code?: unknown; requestId?: unknown } } | null)?.error
  const code = typeof error?.code === 'string' ? error.code : `HTTP_${status}`
  const requestId = typeof error?.requestId === 'string' ? error.requestId : undefined
  return new ApiError(status, code, requestId)
}

export interface ApiOptions extends Omit<RequestInit, 'body'> {
  body?: unknown // đối tượng sẽ được JSON.stringify; Blob/File gửi nguyên byte (Content-Type theo loại tệp)
  token?: string // access token của Supabase khi đã có đăng nhập; gửi dạng Bearer
}

// ngrok bản miễn phí chặn GET từ trình duyệt bằng trang cảnh báo HTML (ERR_NGROK_6024, không có CORS) → fetch báo lỗi mạng.
// ponytail: chỉ gửi khi API nằm sau ngrok; production không có header này.
const NGROK_HEADERS: Record<string, string> = /\.ngrok(-free)?\.(app|dev|io)$/.test(new URL(API_URL || 'http://localhost').hostname)
  ? { 'ngrok-skip-browser-warning': '1' }
  : {}

async function send(path: string, { body, token, headers, ...init }: ApiOptions): Promise<Response> {
  const raw = typeof Blob !== 'undefined' && body instanceof Blob
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      cache: 'no-store',
      headers: {
        ...NGROK_HEADERS,
        ...(body === undefined || raw ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : raw ? (body as Blob) : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR')
  }
  if (!res.ok) throw toApiError(res.status, await res.json().catch(() => null))
  return res
}

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const res = await send(path, options)
  if (res.status === 204) return undefined as T
  return await res.json().catch(() => null) as T
}

// Binary response (file download). Same headers and error shape as apiFetch.
export async function apiBlob(path: string, options: ApiOptions = {}): Promise<Blob> { return (await send(path, options)).blob() }
