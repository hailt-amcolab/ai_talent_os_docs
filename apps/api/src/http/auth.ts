import type { Context } from 'hono'
import { unauthorized, forbidden } from '../core/errors.ts'

export function bearer(c: Context): string {
  const value = c.req.header('Authorization')
  if (!value?.startsWith('Bearer ') || value.length > 16384) throw unauthorized()
  return value.slice(7)
}
export function requireOrigin(c: Context, origins: string[]) {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(c.req.method) && !origins.includes(c.req.header('Origin') ?? '')) throw forbidden('ORIGIN_NOT_ALLOWED')
}
export function clientAddress(c: Context): string {
  // Never trust caller-supplied X-Forwarded-For without a trusted reverse proxy.
  const env = c.env as { incoming?: { socket?: { remoteAddress?: string } } } | undefined
  return env?.incoming?.socket?.remoteAddress ?? 'unknown-client'
}
