import { tool, type Tool } from '@openai/agents'
import type { z } from 'zod'
import { AppError } from '../../core/errors.ts'
import { assertCapability, type Capability, type Channel } from '../../control/access.ts'
import type { Actor } from '../../control/actor.ts'
import type { ProposalService } from '../../control/proposals.ts'
import type { Database } from '../../infra/database/client.ts'
import type { ContextPack } from '../context/builder.ts'

// Tools are thin adapters (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §2.4): parse (SDK + strict zod), take the actor from the
// run context (never from the model), check the capability, call one Control Plane / module function. No business rule here.
export type AgentChannel = Extract<Channel, 'talent' | 'manager_ui'>
export type ToolChannel = AgentChannel | 'manager_mcp'
export type ToolEvent = { tool: string; writes: boolean; ok: boolean; code?: string }
export type AppRunContext = {
  // runId/conversationId: null for MCP calls (ChatGPT runs the loop; no agent run here); grantId: the MCP grant.
  actor: Actor; channel: ToolChannel; runId: string | null; conversationId: string | null; grantId?: string; pack: ContextPack
  services: { db: Database; proposals: ProposalService }
  events: ToolEvent[] // what tools did in this run: decides answer_only vs action_result
}
export type ToolDef<S extends z.ZodObject> = {
  name: string; capability: Capability; channels: ToolChannel[]; writes: boolean; ready: boolean; description: string
  parameters: S; run(args: z.infer<S>, ctx: AppRunContext): Promise<unknown>
}
export const defineTool = <S extends z.ZodObject>(d: ToolDef<S>) => d

// Model-visible error (code + messageKey + retryable), never a stack, a provider message or data outside the actor's scope.
export function toolError(e: unknown) {
  const code = e instanceof AppError ? e.code : 'TOOL_FAILED'
  const kind = code === 'INPUT_INVALID' ? 'invalid' : ['VERSION_CONFLICT', 'REQUEST_KEY_REUSED'].includes(code) ? 'conflict'
    : ['FEATURE_NOT_READY', 'TOOL_FAILED'].includes(code) ? 'unavailable' : 'denied'
  return { kind, code, messageKey: 'agent.tool.' + code.toLowerCase(), retryable: kind === 'invalid' || kind === 'conflict' }
}

export function sdkTools(defs: Array<ToolDef<z.ZodObject>>, channel: AgentChannel, writesEnabled: boolean): Array<Tool<AppRunContext>> {
  return defs.filter(d => d.ready && d.channels.includes(channel) && (writesEnabled || !d.writes)).map(d => tool<z.ZodObject, AppRunContext>({
    name: d.name, description: d.description, parameters: d.parameters, timeoutMs: 10_000,
    // Arguments that fail the schema reach the model as INPUT_INVALID + issues it can fix (AI_RUNTIME_DESIGN.md §2.4), not the SDK's
    // generic "An error occurred" (eval 26/11: the model could not repair an empty expectedVersion from that text).
    errorFunction: (rc, error) => {
      rc.context.events.push({ tool: d.name, writes: d.writes, ok: false, code: 'INPUT_INVALID' })
      return JSON.stringify({ kind: 'invalid', code: 'INPUT_INVALID', retryable: true, issues: issuesOf(error) })
    },
    async execute(args, rc) {
      const ctx = rc!.context
      try {
        assertCapability(ctx.actor, ctx.channel, d.capability) // even if a tool was offered by mistake
        const data = await d.run(args as never, ctx)
        ctx.events.push({ tool: d.name, writes: d.writes, ok: true })
        return { kind: 'ok', data }
      } catch (e) {
        const err = toolError(e)
        ctx.events.push({ tool: d.name, writes: d.writes, ok: false, code: err.code })
        return err
      }
    },
  }))
}

// zod issues (path + message, max 10), wherever the SDK wrapped them; no raw input values are echoed.
function issuesOf(error: unknown): Array<{ path: string; message: string }> {
  const seen = new Set<unknown>()
  for (let e: any = error; e && !seen.has(e); e = e.cause) {
    seen.add(e)
    const list = e.issues ?? e.errors
    if (Array.isArray(list)) return list.slice(0, 10).map((i: any) => ({ path: (i.path ?? []).join('.') || '(root)', message: String(i.message ?? 'invalid') }))
  }
  return [{ path: '(root)', message: 'arguments do not match the tool schema' }]
}
