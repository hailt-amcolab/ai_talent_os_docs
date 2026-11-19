# WCP-0001 — Chấp thuận và áp dụng

Trạng thái: APPLIED. Phê duyệt này chỉ áp dụng thay đổi workflow, không phải duyệt Q&A hoặc Quality Gate.

## Căn cứ chấp thuận

Người dùng trong hội thoại hiện tại: “có chấp thuận **WCP-0001**”, sau đó chỉ đạo “tiếp tục”. Không tự đặt tên người ký hoặc tạo chữ ký reviewer. Bản đề xuất được duyệt giữ nguyên tại [PROPOSAL.md](../PROPOSAL.md); hash và nguyên văn chấp thuận lưu trong [approval.json](approval.json).

## Thay đổi đã áp dụng

| File | Nội dung |
|---|---|
| [QUALITY_GATES.md](../../QUALITY_GATES.md) | Nhánh chuẩn bị WORKING_DRAFT trước G6; G6 chính thức vẫn cần G5 PASS; APPROVED_QA cần G1–G6 và Tech Lead duyệt đúng bản; giữ ủy quyền gửi riêng |
| [DATA_MODEL.md](../../DATA_MODEL.md) | Tách kết quả review nội dung, chữ ký review, gate, cấp Q&A và xác nhận khách; metadata truy vết và phiên bản |
| [RUNBOOK.md](../../RUNBOOK.md) | Bước6a chuẩn bị nội bộ,6b duyệt G6; mẫu giao việc Prompt06 và lưu lịch sử |
| [README.md](../../README.md) | Một bản nội dung chính Markdown cho đợt được chỉ định; workbook15 giữ mã/lịch sử, tránh bản sao song song |
| [AGENTS.md](../../../../AGENTS.md) | Đồng bộ quyền soạn nội bộ và điều kiện phê duyệt chính thức |
| [CLAUDE.md](../../../../CLAUDE.md) | Dẫn chiếu quy trình mới, giữ điều kiện gửi/duyệt |
| [requirement-review/SKILL.md](../../../../.agents/skills/requirement-review/SKILL.md) | Đồng bộ ACCEPT nội dung với WORKING_DRAFT; không thay chữ ký G5 |

WORKING_DRAFT chỉ được tạo khi có lệnh soạn riêng, đúng finding hash được ACCEPT về nội dung, EV còn hợp lệ và quyết định khách còn mở. REWRITE phải sửa và có ACCEPT sau kiểm lại đúng bản mới. Loại REJECT/NEED_MORE_EVIDENCE, ý đã trả lời và phần thuần kỹ thuật. ACCEPT là ứng viên, không tự tạo câu hỏi. Không đổi kết quả/eligibility review lịch sử.

## Giữ nguyên và lịch sử

Không sửa nguồn khách, Finding Register, review, evidence, gate-run hoặc bản Q&A hiện hữu. Không đánh PASS G1–G5, không tạo chữ ký hay Customer Confirmed. Các điều kiện của G1–G5, G7/G8 giữ nguyên. G6 chỉ tách quyền chuẩn bị nội bộ khỏi lần đánh giá/phê duyệt chính thức.

Bản trước của bảy file quản trị lưu tại application/before theo đường dẫn trong approval.json, dùng hậu tố .txt để đánh dấu bản lưu bất biến và tránh công cụ kiểm link coi đây là hướng dẫn hiện hành. Snapshot input của đề xuất và bản đề xuất không bị sửa. Snapshot [preserved-inputs.json](preserved-inputs.json) kiểm153 file ngoài phạm vi thay đổi, gồm12 nguồn khách, kết quả phân tích/review và Q&A cũ.

Manifest lịch sử không được cập nhật ngược để che thay đổi quy trình. Validator của đợt cũ nếu kiểm hash workflow/snapshot hiện hành có thể báo khác biệt quản trị được duyệt; không dùng kết quả đó để sửa nguồn hoặc tự ký gate. Bản ghi áp dụng mới giữ hash trước/sau để đánh giá đúng nguyên nhân.

## Kiểm tra và cách chạy tiếp

Xem [VALIDATION.md](VALIDATION.md). Kiểm cơ học không thay chữ ký hoặc quyết định nghiệp vụ.

Để giao việc tiếp: “Chạy Prompt06 theo WCP-0001 đã áp dụng; soạn WORKING_DRAFT tiếng Việt từ finding ACCEPT nội dung đủ điều kiện; Internal Evidence riêng; không tự duyệt hoặc gửi khách.” Mẫu đầy đủ ở RUNBOOK. Lần áp dụng workflow này chưa soạn Q&A.
