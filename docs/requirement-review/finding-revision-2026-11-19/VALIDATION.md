# Kiểm tra bản sửa R1

- PASS: đúng16 ID được review REWRITE; không thêm/đổi ID.
- PASS:31 dòng Finding Register ngoài phạm vi giữ nguyên mọi trường, gồm20 REJECT,10 ACCEPT và1 NEED_MORE_EVIDENCE.
- PASS: FACT gốc được giữ nguyên nguyên văn trong từng bản sửa và cột original_confirmed_content; phần bổ sung ghi riêng ngữ cảnh/giới hạn.
- PASS: bản trước đúng hash đã được Independent Reviewer đọc; mỗi bản sau có hash riêng và bảng thay đổi.
- PASS:96 lượt đọc lại nguồn có nguyên văn, vị trí, source hash, người/ngày và giới hạn; nguồn thực được mở lại từ DOCX/XLSX/PDF/Markdown, không lấy diễn giải review làm nguồn khách.
- PASS: nguồn khách, finding/detail/manifest cũ, báo cáo/kết quả review, reviews.csv, gate-runs.csv và Q&A cũ giữ nguyên hash. Chỉ16 dòng metadata finding trỏ bản R1 và DRAFT/chờ kiểm lại.
- PASS: validator chung kiểm12 nguồn/hash,9 schema CSV và các liên kết workflow.

Lệnh: `python3 docs/requirement-review/finding-revision-2026-11-19/validate_revision.py` và `python3 docs/requirement-review/validate.py`.

Đây là kiểm tra toàn vẹn/liên kết do Analyst thực hiện, không thay kiểm chứng độc lập nội dung. recheck_result vẫn NOT_RUN, review_result vẫn REWRITE; chưa đủ điều kiện Q&A chỉ vì đã sửa. Dừng chờ reviewer đọc đúng hash R1 và phản biện/ghi kết quả riêng.
