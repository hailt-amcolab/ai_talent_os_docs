# Acceptance criteria và ca kiểm thử MCP

Bản 1.1 · review theo kiến trúc hiện hành · **Toàn bộ ca dưới đây NOT RUN.** Đây là kế hoạch cho implementation; không phải kết quả chạy thật.

## 1. Điều kiện và dữ liệu kiểm thử

Dùng staging HTTPS, tài khoản ChatGPT/workspace mục tiêu và Authorization Server đã ghi phiên bản. Tạo Manager A/B có grant chung; Talent U/V cùng thuộc phạm vi được cấp theo QA No.88. Thêm grant test giới hạn rõ chỉ U để kiểm resource scope, không coi Manager B phụ trách V là lý do chặn A. Có Talent trùng tên, tài khoản Talent, Manager khóa và grant revoke. OneDrive test có tệp UTF-8 với section không được phép sửa. Không dùng dữ liệu cá nhân production.

Mỗi ca lưu build SHA, phiên bản SDK/provider, cấu hình policy không có secret, requestId/operationId, thời điểm, kết quả thực tế và evidence đã che dữ liệu. Log phải chứng minh số request ghi Graph và before/after eTag; không thu bearer token. Unit/integration/ChatGPT end-to-end tách riêng; Inspector pass không thay ChatGPT pass.

## 2. AC bắt buộc

| AC | Điều kiện đạt | Ca liên quan |
|---|---|---|
| AC01 | Kết nối ChatGPT qua HTTPS/OAuth thực tế, chỉ Manager được phép; resource-bound token | MCP01–MCP09 |
| AC02 | Tìm/đọc đúng role/grant; Manager grant chung được đọc U/V, grant hẹp không vượt scope hoặc lộ trường nhạy cảm | MCP10–MCP14 |
| AC03 | Preview bất biến, diff/đích rõ, không thay tệp; template/validation fail closed | MCP15–MCP20 |
| AC04 | Ghi đòi xác nhận người thật, MFA và binding; model không thể tự phê duyệt | MCP21–MCP27 |
| AC05 | Không mất cập nhật; retry/race không tạo lần ghi mới; unknown có xử lý | MCP28–MCP35 |
| AC06 | Audit, bảo mật, lifecycle, rollback và UI đúng kiến trúc | MCP36–MCP49 |

Mọi ca CRITICAL/HIGH phải pass và MCP-G01–G06 trong hướng dẫn đã có evidence trước khi bật ghi. Không hạ severity hoặc đánh dấu N/A chỉ vì chưa triển khai guard. Phần chưa được khách chốt vẫn là blocker nghiệp vụ dù test kỹ thuật pass.

## 3. Danh mục ca

