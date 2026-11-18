import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'
import type { Env } from '../../config/env.ts'
import type { DemoIdentity } from '../../core/auth.ts'
import { AppError } from '../../core/errors.ts'
import type { Database } from '../../infra/database/client.ts'
import { DriveClient, Graph, GRAPH, appTokenSource, type DriveItem, type TokenSource } from '../../infra/onedrive/graph.ts'
import { MicrosoftIdentity } from '../../infra/onedrive/identity.ts'
import { OneDriveDemo } from './service.ts'

// Delegated OneDrive (technology demo): ONE main Microsoft account for the whole system (slot 'primary').
// An allowed user (ONEDRIVE_ADMIN_EMAILS, checked in routes.ts) connects it once; every login then uses that drive,
// matching "every manager sees every talent". No fallback to another account or to the app-only drive.
// Personal accounts need this flow: app-only (client credentials) cannot reach a personal OneDrive.
type Actor = Pick<DemoIdentity, 'userId' | 'sessionId'>
type Box = { refresh: string; access: string; expiresAt: number }
type Identity = Pick<MicrosoftIdentity, 'authorizeUrl' | 'code' | 'refresh'>
const STATE_TTL_SECONDS = 600
const EARLY_MS = 60_000 // refresh a minute before expiry
const DRIVE_TYPES = new Set(['personal', 'business', 'documentLibrary'])
const sha = (v: string) => createHash('sha256').update(v).digest()
const SLOT = 'primary' // AAD of the token box too

// AES-256-GCM; AAD binds a ciphertext to its row, so a box copied into another user's row does not open.
// ponytail: one key, no rotation; add a key id byte when keys must rotate.
export function seal(key: Buffer, plain: string, aad: string) {
  const iv = randomBytes(12), c = createCipheriv('aes-256-gcm', key, iv)
  c.setAAD(Buffer.from(aad))
  const body = Buffer.concat([c.update(plain, 'utf8'), c.final()])
  return Buffer.concat([iv, c.getAuthTag(), body])
}
export function unseal(key: Buffer, box: Uint8Array, aad: string) {
  const b = Buffer.from(box), d = createDecipheriv('aes-256-gcm', key, b.subarray(0, 12))
  d.setAAD(Buffer.from(aad)); d.setAuthTag(b.subarray(12, 28))
  return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString('utf8')
}

export class OneDriveConnections {
  private readonly db: Database
  private readonly identity: Identity
  private readonly key: Buffer
  private readonly http: typeof fetch
  constructor(db: Database, identity: Identity, key: Buffer, http: typeof fetch = fetch) { this.db = db; this.identity = identity; this.key = key; this.http = http }

  // Connect: fresh state + PKCE bound to this login session; older pending states of the session are dropped.
  async start(a: Actor) {
    const state = randomBytes(32).toString('base64url'), verifier = randomBytes(32).toString('base64url'), hash = sha(state)
    await this.db.$transaction([
      this.db.$executeRaw`DELETE FROM app_private.tech_demo_onedrive_oauth_states WHERE auth_user_id=${a.userId}::uuid AND (session_id=${a.sessionId}::uuid OR expires_at<now())`,
      this.db.$executeRaw`INSERT INTO app_private.tech_demo_onedrive_oauth_states(state_hash,auth_user_id,session_id,verifier_box,expires_at)
        VALUES (${hash},${a.userId}::uuid,${a.sessionId}::uuid,${seal(this.key, verifier, hash.toString('hex'))},now()+make_interval(secs=>${STATE_TTL_SECONDS}))`,
    ])
    return { authorizeUrl: this.identity.authorizeUrl(state, createHash('sha256').update(verifier).digest('base64url')) }
  }

