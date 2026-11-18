// Microsoft identity platform v2.0 token endpoint: app-only (client credentials) and delegated (auth code + PKCE).
// Docs: https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow
//       https://learn.microsoft.com/entra/identity-platform/v2-oauth2-client-creds-grant-flow
// ponytail: plain fetch, not MSAL: MSAL's token cache is per process; here each connection's refresh token lives
// sealed in its own DB row with a row lock around refresh (modules/onedrive/connections.ts). Three requests, no cache plugin.
import { AppError } from '../../core/errors.ts'
import { msLog } from './log.ts'

export interface TokenSet { accessToken: string; refreshToken?: string; expiresAt: number }
export interface IdentityConfig { authority: string; clientId: string; clientSecret: string; redirectUri?: string }
// offline_access → refresh token; User.Read → /me; Files.ReadWrite → the signed-in user's own files only.
export const DELEGATED_SCOPES = 'offline_access User.Read Files.ReadWrite'
const LOGIN = 'https://login.microsoftonline.com'

type TokenOp = 'token.app' | 'token.code' | 'token.refresh'
interface TokenError { error?: string; error_codes?: number[]; trace_id?: string; correlation_id?: string }
// AADSTS codes that mean the app registration or env is wrong, not the user: tenant not found, app not found,
// bad secret, expired secret, redirect URI mismatch, app not enabled for personal accounts.
const APP_CODES = new Set([90002, 700016, 7000215, 7000222, 50011, 50194, 700054, 9002331])

function tokenError(op: TokenOp, status: number, body: TokenError) {
  if (status >= 500) return new AppError('ONEDRIVE_UNAVAILABLE', 503)
  if (body.error === 'invalid_client' || body.error === 'unauthorized_client' || body.error_codes?.some(c => APP_CODES.has(c))) return new AppError('ONEDRIVE_APP_MISCONFIGURED', 502)
  if (op === 'token.refresh' && ['invalid_grant', 'interaction_required', 'consent_required'].includes(body.error ?? '')) return new AppError('ONEDRIVE_RECONNECT_REQUIRED', 409)
  if (op === 'token.code') return new AppError('ONEDRIVE_CONNECT_FAILED', 400) // code expired, reused or PKCE mismatch
  return new AppError('ONEDRIVE_AUTH_FAILED', 502)
}

export class MicrosoftIdentity {
  private readonly cfg: IdentityConfig
  private readonly http: typeof fetch
  constructor(cfg: IdentityConfig, http: typeof fetch = fetch) { this.cfg = cfg; this.http = http }
  private url(kind: 'authorize' | 'token') { return `${LOGIN}/${encodeURIComponent(this.cfg.authority)}/oauth2/v2.0/${kind}` }

  authorizeUrl(state: string, codeChallenge: string) {
    return this.url('authorize') + '?' + new URLSearchParams({
      client_id: this.cfg.clientId, response_type: 'code', response_mode: 'query', redirect_uri: this.cfg.redirectUri!,
      scope: DELEGATED_SCOPES, state, code_challenge: codeChallenge, code_challenge_method: 'S256', prompt: 'select_account',
    })
  }
  code(code: string, verifier: string) { return this.token('token.code', { grant_type: 'authorization_code', code, redirect_uri: this.cfg.redirectUri!, code_verifier: verifier, scope: DELEGATED_SCOPES }) }
  refresh(refreshToken: string) { return this.token('token.refresh', { grant_type: 'refresh_token', refresh_token: refreshToken, scope: DELEGATED_SCOPES }) }
  async app() {
    const t = await this.token('token.app', { grant_type: 'client_credentials', scope: 'https://graph.microsoft.com/.default' })
    // App-only token without Application permissions (no "roles") fails later with 401/403: say why now.
    try { if (!JSON.parse(Buffer.from(t.accessToken.split('.')[1] ?? '', 'base64url').toString()).roles?.length) msLog({ code: 'MS_APP_TOKEN_NO_ROLES', op: 'token.app' }) } catch { /* not a JWT */ }
    return t
  }

  private async token(op: TokenOp, params: Record<string, string>): Promise<TokenSet> {
    let res: Response
    try {
      res = await this.http(this.url('token'), { method: 'POST', body: new URLSearchParams({ client_id: this.cfg.clientId, client_secret: this.cfg.clientSecret, ...params }) })
    } catch { msLog({ code: 'MS_TOKEN_NETWORK_ERROR', op }); throw new AppError('ONEDRIVE_UNAVAILABLE', 503) }
    const body = await res.json().catch(() => ({})) as TokenError & { access_token?: string; refresh_token?: string; expires_in?: number }
    if (!res.ok || !body.access_token) {
      // error_description is not logged: it can echo account names. error_codes (AADSTS…) + trace/correlation IDs are enough for Microsoft support.
      msLog({ code: 'MS_TOKEN_ERROR', op, status: res.status, msError: body.error, msCodes: body.error_codes, traceId: body.trace_id, correlationId: body.correlation_id })
      throw tokenError(op, res.status, body)
    }
    return { accessToken: body.access_token, refreshToken: body.refresh_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 }
  }
}
