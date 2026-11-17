# Ví dụ là mã thực thi

| Tích hợp | File mẫu đang build/test |
|---|---|
| Inject adapter/service | `apps/api/src/container.ts` |
| Đăng ký, login, state, TOTP | `apps/api/src/modules/auth/{routes,schemas,service,repository}.ts` |
| Supabase SDK/REST, parser SVG XML/comment | `apps/api/src/infra/auth/supabase.ts` + `.test.ts` |
| Multi-device/cross-account Web Push | `apps/api/src/modules/pwa/service.ts`, `src/infra/push/sender.ts` |
| Endpoint validation/SSRF | `apps/api/src/infra/push/endpoint.ts` |
| FE API kiểu từ OpenAPI | `apps/web/lib/api/{auth,pwa,client}.ts` |
| PWA permission + BE persist | `apps/web/components/pwa/PushToggle.tsx` |
| UI gửi theo mã người nhận | `apps/web/components/demo/Dashboard.tsx` |
| SW background push/offline/click | `apps/web/public/sw.js` + `lib/pwa/sw.test.ts` |
| Test A gửi hai devices của B | `apps/api/src/modules/auth/technology.integration.test.ts` |
| Auth/TOTP thật trong browser | `apps/web/e2e/auth-pwa-demo.mts` |

Không nhân đôi SDK mẫu không được test. BE giữ secret, FE chỉ publishable key. Cần minh họa request: dùng OpenAPI sinh từ controller, không tự sửa schema.d.ts.
