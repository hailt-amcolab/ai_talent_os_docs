import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'

// Verified actor (report §10.3 ActorContext). Built by the server from the session, never from the model or the request body.
export type TalentActor = { kind: 'talent'; userId: string; talentId: string; status: string }
export type ManagerActor = { kind: 'manager'; userId: string; managerId: string }
export type Actor = TalentActor | ManagerActor
type Tx = Pick<Database, '$queryRaw'>

export async function talentActor(tx: Tx, userId: string): Promise<TalentActor> {
  const [t] = await tx.$queryRaw<Array<{ id: string; status: string }>>`
    SELECT t.id::text,t.status FROM public.talents t JOIN app_private.auth_principals p ON p.auth_user_id=t.auth_user_id AND p.principal_kind='talent'
    WHERE t.auth_user_id=${userId}::uuid`
  if (!t) throw new AppError('TALENT_REQUIRED', 403)
  return { kind: 'talent', userId, talentId: t.id, status: t.status }
}

// A deactivated Manager is refused at every read/commit, not only at login (report §7.1).
export async function managerActor(tx: Tx, userId: string): Promise<ManagerActor> {
  const [m] = await tx.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM public.managers WHERE auth_user_id=${userId}::uuid AND is_active`
  if (!m) throw new AppError('MANAGER_REQUIRED', 403)
  return { kind: 'manager', userId, managerId: m.id }
}

// Same check, used by the worker at claim time and before each write tool: still the same kind of active actor?
export async function stillActive(tx: Tx, a: Actor): Promise<boolean> {
  try {
    if (a.kind === 'manager') return (await managerActor(tx, a.userId)).managerId === a.managerId
    const t = await talentActor(tx, a.userId)
    return t.talentId === a.talentId && t.status === 'in_use'
  } catch { return false }
}
