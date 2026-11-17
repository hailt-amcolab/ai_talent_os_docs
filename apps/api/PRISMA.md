# Prisma và Supabase PostgreSQL

Prisma ORM 7.10.1 với `@prisma/adapter-pg`. Mỗi tiến trình một client (một pool), tạo trong `src/container.ts`. Schema ở `prisma/schema.prisma`; **chỉ Prisma Migrate** thay đổi cấu trúc. Schema có 25 model, sinh bằng `prisma db pull` từ migration đầu (thiết kế ở `database-design/`).

## Kết nối

`apps/api/.env` (không commit):

```dotenv
DATABASE_URL="postgresql://postgres.PROJECT_REF:ENCODED_PASSWORD@POOLER_HOST:6543/postgres"   # runtime: transaction pooler
DIRECT_URL="postgresql://postgres.PROJECT_REF:ENCODED_PASSWORD@POOLER_HOST:5432/postgres"     # migration: session pooler hoặc direct
DATABASE_POOL_MAX=5
```

Kết nối tới Supabase luôn kiểm CA và tên máy chủ; CA công khai ở `certs/supabase-ca.crt` (đổi bằng `DATABASE_CA_CERT`). Không đặt `rejectUnauthorized: false`. Migration không được dùng cổng 6543 (`src/infra/database/config.ts` chặn).

## Lệnh (trong `apps/api`)

| Lệnh | Việc |
|---|---|
| `npm run db:check` | Chỉ thử kết nối (`{"connected":true}`), không in URL hay mật khẩu |
| `npm run db:status` | Xem migration nào chưa áp dụng |
| `npm run db:migrate` | `prisma migrate deploy` qua `DIRECT_URL` |
| `npx prisma migrate dev --name <tên>` | Tạo migration mới từ schema (chỉ trên DB phát triển) |
| `npm run prisma:generate` | Sinh client vào `src/generated/prisma` (không commit; dev/build/test tự chạy) |

## Migration

Đã áp lên Supabase dev ngày 17/11/2026:

| Migration | Nội dung |
|---|---|
| `20261117000000_init` | 25 bảng theo `database-design/04` §2: CHECK, chỉ mục, trigger `updated_at`, trigger chỉ thêm cho 2 bảng nhật ký, khóa ngoại tới `auth.users` (có điều kiện), RLS và thu hồi quyền, một dòng `system_settings` |
| `20261117000100_lock_prisma_migrations` | Bật RLS, thu hồi quyền `anon`, `authenticated` ở `_prisma_migrations` (Supabase cấp sẵn cho mọi bảng mới) |
| `20261117000200_auth_ref_by_trigger` | IR-03 đổi sang cách (c): bỏ 2 khóa ngoại tới `auth.users`, thay bằng trigger chặn xóa người dùng Auth còn được `managers`, `talents` tham chiếu; bỏ quyền mặc định của `anon`, `authenticated` ở `public`; trigger sự kiện tự bật RLS cho mọi bảng mới trong `public` |

**Tạo migration mới** (quy trình Prisma bình thường, chạy thẳng trên Supabase dev):

1. Sửa model trong `schema.prisma`.
2. `npx prisma migrate dev --create-only --name <tên>`: Prisma tự tạo DB tạm trên cùng máy chủ để sinh SQL.
3. Thêm tay vào SQL những gì Prisma không diễn đạt được: CHECK, trigger `updated_at` (`CREATE TRIGGER trg_<bảng>_updated_at BEFORE UPDATE ON <bảng> FOR EACH ROW EXECUTE FUNCTION set_updated_at();`), chỉ mục theo biểu thức. Không xóa những thứ này khỏi các migration cũ.
4. `npx prisma migrate dev` (áp lên dev và sinh client). Môi trường khác dùng `npm run db:migrate`.

RLS và quyền **không cần viết tay** nữa: bảng mới trong `public` tự bật RLS (trigger sự kiện `evt_enable_rls_on_new_table`) và không có quyền cho `anon`, `authenticated` (quyền mặc định đã bỏ). Kiểm sau khi áp:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND NOT rowsecurity;                                -- phải rỗng
SELECT table_name FROM information_schema.role_table_grants
 WHERE table_schema = 'public' AND grantee IN ('anon', 'authenticated');                                          -- phải rỗng
```

**Tham chiếu tới người dùng Auth** (`managers.auth_user_id`, `talents.auth_user_id`) không có khóa ngoại: BE tạo người dùng Auth trước rồi ghi đúng `id` được trả về; trigger `trg_auth_users_block_referenced_delete` chặn xóa người dùng Auth còn được tham chiếu. Không thêm khóa ngoại sang schema `auth`: Prisma sẽ báo lỗi P4002 và `migrate dev`, `db pull` ngừng chạy.

Không tạo policy cho `anon`, `authenticated`. BE kết nối bằng role của Postgres (owner), không bị RLS chặn. Nguồn: [Supabase + Prisma](https://supabase.com/docs/guides/database/prisma), [SSL](https://supabase.com/docs/guides/platform/ssl-enforcement).
