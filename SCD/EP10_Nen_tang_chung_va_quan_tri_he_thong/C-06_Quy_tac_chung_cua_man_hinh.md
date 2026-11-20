# C-06 Quy tắc chung của màn hình

## Đối chiếu nguồn hiện hành — 20/11/2026

T19 có 19 màn, M19 có 21 màn; đăng nhập xong mở Mypage; thanh điều hướng 5 mục Home/AI/tư liệu/lịch/Mypage; chuông ở Home/Mypage. Số/chữ/tên trong hình là minh họa.

Mục lục các PDF và KS có số trang cũ; trích trang PDF thực tế, không dùng số màn AG/18 thay cho 19.

Căn cứ: `T19:1,32,33;M19:1,4` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0553;EV-0584;EV-0585;EV-0586;EV-0589`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP10 – Nền tảng chung và quản trị hệ thống |
| Mã | C-06 (mã nội bộ) |
| Mục [YK2] | §6-14; §9-1 |
| Màn hình [AG] | Toàn bộ |
| Mức sẵn sàng | 🟡 Vàng – chờ khách gửi logo, mã màu; chờ chốt bộ mã màn hình (A10) |

## Quy tắc [Chốt, §6-14]

1. Ưu tiên dễ dùng hơn đẹp. Căn cứ là định nghĩa màn hình và màn hình thật khách đã xem.
2. Tham khảo thiết kế của アデッソ. Những chỗ thiết kế còn nội dung cũ (LINE, lượt video miễn phí, trần phí tháng, không có trả lại khi duyệt, quyền dừng toàn bộ riêng) thì làm theo [YK2].
3. Ứng dụng tài năng giống Instagram; từ マイページ (trang của tôi) đi tới các màn khác. Nhân vật AIコーチ là "モモ" của アデッソ.
4. Dùng tên, logo, màu của ứng dụng アデッソ hiện có; khách gửi ảnh logo và mã màu.
5. Lỗi, không có dữ liệu, đang tải: luôn hiện rõ đang có chuyện gì.
6. Màn hình quản trị dùng trên máy tính là chính, trên điện thoại phải dễ xem (§9-1, [AG] trang 11).

## Quy ước của đội [Đề xuất nội bộ]

- **Mã màn hình:** dùng bộ mã [AG] (T-01〜T-15, M-01〜M-19) trong mã nguồn và tài liệu (A10). Bảng đối chiếu ở [file 10 mục 8.1](../../Phan_tich/10_Giao_dien.md).
- **Ngôn ngữ giao diện:** tiếng Nhật.
- **Màu, cỡ chữ:** đặt thành biến dùng chung (design token) để đổi một chỗ khi có mã màu của khách.
- **Cơ bản về khả năng tiếp cận:** nút đủ lớn để chạm, chữ đủ tương phản, ảnh có mô tả.

## Ngoài phạm vi (lần này)

- Cho tài năng chọn nhân vật khác ngoài モモ: §6-14 chỉ ghi "検討します" (sẽ xem xét), chưa phải yêu cầu (S10-03).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Mọi màn có trạng thái đang tải, lỗi, không có dữ liệu.
2. Đổi một biến màu chính thì toàn bộ ứng dụng đổi theo.
3. Màn hình quản trị dùng được ở chiều rộng 375px không phải kéo ngang.

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP10: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-14, §9-1. [AG] trang 1 (danh sách màn), trang 11. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A10.
