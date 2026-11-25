import { APICallError, generateText, tool, type LanguageModel, type ModelMessage, type ToolSet } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import type { z } from 'zod'

// ModelGateway.generateOneStep (report §5.1, §10.3): ONE model call, tools declared WITHOUT execute, so the SDK never runs a tool.
// The runner persists the response first, then runs tools through its own executor. maxRetries 0: a retry is a second paid call.
export type ToolSpec = { name: string; description: string; schema: z.ZodType }
export type ToolCallOut = { id: string; name: string; input: unknown }
export type StepOut = { messages: ModelMessage[]; text: string; toolCalls: ToolCallOut[]; finishReason: string; inputTokens?: number; outputTokens?: number; cachedTokens?: number; requestId?: string }
export type StepIn = { system: string; messages: ModelMessage[]; tools: ToolSpec[]; signal: AbortSignal; maxOutputTokens: number }
export type ModelGateway = { provider: string; model: string; step(input: StepIn): Promise<StepOut> }

export function aiSdkGateway(model: LanguageModel, provider: string, modelId: string): ModelGateway {
  return {
    provider, model: modelId,
    async step({ system, messages, tools, signal, maxOutputTokens }) {
      const set: ToolSet = Object.fromEntries(tools.map(t => [t.name, tool({ description: t.description, inputSchema: t.schema })]))
      const r = await generateText({ model, system, messages, tools: set, abortSignal: signal, maxRetries: 0, maxOutputTokens })
      return {
        // Assistant items only (text, reasoning, tool calls). Tool results are rebuilt from the ledger, also for calls the SDK found invalid.
        messages: r.response.messages.filter(m => m.role === 'assistant'),
        text: r.text, finishReason: r.finishReason,
        toolCalls: r.toolCalls.map(c => ({ id: c.toolCallId, name: c.toolName, input: c.input })),
        inputTokens: r.usage.inputTokens, outputTokens: r.usage.outputTokens, cachedTokens: r.usage.inputTokenDetails?.cacheReadTokens, requestId: r.response?.id,
      }
    },
  }
}
export const openAiGateway = (apiKey: string, modelId: string, baseURL?: string) => aiSdkGateway(createOpenAI({ apiKey, baseURL })(modelId), 'openai', modelId)

// Provider answered with an HTTP error → no output was produced (failed). No answer (timeout, network, abort) → unknown.
export function classifyModelError(e: unknown): { kind: 'failed' | 'unknown'; code: string } {
  if (APICallError.isInstance(e) && e.statusCode !== undefined) {
    const s = e.statusCode
    return { kind: 'failed', code: s === 401 || s === 403 ? 'MODEL_AUTH' : s === 429 ? 'MODEL_RATE_LIMITED' : s >= 500 ? 'MODEL_PROVIDER_ERROR' : 'MODEL_REJECTED' }
  }
  return { kind: 'unknown', code: 'MODEL_OUTCOME_UNKNOWN' }
}
