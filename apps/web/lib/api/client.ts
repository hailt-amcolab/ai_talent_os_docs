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
  body?: unknown // đối tượng sẽ được JSON.stringify
  token?: string // access token của Supabase khi đã có đăng nhập; gửi dạng Bearer
}

export async function apiFetch<T>(path: string, { body, token, headers, ...init }: ApiOptions = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      cache: 'no-store',
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR')
  }
  if (res.status === 204) return undefined as T
  const data: unknown = await res.json().catch(() => null)
  if (!res.ok) throw toApiError(res.status, data)
  return data as T
}
