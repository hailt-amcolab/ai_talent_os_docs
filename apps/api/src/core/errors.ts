import type { ContentfulStatusCode } from 'hono/utils/http-status'

// Lỗi nghiệp vụ dùng chung cho mọi module. Service ném AppError; http/app.ts đổi thành
// { error: { code, requestId } } với đúng mã HTTP. Không đưa thông tin nhạy cảm vào code.
export class AppError extends Error {
  readonly code: string
  readonly status: ContentfulStatusCode

  constructor(code: string, status: ContentfulStatusCode = 400) {
    super(code)
    this.code = code
    this.status = status
  }
}

export const notFound = (code = 'NOT_FOUND') => new AppError(code, 404)
export const conflict = (code: string) => new AppError(code, 409)
export const unauthorized = (code = 'AUTH_REQUIRED') => new AppError(code, 401)
export const forbidden = (code = 'FORBIDDEN') => new AppError(code, 403)
