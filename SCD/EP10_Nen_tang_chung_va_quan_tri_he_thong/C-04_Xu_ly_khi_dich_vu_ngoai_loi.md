# C-04 Xử lý khi dịch vụ ngoài lỗi

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Hàng đợi, chống trùng và ghi thao tác — FACT của nguồn:** Nguồn yêu cầu hàng đợi theo SNS, chống đăng hai lần, bảo vệ token và ghi thao tác Talent/Manager/AI; đánh dấu vài phần chưa xác nhận. **Giới hạn:** Đó là đánh giá của nguồn, không chứng minh repo thiếu hay đã có. BullMQ/Redis là quyết định kỹ thuật nội bộ đã có; retry vận chuyển/đối soát khác tự đăng lại nghiệp vụ. Chưa thay schema/code hoặc tuyên bố test đạt. Nguồn `ISS22-P PDFtrang7; ISS22-P PDFtrang8; ISS22-P PDFtrang10`; EV `EV-1247;EV-1248;EV-1250`.

**Dừng hệ thống và lịch bên dịch vụ — FACT của nguồn:** Nguồn giữ quyết định không có nút dừng toàn bộ, yêu cầu kiểm lịch đã gửi có dừng khi hệ thống ngừng không; bảng kỹ thuật vẫn liệt kê dừng toàn bộ/từng người/SNS. **Giới hạn:** Không khôi phục nút global từ bảng khái quát. Tắt API/worker không chứng minh lịch bên dịch vụ đã hủy; chưa cam kết dừng khi provider không truy cập được hoặc bài đang publish. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang7; ADV22 PDFtrang8; ADV22 PDFtrang10`; EV `EV-1242;EV-1247;EV-1259;EV-1261`.

**Audit TikTok và quota YouTube — FACT của nguồn:** Nguồn nêu giới hạn TikTok trước audit là 5 người/24 giờ và quota YouTube mặc định 100 upload/ngày; dùng kịch bản 200–600 video/ngày cho 200 người và yêu cầu xác nhận bằng văn bản cho agency. **Giới hạn:** Giới hạn có phạm vi theo API client/project/route, không phải quota hợp đồng Upload-Post hoặc cap từng Talent. 200/600 là kịch bản, không là quy mô/tần suất đã chốt; bài ảnh không gửi YouTube. Nguồn `ISS22-P PDFtrang3; ISS22-P PDFtrang4; ISS22-P PDFtrang9; ISS22-P PDFtrang10`; EV `EV-1243;EV-1244;EV-1249;EV-1250`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Talent đăng lại bài lỗi:** Lỗi lúc tới giờ đăng thì thông báo Talent; Talent đợi rồi đăng lại. Lỗi SNS hoặc mạng của Talent không cần thông báo Adesso. **Còn mở/giới hạn:** Không đồng nhất Adesso với mọi tài khoản Manager nếu chưa rõ. Không tự đặt thời gian chờ, số lần thử hoặc đích SNS; No.59 còn mở. Quyền Manager đăng lại trong bản19/11 chưa bị xóa bằng suy luận. Nguồn `KS 確認事項!K87;20261120!F13`; bằng chứng `EV-0971`.

- **Bỏ dừng đăng toàn hệ thống:** Không có chức năng dừng tự động toàn hệ thống; vẫn dừng theo từng Talent. Khi cần dừng toàn bộ thì vận hành dừng hệ thống. **Còn mở/giới hạn:** Thay đề xuất giữ nút toàn bộ ở QA No.77/91; không suy người thao tác, cơ chế hạ tầng hay SLA dừng. Cách xử lý lịch đã gửi còn cần thiết kế/provider. Nguồn `KS 確認事項!K85;20261120!F33`; bằng chứng `EV-0981`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


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


</details>