| ID | Mức / tầng | Đầu vào / thao tác | Kết quả cần đạt |
|---|---|---|---|
| MCP01 | HIGH / E2E | ChatGPT mới kết nối `/mcp`, chưa đăng nhập | 401 discovery, OAuth PKCE thành công, initialize/list/call thành công; lưu phiên bản/client registration thực tế |
| MCP02 | CRITICAL / integration | Token giả chữ ký, sai issuer/audience, ID token | Từ chối trước truy vấn profile; default `aud=authenticated` không vượt resource check |
| MCP03 | HIGH / integration | Expired/nbf tương lai/JWKS rotation | Từ chối token sai; token đúng khóa mới được chấp nhận sau refresh cache có giới hạn |
| MCP04 | CRITICAL / E2E | OAuth redirect bị đổi/PKCE verifier sai/state sai | AS/client từ chối, không tạo grant ứng dụng |
| MCP05 | CRITICAL / integration | Token Talent, AIcore, Manager bị khóa | Không truy cập bất kỳ tool dữ liệu trong bộ này |
| MCP06 | CRITICAL / integration | Revoke grant/đổi quyền khi access token chưa hết hạn | Request tiếp theo bị chặn; không đợi JWT hết hạn |
| MCP07 | HIGH / E2E | Refresh token, logout/idle timeout, thử lại | Đúng policy phiên đã chốt; refresh không tự khôi phục grant revoke hoặc assurance thiếu |
| MCP08 | HIGH / protocol | POST malformed/version không hỗ trợ, notification, GET không SSE | SDK trả đúng protocol/HTTP; không bọc envelope REST; GET405, notification202 nếu hợp lệ |
| MCP09 | HIGH / integration | Origin lạ/không Origin/cấu hình discovery sai | Origin lạ403; không Origin vẫn bắt token; sai discovery được phát hiện trước release |
| MCP10 | CRITICAL / integration | Manager A/B grant chung đọc U/V; grant hẹp chỉ U thử đọc V; Talent U thử đọc V | Manager grant chung được phép, không bị assign chặn; grant hẹp/Talent vượt quyền bị chặn và không lộ tồn tại/diff |
| MCP11 | HIGH / E2E | Hai Talent cùng displayName | ChatGPT hỏi lại bằng mã an toàn, không tự chọn đầu tiên |
| MCP12 | HIGH / integration | Cursor của A đưa sang B; cursor sửa/tái dùng với query khác | Từ chối; không truy vấn ngoài phạm vi |
| MCP13 | HIGH / integration | Profile có PII ngoài allowlist/token/url Graph | Response chỉ các trường được phép; không rò ở content/structuredContent/error/log |
| MCP14 | HIGH / E2E | Nội dung file yêu cầu bỏ kiểm tra quyền/gọi tool khác | Nội dung được coi là dữ liệu; không đổi policy và không ghi trái phép |
| MCP15 | HIGH / integration | Preview một patch hợp lệ | Diff/đích/hạn đúng, proposal lưu bất biến; số lần ghi Graph=0 |
| MCP16 | HIGH / unit | Field lạ/null/chuỗi rỗng/4001 ký tự/path/actorId | Schema từ chối trước adapter; không tự bỏ trường hoặc cắt nội dung |
| MCP17 | HIGH / integration | Template chưa chốt/không parse được | `PROFILE_TEMPLATE_UNAVAILABLE`, không tái tạo file |
| MCP18 | HIGH / integration | Thiếu folder/tệp hoặc profile vượt giới hạn | Fail rõ ràng, không tự tạo hoặc đọc không giới hạn |
| MCP19 | HIGH / unit | Unicode tương đương, CRLF, section ngoài allowlist | Hash/diff dùng cùng canonicalization; round-trip bảo toàn section khác |
| MCP20 | HIGH / integration | eTag đổi giữa read và preview | Conflict, không tạo proposal dựa trên dữ liệu lỗi thời |
| MCP21 | CRITICAL / integration | Commit không approval, chỉ có proposalId hoặc `confirmed:true` | Không ghi; unknown input bị schema từ chối, thiếu proof trả `APPROVAL_REQUIRED` |
| MCP22 | CRITICAL / E2E | Mở link approval bằng GET/prefetch/offline retry | Không tạo approval; không cache diff nhạy cảm |
| MCP23 | CRITICAL / integration | B approve proposal A; client/grant/resource/hash bị đổi | Từ chối binding, không tạo approval |
| MCP24 | CRITICAL / E2E | Manager chưa TOTP/phiên hết hạn bấm approve | Yêu cầu phiên đủ assurance theo policy; không tin claim từ request body |
| MCP25 | CRITICAL / integration | CSRF/cookie submit từ origin lạ | Từ chối; phiên Bearer cũng không được lấy actor từ body |
| MCP26 | HIGH / integration | Proposal hết hạn hoặc đổi template/policy/quyền sau approve | Không nhận commit mới, yêu cầu preview và xác nhận lại |
| MCP27 | HIGH / E2E | Manager xem diff thật, approve rồi ChatGPT commit | Chỉ patch đúng đích được nhận; consent kết nối trước đó không thay approval |
| MCP28 | CRITICAL / integration | 20 commit đồng thời cùng proposal ở nhiều process | Một operation và một lần consume; các retry trả operation được phép truy cập |
| MCP29 | CRITICAL / integration | Hai proposal cùng base eTag, sửa cùng Talent | Không ghi đè mất cập nhật; proposal sau conflict hoặc bị serialize tới conflict |
| MCP30 | CRITICAL / integration | UI hoặc một MCP proposal khác đã ghi file sau approve; Graph412 | Conflict, tệp mới không bị ghi đè; không tự rebase |
| MCP31 | CRITICAL / fault injection | Graph thành công rồi crash trước update DB | Không báo thất bại chắc chắn; reconcile chứng minh hoặc giữ `outcome_unknown`; không blind retry |
| MCP32 | CRITICAL / fault injection | Graph timeout không biết đã nhận bytes chưa | Operation bền vững, không viết lại tự động khi thiếu bằng chứng |
| MCP33 | HIGH / integration | Worker restart/lease hết hạn/worker cũ quay lại | Fencing + CAS ngăn xử lý cạnh tranh không kiểm soát; operation treo có đường reconcile |
| MCP34 | HIGH / integration | DB lỗi lúc accept hoặc audit/outbox | Rollback nhận operation/consume cùng transaction; chưa gọi Graph |
| MCP35 | HIGH / integration | Revoke actor/grant sau accepted, trước Graph | Executor kiểm lại và dừng trước side effect; trạng thái/audit đúng |
| MCP36 | HIGH / integration |429/503, spam tools, body quá lớn | Retry bounded/rate limit/size limit; không lộ stacktrace, không vòng lặp vô hạn |
| MCP37 | HIGH / security | Kiểm FE bundle, log, MCP result, repo | Không Microsoft secret/service_role/access token; không log full diff mặc định |
| MCP38 | HIGH / E2E | Proxy HTTPS, PM2 nhiều worker, refresh registry ChatGPT | Header/auth không mất; state dùng DB; hội thoại mới thấy registry đúng |
| MCP39 | HIGH / integration | Cleanup chậm + proposal hết hạn | Vẫn từ chối dù record còn; retention/audit đúng policy |
| MCP40 | HIGH / integration | Migration replay/rollback code trên schema mới | Additive an toàn, runtime least privilege, không đổi auth schema; status cũ còn đọc được |
| MCP41 | HIGH / E2E | Tắt write flag lúc có accepted/unknown operation | Chặn commit mới; vẫn tra/reconcile operation cũ; không tự restore nội dung |
| MCP42 | HIGH / review | Đối chiếu imports/routes/UI messages | Ports inject, không cross-module imports/Next API; Nhật ngữ trong messages.ts |
| MCP43 | HIGH / E2E | ChatGPT workspace thật: search→preview→approve→commit→read | Hồ sơ đúng, không có tác động ngoài phạm vi; báo kết quả theo operation thực tế |
| MCP44 | CRITICAL / integration | Commit được nhận rồi Redis unavailable; dispatcher crash sau enqueue | Approval/operation/outbox cùng transaction; phát lại an toàn, không mất việc hoặc thêm lần ghi Graph |
| MCP45 | CRITICAL / fault injection | Redis mất queue hoặc cùng event được giao nhiều lần | Tái dựng từ operation/outbox theo policy, lease/CAS chặn ghi trùng; jobId không phải cơ chế duy nhất |
| MCP46 | HIGH / protocol | MCP request không Origin, body quá lớn, exception SDK; REST lỗi riêng | MCP có policy/body limit/no-store riêng; server-to-server hợp lệ không bị REST requireOrigin chặn; JSON-RPC không bị bọc REST |
| MCP47 | HIGH / integration | Demo flag tắt; token demo/Talent gọi MCP production | Mount MCP theo feature flag riêng và danh tính production, không mượn ENABLE_AUTH_DEMO hoặc auto-confirm |
| MCP48 | HIGH / E2E | initialize/list/challenge theo auth bootstrap đã chốt; registry metadata trước login | Đúng policy POC; nếu public metadata thì không có dữ liệu cá nhân/grant; tool dữ liệu luôn kiểm OAuth, scope và authority |
| MCP49 | HIGH / integration | UI và MCP cùng sửa; cache còn hồ sơ cũ; field giọng văn chưa map | Chung service/version và invalidation; field chưa chốt bị từ chối, không tạo hai cơ chế ghi hồ sơ |

## 4. Chạy khi implementation tồn tại

API: `npm run typecheck`, `npm test`, test PostgreSQL qua `TEST_DATABASE_URL` theo quy ước repo; thêm fault injection Graph và test nhiều process cho race. Web khi có trang approval: `npm run lint`, `npm test`, `npm run build`; kiểm thử HTTPS UI và không cache PII qua service worker. Không chạy các lệnh này rồi báo MCP pass khi chưa có MCP code/tests.

Dùng Inspector cho protocol và ChatGPT thật cho OAuth/human flow. Kết quả cần bảng ID→PASS/FAIL/BLOCKED, evidence, defect; ghi quyết định AS/UX/template vào mục hướng dẫn hoặc hồ sơ quyết định hiện có; không tạo tài liệu trùng. Mẫu service trong thư mục examples chỉ có thể kiểm type độc lập, không thay các adapter/integration/E2E tests trên.
