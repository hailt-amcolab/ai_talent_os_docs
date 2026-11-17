# 8-9 Lấy khung giờ tương tác

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 低 (thấp) |
| Mục [YK2] | §6-11, chức năng 8-9; §12-3 |
| Màn hình [AG] | Không có |
| Tên trong mã nguồn | Engagement Time Collection |
| Mức sẵn sàng | 🔴 Đỏ – phụ thuộc hoàn toàn vào việc Upload-Post có số liệu theo khung giờ không. Mức 低 nên không bắt buộc lúc chạy thật (§12-3) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ | ✅ | ✅ | ❌ | ✅ | ❌ kiểm chứng | ⚠ | ⚠ 8-7 |

## Mục đích

Lấy khung giờ bài được xem và được tương tác, trong phạm vi Upload-Post có, làm đầu vào cho 8-1 (§6-11 chức năng 8-9).

## Luồng chính

1. Mỗi ngày, cùng lần chạy với 8-7, gọi `GET /api/uploadposts/best-times` cho từng tài năng và từng mạng (`timezone=Asia/Tokyo`). Lưu `by_hour` và `by_day_hour` kèm `confidence`, `sample`, `warnings`.
2. Với TikTok, lấy thêm `activity_by_hour` từ `GET /api/uploadposts/audience` (giờ người theo dõi hoạt động).
3. Với YouTube, Upload-Post không có chiều giờ: chỉ lưu `by_day`, để trống giờ.

Đã đọc trang riêng của hai endpoint ngày 17/11/2026 (bộ Upload-Post §13.2a). Vì đã có nguồn dữ liệu, chức năng này **làm được**; không còn phương án bỏ.

Điều kiện của nguồn dữ liệu:
- Instagram cần ≥ 100 người theo dõi và quyền insights.
- TikTok cần tài khoản Business.
- Nếu không đủ điều kiện, Upload-Post tự dùng các bài đã đăng (cần ≥ 10 bài) hoặc lịch sử đăng qua Upload-Post. Khi đó độ tin cậy thấp.

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Chỉ lấy trong phạm vi Upload-Post có | Chốt | §6-11 |
| Mức 低: lúc chạy thật chỉ cam kết chức năng 高 và 中 | Chốt | §12-3 |

## Dữ liệu [Đề xuất nội bộ]

`engagement_by_hour`: `talent_id`, `platform`, `date`, `day_of_week`, `hour` (null với YouTube), `score`, `source` (audience_activity / account_posts / upload_post_history), `confidence`, `sample_size`, `warnings`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Sau lần chạy, mỗi tài năng có dữ liệu của từng mạng đã kết nối. Instagram và TikTok có theo giờ; YouTube chỉ có theo ngày.
2. Upload-Post trả `quota_exceeded` hoặc `daily_limit_reached`: giữ dữ liệu hôm trước, ghi lỗi, không thử lại trong ngày.

## Phụ thuộc

8-7, kiểm chứng Upload-Post (EP06, mục 9).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S07-08 | Không có số liệu theo giờ thì không làm 8-9 | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP07: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-11 (8-9), §12-3.
