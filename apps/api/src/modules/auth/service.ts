import type { AuthProvider, DemoIdentity } from '../../core/auth.ts'
import { AppError } from '../../core/errors.ts'
import { AuthRepository } from './repository.ts'
export class AuthService {
  readonly repo: AuthRepository
  readonly provider: AuthProvider
  constructor(repo: AuthRepository, provider: AuthProvider) { this.repo = repo; this.provider = provider }
  async authenticate(token: string, full = false): Promise<DemoIdentity> {
    const a = await this.provider.verifyToken(token), user = await this.provider.user(token)
    if (user.id !== a.userId) throw new AppError('AUTH_REQUIRED', 401)
    await this.repo.session(a)
    const factors = user.factors.filter(f => f.factor_type === 'totp')
    if (full && factors.some(f => f.status === 'verified') && a.aal !== 'aal2') throw new AppError('MFA_REQUIRED', 403)
    return { ...a, email: user.email, factors }
  }
  async state(token: string) {
    const a = await this.authenticate(token), totpEnabled = a.factors.some(f => f.status === 'verified'), required = totpEnabled && a.aal !== 'aal2'
    return { userId: a.userId, email: a.email, currentAal: a.aal, totpEnabled, state: required ? 'mfa_required' as const : 'ready' as const, allowedNextRoute: required ? '/pwa/mfa' : '/pwa/home' }
  }
  async register(email: string, password: string, origin: string, client: string) {
    await this.repo.rateLimit('register:' + client, 5)
    const session = await this.provider.register(email, password, origin + '/pwa/login')
    return { status: session ? 'signed_in' as const : 'confirmation_required' as const, session, auth: session ? await this.state(session.access_token) : null }
  }
  async login(email: string, password: string, client: string) {
    await this.repo.rateLimit('login:' + client, 20)
    const session = await this.provider.login(email, password)
    return { session, auth: await this.state(session.access_token) }
  }
  async options(token: string) {
    const a = await this.authenticate(token)
    return { factors: a.factors.map(f => ({ factorId: f.id, status: f.status })), enrollmentAllowed: !a.factors.some(f => f.status === 'verified') }
  }
  async enroll(token: string) {
    const a = await this.authenticate(token)
    if (a.factors.some(f => f.status === 'verified')) throw new AppError('MFA_ENROLLMENT_NOT_ALLOWED', 403)
    if (a.factors.some(f => f.status === 'unverified')) throw new AppError('MFA_SETUP_PENDING', 409)
    await this.repo.rateLimit('enroll:' + a.userId, 3)
    return this.provider.enroll(token)
  }
  async removePending(token: string, factorId: string) {
    const a = await this.authenticate(token)
    if (a.factors.some(f => f.status === 'verified')) throw new AppError('MFA_ENROLLMENT_NOT_ALLOWED', 403)
    await this.provider.removePending(token, factorId)
  }
  async challenge(token: string, factorId: string) {
    const a = await this.authenticate(token)
    if (!a.factors.some(f => f.id === factorId)) throw new AppError('FACTOR_NOT_ALLOWED', 403)
    await this.repo.rateLimit('challenge:' + a.sessionId, 10)
    const c = await this.provider.challenge(token, factorId)
    return { challengeRef: c.id, expiresAt: c.expiresAt.toISOString() }
  }
  async verify(token: string, factorId: string, challengeId: string, code: string) {
    const a = await this.authenticate(token)
    if (!a.factors.some(f => f.id === factorId)) throw new AppError('FACTOR_NOT_ALLOWED', 403)
    await this.repo.rateLimit('verify:' + a.sessionId, 10)
    const session = await this.provider.verify(token, factorId, challengeId, code)
    const verified = await this.provider.verifyToken(session.access_token)
    if (verified.userId !== a.userId || verified.sessionId !== a.sessionId || verified.aal !== 'aal2') throw new AppError('MFA_PROOF_INVALID', 401)
    return { session, auth: await this.state(session.access_token) }
  }
  async limit(key: string, perMinute: number) { await this.repo.rateLimit(key, perMinute) }
  async limitPush(a: DemoIdentity, recipient: string) { await this.repo.rateLimit('push:' + a.userId, 5); await this.repo.rateLimit('push-recipient:' + recipient, 10) }
  async logout(token: string) {
    const a = await this.provider.verifyToken(token)
    await this.repo.session(a)
    await this.repo.revoke(a)
    await this.provider.signOut(token).catch(() => {})
  }
}
