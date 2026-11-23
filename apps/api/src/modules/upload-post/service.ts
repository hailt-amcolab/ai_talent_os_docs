import { AppError } from '../../core/errors.ts'
import { PLATFORMS, UploadPostError, type Platform, type UploadPostClient } from '../../infra/upload-post/client.ts'

// Upload-Post connect demo (/api/v1/dev/upload-post/*): one Upload-Post profile per demo login.
// Connect uses the Connect API (oauth/{platform}/start): the talent signs in on the network's own page, no Upload-Post page.
// ponytail: profile name derived from the login id, no DB table; the real feature stores it on talents (spec UP-D1).
export type SnsAccount = { platform: Platform; status: 'not_connected' | 'connected' | 'reauth_required'; handle?: string; displayName?: string }

export const profileName = (userId: string) => `demo_t_${userId.replace(/-/g, '')}`

function toAccount(platform: Platform, v: unknown): SnsAccount {
  // Unconnected platforms come back as null (one profile) or "" (list).
  if (!v || typeof v !== 'object') return { platform, status: 'not_connected' }
  const o = v as Record<string, unknown>
  const s = (k: string) => (typeof o[k] === 'string' && o[k] ? (o[k] as string) : undefined)
  return { platform, status: o.reauth_required === true ? 'reauth_required' : 'connected', handle: s('handle'), displayName: s('display_name') }
}

export class UploadPostDemo {
  private readonly client: UploadPostClient
  constructor(client: UploadPostClient) { this.client = client }

  // Reads the real state from Upload-Post every time: never trusts connect_status from the return URL (spec §6.2).
  async accounts(userId: string): Promise<{ profile: boolean; accounts: SnsAccount[] }> {
    let body: Record<string, unknown>
    try {
      body = await this.client.call('GET', `/api/uploadposts/users/${encodeURIComponent(profileName(userId))}`)
    } catch (e) {
      if (e instanceof UploadPostError && e.kind === 'not_found') return { profile: false, accounts: PLATFORMS.map(p => ({ platform: p, status: 'not_connected' as const })) }
      throw e
    }
    const profile = body.profile as { social_accounts?: Record<string, unknown> } | undefined
    const social = profile?.social_accounts ?? {}
    return { profile: true, accounts: PLATFORMS.map(p => toAccount(p, social[p])) }
  }

  async connect(userId: string, platform: Platform, returnUrl: string) {
    await this.ensureProfile(userId)
    return this.client.startConnect(profileName(userId), platform, returnUrl)
  }

  // Same name every time: a lost response or a double click ends in 409, which means it already exists.
  private async ensureProfile(userId: string) {
    try {
      await this.client.call('POST', '/api/uploadposts/users', { json: { username: profileName(userId), display_name: 'AI Talent OS demo' } })
    } catch (e) {
      if (e instanceof UploadPostError && e.kind === 'conflict') return
      // Every login needs its own profile; the plan caps them (Free: 2). Tell this apart from other plan limits.
      if (e instanceof UploadPostError && e.providerCode === 'PROFILE_LIMIT_REACHED') throw new AppError('UPLOAD_POST_PROFILE_LIMIT', 409)
      throw e
    }
  }
}