  // Callback: consume the state exactly once (DELETE … RETURNING), then check owner session and expiry.
  async complete(a: Actor, state: string, code: string) {
    const hash = sha(state)
    const rows = await this.db.$queryRaw<Array<{ session_id: string; verifier_box: Uint8Array; expired: boolean }>>`
      DELETE FROM app_private.tech_demo_onedrive_oauth_states WHERE state_hash=${hash} AND auth_user_id=${a.userId}::uuid
      RETURNING session_id::text, verifier_box, expires_at<now() AS expired`
    const row = rows[0]
    if (!row || row.session_id !== a.sessionId || row.expired) throw new AppError('ONEDRIVE_STATE_INVALID', 400)
    const t = await this.identity.code(code, unseal(this.key, row.verifier_box, hash.toString('hex')))
    if (!t.refreshToken) throw new AppError('ONEDRIVE_CONNECT_FAILED', 400) // offline_access not granted
    const graph = new Graph({ token: async () => t.accessToken, unauthorized: async () => new AppError('ONEDRIVE_CONNECT_FAILED', 400) }, this.http)
    // Account ID (not e-mail) identifies the Microsoft account; the drive comes from /me/drive, never typed in.
    const me = await graph.json<{ id: string; displayName?: string }>('me.get', `${GRAPH}/me?$select=id,displayName`)
    const drive = await graph.json<{ id: string; driveType: string }>('me.drive', `${GRAPH}/me/drive?$select=id,driveType`)
    if (!DRIVE_TYPES.has(drive.driveType)) throw new AppError('ONEDRIVE_DRIVE_UNSUPPORTED', 502)
    const box = seal(this.key, JSON.stringify({ refresh: t.refreshToken, access: t.accessToken, expiresAt: t.expiresAt } satisfies Box), SLOT)
    await this.db.$executeRaw`INSERT INTO app_private.tech_demo_onedrive_connections(slot,connected_by,ms_account_id,display_name,drive_id,drive_type,status,token_box,access_expires_at)
      VALUES (${SLOT},${a.userId}::uuid,${me.id},${me.displayName?.slice(0, 200) ?? null},${drive.id},${drive.driveType},'connected',${box},${new Date(t.expiresAt)})
      ON CONFLICT (slot) DO UPDATE SET connected_by=EXCLUDED.connected_by,ms_account_id=EXCLUDED.ms_account_id,display_name=EXCLUDED.display_name,drive_id=EXCLUDED.drive_id,drive_type=EXCLUDED.drive_type,
        status='connected',token_box=EXCLUDED.token_box,access_expires_at=EXCLUDED.access_expires_at,version=tech_demo_onedrive_connections.version+1,connected_at=now(),updated_at=now()`
    return this.status()
  }

  // Never returns tokens or the drive ID.
  async status() {
    const rows = await this.db.$queryRaw<Array<{ status: 'connected' | 'reconnect_required'; display_name: string | null; drive_type: string; connected_at: Date }>>`
      SELECT status,display_name,drive_type,connected_at FROM app_private.tech_demo_onedrive_connections WHERE slot=${SLOT}`
    const r = rows[0]
    return r ? { status: r.status, account: { displayName: r.display_name ?? '', driveType: r.drive_type }, connectedAt: r.connected_at.toISOString() } : { status: 'not_connected' as const }
  }

  // Disconnect: the row (and its sealed tokens) is deleted, and every pending state with it.
  async disconnect() {
    await this.db.$transaction([
      this.db.$executeRaw`DELETE FROM app_private.tech_demo_onedrive_connections WHERE slot=${SLOT}`,
      this.db.$executeRaw`DELETE FROM app_private.tech_demo_onedrive_oauth_states`,
    ])
  }

  async drive() {
    const rows = await this.db.$queryRaw<Array<{ status: string; drive_id: string; token_box: Uint8Array | null }>>`
      SELECT status,drive_id,token_box FROM app_private.tech_demo_onedrive_connections WHERE slot=${SLOT}`
    const row = rows[0]
    if (!row) throw new AppError('ONEDRIVE_NOT_CONNECTED', 409)
    if (row.status !== 'connected' || !row.token_box) throw new AppError('ONEDRIVE_RECONNECT_REQUIRED', 409)
    let known: Box | undefined = JSON.parse(unseal(this.key, row.token_box, SLOT))
    const source: TokenSource = {
      token: async stale => {
        if (known && known.access !== stale && known.expiresAt > Date.now() + EARLY_MS) return known.access
        known = undefined
        return this.refreshed(stale)
      },
      unauthorized: async () => { await this.markReconnect(); return new AppError('ONEDRIVE_RECONNECT_REQUIRED', 409) },
    }
    return new DriveClient(new Graph(source, this.http), row.drive_id)
  }

