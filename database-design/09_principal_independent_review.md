# Independent review toàn bộ Database Design

> Sau chỉ đạo triển khai theo giai đoạn, remediation và phạm vi được mở nằm ở [10](10_confirmed_scope_and_remediation.md); bằng chứng kiểm tra sau sửa ở [11](11_foundation_validation.md). Báo cáo này giữ nguyên trạng thái phát hiện trước sửa.

Ngày 17/11/2026 · Vai trò: Principal Database Architect · Kết luận: **REJECTED**.

Đối tượng đánh giá là thiết kế hiện tại, gồm cả những gì đã được đưa vào migration. Kết luận này thay thế nhận định sẵn sàng implementation trong `07` và `08` cho mục đích review lần này. Không cần bỏ toàn bộ 25 bảng, nhưng phải thiết kế lại cơ chế toàn vẹn danh tính, bảo vệ dữ liệu theo chủ sở hữu, điều phối tác vụ bên ngoài, lịch sử đăng/duyệt và dữ liệu thu phí trước khi phê duyệt tổng thể.

## 1. Phạm vi, căn cứ và giới hạn

Đã đọc trực tiếp văn bản trong `AI育成OS_概要要件定義書_v2.docx` và các worksheet trong `AI-Talent-OS_Q&A表.xlsx`, đối chiếu với `SCD/` EP01–EP10, `Phan_tich/07_Du_lieu_va_ERD.md`, stack, bộ Database/Auth, toàn bộ `database-design/01`–`08`, Prisma schema, cả ba migration và cấu hình database/runtime/deployment. Nội dung trong bảng DOCX được trích cùng văn bản; hình nhúng không được coi là đã kiểm chứng trực quan. Danh sách trạng thái trong hình 5-1 còn phải xác nhận như F01.

Nguồn có thứ tự thẩm quyền khác nhau: yêu cầu khách, Q&A, diễn giải SCD, quyết định kỹ thuật và implementation. Một cột có mã requirement không tự chứng minh rằng requirement đã được khách xác nhận. SQL trong bộ Auth ghi rõ REFERENCE ONLY, không phải migration production và chưa được nhập vào schema hiện tại.

Review kết hợp phân tích tĩnh và kiểm chứng trên PostgreSQL tạm 16.15 trong `/tmp`, có hai role client và bảng `auth.users(id)` giả lập, không phải Supabase thật. Đã replay cả ba migration, tạo bảng `_prisma_migrations` giả lập trước migration khóa quyền, rồi kiểm tra trong transaction và ROLLBACK dữ liệu fixture. Không kết nối, đọc dữ liệu hay thay đổi Supabase của dự án. Không khẳng định đã đo query plan, tải thực tế, kiểm backup/restore hay xác minh quyền live. Các lịch thực thi đồng thời bên dưới là phản ví dụ cần kiểm chứng bằng integration test, không phải sự cố production đã quan sát. Khác biệt PostgreSQL 16 với local-db 17 và Supabase thật cần kiểm lại trước rollout.

| Kiểm chứng thực thi | Kết quả quan sát |
|---|---|
| Ghi manager với auth_user_id không tồn tại | INSERT thành công, đếm được 1 orphan — F03 |
| Ghi đơn approved với decided_at có giá trị, người quyết định NULL | INSERT thành công — F11 |
| Ghi post scheduled có timestamps nhưng không có post_media | INSERT thành công — F08 |
| Post scheduled có cancel_reason nhưng cancelled_at NULL | INSERT thành công — F11 |
| Gắn post của A với media của B | INSERT thành công, JOIN xác nhận khác talent_id — F04 |

Các kiểm chứng này chứng minh lỗ hổng của schema; không khẳng định một API hiện tại cho phép người dùng khai thác, vì module nghiệp vụ chưa được triển khai. Script tái hiện tạm ở `/tmp/db-independent-review/reproduce.sql`; các bước, đối tượng và giá trị thử được mô tả trong từng finding để có thể xây test hồi quy chính thức khi sửa.

Cách dẫn chứng: `M0:Lx` là dòng trong `apps/api/prisma/migrations/20261117000000_init/migration.sql`; `M2:Lx` là dòng trong `apps/api/prisma/migrations/20261117000200_auth_ref_by_trigger/migration.sql`. Các tham chiếu tài liệu dùng tên file và mục để kiểm lại trong repository.

Mức độ: CRITICAL = bằng chứng trực tiếp về nguy cơ thảm họa đang hiện hữu; HIGH = lỗ hổng thiết kế chặn phê duyệt; MEDIUM = cần giải quyết trước khi đưa chức năng liên quan vào production; LOW = cải tiến theo bằng chứng. Có **10 HIGH, 7 MEDIUM**. Không gán CRITICAL khi chưa chứng minh được điều kiện khai thác/live; điều đó không làm các HIGH đủ an toàn để chấp thuận.

## 2. Phát hiện HIGH

