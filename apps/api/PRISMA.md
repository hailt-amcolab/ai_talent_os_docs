# Prisma và Supabase PostgreSQL

Prisma 7.10.1 + adapter-pg; mỗi tiến trình một pool. Baseline hiện hành: [scope đợt 1](../../database-design/10_confirmed_scope_and_remediation.md), SQL migration là nguồn thẩm quyền cho CHECK/trigger/ACL. `schema.prisma` có 31 bảng ứng dụng và projection id của `auth.users` do Supabase quản lý. Không sửa migration đã áp.

## Kết nối và quyền

```dotenv
# LOGIN riêng, chỉ kế thừa talent_runtime. Kiểm cú pháp custom user pooler ở staging.
DATABASE_URL="postgresql://talent_api.PROJECT_REF:ENCODED_RUNTIME_PASSWORD@POOLER_HOST:6543/postgres"
# Owner chỉ cho migration, tuyệt đối không dùng trong process API/worker.
DIRECT_URL="postgresql://postgres.PROJECT_REF:ENCODED_MIGRATION_PASSWORD@POOLER_HOST:5432/postgres"
DATABASE_POOL_MAX=5
```

Kết nối Supabase kiểm CA và hostname; không tắt verify. API startup kiểm capability và từ chối owner/role có thể nhận quyền elevated. `db:check` chỉ kiểm reachability, không chứng nhận an toàn của role hay Auth guard.

Migration tạo hai nhóm **NOLOGIN** `talent_runtime`, `talent_dispatcher`; không tạo mật khẩu. Operator cấp LOGIN riêng bằng secret manager, ví dụ cấu trúc quyền:

```sql
-- Chạy bằng operator; tạo LOGIN/mật khẩu bằng cơ chế secret của môi trường.
-- talent_api phải NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS,
-- không sở hữu object và không là member của owner/postgres/service_role.
GRANT CONNECT ON DATABASE postgres TO talent_api;
GRANT talent_runtime TO talent_api;
```

Tên database thực tế có thể khác postgres. Không cấp runtime cho migration owner để cố vượt startup check. Không tạo policy end-user cho anon/authenticated. Backend policy true chỉ dành cho role BE có DML allowlist; mọi service vẫn cần guard từ verified JWT và owner predicate. Runtime không TRUNCATE/DDL, log chỉ SELECT/INSERT, không truy cập bảng DEFERRED. Worker integrations chưa được mở; talent_dispatcher chỉ quản lý outbox lease và đọc operation.

## Lịch sử migration

| Migration | Nội dung | Tình trạng |
|---|---|---|
| 20261117000000_init | 25 bảng, CHECK/index/trigger/RLS, settings seed | Lịch sử đã áp theo tài liệu cũ |
| 20261117000100_lock_prisma_migrations | Khóa quyền migration metadata | Lịch sử đã áp theo tài liệu cũ |
| 20261117000200_auth_ref_by_trigger | Từng bỏ FK Auth, thêm delete trigger và RLS event trigger | Được thay cách bảo vệ Auth bởi migration tiếp |
| 20261117000300_confirmed_scope_foundation | FK Auth thật, ownership FK kép, session/principal, operation/outbox, invariant và version, role allowlist, gate phần chưa chốt | **Đã áp Supabase; xem database-design/12_supabase_deployment.md** |

Migration mới có preflight từ chối active publishing/video hoặc dữ liệu không đạt constraint; không tự xóa/sửa dữ liệu cũ. Phải dry-run và xử lý lỗi theo nghiệp vụ trước apply. Xem checklist cutover, backup/restore và giới hạn lock trong scope document.

## Auth external table và Prisma shadow

`prisma.config.ts` bật **preview** externalTables; `tools/prisma-safe.ts` đọc catalog tất cả bảng/view/enum trong schema Auth và truyền danh mục external đầy đủ vào Prisma. initShadowDb tạo stub `auth.users(id)` chỉ trong shadow. Prisma schema dùng public/app_private/auth; chỉ khai báo projection id cho Auth, không import toàn bộ Supabase schemas.

FK thật bảo vệ chiều INSERT/UPDATE/DELETE và đồng thời; không quay lại trigger một chiều để né tooling. Prisma không được CREATE/ALTER/DROP Auth tables. Review SQL diff mỗi lần và thử với Supabase staging trước production. Không chạy `prisma db push` hoặc `migrate reset` trên Supabase dùng chung.

