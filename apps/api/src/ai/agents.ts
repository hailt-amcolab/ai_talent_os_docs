import { Agent, retryPolicies, type Model } from '@openai/agents'
import { instructionsFor } from './context/builder.ts'
import { sdkTools, type AgentChannel, type AppRunContext } from './tools/define.ts'
import { TOOLS } from './tools/index.ts'

// The two agents (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §2.1). No handoff, no multi-agent. `model` is a model name
// (route from config) or a Model instance (tests). store:false keeps no state at OpenAI (ADR-06, P0 VT-04).
export type AgentConfig = { model: string | Model; maxOutputTokens: number; reasoningEffort: 'none' | 'low' | 'medium'; writesEnabled: boolean }

export function agentFor(channel: AgentChannel, cfg: AgentConfig) {
  return new Agent<AppRunContext>({
    name: channel === 'talent' ? 'talent_coach' : 'manager_assistant',
    instructions: rc => instructionsFor(rc.context.pack),
    tools: sdkTools(TOOLS as never, channel, cfg.writesEnabled),
    model: cfg.model,
    modelSettings: {
      maxTokens: cfg.maxOutputTokens, store: false, parallelToolCalls: false, reasoning: { effort: cfg.reasoningEffort },
      // Retry only before anything was streamed (the SDK never retries after the first event): network / 429 / 5xx.
      retry: { maxRetries: 2, backoff: { initialDelayMs: 500, maxDelayMs: 4000, multiplier: 2, jitter: true },
        policy: retryPolicies.any(retryPolicies.networkError(), retryPolicies.httpStatus([429, 500, 502, 503])) },
    },
  })
}