### F01 — Chưa có baseline requirement được xác nhận cho các business rule lõi

- **Bằng chứng:** DOCX §1-2 và §1-5 mô tả tài liệu 0.1 gồm yêu cầu lẫn giả định, sẽ hoàn thiện sau confirmation sheet. XLSX Q&A No.49, 51, 53, 58–64 còn Open; No.14 Close nhưng Comment yêu cầu kiểm lại mục tiêu tổng ba SNS. `01` §2 vẫn coi phần không gắn 確認 là CONFIRMED. `08` cuối file cho phép EP06 bắt đầu với quy tắc tạm.
- **Ảnh hưởng:** chưa xác định chắc kỳ thu phí, thời điểm tính phí, cách tổng hợp trạng thái bài, duyệt lại, hẹn lại và nối lại tài khoản. Đây là điều kiện xác định khóa, lịch sử và giao dịch, không chỉ là chi tiết UI. Không thể phê duyệt tổng thể theo yêu cầu review khi những điểm này còn mở.
- **Sửa:** lập baseline có nguồn, người quyết định, ngày xác nhận; tách CONFIRMED khỏi ASSUMED/PROPOSED. Chốt Q&A liên quan, confirmation sheet, hình 5-1 và các lựa chọn xung đột; nếu bỏ phạm vi phải có quyết định rõ ràng.
- **Trade-off:** cần thời gian xác nhận; đổi lại tránh migration tái diễn vì xây theo giả định. Có thể nghiên cứu kỹ thuật độc lập, nhưng không coi đó là phê duyệt domain implementation.

### F02 — Thiếu dữ liệu phục vụ chính sách phiên, password completion và thu hồi quyền

- **Bằng chứng:** `AUTH_GUARD_ALGORITHM_VI.md` bước 2–6 yêu cầu session registry, security version, restricted session, MFA proof gắn session/factor/policy. `sql/0001_core_reference.sql` của bộ Auth có `app_users.must_change_password`, `security_version`, `auth_session_registry`; migration hiện tại chỉ có `managers.is_active`, `talents.status` và không có model phiên/proof tương ứng. `01:R01-08` đẩy phần này ra ngoài phạm vi nhưng bộ database được đánh giá là toàn bộ.
- **Ảnh hưởng:** chỉ JWT hợp lệ và cờ active không diễn đạt được toàn bộ guard đã chọn; không lưu được thời điểm xác thực gốc, idle, thu hồi phiên, bắt đổi mật khẩu hoặc proof MFA theo phương thức. Có nguy cơ các module triển khai những cách hiểu quyền khác nhau.
- **Sửa:** thống nhất mô hình Auth/domain trong một ADR; thiết kế dữ liệu tối thiểu cho guard thực sự áp dụng, vòng đời và quyền ghi. Chọn rõ dữ liệu nào Supabase quản lý, dữ liệu nào ứng dụng phải giữ; không sao chép toàn bộ schema tham khảo một cách máy móc. Thêm migration, mapping và test thu hồi quyền/first-password/recovery/MFA.
- **Trade-off:** thêm kiểm tra và trạng thái ứng dụng; tận dụng dữ liệu Supabase giảm trùng lặp nhưng cần chứng minh API, độ mới và semantics đáp ứng chính sách. Không cần thêm multi-tenant organizations nếu requirement không đòi.

### F03 — Trigger chặn xóa Auth không thay thế được foreign key

- **Bằng chứng:** M2:L5–29 bỏ hai FK, chỉ `BEFORE DELETE auth.users` kiểm `EXISTS`. `auth_user_id` ở `managers`/`talents` vẫn nhận UUID không tồn tại; UPDATE cũng không kiểm. `03` ERD và §4 vẫn mô tả FK/RESTRICT trong khi trạng thái thực tế khác.
- **Phản ví dụ:** T1 tạo Auth user, nhận id; T2 xóa user khi chưa có domain row; T1 ghi talent với id cũ và commit. Hoặc ghi trực tiếp UUID bất kỳ. Trigger trên bảng cha không thấy tham chiếu chưa commit. Không có khóa tham chiếu hai chiều để bảo vệ.
- **Ảnh hưởng:** bản ghi mồ côi danh tính, provisioning lỗi, mất khả năng đăng nhập hoặc nối nhầm khi phục hồi; quy trình kiểm orphan định kỳ chưa được thiết kế.
- **Sửa:** ưu tiên giữ FK thật và giải quyết workflow Prisma bằng cấu hình/schema/tooling được POC trên phiên bản đã pin. Nếu bắt buộc dùng trigger, cần kiểm INSERT/UPDATE ở bảng con, khóa hàng Auth tương thích với DELETE, kiểm đổi khóa cha, xử lý transaction và đối soát; chứng minh bằng test hai connection. Không coi một lần xóa bị chặn là chứng minh tương đương FK.
- **Trade-off:** FK làm tooling phức tạp hơn; mô phỏng FK bằng trigger tăng rủi ro, chi phí bảo trì và vẫn cần đặc tả đầy đủ. Không kết luận mọi phiên bản Prisma đều không hỗ trợ FK sang Auth chỉ từ lỗi P4002 đã ghi trong `08`.

