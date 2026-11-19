# Xuất CSV Q&A và liên kết màn hình

qa-draft.csv chứa44 câu hiện hành, giữ nguyên ID, câu hỏi và lý do trong qa-draft.md. UTF-8 có BOM để mở tiếng Việt bằng Excel; phân cách dấu phẩy, trích dẫn ô theo chuẩn CSV.

Bản Markdown trước chưa có cột mã màn; phần internal có tham chiếu màn theo nguồn. Lần xuất này bổ sung mã màn chính/liên quan, tài liệu18/11, trang và giới hạn. screen-traceability.csv lưu một dòng mỗi liên kết để truy nguồn, tên màn gốc và SHA256. Tên màn gốc trong bảng truy vết giữ nguyên tiếng Nhật để đối chiếu; nội dung câu hỏi không được dịch hoặc sửa.

Liên kết màn là đối chiếu của Analyst với mô tả giao diện, không xác nhận quy tắc nghiệp vụ trong câu hỏi đã được duyệt. Các câu về email, thu phí, xóa nền, hàng video, phân công/khôi phục hoặc nháp cũ không bị gán màn chưa tồn tại: chỉ ghi màn liên quan và giới hạn. Không dùng mã AG lịch sử thay mã SD18/11. Tác vụ ngoài hệ thống không tự có mã màn nội bộ.

Không thay qa-draft.md, Internal Evidence, review hoặc Quality Gate. Tất cả câu vẫn DRAFT_UNAPPROVED. Đây là bản xuất của bản nháp, chưa được phép phát hành chính thức.
