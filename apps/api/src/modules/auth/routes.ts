import { createRoute, z } from '@hono/zod-openapi'
import type { AppDeps } from '../../container.ts'
import { apiModule } from '../../http/module.ts'
import { bearer, clientAddress } from '../../http/auth.ts'
import { Login, Register, RegistrationResult, SessionResult, AuthStateSchema, Id, errors, json } from './schemas.ts'
export function authModule(deps: AppDeps) {
  const app = apiModule(), service = deps.auth!
  const success = <S extends z.ZodType>(schema: S) => ({ description: 'Success', content: { 'application/json': { schema } } })
  const route = <M extends 'get' | 'post' | 'delete', P extends string, S extends z.ZodType, C extends 200 | 201 | 202 = 200>(method: M, path: P, response: S, status: C = 200 as C) => ({ method, path, responses: { ...errors, ...({ [status]: success(response) } as { [K in C]: ReturnType<typeof success<S>> }) } })

  app.openapi(createRoute({ ...route('post', '/api/v1/auth/register', RegistrationResult, 201), request: { body: json(Register) } }), async c => { const i = c.req.valid('json'); return c.json(await service.register(i.email, i.password, c.req.header('Origin')!, clientAddress(c)), 201) })
  app.openapi(createRoute({ ...route('post', '/api/v1/auth/login', SessionResult), request: { body: json(Login) } }), async c => { const i = c.req.valid('json'); return c.json(await service.login(i.email, i.password, clientAddress(c)), 200) })
  app.openapi(createRoute(route('get', '/api/v1/auth/state', AuthStateSchema)), async c => c.json(await service.state(bearer(c)), 200))
  const Options = z.object({ factors: z.array(z.object({ factorId: z.string(), status: z.string() })), enrollmentAllowed: z.boolean() }).openapi('MfaOptions')
  app.openapi(createRoute(route('get', '/api/v1/auth/mfa/options', Options)), async c => c.json(await service.options(bearer(c)), 200))
  app.openapi(createRoute({ ...route('post', '/api/v1/auth/mfa/enroll', z.object({ factorId: z.string(), qr: z.string(), secret: z.string() }).openapi('TotpEnrollment'), 201) }), async c => c.json(await service.enroll(bearer(c)), 201))
  app.openapi(createRoute({ ...route('post', '/api/v1/auth/mfa/challenges', z.object({ challengeRef: z.uuid(), expiresAt: z.string() }), 201), request: { body: json(z.object({ factorId: z.uuid() }).strict()) } }), async c => c.json(await service.challenge(bearer(c), c.req.valid('json').factorId), 201))
  app.openapi(createRoute({ ...route('post', '/api/v1/auth/mfa/challenges/{id}/verify', SessionResult), request: { params: Id, body: json(z.object({ factorId: z.uuid(), code: z.string().regex(/^\d{6}$/) }).strict()) } }), async c => { const i=c.req.valid('json'); return c.json(await service.verify(bearer(c), i.factorId, c.req.valid('param').id, i.code), 200) })
  app.openapi(createRoute({ method: 'delete', path: '/api/v1/auth/mfa/factors/{id}', request: { params: Id }, responses: { 204: { description: 'Pending factor removed' }, ...errors } }), async c => { await service.removePending(bearer(c), c.req.valid('param').id); return c.body(null, 204) })
  app.openapi(createRoute({ method: 'post', path: '/api/v1/auth/logout', responses: { 204: { description: 'Session revoked' }, ...errors } }), async c => { await service.logout(bearer(c)); return c.body(null, 204) })
  return app
}