### F04 — FK đơn cho phép liên kết chéo tài năng và sai platform

- **Bằng chứng:** M0:L288–346 `posts`, `post_media`; L258 `video_generation_inputs`; L226 `video_generations.result_media_asset_id`; L367 `post_deliveries`; L448 `manager_notifications`. Các FK chỉ xác nhận id tồn tại. `07:M-02` và `04:P-08` đã thừa nhận một phần nhưng xếp MEDIUM/đợi lọt lỗi.
- **Phản ví dụ:** bài của A gắn media của B; delivery của A dùng social account của B hoặc platform youtube nhưng account instagram; kết quả video của A trỏ media B; notification có talent A và post/message B. `theme_suggestion_id` và `revised_from_post_id` cũng có thể trỏ khác tài năng.
- **Ảnh hưởng:** rò rỉ tư liệu/hội thoại qua JOIN hoặc publish nhầm tài khoản. Vì BE bypass RLS, sai liên kết không được RLS hiện tại cứu. Đây là invariant bảo mật, không nên chờ lỗi thật mới bảo vệ.
- **Sửa:** FK kép gồm `talent_id` trên các quan hệ sở hữu, và gồm platform ở account/delivery; bổ sung candidate key ở bảng cha. Với notification nhiều loại subject, định nghĩa tổ hợp hợp lệ và quan hệ chủ sở hữu; dùng constraint trigger khi FK không diễn đạt gọn. Chủ sở hữu của object đã dùng phải bất biến hoặc thay đổi có giao thức khóa. Thêm kiểm kind/source của media đầu vào/kết quả.
- **Trade-off:** lặp `talent_id` có kiểm soát, thêm unique index và dung lượng; đổi lại DB tự bảo vệ mọi đường ghi. Có thể dùng trigger ít cột hơn nhưng khó review, khóa và debug hơn.

### F05 — Thiếu hợp đồng lưu bền vững giữa domain transaction và dịch vụ ngoài

- **Bằng chứng:** `02` §4 loại queue khỏi thực thể nghiệp vụ, chỉ dự kiến pg-boss; `07` §3 nói saga/outbox nhưng migration không có outbox/operation ledger. Bộ Auth reference có `outbox_events` với aggregate generation và state `unknown`; schema thực tế không có. Các mã provider hiện chỉ có sau khi nhận response.
- **Phản ví dụ:** commit duyệt đơn hoặc notification rồi process chết trước enqueue/email/push; provider nhận video/lịch đăng nhưng response timeout, DB chưa có job ref. Gọi lại có thể tạo hai việc và hai khoản chi; không gọi lại có thể mất tác vụ.
- **Ảnh hưởng:** trạng thái DB và Auth/OneDrive/fal.ai/Upload-Post lệch nhau; notification tồn tại nhưng không gửi push; task quan trọng mất sau crash. UNIQUE notification/idempotency key chỉ chặn bản ghi local, không chứng minh side effect bên ngoài duy nhất.
- **Sửa:** định nghĩa operation/outbox ghi cùng transaction domain, khóa idempotency theo chủ thể và payload hash, lease/attempt/backoff, trạng thái kết quả chưa biết, đối soát provider và compensation. Có thể dùng pg-boss nếu chứng minh enqueue thật sự cùng transaction/kết nối hoặc có dispatcher từ outbox; không bắt buộc hai queue song song.
- **Trade-off:** thêm worker và dữ liệu vận hành; cần dọn lịch sử và theo dõi task kẹt. Không hứa exactly-once qua hai hệ thống; dùng at-least-once cộng dedupe và reconciliation.

### F06 — Một dòng delivery không đủ cho hẹn lại và callback đến muộn

- **Bằng chứng:** M0:L367–395 có UNIQUE `(post_id, platform)`, một `provider_job_ref`, một trạng thái và một timestamp; không có attempt/generation hay inbox dedupe. `03` §5 cho `publish_failed → submitted`; DOCX §6-10 chức năng 8-5 cho hẹn lại thủ công, cấm tự đăng lại.
- **Phản ví dụ:** lần 1 lỗi; người dùng hẹn lần 2, ghi đè job ref. Callback lỗi trễ của lần 1 cập nhật dòng đang đại diện lần 2; hoặc callback trùng gây lặp notification. Provider request có thể dùng chung job ref cho nhiều platform nên cũng không thể tự thêm UNIQUE job ref toàn cục.
- **Ảnh hưởng:** trạng thái sai, mất lịch sử chẩn đoán, đếm ngày đăng sai, có thể hẹn/publish trùng. Các metric hiện gắn delivery cố định cũng không phân biệt các external post nếu có hơn một kết quả.
- **Sửa:** tách delivery target và delivery attempt bất biến, đánh số generation, lưu provider/job/platform/account và external post identity với phạm vi uniqueness đúng hợp đồng provider. Callback phải xác thực, dedupe và cập nhật đúng attempt; attempt cũ không ghi đè attempt hiện tại. Metric phải gắn đúng publication.
- **Trade-off:** thêm bảng và truy vấn tổng hợp; đổi lại lưu được bằng chứng lịch sử, phân biệt retry vận chuyển với quyết định đăng lại nghiệp vụ.

