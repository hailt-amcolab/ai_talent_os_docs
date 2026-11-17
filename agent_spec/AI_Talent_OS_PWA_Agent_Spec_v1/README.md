> Bổ sung triển khai demo 18/11/2026: [hợp đồng đã kiểm chứng](../auth-pwa-demo/IMPLEMENTATION.md), [AC](../auth-pwa-demo/AC.md), [test/evidence](../auth-pwa-demo/VALIDATION.md). Trong scope demo, Bearer theo TECH_STACK và PWA scope `/pwa/` ưu tiên hơn ví dụ cookie SSR/root scope cũ bên dưới. Các ca cũ không tự được chuyển thành PASS.

# AI Talent OS — Bộ triển khai Talent PWA v1

> **17/11/2026:** phần nền tảng PWA (cài lên màn hình chính, thông báo đẩy, service worker, cập nhật phiên bản) nay ở [`../pwa-platform-spec/PWA_PLATFORM_SPEC_VI.md`](../pwa-platform-spec/PWA_PLATFORM_SPEC_VI.md). Các tính năng nghiệp vụ F01–F20 của bộ này đã có trong `SCD/`; bộ này chỉ còn dùng để tham khảo.


Bản 1.1 · 17/11/2026. PWA dành cho Talent; backend dependencies kèm contract; không chứa app đã code. Bản 1.1 đã đối chiếu lại với [YK2] v2 (`AI育成OS_概要要件定義書_v2.docx`), [AG] (`アプリ画面案_AI育成OS.pdf`) và `SCD/`; xem `../KET_QUA_KIEM_CHUNG_17-11.md`.

## Thứ tự đọc

1. PWA_IMPLEMENTATION_SPEC_VI.md: phạm vi, nguồn, bảng nối F-ID ↔ chức năng [YK2] ↔ màn [AG] ↔ SCD (mục 1.2), 20 tính năng, state theo hình 5-1, cache/quyền, kiến trúc, 18 quyết định và POC.
2. API_ENDPOINTS.md: NEW/REUSE endpoints, input/output và policy; đọc X01–X05 trước ghép Upload-Post/OneDrive.
3. FEATURE_SCREEN_MATRIX.json: feature -> route/API/source/test.
4. API_CONTRACTS.schema.json: 22 schema nội bộ; CONTRACT_EXAMPLES.json: payload mẫu giả lập, không phải dữ liệu khách.
5. TEST_CASES_VI.md / TEST_CASES.json: 116 ca nghiệm thu (92 theo tính năng, 24 dùng chung), tất cả NOT_RUN.
6. PWA_CACHE_POLICY.json / manifest.example.json: cache allowlist và manifest dự kiến; icons chưa có.
7. SOURCE_MANIFEST.json / VALIDATION.md: nguồn, giới hạn và kiểm tra artifact.

## Prompt giao việc cho coding agent

Đọc mục 1, 3, 7, 12, 13 và file `SCD/` tương ứng trước. Chọn một F-ID, nêu case IDs và quyết định đang chặn. Dựng mock khi provider/policy chưa chốt; giữ cờ CĐ tắt production. Dùng contracts làm runtime validation, cùng domain services đã có cho Upload-Post/OneDrive. Mỗi slice phải đầy đủ UI states, auth/ownership/capability, idempotency và concurrency. Không auto retry publish/charge bằng key mới khi unknown, không cache private API/HTML/RSC, không đưa secret provider vào browser. Báo rõ test đã thực chạy với evidence; không đổi NOT_RUN thành Passed vì chỉ đọc tài liệu.

## Phạm vi và baseline

Nguồn chính là [YK2] v2 và [AG]; docx v1 đã bị thay thế. Kết nối SNS dùng Connect API là quyết định của đội, khác trang 48 giờ trong [YK2] §6-10 chức năng 8-2, cần khách đồng ý. Manager admin là phụ thuộc, không là phạm vi UI Talent. Đăng nhập bằng email và mật khẩu ([YK2] §6-1); không có OTP. Giá/quota từ server, không lấy giá mẫu trong ảnh. Bộ này không bao gồm ZIP Upload-Post/OneDrive hoặc bản gốc khách; dùng hai bộ đó cùng nhau khi triển khai.