Chỉ đánh dấu auth.users external là chưa đủ: bảng Auth khác có thể bị Prisma đề xuất DROP. Vì vậy config chặn schema planning trực tiếp không có inventory; dùng `npm run db:dev`, `npm run db:diff` hoặc `npm run db:pull`. db:pull chỉ --print, không ghi đè projection schema đã review. Không commit thêm bảng/enum Auth thành đối tượng Prisma quản lý. db push/migrate reset bị chặn trong config. Khi introspect FK kép có subset UNIQUE, Prisma có thể suy reverse relation một-một rồi validate đòi compound UNIQUE dư; giữ reverse relation dạng array cho FK kép, tính duy nhất thực do key đơn hiện có bảo vệ. Không thêm index trùng chỉ để thỏa lỗi suy luận của introspection.

## Phát triển và kiểm chứng

```sh
npm run prisma:validate
npm run typecheck
npm test
npm run db:status
npm run db:migrate
```

`db:migrate` = migrate deploy qua DIRECT_URL. Để tạo migration: sửa model, `npm run db:dev -- --create-only --name <ten>`, review SQL, thêm CHECK/trigger/ACL/index biểu thức mà Prisma không diễn đạt, rồi mới apply dev. RLS event trigger và default privileges không thay thế việc kiểm catalog và grants; default privileges phụ thuộc role tạo object.

Local Postgres sạch cần role anon/authenticated và stub Auth trước replay. Compose local-db mount `prisma/local/bootstrap.sql` vào initdb cho volume mới. Volume cũ chỉ bootstrap thủ công khi xác định rõ là local/test. **Không chạy bootstrap trên Supabase.** Nó không thay thế test Auth/MFA/Storage thật.

Integration suite chỉ chạy khi có **TEST_DATABASE_URL trỏ disposable DB đã replay migration**, không đọc DATABASE_URL/.env. Cần migration owner vì test kiểm cả dữ liệu sai/ACL và fixtures. Các test concurrency tạo rồi dọn fixture; SQL regression rollback toàn bộ. Không dùng database shared/prod.

```sh
# Điền URL disposable, không commit secret.
TEST_DATABASE_URL='postgresql://.../talent_disposable' npm test
# SQL có thể chạy độc lập (cùng disposable DB):
psql "$TEST_DATABASE_URL" -v ON_ERROR_STOP=1 -f prisma/tests/confirmed-scope.sql
```

Test tối thiểu gồm orphan Auth và delete/provision đồng thời, FK ownership/platform, application approved, CAS hai writer, outbox rollback/SKIP LOCKED/lease fencing, ACL và gate DEFERRED. Không coi mock Auth hoặc test Postgres local là bằng chứng đầy đủ cho Supabase thật.

Nguồn: [Prisma external tables](https://www.prisma.io/docs/orm/v7/prisma-schema/data-model/externally-managed-tables), [Supabase Prisma](https://supabase.com/docs/guides/database/prisma).

## Project hiện tại

Đã áp foundation migration và xác minh trên Supabase; apps/api/.env dùng LOGIN talent_api qua pooler 6543, DIRECT_URL giữ migration owner. Xem [báo cáo triển khai](../../database-design/12_supabase_deployment.md). Không sao chép credential dev sang môi trường khác; mỗi môi trường tạo LOGIN/secret riêng.

## Auth/PWA demo 18/11/2026

Migration `20261118000000_auth_pwa_demo` thêm 5 bảng private và session-owner binding cho push; tổng 36 bảng app (không tính `_prisma_migrations`/provider Auth). Đã replay local, dry-run rollback và deploy Supabase dev, diff không drift. Xem [hợp đồng](../../agent_spec/auth-pwa-demo/IMPLEMENTATION.md) và [evidence](../../agent_spec/auth-pwa-demo/VALIDATION.md). Các SQL reference cũ không thay thế migration hiện hành.

Scope demo đã thu gọn: migration `20261118000100_technology_demo` thêm 2 bảng tech private, tổng 38 bảng app. Code hiện hành không ghi thêm application/Manager/Talent và không dùng worker. Lịch sử migration cũ được giữ nguyên.