### F07 — Kiểm lại cờ dừng trước HTTP vẫn có cửa sổ race; cancelled chưa đồng nghĩa đã hủy

- **Bằng chứng:** DOCX UC-08, §6-10 7-5 yêu cầu ngừng đặt lịch mới và hủy lịch đã có. `07` §3 đặt cờ trước rồi hủy theo lô, worker kiểm lại cờ ngay trước gửi; `03` §5 và `07` cho posts `cancelled` ngay khi yêu cầu hủy, cả khi delivery `cancel_failed`. Trong khi `08:IR-01` từng yêu cầu chỉ coi hủy xong khi mọi mạng đã hủy.
- **Phản ví dụ:** worker đọc cờ false; quản lý commit pause, batch chưa thấy job ref; worker gửi lịch thành công sau đó. Hoặc cancel batch xong nhưng HTTP đang bay mới trả job ref. Pause/resume nhanh có thể khiến batch cũ bỏ sót các bài thuộc lần pause trước.
- **Ảnh hưởng:** UI báo hủy nhưng lịch vẫn tồn tại, kể cả tài năng ended. Khóa `posts.version` không tự đồng bộ cờ global/talent và request bên ngoài.
- **Sửa:** định nghĩa điểm tuyến tính hóa command, posting epoch/generation và durable intent; worker dùng generation để ghi kết quả và enqueue cancel bù cho mọi submit đang bay thuộc epoch cũ. Theo dõi desired state riêng observed provider state, chưa xác nhận thì hiện pending/failed cancellation. Định nghĩa giới hạn sát giờ đã publish, đối soát và cảnh báo; không hứa thu hồi bài đã được provider đăng.
- **Trade-off:** nhất quán cuối cùng và UI phải phản ánh trạng thái chưa hoàn tất; giữ DB lock trong HTTP vừa kéo dài lock vừa không tạo transaction phân tán nên không phải giải pháp đầy đủ.

### F08 — Business invariants cốt lõi chưa có cơ chế enforce hoàn chỉnh

- **Bằng chứng:** M0:L106 billing account không kiểm `account_type`; L53 talents chỉ kiểm application tồn tại, không kiểm approved; L288 posts chỉ kiểm timestamps/status. Một scheduled post không cần dòng media, không cần quyết định duyệt phù hợp và vẫn có thể có `ng_detected_at`. `07` §3 chỉ khóa lạc quan posts, không đặc tả khóa media, policy tài năng hoặc thay đổi owner. `version` không có trigger tự tăng.
- **Ảnh hưởng:** có thể lên lịch bài không có tư liệu, chưa được duyệt hoặc đang bị chặn từ cấm; office có billing account; talent gắn đơn rejected/pending. Một transaction không tự ngăn transaction khác xóa post_media hay đổi policy sau lúc kiểm.
- **Sửa:** lập bảng invariant → cơ chế DB/service → transaction/lock order → test. Với workflow, dùng transition command có CAS và tăng version bắt buộc, mọi đường sửa post/media cùng khóa cha; kiểm application approved khi provision. Enforce account type/billing bằng trigger hoặc subtype/key phù hợp. Không bắt buộc nhét AI moderation vào DB; phải giữ revision và kết quả moderation/approval tương ứng nội dung thực sự được gửi.
- **Trade-off:** DB trigger bảo vệ mạnh nhưng tăng độ phức tạp; service enforce có thể hợp lý khi mọi writer bị giới hạn và có test giao dịch, song hiện mới là lời hứa. Không gán semantics cho `is_approval_required` trước khi chốt lựa chọn gửi duyệt của khách.

### F09 — Thiếu mô hình thu phí và bằng chứng lịch sử để tái tính tiền

