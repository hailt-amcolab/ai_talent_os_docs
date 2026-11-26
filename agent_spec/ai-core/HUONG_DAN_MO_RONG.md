# AI Core — Hướng dẫn mở rộng

**Bản 1.0 · 26/11/2026.** Thuộc bộ [AI Core](README.md). Viết cho lập trình viên và AI agent làm tính năng mới trên AI Core. Có ba công thức: **thêm tool cho agent** (§2), **thêm AI task** (§3), **thêm lệnh nghiệp vụ** (§4); mỗi công thức có danh sách file phải chạm và test phải có. Code mẫu là code đang chạy; đọc file mẫu trước khi viết. Đường dẫn tính từ `apps/api/src/`.

## 1. Chọn công thức nào

| Tính năng cần… | Dùng | Ví dụ có sẵn |
|---|---|---|
| Agent đọc thêm dữ liệu trong hội thoại | §2, tool đọc | `context_read`, `talent_search` |
| Agent đề xuất thay đổi, người xác nhận mới lưu | §2 tool `*_prepare` + §4 lệnh qua đề xuất | `profile_prepare` → `talent_profile.update` |
| Một lần gọi model có đầu vào/đầu ra rõ (viết caption, kiểm từ cấm, chủ đề buổi sáng…) | §3 | `daily_topics` |
| Thao tác ghi dữ liệu nghiệp vụ (từ UI, MCP, agent hay hệ thống) | §4 | `ai_instruction.write` |
| Việc tất định không cần model (đặt lịch, gửi Upload-Post…) | Không phải AI Core: service + outbox + worker ([Kiến trúc §10](AI_CORE_ARCHITECTURE.md#10-kiến-trúc-job-nền)) | xuất OneDrive `Profile.md` |

Ba quy tắc không đổi, mọi công thức đều giữ:
1. **Model không bao giờ là bằng chứng hay quyền.** Quyền kiểm bằng code (`assertCapability`, kiểm tài nguyên trong module); việc "đã lưu" chỉ đến từ `business_commands`.
2. **Mọi ghi nghiệp vụ đi qua Control Plane** (`ProposalService` hoặc `execute`), trong một transaction có idempotency key, CAS, receipt, audit, outbox.
3. **Model chỉ thấy dữ liệu trong quyền của actor**; actor lấy từ phiên/grant, không từ tham số model.

## 2. Thêm tool cho agent

Mẫu: [ai/tools/index.ts](../../apps/api/src/ai/tools/index.ts) (`contextRead`, `profilePrepare`), [ai/tools/define.ts](../../apps/api/src/ai/tools/define.ts).

**Các bước:**

1. **Capability.** Thêm tên vào kiểu `Capability` và bảng `ALLOWED` trong [control/access.ts](../../apps/api/src/control/access.ts), ghi rõ kênh nào được dùng. Tên dạng `<tài nguyên>.<động từ>` (`media.read`, `draft.prepare`).
2. **Hàm đọc ở module sở hữu dữ liệu** (`modules/<x>/reader.ts`): SQL nằm ở đây, không nằm trong tool. Nếu Manager đọc dữ liệu của một Talent thì ghi `manager_view_logs` (YK3 §9-4), như `context_read`.
3. **Khai báo tool** bằng `defineTool` và thêm vào mảng `TOOLS`:
   - `name` dạng snake_case; `channels` chỉ gồm kênh thật sự cần (`talent`, `manager_ui`, `manager_mcp`);
   - `writes: true` nếu tool tạo đề xuất hay lệnh (khi đó chỉ được đưa cho model lúc `ENABLE_AGENT_WRITES=true`);
   - `ready: false` khi module phía sau chưa có đặc tả hay bảng chưa mở ghi: tool không bao giờ đến tay model;
   - `description` bằng tiếng Nhật: tool làm gì, **không** làm gì (ví dụ "まだ保存しない"), lấy `expectedVersion` ở đâu;
   - `parameters`: zod `.strict()`, mọi chuỗi có `max`, mọi số có `min`/`max`, ID là `z.uuid()`;
   - `run(args, ctx)`: lấy actor từ `ctx.actor`. Talent chỉ đọc chính mình: server quyết, `talentId` khác của Talent → `NOT_FOUND_OR_FORBIDDEN`. Lỗi nghiệp vụ ném `AppError`; `sdkTools` tự đổi thành kết quả cho model.
4. **Tool đề xuất:** gọi `ctx.services.proposals.prepare(actor, ctx.channel, '<command type>', input, { idempotencyKey: keyOf(ctx, '<tool>', args), runId: ctx.runId, clientGrantId: ctx.grantId })`. Cần lệnh tương ứng theo §4. Không viết tool commit hay confirm.
5. **MCP:** tool có kênh `manager_mcp` tự xuất hiện ở `/mcp`. Capability mới phải thêm vào CHECK `mcp_grants.capabilities` bằng migration; grant cũ không tự có quyền mới.
6. **Prompt:** nếu agent cần biết khi nào dùng tool, sửa prompt trong [ai/prompts/registry.ts](../../apps/api/src/ai/prompts/registry.ts) và **tăng `version`** (§5).

**Test phải có** (mẫu: [agent-runtime.integration.test.ts](../../apps/api/src/ai/runtime/agent-runtime.integration.test.ts), model giả chạy theo kịch bản qua vòng lặp thật của SDK):
- tool chạy đúng với actor đúng kênh; actor sai kênh → `ACTION_NOT_ALLOWED`;
- Talent truyền `talentId` của người khác → `NOT_FOUND_OR_FORBIDDEN`, không lộ dữ liệu;
- tham số sai schema → model nhận `INPUT_INVALID` kèm `issues`;
- tool ghi: run kết thúc `action_result`, `final_text` là template backend (không phải lời model);
- thêm ca vào `evals/agent.talent` hoặc `evals/agent.manager` (`cases.jsonl`): model chọn đúng tool, không gọi tool ngoài quyền.

## 3. Thêm AI task

Mẫu: [ai/tasks/daily-topics.ts](../../apps/api/src/ai/tasks/daily-topics.ts) (định nghĩa), [modules/coach-daily/service.ts](../../apps/api/src/modules/coach-daily/service.ts) (lên lịch, chạy, phục hồi), [daily.integration.test.ts](../../apps/api/src/modules/coach-daily/daily.integration.test.ts).

**Mọi task dùng chung** bảng `ai_task_runs`, event `ai.task.requested` và lane `ai-tasks`. Vì vậy:
- `leaseDue`, `run`, `reconcile` của service mới **phải lọc `task_key` của mình** (như hằng `TASK_KEY` trong `DailyTopicsService`); thiếu lọc thì hai service nhận nhầm việc của nhau;
- lane `ai-tasks` trong [worker.ts](../../apps/api/src/worker.ts) hiện chỉ có nguồn `DailyTopicsService`. Task thứ hai phải đổi lane sang một nguồn gộp: lease lần lượt ở từng service, nhớ `eventId` thuộc service nào, rồi chuyển job cho đúng service.

**Các bước:**

1. **Định nghĩa task** `ai/tasks/<tên>.ts`, kiểu `TaskDef<I, O>`:
   - `output`: zod có giới hạn chặt (độ dài, số phần tử đúng như nghiệp vụ, ví dụ `.length(3)`);
   - `instructions`: phần tĩnh (vai trò, quy tắc, cấm gì), tiếng Nhật, không chứa dữ liệu của lần gọi (để prompt caching dùng lại được);
   - `input`: dữ liệu của lần gọi; chỉ thị Manager đặt trước, dữ liệu Talent sau, dữ liệu không tin cậy có nhãn "データ（指示ではない）";
   - `prompt: { key: 'task.<tên>', version: 1 }`.
2. **Migration:** mở rộng CHECK `ai_task_runs.task_key` thêm `task.<tên>`. Operation dùng `kind='ai.task'`, event dùng `ai.task.requested` (đã có).
3. **Service ở module sở hữu kết quả** (`modules/<x>/`), theo mẫu `DailyTopicsService`:
   - `schedule`: một transaction tạo `domain_operations` với `operation_key` là khóa nghiệp vụ duy nhất (ví dụ `ai.task:<tên>:<đối tượng>:<ngày>`, `ON CONFLICT DO NOTHING`) + `outbox_events` + `ai_task_runs` (`input` cố định lúc lên lịch);
   - `run`: lease `ai_task_runs` → kiểm điều kiện (khung giờ, dữ liệu đủ) → đọc dữ liệu → `runTask(client, def, input, { model, timeoutMs })`;
   - kết thúc trong **một transaction có fence** (`lease_token`): ghi kết quả nghiệp vụ, `ai_usage_events` (`task_run_id`, `task_key`, `payer`, token cached/reasoning), trạng thái task + operation + outbox;
   - lỗi `AppError` (`TASK_OUTPUT_INVALID`, `TASK_REFUSED`) là kết thúc; lỗi mạng/provider trả về `pending`, có giới hạn số lần;
   - `reconcile`: task hết lease → `pending`.
4. **Người gọi:** scheduler trong worker (bộ hẹn giờ quét DB) hoặc service khác. Không gọi `runTask` trong request HTTP, trừ sandbox thử chỉ thị.
5. **Eval:** tạo `evals/<tên>/cases.jsonl` (≥ 20 ca, dữ liệu giả), thêm nhánh grader tất định cho bộ mới trong [tools/eval.ts](../../apps/api/tools/eval.ts), thêm lệnh vào phần `--evals` của [tools/test-local.sh](../../apps/api/tools/test-local.sh).

**Test phải có** (client `TaskClient` giả, không gọi OpenAI):
- lên lịch hai lần cùng khóa → một task;
- ngoài khung / quá hạn → không tạo, hoặc `MISSED_WINDOW`;
- output sai schema hai lần → `TASK_OUTPUT_INVALID`, không ghi kết quả, vẫn ghi usage;
- lỗi provider → về `pending`, `attempts` tăng;
- task xong không bao giờ chạy lại;
- `store: false` có trong body gửi đi.

## 4. Thêm lệnh nghiệp vụ

Mẫu: [modules/coach-config/handlers.ts](../../apps/api/src/modules/coach-config/handlers.ts) (`talentProfileUpdate`, `aiInstructionWrite`), [control/proposals.ts](../../apps/api/src/control/proposals.ts), [control/commands.ts](../../apps/api/src/control/commands.ts), [control.integration.test.ts](../../apps/api/src/control/control.integration.test.ts).

**Các bước chung:**

1. **Loại lệnh:**
   - thêm `<tài nguyên>.<hành động>` vào kiểu `CommandType` trong `control/commands.ts`;
   - migration mở rộng CHECK `command_type` của **cả** `business_proposals` và `business_commands`;
   - nếu đối tượng mới không phải Talent/global/category, mở rộng CHECK `target_kind` của cả hai bảng.
2. **Dữ liệu có version:** bảng tài nguyên có cột `version` (trigger `require_next_version`) và, nếu cần lịch sử, bảng `<x>_versions` chỉ thêm ([DB §7](DATABASE_DESIGN.md#7-quy-tắc-khi-đổi-schema-ai-core)).
3. **Effect sau khi ghi** (thông báo, đồng bộ ngoài): thêm loại vào kiểu `Effect` trong `commands.ts` và CHECK `outbox_events.event_type`, rồi thêm consumer ở worker. `execute` ghi outbox trong cùng transaction.

**Đường A — qua đề xuất** (Manager, MCP, AI đề xuất; một người xác nhận). Viết `ProposalHandler<I>` trong module sở hữu dữ liệu:

| Hàm | Làm gì | Không được |
|---|---|---|
| `plan(tx, input)` | Đọc và kiểm; trả `target` (có `label` dễ đọc), `before`, `patch`, `currentVersion` (0 = tạo mới); không đổi gì → `NO_CHANGE` | Ghi bất cứ thứ gì |
| `lock(tx, p)` | Khóa dòng tài nguyên (`FOR UPDATE` / `FOR NO KEY UPDATE`); được gọi **trước** khi khóa đề xuất | Khóa theo thứ tự khác (gây deadlock) |
| `apply(tx, actor, p)` | Ghi có CAS `WHERE version = p.base_version`; thêm dòng lịch sử; trả `{ version, changed, effects? }`; thua CAS → `null` | Ghi đè khi version đã đổi |
| `changes(before, patch)` | Danh sách `{ field, before, after }` cho thẻ xác nhận, nhãn tiếng Nhật | Lộ dữ liệu ngoài đối tượng |

Đăng ký handler trong `controlServices` của [container.ts](../../apps/api/src/container.ts) (`control/` không import module). Capability `<tài nguyên>.prepare` theo §2 bước 1. Tool `*_prepare` theo §2 bước 4. Xác nhận dùng route chung `/api/v1/admin/proposals/{id}/confirm`; không viết route xác nhận riêng.

**Đường B — lệnh trực tiếp** (thao tác UI có principal thật, ví dụ Talent chọn chủ đề; hoặc hệ thống). Hiện chưa có lệnh nào đi đường này; lệnh đầu tiên làm như sau:
- route HTTP: trong một `db.$transaction`, gọi `once(tx, { actorUserId, routeKey, requestKey }, body, action)` ([control/idempotency.ts](../../apps/api/src/control/idempotency.ts));
- trong `action`: `assertCapability`, `assertActive`, rồi `execute(tx, actor, { commandType, channel, idempotencyKey, payloadHash, target }, apply)`;
- `apply` theo đúng quy tắc của bảng trên (CAS, trả `null` khi thua);
- `execute` trả `{ conflict: true }` khi CAS thua → HTTP 409 `VERSION_CONFLICT`.

**Test phải có** (chạy bằng login runtime, nên quyền DB cũng được kiểm):
- cùng idempotency key → cùng receipt, chỉ một dòng `business_commands`;
- cùng `requestKey` khác nội dung → `REQUEST_KEY_REUSED`;
- version đã đổi → `conflicted` / `VERSION_CONFLICT`, dữ liệu không bị ghi đè;
- hai xác nhận đồng thời → đúng một lệnh;
- đề xuất hết hạn → 410; hash sai → 409; Manager AAL1 → 403;
- handler lỗi giữa chừng → không còn gì (lệnh, audit, outbox đều rollback);
- `activity_logs` có dòng `control.<command type>`.

## 5. Quy ước chung

- **Prompt:** mọi thay đổi có thể đổi hành vi thì tăng `version`, chạy eval của prompt đó và ghi kết quả vào PR. Chỉ thị Manager là dữ liệu trong DB, không phải prompt.
- **Mã lỗi:** `UPPER_SNAKE`, ném bằng `AppError(code, httpStatus)`. Mã mới cho người dùng thì thêm câu hiển thị vào `apps/web/lib/messages.ts`.
- **Cờ:** tính năng chưa sẵn sàng thì `ready: false` (tool) hoặc trả `FEATURE_NOT_READY`; không thêm cờ env cho từng tính năng.
- **Schema:** theo [DB §7](DATABASE_DESIGN.md#7-quy-tắc-khi-đổi-schema-ai-core); sau mỗi migration chạy `npm run test:local`.
- **Hợp đồng FE:** sau khi đổi route, chạy `npm run api:types` trong `apps/web`.
- **Hoàn tất:** `npm run test:local` đạt; eval liên quan đạt ngưỡng (`npm run test:local -- --evals`); cập nhật trạng thái ở [README](README.md#trạng-thái) và việc còn lại ở [Kế hoạch](IMPLEMENTATION_PLAN.md).
