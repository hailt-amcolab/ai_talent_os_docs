# Phạm vi đã chốt và sửa thiết kế sau independent review

Ngày 17/11/2026 · Quyết định của chủ dự án: chỉ làm trước phần đã chốt trong tài liệu; các phần còn lại cập nhật dần. Đây là baseline triển khai DB **đợt 1**, ưu tiên hơn kết luận “có thể bắt đầu” trong `07`, `08` và DDL tham khảo cũ trong `04`. Báo cáo `09` giữ nguyên như bằng chứng trước sửa, không sửa lịch sử phát hiện thành “chưa từng có lỗi”.

## 1. Quy tắc phạm vi

- **IN SCOPE:** chức năng có Q&A Close hoặc CR được chốt; trường dữ liệu tối thiểu của chức năng đó lấy từ requirement nguồn. Quyết định kỹ thuật để bảo vệ dữ liệu có thể thực hiện ngay, nhưng phải ghi là quyết định kỹ thuật, không gắn nhãn khách đã xác nhận.
- **SOURCE BASELINE:** nội dung chỉ có trong DOCX 0.1, chưa thấy xác nhận riêng. Dùng để tra cứu, không tự suy ra khách đã đồng ý vì không có dấu 確認. Chỉ làm phần dữ liệu phụ thuộc tối thiểu đã được nêu rõ trong bảng dưới.
- **DEFERRED:** câu Open, UNKNOWN, CONFLICT, comment đặt lại quy tắc hoặc dependency lõi chưa chốt. Không dùng quy tắc tạm để mở chức năng này. Chỉ đưa lại vào phạm vi bằng tài liệu và migration tiếp theo.
- Phạm vi là theo **luồng con**, không phải đánh dấu cả EP01–EP10 là xong. Schema sẵn sàng không đồng nghĩa API, Auth guard, worker hoặc UI đã được triển khai.
- Không suy diễn rằng khách đã chốt baseline mới. Đây là lựa chọn phạm vi kỹ thuật theo chỉ đạo của chủ dự án, áp dụng các quyết định đã có trong tài liệu; khi nhận confirmation sheet phải đối chiếu lại.

| Luồng | Căn cứ đã chốt | Đợt 1 | Giới hạn |
|---|---|---|---|
| Gửi đơn, quản lý duyệt/từ chối, tạo identity | Q&A 11 / CR-01; trường tên/email/ngày sinh từ §6-4 2-2 | Thiết kế dữ liệu và command provisioning | Không làm gửi lại đơn bị từ chối, đảo quyết định hoặc hết hạn mật khẩu tạm theo giả định; chờ Q&A 65. Đồng ý điều khoản chờ U-14, không tự thêm CHECK giả định |
| Một loại quản lý; vô hiệu hóa; nhật ký xem | Q&A 5, 21 / CR-13 | Có | Guard kiểm dữ liệu server mỗi request; thời hạn/idle dùng cấu hình đã được chính sách phê duyệt, không hardcode con số Open vào CHECK |
| Tài khoản công ty tách loại, không thu phí/không duyệt | Q&A 20, 47–48 / CR-11 | Có dữ liệu và provisioning | Không triển khai UI đăng bài công ty trước khi luồng EP06 được mở; chi tiết vận hành account chờ Q&A 66 |
| Trạng thái tài năng và ngừng sử dụng | Q&A 10 | Lưu dữ liệu, chặn quyền khi ended | Thời điểm before_use→in_use, phục hồi và tính tiền chờ 52/53/64. Không chạy tác vụ thu tiền/đăng bài nên không có tác vụ đó cần hủy ở đợt 1 |
| Tư liệu do tài năng/quản lý gửi, lưu OneDrive | CR-09/10 | Có metadata, ownership và outbox media.transfer | Giới hạn file, link chia sẻ và cleanup phải được integration chốt trước mở upload thật. Không mở link công khai mặc định |
| Chủ đề/bản nháp; danh sách từ cấm chung | Q&A 9, 13, 40–41 / CR-02/06/07 | Chỉ lưu/sửa draft và tư liệu | Không adopt, duyệt, moderation-to-schedule hoặc gửi provider. Expiry và thời điểm đăng chờ 55–57 |
| Hội thoại và chi phí AI | Q&A 17 / CR-16; owner-read từ requirement quyền tự xem | Có cấu trúc owner và chi phí, contract outbox | Manager xem hội thoại bị hoãn do Q&A 7/CR-24. Không coi lưu usage là triển khai toàn bộ AI coach; adapter phải dedupe từng provider call trước khi chạy |
| Push/thông báo cho tài năng | Q&A 42 / nền tảng PWA; R09-06 | Có dữ liệu inbox/subscription và outbox | Không phát sinh loại sự kiện đang chờ chốt; không mở workflow manager notification/handled chung khi U-10/11 còn mở |
| Mục tiêu, snapshot follower, SNS connections | Q&A 14 có comment xung đột; 23 Open | **DEFERRED** | Chưa quyết mục tiêu tổng hay từng SNS, số account/platform và quy tắc reconnect |
| Đếm và tạo video AI có phí | Quy tắc đếm chốt ở Q&A 1/3, nhưng đơn giá/kỳ chưa chốt | **DEFERRED chạy thật** | Giữ bảng cũ, chặn ghi; không phát sinh lượt có thể phải tính tiền khi thiếu snapshot giá/kỳ |
| Duyệt, adopt, hẹn, đăng, hẹn lại và hủy provider | Q&A 51, 57–61 còn Open | **DEFERRED** | Không dùng sáu/tám trạng thái tạm hoặc quy tắc “một mạng lỗi thì failed” để mở chức năng |
| Thu phí tháng, giá video, invoice và payment | Q&A 4, 49, 53, 62–64 còn Open | **DEFERRED** | Không worker thu tiền, không invoice giả, không backfill giá hiện tại vào usage cũ |
| Nhóm, AI instruction UI, tương tác theo giờ, SMS MFA | CR-17…19/24, metrics chưa chốt; SMS chưa bật | **DEFERRED** | Không thêm multi-tenant organizations, SMS bindings hoặc metric cố định dự phòng |