- **Bằng chứng:** DOCX UC-10 và §5-4/§6-3 yêu cầu gộp phí tháng và video, phí tháng theo hợp đồng từng talent. `02` §5 BLOCKED invoices/payment results; M0:L106 chỉ có provider member ref; L226 video chỉ có boolean `is_counted`, không snapshot giá/kỳ/rule. `06` đánh giá thêm billing và giá là rủi ro thấp.
- **Ảnh hưởng:** chưa lưu được mức phí tháng theo talent, giá được áp dụng, kỳ thu, nghĩa vụ thanh toán, lần thu, lỗi thu và điều chỉnh sau khi chốt kỳ. Boolean thay đổi sau lỗi provider làm thay đổi số liệu tháng quá khứ. Dữ liệu sử dụng tạo trước khi có giá không tự backfill chính xác bằng một cột mới.
- **Sửa:** sau F01, thiết kế billing agreement có hiệu lực, price/version hoặc snapshot giá tại sự kiện, billing period, invoice/lines, payment attempts/provider events và adjustment/credit. Chốt late failure, month boundary, tiền tệ/làm tròn, chống thu hai lần và stop/resume. Không lưu PAN/CVV; liên kết ref provider như hiện tại là đúng.
- **Trade-off:** cần thêm dữ liệu kế toán bất biến và đối soát; nhà cung cấp có thể giữ invoice nhưng ứng dụng vẫn phải xác định nguồn thẩm quyền, correlation và cách phục hồi. Chưa chốt giá/kỳ thì không được coi dữ liệu video là đã sẵn sàng thu phí.

### F10 — Runtime dùng owner khiến DB không bảo vệ được audit và phạm vi thiệt hại

- **Bằng chứng:** `apps/api/PRISMA.md` ghi BE dùng owner, không bị RLS chặn; ví dụ DATABASE_URL và DIRECT_URL dùng cùng tài khoản `postgres.PROJECT_REF`; compose chỉ bỏ DIRECT_URL chứ không đổi quyền DATABASE_URL. M0:L10 và L543/L572 chỉ chặn UPDATE/DELETE từng dòng log, không TRUNCATE. Không có runtime role/grant migration riêng.
- **Ảnh hưởng:** credential runtime có thể DDL/TRUNCATE, bỏ trigger, sửa quyền, đọc toàn bộ dữ liệu; append-only không có hiệu lực đối với owner có khả năng vô hiệu hóa nó. RLS và REVOKE anon/authenticated đang bảo vệ đường Data API, không giới hạn quyền backend.
- **Sửa:** migration owner tách khỏi runtime; role runtime chỉ DML cần thiết, log chỉ SELECT/INSERT, không TRUNCATE/DDL/ownership/role elevation; worker được giới hạn theo tác vụ. Giữ BE authorization rõ ràng và predicate talent_id. Thiết kế role để chạy được với RLS bật: policy backend có chủ đích hoặc lựa chọn bypass được review, không vô tình cấp role không policy rồi làm mọi query trả rỗng.
- **Trade-off:** quản lý thêm role, grants và secret; giảm đáng kể phạm vi thiệt hại. Đây là thiếu least privilege có bằng chứng, không phải khẳng định đã có SQL injection hay lộ credential.

## 3. Phát hiện MEDIUM

### F11 — CHECK dùng phép tương đương logic cho phép trạng thái nửa vời

- **Bằng chứng:** M0:L44–45 `(status='pending') = (manager IS NULL AND time IS NULL)`. Với approved, manager NULL nhưng time có giá trị thì false = false, CHECK nhận. M0:L322–323 với post chưa cancelled nhưng chỉ có một trong `cancel_reason`, `cancelled_at` cũng nhận. Đây là lỗi Boolean ngay cả khi không có SQL NULL trong kết quả biểu thức.
- **Ảnh hưởng:** quyết định thiếu người xử lý/thời gian, metadata hủy sót, audit sai; status hiện tại không chứng minh được provenance.
- **Sửa:** hai nhánh tường minh: pending yêu cầu cả hai NULL; approved/rejected yêu cầu cả hai NOT NULL. Tương tự cancelled yêu cầu cả hai NOT NULL và trạng thái khác yêu cầu cả hai NULL, hoặc xác định metadata lịch sử được giữ rồi bỏ suy luận không đúng. Audit dữ liệu cũ trước VALIDATE.
- **Trade-off:** constraint dài hơn, migration cần làm sạch dữ liệu; semantics dễ đọc và kiểm hơn. PostgreSQL còn cho CHECK nhận kết quả UNKNOWN, nên các CHECK mới phải xét NULL rõ ràng.

### F12 — Lịch sử quyết định duyệt không gắn revision/lần yêu cầu

- **Bằng chứng:** M0:L351 có post/manager/decision/time, không request id, round, content revision; không UNIQUE cho một lần quyết định. `08:IR-11` để PROPOSED, `06` vừa nói cùng bài không đổi cấu trúc vừa có dòng cần approval_round.
- **Ảnh hưởng:** không chứng minh quản lý đã duyệt đúng nội dung được đăng; bấm lặp hoặc quyết định cũ dễ bị hiểu là quyết định hiện tại. Mức độ tăng lên HIGH nếu cho sửa nội dung đã duyệt mà không bắt duyệt lại.
- **Sửa:** chốt F01; request/round gắn immutable content revision, tối đa một quyết định có hiệu lực mỗi request; quyết định và transition CAS trong cùng transaction. Nếu mỗi lần là bài mới thì enforce đúng contract đó.
- **Trade-off:** thêm identity và dữ liệu revision, nhưng không cần lưu mọi lần gõ phím. Không mặc định thêm một hệ thống versioning phức tạp khi requirement chưa chốt.

