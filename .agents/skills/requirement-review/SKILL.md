---
name: requirement-review
description: Thiết lập hoặc thực hiện phân tích, truy vết, xác minh yêu cầu và rà soát Q&A cho AI Talent OS theo nguồn gốc và G1–G8. Dùng khi được giao kiểm soát chất lượng yêu cầu; không tự mở rộng sang phân tích toàn dự án, soạn câu hỏi khách hoặc triển khai.
---

# Kiểm soát yêu cầu AI Talent OS

Xác định phạm vi và giai đoạn được người dùng giao. Yêu cầu thiết lập workflow không cho phép bắt đầu phân tích nghiệp vụ, tạo Customer Q&A hoặc gửi liên lạc ra ngoài. Chỉ chạy giai đoạn được giao; phần tiếp theo có thể báo còn thiếu, không tự làm thay quyết định khách.

## Tài liệu phải đọc

Từ gốc repository, đọc `AGENTS.md`, `TAI_LIEU_NGUON.md`, rồi `docs/requirement-review/SOURCE_REGISTER.md`, `DATA_MODEL.md` và `QUALITY_GATES.md`. Đọc `RUNBOOK.md` để chọn đầu ra và nơi lưu. Đường dẫn ở đây tính từ gốc repo, không phải thư mục skill. Tái sử dụng phân tích/SCD/workbook15 theo bảng nơi quản lý trong README của bộ quy trình.

## Điều kiện bất biến

1. Mỗi kết luận có nguồn đúng phiên bản/hash và vị trí; mở nguồn trực tiếp trước VERIFIED. Báo cáo cũ không thay việc đọc lại nguồn. Không đọc được ảnh hoặc ô quan trọng thì ghi giới hạn và chặn kết luận liên quan.
2. Không tự suy diễn requirement hoặc giải quyết mâu thuẫn nghiệp vụ. Giữ finding mở, nêu hai phía bằng chứng và đúng bên cần quyết định.
3. Tách FACT (sự kiện), INFERENCE (suy luận), ASSUMPTION (giả định), PROPOSAL (đề xuất); tách kiểm chứng với phê duyệt nghiệp vụ/thiết kế/thương mại/phát hành.
4. Không dùng tài liệu nội bộ, code/demo, màu SCD hoặc Close/OK đơn lẻ làm bằng chứng khách đã chốt toàn bộ. Không tự hợp thức hóa thiếu quyết định bằng tham số cấu hình.
5. Trước finding hoặc câu hỏi, đọc đủ các log QA/KS/GJ liên quan, gồm năm sheet QA và SD ngày 18/11; kiểm workbook15, RV/G/TR/FL và ID cũ. Câu đã được trả lời không hỏi lại; câu còn mở tiếp tục dưới QA No. cũ. Quyết định trả lời một phần không đóng ý khác.
6. Việc kỹ thuật do đội/provider xử lý; chỉ hành vi, chính sách hoặc phạm vi cần đúng thẩm quyền khách mới thành câu hỏi khách.
7. Mọi Q&A mới trước mắt viết tiếng Việt, dùng ngôn ngữ người không kỹ thuật hiểu; giải thích bối cảnh, ý cần quyết định và ảnh hưởng. Giữ câu trả lời/đề xuất tách biệt. Không dịch/sửa hàng loạt bản cũ chỉ vì áp dụng quy ước mới.
8. Không sửa nguồn trong `source_requiments/`; không ghi đè phân tích cũ hoặc thay mã màn AG bằng SD theo cùng số. Không sửa 56 dòng xác nhận được bảo vệ trong workbook15.

## Thực hiện và bàn giao

Chọn gate theo RUNBOOK; ghi EV và metadata vào sổ tương ứng, nội dung chính ở nơi hiện có. Ghi phiên bản input/output, người/ngày, kết quả và điều kiện chạy lại vào gate-runs. Nguồn thay đổi phải đánh STALE các kết quả bị ảnh hưởng và kiểm lại trước dùng.

G5 phải có reviewer khác tác giả, đọc nguồn và phản biện có hồ sơ. Thiếu người thì BLOCKED; tự đọc lại không thay review độc lập. Chỉ sử dụng subagent khi đã được người dùng hoặc hướng dẫn áp dụng cho phép; skill này không tự cấp phép delegation.

G7 chỉ ghi quyết định có bằng chứng và thẩm quyền; G8 chỉ PASS khi đủ điều kiện và người duyệt. Không tạo baseline APPROVED hoặc tuyên bố sẵn sàng từ các template trống. Kết thúc bằng phạm vi đã kiểm/chưa kiểm, thay đổi, bằng chứng, gate đạt/không đạt, việc còn thiếu và bên chịu trách nhiệm. Có thể chạy `python3 docs/requirement-review/validate.py` để kiểm cơ học; kết quả đó không thay kiểm chứng nghiệp vụ hay ký gate.

## Hai cấp Q&A theo WCP-0001 đã được người dùng chấp thuận

Khi có lệnh soạn riêng, được chuẩn bị WORKING_DRAFT nội bộ từ ACCEPT nội dung đúng Finding ID/hash, EV hiện hành truy xuất được và quyết định nghiệp vụ còn mở; kiểm điều kiện chi tiết tại QUALITY_GATES và RUNBOOK bước6a. ACCEPT của reviewer AI không thay chữ ký độc lập. REWRITE phải sửa và có ACCEPT nội dung sau kiểm lại đúng hash mới; loại REJECT/NEED_MORE_EVIDENCE, ý đã trả lời và phần thuần kỹ thuật. Giữ nguyên kết quả/eligibility review lịch sử, ghi đánh giá đợt mới với liên kết review gốc.

WORKING_DRAFT có thể được chuẩn bị khi G5 BLOCKED, ghi rõ chưa duyệt/không gửi. Không đổi trạng thái gate/reviewer/finding để mở nhánh soạn. APPROVED_QA vẫn cần G1–G6 PASS đúng phạm vi/còn hiệu lực và Tech Lead duyệt ID/phiên bản/hash cụ thể; gửi ngoài cần ủy quyền riêng, Customer Confirmed cần phản hồi thật theo G7. Chấp thuận thay workflow không tự cho phép soạn Q&A.
