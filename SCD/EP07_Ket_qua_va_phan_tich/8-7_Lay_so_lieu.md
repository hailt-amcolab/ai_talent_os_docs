# 8-7 Lấy số liệu

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-11, chức năng 8-7; UC-09, UC-09 前提 (tiền đề) |
| Màn hình [AG] | Không có màn riêng; số liệu hiện ở T-06, T-13, M-06, M-07, M-08 |
| Tên trong mã nguồn | Metrics Collection |
| Mức sẵn sàng | 🔴 Đỏ – chưa biết Upload-Post trả về những chỉ số nào; điều này quyết định cấu trúc dữ liệu (kiểm chứng mục 9 ở EP06) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠ S07-01, S07-02 | ❌ chỉ số chưa biết | ✅ | ❌ kiểm chứng | ⚠ đội đề xuất | ⚠ 8-2, 8-3 |

## Mục đích

Mỗi ngày một lần, lấy từ Upload-Post số liệu của từng bài và số người theo dõi của từng mạng. Lấy lỗi thì lấy lại ở lần sau. Chỉ lấy những chỉ số Upload-Post có (§6-11 chức năng 8-7, UC-09 前提).

## Luồng chính

1. Lịch chạy mỗi ngày lúc 4:00 (tham số), xong trước lô buổi sáng (5:00, file 18) (S07-02).
2. Với mỗi tài năng ở 利用中 và mỗi mạng đã kết nối:
   - lấy số người theo dõi, lưu thành một dòng theo ngày;
   - lấy chỉ số các bài trong 30 ngày gần nhất (S07-01): lượt xem, lượt thích, bình luận và các chỉ số khác Upload-Post có. Lưu bản mới nhất cho mỗi bài và mỗi mạng.
3. Bài tài năng tự đăng ngoài hệ thống: nếu Upload-Post đọc được thì lưu thành bài có nguồn "ngoài hệ thống", tính là ngày có đăng (UC-09).
4. Ghi thời điểm lấy để các màn hiện "số liệu tính đến …" (S07-02).
5. Xong thì đưa việc "ghi vào file" (8-8) và "kiểm tra đạt mục tiêu" (3-7) vào hàng đợi.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Lấy lỗi cho một tài năng hoặc một mạng | Bỏ qua lần này, lấy lại ở lần sau; ghi nhật ký xử lý | §6-11 |
| Upload-Post ngừng cả ngày | Màn hình vẫn hiện số cũ kèm thời điểm; lô buổi sáng dùng số cũ | §9-3 |
| Mạng mất kết nối | Không lấy được mạng đó; 8-6 báo | 8-6 |
| Chạy chưa xong trước giờ lô buổi sáng | Lô buổi sáng dùng số có được; cảnh báo đội vận hành | file 18 mục 8 |
| Số người theo dõi giảm | Lưu đúng số thật | — |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Tần suất | 1 lần mỗi ngày | Chốt | §6-11, UC-09 前提 |
| Giờ chạy | 4:00 | Tham số | S07-02 (thay đề xuất 6:00 của C5) |
| Số ngày cập nhật số liệu bài | 30 ngày | Tham số | S07-01 |
| Chỉ số lấy | Những gì Upload-Post có | Chốt | UC-09 前提 |

## Dữ liệu [Đề xuất nội bộ]

- `follower_snapshots`: `talent_id`, `platform`, `date`, `followers`, `fetched_at`.
- `post_metrics`: `post_id`, `platform`, `views`, `likes`, `comments`, `shares`, `raw` (JSON giữ nguyên các chỉ số khác), `fetched_at`. Cột cụ thể chốt sau khi kiểm chứng.
- `posts.source`: `system` hoặc `external`.

## Tích hợp

Upload-Post: API lấy số liệu (kiểm chứng: chỉ số nào, theo bài hay theo tài khoản, giới hạn tốc độ, có đọc được bài ngoài hệ thống không).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng nối 3 mạng, thì sau lần chạy có 3 dòng số người theo dõi cho hôm nay.
2. Cho bài đăng hôm qua, thì có số liệu cho từng mạng đã đăng.
3. Cho Upload-Post lỗi với tài năng A, thì tài năng khác vẫn có số liệu, và lần sau A được lấy lại.
4. Cho bài tài năng tự đăng ngoài hệ thống mà Upload-Post đọc được, thì bài đó có trong danh sách và ngày đó tính là có đăng.

## Phụ thuộc

8-2, 8-3, kiểm chứng Upload-Post.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| — | Chỉ số Upload-Post có | Có | Lưu cột cơ bản và JSON gốc |
| S07-01 | Cập nhật số liệu bài trong 30 ngày | Không | 30 ngày |
| S07-02 | Giờ lấy 4:00, hiện thời điểm lấy | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP07: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-11 (8-7), §9-3, UC-09, UC-09 前提. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) C5. [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 6.
