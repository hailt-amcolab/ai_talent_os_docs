# G5 — PASS theo phê duyệt của người dùng

Căn cứ trực tiếp: **“tôi đã review ký phê duyệt G5 cho tôi đi”**. Người phê duyệt: **người dùng trong hội thoại hiện tại**, tự xác nhận đã review. Codex ghi nhận theo chỉ đạo, không ký dưới danh tính reviewer AI.

- Gate-run: **GATE-0012 / G5 / PASS**, thay trạng thái hiện hành của GATE-0011; giữ nguyên dòng BLOCKED lịch sử.
- G1–G4 đầu vào đã PASS: GATE-0007, GATE-0008, GATE-0009, GATE-0010.
- Phạm vi duyệt: **24 finding ACCEPT** và chấp nhận kết quả **20 finding REJECT** được loại/phân tuyến.44 bản finding được khóa đúng hash; danh sách, phạm vi giữ và review ID trong [approval.json](approval.json).
- Ngoài phạm vi: **FND-0004, FND-0013, FND-0016** vẫn NEED_MORE_EVIDENCE; không được soạn thành câu hỏi. Các nhánh phụ thuộc vẫn cần làm rõ, không suy đã sẵn sàng đặc tả/triển khai.
- **FND-0017** giữ lịch vận hành, chưa hỏi ngay. Các phần cần phương án đội trước vẫn phải thực hiện theo review.

Đã thêm44 hồ sơ review có reviewer là người dùng, status ACCEPTED. ACCEPTED chấp nhận kết quả review; không đổi20 finding REJECT thành ACCEPT hoặc tự sửa bản finding. Các review AI cũ và eligibility lịch sử giữ nguyên.

Chưa phê duyệt G6–G8, chưa APPROVED_QA, chưa gửi khách và chưa xác nhận nghiệp vụ thay khách. Việc soạn Q&A cần lệnh riêng; G5 này không cấp quyền tự gửi. Thay nguồn hoặc finding hash phải kiểm lại phần ảnh hưởng.

Đây là bản ghi phê duyệt mới, không sửa báo cáo BLOCKED đã lập trước đó. [Snapshot đầu vào](input-manifest.json) khóa đúng phiên bản; [bản kiểm giữ nguyên](preserved-inputs.json) và bản trước hai ledger giữ lịch sử.
