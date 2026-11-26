# AI Core — Lịch sử triển khai

**Bản 1.0 · 26/11/2026.** Thuộc bộ [AI Core](README.md). File này ghi **hệ thống đã được chuyển từ đâu sang đâu**: code demo cũ, đánh giá giữ/thay/bỏ, các giai đoạn P0–P4, các điểm lệch so với thiết kế ban đầu và các migration. Người làm tính năng mới **không cần đọc file này**; hệ thống hiện tại được mô tả ở các tài liệu khác của bộ, trạng thái hiện tại ở [README](README.md#trạng-thái).

## 1. Điểm xuất phát: code demo `modules/ai-coach/`

Trước 26/11/2026, `apps/api/src/modules/ai-coach/` là bản demo kỹ thuật. Nó tự viết gần như toàn bộ bộ khung agent:
- vòng lặp model/tool riêng (`runner.ts`, ~135 dòng) trên gói `ai` + `@ai-sdk/openai`;
- sổ ghi từng bước (`agent_steps`, `ai_execution_attempts`) để tiếp tục run sau crash;
- run chờ xác nhận (`waiting_confirmation`), đánh thức lại (`wake_sequence`, coordinator resume) và tool `change_commit`;
- bảng của migration demo `20261123*` (đã áp Supabase dev) và `20261125000000_agent_core` (chưa áp).

Đã xóa toàn bộ ở P3 (T3.4), cùng hai gói `ai`, `@ai-sdk/openai`.

## 2. Đánh giá giữ/thay/bỏ (đã thực hiện)

Ký hiệu: **KEEP** giữ; **REPLACE** thay; **SIMPLIFY** giữ nhưng cắt bớt; **REMOVE** bỏ; **ADD** thêm mới. Đường dẫn tính từ `apps/api/src/`.

| Thành phần cũ | Phân loại | Thành gì | ADR |
|---|---|---|---|
| Hono HTTP, `http/app.ts`, `container.ts` | KEEP | Thêm mount `control/`, `mcp/` | 01 |
| `worker.ts` (dispatcher, reconciler, BullMQ) | KEEP | Lane `agent-interactive` và `ai-tasks` | 01, 07 |
| `domain_operations`, `outbox_events`, dispatcher | KEEP | Nền giao việc chung | 11 |
| `ai-coach/runner.ts` (vòng lặp tự viết) | REPLACE | `ai/runtime/run-agent.ts` gọi `run()` của Agents SDK | 02 |
| `ai-coach/model.ts` (gateway AI SDK) | REPLACE | Model của Agents SDK; client `openai` cho AI Task | 02, 03 |
| Gói `ai`, `@ai-sdk/openai` | REMOVE | `@openai/agents`, `openai` | 02 |
| `ai-coach/tools.ts` | SIMPLIFY | `ai/tools/define.ts` + `ai/tools/index.ts` | 02, 11 |
| Bộ đếm sửa tham số 2 lần | REMOVE | Lỗi schema trả cho model; giới hạn bằng `maxTurns` | 02 |
| `ai-coach/changes.ts` (ChangeService) | SIMPLIFY | `control/proposals.ts` + `modules/coach-config/handlers.ts` | 04, 11 |
| `ai-coach/store.ts` (RunStore) | SIMPLIFY | `modules/coach-conversation/store.ts`; bỏ step, suspend, resume | 07 |
| `ai-coach/context.ts` | SIMPLIFY | `ai/context/builder.ts` + `ai/prompts/registry.ts` | 08 |
| `ai-coach/access.ts` | KEEP | `control/actor.ts`, `control/access.ts` | 11 |
| `ai-coach/effects.ts` (xuất OneDrive) | KEEP | `modules/coach-config/export.ts` | — |
| `ai-coach/routes.ts` | SIMPLIFY | `http/agent.ts`, `http/proposals.ts`; confirm trả receipt đồng bộ | 04 |
| Tool `change_commit`; `waiting_confirmation`, wake, resume | REMOVE | Confirm là lệnh đồng bộ | 04 |
| Bảng `agent_steps`, `ai_execution_attempts`, `ai_executions` | REMOVE | `agent_runs` (agent), `ai_task_runs` (task) | 07, 13 |
| Bảng `agent_entries` | REPLACE | `agent_session_items` | 05 |
| Bảng `agent_change_proposals`, `agent_commands` | SIMPLIFY | `business_proposals`, `business_commands` | 11, 13 |
| Bảng `agent_action_requests` (chỉ thiết kế) | REPLACE | `idempotency_requests` | 11 |
| Bảng `agent_talent_profiles`, `agent_instructions`, `agent_profile_exports` (+ versions) | KEEP (đổi tên) | `talent_profiles`, `ai_instructions`, `talent_profile_exports` (+ versions) | 13 |
| Bảng `ai_daily_trends` | REMOVE | Không dùng | 13 |
| FE `/pwa/coach`, `AgentDemo.tsx` | SIMPLIFY | Thẻ đề xuất nhận receipt ngay khi confirm | 04 |
| — | ADD | `control/`, `ai/prompts/`, `ai/tasks/`, `evals/`, `mcp/`, SSE | 03, 08, 09, 11, 14, 15 |

Rủi ro của code demo không còn sau chuyển đổi:

| Rủi ro cũ | Lý do không còn |
|---|---|
| Ledger từng bước lệch trạng thái khi crash giữa các transaction | Bỏ ledger (ADR-07) |
| Wake trùng, resume hai lần sau xác nhận | Bỏ chờ/resume; confirm là một transaction (ADR-04) |
| Bộ CHECK `step_ledger` hai chế độ khó bảo trì | Bỏ `ai_execution_attempts` |
| Thiếu idempotency HTTP cho confirm/reject/cancel | `idempotency_requests` chung (ADR-11) |

## 3. Các giai đoạn

| Giai đoạn | Ngày | Nội dung | Kiểm chứng lúc đó |
|---|---|---|---|
| P0 | 26/11/2026 | Spike Agents SDK, `store:false`, session Postgres, `db:status` Supabase dev (VT-01…05, 07) | [Sổ rủi ro §4](TECHNICAL_RISK_REGISTER.md#4-kết-quả-p0-26112026) |
| P1 | 26/11/2026 | `control/`, handler coach-config, route proposals; migration tạm `20261126000000_control_plane` | Control Plane 13/13 với role runtime |
| P2 | 26/11/2026 | `ai/` (agents, tools, context, prompts, session, runtime), store hội thoại; migration tạm `20261126000100_agent_runtime` | Runtime 12/12; smoke OpenAI thật |
| P3 | 26/11/2026 | Route mới, FE, `daily_topics` + scheduler, eval; gộp migration (ADR-13); xóa `ai-coach/` | Eval 3 bộ 100%; smoke đầu cuối |
| P4 | 26/11/2026 | MCP server, `mcp_grants`, trang `/pwa/confirm`, sandbox chỉ thị; VT-08 hoãn | MCP 7/7 |
| P6 (một phần) | 26/11/2026 | Giới hạn tần suất, SSE (BE), script tải buổi sáng (chế độ giả) | `test:local` 40/40 |
| Áp DB | 26/11/2026 | `20261126000200_ai_core` + `20261126000300_drop_coach_demo` lên Supabase dev | `db:status` 14/14, `db:diff` rỗng |

## 4. Điểm lệch so với thiết kế ban đầu

Thiết kế ban đầu (bản đề xuất đầu tiên, trước khi code) có một số điểm đã đổi khi làm. Các tài liệu khác của bộ đã được sửa theo thực tế; bảng dưới chỉ để biết lý do.

| Thiết kế ban đầu | Thực tế | Lý do |
|---|---|---|
| Một bảng `ai_executions` có cột `mode` cho cả agent và task | `agent_runs` (agent) và `ai_task_runs` (task) | `ai_executions` mang CHECK của demo đã áp Supabase (`input_message_id` bắt buộc, chỉ `coach.respond`); dùng chung buộc phải gỡ từng CHECK trong lúc demo còn chạy. Hai bảng riêng cũng gọn hơn: task không cần hội thoại, agent không cần `input/output` jsonb |
| Migration `<ngày>_ai_core` làm expand trên `ai_executions` | Tạo bảng mới; bảng demo bỏ bằng migration contract riêng | Hệ quả của dòng trên |
| Receipt sau xác nhận là item vai `assistant` | Vai `system`, chữ đầu `[システム]` | Smoke thật P2: model tin câu "chưa lưu" của chính nó; prompt `agent.manager@2` thêm quy tắc "[システム] là sự thật" |
| SDK ném `ModelBehaviorError` khi abort lúc stream | Có lúc `completed` resolve mà không có `finalOutput` | Runtime luôn xét lý do abort của chính nó trước |
| Lỗi schema tham số do SDK tự trả cho model | `errorFunction` trả `INPUT_INVALID` + `issues` | Eval P3: model không sửa được tham số từ thông báo chung của SDK |
| `context_read` của Manager luôn cần `talentId` | Bỏ `talentId` để đọc chỉ thị global | Eval P3: Manager không lấy được version để sửa chỉ thị global |
| Hai route model `AI_MODEL_FAST` / `AI_MODEL_STANDARD` | Một biến `AI_COACH_MODEL` | Mới có chat và `daily_topics`, cùng một route; tách khi có task `standard` |
| Queue `effects` riêng | Bộ hẹn giờ trong worker (`runProfileExports` mỗi 3 giây) | Mới có một effect (xuất OneDrive) |
| Trang xác nhận MCP `/admin/confirm/[id]` | `/pwa/confirm/[proposalId]` | FE hiện chỉ có khu `/pwa` |
| "Khởi tạo tracing một lần ở worker" với `traceIncludeSensitiveData=false` | `new Runner(traceConfig(…))` cho từng run | Bản đầu tưởng đặt được ở worker; SDK chỉ nhận cấu hình này qua `Runner`, `run()` mặc định gửi cả nội dung. Code P2–P4 vì thế đã gửi nội dung vào trace (chỉ dữ liệu giả, môi trường dev); sửa 26/11/2026 |
| Một queue `ai-tasks` chung, "idempotent theo khóa tác vụ" | Như vậy, thêm quy tắc mỗi service chỉ nhận `task_key` của mình | Bản đầu không nói ai lọc `task_key`; `DailyTopicsService` lease mọi task. CHECK chỉ cho `task.daily_topics` nên chưa gây lỗi; thêm bộ lọc 26/11/2026 |

## 5. Lịch sử migration

| Migration | Trạng thái | Ghi chú |
|---|---|---|
| `20261123000000…000400` (demo coach) | Đã áp Supabase dev; giữ nguyên trong repo | Không sửa migration đã áp |
| `20261125000000_agent_core` | Chưa từng áp; đã xóa khỏi repo (còn trong git) | ADR-13 |
| `20261126000000_control_plane`, `20261126000100_agent_runtime` | Chỉ tồn tại trong P1–P2, chưa từng áp; gộp vào `ai_core` | ADR-13 |
| `20261126000200_ai_core` | Đã áp Supabase dev 26/11/2026 | Bảng AI Core, Control Plane, Coach Configuration, MCP grant; thu hồi quyền DELETE "DEMO ONLY" của `20261123000400` |
| `20261126000300_drop_coach_demo` | Đã áp Supabase dev 26/11/2026 | Bỏ `app_private.ai_executions` (840 dòng demo), `ai_execution_attempts` (837), `ai_daily_trends` (3), cột `ai_usage_events.execution_attempt_id` (0 dòng có giá trị). Tech Lead đồng ý xóa dữ liệu demo |

Giữ lại có chủ đích: giá trị `coach.respond`, `coach.daily_themes` trong CHECK của `domain_operations`/`outbox_events` (840 dòng cũ còn dùng); bảng `coach_messages`; index và grant của `20261123*` trên bảng dùng chung. VT-07 (26/11/2026) là lần kiểm phát hiện `20261123*` đã áp, dẫn tới cách làm expand/contract ở trên ([sổ rủi ro R-13](TECHNICAL_RISK_REGISTER.md)).
