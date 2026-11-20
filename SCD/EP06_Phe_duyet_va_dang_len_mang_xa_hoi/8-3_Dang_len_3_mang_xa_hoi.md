# 8-3 Đăng lên 3 mạng xã hội

## Đối chiếu nguồn hiện hành — 20/11/2026

Đăng cùng tư liệu/chữ tới SNS đã nối; ảnh không YouTube, video có YouTube. Kết quả từng SNS, không tự đăng lại.

Chưa chốt đích đăng lại khi lỗi một phần; không suy trần bài/ngày.

Căn cứ: `T19:23,30;M19:12;BF19:9` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0575;EV-0582;EV-0597;EV-0621`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 8-3; §5-1; UC-08, UC-08 前提 |
| Màn hình [AG] | T-13 (lịch và kết quả), M-08 |
| Tên trong mã nguồn | Multi-platform Publishing |
| Mức sẵn sàng | 🟡 Vàng – luồng rõ; lệnh gọi Upload-Post phải kiểm chứng trước khi chốt |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C-01 | ✅ | ⚠ kiểm chứng | ⚠ đội đề xuất | ⚠ 8-2, 4-3 |

## Mục đích

Đến giờ đã hẹn, đăng cùng ảnh hoặc video và cùng chú thích lên Instagram, TikTok, YouTube. Ghi thành công hay lỗi cho từng mạng. Không có video thì không đăng YouTube; mạng chưa kết nối thì bỏ qua (§6-10 chức năng 8-3).

## Luồng chính

1. **Hẹn giờ** (gọi từ 4-3, 7-7, 4-4): gửi sang Upload-Post một lịch đăng gồm tư liệu, chú thích, hashtag, tiêu đề YouTube (B3), nhãn AI (5-5), giờ đăng, danh sách mạng (mạng đã kết nối; bài ảnh bỏ YouTube). Lưu mã lịch.
2. **Đăng:** Upload-Post tự đăng đúng giờ ([SM] trang 9: việc hẹn và đăng do dịch vụ làm).
3. **Kết quả:** nhận qua webhook của Upload-Post nếu có, không thì hỏi định kỳ sau giờ đăng. Lưu cho từng mạng: thành công hay lỗi, mã bài, đường dẫn bài, lý do lỗi.
4. Ít nhất một mạng thành công: bài sang "đã đăng" (lỗi một phần vẫn ghi rõ); gửi tin "đã đăng" và số ngày liên tục (3-4).
5. Có mạng lỗi: chuyển sang 8-5.
6. T-13 và M-08 hiện kết quả từng mạng (xanh: được, đỏ: lỗi, xám: không đăng).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Bài ảnh | Không đăng YouTube; T-13 ghi "không có video nên không lên YouTube" | §6-10, [AG] T-13 |
| Mạng mất kết nối lúc đến giờ | Mạng đó lỗi; báo qua 8-5 và 8-6 | §6-10 |
| Không nhận được kết quả sau 1 giờ | Hỏi Upload-Post; vẫn không rõ thì ghi "không rõ" và cảnh báo đội vận hành | [Đề xuất nội bộ] |
| Upload-Post ngừng dịch vụ | Không hẹn được bài mới; bài sang "hẹn giờ lỗi", báo như 8-5 | §9-3 |
| Bản tạm trên Supabase đã xóa | Lấy lại từ OneDrive trước khi gửi (6-4) | S05-03 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Cùng tư liệu và chú thích cho cả 3 mạng | Chốt | UC-05 前提, §6-10 |
| Ghi kết quả cho từng mạng | Chốt | §6-10, §5-1 |
| Không có video thì không đăng YouTube | Chốt | §6-10 |
| Chỉ đăng mạng đã kết nối | Chốt | §6-10 |
| Phí Upload-Post không tăng theo số bài | Chốt | UC-08 前提 |

## Dữ liệu [Đề xuất nội bộ]

`post_platform_results`: `post_id`, `platform`, `status` (`skipped`, `scheduled`, `posted`, `failed`, `unknown`), `platform_post_id`, `url`, `error_code`, `error_message`, `ai_label_method` (5-5), `updated_at`.

## Tích hợp

Upload-Post: hẹn giờ, hủy, nhận kết quả. Chống trùng: khóa theo `post_id`; webhook đến nhiều lần chỉ xử lý một lần.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bài video, tài năng nối cả 3 mạng, thì sau giờ đăng có 3 dòng kết quả `posted` kèm đường dẫn.
2. Cho bài ảnh, thì YouTube là `skipped`.
3. Cho TikTok lỗi, Instagram được, thì bài là "đã đăng" có ghi lỗi TikTok, và 8-5 chạy cho TikTok.
4. Cho webhook đến 2 lần, thì chỉ một lần cập nhật và một tin "đã đăng".

## Ngoài phạm vi của chức năng này

- Chú thích riêng cho từng mạng (UC-05 前提). Chọn tay mạng cho từng bài: không có, đăng mọi mạng đã nối.

## Phụ thuộc

8-2, 4-3, 7-7, 4-4, 5-5, 3-4, 8-5, C-01.

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-1, §6-10 (8-3), §9-3, UC-05 前提, UC-08, UC-08 前提. [SM] trang 9. [AG] trang 5 (T-13), trang 7 (M-08).