## 2. Thay đổi schema thực hiện trong repository

Migration bổ sung: `apps/api/prisma/migrations/20261117000300_confirmed_scope_foundation/migration.sql`. Không sửa ba migration đã áp trước đó; **đã áp migration lên Supabase dự án và kiểm chứng; xem [12](12_supabase_deployment.md)**.

### Danh tính và phiên — F02, F03

- Khôi phục FK thật từ `managers.auth_user_id`, `talents.auth_user_id` tới `auth.users(id)`, ON DELETE RESTRICT. Bỏ trigger một chiều trên Auth.
- Lệnh `db:dev`/`db:diff` đọc đầy đủ catalog Auth và đánh dấu mọi bảng/enum Auth là external; config chặn schema planning trực tiếp thiếu inventory, chặn db push/reset. Không chỉ external auth.users vì các bảng Auth không được model hóa vẫn có thể bị Prisma đề xuất xóa. `db:pull` chỉ xuất --print để không ghi đè projection đã review.
- Dùng Prisma `externalTables` + multi-schema và `migrations.initShadowDb` để engine hiểu khóa Auth trong shadow DB. Chỉ model hóa projection `auth.users.id`; migration tuyệt đối không quản lý bảng Auth. Feature Prisma này là preview, pin phiên bản và kiểm SQL diff trước apply.
- `app_private.auth_principals`: PK auth_user_id, kind manager/talent, must_change_password, security_version. UNIQUE `(auth_user_id,principal_kind)` được managers/talents tham chiếu bằng discriminator cố định: một identity không thể đóng cả hai vai trò. Office dùng principal talent. Trạng thái active/ended có nguồn thẩm quyền ở managers/talents, không sao chép thêm cờ enabled lệch nhau.
- `auth_session_registry`: identity, purpose full/first_password/recovery/mfa_setup, auth_time, absolute expiry, last admin activity, password proof, TOTP factor/proof/policy version, revoked_at và security_version_at_issue. Các phiên cũ không tự được nâng full. Không lưu JWT/refresh token/QR/TOTP secret.
- `auth_challenges`: FK kép session/user; challenge provider, factor và purpose; trạng thái/expiry/số lần thử. `password_lock_state` lưu counters theo identity, không hardcode số lần/thời gian thành CHECK nghiệp vụ chưa được khách chốt.
- Trigger vô hiệu manager/ended talent tăng security_version và revoke registry trong cùng transaction; bật lại không hồi sinh session cũ. Trigger registry giữ bất biến auth_time/expiry/version/identity và không gỡ revoke bằng UPDATE.
- Không FK registry tới auth.sessions vì Supabase tự cleanup; service phải xác minh session_id từ JWT có chữ ký và chính sách phiên server. Đã có FK tới identity Auth thật.

