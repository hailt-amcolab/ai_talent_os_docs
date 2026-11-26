# AI Core — bộ tài liệu

**Bản 1.1 · 26/11/2026.** AI Core là phần AI của AI育成OS (hệ điều hành đào tạo tài năng bằng AI) trong `apps/api`: agent hội thoại (Agents SDK), tác vụ AI một lần gọi (Responses API), Business Control Plane (mọi lệnh ghi nghiệp vụ) và MCP cho Manager. Bộ tài liệu mô tả **hệ thống đang chạy**; khi tài liệu và code/SQL khác nhau, code đúng và tài liệu phải sửa. Trạng thái chỉ ghi ở mục [Trạng thái](#trạng-thái) dưới đây; các file khác trỏ về đây.

## Đọc theo thứ tự

| # | Tài liệu | Đọc khi |
|---|---|---|
| 1 | [AI_CORE_ARCHITECTURE.md](AI_CORE_ARCHITECTURE.md) | Lần đầu: ba chế độ thực thi, sơ đồ, ranh giới module, luồng chính, job nền, quan sát, triển khai |
| 2 | [HUONG_DAN_MO_RONG.md](HUONG_DAN_MO_RONG.md) | **Làm tính năng mới:** thêm tool, AI task, lệnh nghiệp vụ; file phải chạm, test phải có |
| 3 | [AI_RUNTIME_DESIGN.md](AI_RUNTIME_DESIGN.md) | Agent Mode, AI Task Mode, context và memory, prompt registry, phục hồi, chi phí, eval |
| 4 | [DATABASE_DESIGN.md](DATABASE_DESIGN.md) | Bảng, ERD, quyền DB, retention, quy tắc đổi schema |
| 5 | [API_DESIGN.md](API_DESIGN.md) | REST, SSE, đề xuất/xác nhận, MCP |
| 6 | [SECURITY_DESIGN.md](SECURITY_DESIGN.md) | Xác thực, phân quyền, cô lập Talent, MCP, prompt injection, dữ liệu nhạy cảm, câu hỏi cho khách |
| 7 | [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md) | Muốn biết vì sao: ADR-01…17 (ADR: bản ghi quyết định kiến trúc) |
| 8 | [BUSINESS_MODULES.md](BUSINESS_MODULES.md) | Ranh giới các module nghiệp vụ, luồng đăng bài, ca kiểm toàn hệ thống, ma trận bao phủ yêu cầu |
| 9 | [TEST_RUNBOOK.md](TEST_RUNBOOK.md) | Chạy kiểm thử (`npm run test:local`), việc kiểm chờ đầu vào |
| 10 | [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | Cấu trúc mã, việc còn lại, ánh xạ ca kiểm |
| 11 | [TECHNICAL_RISK_REGISTER.md](TECHNICAL_RISK_REGISTER.md) | Rủi ro R-01…18, việc kiểm chứng VT-01…10 |
| 12 | [LICH_SU_TRIEN_KHAI.md](LICH_SU_TRIEN_KHAI.md) | Chỉ khi cần lịch sử: code demo cũ, P0–P4, điểm lệch so với thiết kế ban đầu, migration đã gộp/bỏ |

## Năm quyết định chính

1. **Agents SDK cho vòng lặp agent** (ADR-02); không tự viết runner, ledger, resume.
2. **Xác nhận là lệnh đồng bộ của Control Plane** (ADR-04); run agent kết thúc khi đã tạo đề xuất, không chờ, không đánh thức lại.
3. **Phục hồi ở mức run** (ADR-07); lệnh nghiệp vụ mới cần chính xác tuyệt đối, và nó được bảo vệ bằng idempotency + CAS.
4. **Business Control Plane dùng chung** cho REST, MCP, agent, scheduler (ADR-11), kèm idempotency HTTP chung.
5. **Tác vụ có biên rõ gọi Responses API một lần** (ADR-03); prompt và eval quản lý trong repo (ADR-08, 09).

## Trạng thái

Cập nhật 26/11/2026. Lịch sử từng giai đoạn: [LICH_SU_TRIEN_KHAI.md](LICH_SU_TRIEN_KHAI.md).

| Phần | Trạng thái | Ghi chú |
|---|---|---|
| Business Control Plane (`control/`) | **Chạy** | Đề xuất/xác nhận, lệnh, idempotency HTTP, giới hạn tần suất |
| Agent Mode: `talent_coach`, `manager_assistant` | **Chạy** | 5 tool; prompt `agent.talent@1`, `agent.manager@2` |
| AI Task Mode: `daily_topics` | **Chạy** | Một khung buổi sáng (06:00–08:00 JST); khung sáng/trưa/tối theo chỉ thị là việc sau |
| Coach Configuration (profile, chỉ thị, xuất OneDrive) | **Chạy** | Category bị chặn (`FEATURE_NOT_READY`) tới khi có bảng category |
| MCP cho Manager | **Chạy với token dev** | OAuth thật với ChatGPT chờ VT-08 |
| SSE | BE **chạy**; FE vẫn polling | |
| Sandbox thử chỉ thị | **Chạy** | |
| DB | **Đã áp Supabase dev** | 14/14 migration, `schema.prisma` khớp DB; bảng demo cũ đã bỏ |
| Kiểm tự động | **Đạt** | `test:local`: tích hợp 40/40, owner 45/0 lỗi, unit 24, typecheck; eval 3 bộ 100%; smoke đầu cuối đạt |
| Cờ bật | `ENABLE_AGENT_CORE`, `ENABLE_AGENT_WRITES`, `ENABLE_MANAGER_MCP` (mặc định tắt); chỉ mount cùng Auth demo | Auth production theo `supabase-db-auth-spec` |

**Chưa làm (lõi):** OAuth MCP (VT-08); đo tải buổi sáng thật (VT-09); BullMQ limiter; FE dùng SSE; lint chặn import sai hướng và eval trong CI; review bảo mật, backup/restore. Chi tiết: [Kế hoạch §3](IMPLEMENTATION_PLAN.md#3-việc-còn-lại).

**Chờ đặc tả module (P5):** caption, kiểm từ cấm, giờ đăng, phân tích media, tự đăng bài, thử thách, kịch bản video, metrics ([Kế hoạch §3.2](IMPLEMENTATION_PLAN.md#32-theo-module-nghiệp-vụ-p5-24-ngày-mỗi-module)).

## Việc cần người quyết

- **Khách (quản trị dữ liệu):** Q-AI-01…03 ở [Bảo mật §9](SECURITY_DESIGN.md#9-dữ-liệu-ở-nhà-cung-cấp-và-câu-hỏi-cho-khách).
- **Nghiệp vụ còn mở:** giữ nguyên số QA/確認 (mục cần xác nhận) ở [Kiến trúc §2.4](AI_CORE_ARCHITECTURE.md#24-yêu-cầu-đã-chốt-và-chưa-chốt-ảnh-hưởng-ai-core); không tự đặt luật.
- **Tech Lead:** ADR-14 (MCP) còn chờ POC OAuth (VT-08); các ADR khác đã chấp nhận.

## Căn cứ

Tài liệu chính thức đọc ngày 26/11/2026: [OpenAI Agents SDK JS](https://openai.github.io/openai-agents-js/) và [OpenAI API docs](https://developers.openai.com/api/docs/). Điểm chưa xác minh ghi là VT-xx; không thiết kế dựa trên hành vi SDK chưa được tài liệu hóa.
