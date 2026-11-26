# AI Talent OS — Thiết kế runtime AI

> **Đồng bộ Q&A26/11:** hành vi nghiệp vụ theo trả lời từng ý tại [hồ sơ cập nhật](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md); chưa tự duyệt G7/G8 hoặc thương mại.

**Bản 1.1 · 26/11/2026.** Thuộc bộ [AI Core](README.md). Mô tả runtime **đang chạy** trong `apps/api/src/ai/` và các module coach; đoạn mã là trích gọn từ code thật (khi khác nhau, code đúng). Tài liệu này mô tả Agent Mode, AI Task Mode, context và memory, prompt registry, phục hồi, chi phí và đánh giá chất lượng. Khả năng SDK/API được đối chiếu với tài liệu chính thức đọc ngày 26/11/2026; điểm chưa xác minh được đánh dấu **VT-xx** (việc kiểm chứng kỹ thuật, [danh sách](TECHNICAL_RISK_REGISTER.md#3-việc-kiểm-chứng-kỹ-thuật)).

Nguồn SDK/API: [Agents SDK JS — sessions](https://openai.github.io/openai-agents-js/guides/sessions/), [human-in-the-loop](https://openai.github.io/openai-agents-js/guides/human-in-the-loop/), [running agents](https://openai.github.io/openai-agents-js/guides/running-agents/), [tools](https://openai.github.io/openai-agents-js/guides/tools/), [guardrails](https://openai.github.io/openai-agents-js/guides/guardrails/), [tracing](https://openai.github.io/openai-agents-js/guides/tracing/), [context](https://openai.github.io/openai-agents-js/guides/context/), [models](https://openai.github.io/openai-agents-js/guides/models/), [MCP](https://openai.github.io/openai-agents-js/guides/mcp/); [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [conversation state](https://developers.openai.com/api/docs/guides/conversation-state), [prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching), [your data](https://developers.openai.com/api/docs/guides/your-data), [batch](https://developers.openai.com/api/docs/guides/batch), [images](https://developers.openai.com/api/docs/guides/images-vision), [prompting](https://developers.openai.com/api/docs/guides/prompt-engineering), [evals](https://developers.openai.com/api/docs/guides/evals).

## 1. Sự thật về nền tảng ảnh hưởng thiết kế

| Sự thật (tài liệu chính thức, 26/11/2026) | Hệ quả |
|---|---|
| Agents SDK có `Session` với 5 phương thức (`getSessionId`, `getItems`, `addItems`, `popItem`, `clearSession`); có `MemorySession`, `OpenAIConversationsSession` | Tự viết `PrismaSession` lưu Postgres (ADR-05) |
| Conversations API lưu "cho tới khi xóa" và không đủ điều kiện ZDR | Không dùng `OpenAIConversationsSession` |
| `run()` có `maxTurns` (mặc định 10), `signal` (AbortSignal), `stream`, `context`, `session`, `toolNotFoundBehavior`, `errorHandlers` | Dùng trực tiếp; bỏ vòng lặp tự viết |
| Tool: `tool({ parameters: zod, strict (mặc định true), execute(args, runContext, details), errorFunction, timeoutMs, needsApproval, isEnabled })`; `isEnabled` **không phải** kiểm quyền | Kiểm quyền trong `execute` qua Control Plane |
| `RunContext.context` không gửi cho model; RunState có thể serialize nhưng chứa metadata runtime, tài liệu khuyên không để secret trong context | Context chỉ chứa ActorContext và ID; không serialize RunState ở luồng chính |
| Human-in-the-loop: `needsApproval` → `result.interruptions` → `state.approve/reject` → `RunState.toString()/fromString()`; tài liệu tự lưu ý nên giữ snapshot trên server | Không dùng cho xác nhận nghiệp vụ (ADR-04) |
| Tracing bật mặc định trên server, xuất về OpenAI. `traceIncludeSensitiveData` **mặc định `true`** (gửi cả input/output model và tham số/kết quả tool). Nó cùng `workflowName`, `groupId`, `traceMetadata` là cấu hình của `new Runner(config)`; hàm `run()` mặc định và options của `run()` không đặt được (đã kiểm `@openai/agents@0.22.0`). Tổ chức ZDR không dùng được tracing | Mỗi run tạo `new Runner(traceConfig(…))` với `traceIncludeSensitiveData:false`; không dùng `run()` mặc định (ADR-10) |
| `runContext.usage.requestUsageEntries[]` cho từng request: `inputTokens`, `outputTokens`, `inputTokensDetails.cached_tokens`, `cache_write_tokens`, `outputTokensDetails.reasoning_tokens` (đã kiểm P0) | Ghi usage theo request |
| Retry model là tùy chọn (`modelSettings.retry`), không retry sau khi stream đã phát event | Bật retry có điều kiện (§6) |
| Responses API lưu response 30 ngày mặc định (`store=true`); `store:false` tắt việc lưu | `store:false` cho mọi lệnh gọi (ADR-06); P0: SDK tự gửi reasoning đã mã hóa, nhiều lượt chạy đúng |
| Prompt object (`prompt: {id, version}`) đang bị khai tử; `v1/prompts` tắt ngày 30/11/2026 | Prompt quản lý trong code (ADR-08) |
| Evals API chỉ đọc từ 31/10/2026, tắt ngày 30/11/2026 | Bộ đánh giá chạy trong repo (ADR-09) |
| Prompt caching tự động, giảm tới 95% giá input cache; ngưỡng tối thiểu 1.024 token với model mới; `prompt_cache_key` để tách nhóm | Sắp xếp prompt tĩnh trước động |
| Batch API giảm 50%, hoàn tất trong 24 giờ, hỗ trợ `/v1/responses`, không đủ điều kiện ZDR | Chỉ dùng cho việc không gấp, sau khi đo (ADR-12) |
| Flex đang ngừng phát triển, không thêm cho model mới | Không dùng |
| Responses nhận `input_image` (URL, base64, file_id) và `input_file`; chưa xác nhận nhận video trực tiếp | Video phân tích qua khung hình trích ra (VT-06) |
| Mặc định dữ liệu API không dùng để huấn luyện; log giám sát lạm dụng giữ tới 30 ngày | Ghi vào thông báo quyền riêng tư; hỏi khách về ZDR (Q-AI-01) |

## 2. Agent Mode

### 2.1. Agent nào tồn tại

Chỉ hai agent, không handoff, không multi-agent.

| Agent | Kênh | Tool | Ghi chú |
|---|---|---|---|
| `talentCoach` | Talent PWA | `context_read`; sau này các tool Talent ở §2.4 khi module sẵn sàng | Trả lời tiếng Nhật; nhân vật theo persona (CR14) khi có |
| `managerAssistant` | M-17 | `talent_search`, `context_read`, `instruction_history`, `profile_prepare`, `instruction_prepare` | Không có tool commit/confirm |

ChatGPT/MCP **không** dùng agent nội bộ (UC-AI-03).

### 2.2. Định nghĩa agent

Một hàm dựng cả hai agent theo kênh ([ai/agents.ts](../../apps/api/src/ai/agents.ts)):

```typescript
export function agentFor(channel: AgentChannel, cfg: AgentConfig) {
  return new Agent<AppRunContext>({
    name: channel === 'talent' ? 'talent_coach' : 'manager_assistant',
    instructions: rc => instructionsFor(rc.context.pack),          // prompt registry + ContextPack (§4, §5)
    tools: sdkTools(TOOLS, channel, cfg.writesEnabled),            // lọc theo kênh, ready, ENABLE_AGENT_WRITES (§2.4)
    model: cfg.model,                                              // tên model từ cấu hình, hoặc Model giả trong test
    modelSettings: { maxTokens: cfg.maxOutputTokens, store: false, parallelToolCalls: false, reasoning: { effort: cfg.reasoningEffort },
      retry: { maxRetries: 2, backoff: { … }, policy: retryPolicies.any(retryPolicies.networkError(), retryPolicies.httpStatus([429, 500, 502, 503])) } },
  })
}
```

`AppRunContext` ([ai/tools/define.ts](../../apps/api/src/ai/tools/define.ts)) không gửi cho model, không chứa secret:

```typescript
type AppRunContext = {
  actor: Actor                       // do server xác minh (control/actor.ts): kind talent|manager, userId, talentId|managerId
  channel: 'talent' | 'manager_ui' | 'manager_mcp'
  runId: string | null; conversationId: string | null   // null khi gọi qua MCP (ChatGPT chạy vòng lặp)
  grantId?: string                   // grant MCP
  pack: ContextPack                  // §4.2
  services: { db: Database; proposals: ProposalService }
  events: ToolEvent[]                // tool đã làm gì trong run: quyết định answer_only / action_result
}
```

### 2.3. Chạy một run

Một job BullMQ `agent-interactive` = một run ([ai/runtime/run-agent.ts](../../apps/api/src/ai/runtime/run-agent.ts)):

```typescript
const c = await store.claim(eventId)                          // lease trên agent_runs; 'nothing' nếu không còn việc
const { pack, manifest } = await buildContext(db, c.actor)     // §4.2
await store.markStarted(c, { manifest, promptVersion, model }) // ghi model_started_at: từ đây không trả về pending
const streamed = await new Runner(traceConfig(c, promptVersion)).run(agentFor(c.channel, cfg), c.inputText, {   // §7: không gửi nội dung trong trace
  stream: true, context: ctx, maxTurns: cfg.maxTurns, signal: ac.signal,   // abort: hủy, mất lease, hết giờ
  session: new PrismaSession(db, c.conversationId, { runId: c.runId, token: c.token }),
  sessionInputCallback: trimHistory(cfg.history),              // §4.3
  toolExecution: { maxFunctionToolConcurrency: 1 }, toolNotFoundBehavior: 'return_error_to_model',
})
for await (const delta of streamed.toTextStream()) onDelta(c.runId, delta)   // Redis pub/sub → SSE
await streamed.completed
if (reason || streamed.cancelled) throw new Error('ABORTED')   // lý do abort của runtime thắng loại lỗi SDK
await store.finish(c, await finalOutcome(…), usageOf(cfg, streamed))         // §2.6, §7
```

Heartbeat mỗi 5 giây gia hạn lease và đọc `cancel_requested_at`. Lỗi SDK được ánh xạ sang mã lỗi run ở §6.2.

### 2.4. Danh mục tool

Tool là **adapter mỏng**: parse (SDK + zod strict), lấy `actor` từ `runContext`, gọi một hàm Control Plane hoặc port module, trả `ToolResult`. Không chứa luật nghiệp vụ.

| Tool | Agent | Gọi vào | Ghi? | Trạng thái |
|---|---|---|---|---|
| `context_read {talentId?, sections[]}` | cả hai | `coachConfig.readContext(actor, …)` | Không | Có (chuyển từ code demo) |
| `talent_search {query, limit?}` | manager | `registry.searchTalents(actor, …)` | Không | Có |
| `instruction_history {instructionId, limit?}` | manager | `coachConfig.instructionHistory(actor, …)` | Không | Có |
| `profile_prepare {talentId, expectedVersion, patch}` | manager | `proposals.prepare(actor, 'talent_profile.update', …)` | Đề xuất | Có |
| `instruction_prepare {scope, situation, expectedVersion, change}` | manager | `proposals.prepare(actor, 'ai_instruction.write', …)` | Đề xuất | Có; category trả `FEATURE_NOT_READY` |
| `autopost_set_theme {periodId, expectedVersion, theme}` | talent | `commands.execute(actor, 'autopost.set_theme', …)` | Lệnh trực tiếp | `ready:false` (QA70/83) |
| `challenge_respond`, `draft_create`, `draft_revise`, `media_read`, `post_delivery_read` | talent | port module tương ứng | Tùy | `ready:false` (chờ module) |

Không có tool `change_commit` (ADR-04).

Mẫu tool (trích [ai/tools/index.ts](../../apps/api/src/ai/tools/index.ts)):

```typescript
const profilePrepare = defineTool({
  name: 'profile_prepare', capability: 'talent_profile.prepare', channels: ['manager_ui', 'manager_mcp'], writes: true, ready: true,
  description: 'タレントのプロフィール変更案を作る(まだ保存しない)。…',
  parameters: z.object({ talentId: uuid, expectedVersion: version, patch: z.object({ … }).strict() }).strict(),
  run: (a, ctx) => ctx.services.proposals.prepare(manager(ctx), ctx.channel, 'talent_profile.update', { … },
    { idempotencyKey: keyOf(ctx, 'profile_prepare', a), runId: ctx.runId, clientGrantId: ctx.grantId }),
})
```

`defineTool` chỉ khai báo; `sdkTools(defs, channel, writesEnabled)` biến danh sách thành tool của SDK và làm bốn việc: (1) chỉ đưa tool `ready`, đúng kênh, và tool ghi chỉ khi `ENABLE_AGENT_WRITES`; (2) `errorFunction` trả `INPUT_INVALID` kèm `issues` (đường dẫn + thông báo zod) khi tham số sai schema, để model tự sửa; (3) trong `execute`: `assertCapability` lại (chặn cả khi tool lọt vào danh sách nhầm), gọi `run`, đổi `AppError` thành kết quả `{kind, code, messageKey, retryable}` cho model, ghi `ToolEvent`; (4) `timeoutMs` 10 giây. MCP dùng chính danh sách `TOOLS` này với kênh `manager_mcp` ([API §6](API_DESIGN.md)). Vòng sửa tham số do SDK xử lý, bị chặn bởi `maxTurns`.

### 2.5. Xác nhận của con người

- **Đề xuất của Manager (profile, chỉ thị):** tool `*_prepare` tạo proposal bất biến trong Control Plane rồi trả `{proposalId, diff}`. Run tiếp tục, model viết câu ngắn mời xác nhận, run kết thúc `succeeded`. Xác nhận là request riêng của Manager, Control Plane ghi trong một transaction ([API §3](API_DESIGN.md)). Không dùng `needsApproval` (ADR-04).
- **Thao tác của Talent cần đồng ý rõ** (adopt bài, xác nhận giá video): là thao tác UI có principal thật, không phải tool.
- **`needsApproval` của SDK** chỉ được dùng nếu sau này có tool cần duyệt **trong cùng lượt** mà không phải lệnh nghiệp vụ (hiện không có). Khi dùng, RunState lưu ở server, không gửi cho client.

### 2.6. Kết thúc run và hiển thị

`finishRun` trong một transaction:

1. Cập nhật `agent_runs` (fence bằng `lease_token`: worker đã mất lease không ghi được): `state`, `final_text`, `completion_kind` hoặc `error_code`, `finished_at`. `prompt_version`, `model`, `context_manifest` đã ghi lúc `markStarted`.
2. Ghi `ai_usage_events` theo từng request (§7), kể cả khi run lỗi (phần SDK đã đếm).
3. `completion_kind`:
   - `answer_only`: run không gọi tool ghi/đề xuất và không có lỗi tool → UI hiển thị text model.
   - `action_result`: có lệnh, đề xuất, hoặc tool bị từ chối → `final_text` là **template backend dựng từ `business_commands`/`business_proposals` theo `run_id`** (✅ đã lưu, 📝 đã tạo đề xuất, ⚠ không thực hiện được); lời model về việc đã lưu không bao giờ là bằng chứng.

Text stream trong lúc chạy chỉ là bản xem trước; trạng thái cuối luôn đọc từ DB.

## 3. AI Task Mode

### 3.1. Hợp đồng chung

Trích [ai/tasks/define.ts](../../apps/api/src/ai/tasks/define.ts):

```typescript
type TaskDef<I, O> = {
  name: string                        // 'daily_topics': prompt_cache_key và tên schema
  prompt: PromptRef                   // { key: 'task.daily_topics', version: 1 }
  instructions(input: I): string      // phần tĩnh trước (cache)
  input(input: I): string             // dữ liệu của lần gọi
  output: z.ZodType<O>                // json_schema strict qua zodTextFormat
  maxOutputTokens: number
}
async function runTask<I, O>(client: TaskClient, def: TaskDef<I, O>, input: I, cfg: { model; timeoutMs }): Promise<{ data: O; usage: TaskUsage[] }>
```

`runTask` chỉ gọi model: `client.responses.parse({ model, instructions, input, store: false, max_output_tokens, prompt_cache_key, text: { format: zodTextFormat(output) } })`. Có `refusal` → `TASK_REFUSED`. Kết quả không qua schema → gọi lại **một lần**; vẫn sai → `TASK_OUTPUT_INVALID`. Lỗi mang theo `usage` để vẫn ghi được chi phí.

Mọi thứ còn lại do **service của module** làm (mẫu: [`DailyTopicsService`](../../apps/api/src/modules/coach-daily/service.ts)). Mọi task dùng chung `ai_task_runs`, event `ai.task.requested` và lane `ai-tasks`, nên **mỗi service chỉ lease, chạy và reconcile dòng có `task_key` của mình**:
1. Lên lịch: tạo `domain_operations` (khóa nghiệp vụ trong `operation_key`, `ON CONFLICT DO NOTHING`) + `outbox_events` + `ai_task_runs` trong một transaction.
2. Khi worker nhận: lease `ai_task_runs`, kiểm điều kiện (khung giờ, profile), đọc dữ liệu, gọi `runTask`.
3. Kết thúc trong một transaction có fence: kết quả nghiệp vụ (ví dụ `theme_suggestions`), usage, trạng thái task/operation/outbox.

Task không có tool, không có vòng lặp, không tự ghi bảng nghiệp vụ.

### 3.2. Danh mục tác vụ

| Task | Gọi bởi | Đầu vào | Đầu ra (schema) | Route | Trạng thái |
|---|---|---|---|---|---|
| `daily_topics` | Scheduler (`coach-daily`) | profile, chỉ thị `theme_suggestions` + `daily_greeting`, mục tiêu, chủ đề 7 ngày gần nhất (metrics: khi module Metrics mở ghi) | `{topics:[{title, angle, reason}] (đúng 3), greeting}` | fast | **Có** |
| `caption` | Posting | chủ đề, phân tích media, chỉ thị `post_writing`, profile | `{caption, hashtags[], shotList[], script?}` | fast | Chờ Posting |
| `caption_rewrite` | Posting (giới hạn 2 lần do Posting đếm) | bản trước, yêu cầu sửa | như trên | fast | Chờ Posting |
| `ng_check` | Posting | caption, danh sách từ cấm (global) | `{hit, terms[], reason, suggestion?}` | fast | Chờ Posting; khớp chính xác chạy trước bằng code |
| `media_analysis` | Media | ảnh (URL ký ngắn hạn) hoặc khung hình video | `{subjects[], setting, mood, usableFor[]}` | standard | Chờ Media; VT-06 |
| `post_time` | Posting | khung giờ chỉ thị, metrics theo giờ | `{platformTimes:[{platform, at}], reason}` | fast | Chờ Posting; service kiểm trong khung |
| `daily_review`, `weekly_review` | Scheduler | metrics, bài đã đăng | `{summary, highlights[], nextActions[]}` | standard | P5 |
| `challenge_suggest` | Scheduler/agent tool | mục tiêu, lịch sử | `{challenges:[{title, target, deadline}]}` | fast | QA72 ngày26/11: tiêu chí số, trạng thái và hạn; prompt Nonaka còn xác nhận27/11 |
| `video_script` | Video | ý tưởng, asset | `{scenes[], durationSec}` | standard | Chờ 確認61/62 |
| `instruction_sandbox` | Manager (M-15 thử) | chỉ thị ứng viên + tình huống mẫu | đầu ra của task tương ứng | như task | **Có** (hiện chạy `daily_topics`); không ghi gì ngoài usage |

## 4. Context và memory

### 4.1. Cơ chế tách biệt

| Loại | Lưu ở | Ai ghi | Vào model bằng cách |
|---|---|---|---|
| Lịch sử hội thoại | `agent_session_items` | PrismaSession (SDK) | Session, cắt theo §4.3 |
| Profile Talent cho AI | `talent_profiles` (+ versions) | Control Plane sau xác nhận | ContextPack, trường cho phép |
| Mục tiêu | `follower_goals` (canonical, hiện chỉ đọc) | Module Metrics & Goals | ContextPack tóm tắt |
| Chỉ thị Manager | `ai_instructions` + `ai_instruction_versions` | Control Plane sau xác nhận | ContextPack, đã chọn theo tình huống/scope |
| Cấu hình coach (persona, khung giờ) | Bảng của module tương ứng (đích) | Module | ContextPack |
| Lịch sử hoạt động nghiệp vụ | Bảng nghiệp vụ (`posts`, `activity_logs`…) | Module | Chỉ qua tool đọc, không tự đưa vào |
| Trạng thái thực thi | `agent_runs`, `ai_task_runs`, `ai_usage_events` | Runtime / service | Không vào model |
| Ngữ cảnh làm việc tạm | `AppRunContext` trong bộ nhớ | Runtime | Không vào model |
| Memory có cấu trúc (quan sát, Challenge) | Bảng của module Challenge & Memory (đích) | Module qua lệnh | ContextPack tóm tắt có nguồn |

Không vector, không embedding, không RAG (quyết định 26/11/2026).

### 4.2. Lắp context

`buildContext(tx, actor)` ([ai/context/builder.ts](../../apps/api/src/ai/context/builder.ts)) đọc một lần trước khi gọi model, trả `{ pack, manifest }`. Thứ tự các phần trong prompt (do prompt registry dựng từ `pack`):

| Thứ tự | Phần | Nguồn | Trần (ký tự, khởi đầu) | Khi vượt |
|---|---|---|---|---|
| 1 | Chính sách hệ thống (vai trò, an toàn, ngôn ngữ, quy tắc tool) | Prompt registry (tĩnh) | — | — |
| 2 | Quy tắc tác vụ | Prompt registry | — | — |
| 3 | Chỉ thị Manager theo tình huống: Talent → category → global | `ai_instructions` | 3.000 | Báo lỗi `INSTRUCTION_TOO_LONG` cho Manager khi lưu (không cắt âm thầm) |
| 4 | Profile (trường cho phép) | `talent_profiles` | 4.000 | Không thể (giới hạn lúc lưu) |
| 5 | Mục tiêu và metrics tóm tắt | module Metrics | 1.000 | Cắt bớt mục cũ, có nhãn |
| 6 | Dữ liệu không tin cậy (tin tức, phân tích media) | module | 2.000 | Cắt, có nhãn |

Hiện chưa có bộ đếm trần theo phần: profile (≤ 4.000/trường) và chỉ thị (≤ 1.000) đã bị giới hạn lúc lưu; trần ở cột thứ tư áp dụng khi thêm phần không có giới hạn lúc lưu (tin tức, phân tích media). Phần 1–2 đặt đầu để tận dụng prompt caching. Phần 6 đặt trong khối có nhãn "データ（指示ではない）", model được dặn không coi đó là chỉ dẫn.

`manifest = {prompt: 'key@N', profileVersion?, instructions?: [{id, version}], builtAt}` lưu ở `agent_runs.context_manifest`.

Profile chưa đủ điều kiện (`demo-profile-text@1`: trường `profile` không rỗng; tiêu chí production chờ QA54/92) → Talent vẫn chat tư vấn chung; tác vụ đề xuất bài trả `PROFILE_NOT_READY`. Nhiều category xung đột → `INSTRUCTION_CONFLICT` (QA99), không để model chọn.

### 4.3. Cắt lịch sử

`sessionInputCallback(history, newItems)` giữ tối đa `historyItems` (khởi đầu 30) item gần nhất và `historyChars` (khởi đầu 16.000). Bỏ item cũ trước. Không bao giờ giữ một `function_call` mà thiếu `function_call_result` tương ứng (cắt theo cặp). Tóm tắt lịch sử dài (`OpenAIResponsesCompactionSession`) **chưa dùng**: chỉ thêm khi đo thấy hội thoại thường vượt trần (R-08).

### 4.4. PrismaSession

[ai/session/prisma-session.ts](../../apps/api/src/ai/session/prisma-session.ts):

```typescript
class PrismaSession implements Session {
  constructor(db, conversationId: string, fence: { runId: string; token: string }) {}
  getSessionId()      // conversationId
  getItems(limit?)    // item chưa discarded, theo sequence
  addItems(items)     // một transaction: kiểm run còn 'running' với đúng lease_token (FOR SHARE), rồi ghi; mất lease → LeaseLostError
  popItem()           // đánh dấu discarded dòng cuối (không xóa cứng)
  clearSession()      // không dùng ở sản phẩm; ném lỗi
}
```

- **Hành vi ghi của SDK (P0, `@openai/agents@0.22.0`):** SDK ghi **toàn bộ item của một run trong một lần `addItems` khi run kết thúc**, cả khi stream. Khi bị abort lúc tool đang chạy: ghi item người dùng + `function_call` + `function_call_result` (kết quả lỗi), vẫn nhất quán. Khi abort lúc model đang sinh hoặc vượt `maxTurns`: không ghi gì. Khi abort lúc đang stream câu trả lời: chỉ ghi item người dùng. Trong mọi ca đã thử, không có `function_call` mồ côi và lượt sau chạy bình thường.
- Vì vậy: `addItems` ghi trong một transaction; không cần cơ chế discard trong luồng bình thường (`discarded_at` chỉ dùng cho `popItem`). Cắt lịch sử (§4.3) vẫn bỏ `function_call` thiếu kết quả để phòng xa.
- Tin nhắn người dùng luôn có ở `agent_runs.input_text` (lưu khi nhận). Run thất bại mà SDK chưa ghi item người dùng thì UI vẫn hiển thị tin đó từ run.
- Mỗi item lưu `item jsonb` nguyên dạng SDK, cùng `role`, `kind`, `display_text` (văn bản cho UI, rỗng với item tool/reasoning).

## 5. Prompt registry

- Mỗi prompt là một file `ai/prompts/<key>.ts` xuất `{ key, version, build(vars) }`. Văn bản tiếng Nhật nằm trong code, review qua PR.
- `version` là số nguyên tăng khi đổi nội dung có ảnh hưởng hành vi. Mọi run/task ghi `prompt_key@version`.
- Đổi prompt phải chạy eval của task đó (§9) và không giảm dưới ngưỡng.
- Không dùng prompt object của OpenAI vì đang bị khai tử (`v1/prompts` tắt 30/11/2026).
- Chỉ thị Manager **không** phải prompt registry: đó là dữ liệu nghiệp vụ có version trong DB, được chèn vào phần 3 của context.

## 6. Độ tin cậy và phục hồi

### 6.1. Hai loại phục hồi

| | Phục hồi runtime AI | Phục hồi giao dịch nghiệp vụ |
|---|---|---|
| Đơn vị | Một run agent / một task | Một lệnh Control Plane |
| Bảo đảm | **Không** exactly-once. Run lỗi giữa chừng thì kết thúc `failed`, người dùng gửi lại | Mỗi lệnh ghi đúng một lần (idempotency key + CAS + transaction) |
| Cơ chế | Lease trên run, reconciler, discard item, retry model có điều kiện | Transaction, unique key, outbox, receipt |
| Chi phí khi lỗi | Có thể tốn thêm một lần gọi model | Không ghi trùng |

SDK session và RunState **không** bảo đảm phục hồi sau crash tùy ý hay exactly-once; thiết kế này không dựa vào chúng cho việc đó.

### 6.2. Bảng xử lý lỗi

| Tình huống | Xử lý | Mã |
|---|---|---|
| Gửi trùng (mạng lặp) | `requestKey` + hash payload ở submit; trùng trả cùng run; khác payload 409 | `REQUEST_KEY_REUSED` |
| Gửi khi conversation đang có run | 409 (partial unique một run active/conversation) | `RUN_BUSY` |
| Redis mất job | Dispatcher giao lại từ outbox; claim DB có lease nên không chạy hai lần đồng thời | — |
| Worker chết giữa run | Reconciler thấy lease hết → failed. Session không bị dở vì SDK chỉ ghi khi run kết thúc; lệnh đã commit giữ nguyên và hiển thị trong receipt. Không tự chạy lại model | `WORKER_LOST` |
| Abort (hủy, hết giờ, mất lease) trong lúc stream | SDK có thể ném `ModelBehaviorError` thay vì `AbortError` (P0): xét lý do abort của chính runtime trước, rồi mới đến loại lỗi SDK | `CANCELLED` / `TIMEOUT` / `WORKER_LOST` |
| Worker chết trước khi gọi model (`model_started_at` NULL) | Reconciler trả run về `pending` một lần | — |
| Model lỗi mạng/429/5xx trước khi stream | SDK retry: `maxRetries 2`, backoff, policy `networkError` + `httpStatus([429,500,502,503])` | Hết retry: `MODEL_RATE_LIMITED` (429), `MODEL_UNAVAILABLE` (5xx), `MODEL_AUTH` (401/403) |
| Model lỗi sau khi đã stream | Không retry (SDK cũng không) | Theo loại lỗi; không rõ thì `RUN_FAILED` |
| Model không trả text và không gọi tool | Failed | `OUTPUT_INVALID` |
| Vượt `maxTurns` | Failed, giữ receipt đã có | `MODEL_LIMIT_REACHED` |
| Model từ chối / output sai / model hết giờ | Failed | `MODEL_REFUSED` / `MODEL_BEHAVIOR` / `MODEL_TIMEOUT` |
| Hết thời gian compute của run | AbortSignal | `TIMEOUT` |
| Người dùng hủy | `POST …/cancel` đặt `cancel_requested`; heartbeat thấy → abort → `cancelled`. Không hứa hủy lệnh đã commit | `CANCELLED` |
| Tool timeout | `error_as_result`: model nhận thông báo, có thể giải thích | — |
| Tool ghi được gọi lại cùng tham số trong run | Cùng idempotency key → cùng receipt, không ghi lần hai | — |
| Version đổi giữa đọc và ghi | CAS; model đọc lại và đề xuất lại | `VERSION_CONFLICT` |
| AI Task lỗi tạm thời (mạng, provider) | Service trả task về `pending`, giao lại sau 60 giây, tối đa 3 lần (không dùng retry của BullMQ); quá hạn khung thì bỏ | `MISSED_WINDOW` |
| AI Task output sai / bị từ chối | Kết thúc, không thử lại | `TASK_OUTPUT_INVALID` / `TASK_REFUSED` |
| Provider ngoài (OneDrive, push…) lỗi | Effect trong outbox có retry/backoff riêng; không ảnh hưởng chat | — |

### 6.3. Idempotency của tool ghi

`idempotencyKey = sha256(runId ‖ toolName ‖ canonicalJson(args))`. Control Plane lưu key trong `business_commands`/`business_proposals` (unique). Trong một run, model gọi lại đúng lệnh thì nhận lại kết quả cũ. Giữa hai run khác nhau, key khác; trùng ý định được chặn bởi CAS `expectedVersion`.

### 6.4. Giới hạn tốc độ và đồng thời

- Theo người dùng: `AGENT_RATE_PER_MINUTE` (mặc định 10) và `AGENT_RATE_PER_DAY` (200) tin mới, đếm trong transaction gửi tin bằng `auth_rate_buckets` ([control/rate-limit.ts](../../apps/api/src/control/rate-limit.ts), cửa sổ cố định); gửi lại cùng `requestKey` không bị đếm; vượt trả 429 `RATE_LIMITED`.
- Theo hàng đợi: concurrency của lane ([Kiến trúc §10](AI_CORE_ARCHITECTURE.md#10-kiến-trúc-job-nền)). BullMQ `limiter` theo RPM/TPM của project OpenAI **chưa làm** (P6, T6.3).
- Một run active mỗi conversation (DB).

## 7. Tracing và usage

- Mỗi run agent chạy qua `new Runner(traceConfig(run, promptVersion))` ([ai/runtime/run-agent.ts](../../apps/api/src/ai/runtime/run-agent.ts)): `traceIncludeSensitiveData = false`, `workflowName = agent.talent | agent.manager`, `groupId = conversationId`, `traceMetadata = {runId, promptVersion}`. **Không gọi `run()` mặc định của SDK** ở code sản phẩm: nó gửi cả nội dung. Test `run-agent.test.ts` giữ cấu hình này.
- Đặt `OPENAI_AGENTS_DISABLE_TRACING=1` ở test, eval và khi tổ chức OpenAI bật ZDR.
- AI Task gọi Responses trực tiếp nên không có trace SDK; ledger DB là đủ.
- Usage: ghi một dòng `ai_usage_events` cho mỗi request model (từ `runContext.usage.requestUsageEntries` của SDK hoặc `usage` của Responses), gồm input, output, cached, reasoning token, model, `price_revision`, chi phí bằng numeric. Không có giá thì chi phí = NULL, không ghi 0. Run Manager/global: `talent_id = NULL`, `payer = 'adesso'`.

## 8. Chi phí và hiệu năng

### 8.1. Định tuyến model

| Route | Dùng cho | Thiết lập khởi đầu | Đổi khi |
|---|---|---|---|
| `fast` | chat Talent/Manager, caption, ng_check, post_time, daily_topics | model nhỏ, `reasoning.effort:'low'`, `text.verbosity:'low'` | Eval dưới ngưỡng |
| `standard` | media_analysis, review tuần, video_script | model lớn hơn một bậc, `reasoning.effort:'medium'` | Eval hoặc chi phí |

Hiện chỉ có route `fast`, cấu hình bằng một biến `AI_COACH_MODEL`. Khi có task đầu tiên thuộc route `standard`, tách thành hai biến. Tên model không viết cứng trong code hay tài liệu. Đổi model = đổi cấu hình + chạy eval.

### 8.2. Ngân sách

| Tham số | Khởi đầu |
|---|---|
| `maxTurns` agent | 8 (`AGENT_MODEL_MAX_STEPS`) |
| Output tối đa mỗi lượt chat | 1.200 token |
| Compute tối đa mỗi run | 120 giây (`AGENT_COMPUTE_TIMEOUT_MS`) |
| Timeout một lần gọi model của task | 45 giây (`AGENT_MODEL_TIMEOUT_MS`) |
| Hạn đề xuất | 600 giây (`AGENT_APPROVAL_TTL_SECONDS`) |
| Lịch sử | 30 item / 16.000 ký tự |
| Context ngoài lịch sử | khoảng 10.000 ký tự (§4.2) |
| Output task | theo task, 300–1.500 token |

Đây là cấu hình kỹ thuật, không phải giới hạn nghiệp vụ (số lần Talent nhờ viết lại do Posting quyết theo KS 確認28).

### 8.3. Ước tính tải (để kiểm VT-09)

300 Talent × (khoảng 3 task theo khung + 2 caption + 6 lượt chat) ≈ 3.300 request model/ngày; đỉnh buổi sáng khoảng 300 task trong 30–60 phút ≈ 5–10 request/phút. Một worker với concurrency 4 đủ; giới hạn thật là rate limit của project OpenAI. 1.000 Talent: thêm worker, không đổi kiến trúc.

### 8.4. Prompt caching

Thứ tự prompt: chính sách tĩnh → định nghĩa tool → chỉ thị global → chỉ thị category/Talent → profile → lịch sử → tin mới. `prompt_cache_key = taskKey` (chat: `agent.talent`). Theo dõi `cached_tokens` trong `ai_usage_events` để xác nhận cache có tác dụng.

## 9. Kiểm thử và đánh giá

| Lớp | Cách | Chạy khi |
|---|---|---|
| Unit | Tool adapter, ContextBuilder, cắt lịch sử, ánh xạ lỗi; Agents SDK với `ModelProvider` giả trả kịch bản cố định | Mỗi commit |
| Integration DB | Control Plane: proposal/confirm/commit, idempotency, CAS, ACL role runtime; PrismaSession; claim/lease/reconciler | Mỗi commit (DB tạm) |
| HTTP | Hono `app.request()`: auth, schema, idempotency, mã lỗi | Mỗi commit |
| Eval AI Task | Bộ dữ liệu JSONL giả (`apps/api/evals/<suite>/cases.jsonl`), grader tất định trong `tools/eval.ts` (schema, tiếng Nhật, không lặp chủ đề, không chủ đề cấm). Grader model theo rubric: chưa làm, thêm khi có ca cần phán đoán | Khi đổi prompt/model |
| Eval Agent | Kịch bản hội thoại có service giả: kiểm chọn đúng tool, tham số, không gọi tool ngoài quyền, hỏi lại khi mơ hồ, không khẳng định đã lưu khi chưa | Khi đổi prompt/model/tool |
| Smoke thật | `npm run agent:smoke` với OpenAI, Redis, worker, DB tạm | Trước release |

Eval chạy bằng script trong repo (`npm run eval -- <task>`) gọi Responses API; kết quả ghi JSON làm artifact CI. Không dùng Evals API (tắt 30/11/2026). Trace grading trong dashboard chỉ dùng thủ công khi điều tra.

Ngưỡng: tỷ lệ ca đạt ≥ 90% (`EVAL_THRESHOLD`), dưới ngưỡng thì lệnh thoát mã 1. Kết quả ghi `evals/results/` (không commit). Chưa gắn vào CI (AIC-T39). Dữ liệu eval là dữ liệu giả (YK3 § 10-3).

Lịch sử P2–P4 và các điểm lệch so với thiết kế ban đầu: [Lịch sử triển khai](LICH_SU_TRIEN_KHAI.md).
