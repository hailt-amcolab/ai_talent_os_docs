# 8-8 Ghi số liệu vào file

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-11, chức năng 8-8; §7-2; §7-5 |
| Màn hình [AG] | Không có |
| Tên trong mã nguồn | Metrics Write-back |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; định dạng file là đề xuất (S07-03) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ⚠ S07-03 | ✅ không cần màn | ⚠ S02-02 | ⚠ đội đề xuất | ⚠ 8-7, 2-2 |

## Mục đích

Ghi số liệu đã lấy vào file trong thư mục tài năng, để AIコーチ dùng từ sáng hôm sau (§6-11 chức năng 8-8). Kết quả được lưu trong thư mục tài năng theo §7-2.

## Luồng chính

1. Sau 8-7, với mỗi tài năng, tạo hai file trong `実績/` (S07-03):
   - `サマリー.md` (ghi đè mỗi ngày): số người theo dõi từng mạng và tổng, mức tăng 7 ngày và 30 ngày, các bài 30 ngày gần nhất kèm chỉ số, 3 bài tốt nhất. AI đọc file này (2-1).
   - `YYYY-MM.csv` (thêm dòng mỗi ngày): số liệu thô theo ngày, để quản lý mở bằng Excel.
2. Ghi file có kiểm tra phiên bản.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Ghi OneDrive lỗi | Thử lại; lô buổi sáng vẫn dùng số liệu trong cơ sở dữ liệu | §9-3 |
| Quản lý sửa tay `サマリー.md` | Bị ghi đè lần sau; ghi rõ ở đầu file "file do hệ thống tạo, không sửa" | [Đề xuất nội bộ] |

## Dữ liệu

Đọc `follower_snapshots`, `post_metrics` (8-7). Ghi file trong `実績/` (cấu trúc thư mục ở 2-2).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Sau lần lấy số liệu sáng nay, thì `サマリー.md` có số người theo dõi hôm nay.
2. Sau 3 ngày, thì `YYYY-MM.csv` của tháng có 3 dòng cho mỗi mạng.
3. Cho OneDrive lỗi, thì tin buổi sáng vẫn có số liệu hôm qua.

## Phụ thuộc

8-7, 2-2, 2-1.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S07-03 | Định dạng file kết quả | Không | Như trên |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP07: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-11 (8-8), §7-2, §7-5, §9-3.
