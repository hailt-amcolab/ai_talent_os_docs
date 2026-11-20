# C-04 Xử lý khi dịch vụ ngoài lỗi

## Đối chiếu nguồn hiện hành — 20/11/2026

Lỗi video hiển thị câu dễ hiểu cố định, không mã lỗi provider; mọi ngoại lệ và vận hành lỗi cần đội rà thành yêu cầu phi chức năng.

Timeout/retry/kết quả muộn và đối soát chưa được nguồn chốt; không phát triển nội dung khách suy diễn.

Căn cứ: `GJ19:18;T19:21;BF19:9` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0651;EV-0573;EV-0621`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP10 – Nền tảng chung và quản trị hệ thống |
| Mã | C-04 (mã nội bộ) |
| Mục [YK2] | §9-3; §11 |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Mục đích

Dịch vụ ngoài lỗi thì chỉ dừng chức năng dùng dịch vụ đó, các chức năng khác vẫn chạy; đăng bài lỗi thì báo (§9-3).

## Cách xử lý theo từng dịch vụ [Đề xuất nội bộ]

| Dịch vụ | Chức năng bị ảnh hưởng | Người dùng thấy | Hệ thống làm |
|---|---|---|---|
| OpenAI | Trò chuyện, tin buổi sáng, bản nháp, kiểm tra từ cấm | "AIコーチ đang bận, thử lại sau"; tin buổi sáng đến muộn | Thử lại; từ cấm thì không hẹn giờ (S04-06) |
| Upload-Post | Kết nối, hẹn giờ, đăng, lấy số liệu | Bài "lỗi", thông báo đăng lỗi | Không tự đăng lại (8-5); số liệu lấy lại lần sau |
| fal.ai | Tạo video | Nút tạo video tắt, "tạm thời không tạo được" | Trả lại lần đã tính |
| GMO | Đăng ký thanh toán, thu phí | "tạm thời không đăng ký được" | Dời lần thu |
| OneDrive (Microsoft Graph) | Đọc hồ sơ, lưu tư liệu, ghi kết quả | Không thấy gì (dùng bản gần nhất) | Dùng bản đọc gần nhất, thử lại |
| Dịch vụ gửi thư | Thư duyệt, từ chối, đặt lại mật khẩu | Thư đến muộn | Thử lại qua hàng đợi |
| Web Push | Thông báo đẩy | Vẫn có trong T-14 | Không thử lại nhiều |

## Luồng chính

1. Mọi lần gọi dịch vụ ngoài đi qua lớp gọi chung: đặt thời gian chờ, thử lại có giãn cách, ghi kết quả.
2. Lỗi liên tục quá ngưỡng (ví dụ 5 lần trong 5 phút): đánh dấu dịch vụ "đang lỗi"; các màn liên quan hiện câu báo; ngừng gọi trong một khoảng ngắn rồi thử lại.
3. Cảnh báo đội vận hành khi một dịch vụ "đang lỗi" quá 15 phút (file 18 mục 8).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho fal.ai ngừng, thì trò chuyện và đăng bài vẫn chạy, chỉ nút tạo video bị tắt.
2. Cho OpenAI ngừng lúc 7:00, thì tin buổi sáng được gửi muộn khi OpenAI chạy lại, không mất.
3. Cho OneDrive ngừng, thì tin buổi sáng dùng hồ sơ đọc lần trước.

## Ngoài phạm vi

Cam kết dịch vụ ngoài luôn chạy (§11). Thay đổi của dịch vụ ngoài sau khi phát hành thuộc hợp đồng bảo trì (§11).

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP10: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §9-3, §11. [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 8.
