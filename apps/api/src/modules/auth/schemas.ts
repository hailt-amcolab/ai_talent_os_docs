import { z } from '@hono/zod-openapi'
export const Login = z.object({ email: z.email().trim().toLowerCase().max(254), password: z.string().min(1).max(256) }).strict()
export const Register = Login.extend({ password: z.string().min(8).max(256).regex(/[A-Za-z]/).regex(/[0-9]/) })
export const AuthStateSchema = z.object({ userId: z.uuid(), email: z.string(), currentAal: z.enum(['aal1','aal2']), totpEnabled: z.boolean(), state: z.enum(['ready','mfa_required']), allowedNextRoute: z.string() }).openapi('AuthNextState')
export const Tokens = z.object({ access_token: z.string(), refresh_token: z.string(), expires_at: z.number() })
export const SessionResult = z.object({ session: Tokens, auth: AuthStateSchema }).openapi('AuthSessionResult')
export const RegistrationResult = z.object({ status: z.enum(['signed_in','confirmation_required']), session: Tokens.nullable(), auth: z.union([AuthStateSchema, z.null()]) }).openapi('RegistrationResult')
export const Id = z.object({ id: z.uuid() })
export const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Forbidden' }, 409: { description: 'Conflict' }, 422: { description: 'Invalid input' }, 429: { description: 'Rate limited' }, 503: { description: 'Provider unavailable' } }
export const json = <S extends z.ZodType>(schema: S) => ({ required: true, content: { 'application/json': { schema } } })
