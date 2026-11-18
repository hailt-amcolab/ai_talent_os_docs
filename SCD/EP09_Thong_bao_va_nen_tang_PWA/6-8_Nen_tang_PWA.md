# 6-8 Nền tảng PWA (ứng dụng web cài lên màn hình chính)

| Mục | Giá trị |
|---|---|
| Module | EP09 – Thông báo và nền tảng PWA |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-12, chức năng 6-8; §6-14; §9-1 |
| Màn hình [AG] | Toàn bộ T-xx; menu dưới (ホーム, チャット, 送る, 予定, マイページ) |
| Tên trong mã nguồn | PWA Foundation |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; màn mở đầu chờ B13, danh sách máy hỗ trợ chờ S09-04 |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ S09-04 | ✅ | ⚠ B13 | ✅ | ⚠ đội đề xuất | ⚠ C-06 (logo, màu) |

## Mục đích

Tài năng thêm ứng dụng vào màn hình chính từ trình duyệt, không cần kho ứng dụng. Mở ứng dụng thì màn đầu tiên cho thấy ngay việc hôm nay (§6-12 chức năng 6-8).

## Luồng chính

1. Tệp mô tả ứng dụng (manifest): tên, logo, màu của ứng dụng アデッソ hiện có (§6-14, C-06), chế độ `standalone`, biểu tượng các cỡ.
2. Service worker: lưu sẵn khung giao diện để mở nhanh; nhận thông báo đẩy (6-1).
3. Mở ứng dụng khi đã đăng nhập: vào T-07 ホーム (B13). Menu dưới năm mục theo [AG]; マイページ (T-06) là trung tâm điều hướng (§6-14).
4. Hướng dẫn thêm vào màn hình chính ở 6-2 bước 1.
5. Có bản mới: hiện "có bản mới, tải lại" (không tự tải lại giữa lúc tài năng đang nhập).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Mất mạng | Hiện khung giao diện và câu "オフラインです"; không gửi, không chấp nhận được | §6-14 (hiện trạng thái lỗi) |
| Trình duyệt không hỗ trợ | Hiện câu đề nghị dùng trình duyệt trong danh sách hỗ trợ | S09-04 |
| Đang tải | Hiện trạng thái đang tải | §6-14 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Không qua kho ứng dụng | — | Chốt | §6-12 |
| Màn đầu cho thấy việc hôm nay | T-07 | Chốt (màn cụ thể: B13) | §6-12 |
| Máy hỗ trợ | iPhone iOS 16.4 trở lên (Safari); Android, Chrome bản mới nhất và bản trước đó | Đề xuất | S09-04, §9-1 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho iPhone iOS 16.4, Safari, thì thêm được vào màn hình chính và mở ở chế độ toàn màn hình.
2. Cho mở ứng dụng khi đã đăng nhập, thì màn đầu là T-07.
3. Cho mất mạng, thì ứng dụng vẫn mở được khung và có câu báo mất mạng.
4. Chrome DevTools (Application → Manifest) không báo lỗi điều kiện cài. Lighthouse đã bỏ mục chấm điểm PWA từ bản 12, nên không dùng điểm Lighthouse.

## Phụ thuộc

C-06 (logo, màu), 6-1, 6-2.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B13 | Màn mở đầu | Không | T-07, đặt thành tham số |
| S09-04 | Máy và trình duyệt hỗ trợ | Không | Như bảng |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP09: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- Đặc tả kỹ thuật: [`agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md`](../../agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md) (manifest, service worker, cài đặt, thông báo đẩy); ca kiểm thử PW-01〜PW-20 ở `CA_KIEM_THU_VI.md` cùng thư mục.

- [YK2] §6-12 (6-8), §6-14, §9-1. [AG] trang 3 (menu dưới). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) B13.
