# Kiểm chứng bản sửa database đợt 1

> Báo cáo này giữ kết quả kiểm local trước triển khai. Kiểm chứng Supabase thật sau đó nằm ở [12_supabase_deployment.md](12_supabase_deployment.md).

Ngày 17/11/2026 · Baseline được kiểm: tài liệu `10`, Prisma 7.10.1 và migration `20261117000300_confirmed_scope_foundation`.

## Môi trường và giới hạn

PostgreSQL **16.15** disposable trong `/tmp`, chỉ Unix socket, có role anon/authenticated và Auth stub tối thiểu `auth.users(id)`. Node 22.23.3. Không kết nối, introspect hoặc migrate Supabase của dự án. Không thay đổi dữ liệu thật. Database tạm được dừng sau kiểm chứng.

Docker local-db khai báo PostgreSQL 17; Supabase có Auth/Storage/ACL/trigger riêng. Kết quả local dưới đây chứng minh schema và workflow Prisma trong môi trường đó; không thay thế POC Supabase staging, pooler custom LOGIN, JWT/MFA SDK, gọi provider hay backup restore.

## Kết quả

| Kiểm tra | Kết quả |
|---|---|
| `npx prisma validate` | PASS, 32 model gồm 31 bảng app và projection Auth external |
| `npm run typecheck` | PASS |
| `TEST_DATABASE_URL=<disposable> npm test` | **20/20 PASS**, không skipped, gồm 7 integration tests và test chặn CLI thiếu inventory |
| `prisma migrate deploy` trên DB sạch có local bootstrap | PASS, cả bốn migration |
| Introspection DB có FK sang Auth với externalTables | PASS; không còn P4002 trong POC local |
| Migration-directory → Prisma-schema diff trên shadow | Empty migration |
| Safe live-schema diff khi Auth có bảng/enum ngoài projection | Empty migration, không đề xuất DROP/ALTER Auth |
| Schema planning trực tiếp bỏ qua Auth inventory | Bị chặn trước kết nối DB |
| Replay lại trên cùng shadow sau soft-reset | Empty migration sau sửa CREATE SCHEMA IF NOT EXISTS |
| Upgrade từ ba migration cũ với fixture hợp lệ | PASS, backfill talent_id và tạo principal restricted đúng |
| Upgrade với orphan Auth cố ý tạo ở schema cũ | Từ chối bởi FK; toàn transaction rollback, delete trigger cũ còn nguyên, không để schema nửa nâng cấp |
| `git diff --check` | PASS |

Kiểm ranh giới Auth phát hiện external chỉ auth.users vẫn để Prisma đề xuất DROP bảng Auth khác. Đã thêm tools/prisma-safe.ts đọc đầy đủ catalog Auth và truyền external tables/enums, config chặn planning thiếu inventory; regression bổ sung bảng/enum Auth không được model hóa xác nhận diff rỗng. Không áp đề xuất DROP đó lên bất kỳ database nào.

Trong kiểm replay lặp, phát hiện namespace app_private còn tồn tại sau Prisma soft-reset làm CREATE SCHEMA lỗi 42P06. Đã sửa migration mới dùng IF NOT EXISTS; không sửa migration cũ hoặc bỏ FK để né lỗi.

Introspection Prisma ban đầu suy reverse one-to-one từ subset UNIQUE của FK kép, dẫn tới validate yêu cầu compound unique dư. Schema đã giữ reverse arrays cho các FK kép đó; tính duy nhất thật vẫn do unique đơn bảo vệ. Sau chỉnh, validate và migration diff đều thành công mà không thêm các index trùng.

## Những gì được chứng minh bằng test DB

File `apps/api/prisma/tests/confirmed-scope.sql`: **31 assertion từ chối**, cùng fixture hợp lệ và các assertion trạng thái; chạy trong transaction và ROLLBACK. File `apps/api/src/infra/database/foundation.integration.test.ts` chạy regression SQL và các ca hai connection.

- Orphan Auth bị từ chối; xóa Auth đồng thời provision thực sự chờ FK lock rồi nhận 23503, không tạo orphan.
- Một identity không dùng đồng thời role manager/talent; đơn pending không tạo được talent; office không có billing account.
- Media, input/result video, revised post và subject notification không trỏ khác talent; platform delivery không lệch account. Đổi owner parent đã được tham chiếu bị FK chặn. Gate pending được tạm tắt chỉ trong transaction fixture để kiểm constraint dormant, sau đó rollback.
- Decision/cancellation metadata nửa vời bị CHECK chặn; version không tăng bị từ chối; hai writer CAS version=1 chỉ một writer cập nhật được.
- Registry không cho kéo dài expiry hay gỡ revoked; vô hiệu manager tăng security version và revoke phiên cùng transaction, bật lại không hồi sinh phiên.
- Domain operation/outbox rollback cùng nhau; event trùng bị UNIQUE chặn; worker thứ hai không claim hàng đã khóa; lease token cũ không complete event.
- Runtime được đọc bảng in-scope và INSERT log; không UPDATE/DELETE/TRUNCATE log, ALTER bảng, đọc billing pending. anon/authenticated không đọc domain/private data. RLS hiện diện trên mọi bảng app.
- Startup API từ chối owner và chấp nhận LOGIN riêng chỉ kế thừa talent_runtime. Test LOGIN thành công chỉ dành Unix-socket disposable trust, không tạo credential Supabase và không dùng mật khẩu thật.
- Non-draft/adopt/schedule và ghi các bảng DEFERRED bị chặn; các chức năng chờ khách chưa được mở bằng cách sửa schema cho “chạy được”.

## Điều chưa được tuyên bố đã kiểm

- Chưa triển khai/test Auth guard JWT/SDK/MFA, worker HTTP, inbox callback provider hoặc giá/kỳ thu phí. Session/outbox là foundation cùng contract để triển khai tiếp, không phải chức năng hoàn chỉnh.
- Chưa kiểm migration trên Supabase thật, custom user qua pooler hoặc quyền tạo capability role trên staging. Auth inventory được kiểm bằng catalog giả lập có thêm bảng/enum ngoài projection, chưa chạy trên Supabase thật.
- Chưa có EXPLAIN/load benchmark, kiểm hiệu năng backfill lớn, restore/PITR hay cleanup dữ liệu đa hệ thống. Các MEDIUM ở review `09` không tự được đóng vì HIGH đợt 1 đã được xử lý.
- Không kết luận delivery retry/pause race hoặc billing history đã được giải quyết cho sản phẩm đầy đủ: F06/F07/F09 được loại khỏi scope và gate ghi; chỉ mở bằng thiết kế/migration tiếp theo sau xác nhận.

Kết luận: có bằng chứng kỹ thuật để tiếp tục implementation **scope DB đợt 1**, theo các điều kiện của tài liệu `10`. Chưa phê duyệt production hoặc toàn bộ EP01–EP10.
