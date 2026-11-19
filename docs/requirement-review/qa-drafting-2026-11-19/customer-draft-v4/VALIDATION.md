# Kiểm tra V4

PASS:44/44 câu gốc có disposition và căn cứ riêng;36 câu hiện hành (35 ID cũ và1 ID tách ý đã có), không đánh số lại các ID giữ nguyên.9 câu bị loại/giữ chờ không xuất hiện trong tập khách đọc hoặc CSV hiện hành.

PASS:172 lượt đối chiếu nguồn có nguyên văn, locator, hash; Finding Register, nguồn, review và gate không đổi. Đã đọc thêm tài liệu auth nội bộ đúng ranh giới thẩm quyền; bản đó vẫn ghi khôi phục khi mất máy chưa chốt.

PASS: Markdown/CSV/Internal Evidence khớp ID/nội dung/hash; tiếng Việt, nhãn bị cấm được loại khỏi câu; bản trước và lịch sử đủ44 câu được giữ. Validator chung PASS12 nguồn,9schema và link.

Lệnh chạy: `python3 docs/requirement-review/qa-drafting-2026-11-19/customer-draft-v4/validate_qa_reaudit.py` và `python3 docs/requirement-review/validate.py`.

Đây là tự rà/sửa của Analyst theo phản hồi người dùng, không là ký independent review hoặc G6 PASS. Tech Lead cần kiểm bản sửa; mọi câu còn DRAFT_UNAPPROVED. Các giới hạn đọc hình/connector được nêu ở báo cáo và source-audit.csv.
