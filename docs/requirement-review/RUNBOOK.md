# Cách vận hành từng giai đoạn

## Bắt đầu một đợt

Người dùng chỉ định module/luồng, mục tiêu và đầu ra. Chưa có lệnh phân tích thì chỉ được thiết lập công cụ/tài liệu quy trình. Đọc catalog và các hướng dẫn gốc; kiểm working tree, không ghi đè thay đổi người khác. Dùng skill ở [.agents/skills/requirement-review/SKILL.md](../../.agents/skills/requirement-review/SKILL.md). Skill đặt ở cấp repository, không cài global; nếu phiên Codex chưa nạp catalog mới, mở phiên mới hoặc yêu cầu đọc trực tiếp đường dẫn này.

Mỗi đợt ghi phạm vi, nguồn và phiên bản, người lập, reviewer độc lập, người duyệt, phần không kiểm tra trong gate-runs. Các lệnh dưới là **mẫu giao việc cho Codex**, không phải lệnh shell. Chỉ chạy bước đã được giao; không hiểu mẫu là ủy quyền hiện tại.

| Giai đoạn | Mẫu giao việc | Kết quả / điểm dừng |
|---|---|---|
| 1. Tiếp nhận nguồn | “Dùng requirement-review, kiểm G1 cho [phạm vi], chỉ cập nhật sổ nguồn và bằng chứng; chưa phân tích.” | Snapshot và G1; thiếu nguồn cần thiết thì ghi BLOCKED |
| 2. Trích yêu cầu | “Phân tích [phạm vi] theo G2; tái sử dụng TR và workbook15; chưa soạn Q&A.” | Yêu cầu nguyên tử/quy tắc, EV và nhãn; không ghi kết luận khách chưa xác nhận |
| 3. Rà luồng | “Rà G3 cho [luồng] theo đúng phiên bản màn; nối FL/RV hiện có.” | Chỉ mục luồng, nhánh, kết quả kỳ vọng và phát hiện |
| 4. Xác minh phát hiện | “Chạy G4 cho [các mã]; tra lại toàn bộ log liên quan; phân việc khách/đội/provider.” | Finding hợp lệ, mục trùng/không hợp lệ và việc nội bộ |
| 5. Review độc lập | “Reviewer [người khác tác giả] thực hiện G5 trên [phiên bản], đọc nguồn trực tiếp.” | Review có phản biện, sửa và kiểm lại; thiếu reviewer thì BLOCKED |
| 6a. Chuẩn bị nội bộ | “Theo WCP-0001, soạn WORKING_DRAFT tiếng Việt từ ACCEPT nội dung đúng bản và đủ điều kiện; Internal Evidence riêng; chưa chạy G6/phát hành.” | Bản nháp nội bộ có truy vết; G5 BLOCKED không tự chặn nhánh này; nguồn/phản biện nội dung vẫn chặn câu liên quan |
| 6b. Duyệt Q&A | “Khi G1–G5 PASS còn hiệu lực, đánh giá G6 cho [ID/phiên bản]; trình Tech Lead phê duyệt.” | Chỉ ghi APPROVED_QA khi G6 PASS và Tech Lead duyệt đúng bản; gửi ngoài cần ủy quyền riêng |
| 7. Ghi nhận trả lời | “Đối chiếu phản hồi khách tại [nguồn/phiên bản/vị trí], chạy G7 cho [các ý].” | Chỉ mục quyết định và phạm vi thay thế; còn mở không tự đóng |
| 8. Chốt đặc tả | “Đánh giá G8 cho [phạm vi], đề xuất baseline và báo cáo sẵn sàng; không triển khai.” | SCD/AC đồng bộ sau khi được giao sửa, báo cáo và bản chốt có thẩm quyền |

Câu đã được khách trả lời đi thẳng nhánh tái sử dụng quyết định của G7 sau G1–G5; không tạo Q&A mới. G6/G7 không bắt buộc hỏi khách cho quyết định thuần kỹ thuật đã được phân quyền nội bộ. G8 vẫn phải chứng minh phần nghiệp vụ đủ căn cứ, kỹ thuật đủ kiểm chứng.

## Thao tác lưu hồ sơ

