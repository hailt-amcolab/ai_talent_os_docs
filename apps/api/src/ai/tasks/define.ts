import { zodTextFormat } from 'openai/helpers/zod'
import type { z } from 'zod'
import { AppError } from '../../core/errors.ts'
import type { PromptRef } from '../prompts/registry.ts'

// AI Task Mode (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §3.1, ADR-03): one bounded Responses API call with a strict JSON
// schema, no tools, no loop, store:false. The caller (a module service) writes the business result.
export type TaskDef<I, O> = { name: string; prompt: PromptRef; instructions(input: I): string; input(input: I): string; output: z.ZodType<O>; maxOutputTokens: number }
export type TaskUsage = { requestRef: string | null; inputTokens: number; outputTokens: number; cachedTokens: number; reasoningTokens: number }
export type TaskResult<O> = { data: O; usage: TaskUsage[] }
// The subset of the OpenAI client used here (tests pass a fake).
export type TaskClient = { responses: { parse(body: Record<string, unknown>, opts?: { signal?: AbortSignal; timeout?: number }): Promise<{ id: string; output_parsed: unknown; output?: Array<{ type: string; content?: Array<{ type: string }> }>; usage?: {
  input_tokens: number; output_tokens: number; input_tokens_details?: { cached_tokens?: number }; output_tokens_details?: { reasoning_tokens?: number } } }> } }

export async function runTask<I, O>(client: TaskClient, def: TaskDef<I, O>, input: I, cfg: { model: string; timeoutMs: number }): Promise<TaskResult<O>> {
  const usage: TaskUsage[] = []
  for (let attempt = 0; attempt < 2; attempt++) { // strict schema makes a bad output rare: one more call, then give up
    const r = await client.responses.parse({ model: cfg.model, instructions: def.instructions(input), input: def.input(input), store: false,
      max_output_tokens: def.maxOutputTokens, prompt_cache_key: def.name, text: { format: zodTextFormat(def.output as never, def.name) } }, { timeout: cfg.timeoutMs })
    usage.push({ requestRef: r.id, inputTokens: r.usage?.input_tokens ?? 0, outputTokens: r.usage?.output_tokens ?? 0,
      cachedTokens: r.usage?.input_tokens_details?.cached_tokens ?? 0, reasoningTokens: r.usage?.output_tokens_details?.reasoning_tokens ?? 0 })
    if (r.output?.some(o => o.content?.some(c => c.type === 'refusal'))) throw Object.assign(new AppError('TASK_REFUSED', 422), { usage })
    const parsed = def.output.safeParse(r.output_parsed)
    if (parsed.success) return { data: parsed.data, usage }
  }
  throw Object.assign(new AppError('TASK_OUTPUT_INVALID', 422), { usage })
}
