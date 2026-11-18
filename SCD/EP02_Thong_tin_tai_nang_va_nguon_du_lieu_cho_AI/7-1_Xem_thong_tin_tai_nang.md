# 7-1 Xem thông tin tài năng

| Mục | Giá trị |
|---|---|
| Module | EP02 – Thông tin tài năng và nguồn dữ liệu cho AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-4, chức năng 7-1; UC-10 |
| Màn hình [AG] | M-06, M-07, M-09 (hội thoại); màn hình quản trị trên điện thoại (trang 11) |
| Tên trong mã nguồn | Talent Info Dashboard |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Các cột dùng số liệu của module khác thì dùng dữ liệu giả tới khi có |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ S02-06 | ⚠ đội đề xuất | ✅ lọc theo nhóm ([KS] 確認47) | ✅ | ⚠ đội đề xuất | ⚠ 3-10, 8-2, 8-7, 3-4 |

## Mục đích

Quản lý xem danh sách tài năng, tìm, lọc, rồi mở chi tiết: thông tin đã nhập, mục tiêu, trạng thái kết nối mạng xã hội, hội thoại với AIコーチ (§6-4 chức năng 7-1).

## Tác nhân và quyền

- Quản lý: xem mọi tài năng. Chỉ xem, không sửa thông tin ở đây.
- Mỗi lần mở M-07, M-08, M-09 được ghi nhật ký xem (7-6).

## Luồng chính

**Danh sách (M-06)**
1. Hiện các cột theo [AG]: tên, trạng thái, có dùng duyệt bài không, đăng tự động (đang chạy hoặc đã dừng), kết nối mạng xã hội, số người theo dõi IG/TT/YT, lần đăng gần nhất, số ngày không đăng. Thêm trạng thái thư mục (S02-03). Tài khoản công ty có nhãn 事務所.
2. Tìm theo tên. Lọc theo trạng thái, và theo số ngày không đăng ("từ 3 ngày", "từ 7 ngày", lấy theo giá trị cài đặt ở M-17).
3. Mặc định xếp theo số ngày không đăng, nhiều nhất lên đầu (S02-06).
4. Nút ＋事務所アカウント sang M-12 (1-2). Bấm một dòng sang M-07.

**Chi tiết – thông tin (M-07)**
5. Tên và tuổi (kèm nhãn dưới 18 tuổi nếu có, [KS] 確認2), các mục hồ sơ đọc từ `プロフィール.md` (S02-04), thử thách.
6. Số người theo dõi và mục tiêu từng mạng, thanh tiến độ, mức tăng 7 ngày gần nhất, hạn đạt (dữ liệu của 3-10, 2-4).
7. Trạng thái kết nối từng mạng (8-2). Trạng thái thư mục kèm liên kết (S02-03).
8. Câu "nội dung do quản lý nhập qua ChatGPT; màn này không sửa được".

**Chi tiết – hội thoại (M-09)**
9. Hội thoại giữa tài năng và AIコーチ, chỉ đọc. Tin nhắn được đánh dấu là chuyện nghiêm trọng (3-3) có nhãn riêng.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đọc `プロフィール.md` từ OneDrive lỗi khi mở M-07 | Hiện bản đọc gần nhất của 2-1, kèm thời điểm đọc | [Đề xuất nội bộ] |
| Chưa có hồ sơ | Hiện "chưa có thông tin, nhập qua ChatGPT" | UC-01 前提 |
| Hồ sơ thiếu mục hoặc sai mẫu | Mục thiếu thì để trống; nội dung ngoài mẫu không hiện ở M-07 nhưng AI vẫn đọc | S02-04 |
| Tài năng chưa có số liệu (mới vào) | Hiện "—" như [AG] | [AG] M-06 |
| Danh sách lớn (1.000 tài năng) | Phân trang. Tìm và lọc chạy ở máy chủ | §9-2 |
| Ghi nhật ký xem lỗi | Không hiện dữ liệu (7-6) | 7-6 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Tìm theo tên; lọc theo trạng thái và số ngày không đăng | — | Chốt | §6-4 |
| Mốc lọc số ngày không đăng | Theo cài đặt ở M-17 (mặc định 3 và 7) | Đề xuất | S02-06, §5-6 |
| Thứ tự mặc định | Số ngày không đăng, giảm dần | Đề xuất | S02-06 |
| Số dòng mỗi trang | 50 | Tham số [Đề xuất nội bộ] | — |

## Dữ liệu

Chỉ đọc: `talents`, `talent_goals`, trạng thái kết nối (8-2), số người theo dõi (8-7), bài đăng gần nhất (7-2), hội thoại (3-4), `talent_context_snapshots` (2-1). Số ngày không đăng tính từ ngày đăng thành công gần nhất (cách đếm dùng chung với 3-9).

## Màn hình

M-06, M-07, M-09 ([AG] trang 7, 8). Màn trên điện thoại ([AG] trang 11). Bộ lọc カテゴリー (nhóm tài năng) khung đỏ **không làm** tới khi có 確認47.

## Tích hợp

Microsoft Graph: đọc `プロフィール.md` khi mở M-07.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho lọc "từ 7 ngày", thì chỉ hiện tài năng có số ngày không đăng từ 7 trở lên.
2. Cho tìm "タレントA", thì hiện tài năng có tên chứa chuỗi đó.
3. Cho tài khoản công ty, thì dòng có nhãn 事務所.
4. Cho hồ sơ có mục 趣味・特技 = "カフェ巡り、ダンス", thì M-07 hiện đúng nội dung đó ở dòng 趣味・特技.
5. Cho OneDrive lỗi khi mở M-07, thì vẫn hiện hồ sơ của lần đọc gần nhất, kèm thời điểm đọc.
6. Cho mở M-07 hoặc M-09, thì nhật ký xem có thêm một dòng (7-6).
7. Cho 1.000 tài năng, thì danh sách tải trong vòng 2 giây.

## Ngoài phạm vi của chức năng này

- Sửa thông tin (2-3, qua ChatGPT). Sửa cài đặt (M-10: 2-4, 7-3, 7-5, 7-7). Tab bài đăng M-08 (7-2).
- (Lọc theo nhóm tài năng nay **làm**: CR-17, [KS] 確認47; xem bộ lọc ở M-06.)

## Phụ thuộc

- 2-1 (bản đọc gần nhất), 2-4 (mục tiêu), 3-10 và 8-7 (số người theo dõi), 8-2 (kết nối), 3-4 (hội thoại), 7-6 (nhật ký xem). Các phần chưa có thì dùng dữ liệu giả.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認2 (nhãn dưới 18 tuổi), 確認41, 42 (xem mọi tài năng và hội thoại), 確認44 (nhật ký xem), 確認47 (lọc theo nhóm).

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S02-03 | Hiện trạng thái thư mục ở M-06, M-07 | Không | Như đề xuất |
| S02-04 | Mẫu file hồ sơ để M-07 đọc theo mục | Không | Như 2-3 |
| S02-06 | Cột, mốc lọc, thứ tự của danh sách | Không | Theo [AG] cộng đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP02: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-6, §6-4 (7-1), §9-2, UC-10, UC-01 前提, 確認2, 41, 42, 44, 47.
- [AG] trang 7 (M-06, M-07), trang 8 (M-09), trang 11.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.22: màn chi tiết tài năng có thêm ô **tình trạng đọc file OneDrive** (xem 2-1).
- Q&A No.7 (đóng 17/11): quản lý xem toàn bộ hội thoại, tài năng được báo lần đầu mở ứng dụng (確認13, 42). Không làm hội thoại riêng tư (CR-24).
