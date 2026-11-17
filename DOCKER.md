# Chạy bằng Docker Compose

Chạy ở thư mục gốc, cần Docker và Compose v2. Gồm `migrate` (Prisma Migrate, chạy một lần), `api` (BE, PM2), `web` (FE). `db` là PostgreSQL local tùy chọn. Không có Caddy: chạy local bằng HTTP. Cấu trúc và công nghệ: [agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md](agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md).

## Lần đầu

DB đợt 1 có migration sửa bảo mật và chặn phần chưa chốt: đọc [scope](database-design/10_confirmed_scope_and_remediation.md) trước khi nâng cấp. `DATABASE_URL` phải là LOGIN riêng kế thừa `talent_runtime`; `DIRECT_URL` là migration owner. Sau migrate, operator cấp capability cho LOGIN trước khi khởi động API. API từ chối dùng owner làm runtime. Không dùng cùng credential cho hai URL.

```bash
cp .env.example .env                  # giá trị dùng chung: URL API cho trình duyệt, CORS, khóa công khai VAPID
cp apps/api/.env.example apps/api/.env  # DATABASE_URL, DIRECT_URL của Supabase (xem apps/api/PRISMA.md)
docker compose run --build --rm migrate
# Operator tạo LOGIN runtime riêng và GRANT talent_runtime theo apps/api/PRISMA.md;
# điền DATABASE_URL với credential đó trước khi khởi động API.
docker compose up -d --build
curl --fail http://localhost:8080/health   # {"ok":true,"database":"up"}
```

- FE: http://localhost:3000/home · BE: http://localhost:8080 · tài liệu API khi chạy `npm run dev`: http://localhost:8080/openapi.json
- Cổng chỉ mở trên `127.0.0.1`.
- `migrate` chạy xong thì `api` mới khởi động; `api` khỏe (`/health`) thì `web` mới khởi động. API không tự chạy DDL.
- Các tệp `.env` không được chép vào image.
- `db` local trên volume mới nạp Auth stub/role client từ `apps/api/prisma/local/bootstrap.sql`; volume cũ cần bootstrap local rõ ràng trước migrate. Stub không phải Supabase Auth và không phục vụ thử đăng nhập/MFA thật.

## Thử trên điện thoại

Thông báo đẩy và cài PWA cần HTTPS. Mở đường hầm HTTPS (ngrok…) cho **cả** FE (cổng 3000) và BE (cổng 8080), rồi:
1. Đặt `PUBLIC_API_URL` = URL HTTPS của BE; thêm URL HTTPS của FE vào `CORS_ORIGINS` (cả hai trong `.env` gốc).
2. `docker compose up -d --build web api` (FE phải build lại vì `NEXT_PUBLIC_API_URL` gắn lúc build).

## Lệnh thường dùng

```bash
docker compose logs -f api web
docker compose exec api node_modules/.bin/pm2 list
docker compose up -d --build      # cập nhật bản mới
docker compose down               # không dùng -v nếu muốn giữ volume pg_data
```

## Demo công nghệ trên thiết bị khác

Demo hiện hành không cần worker/duyệt đơn. Xem [runbook](agent_spec/auth-pwa-demo/RUNBOOK.md): API_URL rỗng + gateway local3090 + một HTTPS tunnel cho cả FE/BE; thêm origin tunnel vào CORS và restart API. Hướng dẫn hai tunnel phía trên vẫn dùng được nếu API_URL là URL BE riêng. `DEMO_AUTO_CONFIRM_EMAIL=true` chỉ dev và cần secret key BE để self-register dùng ngay, không SMTP.
