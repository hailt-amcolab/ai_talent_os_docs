# Kiểm tra hồ sơ kiểm chứng

Đã chạy thành công:

- `python3 docs/requirement-review/full-reverification-2026-11-19/validate_reverification.py`
- `python3 docs/requirement-review/validate.py`
- `python3 docs/requirement-review/qa-drafting-2026-11-19/customer-draft-v4/validate_qa_reaudit.py`

Validator mới kiểm330 tệp đầu vào giữ nguyên hash,12 nguồn,519 tham chiếu nguồn mở lại,513 evidence khớp, tập ID và dossier của175REQ/90BR/30flow/281bước/64transition/47finding/36Q&A;219scenario,319 đơn vị map nguồn,44ID lịch sử,47 lượt xem hình/trang và91 tham chiếu màn. Nó cũng kiểm hash finding với review và Q&A, trạng thái nháp và bảo toàn các lần ghi gate.

PASS của script là tính toàn vẹn/bao phủ của **hồ sơ audit**, không phải PASS nội dung nghiệp vụ hoặc Quality Gate. 12 nhóm FV vẫn OPEN, các đề nghị sửa chưa áp dụng. Kết luận ngữ nghĩa và nguồn đối chiếu nằm trong REVERIFICATION_REPORT.md/issues.csv, không do validator tự suy ra.

Validator chung PASS về12 nguồn, schema và liên kết. Validator Q&A V4 PASS về44ID đã rà,36câu đồng bộ và lịch sử được bảo toàn. Các validator lịch sử khác đã có phân tích giới hạn snapshot ở đợt upstream audit; lượt này không sửa hoặc ép chúng PASS.

Không chạy test ứng dụng vì không thay code/hành vi sản phẩm; không kiểm hoặc tuyên bố đã thử provider. Không thêm chữ ký, thay review hoặc đổi gate.
