# AI Core — Runbook kiểm thử

**Bản 1.1 · 26/11/2026.** Thuộc bộ [AI Core](README.md). Gom mọi việc kiểm thử của AI Core vào một chỗ:
- phần **chạy được ngay** bằng một lệnh;
- phần **chờ đầu vào** (ghi rõ cần gì, ai cung cấp, các bước chạy, tiêu chí đạt).

Mã ca `AIC-Txx` theo [Kế hoạch §4](IMPLEMENTATION_PLAN.md#4-ánh-xạ-ca-kiểm-hồi-quy) và [module nghiệp vụ §5](BUSINESS_MODULES.md#5-ca-kiểm-toàn-hệ-thống); mã `VT-xx` theo [sổ rủi ro §3](TECHNICAL_RISK_REGISTER.md#3-việc-kiểm-chứng-kỹ-thuật).

## 1. Tổng hợp

| # | Việc kiểm | Trạng thái | Cần bổ sung | Ai cung cấp |
|---|---|---|---|---|
| 1 | Kiểm tự động: migration, tích hợp, unit, typecheck (§2) | **Sẵn sàng**, đạt 26/11 | — | — |
| 2 | Eval AI và smoke đầu cuối với OpenAI thật (§2) | **Sẵn sàng**, đạt 26/11 | Khóa OpenAI có hạn mức (đã có trong `.env`) | — |
| 3 | VT-08: MCP với ChatGPT thật qua OAuth (§3.1) | Chờ đầu vào | URL HTTPS công khai, tài khoản ChatGPT thêm được connector, authorization server | Đội + chủ tài khoản ChatGPT |
| 4 | Áp migration lên Supabase dev (§3.2) | **Xong 26/11** (`ai_core` + `drop_coach_demo`; 14/14, `db:diff` rỗng) | Lần sau: đồng ý áp, login owner | Tech Lead |
| 5 | Dọn bảng demo `20261123*` trên Supabase dev | **Xong 26/11** ([Lịch sử §5](LICH_SU_TRIEN_KHAI.md#5-lịch-sử-migration)) | — | — |
| 6 | Xuất `Profile.md` lên OneDrive thật (§3.4) | Chờ đầu vào | OneDrive đã kết nối; Talent có folder | Đội |
| 7 | Kiểm tay giao diện `/pwa/coach`, `/pwa/confirm` (§3.5) | Chờ đầu vào | Login demo Talent và Manager (Manager có TOTP) | Đội |
| 8 | P6: giới hạn tần suất và SSE (đã có, có test); VT-09 (script sẵn, đã chạy chế độ giả); backup/restore AIC-T16, review bảo mật (§3.6) | Một phần sẵn sàng | Staging, hạn mức OpenAI cho lần đo thật | Đội |
| 9 | Kiểm phụ thuộc quyết định của khách (§3.7) | Chờ khách | Trả lời Q-AI-01…03 | Khách (qua đầu mối) |

## 2. Kiểm tự động (chạy được ngay)

Mọi lệnh chạy trong `apps/api`. Script tự dựng Postgres tạm dưới `/tmp`, tạo stub `auth.users`, các role Supabase và login runtime `talent_api`; không đụng Supabase, chạy xong tự xóa (`KEEP_DB=1` để giữ lại).

| Lệnh | Nội dung | Kết quả gần nhất (26/11) |
|---|---|---|
| `npm run test:local` | Replay toàn bộ migration + kiểm `schema.prisma` khớp DB; 5 bộ tích hợp bằng role runtime (Control Plane, runtime agent, `daily_topics`, MCP + sandbox, giới hạn tần suất + SSE); toàn bộ `npm test` theo quy ước owner; unit; typecheck | Khớp schema; 40/40; 45 đạt 0 lỗi; 24 đạt; sạch |
| `npm run test:local -- --evals` | Thêm 3 bộ eval AI (dữ liệu giả, model thật, ngưỡng 90%) | `agent.talent` 100%, `agent.manager` 100%, `daily_topics` 100% |
| `npm run test:local -- --smoke` | Thêm smoke đầu cuối: worker thật + Redis + OpenAI (OneDrive tắt, tracing tắt) | Đạt 4 bước |
| `cd apps/web && npm run lint && npm test && npm run build` | FE | Sạch; 11/11; build đạt |

Biến môi trường của script: `PG_BIN` (mặc định `/usr/lib/postgresql/16/bin`), `PG_PORT` (55433), `REDIS_PORT` (56380), `TEST_ROOT`. Eval ghi kết quả vào `apps/api/evals/results/` (không commit).

Ca đã có test tự động: AIC-T01–T13, T15, T17, T18, T20 (export bằng exporter giả), T36–T41; T14 phần resource server (chưa có OAuth thật).

Đo tải buổi sáng (VT-09), chế độ giả, không tốn tiền: `TEST_DATABASE_URL=… TEST_OWNER_DATABASE_URL=… npm run load:morning -- --talents 300 --concurrency 4 --fake-latency-ms 1500`. Lần chạy 26/11: 300/300 task xong trong 110 giây, p50 1,5 giây, p95 2,2 giây, dùng 2% khung 06:00–08:00.

## 3. Việc chờ đầu vào

### 3.1. VT-08 — MCP với ChatGPT qua OAuth (chốt ADR-14)

**Cần bổ sung:**
1. Một URL HTTPS công khai trỏ tới API (staging, hoặc tunnel tạm cho POC), có `/mcp` và `/.well-known/oauth-protected-resource`.
2. Một tài khoản ChatGPT được phép thêm connector MCP tùy chỉnh.
3. Một authorization server OAuth 2.1 (authorization code + PKCE) phát access token có `aud` bằng URL `/mcp`. Loại server cụ thể được chọn trong POC; phiên Supabase của app không dùng làm grant MCP.
4. Một login Manager có TOTP để mở trang xác nhận.

**Làm trong code khi có đầu vào:**
- Viết `TokenVerifier` thật trong `src/mcp/auth.ts`: kiểm issuer, chữ ký (JWKS), audience, hạn. Truyền verifier đó vào `createApp(deps, verifier)`.
- Quyết cách tạo dòng `mcp_grants` khi Manager cấp quyền.
- Đặt `ENABLE_MANAGER_MCP=true`, `MCP_RESOURCE_URL`, `MCP_AUTH_ISSUER`, `PUBLIC_WEB_URL`.

**Kịch bản kiểm (AIC-T14, AIC-T40):**
1. Kết nối ChatGPT. Không có token hoặc token sai thì phải nhận 401 kèm `WWW-Authenticate`.
2. Gọi "Tìm Talent X" → `talent_search`.
3. Gọi "Đổi giọng văn của X" → `profile_prepare` trả `confirmUrl`.
4. Manager mở `confirmUrl` và bấm lưu bằng phiên AAL2. AAL1 phải bị chặn.
5. Gọi "Đã lưu chưa?" → `proposal_status` trả `consumed` kèm receipt.
6. Thu hồi grant; lời gọi tiếp theo phải bị từ chối.
7. Refresh token: sau khi token hết hạn, gọi tiếp vẫn chạy.

**Kiểm tạm trước POC (chạy được ngay, local):**
- Đặt `ENABLE_MANAGER_MCP=true` và `MCP_DEV_TOKENS="devtoken=<login user id của Manager>:inspector"`.
- Thêm một dòng `mcp_grants` cho cặp Manager và client đó.
- Kết nối MCP Inspector tới `http://localhost:<port>/mcp` với header `Authorization: Bearer devtoken`.

### 3.2. Áp migration lên Supabase

Đã áp `20261126000200_ai_core` và `20261126000300_drop_coach_demo` lên Supabase dev ngày 26/11/2026. Các bước dưới đây dùng cho mỗi migration mới và cho staging, production.

**Cần:** Tech Lead đồng ý; chạy bằng login owner (`DIRECT_URL`). Migration bỏ bảng/cột có dữ liệu cần đồng ý riêng, kèm số dòng đã đếm.

**Các bước:**
1. Trong `apps/api`, chạy `npm run db:status`: chỉ còn đúng các migration định áp.
2. `npm run test:local` đạt trên chính commit sẽ áp.
3. Chạy `npm run db:migrate` (tức `prisma migrate deploy`). Không dùng `prisma migrate dev`, `db push` hay `migrate reset`.
4. Kiểm sau khi áp:
   - `npm run db:status` sạch;
   - `npm run db:diff -- --from-config-datasource --to-schema prisma/schema.prisma --exit-code` trả "No difference" (pooler đôi khi từ chối kết nối: chạy lại);
   - API khởi động được bằng login `talent_api` (lỗi `DATABASE_RUNTIME_ROLE_REQUIRED` nếu dùng nhầm owner).

**Hoàn tác:** mỗi migration chạy trong transaction, lỗi giữa chừng thì tự rollback. Đã áp xong mà muốn bỏ thì viết migration tiến; không sửa migration đã áp. Dữ liệu đã bỏ bằng migration contract không lấy lại được.

### 3.3. Dọn bảng demo `20261123*`

Đã làm 26/11/2026 bằng `20261126000300_drop_coach_demo` ([Lịch sử §5](LICH_SU_TRIEN_KHAI.md#5-lịch-sử-migration)). Mục giữ số để các liên kết cũ không lệch.

### 3.4. Xuất `Profile.md` lên OneDrive thật (AIC-T20 trên tài khoản thật)

**Cần:**
- OneDrive cấu hình theo [onedrive-agent-spec](../onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md) (tài khoản chính đã kết nối);
- một Talent có `onedrive_folder_id` (`npm run ai:talent -- --link-onedrive`);
- worker chạy với OneDrive bật.

**Các bước:**
1. Manager tạo đề xuất sửa profile và xác nhận.
2. Trong vòng khoảng 3 giây, `Talents/<folder>/Profile.md` phải có nội dung mới với dấu version.
3. `talent_profile_exports.version` phải bằng version mới.
4. Ngắt mạng hoặc gỡ quyền OneDrive rồi lưu tiếp: DB vẫn lưu; event chuyển sang trạng thái retry; nối lại thì file được cập nhật đúng một lần.

### 3.5. Kiểm tay giao diện (demo Auth)

**Cần:** login demo cho Talent và Manager (Manager đã bật TOTP), tạo bằng `npm run ai:talent`; API chạy với `ENABLE_AUTH_DEMO=true`, `ENABLE_AGENT_CORE=true`, `ENABLE_AGENT_WRITES=true`; worker và Redis đang chạy.

**Danh sách kiểm:**
- **`/pwa/coach` với Talent:** hỏi về profile và nhận được câu trả lời; đòi sửa chỉ thị thì bị từ chối.
- **`/pwa/coach` với Manager:** nhờ sửa profile thì thấy thẻ đề xuất; bấm "Save" thì thấy receipt; hỏi "đã lưu chưa" thì AI trả lời đúng.
- **Gửi lại cùng một tin sau khi mất mạng:** không bị trùng.
- **Hủy khi đang chạy:** run chuyển sang trạng thái hủy.
- **Reload giữa chừng:** trạng thái được khôi phục.
- **`/pwa/confirm/<id>` mở từ link:** AAL1 bị yêu cầu TOTP; AAL2 lưu được; đề xuất hết hạn hiện trạng thái hết hạn.

### 3.6. P6 — vận hành

| Việc | Trạng thái code | Cần | Tiêu chí đạt |
|---|---|---|---|
| VT-09 tải buổi sáng | **Script sẵn** `npm run load:morning`; chế độ giả đã đạt (§2) | Staging; hạn mức OpenAI đủ cho 300 Talent; chạy không có `--fake-latency-ms` và với `--allow-remote` | `pass: true`: mọi task xong và tổng thời gian ≤ 70% khung 2 giờ; ghi p50/p95 |
| Giới hạn tần suất người dùng | **Đã có** (`AGENT_RATE_PER_MINUTE`=10, `AGENT_RATE_PER_DAY`=200), có test | — | Đạt: tin thứ 3 với giới hạn 2/phút → 429; gửi lại cùng key không tính |
| SSE `…/runs/{id}/stream` | **Đã có ở BE** (Redis pub/sub, cần `REDIS_URL` ở API), có test; FE vẫn dùng polling | Reverse proxy không đệm `text/event-stream`; FE đọc stream bằng `fetch` (vì `EventSource` không gửi được header `Authorization`) | Đạt ở test: delta từ bus, `end` từ DB, người khác 404, không có Redis 503 |
| Backup/restore (AIC-T16) | — | Staging Supabase, quyền restore | Restore xong, proposal/run/receipt còn nguyên; không chạy lại tác động đã đối soát |
| VT-10 prompt caching | Có số liệu `cached_input_tokens` | Một tuần chạy staging | > 30% input chat là cached (smoke 26/11: ~90% từ request thứ ba) |
| Review bảo mật | — | Người review khác tác giả | Theo [SECURITY_DESIGN](SECURITY_DESIGN.md) |

### 3.7. Phụ thuộc quyết định của khách

| Mã | Ảnh hưởng kiểm thử | Mặc định đang kiểm |
|---|---|---|
| Q-AI-01 (ZDR) | Nếu bật ZDR thì kiểm lại với `OPENAI_AGENTS_DISABLE_TRACING=1` và `store:false` (đã là mặc định) | `store:false`, không ZDR |
| Q-AI-02 (trace) | Kiểm trace mẫu không chứa nội dung hội thoại | Tracing bật, `traceIncludeSensitiveData=false` |
| Q-AI-03 (thời hạn lưu) | Kiểm job xóa theo thời hạn khi có quyết định | Chưa tự xóa |