**Contract bắt buộc khi triển khai Auth service:** verify JWT trước; đọc principal/session/domain status server; full + không must_change_password + version hiện hành + chưa revoked + chưa hết hạn mới đọc domain. Manager phải active, proof TOTP khớp factor/session/policy hiện tại và chưa idle quá policy. Restricted/recovery chỉ được vào completion allowlist. Thay password/MFA/revoke/vô hiệu hóa phải cập nhật version/revoke trong transaction; không lấy user_metadata làm quyền. Schema chưa phải Auth guard chạy production; phải có integration test với Supabase thật trước mở endpoint.

### Ownership và invariant — F04, F08, F11

- Thêm UNIQUE `(id,talent_id)` trên post/media/video/theme/message và `(id,talent_id,platform)` trên social account; thêm talent_id có backfill từ parent cho post_media, video_generation_inputs và post_deliveries.
- FK kép chặn media/theme/revision/result khác owner, delivery khác account owner/platform và notification trỏ post/message khác talent. Subject đơn đăng ký không trộn với subject talent.
- FK `(application_id,application_status='approved')` bảo đảm nguồn talent đã duyệt; FK billing với account_type='talent' chặn thu phí office ngay cả khi feature được mở lại sau này.
- Sửa CHECK quyết định đơn và metadata hủy thành hai nhánh NULL/NOT NULL tường minh. Version phải dương; UPDATE application/talent/post/operation phải tăng đúng 1. Service vẫn phải dùng `WHERE version=:expected` và kiểm affected rows; trigger tăng đúng một **không tự thay thế CAS**.
- Quyền runtime đợt này chỉ sửa draft; trigger chặn non-draft/adopt/schedule/NG workflow. Vì adopt chưa mở, không còn đường hợp lệ từ runtime để scheduled bài thiếu media/approval.
- Các invariant loại media của video và revision approval chưa được coi là đã sửa cho EP05/06: các bảng này bị gate DEFERRED, phải thiết kế đầy đủ trước khi bỏ gate.

### Tác vụ bên ngoài — F05

`app_private.domain_operations`: khóa operation do server tạo, kind allowlist đợt 1, actor, application/talent, payload_hash của dữ liệu không secret, state accepted/running/completed/failed/unknown, step, provider_ref, version và error code. Một application có tối đa một operation provisioning dài hạn. ID của provider Auth có thể ghi ở provider_ref tại bước auth_created; bước binding phải kiểm identity do provider trả về.

`app_private.outbox_events`: FK operation, generation, event_type, state pending/leased/done/failed/unknown, available_at, attempts, lease_token/lease_until và error code; UNIQUE operation/generation/type. Payload thực đọc từ domain/operation theo ref, không lưu tùy ý body chứa password, token hoặc PII.

Protocol implementation:

1. Dedupe operation_key có scope actor/usecase/command do server tạo; cùng key khác payload_hash trả conflict. Không hash/password/OTP để ghi idempotency. Domain mutation + operation + outbox **cùng transaction/kết nối**.
2. Dispatcher claim pending bằng `FOR UPDATE SKIP LOCKED`, commit lease token trước HTTP. Không giữ DB lock trong HTTP. Completion phải `WHERE state='leased' AND lease_token=:token`; worker cũ không hoàn tất lease mới.
3. Timeout sau request hoặc lease hết hạn khi có khả năng đã gửi → unknown và đối soát provider theo operation/idempotency/ref trước khi retry side effect. Không tự đẩy mọi expired lease về pending rồi gửi lại mù.
4. Provider hỗ trợ idempotency thì dùng operation id bền vững; không hỗ trợ thì reconciliation/compensation. Không tuyên bố exactly-once. Email tạm/secret lưu theo secret-store contract, không đặt trong DB/outbox.
5. Notification inbox row và operation/outbox của push cùng transaction, UNIQUE event_key. pg-boss nếu bổ sung chỉ là dispatcher/scheduler; không thêm một nguồn job thứ hai thiếu transaction với domain.
6. Dispatcher role hiện chỉ quản lý lease/outbox và đọc operation. Chưa cấp quyền đọc Auth secret/domain nhạy cảm hay chạy integration adapter; khi làm worker cụ thể phải thêm quyền tối thiểu và test riêng.