### F13 — Danh tính tài khoản SNS có thể bị ghi đè, làm lịch sử sai

- **Bằng chứng:** M0:L123 `external_account_ref` nullable, không uniqueness cho external identity; follower snapshots và deliveries tham chiếu id dòng account. `03:D-14` tuyên bố reconnect vẫn giữ lịch sử đúng tài khoản nhưng không có invariant cấm đổi external identity trên dòng cũ. UNIQUE một account đang connected cũng chỉ PROPOSED; trong khi delivery chỉ cho một target/platform.
- **Ảnh hưởng:** khi reconnect sang account khác bằng UPDATE, lịch sử follower và post của account cũ bị gán cho account mới; duplicate account khiến lựa chọn target tùy ý. Schema đang dung nạp nhiều account ở một đầu quan hệ nhưng chặn ở đầu khác.
- **Sửa:** chốt số account/platform; tách external identity bất biến khỏi connection state hoặc bắt tạo dòng mới khi đổi identity; uniqueness có scope đúng provider/platform/owner và hợp đồng chia sẻ account. Không tự áp UNIQUE global khi chưa xác nhận một account có được dùng chung không.
- **Trade-off:** nhiều dòng lịch sử và query account hiện hành; bảo toàn ý nghĩa số liệu cũ.

### F14 — Mục tiêu và chi phí AI thiếu danh tính sự kiện/lịch sử cần cho chống trùng

- **Bằng chứng:** M0:L146 mục tiêu có một `achieved_at`, cập nhật target/deadline tại chỗ; L181 usage có tokens/cost nhưng không request/operation id. `07` chỉ UPDATE achieved_at IS NULL; idempotency video global không có payload binding.
- **Ảnh hưởng:** đổi mục tiêu sau khi đạt có thể không bao giờ báo đạt mục tiêu mới hoặc reset gây báo lặp; retry ghi usage có thể cộng hai lần, báo cáo chi phí sai. Replay key video với body khác không có quy tắc kết quả rõ ràng.
- **Sửa:** định nghĩa goal revision và event key theo revision/mốc, update thành tích và notification/outbox cùng transaction. Usage có operation/call identity và uniqueness theo provider call hoặc attempt phù hợp; ghi hai cuộc gọi thực sự tốn phí thành hai sự kiện. Idempotency video theo talent/operation với payload hash, từ chối replay khác payload.
- **Trade-off:** thêm dữ liệu nguồn và revision; không dedupe nhầm hai lần gọi AI thực sự bằng khóa quá thô. Gộp tiền AI theo currency, không cộng USD và JPY trực tiếp.

### F15 — Index phù hợp một số truy vấn nhưng chưa chứng minh đủ workload

- **Bằng chứng:** M0:L327 `(talent_id,status)` không khớp tiền tố bộ lọc bài của mọi talent theo status trong màn quản lý; chưa có `(status,created_at,id)` cho phân trang đó. L181 index `(talent_id,occurred_at)` tốt theo talent, nhưng không tối ưu rõ cho tổng tháng mọi talent. L396 `(social_account_id,published_at DESC)` không `NULLS LAST`/partial published trong khi nhiều dòng chưa đăng có NULL. L493 partial active không bao phủ FK lookup toàn bộ subscriptions. Job ref chưa có index phục vụ callback lookup; chỉ thêm khi F06 chốt phạm vi key.
- **Ảnh hưởng:** có thể scan/sort lượng lớn, lấy nhầm NULL khi query latest publish sơ sài, kiểm FK khi xóa cha quét các subscription không active. Chưa có EXPLAIN hay tải nên đây là ứng viên bottleneck, không kết luận đã chậm.
- **Sửa:** catalog query thực tế (predicate, order, limit, cardinality), keyset pagination có id tie-break; đo EXPLAIN (ANALYZE, BUFFERS) trên dữ liệu đại diện. Cân nhắc `(status,created_at DESC,id DESC)`, time-leading index/BRIN cho usage nếu scan tháng đáng kể, partial published với account/time. Kiểm FK indexes có tiền tố đúng. Có thể giữ scan ở các bảng vài dòng.
- **Trade-off:** index tăng write amplification/storage. Không thấy cặp index nào trùng hoàn toàn đủ căn cứ xóa ngay. PK `(post_id,media_asset_id)` và UNIQUE `(post_id,position)` kiểm hai invariant khác nhau; hai index danh sách post cũng không tự động dư. Không tạo trigram/GIN/partition chỉ để dự phòng.

### F16 — Migration strategy chưa có hợp đồng portability, upgrade và phục hồi

