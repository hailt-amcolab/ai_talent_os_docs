# AI Talent OS — Sổ rủi ro kỹ thuật AI Core

**Bản 1.1 · 26/11/2026.** Thuộc bộ [AI Core](README.md). Mức: **C** cao, **T** trung bình, **Th** thấp. Rủi ro nghiệp vụ (Q&A còn mở) chỉ được liệt kê khi chặn một phần kỹ thuật; nội dung nghiệp vụ không tự quyết ở đây.

## 1. Rủi ro

| Mã | Rủi ro | Khả năng | Ảnh hưởng | Giảm thiểu | Dấu hiệu theo dõi | Liên quan |
|---|---|---|---|---|---|---|
| R-01 | API của `@openai/agents` (TypeScript) đổi giữa các phiên bản | T | T | Pin phiên bản chính xác; mọi chỗ dùng SDK nằm trong `ai/runtime`, `ai/tools/define.ts`, `ai/session`; test hợp đồng với `ModelProvider` giả; nâng cấp có chủ đích | Test hợp đồng lỗi khi nâng | ADR-02, VT-01 |
| R-02 | `store:false` làm giảm chất lượng hoặc lỗi hội thoại nhiều lượt với model có reasoning | Th (P0 đạt) | T | VT-04 sớm ở P0; phương án: reasoning thấp, gửi kèm reasoning mã hóa nếu SDK hỗ trợ, hoặc `store:true` sau khi khách đồng ý (Q-AI-01) | Lỗi API khi tiếp nối; eval agent giảm | ADR-06 |
| R-03 | OpenAI khai tử tính năng (đã có: prompt object, Evals API tắt 30/11/2026; Flex ngừng phát triển) | C | T | Không dựa vào tính năng đang khai tử; prompt và eval trong repo; rà tài liệu OpenAI mỗi quý | Thông báo deprecation | ADR-08, 09, 12 |
| R-04 | OAuth MCP với ChatGPT phức tạp hơn dự kiến (authorization server, client registration, refresh/revoke) | C | T | POC (VT-08) chạy song song từ P1; MCP không chặn phần lõi; xác nhận luôn qua PWA | POC quá 3 ngày chưa kết nối | ADR-14 |
| R-05 | Manager tưởng "AI đã lưu" khi mới có đề xuất | T | T | Thẻ đề xuất có trạng thái rõ; template receipt; model được dặn không nói đã lưu; eval kiểm câu chữ | Phản hồi UAT | ADR-04 |
| R-06 | Mất câu trả lời đang soạn khi worker crash | Th | Th | Chấp nhận (ADR-07); UI báo lỗi rõ, người dùng gửi lại; lệnh đã commit giữ nguyên | Tỷ lệ `WORKER_LOST` > 0,5% | ADR-07 |
| R-07 | Item session dở dang (tool call thiếu kết quả) làm hỏng lượt sau | Th (P0: không tái hiện) | C | Discard item của run lỗi; cắt lịch sử theo cặp; AIC-T36 | Lỗi API "missing tool output" | ADR-05, VT-05 |
| R-08 | Hội thoại dài làm tăng chi phí và vượt context | T | T | Trần item/ký tự; theo dõi; thêm compaction (`OpenAIResponsesCompactionSession`) khi đo thấy cần | Token input trung bình/lượt tăng | Runtime §4.3 |
| R-09 | Đỉnh buổi sáng không kịp hạn khung khi số Talent tăng | T | C | Hàng đợi `ai-tasks` riêng; bắt đầu trước khung; concurrency và limiter theo rate limit; đo VT-09; thêm worker | queue wait p95 > 30% thời gian dự phòng | Kiến trúc §10 |
| R-10 | Tiêm chỉ dẫn qua tin nhắn, ảnh, tin tức | T | T | Không tool nguy hiểm; quyền tất định; dữ liệu ngoài có nhãn; eval có mẫu tấn công | Eval tấn công thất bại | Bảo mật §6 |
| R-11 | Dữ liệu Talent (có người dưới 18) nằm trong log giám sát lạm dụng của OpenAI tới 30 ngày | C (chắc chắn nếu không ZDR) | T | Tối thiểu hóa dữ liệu; `store:false`; hỏi khách Q-AI-01 | — | Bảo mật §9 |
| R-12 | Responses API không nhận video trực tiếp | C | T | Trích khung hình bằng ffmpeg trong worker (thêm vào image Docker); VT-06 | — | Runtime §3.2 |
| R-13 | Giả định "migration AI chưa áp Supabase" sai | **Đã xảy ra** (VT-07: `20261123*` đã áp) | T | Nhánh kết hợp: thay `20261125` chưa áp, expand/contract cho `20261123*` ([DB §7](LICH_SU_TRIEN_KHAI.md#5-lịch-sử-migration)) | — | ADR-13 |
| R-14 | Model mặc định hoặc model đang dùng bị đổi/khai tử | T | T | Tên model trong cấu hình; eval khi đổi; không dùng model mặc định ngầm của SDK | Thông báo OpenAI | Runtime §8.1 |
| R-15 | Q&A nghiệp vụ chưa chốt chặn tool/task P5 (QA54/70/71/72/83/92/95/96/99, 確認61/62) | C | T | Tool `ready:false`; không tự đặt luật; P5 tách theo module | Ngày UAT đến gần | Kiến trúc §2.4 |
| R-16 | Không lấy được usage chi tiết theo request từ SDK để tính chi phí | Th | T | VT-03; phương án: `preserveRawUsage`, hoặc chỉ ghi usage gộp mỗi run | — | ADR-10 |
| R-17 | Cấu hình tracing sai làm lộ nội dung hội thoại sang OpenAI | Th | C | `traceConfig` đặt `traceIncludeSensitiveData:false` cho mọi run (SDK mặc định `true`), có unit test; không gọi `run()` mặc định; tắt tracing ở test | Kiểm định kỳ trace mẫu | ADR-10 |
| R-18 | Chi phí AI vượt dự tính | T | T | Route model nhỏ; cache; giới hạn tần suất; giới hạn chi tiêu project; báo cáo chi phí ngày | Chi phí/Talent/tháng vượt ngưỡng nội bộ | ADR-12 |

## 2. Rủi ro của code demo đã loại bỏ

Chuyển sang [Lịch sử triển khai §2](LICH_SU_TRIEN_KHAI.md#2-đánh-giá-giữthaybỏ-đã-thực-hiện).

## 3. Việc kiểm chứng kỹ thuật

| Mã | Câu hỏi | Cách kiểm | Đạt khi | Nếu không đạt | Giai đoạn |
|---|---|---|---|---|---|
| VT-01 | `@openai/agents` (bản mới nhất lúc làm) chạy với Node, TypeScript, zod v4 của repo; tên chính xác của `run()` options (`toolExecution.maxFunctionToolConcurrency`, `sessionInputCallback`, `errorHandlers`) | Spike nhỏ trong nhánh riêng | Typecheck + chạy được agent có một tool | Dùng tham số tương đương theo tài liệu phiên bản đó; cập nhật Runtime §2 | P0 |
| VT-02 | `instructions` nhận hàm `(runContext) => string` | Spike | Instructions động theo ContextPack | Dựng agent mỗi run với instructions chuỗi | P0 |
| VT-03 | Lấy usage theo từng request (input, output, cached, reasoning token) | Spike: `rawResponses`, `runContext.usage`, `preserveRawUsage` | Ghi được một dòng/request | Ghi usage gộp mỗi run (R-16) | P0 |
| VT-04 | `store:false` + session Postgres + reasoning model qua 5 lượt có tool | Spike với model route `fast` | Không lỗi, ngữ cảnh giữ đúng | R-02 | P0 |
| VT-05 | SDK ghi item input/output vào session lúc nào; abort giữa run để lại gì | Spike: abort ở các thời điểm khác nhau | Quy tắc discard đúng, lượt sau chạy | Ghi item vào bảng tạm rồi chép khi run thành công | P0 |
| VT-06 | Phân tích video: input trực tiếp có được không; nếu không, trích N khung (ffmpeg) đủ chất lượng | Thử với video mẫu giả | Kết quả `media_analysis` hợp lệ | Chỉ phân tích ảnh bìa + nhãn "chưa phân tích video" | P5 |
| VT-07 | Supabase dev đã áp những migration nào | `npm run db:status` (owner) | Biết nhánh A/B | — | P0 |
| VT-08 | OAuth MCP với ChatGPT thật | POC theo [chatgpt-mcp-spec](../chatgpt-mcp-spec/README.md) | Kết nối, gọi tool, refresh, revoke | Tạm dùng M-17 cho mọi việc Manager; báo đầu mối dự án (căn cứ hợp đồng A4) | P1–P4 |
| VT-09 | Tải buổi sáng 300 Talent | Script tạo Talent giả + model thật hoặc giả có độ trễ | Xong trước hạn khung với dư ≥ 30% | Tăng concurrency/worker, bắt đầu sớm hơn | P6 |
| VT-10 | Prompt caching có tác dụng với cấu trúc prompt mới | Theo dõi `cached_tokens` trên staging một tuần | > 30% input chat là cached | Sắp xếp lại prompt, thêm `prompt_cache_key` theo Talent | P6 |

## 4. Kết quả P0 (26/11/2026)

Môi trường: `@openai/agents@0.22.0`, `openai@7.64.0`, Node 22.20, zod 4, model `gpt-6-luna` (OpenAI thật, tracing tắt, dữ liệu giả), Postgres 16 cục bộ tạm. Script: `apps/api/tools/p0/spike.ts`, `apps/api/tools/p0/pg-session-spike.ts`.

| Mã | Kết quả | Bằng chứng |
|---|---|---|
| VT-01 | **Đạt.** Cài và typecheck sạch; có đủ option `toolExecution.maxFunctionToolConcurrency`, `sessionInputCallback`, `errorHandlers`, `toolNotFoundBehavior`, `traceIncludeSensitiveData`, `groupId`, `traceMetadata`; agent gọi tool zod đúng | Typings + chạy thật; `npm run typecheck`, `npm test` (25 đạt, 10 bỏ qua cần DB) |
| VT-02 | **Đạt.** `instructions: (runContext, agent) => string \| Promise<string>` nhận được context | Chạy thật |
| VT-03 | **Đạt.** `runContext.usage.requestUsageEntries` có một mục mỗi request (2 request ↔ 2 mục), gồm `cached_tokens`, `cache_write_tokens`, `reasoning_tokens`, `endpoint`; secret trong context không có trong raw response | Chạy thật |
| VT-04 | **Đạt.** `store:false`, 5 lượt có tool, reasoning `low` và `medium`: không lỗi, nhớ đúng ngữ cảnh lượt 1; ở `medium` SDK tự lưu 7 reasoning item có nội dung mã hóa | Chạy thật |
| VT-05 | **Đạt, có điều chỉnh thiết kế** ([Runtime §4.4](AI_RUNTIME_DESIGN.md#44-prismasession)): ghi một lần cuối run (cả stream); abort khi tool chạy ghi cặp call/result nhất quán; abort khi model sinh hoặc `maxTurns` không ghi gì; abort khi stream ghi item người dùng và SDK ném `ModelBehaviorError`; lượt sau luôn chạy được | Chạy thật, 7 kịch bản |
| ADR-05 | **Đạt.** Session Postgres (5 phương thức), mỗi lượt Session + Agent mới (giả lập khởi động lại), 3 lượt giữ ngữ cảnh; reasoning mã hóa qua jsonb nguyên vẹn; `getItems` khớp số dòng | Chạy thật |
| VT-07 | **Xong.** Supabase dev: 12 migration đã áp gồm `20261123*`; chưa áp `20261125000000_agent_core`. Sau đó (26/11) đã áp `20261126000200_ai_core` + contract `20261126000300_drop_coach_demo` | `npm run db:status` |
| VT-08 | **Chưa làm.** Cần URL HTTPS công khai, tài khoản ChatGPT được thêm connector, authorization server | — |

Ghi nhận phụ: ở reasoning `low`, model không sinh reasoning token (`reasoning_tokens: 0`), nên chat ở route `fast` gần như không tốn token reasoning.