Thứ tự khóa khi triển khai command: application (nếu có) → manager/talent hiện hữu → principal → session → challenge → post/media → operation → outbox; trong từng tập khóa theo id. Không giữ lock qua HTTP. Worker completion tuân cùng thứ tự, không khóa operation trước rồi quay lại domain; retry có giới hạn toàn transaction cho 40P01/40001 và không lặp side effect ngoài DB. Registry origin bất biến nên không cập nhật auth_time khi refresh.

### Quyền — F10

Hai nhóm NOLOGIN, không superuser/BYPASSRLS/CREATEDB/CREATEROLE/REPLICATION: `talent_runtime`, `talent_dispatcher`. Có RLS policy riêng cho backend và allowlist GRANT tường minh; client anon/authenticated vẫn không có grants/policies. Không blanket GRANT ALL hay quyền mặc định cho bảng tương lai.

Runtime được DML trên các bảng in-scope, log chỉ SELECT/INSERT; không TRUNCATE, DDL, UPDATE/DELETE log, xóa settings, hoặc đọc/ghi bảng DEFERRED. Các policy backend cố ý không phân quyền end user: BE phải áp guard và owner predicate. Không coi RLS policy true của backend là tenant isolation.

`connectDatabase` từ chối principal runtime không kế thừa capability hoặc có thể nhận quyền owner/superuser/BYPASSRLS/CREATEROLE. LOGIN tạo ngoài migration bằng operator/secret manager và chỉ được cấp nhóm runtime; DIRECT_URL vẫn dùng migration owner. Không dùng chung mật khẩu/LOGIN với DIRECT_URL. Kết nối pooler cần xác nhận username custom role và TLS trên Supabase thật theo runbook.

## 3. Gate cho phần chưa chốt — F01, F06, F07, F09

Trigger chặn INSERT/UPDATE/DELETE của billing_accounts, social_accounts, follower_goals, follower_snapshots, post_approval_decisions, post_deliveries, post_metric_snapshots, video_generations, video_generation_inputs, manager_notifications. Trigger draft-only chặn adopt/publish. Giữ bảng và lịch sử hiện có, không DROP hay tự sửa dữ liệu.

Đây là **loại khỏi phạm vi triển khai**, không phải đã sửa xong thiết kế nghiệp vụ EP05/06/08. Khi khách chốt, phải có ADR/ERD/schema/test mới trước khi gỡ gate, tối thiểu:

- EP06: approval request gắn content revision; delivery target/attempt/publication riêng, generation và inbox callback dedupe; mapping trạng thái do khách chốt; pause epoch + durable intent + submit đang bay cần cancel bù, desired state khác observed state. Phải thử callback trễ, pause/resume và provider timeout. Chỉ thêm state/attempt table sau khi xác nhận workflow và hợp đồng Upload-Post.
- EP08: hợp đồng phí talent có hiệu lực, snapshot giá, kỳ thu, invoice/lines, payment attempt/event, điều chỉnh lỗi video sau đóng kỳ, uniqueness chống thu hai lần. Không đổi boolean is_counted trong quá khứ để âm thầm viết lại invoice.
- SNS/mục tiêu: cardinality account/platform, identity bất biến khi reconnect, mục tiêu tổng/per-SNS và revision thành tích. Không chỉ bỏ trigger mà giữ model cũ rồi coi như đã chốt.
- Mọi nghiệp vụ mới: runtime/worker grants, query indexes, retention và rollback/forward-fix được review cùng migration, không tự mở bằng env flag.

## 4. Migration và đưa lên môi trường thật

