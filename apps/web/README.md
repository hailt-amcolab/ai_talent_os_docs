# talent-web: ứng dụng tài năng (PWA)

Next.js 16 (App Router), **chỉ có giao diện**: không route API, không server action. Gọi BE qua `lib/api/client.ts` (`NEXT_PUBLIC_API_URL`). Base hiện có nền tảng PWA: manifest, service worker, hướng dẫn cài, bật thông báo đẩy trên máy, báo bản mới, trang mất mạng. Kiến trúc và quy ước: [agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md](../../agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md); PWA: [agent_spec/pwa-platform-spec/PWA_PLATFORM_SPEC_VI.md](../../agent_spec/pwa-platform-spec/PWA_PLATFORM_SPEC_VI.md).

Next.js 16 khác bản cũ: đọc `node_modules/next/dist/docs/` trước khi viết mã (xem `AGENTS.md`).

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL, NEXT_PUBLIC_VAPID_PUBLIC_KEY
npm run dev:https            # https://localhost:3000 (thông báo đẩy cần HTTPS)
```

| Lệnh | Việc |
|---|---|
| `npm run dev` / `npm run dev:https` | Chạy máy lập trình (HTTP / HTTPS) |
| `npm run build` && `npm start` | Build và chạy bản production |
| `npm run lint` | ESLint |
| `npm test` | Kiểm thử (`node --test 'lib/**/*.test.ts'`) |
| `npm run icons` | Tạo lại biểu tượng tạm |