1. Tra ID chính trong file24/25, báo cáo23 và workbook15 trước khi cấp ID mới. Điền các sổ metadata, không chép toàn văn các phân tích cũ. Không sửa 56 dòng 確認 (mục xác nhận) được bảo vệ của workbook15.
2. Đọc nguồn tại vị trí chính xác; tạo EV với hash nguồn thực đọc, người/ngày và giới hạn. Ảnh hoặc sơ đồ cần xem trực quan; không đọc được thì ghi thiếu bằng chứng.
3. Mỗi kết quả gate là một dòng gate-runs mới, không xóa lần FAIL trước. Snapshot input/output có thể là commit đã có hoặc tệp manifest/hash của các artifact trong đợt; không tự commit khi chưa được giao.
4. Reviewer đọc nguồn độc lập, phản biện vào reviews.csv; tác giả sửa artifact, reviewer kiểm lại hash mới. Nếu dùng AI hỗ trợ phải ghi rõ và có người chịu trách nhiệm. Không coi lần tự đọc lại là review độc lập.
5. Trước G6/G7/G8, kiểm hash và log hiện hành lần nữa; thay đổi nguồn thì xử lý STALE theo DATA_MODEL.md. Quyết định mới chỉ giải quyết ý có bằng chứng và điều kiện đóng thỏa mãn.
6. Khi đủ G8, chốt danh sách ID/phiên bản/EV/quyết định và hash gói baseline; ghi người ký. Sửa sau chốt phải có mã thay đổi, tác động, quyết định cần thiết và baseline mới; bản cũ giữ nguyên.

## Kiểm tra cơ học

Từ thư mục gốc: `python3 docs/requirement-review/validate.py`.

Lệnh chỉ đọc: kiểm bộ 12 nguồn/hash so với kiểm kê28, schema CSV và đường dẫn nội bộ của bộ quy trình. Khi có thêm nguồn hợp lệ phải cập nhật catalog/manifest theo quy trình tiếp nhận; không sửa nguồn để làm kiểm tra qua. Lệnh **không** chứng minh yêu cầu đúng, không ký gate, không kiểm thẩm quyền khách, và không thay review bằng người. Kết quả PASS của script chỉ là kiểm tra cơ học.

## Chạy tiếp Prompt 06 — WCP-0001 đã được chấp thuận

Mẫu giao việc, không phải lệnh tự động hoặc ủy quyền gửi khách:

> Soạn qa-drafting-2026-11-19/qa-draft.md ở cấp WORKING_DRAFT theo WCP-0001. Chỉ dùng finding có ACCEPT nội dung đúng hash, EV hợp lệ, đúng phạm vi reviewer cho giữ và còn cần quyết định khách. Kiểm nguồn và log khách hiện hành, giữ No./ID cũ; không hỏi lại ý đã chốt. REWRITE chỉ xét khi đã sửa và có ACCEPT nội dung sau kiểm lại đúng bản mới. Loại REJECT/NEED_MORE_EVIDENCE và việc thuần kỹ thuật. Mỗi câu một quyết định, tiếng Việt, năm trường ID/Chức năng/Vấn đề cần xác nhận/Câu hỏi dành cho khách hàng/Lý do cần xác nhận. Internal Evidence riêng nối QA ID–Finding ID–EV–review–snapshot; ghi đánh giá eligibility mới thay vì sửa review cũ. Kiểm văn phong và đối chiếu phần được review cho giữ. Giữ trạng thái gate thực tế, không tự ký reviewer, không APPROVED_QA và không gửi khách.

1. Lưu bản trước và snapshot đợt soạn mới; không ghi đè manifest lịch sử. WORKING_DRAFT không phải lần G6 PASS.
2. Chỉ soạn tập đủ điều kiện đã kiểm lại; ACCEPT là ứng viên, không bắt buộc sinh câu hỏi. Giữ ID cũ, nguồn và giới hạn trong Internal Evidence.
3. Analyst xử lý REWRITE ở finding trước, lưu hash và nhờ reviewer kiểm lại nội dung; không vừa tự sửa vừa tự ký review độc lập.
4. Đến bước6b mới áp dụng đầy đủ đầu vào G6 và Tech Lead duyệt đúng bản. Nếu đánh giá G6 khi chưa đủ đầu vào thì vẫn ghi BLOCKED.
5. Lưu một bản nội dung chính theo README. Gói APPROVED_QA có manifest/hash riêng, không tự mở quyền gửi ngoài hoặc Customer Confirmed.

Các gate-run và eligibility trước WCP-0001 là hồ sơ lịch sử đúng quy tắc tại thời điểm chạy; không sửa ngược thành PASS/đủ điều kiện.
