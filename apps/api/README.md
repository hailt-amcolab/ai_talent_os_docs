# talent-api: BE

Node.js 22 + TypeScript + Hono (`@hono/zod-openapi`) + Prisma (Supabase Postgres), chạy bằng PM2. FE không có API; mọi API nằm ở đây. Base có `GET /health`; khi bật demo có thêm Auth/TOTP, self-registration và push đa thiết bị/chéo tài khoản. Kiến trúc, quy ước và cách thêm module: [agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md](../../agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md).

Baseline DB đợt 1: [scope đã chốt](../../database-design/10_confirmed_scope_and_remediation.md). Dùng LOGIN runtime riêng kế thừa `talent_runtime`, không dùng migration owner; xem [PRISMA.md](PRISMA.md) trước cấu hình. Demo hiện tại chỉ kiểm chứng công nghệ Auth/TOTP/PWA, không có approval, roles hay worker; nghiệp vụ chưa chốt vẫn bị gate. Xem [runbook demo](../../agent_spec/auth-pwa-demo/RUNBOOK.md) và [AC/test evidence](../../agent_spec/auth-pwa-demo/VALIDATION.md).

```bash
npm ci
cp .env.example .env     # DATABASE_URL, DIRECT_URL (xem PRISMA.md)
npm run dev              # http://localhost:8080; Node chạy thẳng tệp .ts, tự chạy lại khi sửa
```

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy máy lập trình |
| `npm test` | Kiểm thử (`node --test 'src/**/*.test.ts'`); một tệp: `node --test src/http/app.test.ts` |
| `npm run typecheck` | Kiểm kiểu |
| `npm run build` && `npm start` | Biên dịch ra `dist/` rồi chạy |
| `npx pm2 start ecosystem.config.cjs` | Chạy bằng PM2 trên VPS không dùng Docker (sau `npm run build`) |
| `npm run db:check`, `db:status`, `db:migrate` | Xem [PRISMA.md](PRISMA.md) |