- **Bằng chứng:** compose quảng bá PostgreSQL 17 local thông thường; M0 REVOKE từ `anon`, `authenticated` và M2 phụ thuộc các role đó nhưng local DB không bootstrap role Supabase. M0 bỏ FK khi không có Auth, M2 bỏ auth trigger trên shadow: replay shadow không chứng minh Auth invariant. `PRISMA.md` tập trung tạo/apply migration, không có expand/backfill/contract, lock budget, rollback/restore exercise. `06` đánh giá thêm CHECK/index là thấp mà chưa xét lock/scan. Prisma schema không diễn đạt đủ trigger/CHECK/expression index.
- **Ảnh hưởng:** local sạch có thể thất bại vì role không tồn tại; shadow và Supabase khác semantics; thay đổi lớn dễ khóa bảng hoặc rollout code không tương thích. Test migrate thành công chưa chứng minh constraint/ACL còn nguyên.
- **Sửa:** chọn Supabase-local hoặc bootstrap role/Auth stub có ghi rõ giới hạn; CI replay sạch và nâng cấp từ snapshot dữ liệu cũ, so catalog constraint/trigger/index/ACL. Tách các thay đổi expand → backfill lặp được → validate → contract, đặt lock_timeout, xử lý index CONCURRENTLY ngoài transaction khi cần. Có backup/PITR theo gói thật, restore drill và runbook forward-fix. Kiểm event trigger, SECURITY DEFINER owner/search_path/execute sau restore và trên môi trường Supabase thật.
- **Trade-off:** thêm pipeline và môi trường integration; không phải mọi migration nhỏ đều cần chiến dịch phức tạp. Event trigger RLS có ích nhưng quyền mặc định chỉ áp role tạo object đã cấu hình; role mới/restore/attach table cần kiểm lại, không được coi tự động an toàn tuyệt đối.

### F17 — Retention và hợp đồng dữ liệu ngoài DB chưa đủ để bảo đảm vòng đời dữ liệu

- **Bằng chứng:** `02` không lưu onboarding progress, suy ra từ billing/social/push; việc mất kết nối hoặc thu hồi permission có thể làm tiến độ lùi. M0:L201 có path/item id nhưng không lifecycle chuyển tệp/cleanup; `activity_logs.details` chỉ comment allowlist, không có danh sách cụ thể. Hai log append-only và nhiều FK RESTRICT; `06` đề xuất ẩn danh/xóa bằng chủ sở hữu nhưng chưa có thủ tục. Hồ sơ/know-how nằm OneDrive, không có contract version/etag được thống nhất trong schema này.
- **Ảnh hưởng:** không phân biệt chưa hoàn tất với đã hoàn tất rồi mất kết nối/từ chối push; file tạm hoặc link chia sẻ tồn tại quá lâu, tham chiếu file đã xóa; log có thể giữ PII/secret ngoài thời hạn. Xóa DB không tự xóa OneDrive/Storage hoặc revoke link. Không thể tuyên bố retention đã được giải quyết bằng đổi status ended.
- **Sửa:** xác định semantics onboarding; nếu cần nhớ bước đã hoàn thành/skipped, lưu milestone bền vững. Chốt retention theo nhóm dữ liệu, redaction/allowlist log, tác vụ cleanup retry được ở từng hệ thống, trạng thái upload/copy/delete và reconciliation. Audit xem là fail-closed nhưng phải có policy tối thiểu hóa PII. Dùng Graph drive/item/version phù hợp hợp đồng, xác minh scope item id trước khi áp uniqueness. Không bắt buộc mirror toàn bộ OneDrive vào DB.
- **Trade-off:** thêm trạng thái vận hành và retention exception có kiểm soát; ẩn danh giữ khóa nhưng không mặc nhiên xóa hết khả năng tái định danh. Không coi mã hóa ổ đĩa là thay thế quyền truy cập, link expiry hay kiểm soát log.

## 4. Những quyết định có cơ sở và những kết luận không được suy rộng

- Gộp talent/office có CHECK phân loại, gộp draft/post, N:N post/media và video/input là hợp lý cho requirement hiện tại. Tên/ngày sinh ở đơn và ở talent có thể là snapshot lúc nộp so với hồ sơ hiện tại; cần ghi rõ nguồn thẩm quyền, không xóa chỉ vì giống dữ liệu.
- Hashtag array có thứ tự và metrics JSONB chấp nhận được khi truy vấn không cần relational analytics theo phần tử. Không chứng nhận toàn schema “đạt 3NF” chỉ từ tên bảng; ownership constraints và lịch sử identity vẫn thiếu như trên.
- UUID/bigint, timestamptz, numeric cho tiền, RLS bật và thu hồi client grants, TLS kiểm CA, một pool/process là nền tảng tốt. Chúng không thay thế authorization, FK và operational validation.
- Text + CHECK phù hợp danh mục còn thay đổi. Việc nới/siết CHECK vẫn cần rollout tương thích và kiểm dữ liệu; không mặc định zero-risk.
- Không có căn cứ yêu cầu partition, CQRS/event sourcing, generic EAV, tổ chức đa tenant hoặc mã hóa thêm mọi cột Web Push. Ưu tiên giải quyết invariant và workflow có thật. Outbox và attempt history là phản hồi cho các cửa sổ crash/race cụ thể, không phải thêm abstraction dự phòng.
- `system_settings` CHECK id=1 bảo đảm tối đa một dòng, không bảo đảm luôn tồn tại; seed đã có nhưng runtime không nên có quyền xóa dòng này. CHECK vị trí 1–3 ở themes cũng chỉ bảo đảm tối đa ba slot, không tự tạo đủ ba; phải có command/transaction và reconciliation.

