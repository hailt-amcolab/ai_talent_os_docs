# 6-7 Số liệu và mức đạt cho tài năng

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-11, chức năng 6-7; UC-09 |
| Màn hình [AG] | T-06 (người theo dõi, 続けて投稿), T-13 (số liệu từng bài) |
| Tên trong mã nguồn | Talent Performance View |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; [AG] thiếu chỗ hiện diễn biến người theo dõi (S07-05) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠ 確認22 | ✅ | ⚠ S07-05 | ✅ | ⚠ đội đề xuất | ⚠ 8-7 |

## Mục đích

Ứng dụng tài năng hiện: số liệu từng bài, số ngày đăng liên tục, diễn biến số người theo dõi, còn bao nhiêu tới mục tiêu (§6-11 chức năng 6-7). Chỉ số liệu của chính mình, không xếp hạng (giả định 確認40).

## Luồng chính

1. **T-13 (số liệu từng bài):** mỗi bài đã đăng hiện lượt xem, lượt thích, bình luận (cộng cả các mạng); chạm vào thì thấy từng mạng (S07-09).
2. **T-06:** "続けて投稿 N日" (số ngày đăng liên tục); khối người theo dõi và mục tiêu (3-10).
3. **Diễn biến người theo dõi:** chạm vào một mạng ở T-06 thì mở biểu đồ đường 30 ngày (S07-05).
4. **Còn bao nhiêu tới mục tiêu:** hiện dưới từng mạng ("あと 6,900人").

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Bài mới đăng chưa có số liệu | Hiện "—" và "số liệu cập nhật vào sáng mai" | S07-02 |
| Bài đăng ngoài hệ thống | Hiện trong T-13 với nhãn "SNS から投稿" | UC-09 |
| Mỗi mạng gọi "lượt xem" khác nhau | Cộng theo chỉ số tương ứng; giải thích ở màn chi tiết từng mạng | S07-09 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Ngày đăng liên tục: ngày có ít nhất 1 bài thành công; một ngày không đăng thì tính lại | Giả định; khách quyết khi vận hành ([KS] 確認22) | — |
| Chỉ dữ liệu của mình, không xếp hạng | Giả định (確認40) | 1-5 |
| Bài ngoài hệ thống cũng tính | Chốt | UC-09 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bài có IG 800 lượt xem, TT 440, thì T-13 hiện 1,240 và chạm vào thấy từng mạng.
2. Cho tài năng đăng 5 ngày liền, thì T-06 hiện 続けて投稿 5日.
3. Cho chạm vào Instagram ở T-06, thì thấy biểu đồ 30 ngày.
4. Tài năng A không gọi được API số liệu của tài năng B.

## Phụ thuộc

8-7, 8-3, 3-10, 2-4.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認22, 40.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S07-05 | Biểu đồ diễn biến người theo dõi | Không | Chạm vào mạng ở T-06 |
| S07-09 | T-13 cộng số liệu các mạng | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP07: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-11 (6-7), UC-09, 確認22, 40. [AG] trang 3 (T-06), trang 5 (T-13).
