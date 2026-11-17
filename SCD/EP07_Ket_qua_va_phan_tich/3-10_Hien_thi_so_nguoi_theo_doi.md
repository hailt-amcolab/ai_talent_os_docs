# 3-10 Hiển thị số người theo dõi

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-11, chức năng 3-10; 別紙B (phụ lục B) số 20; 別紙C (phụ lục C) |
| Màn hình [AG] | T-06; M-06, M-07 |
| Tên trong mã nguồn | Follower Tracking |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠ S07-04 | ✅ | ⚠ chưa có ô tổng | ✅ | ⚠ đội đề xuất | ⚠ 8-7, 2-4 |

## Mục đích

Hiện số người theo dõi từng mạng và mức đạt so với mục tiêu, trên ứng dụng và màn hình quản trị (§6-11 chức năng 3-10). 別紙B số 20 và 別紙C gọi chức năng này là "フォロワー数の合算の表示" (hiện **tổng** số người theo dõi), nên hiện thêm tổng (S07-04).

## Luồng chính

1. Lấy số mới nhất từ `follower_snapshots` (8-7) và mục tiêu từ `talent_goals` (2-4).
2. **T-06:** mỗi mạng một dòng "3,100 / 10,000人" kèm thanh tiến độ; thêm một dòng tổng 3 mạng (không có thanh, vì mục tiêu đặt theo từng mạng).
3. **M-06:** cột "フォロワー数 IG/TT/YT" như [AG], thêm số tổng.
4. **M-07:** từng mạng: số hiện tại / mục tiêu, thanh tiến độ, mức tăng 7 ngày ("直近7日 +52"), hạn đạt.
5. Ghi "số liệu tính đến …" (S07-02).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Mạng chưa kết nối | Hiện "—", không tính vào tổng | [AG] M-06 |
| Số người theo dõi TikTok | Lấy `followers_daily` của Audience Insights (`GET /api/uploadposts/audience`), vì trang thống kê không trả số này. Lỗi `tiktok_reconnect_required` thì hiện "—" và chạy luồng mất kết nối (8-6) | Bộ Upload-Post §13.2a |
| Chưa có số liệu | Hiện "—" | [AG] M-06 |
| Đã vượt mục tiêu | Thanh đầy, hiện số thật (ví dụ 12,300 / 10,000) | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Hiện từng mạng và mức đạt | Chốt | §6-11 |
| Hiện thêm tổng 3 mạng; mục tiêu vẫn theo từng mạng | Đề xuất | S07-04, 別紙B số 20 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho IG 3,100, TT 2,400, YT 700, mục tiêu 10,000 mỗi mạng, thì T-06 hiện 3 dòng đúng số, 3 thanh 31%, 24%, 7%, và tổng 6,200.
2. Cho YouTube chưa kết nối, thì YouTube hiện "—" và tổng chỉ cộng 2 mạng.
3. M-07 hiện mức tăng 7 ngày bằng số hôm nay trừ số 7 ngày trước.

## Phụ thuộc

8-7, 2-4, 1-5 (tài năng chỉ thấy của mình).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S07-04 | Hiện thêm tổng 3 mạng | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP07: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-11 (3-10), 別紙B số 20, 別紙C. [AG] trang 3 (T-06), trang 7 (M-06, M-07).