## 5. Điều kiện cần để review lại

| Cổng | Nội dung bắt buộc | Bằng chứng hoàn thành |
|---|---|---|
| G1 | Baseline requirement và phạm vi được xác nhận | Quyết định cho các điểm F01/F09/F12/F13, ghi ai xác nhận và nguồn |
| G2 | Khép mô hình danh tính, phiên và ownership | ERD/schema/migration thống nhất; không orphan Auth; không liên kết chéo talent/platform |
| G3 | Thiết kế workflow ngoại hệ thống | Outbox/operation, delivery attempts, callback dedupe, pause epoch, trạng thái hủy chưa xác nhận |
| G4 | Chốt dữ liệu thu phí | Giá/kỳ và snapshot bất biến; invoice/payment/adjustment; đối soát không thu lặp |
| G5 | Runtime least privilege và migration có thể tái tạo | Role/grant matrix, replay sạch, catalog checks, upgrade và restore test |
| G6 | Không còn HIGH chưa xử lý | Từng finding có owner, phương án đã áp dụng, test và kết quả review lại; không đóng bằng “sẽ kiểm ở BE” |

Các kiểm chứng tối thiểu cần bổ sung, không chỉ unit test mock:

1. Hai connection: xóa Auth đồng thời provision/đổi auth_user_id; expected không orphan.
2. INSERT/UPDATE liên kết chéo talent/platform/subject/input/result bị từ chối; sau khi đổi owner cũng không phá invariant.
3. Hai manager cùng duyệt/return, approve sát deadline và sửa media/content đồng thời: chỉ một quyết định hợp lệ cho đúng revision.
4. Crash sau commit trước enqueue; provider thành công nhưng timeout; callback trùng/đảo thứ tự/lần cũ: không mất task, không ghi đè generation mới, không tự đăng lại trái nghiệp vụ.
5. Pause/ended trong lúc submit đang bay, pause/resume nhanh, cancel timeout: mọi lịch thuộc epoch cũ được theo dõi và đối soát; UI không báo hủy hoàn tất khi chưa có xác nhận.
6. Lỗi video đến sau chốt kỳ, replay request khác payload, tháng mới/múi giờ Nhật: số lượt, giá và điều chỉnh truy xuất được, không thu hai lần.
7. Runtime không ALTER/DROP/TRUNCATE, không UPDATE/DELETE log; anon/authenticated không đọc/ghi dữ liệu domain; phiên revoked/recovery/first-password không đọc dữ liệu không được phép.
8. Replay migration trên môi trường sạch và upgrade có dữ liệu; compare catalog; restore và smoke test Auth trigger/ACL; EXPLAIN với dữ liệu đại diện và ngân sách connection API + worker + migration.

Thứ tự khóa cần được đặc tả xuyên module (ví dụ global settings → talent → post → delivery/attempt, cùng thứ tự id trong từng lớp), không chỉ ORDER BY posts.id. Không dùng SKIP LOCKED cho lệnh cần bảo đảm đã xử lý toàn bộ mà không có vòng quét bù. Retry có giới hạn cho deadlock/serialization phải chạy lại toàn transaction và không lặp side effect ngoài DB.

## 6. Nguồn kỹ thuật đã đối chiếu

- [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html): CHECK/NULL, FK và invariant liên bảng; cơ sở F03/F04/F11. PostgreSQL không khuyến nghị dùng CHECK truy vấn bảng khác.
- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html): snapshot, write anomaly và nhu cầu retry; không coi “cùng transaction” là đủ cho mọi invariant.
- [Supabase Prisma](https://supabase.com/docs/guides/database/prisma): mô hình kết nối và role; cần kiểm đúng phiên bản và môi trường thay vì bỏ FK theo suy luận chung.
- [Supabase changelog](https://supabase.com/changelog.md): đã kiểm thay đổi liên quan; review không chạy Supabase CLI hay dựa vào CLI mặc định để sửa schema.

**Quyết định cuối cùng: REJECTED.** Cần thiết kế lại các phần quan trọng nêu ở F02–F10 và xác nhận F01. Không phê duyệt có điều kiện khi còn 10 HIGH mở và business rule cốt lõi chưa xác nhận. Các sửa nhỏ đã ghi ở review `08` vẫn có giá trị, nhưng không đủ chứng minh toàn bộ Database Design sẵn sàng implementation.
