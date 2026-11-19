# Kiểm tra Working Q&A W1

- PASS:44 câu /23 finding đúng bản được ACCEPT;14 ACCEPT sau kiểm lại R1 và10 ACCEPT ban đầu được xét, trừ0017 hoãn đến vận hành.
- PASS:47 finding có eligibility;20 REJECT và3 NEED_MORE_EVIDENCE không được dùng,0017 có lý do hoãn riêng. Không tự đổi REWRITE thành ACCEPT: sử dụng kết quả kiểm lại đã tồn tại.
- PASS: mọi câu có trạng thái DRAFT_UNAPPROVED, cấp WORKING_DRAFT, No. cũ, Finding ID và Internal Evidence riêng.
- PASS: kiểm hash nguồn và toàn bộ input; Finding Register/review/gate/Q&A cũ không bị sửa.
- PASS: tự rà văn phong tiếng Việt, loại thuật ngữ/nhãn bị cấm trong câu hỏi và đối chiếu phạm vi review. Không tự coi nguồn đề xuất đã được khách duyệt.
- PASS: validator chung kiểm12 nguồn/hash,9 schema CSV, đường dẫn workflow.

Phần phụ thuộc phương án đội chưa có không được đưa thành câu bắt khách thiết kế: nhịp tạo bài, xử lý tư liệu có lịch khi dọn dung lượng; phần trạng thái tổng và tiêu chí thử thách còn NEED_MORE_EVIDENCE không được hỏi. Nội dung email chỉ hỏi ba ý được nguồn nêu: sự kiện, phạm vi người nhận và nội dung; không thêm câu về lịch gửi.

Lệnh: `python3 docs/requirement-review/working-qa-2026-11-19/validate_working_qa.py`.

Các kiểm tra này thuộc khâu biên tập của Analyst, không thay review ngôn ngữ/nội dung của Tech Lead, không ký G5/G6, không cấp quyền phát hành.
