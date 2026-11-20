# 3-7 Thông báo khi đạt mục tiêu

## Đối chiếu nguồn hiện hành — 20/11/2026

Đạt mục tiêu có thông báo; follower tăng được truyền qua lời nhắn AI theo chỉ thị.

Mốc 25/50/75% ở QA No.14 và cách mới nêu trong màn 19/11 cần đối chiếu, không tự bỏ hay thêm thông báo mốc.

Căn cứ: `T19:16,24;M19:6;BF19:13` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0568;EV-0576;EV-0591;EV-0625`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-5, chức năng 3-7; §5-5; 別紙A (フォロワーの増加, 目標の達成) |
| Màn hình [AG] | T-14, T-08; M-02 |
| Tên trong mã nguồn | Follower Growth Notification |
| Mức sẵn sàng | 🟡 Vàng – giao agent được theo đề xuất A7 (gộp hai loại thông báo về người theo dõi) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ A7 | ⚠ đội đề xuất | ✅ | ⚠ 8-7 | ⚠ đội đề xuất | ⚠ 8-7, 2-4 |

## Mục đích

Số người theo dõi một mạng đạt mục tiêu thì báo cả tài năng và quản lý. Tài năng hoàn thành thử thách thì AIコーチ chúc mừng (§6-5 chức năng 3-7).

## Luồng chính

1. Sau mỗi lần lấy số liệu (8-7), so số người theo dõi từng mạng với mục tiêu (2-4).
2. Mạng nào vừa đạt (lần trước chưa đạt, lần này đạt): tạo thông báo 目標の達成 cho tài năng (ứng dụng và thông báo đẩy) và cho Manager phụ trách (M-02 bản19/11). Mỗi mạng, mỗi giá trị mục tiêu chỉ báo một lần.
3. Người theo dõi tăng chưa đạt mục tiêu: theo QA No.14, giữ thông báo mốc25/50/75% của từng mạng theo đề xuất AMCOLAB để khách xác nhận trên màn thật; không bỏ loại thông báo riêng. Gộp nhiều mốc/đổi goal/dữ liệu muộn chờ L23-09, không tự coi đã chốt.
4. Thử thách: trong lô buổi sáng, AI đánh giá đã hoàn thành chưa dựa trên số liệu hệ thống đưa vào (chuỗi ngày đăng, số bài, mức tăng người theo dõi) (B12). Hoàn thành thì tin buổi sáng có lời chúc mừng, kèm thông báo 達成のお祝い.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Quản lý nâng mục tiêu sau khi đã đạt | Đạt mục tiêu mới thì báo lại | [Đề xuất nội bộ] |
| Người theo dõi giảm xuống dưới mục tiêu rồi đạt lại | Không báo lại với cùng giá trị mục tiêu | [Đề xuất nội bộ] |
| Đạt nhiều mạng cùng ngày | Một thông báo cho mỗi mạng | A7 |
| Thử thách viết mơ hồ, AI không đánh giá được | Không chúc mừng; không báo lỗi | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Báo cả tài năng và quản lý khi đạt mục tiêu một mạng | Chốt | §6-5, 別紙A |
| Thử thách hoàn thành: AIコーチ chúc mừng trong ứng dụng | Chốt | §6-5 |
| Giữ thông báo tăng follower theo mốc25/50/75% từng mạng | Đề xuất từ QA No.14, cần xác nhận trên màn thật | QA No.14; L23-09 |

## Dữ liệu [Đề xuất nội bộ]

`goal_achievements`: `talent_id`, `platform`, `target_value`, `achieved_at`. Dùng để không báo trùng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho mục tiêu TikTok 10.000, hôm qua 9.990, hôm nay 10.020, thì tài năng và mọi quản lý nhận đúng một thông báo 目標の達成 cho TikTok.
2. Cho ngày hôm sau vẫn trên 10.000, thì không báo lại.
3. Cho quản lý nâng mục tiêu lên 20.000 và tài năng đạt, thì báo lại.
4. Cho thử thách "7日続けて投稿" và tài năng đăng 7 ngày liên tiếp, thì tin buổi sáng hôm sau có lời chúc mừng.

## Phụ thuộc

8-7, 2-4, 7-4, 6-1, 3-4.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認5, 39.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| A7/L23-09 | Phân biệt tăng follower theo mốc với đạt mục tiêu; đồng bộ màn/AC và quy tắc báo lặp | Chặn phần chưa rõ của thông báo mốc | Không gộp/bỏ mặc định |
| B12 | AI đánh giá thử thách từ số liệu | Không | Như B12 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-5, §6-5 (3-7), 別紙A, 確認5, 39. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A7, B12.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.14 (AMCOLAB chốt, khách xem trên màn thật): thông báo "tăng người theo dõi" ([YK2] 別紙A) gửi khi đạt **25%, 50%, 75% mục tiêu** của từng mạng. Mỗi mốc chỉ gửi một lần cho mỗi mục tiêu.
- Q&A No.42, CR-08 (đã chốt): đạt mục tiêu thì báo cả tài năng và quản lý.
