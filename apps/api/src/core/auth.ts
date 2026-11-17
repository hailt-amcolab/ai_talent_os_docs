export interface TokenPair { access_token: string; refresh_token: string; expires_at: number }
export interface VerifiedToken { userId: string; sessionId: string; aal: 'aal1' | 'aal2' }
export interface AuthFactor { id: string; factor_type: string; status: string }
export interface AuthUser { id: string; email: string; factors: AuthFactor[] }
export interface AuthProvider {
  register(email: string, password: string, redirectTo: string): Promise<TokenPair | null>
  login(email: string, password: string): Promise<TokenPair>
  verifyToken(token: string): Promise<VerifiedToken>
  user(token: string): Promise<AuthUser>
  factors(token: string): Promise<AuthFactor[]>
  enroll(token: string): Promise<{ factorId: string; qr: string; secret: string }>
  removePending(token: string, factorId: string): Promise<void>
  challenge(token: string, factorId: string): Promise<{ id: string; expiresAt: Date }>
  verify(token: string, factorId: string, challengeId: string, code: string): Promise<TokenPair>
  signOut(token: string): Promise<void>
}
export interface DemoIdentity extends VerifiedToken { email: string; factors: AuthFactor[] }
