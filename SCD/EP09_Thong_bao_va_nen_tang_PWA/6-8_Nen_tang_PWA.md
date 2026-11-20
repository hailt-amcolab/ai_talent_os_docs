# 6-8 Nền tảng PWA (ứng dụng web cài lên màn hình chính)

## Đối chiếu nguồn hiện hành — 20/11/2026

Bắt buộc đăng ký phương thức thanh toán và mở từ biểu tượng màn hình chính; thêm biểu tượng bằng hướng dẫn thủ công theo máy. SNS và cho phép thông báo có thể làm sau. Thanh toán đăng ký xong tự kích hoạt, tạo folder và báo Manager; sau khởi tạo mở Mypage T-08, không phải Home T-09. Office bỏ bước thanh toán.

Cần kiểm thiết bị/PWA quay lại sau kết nối, không coi hình minh họa là kiểm chứng tương thích.

Căn cứ: `T19:5,6,8,9,11,26,33;BF19:4` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0557;EV-0558;EV-0560;EV-0561;EV-0563;EV-0578;EV-0585;EV-0616`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

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

1. Dùng PWA theo hướng dẫn thêm từ trình duyệt; không mô tả nút trên website sẽ tự cài app lên iPhone.
2. Chưa hoàn tất khởi tạo: T-06; xong khởi tạo: T-08 Mypage là nơi mở đầu, T-09 Home là màn việc hôm nay.
3. Điều hướng dưới: Home T-09, AI T-11, tư liệu T-13, lịch T-16/T-17, Mypage T-08. Chuông ở Home/Mypage mở T-18.
4. Màn chi tiết mở qua mũi tên quay lại, không mặc định có thanh dưới; thông báo thiết bị mở màn liên quan.
5. Service worker/cập nhật/offline và kiểm thiết bị là thiết kế đội, không coi bản vẽ là đã kiểm chứng. Căn cứ SD-T19 trang8–9,32–33.

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
