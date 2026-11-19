# 8-4 Chống bị khóa tài khoản

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 8-4 (凍結対策); §9-5; §11; UC-08 前提 |
| Màn hình [AG] | Không có |
| Tên trong mã nguồn | Anti-ban Measures |
| Mức sẵn sàng | 🔴 Đỏ – [YK2] chưa có nội dung ("quyết khi thiết kế"). Đội đề xuất bộ biện pháp tối thiểu (S06-03) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ⚠ | ❌ S06-03 | ❌ | ❌ | ⚠ | ✅ không cần màn | ⚠ quy định từng mạng | ⚠ | ⚠ 4-3 |

## Mục đích

Giảm nguy cơ mạng xã hội khóa tài khoản của tài năng, ví dụ khi đăng nhiều video AI trong thời gian ngắn. Giới hạn gì sẽ quyết sau khi xem quy định và các trường hợp thực tế của từng mạng. Không cam kết tài khoản không bị khóa (§6-10 chức năng 8-4, §9-5, §11).

## Đề xuất biện pháp tối thiểu (S06-03)

Áp dụng ở bước hẹn giờ (4-3), không chặn việc tạo bản nháp:

1. **Khoảng cách giữa hai bài của cùng tài năng:** ít nhất 3 giờ (S04-04).
2. **Không áp trần số bài/ngày của sản phẩm:** theo GJ17/11 §7 xác nhận37 và QA No.56. Bài có thể bị provider từ chối theo hạn mức thực tế; đó là điều kiện tích hợp riêng, không phục hồi trần3 bài/ngày.
3. **Rải giờ đăng giữa các tài năng:** cộng ngẫu nhiên vài phút (mặc định ±10 phút) vào giờ đăng, để nhiều tài năng không đăng cùng một phút.
4. Đội xem quy định hiện hành của Instagram, TikTok, YouTube về nội dung AI và tần suất đăng, rồi chỉnh tham số trước khi chạy thật.
5. Upload-Post có giới hạn đăng riêng của từng mạng trong 24 giờ (Instagram 50, TikTok 15, YouTube 30) và giới hạn số request theo gói; các số trong hướng dẫn là thông tin kỹ thuật cần kiểm chứng, không phải trần nghiệp vụ đã duyệt (tài liệu Upload-Post, tra 17/11).
6. Upload-Post chặn nội dung trùng hoặc gần giống trong 48 giờ trên cùng tài khoản và mạng, và chặn gắn @ quá nhiều. Bài hẹn giờ được kiểm lại số bài lúc tới giờ đăng, nên vẫn có thể bị từ chối (bộ Upload-Post §12, U19).
7. Giới hạn của chính các mạng (tra 17/11, bộ Upload-Post §12): Instagram 100 bài/24 giờ qua API; TikTok khoảng 15 bài/24 giờ **dùng chung cho mọi ứng dụng**, nên nếu tài năng tự đăng bằng công cụ khác thì hệ thống có thể bị từ chối dù chưa chạm hạn mức quan sát được của hệ thống.

A5 (別紙B, phụ lục B): "cơ bản mỗi ngày 1 bài" được coi là mục tiêu, không phải giới hạn.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Provider từ chối do hạn mức/tần suất | Không tự gửi lại; báo đúng mạng và nguyên nhân. Thời điểm đặt lại theo No.56/59 đang mở, không mặc định dời hôm sau | S06-03; QA No.56/59 |
| Mạng báo tài khoản bị hạn chế | Ghi lỗi (8-5); quản lý có thể dừng đăng tự động của tài năng đó (7-5) | [Đề xuất nội bộ] |
| TikTok trả `spam_risk_too_many_posts` | Không thử lại trong 24 giờ; lỗi cho riêng TikTok, hai mạng kia vẫn đăng | TikTok Content Posting API |
| TikTok trả `spam_risk_user_banned_from_posting` | Không thử lại; báo quản lý, gợi ý dừng đăng tự động của tài năng đó | TikTok Content Posting API |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Khoảng cách tối thiểu | Đề xuất3 giờ, chưa chốt | Đề xuất chờ No.56 | S04-04, S06-03 |
| Trần số bài/ngày của sản phẩm | Không đặt | Quyết định17/11 | GJ §7 xác nhận37; QA No.56 |
| Rải giờ | Đề xuất ±10 phút, chưa chốt | Đề xuất nội bộ | S06-03 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng chấp nhận bài thứ4 trong ngày, thì không chặn/dời chỉ vì vượt trần3 bài của sản phẩm; vẫn kiểm điều kiện giờ/duyệt/từ cấm/cờ dừng và hạn mức provider. Quy tắc giờ cho bài tiếp theo chờ No.56, không tự mở thêm lịch bằng giả định.
2. Nếu phương án rải giờ ±10 phút được duyệt, cho nhóm tài năng cùng giờ19:00 thì giờ hẹn nằm18:50–19:10 và không vượt điều kiện duyệt/khung giờ hợp lệ. Đây là AC có điều kiện, chưa phải con số đã chốt.

## Ngoài phạm vi của chức năng này

- Cam kết không bị khóa (§11). Giám sát tình trạng tài khoản trên mạng xã hội ngoài những gì Upload-Post trả về.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認37.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-03 | Bộ biện pháp tối thiểu | Có | Như trên |
| A5 | "Mỗi ngày 1 bài" là mục tiêu | Không | Như A5 |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (8-4), §9-5, §11, UC-08 前提, 別紙B, 確認37. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A5.