1. Chụp backup theo gói Supabase thật; dry run trên disposable Supabase/staging và bản sao dữ liệu hiện tại. Migration preflight từ chối khi còn post đang hẹn/chờ duyệt, delivery đã submit/chưa hủy xong hoặc video đang chạy. Phải đối soát/kết thúc đúng nghiệp vụ trước, không chỉ sửa status cho vượt gate.
2. Migration trong transaction, lock_timeout 5s/statement_timeout 60s là ngân sách kỹ thuật ban đầu; nếu fail, kiểm tải và chia thay đổi theo expand/backfill/validate thay vì tăng timeout vô hạn. Kiểm dữ liệu orphan/cross-owner/partial decision trước; không tự xóa hoặc sửa theo phỏng đoán. Ở quy mô lớn cần unique index CONCURRENTLY riêng trước ADD CONSTRAINT USING INDEX.
3. Dùng Prisma Migrate; review SQL bảo đảm không CREATE/ALTER/DROP `auth.users`, không DROP object Supabase ngoài app. External tables bảo vệ ownership của Auth trong workflow Prisma, không cấp quyền ứng dụng đọc toàn bộ Auth.
4. Áp bằng DIRECT_URL. Tạo LOGIN runtime riêng, grant đúng capability; thay DATABASE_URL, deploy API đã kiểm runtime role. **Ứng dụng cũ dùng owner không được chạy tiếp sau cutover.**
5. Kiểm replay sạch, nâng cấp có dữ liệu hợp lệ và migration fail/rollback với dữ liệu không hợp lệ; catalog CHECK/FK/trigger/RLS/ACL, log append-only và feature gates. Chạy integration test với hai connection cho FK/CAS/lease.
6. Không rollback bằng DROP bảng mới hay sửa file migration đã áp; forward-fix. Đổi lại scope khi có yêu cầu mới bằng migration thêm, cập nhật bảng scope và chạy regression cũ.

PostgreSQL local qua compose có bootstrap Auth stub/role client chỉ trên volume mới. Với volume cũ, operator chạy rõ ràng `prisma/local/bootstrap.sql` trên **local** trước migrate. Stub chỉ phục vụ FK/schema test, không chứng minh Auth/MFA/Storage/Supabase production hoạt động.

## 5. Trạng thái HIGH sau sửa

| Finding | Trạng thái đợt 1 | Cách xử lý / giới hạn |
|---|---|---|
| F01 baseline | Resolved for limited scope | Chủ dự án chọn chỉ phần đã chốt; bảng §1 và gate §3; không đổi Open thành Confirmed |
| F02 session/security | Design and migration corrected | Có dữ liệu guard, mapping và contract; guard/SDK production phải được triển khai/test trước mở endpoint |
| F03 Auth FK | Corrected | FK thật, external Auth table/shadow init; cần POC Supabase staging trước apply thật |
| F04 cross-owner | Corrected | FK kép bảo vệ cả child insert/update và parent update; bảng pending cũng được bảo vệ sẵn |
| F05 durable tasks | Design and migration corrected | Operation/outbox + protocol; chưa có worker live và không tuyên bố side effect đã được kiểm thử |
| F06 delivery attempts | Deferred and write-gated | Không có luồng đăng/hẹn lại đang mở trong đợt 1; phải thiết kế lại trước gỡ gate |
| F07 pause/cancel race | Deferred and write-gated | Không tạo submit/cancel trong đợt 1; preflight chặn đưa migration vào khi có công việc đang bay |
| F08 invariants | Corrected for draft/provisioning scope | Origin/billing/ownership/version và gate; invariant adopt/approval/video chưa phê duyệt |
| F09 billing history | Deferred and write-gated | Không thu tiền/tạo video tính phí; bảng billing agreement/invoice thiết kế sau khi chốt |
| F10 least privilege | Corrected in repository | NOLOGIN capability, ACL/RLS và startup check; cần operator provision credential thật và kiểm pooler |

## 6. Kết luận sau sửa

**APPROVED WITH CONDITIONS — chỉ baseline DB đợt 1 trong §1**, để tiếp tục implementation các module đã chốt theo contract ở đây. Điều kiện đưa lên Supabase/staging/production: replay và POC external tables trên môi trường thật, migration preflight sạch, LOGIN runtime riêng, Auth guard/adapter có integration test trước mở API tương ứng. Không có HIGH chưa xử lý trong **phạm vi thiết kế được mở**; các HIGH ngoài phạm vi vẫn deferred, chưa được coi đã khắc phục về nghiệp vụ.

**Toàn bộ sản phẩm/database của EP01–EP10 vẫn chưa được phê duyệt.** Không gỡ gate để hoàn thành tính năng đang Open và không dùng kết luận phạm vi hẹp này để nghiệm thu EP06/EP08. Kết quả kiểm chứng thực tế được ghi trong `11_foundation_validation.md`.

## 7. Triển khai thực tế

Đã triển khai và xác minh trên Supabase theo [12_supabase_deployment.md](12_supabase_deployment.md). Điều kiện DB/migration và runtime LOGIN đã được kiểm trên project thật; điều kiện triển khai Auth guard/SDK/worker trước mở API tương ứng vẫn giữ nguyên.
