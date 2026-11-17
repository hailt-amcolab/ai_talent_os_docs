# 5-4 Đếm số lần tạo video và thu gộp với phí tháng

| Mục | Giá trị |
|---|---|
| Module | EP08 – Thu phí |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-3, chức năng 5-4; §5-4 (hình 5-3); UC-06 前提 (tiền đề) |
| Màn hình [AG] | T-11, T-12, T-15; M-06, M-10 (今月のご利用: 動画生成回数) |
| Tên trong mã nguồn | Video Usage Billing |
| Mức sẵn sàng | 🔴 Đỏ – chưa có đơn giá; chưa rõ đơn giá cố định hay theo chi phí thật (B9); chưa có chỗ nhập đơn giá (S08-06) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ❌ đơn giá, B9 | ✅ | ⚠ S08-06 | ⚠ GMO (1-1) | ⚠ đội đề xuất | ⚠ 5-1, 1-1 |

## Mục đích

Hiện đơn giá mỗi lần tạo video trên màn tạo video. Tính một lần khi tài năng xác nhận yêu cầu; tạo lại cũng tính; dịch vụ tạo lỗi thì không tính. Cộng phí video của tháng vào phí tháng. Tài năng xem số lần và tổng tiền trong ứng dụng; quản lý xem theo từng tài năng; tài khoản công ty chỉ đếm, không thu (§6-3 chức năng 5-4).

## Luồng chính

1. 5-1 tạo một lần tạo, lưu `unit_price_jpy` tại thời điểm yêu cầu, `billable = true`.
2. Lỗi phía dịch vụ hoặc quá 15 phút (S05-08): `billable = false`.
3. Tổng tháng = số lần `billable` trong tháng × đơn giá đã lưu ở từng lần (B9: đơn giá cố định).
4. T-11, T-12: số lần tháng này; T-15: tổng dự kiến (phí tháng + phí video).
5. M-06, M-10: số lần và tiền tháng này của từng tài năng; tài khoản công ty hiện số lần, không có tiền phải thu.
6. Ngày thu (1-1): đưa phí video tháng trước vào hóa đơn.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đổi đơn giá giữa tháng | Lần tạo trước đó giữ giá cũ | [Đề xuất nội bộ] |
| Quản lý tạo thay | Tính cho tài năng đó, ghi người bấm | B8 |
| Lần tạo bắc qua cuối tháng | Tính vào tháng của thời điểm yêu cầu | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Tính từ lần đầu, không có lượt miễn phí, không có trần tháng | — | Chốt | §5-4 |
| Tạo lại cũng tính; dịch vụ lỗi không tính | — | Chốt | §5-4, §6-3 |
| Đơn giá | アデッソ quyết | ❌ chưa có | UC-06 前提 |
| Cảnh báo "số tiền thu có thể khác" | Bỏ nếu đơn giá cố định | Đề xuất | B9 |
| Chỗ nhập đơn giá | M-17, một mức chung | Đề xuất | S08-06 |

## Dữ liệu

`video_jobs` (5-1): `billable`, `unit_price_jpy`, `requested_at`. `invoices` (1-1): `video_count`, `video_jpy`. Đơn giá: cài đặt chung (C-02).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho 3 lần tạo, 1 lần lỗi, đơn giá 500, thì T-15 hiện phí video 1.000 yên và M-10 hiện 2 lần.
2. Cho đổi đơn giá từ 500 sang 600 giữa tháng, thì lần trước giữ 500, lần sau 600.
3. Cho tài khoản công ty tạo 4 lần, thì M-06 hiện 4 lần và không có hóa đơn.

## Phụ thuộc

5-1, 1-1, C-02.

## Câu hỏi mở

Các 確認 liên quan (không xử lý ở đây): 確認49, 51.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| — | Đơn giá mỗi lần | Có | Hiện "¥—" |
| B9 | Đơn giá cố định, bỏ cảnh báo | Có | Cố định |
| S08-06 | Nhập đơn giá ở M-17 | Không | Như đề xuất |
| B8 | Quản lý tạo thay thì tính cho tài năng | Không | Như B8 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP08: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-4 (hình 5-3), §6-3 (5-4), UC-06 前提, 確認49, 51. [AG] trang 4 (T-11, T-12), trang 5 (T-15), trang 8 (M-10).

## Cập nhật theo Q&A (bản ngày 15/11/2026)

- Q&A No.1, No.3 (đã chốt): đếm lúc gửi yêu cầu, tạo lại cũng tính, lỗi phía dịch vụ không tính; không lượt miễn phí, không trần. CR-09: video quản lý tạo thay tính cho tài năng đó.
- Q&A No.62 (đang hỏi): tính theo đơn giá tại lúc gửi yêu cầu; lượt lỗi trừ ngay khi dịch vụ báo lỗi.
