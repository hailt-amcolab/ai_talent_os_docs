# AI Talent OS — Quyết định kiến trúc (ADR)

**Bản 1.1 · 26/11/2026.** Thuộc bộ [AI Core](README.md). Mỗi ADR (bản ghi quyết định kiến trúc) có trạng thái **Chấp nhận** (đội kỹ thuật quyết theo ủy quyền) hoặc **Có điều kiện** (phụ thuộc một việc kiểm chứng VT-xx ở [sổ rủi ro](TECHNICAL_RISK_REGISTER.md)). Không ADR nào thay đổi hành vi nghiệp vụ đã được khách xác nhận.

## 1. Phạm vi

Các ADR dưới đây là quyết định của AI Core **đang áp dụng**. Bảng đánh giá giữ/thay/bỏ code demo cũ (`modules/ai-coach/`, đã xóa) nằm ở [Lịch sử triển khai §2](LICH_SU_TRIEN_KHAI.md#2-đánh-giá-giữthaybỏ-đã-thực-hiện).

## 2. ADR

### ADR-01 — Modular monolith, hai entrypoint
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Một codebase `apps/api`, hai tiến trình: HTTP (`server.ts`) và worker (`worker.ts`). Không microservice.
- **Lý do:** Khoảng 5 Manager, tối đa vài trăm Talent giai đoạn đầu; tải nhỏ (≈ 3.300 request model/ngày ở 300 Talent). Một DB, một transaction cho dữ liệu + outbox.
- **Phương án khác:** Tách AI service riêng (thêm mạng, auth nội bộ, triển khai); serverless cho worker (giới hạn thời gian chạy, khó giữ lease).
- **Đánh đổi:** Chung release; một lỗi bộ nhớ ở worker không ảnh hưởng HTTP nhờ tách tiến trình.
- **Rủi ro:** Phụ thuộc lẫn nhau trong code → kiểm bằng quy tắc import ([Kiến trúc §8](AI_CORE_ARCHITECTURE.md#8-ranh-giới-module-và-quy-tắc-phụ-thuộc)).
- **Kiểm chứng:** CI chặn import sai hướng; worker và server khởi động độc lập.

### ADR-02 — Agents SDK cho Agent Mode
- **Trạng thái:** Chấp nhận. P0 ngày 26/11/2026: VT-01, VT-02, VT-03 đạt với `@openai/agents@0.22.0`, model `gpt-6-luna` ([kết quả P0](TECHNICAL_RISK_REGISTER.md#4-kết-quả-p0-26112026)).
- **Quyết định:** Dùng `@openai/agents` cho vòng lặp model/tool, schema tool (zod strict), session, `maxTurns`, AbortSignal, stream, tracing, usage. Bỏ runner và gateway tự viết; bỏ gói `ai`, `@ai-sdk/openai`.
- **Lý do:** Các khả năng này có sẵn và được tài liệu hóa; code demo tự viết lại chúng (runner ~135 dòng, store ~400 dòng, model gateway, ledger). Ít mã hơn, ít lỗi hơn, theo kịp tính năng mới của OpenAI.
- **Phương án khác:** Giữ AI SDK của Vercel (đa nhà cung cấp, nhưng phải tự viết vòng lặp có checkpoint như code demo); gọi Responses API trực tiếp với vòng lặp tự viết.
- **Đánh đổi:** Gắn với OpenAI ở lớp runtime (chấp nhận: nguồn chỉ định OpenAI). Không còn checkpoint từng bước (xem ADR-07).
- **Rủi ro:** API SDK thay đổi giữa phiên bản → pin phiên bản, test hợp đồng (R-01).
- **Phụ thuộc:** Node.js tương thích SDK; `zod` v4 tương thích (VT-01).
- **Kiểm chứng:** Unit test với `ModelProvider` giả; smoke thật qua 3 luồng ở [Kiến trúc §9.1–9.2](AI_CORE_ARCHITECTURE.md#9-luồng-chính).

### ADR-03 — Gọi Responses API trực tiếp cho AI Task Mode
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Tác vụ có đầu vào/đầu ra rõ (chủ đề sáng, caption, kiểm từ cấm, phân tích media, tổng kết, giờ đăng) dùng `responses.create` với `text.format` json_schema strict, một lần gọi, không tool.
- **Lý do:** Không cần vòng agent; một lần gọi rẻ hơn, nhanh hơn, dễ eval, dễ idempotent.
- **Phương án khác:** Chạy mọi thứ qua agent (tốn lượt, khó đoán); Batch API cho mọi task (24 giờ, không hợp khung giờ sáng).
- **Đánh đổi:** Hai cách gọi model trong code (agent và task), mỗi cách có một hàm bao duy nhất.
- **Kiểm chứng:** Eval từng task đạt ngưỡng; tỷ lệ `TASK_OUTPUT_INVALID` < 0,5%.

### ADR-04 — Xác nhận của con người qua Control Plane, xác nhận là lệnh đồng bộ
- **Trạng thái:** Chấp nhận (Tech Lead duyệt 26/11/2026).
- **Quyết định:** Tool `*_prepare` tạo proposal bất biến (diff, base version, hash, hạn) và run agent kết thúc bình thường. `POST /admin/proposals/{id}/confirm` thực hiện lệnh ghi trong **một transaction** (kiểm actor AAL2, hash, hạn, CAS, ghi, receipt, audit, outbox, thêm item receipt vào session). Không dùng `needsApproval`/RunState cho xác nhận nghiệp vụ. Bỏ `waiting_confirmation`, wake, resume, `change_commit`.
- **Lý do:** (1) Yêu cầu "lệnh đã xác nhận phải chạy được độc lập với model" — confirm đồng bộ đáp ứng trực tiếp. (2) Xác nhận phải gắn đúng người, AAL2, hash nội dung, version, hạn, kênh (M-17, Dashboard, ChatGPT/MCP); MCP không có run nội bộ để resume. Approval của SDK gắn với một run đang tạm dừng và với RunState, tài liệu SDK còn lưu ý không tin snapshot từ client. (3) Bỏ được phần phức tạp nhất của code demo.
- **Phương án khác:** `needsApproval` + lưu RunState ở server + resume sau xác nhận (giữ hai cơ chế cho M-17 và MCP; commit lại phụ thuộc runtime AI); giữ thiết kế của code demo.
- **Đánh đổi:** Model không "thấy" kết quả xác nhận trong cùng run; nó thấy ở lượt sau qua item receipt trong session. Chấp nhận: UI hiển thị receipt ngay.
- **Rủi ro:** Manager hiểu nhầm "AI đã lưu" khi mới có đề xuất → thẻ đề xuất và template trạng thái rõ ràng (R-05).
- **Kiểm chứng:** AIC-T03, T04, T09 (viết lại) ở [Kế hoạch §4](IMPLEMENTATION_PLAN.md#4-ánh-xạ-ca-kiểm-hồi-quy).

### ADR-05 — Session agent lưu ở Postgres
- **Trạng thái:** Chấp nhận. P0: VT-05 và bản thử session trên Postgres đạt ([kết quả P0](TECHNICAL_RISK_REGISTER.md#4-kết-quả-p0-26112026)).
- **Quyết định:** `PrismaSession` triển khai interface `Session` của SDK trên bảng `agent_session_items`; UI đọc cùng bảng. Không dùng `OpenAIConversationsSession`.
- **Lý do:** DB là nguồn (QA101); Conversations API lưu tới khi xóa và không đủ điều kiện ZDR; xóa dữ liệu sau chấm dứt 6 tháng (KS 確認55/56) phải làm được trong DB của mình.
- **Phương án khác:** Conversations API (ít mã, nhưng dữ liệu nằm ở OpenAI); `previous_response_id` (cần `store:true`, tính tiền lại toàn chuỗi).
- **Đánh đổi:** Tự viết khoảng 80 dòng adapter; tự cắt lịch sử.
- **Kiểm chứng:** Test adapter với SDK thật: nhiều lượt, tool call, lỗi giữa run → discard đúng, lượt sau không lỗi `function_call` mồ côi.

### ADR-06 — Không lưu trạng thái ở OpenAI (`store:false`)
- **Trạng thái:** Chấp nhận. P0: VT-04 đạt ở reasoning `low` và `medium` ([kết quả P0](TECHNICAL_RISK_REGISTER.md#4-kết-quả-p0-26112026)).
- **Quyết định:** Mọi lệnh gọi đặt `store:false`; không dùng `previous_response_id`, Conversations, Files, Batch cho dữ liệu Talent ở giai đoạn đầu.
- **Lý do:** Có dữ liệu cá nhân, kể cả Talent dưới 18; giảm dữ liệu nằm ngoài hệ thống; giữ khả năng chuyển sang ZDR nếu khách yêu cầu.
- **Đánh đổi:** Với model có reasoning, SDK tự gửi kèm reasoning đã mã hóa (chuỗi mờ) và lưu trong session ở DB của mình; hội thoại nhiều lượt giữ đúng ngữ cảnh (P0). Nếu khách chọn ZDR (Q-AI-01), chỉ cần tắt tracing.
- **Kiểm chứng:** VT-04: hội thoại 5 lượt có tool với `store:false` không lỗi và giữ ngữ cảnh.

### ADR-07 — Phục hồi ở mức run, bỏ ledger từng bước
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Run agent là một đơn vị. Lease trên `agent_runs` (task: trên `ai_task_runs`); reconciler đánh dấu `failed/WORKER_LOST` khi mất lease sau khi đã gọi model, trả về `pending` một lần nếu chưa gọi; không tự chạy lại model giữa chừng; người dùng gửi lại. Lệnh nghiệp vụ đã commit giữ nguyên (idempotent). Không có ledger từng bước, cursor, resume.
- **Lý do:** Không có yêu cầu nghiệp vụ nào cần tiếp tục một câu trả lời chat bị gián đoạn. Thứ phải chính xác là dữ liệu nghiệp vụ, và nó đã được bảo vệ bởi Control Plane. Ledger từng bước của code demo là phần mã lớn nhất và khó kiểm nhất.
- **Phương án khác:** Giữ ledger như code demo; dùng RunState snapshot sau mỗi lượt (SDK không bảo đảm phục hồi sau crash tùy ý).
- **Đánh đổi:** Crash giữa run làm mất câu trả lời đang soạn và có thể tốn thêm một lần gọi model khi gửi lại.
- **Kiểm chứng:** Test kill worker giữa run: lệnh đã commit còn, run `failed`, gửi lại chạy bình thường, không ghi trùng.

### ADR-08 — Prompt registry trong code
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Prompt là file TypeScript có `key` và `version`, review qua PR, ghi `key@version` vào mọi execution. Không dùng prompt object của OpenAI.
- **Lý do:** OpenAI đang khai tử prompt object, `v1/prompts` tắt ngày 30/11/2026; tài liệu OpenAI khuyên quản lý prompt trong code. Prompt cần đi cùng code và eval.
- **Phương án khác:** Lưu prompt trong DB để sửa không cần deploy (thêm UI, quyền, version; chưa có yêu cầu: chỉ thị Manager đã là phần có thể sửa).
- **Kiểm chứng:** Mỗi execution có `prompt_version`; PR đổi prompt kèm kết quả eval.

### ADR-09 — Đánh giá chất lượng AI chạy trong repo
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Bộ dữ liệu JSONL giả + grader tất định + grader model theo rubric, chạy bằng `npm run eval`, artifact JSON trong CI. Không dùng Evals API.
- **Lý do:** Evals API tắt ngày 30/11/2026; eval cần chạy được trong CI và gắn với version prompt.
- **Kiểm chứng:** Mỗi task/agent có ít nhất 20 mẫu; CI chặn PR đổi prompt/model khi dưới ngưỡng.

### ADR-10 — Tracing của SDK để gỡ lỗi, audit DB là nguồn
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Bật tracing SDK với `traceIncludeSensitiveData=false`, `groupId=conversationId`; tắt ở test và khi bật ZDR. Usage, chi phí, lệnh, nhật ký xem lưu ở Postgres.
- **Lý do:** Trace giúp gỡ lỗi chọn tool; nhưng trace nằm ở OpenAI, không thay được nhật ký nghiệp vụ YK3 § 9-4.
- **Đánh đổi:** Không thấy nội dung prompt trong trace; gỡ lỗi nội dung dùng môi trường dev có bật dữ liệu nhạy cảm với dữ liệu giả.
- **Kiểm chứng:** Trace production không chứa input/output; mọi run có dòng usage trong DB.
- **Cách làm:** SDK mặc định `traceIncludeSensitiveData=true` và chỉ nhận cấu hình trace qua `new Runner(config)`, nên mỗi run tạo Runner riêng bằng `traceConfig` ([ai/runtime/run-agent.ts](../../apps/api/src/ai/runtime/run-agent.ts)); không dùng `run()` mặc định. Có test giữ cấu hình (`run-agent.test.ts`).

### ADR-11 — Business Control Plane dùng chung
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Thư mục `control/` gồm `ActorContext/AccessPolicy`, capability registry, `ProposalService`, `CommandBus` (idempotency key, CAS, audit, outbox, receipt trong một transaction), `idempotency_requests` cho POST. Module đăng ký handler lệnh; REST, MCP, tool agent, scheduler đều gọi qua đây.
- **Lý do:** Mọi module (không chỉ AI) cần cùng mẫu ghi; code demo chỉ có mẫu cho agent và để thiếu idempotency HTTP chung.
- **Phương án khác:** Mỗi module tự làm (không nhất quán); dùng thư viện CQRS/event sourcing (quá nặng).
- **Kiểm chứng:** Test chung cho CommandBus: trùng key, khác hash, CAS conflict, rollback khi handler lỗi, outbox cùng transaction.

### ADR-12 — Định tuyến model và tối ưu chi phí
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Hai route `fast`/`standard` cấu hình bằng env; prompt tĩnh đặt trước để cache; không dùng Flex; Batch chỉ xem xét cho tổng kết tuần sau khi đo.
- **Lý do:** Flex đang ngừng phát triển; Batch hoàn tất trong 24 giờ, không hợp khung sáng/trưa/tối (KS 確認18) và không đủ điều kiện ZDR.
- **Kiểm chứng:** Báo cáo chi phí ngày từ `ai_usage_events`; tỷ lệ cached token > 30% cho chat sau một tuần (mục tiêu, không cam kết).

### ADR-13 — Gộp các migration AI chưa áp thành một migration mới
- **Trạng thái:** Chấp nhận (Tech Lead duyệt 26/11/2026). **Đã thực hiện:** các migration chưa áp gộp thành `20261126000200_ai_core`; bảng demo của `20261123*` (đã áp) bỏ bằng `20261126000300_drop_coach_demo`; cả hai đã áp Supabase dev ([Lịch sử §5](LICH_SU_TRIEN_KHAI.md#5-lịch-sử-migration)).
- **Quyết định:** Nếu Supabase dev xác nhận chưa áp `20261123*` và `20261125000000_agent_core`: xóa các migration đó khỏi repo (vẫn còn trong git) và tạo một migration `<ngày>_ai_core` theo [DATABASE_DESIGN](DATABASE_DESIGN.md). Nếu đã áp: tạo migration tiến (expand/contract), không sửa migration đã áp.
- **Lý do:** Các migration đó tạo bảng mà thiết kế này không dùng (`agent_steps`, attempts…); gộp khi chưa áp tránh để lại cấu trúc chết.
- **Rủi ro:** DB local của dev đã replay migration cũ phải dựng lại (chấp nhận, chỉ là DB tạm).
- **Kiểm chứng:** `npm run db:status` trên Supabase dev 14/14; `db:diff` rỗng; replay sạch toàn bộ migration trên DB mới (`npm run test:local`).

### ADR-14 — MCP: server riêng, không có LLM nội bộ
- **Trạng thái:** Có điều kiện (VT-08 OAuth POC). Chưa làm được ở P0: cần URL HTTPS công khai, tài khoản ChatGPT được thêm connector và authorization server.
- **Quyết định:** `/mcp` dùng MCP TypeScript SDK (Streamable HTTP); tool MCP là lời gọi Control Plane (đọc, `*_prepare`, `proposal_status`); xác nhận qua trang PWA có phiên Manager và TOTP; OAuth qua adapter, grant lưu ở BE.
- **Lý do:** ChatGPT đã suy luận; thêm LLM nội bộ là tốn kém vô ích. Căn cứ hợp đồng: 御見積書 A4.
- **Kiểm chứng:** AIC-T14; ChatGPT thật kết nối, prepare, xác nhận, đọc trạng thái.

### ADR-15 — Polling trước, SSE sau
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Lượt đầu dùng polling. Thêm `GET …/runs/{id}/stream` (SSE) đọc Redis pub/sub `run:{id}`; mất kết nối thì quay về polling. Trạng thái cuối luôn từ DB.
- **Hiện trạng:** SSE đã có ở BE (có test, AIC-T37); FE `/pwa/coach` vẫn polling.
- **Lý do:** Agent chạy ở worker; pub/sub là cách nhẹ nhất để đưa delta về tiến trình HTTP.
- **Kiểm chứng:** Ngắt SSE giữa chừng không ảnh hưởng run; reverse proxy không đệm SSE.

### ADR-16 — Guardrail tất định, chưa dùng guardrail bằng LLM
- **Trạng thái:** Chấp nhận.
- **Quyết định:** Kiểm đầu vào bằng code (độ dài, tần suất, định dạng); quyền kiểm trong tool; không dùng input/output guardrail chạy model ở giai đoạn đầu. Kiểm từ cấm là AI Task của Posting, không phải guardrail chat.
- **Lý do:** Guardrail chạy model tốn thêm một lần gọi mỗi lượt; rủi ro chính (vượt quyền) đã chặn bằng code. Nguồn chỉ yêu cầu chuyển hướng khi lạc đề (chỉ thị `conversation_limits`).
- **Đánh đổi:** Câu trả lời lạc đề vẫn có thể xảy ra; theo dõi qua eval.
- **Kiểm chứng:** Eval agent có mẫu lạc đề và mẫu tiêm chỉ dẫn; thêm guardrail SDK nếu tỷ lệ lỗi vượt ngưỡng.

### ADR-17 — Không vector, không RAG
- **Trạng thái:** Chấp nhận (quyết định nội bộ 26/11/2026, [hồ sơ](../../database-design/vector-decision-2026-11-26.json)).
- **Quyết định:** Context lấy bằng SQL theo quyền và version; memory là dữ liệu có cấu trúc.
- **Kiểm chứng:** Không có bảng/chỉ mục vector; context manifest liệt kê nguồn.
