# 5-2 Định dạng video

## Đối chiếu nguồn hiện hành — 20/11/2026

Video có thể đăng 3 SNS đã nối; video AI cần ghi nhãn.

Codec/độ dài/cách nhãn từng SNS vẫn thuộc kiểm dịch vụ; không dùng ví dụ 15 giây làm độ dài bắt buộc.

Căn cứ: `T19:20,21,30;BF19:12` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0572;EV-0573;EV-0582;EV-0624`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-8, chức năng 5-2; §5-7; UC-06 |
| Màn hình [AG] | Không có |
| Tên trong mã nguồn | Video Format |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; thông số cụ thể phải kiểm chứng với Upload-Post và 3 mạng |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ kiểm chứng | ✅ | ✅ không cần màn | ⚠ kiểm chứng | ⚠ đội đề xuất | ⚠ 5-1 |

## Mục đích

Video làm theo khổ dọc và theo định dạng đăng được cùng lúc lên Instagram, TikTok, YouTube (§6-8 chức năng 5-2, §5-7). YouTube dùng dạng Shorts (UC-06).

## Luồng chính

1. Sau khi nhận video từ fal.ai (5-1), worker chuẩn hóa: khổ dọc 9:16, 1080×1920, MP4 (H.264, âm thanh AAC), tốc độ khung hình giữ nguyên.
2. Với video tài năng tự gửi (6-3): kiểm tra khổ và độ dài; không phải khổ dọc thì vẫn nhận nhưng cảnh báo "có thể không hiện dạng Shorts" (S05-01).
3. Lưu bản đã chuẩn hóa làm bản dùng để đăng.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Chuẩn hóa lỗi | Video AI: coi như tạo lỗi, trả lại lần tính (5-1). Video tự gửi: báo không dùng được | [Đề xuất nội bộ] |
| Video dài hơn giới hạn Shorts | Không cho dùng cho bài có YouTube; báo tài năng | Kiểm chứng |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Khổ | Dọc 9:16 | Chốt | §5-7, §6-8 |
| Một video cho cả 3 mạng | — | Chốt | §5-7 |
| Độ phân giải, mã hóa | 1080×1920, MP4 H.264 + AAC | Tham số, kiểm chứng | [Đề xuất nội bộ] |

## Tích hợp

Worker trên VPS dùng ffmpeg. Kiểm chứng định dạng Upload-Post chấp nhận cho từng mạng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho video từ fal.ai có kích thước khác, thì bản lưu là 1080×1920 MP4.
2. Cho một video đã chuẩn hóa, thì Upload-Post đăng được lên cả 3 mạng trên tài khoản thử.
3. Cho video tự gửi khổ ngang, thì có cảnh báo nhưng vẫn lưu.

## Phụ thuộc

5-1, 6-3, 8-3 (kiểm chứng đăng thật).

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP05: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-7, §6-8 (5-2), UC-06.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.36, CR-04 (đã chốt): video trình chiếu ảnh là bản tối thiểu, ghép ảnh ở máy chủ (worker), không dùng thêm dịch vụ AI.
