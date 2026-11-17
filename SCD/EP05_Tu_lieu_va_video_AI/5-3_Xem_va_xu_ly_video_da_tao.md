# 5-3 Xem và xử lý video đã tạo

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-8, chức năng 5-3 |
| Màn hình [AG] | T-12 |
| Tên trong mã nguồn | Video Review |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ✅ | ✅ | ✅ không có | ⚠ đội đề xuất | ⚠ 5-1, 5-4 |

## Mục đích

Tài năng phát video đã tạo trong ứng dụng, rồi chọn dùng cho bài, tạo lại, hoặc không dùng (§6-8 chức năng 5-3).

## Luồng chính

1. Mở T-12 từ thông báo "video đã xong" hoặc từ bản nháp.
2. Phát video. Hiện tên chủ đề và loại, số lần tạo và phí tháng này (5-4).
3. Ba nút:
   - この動画を投稿に使う (dùng cho bài): gắn video vào bản nháp, về T-09.
   - 作り直す（1回に数えます）(tạo lại, tính một lần): về T-11 với lựa chọn cũ.
   - 使わない (không dùng): về T-07; video vẫn ở danh sách tư liệu (S05-09).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Video tạo lỗi | T-12 hiện lý do và "không tính lần" | [AG] T-12, §6-8 |
| Bản nháp đã chấp nhận trước khi video xong | Không gắn tự động; video vào danh sách tư liệu | [Đề xuất nội bộ] |
| Dùng một video cho bản nháp khác về sau | Chọn ở thẻ 送ったもの (6-4), không tính lần thêm | S05-09 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Ba lựa chọn: dùng, tạo lại, không dùng | Chốt | §6-8 |
| Tạo lại tính một lần | Chốt | §6-3 chức năng 5-4 |
| Video không dùng vẫn được giữ | Đề xuất | S05-09 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bấm この動画を投稿に使う, thì T-09 hiện video đó.
2. Cho bấm 作り直す và xác nhận, thì số lần tháng này tăng 1.
3. Cho bấm 使わない, thì video vẫn có ở 送ったもの với nhãn AI.

## Phụ thuộc

5-1, 6-4, 4-1, 5-4.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S05-09 | Video không dùng vẫn giữ và dùng lại được | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP05: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-3 (5-4), §6-8 (5-3). [AG] trang 4 (T-12).
