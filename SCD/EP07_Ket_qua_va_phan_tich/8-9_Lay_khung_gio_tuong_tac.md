# 8-9 Lấy khung giờ tương tác

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Rải giờ và tối ưu theo chu kỳ 30 ngày — PROPOSAL của nguồn:** Đề nghị rải phút theo Talent/SNS, tránh giờ tròn, thử các khung trong 30 ngày rồi dùng kết quả cho 30 ngày tiếp; mục tiêu hiệu quả, phân tải và có thời gian giao lưu. **Giới hạn:** Không coi ví dụ 19:07/20:23 hoặc chu kỳ 30 ngày là mốc đã chốt. Dữ liệu watch time chưa được kiểm; chỉ thị AI không tự bảo đảm scheduler phân tải hoặc tuân thủ cap. Nguồn `ISS22-P PDFtrang5; ADV22 PDFtrang8; ADV22 PDFtrang11`; EV `EV-1245;EV-1259;EV-1262`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Lấy số liệu/follower 1 lần ngày trong phạm vi dịch vụ; ghi kết quả vào file Talent, sáng hôm sau AI dùng.

Phải kiểm tài khoản provider thật; lịch chạy số liệu/khung giờ là thiết kế, không tự xác nhận khả năng từ tài liệu nguồn.

Căn cứ: `T19:23,27;M19:12;BF19:9,13` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0575;EV-0579;EV-0597;EV-0621;EV-0625`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

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

Đã đọc trang riêng của hai endpoint ngày 17/11/2026 (bộ Upload-Post §11). Vì đã có nguồn dữ liệu, chức năng này **làm được**; không còn phương án bỏ.

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
