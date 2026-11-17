# Kiểm tra bộ tài liệu

Ngày 16/11/2026. Đã kiểm tra tự động:

- 117 case ID duy nhất, các cột tình huống đầy đủ, tất cả ghi Chưa chạy.
- 14 định nghĩa JSON Schema đọc được; required tham chiếu đúng property.
- 20 mục chính, 5 sơ đồ Mermaid và cặp code fence cân bằng.
- 16 Q&A, 10 POC; 2 file nguồn được ghi SHA-256 đúng bytes hiện tại.
- ZIP đọc được và CRC hợp lệ, đủ danh mục tệp.

Đây là kiểm tra cấu trúc tài liệu, không phải kết quả chạy 117 test trên sản phẩm.
Chưa chạy API thật, chưa kiểm chứng schema bằng response thật, chưa render Mermaid
bằng trình duyệt và chưa chạy một bộ JSON Schema validator độc lập.

## Cập nhật bản 1.1 (17/11/2026)

Đối chiếu các endpoint với docs.upload-post.com (connect-api, user-profiles, upload-video, rate-limits, schedule-posts, webhooks, retry-post, get-analytics): khớp. Bổ sung: giới hạn request theo gói và giới hạn đăng 24 giờ của từng mạng; nhãn AI từng mạng; gói tối thiểu Basic; TikTok không có followers trong trang thống kê; Audience Insights và Best Time to Post; nguồn tệp đăng là bản tạm trên Supabase Storage; người đặt lại bài lỗi; câu chữ về trang kết nối 48 giờ. Test case không đổi.

Bổ sung 17/11/2026 (tra lại U10 rate-limits): bảng giới hạn ở §14 (thêm YouTube 30 bài/24 giờ, số bài hẹn giờ chờ theo gói và `SCHEDULED_POSTS_LIMIT`, số lần upload mỗi tháng qua `api_usage.count`, chặn IP khi API key sai, chống trùng theo hash nội dung, `idempotent_replay` kể cả khi nội dung khác, 409 `IDEMPOTENCY_KEY_IN_USE`, nhịp polling và cache); 3 dòng mới ở bảng lỗi §10.4; backoff tối thiểu 5 giây; 5 ca kiểm thử mới OPS-05〜OPS-09.

Bổ sung 17/11/2026: §8.4a viết lại theo tài liệu Upload-Post (U19 limit-of-uploads, U20 photo-requirements, U21 video-requirements, U22 character-limits, U23 post-to-tiktok-api, U24 error-handling), đối chiếu với tài liệu gốc của Meta và TikTok.
Bổ sung 17/11/2026: §8.4a thêm gói và chi phí theo số tài năng (U25), bảng lỗi thường gặp và tạm dừng tài khoản (U26); bảng lỗi §10.4 thêm 3 dòng; Q11 thêm câu hỏi white-label.
