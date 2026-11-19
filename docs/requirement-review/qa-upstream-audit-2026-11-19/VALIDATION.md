# Kiểm tra hồ sơ truy ngược

PASS:44 ID Q&A trước V4 có chuỗi ngữ cảnh và kết quả xử lý;13 nhóm kết luận có68 lượt mở nguồn đúng hash/locator và trích record upstream đúng phiên bản. Danh sách sửa xác định gồm5REQ, vẫn PROPOSED_NOT_APPLIED.

PASS: mọi file nguồn/register/review/gate/Q&A đầu vào giữ nguyên hash trong lượt này. Hồ sơ kýG5 có44 review IDs, đường dẫn/hash khớp approval; prefix review lịch sử không đổi. Điều này xác nhận liên kết hồ sơ, không tự khẳng định chi tiết người ký đã đọc ngoài điều người dùng xác nhận.

PASS: validator chung về12 nguồn/schema/link; validator extraction cũng PASS. Các validator snapshot cũ cóFAIL vì đầu vào hiện hành đã có successor được ghi nhận; xem historical-validator-results.json và phần giải thích trong báo cáo. Không sửa manifest hoặc script cũ để ép PASS.

Lệnh kiểm hồ sơ mới: `python3 docs/requirement-review/qa-upstream-audit-2026-11-19/validate_upstream_audit.py`.

Không coi kiểm cơ học thay kiểm nghĩa độc lập. Đây là audit có mục tiêu, không tái chứng nhận toàn175REQ/90BR/30flow. G1–G8 không bị thay trạng thái; không có sửa nghiệp vụ hoặc chữ ký mới.
