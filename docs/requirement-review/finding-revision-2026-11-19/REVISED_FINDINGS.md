# Bản sửa16 finding REWRITE — R1

Đã sửa theo Independent Review; **chờ reviewer kiểm chứng lại**, không tự chuyển REWRITE thành ACCEPT. Chưa soạn Q&A. Không sửa20 REJECT,10 ACCEPT hoặc1 NEED_MORE_EVIDENCE.

Finding ID giữ nguyên; chỉ cập nhật16 dòng metadata trong Finding Register để trỏ R1 và đặt DRAFT/chờ kiểm lại. File finding và bảng chi tiết cũ bất biến. reviews.csv, review-results.csv và gate-runs.csv giữ nguyên. Trạng thái sửa/recheck mới lưu riêng trong recheck-list.csv, không ký thay reviewer.

| Finding | Vấn đề đã thu hẹp | Review | Recheck |
|---|---|---|---|
| [FND-0001](findings/FND-0001.md) | Quy tắc ghép và dùng tư liệu khi đổi/kết thúc kỳ đăng cần làm rõ | REWRITE | NOT_RUN |
| [FND-0004](findings/FND-0004.md) | Cách hiển thị kết quả bài khi các SNS có kết quả khác nhau cần đội lập phương án | REWRITE | NOT_RUN |
| [FND-0005](findings/FND-0005.md) | Lịch sử và hiệu lực duyệt sau sửa/gửi lại cần làm rõ | REWRITE | NOT_RUN |
| [FND-0007](findings/FND-0007.md) | Đích SNS và giờ khi đặt lịch lại sau lỗi cần làm rõ | REWRITE | NOT_RUN |
| [FND-0008](findings/FND-0008.md) | Phần còn mở về bài trong lúc dừng, hủy/dùng lại và dừng toàn kỳ | REWRITE | NOT_RUN |
| [FND-0011](findings/FND-0011.md) | Quan hệ chuyển trạng thái bằng tay và đề xuất tự chuyển cần làm rõ | REWRITE | NOT_RUN |
| [FND-0012](findings/FND-0012.md) | Danh sách trường và phạm vi nhập thông tin Talent trên M-20 cần xác nhận | REWRITE | NOT_RUN |
| [FND-0015](findings/FND-0015.md) | Giờ ba khung, loại lời nhắn và ngưỡng nhắc cần xác nhận | REWRITE | NOT_RUN |
| [FND-0016](findings/FND-0016.md) | Tiêu chí đạt và phạm vi quản lý thử thách cần đối chiếu với ý tưởng đã có | REWRITE | NOT_RUN |
| [FND-0017](findings/FND-0017.md) | Quy tắc đặt lại ngày liên tiếp là phụ thuộc được hẹn quyết khi vận hành | REWRITE | NOT_RUN |
| [FND-0018](findings/FND-0018.md) | Đơn giá video, quyền đổi và giá áp dụng trước/sau thay đổi cần xác nhận | REWRITE | NOT_RUN |
| [FND-0021](findings/FND-0021.md) | Nghĩa ngày bắt đầu tính phí và ranh giới kỳ video/thuê bao cần xác nhận | REWRITE | NOT_RUN |
| [FND-0023](findings/FND-0023.md) | Khác biệt đường thao tác văn phòng và phần tài khoản còn mở cần đối chiếu bản màn mới | REWRITE | NOT_RUN |
| [FND-0026](findings/FND-0026.md) | Khả năng dùng lại nháp cũ và quyền giữ/xóa tư liệu đang dùng cần làm rõ | REWRITE | NOT_RUN |
| [FND-0030](findings/FND-0030.md) | Thẩm quyền xác minh/cấp lại quyền quản trị khi mất phương tiện xác thực cần làm rõ | REWRITE | NOT_RUN |
| [FND-0031](findings/FND-0031.md) | Nộp lại sau từ chối và quyền thay đổi quyết định xét đơn cần làm rõ | REWRITE | NOT_RUN |

## Hồ sơ kiểm chứng lại

- [Danh sách kiểm lại, đường dẫn/hash R1](recheck-list.csv).
- [Chi tiết16 bản sửa](finding-details.csv).
- [So sánh trường trước–sau và lý do](changes.csv); mỗi finding có bảng so sánh và bản lưu nguyên văn trước sửa.
- [Nhật ký đọc lại nguồn gốc](source-audit.csv): nguyên văn, vị trí, hash và giới hạn. Bổ sung ngữ cảnh có thật, không tạo tài liệu khách hoặc quyết định mới.

FND-0008 tách rõ ba phần No.60/61/77 trong cùng ID. FND-0017 chỉ giữ dependency vận hành; không đưa thành yêu cầu khách trả lời ngay. FND-0012 không lặp tiêu chí hồ sơ đủ của0010; FND-0005/0007 dẫn quy tắc giờ về0006. FND-0023 ghi nhận bản màn app hiện hành nhưng không tự đóng No.66.

## Giữ lịch sử và giới hạn

Sổ findings là đầu ra kế tiếp, có bản trước trong before/findings-register.csv. Manifest của đợt Gap/Independent Review cũ không bị sửa: nếu validator cũ kiểm sổ findings hiện hành sẽ phát hiện khác biệt có chủ đích; không làm mới hash lịch sử để che thay đổi. Đợt này kiểm hash artifact cũ trừ sổ findings đã được giao cập nhật, đối chiếu31 dòng ngoài phạm vi không đổi.

Chỉ kiểm văn bản/ô nguồn. Không tự xác nhận connector hình5-1 hoặc các hình chưa xem; không chạy dịch vụ ngoài hay suy phần mềm đã lỗi. Nguồn gốc không thay hash.

Đã hoàn tất bản sửa để Independent Reviewer kiểm; không có kết quả ACCEPT mới, không thay chữ ký, gate hoặc Customer Confirmed. Dừng ở đây chờ review.
