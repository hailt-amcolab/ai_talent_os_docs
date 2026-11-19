# TECHNICAL_ONLY

Đây là view của Finding Register; không cấp mã/đếm thành vấn đề mới. Không tạo Customer Q&A.

- [FND-0034 — Đối soát kết quả ngoài, chống lặp và đồng thời là việc đội tích hợp](findings/FND-0034.md): Không yêu cầu khách chọn idempotency, khóa, timeout, webhook hay giao dịch. Nếu chính sách giá/quyền thay đổi, dùng finding nghiệp vụ riêng.
- [FND-0035 — Snapshot, xung đột ghi file và phục hồi gửi/tạo tài nguyên thuộc thiết kế đội](findings/FND-0035.md): Không hỏi khách chọn kho tạm, etag, chunk hay snapshot. Tiêu chí hồ sơ đủ và quyền lưu/xóa theo finding riêng.
- [FND-0036 — Hủy biểu mẫu, validation và lỗi trình bày cần đội thiết kế](findings/FND-0036.md): Không gửi danh sách hủy từng form hay min/max kỹ thuật cho khách. Chỉ yêu cầu thay chính sách rõ ràng mới trình BA.
- [FND-0037 — Giờ vận hành, backup, retention log và phục hồi là phần đội đề xuất](findings/FND-0037.md): Không hỏi lại khách thời hạn log/backup như việc chưa được phân công; chính sách giữ dữ liệu nghỉ6 tháng đã rõ.
- [FND-0038 — Điều kiện tài khoản và tham số tích hợp cần kiểm với bên cung cấp](findings/FND-0038.md): Có thể cần đầu mối IT cung cấp thông tin theo No.8/24; đó không phải câu hỏi nghiệp vụ mới.
