# Chạy bằng Docker Compose

Chạy ở thư mục gốc, cần Docker và Compose v2. Gồm `migrate` (Prisma Migrate, chạy một lần), `api` (BE, PM2), `web` (FE). `db` là PostgreSQL local tùy chọn. Không có Caddy: chạy local bằng HTTP. Cấu trúc và công nghệ: [agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md](agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md).

## Lần đầu

```bash
cp .env.example .env                  # giá trị dùng chung: URL API cho trình duyệt, CORS, khóa công khai VAPID
cp apps/api/.env.example apps/api/.env  # DATABASE_URL, DIRECT_URL của Supabase (xem apps/api/PRISMA.md)
docker compose up -d --build
curl --fail http://localhost:8080/health   # {"ok":true,"database":"up"}
```

- FE: http://localhost:3000/home · BE: http://localhost:8080 · tài liệu API khi chạy `npm run dev`: http://localhost:8080/openapi.json
- Cổng chỉ mở trên `127.0.0.1`.
- `migrate` chạy xong thì `api` mới khởi động; `api` khỏe (`/health`) thì `web` mới khởi động. API không tự chạy DDL.
- Các tệp `.env` không được chép vào image.

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
