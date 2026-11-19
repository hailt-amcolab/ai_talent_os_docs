# Kiểm tra áp dụng WCP-0001

- PASS: hash trước/sau của7 file khớp hồ sơ thay đổi; bản đề xuất/snapshot input giữ nguyên.
- PASS:153 file được bảo vệ giữ nguyên hash, gồm12 nguồn khách, finding/review/evidence/gate-run và Q&A hiện hữu.
- PASS: so sánh nguyên văn các mục G1–G5, G7/G8 trước/sau không có thay đổi; G6 chính thức vẫn có đầu vào G5 PASS và ủy quyền gửi riêng.
- PASS: WORKING_DRAFT và APPROVED_QA được tách trong Quality Gates, Data Model, Runbook và hướng dẫn agent/skill; REWRITE yêu cầu kiểm lại ACCEPT đúng bản.
- PASS: validator chung kiểm12 nguồn/hash,9 schema CSV và các đường dẫn workflow. Đây là kiểm cơ học, không phải review độc lập hoặc PASS gate.

Không chạy lại kiểm nghiệp vụ hoặc dịch vụ ngoài: thay đổi chỉ là quy tắc workflow. Các kiểm tra eligibility nội dung phải được thực hiện khi được giao soạn Q&A. Không tạo Q&A trong đợt này.