  // Row lock serializes refresh: concurrent requests wait, then reuse the token the first one stored.
  // Refresh tokens rotate, so writing a stale one back would log the user out; the lock prevents that.
  private async refreshed(stale?: string) {
    const outcome = await this.db.$transaction(async tx => {
      const rows = await tx.$queryRaw<Array<{ status: string; token_box: Uint8Array | null }>>`
        SELECT status,token_box FROM app_private.tech_demo_onedrive_connections WHERE slot=${SLOT} FOR UPDATE`
      if (!rows[0]) return { error: 'ONEDRIVE_NOT_CONNECTED' }
      if (rows[0].status !== 'connected' || !rows[0].token_box) return { error: 'ONEDRIVE_RECONNECT_REQUIRED' }
      const box = JSON.parse(unseal(this.key, rows[0].token_box, SLOT)) as Box
      if (box.access !== stale && box.expiresAt > Date.now() + EARLY_MS) return { access: box.access } // someone else refreshed
      let t
      try { t = await this.identity.refresh(box.refresh) } catch (e) {
        if (!(e instanceof AppError && e.code === 'ONEDRIVE_RECONNECT_REQUIRED')) throw e // outage/app config: keep tokens, do not lock the user out
        await tx.$executeRaw`UPDATE app_private.tech_demo_onedrive_connections SET status='reconnect_required',token_box=NULL,access_expires_at=NULL,version=version+1,updated_at=now() WHERE slot=${SLOT}`
        return { error: 'ONEDRIVE_RECONNECT_REQUIRED' }
      }
      const next: Box = { refresh: t.refreshToken ?? box.refresh, access: t.accessToken, expiresAt: t.expiresAt }
      await tx.$executeRaw`UPDATE app_private.tech_demo_onedrive_connections SET token_box=${seal(this.key, JSON.stringify(next), SLOT)},access_expires_at=${new Date(next.expiresAt)},version=version+1,updated_at=now() WHERE slot=${SLOT}`
      return { access: next.access }
    })
    if ('error' in outcome) throw new AppError(outcome.error!, 409)
    return outcome.access
  }
  private async markReconnect() {
    await this.db.$executeRaw`UPDATE app_private.tech_demo_onedrive_connections SET status='reconnect_required',token_box=NULL,access_expires_at=NULL,version=version+1,updated_at=now() WHERE slot=${SLOT} AND status='connected'`
  }
}

// Picks the drive for a request by mode. Mode is explicit (ONEDRIVE_AUTH_MODE); never mixes the two.
export class OneDriveRuntime {
  readonly mode: 'app' | 'delegated'
  readonly connections?: OneDriveConnections
  private readonly appDrive?: DriveClient
  private readonly root: string
  private readonly homes = new Map<string, { item: Promise<DriveItem>; at: number }>()
  constructor(mode: 'app' | 'delegated', root: string, x: { appDrive?: DriveClient; connections?: OneDriveConnections }) {
    this.mode = mode; this.root = root; this.appDrive = x.appDrive; this.connections = x.connections
  }
  async demo() { return new OneDriveDemo(this.mode === 'app' ? this.appDrive! : await this.connections!.drive(), this.root, this.homes) }
}

export function createOneDrive(env: Env, db: Database): OneDriveRuntime | undefined {
  const { ONEDRIVE_AUTH_MODE: mode, ONEDRIVE_CLIENT_ID: clientId, ONEDRIVE_CLIENT_SECRET: clientSecret } = env
  if (!mode || !clientId || !clientSecret) return undefined
  if (mode === 'app') {
    const identity = new MicrosoftIdentity({ authority: env.ONEDRIVE_TENANT_ID!, clientId, clientSecret })
    return new OneDriveRuntime('app', env.ONEDRIVE_ROOT_FOLDER, { appDrive: new DriveClient(new Graph(appTokenSource(identity)), env.ONEDRIVE_DRIVE_ID!) })
  }
  const identity = new MicrosoftIdentity({ authority: env.ONEDRIVE_AUTHORITY_TENANT, clientId, clientSecret, redirectUri: env.ONEDRIVE_REDIRECT_URI })
  return new OneDriveRuntime('delegated', env.ONEDRIVE_ROOT_FOLDER, { connections: new OneDriveConnections(db, identity, Buffer.from(env.ONEDRIVE_TOKEN_KEY!, 'base64')) })
}
