import { AppError } from '../core/errors.ts'
import { stillActive, type Actor } from './actor.ts'
import type { Tx } from './tx.ts'

// Capability registry + AccessPolicy (agent_spec/ai-core/SECURITY_DESIGN.md §3.2–§3.3). Deterministic: prompts, tool
// descriptions and the SDK's isEnabled are never the permission check. Resource checks stay in the service/handler.
export type Channel = 'talent' | 'manager_ui' | 'manager_mcp' | 'admin_ui' | 'system'
export type Capability = 'context.read' | 'talent.search' | 'instruction.history' | 'talent_profile.prepare' | 'ai_instruction.prepare' | 'proposal.decide'

const ALLOWED: Record<Capability, readonly Channel[]> = {
  'context.read': ['talent', 'manager_ui', 'manager_mcp'],
  'talent.search': ['manager_ui', 'manager_mcp'],
  'instruction.history': ['manager_ui', 'manager_mcp'],
  'talent_profile.prepare': ['manager_ui', 'manager_mcp'],
  'ai_instruction.prepare': ['manager_ui', 'manager_mcp'],
  // MCP has no confirm: a person confirms through an authenticated Manager session (ADR-14, API_DESIGN.md §6.2).
  'proposal.decide': ['manager_ui', 'admin_ui'],
}
const MANAGER_CHANNELS: readonly Channel[] = ['manager_ui', 'manager_mcp', 'admin_ui']

export function assertCapability(actor: Actor, channel: Channel, capability: Capability) {
  const managerChannel = MANAGER_CHANNELS.includes(channel)
  if (!ALLOWED[capability].includes(channel) || managerChannel !== (actor.kind === 'manager')) throw new AppError('ACTION_NOT_ALLOWED', 403)
}

// Account state is re-checked inside every command transaction (SECURITY_DESIGN.md §3.4), not only at login.
export async function assertActive(tx: Tx, actor: Actor) {
  if (!await stillActive(tx, actor)) throw new AppError('ACTOR_DISABLED', 403)
}
