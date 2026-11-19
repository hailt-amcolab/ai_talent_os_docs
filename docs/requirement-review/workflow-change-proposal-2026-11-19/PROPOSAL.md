# WCP-0001 — Tách soạn nháp nội bộ và phê duyệt Q&A

Trạng thái: PROPOSED — CHỜ TECH LEAD CHẤP THUẬN. Tài liệu này là đề xuất thay đổi quy trình, chưa có hiệu lực. Không sửa quy tắc hiện hành, kết quả review, Finding Register, gate hoặc Q&A trong đợt này.

## 1. Nguyên nhân Q&A trống

[QUALITY_GATES.md, G6](../QUALITY_GATES.md) quy định đầu vào: “G5 PASS, finding REVIEWED cần khách quyết định”. Đầu ra cùng gate lại gọi là “bản nháp tại workbook15 được duyệt nội bộ”. Như vậy việc viết nháp và việc duyệt nháp đang dùng chung một điểm vào. [RUNBOOK](../RUNBOOK.md) bước6 tiếp tục gắn biên tập với chạy G6, chưa định nghĩa nhánh chuẩn bị nội bộ riêng.

G5 yêu cầu G1–G4 PASS và reviewer được chỉ định ký ACCEPTED. [Gate Register](../registers/gate-runs.csv) ghi GATE-0005/G5 BLOCKED; GATE-0006/G6 BLOCKED. [Reviews Register](../registers/reviews.csv) có31 OPEN,16 CHANGES_REQUESTED,0 ACCEPTED. Trong khi [review-results.csv](../independent-review-2026-11-19/review-results.csv) có10 ACCEPT,16 REWRITE,20 REJECT,1 NEED_MORE_EVIDENCE. Báo cáo review ghi rõ reviewer AI chưa thay chữ ký độc lập bằng người. Các con số này mô tả các trục trạng thái khác nhau, không mâu thuẫn.

Điều khoản cuối QUALITY_GATES cho phép “chuẩn bị nháp/khảo sát phần độc lập, ghi rõ chưa qua gate”, nhưng không nói rõ Q&A từ finding phụ thuộc G5 có thuộc nhánh này không. Với G6 đang ghi điều kiện cụ thể, điều khoản chung không đủ làm căn cứ tự vượt điều kiện. Lệnh Prompt06 trước đó còn giới hạn chỉ finding đã vượt Independent Review. Vì thế qa-draft.md trống là kết quả áp dụng điều kiện hiện hành, không phải do thiếu finding ACCEPT về nội dung.

AGENTS và skill bắt buộc reviewer khác tác giả cho G5; không có câu cấm tuyệt đối mọi hoạt động viết nháp trước G5. CLAUDE phân biệt bản nháp workbook15 với nguồn xác nhận khách. Các quy tắc này phải giữ. Cần Tech Lead chấp thuận nhánh chuẩn bị Q&A mới một cách minh thị trước khi áp dụng.

## 2. Năm khái niệm độc lập

| Khái niệm | Điều kiện/bằng chứng | Không tự kéo theo |
|---|---|---|
| Hợp lệ về nội dung | Kết quả ACCEPT tại review-results, đúng Finding ID, đúng phiên bản/hash và phạm vi được giữ | Chữ ký reviewer, G5 PASS hoặc được gửi khách |
| Reviewer ký xác nhận | Review ACCEPTED có người được chỉ định khác tác giả, hồ sơ nguồn/phản biện và phiên bản đã kiểm | Toàn bộ G5 PASS nếu còn thiếu điều kiện gate |
| Quality Gate phê duyệt | Gate-run PASS theo phạm vi, đủ đầu vào, bằng chứng, người duyệt và phiên bản | Gửi ra ngoài hoặc khách xác nhận |
| Được viết nháp nội bộ | Sau khi WCP-0001 được chấp thuận: đủ điều kiện WORKING_DRAFT dưới đây | Finding REVIEWED, review ACCEPTED, gate PASS hoặc Q&A APPROVED |
| Q&A được duyệt/phát hành | APPROVED_QA có G1–G6 PASS cho phạm vi và Tech Lead duyệt đúng bản; gửi ngoài còn cần ủy quyền riêng | Customer Confirmed; điều này chỉ ghi sau phản hồi thật ở G7 |

Đánh giá nội dung do AI hỗ trợ được dùng làm đầu vào chuẩn bị nội bộ theo đề xuất này, không được đổi tên thành chữ ký reviewer độc lập. Không hạ điều kiện người chịu trách nhiệm ở G5.

## 3. Hai cấp Q&A được đề xuất

### WORKING_DRAFT

Chỉ phục vụ Analyst/Tech Lead. Mỗi bản hiển thị đầu trang: “WORKING_DRAFT — bản nháp nội bộ, chưa được phê duyệt, không gửi khách; trạng thái gate được ghi riêng”. Không ghi là đã vượt G5/G6 hoặc dùng làm yêu cầu đã được khách xác nhận.

Điều kiện đồng thời:

1. Có Finding ID và bản finding được định danh bằng hash.
2. Có EV trỏ nguồn đúng phiên bản/hash/vị trí; nguồn/finding chưa thay đổi ngoài phạm vi đã kiểm. Có thay đổi thì kiểm ảnh hưởng và review lại phần liên quan, không dùng ACCEPT cũ cho bản mới.
3. Có kết quả review nội dung ACCEPT của đúng bản và đúng phần được reviewer cho giữ. Giữ nguyên danh tính/giới hạn reviewer AI theo hồ sơ gốc.
4. Có một quyết định nghiệp vụ còn mở, cần thẩm quyền khách; đã đối chiếu log khách hiện hành và chống trùng. ACCEPT chỉ tạo ứng viên, không buộc phát sinh câu hỏi.
5. Không thuộc REJECT, NEED_MORE_EVIDENCE, ALREADY_ANSWERED hoặc TECHNICAL_ONLY. Không đưa phần ngoài phạm vi ACCEPT vào câu hỏi.
6. REWRITE chỉ đủ điều kiện sau khi tác giả sửa đúng phản biện và có bản ghi kiểm lại nội dung ACCEPT cho hash mới. Chưa có kiểm lại thì loại khỏi tập được soạn.
7. Có liên kết QA No./ID hiện có nếu cùng quyết định; không cấp số khách mới để thay câu cũ. Không có câu hỏi thật thì không tạo ID giữ chỗ.

Các G1–G5 đang BLOCKED vẫn giữ nguyên. Chỉ thiếu chữ ký/gate hành chính không ngăn chuẩn bị nội bộ; thiếu nguồn, sai hash, phản biện chặn nội dung hoặc chưa xác minh quyết định khách thì vẫn ngăn câu liên quan. Nhánh này không phải G6 PASS có điều kiện.

### APPROVED_QA

Chỉ chuyển từ WORKING_DRAFT bằng hành động duyệt có hồ sơ, không tự động:

- G1–G5 PASS còn hiệu lực, đúng phạm vi finding/câu hỏi, reviewer ký đúng điều kiện hiện hành.
- G6 PASS: tiếng Việt, dễ hiểu, mỗi câu một quyết định, không trùng/đã trả lời, không thuần kỹ thuật, nguồn còn hiện hành, đủ truy vết và reviewer kiểm nội dung/ngôn ngữ.
- Tech Lead phê duyệt rõ danh sách QA ID, phiên bản/hash gói, người/ngày; phần chưa duyệt bị loại khỏi gói, không tự duyệt lây các câu còn lại.
- Bất kỳ chỉnh sửa nội dung nào sau duyệt phải có phiên bản mới và đánh giá lại phần duyệt/gate bị ảnh hưởng. Bản cũ được giữ nguyên; chỉ được phát hành bản có phê duyệt phù hợp.

APPROVED_QA nghĩa là được duyệt nội bộ để chuẩn bị phát hành. Việc gửi khách vẫn cần đầu mối có thẩm quyền và ủy quyền gửi riêng theo G6 hiện hành. G7 đòi phản hồi khách thật; G8 tiếp tục giữ điều kiện readiness hiện tại. Không yêu cầu G7/G8 trước gửi câu hỏi để tránh vòng lặp phải có câu trả lời trước khi hỏi.

## 4. Chuyển giai đoạn đề xuất

| Tình huống | Nhánh được làm | Nhánh bị chặn |
|---|---|---|
| ACCEPT nội dung, bằng chứng hợp lệ, G5 BLOCKED | Chuẩn bị WORKING_DRAFT sau khi WCP-0001 được duyệt | G6 PASS, APPROVED_QA, gửi khách |
| REWRITE chưa sửa/kiểm lại | Sửa finding trong phạm vi phản biện, lưu hash và xin kiểm lại | Soạn câu từ bản chưa kiểm lại |
| REWRITE đã sửa và có ACCEPT nội dung cho bản mới | Có thể chuẩn bị WORKING_DRAFT sau kiểm điều kiện khác | Không tự đổi review ký/gate |
| REJECT | Giữ lịch sử, loại khỏi tập hỏi khách | Soạn lại cùng ý dưới ID khác |
| NEED_MORE_EVIDENCE | Bổ sung nguồn, báo kết quả điều tra, review lại | Suy diễn để soạn câu |
| G1–G5 PASS; Q&A đủ chuẩn G6 và Tech Lead duyệt bản cụ thể | Ghi APPROVED_QA sau đủ hồ sơ | Gửi ngoài nếu chưa có ủy quyền |
| Nguồn/finding thay đổi | Đánh ảnh hưởng; kiểm lại phần liên quan; giữ lịch sử bản cũ | Dùng ACCEPT/chữ ký/hash cũ cho bản mới |

Không thêm hoặc đổi tên G1–G8. Tách “chuẩn bị bản nháp” khỏi “chạy gate G6”; không coi nhánh chuẩn bị là vượt gate.

## 5. Nội dung sửa cụ thể trình duyệt

Chỉ áp dụng sau khi Tech Lead đồng ý WCP-0001. Các đoạn dưới là nội dung dự kiến, không phải quy tắc có hiệu lực.

### QUALITY_GATES.md

Giữ nguyên toàn bộ Input/Validation/Pass/Fail/Trách nhiệm của G1–G5, G7/G8. Giữ nguyên G6 Input “G5 PASS, finding REVIEWED…” cho lần đánh giá/phê duyệt chính thức.

Chèn trước G6:

> Chuẩn bị Q&A nội bộ trước G6: khi được giao, Analyst được tạo WORKING_DRAFT từ finding có kết quả review nội dung ACCEPT, ID/hash và EV truy xuất được, không có điểm chặn nội dung hoặc nguồn đã đổi chưa kiểm lại. REWRITE phải được sửa và review nội dung lại thành ACCEPT đúng hash mới. REJECT/NEED_MORE_EVIDENCE không đủ điều kiện. WORKING_DRAFT không phải kết quả PASS G6, không thay reviewer ký, không được gửi khách. G1–G5 giữ nguyên trạng thái thực tế.

Làm rõ G6 Output:

> Bộ Q&A đạt G6 và được Tech Lead phê duyệt đúng phạm vi/phiên bản được ghi APPROVED_QA. Việc gửi ra ngoài vẫn cần ủy quyền riêng. WORKING_DRAFT chưa qua các điều kiện này không được dùng thay bản được duyệt.

Làm rõ mục “Khi không đạt”: chuẩn bị WORKING_DRAFT theo điều kiện riêng là hoạt động nội bộ có kiểm soát, không chuyển phần phụ thuộc qua gate hoặc tự đánh PASS.

### DATA_MODEL.md

Bổ sung hai trục độc lập: `content_review_result` (ACCEPT/REWRITE/REJECT/NEED_MORE_EVIDENCE) và `qa_level` (WORKING_DRAFT/APPROVED_QA). Giữ nguyên review.status, finding.status và gate.result hiện hành. Trạng thái công việc/lỗi thời/loại khỏi gói lưu riêng, không trộn vào cấp phê duyệt.

Metadata Q&A đề xuất: `qa_id`, `existing_qa_refs`, `finding_ids`, `finding_sha256_refs`, `evidence_ids`, `content_review_refs`, `content_review_result`, `recheck_refs`, `qa_level`, `internal_evidence_ref`, `source_snapshot_ref`, `draft_version`, `draft_sha256`, `prepared_by`, `prepared_at`, `gate_run_refs`, `tech_lead_approval_ref`, `release_authorization_ref`, `change_reason`, `supersedes_ref`. Trường phê duyệt để trống/có lý do khi WORKING_DRAFT; không tạo chữ ký mặc định. Đây chưa phải thay đổi schema CSV được triển khai.

Mỗi câu có Finding ID và EV của đúng quyết định; nhiều finding cùng một quyết định có thể chung câu nhưng giữ đầy đủ ID. Một finding chứa nhiều quyết định phải tách câu theo quyết định, giữ liên kết finding và No. cũ. ID câu đã phát hành không đổi khi sửa hoặc gộp; câu bị thay giữ lịch sử và liên kết mã chính. Nguồn/EV/ghi chú kỹ thuật ở Internal Evidence, không chép nhãn kỹ thuật vào câu khách đọc.

### RUNBOOK.md

Tách bước6 thành6a “soạn WORKING_DRAFT nội bộ theo điều kiện ACCEPT nội dung” và6b “chạy G6 sau G5 PASS, Tech Lead duyệt APPROVED_QA”. Không yêu cầu ghi G6 PASS để đánh dấu đã viết nháp; nếu đánh giá G6 khi đầu vào chưa đủ, vẫn ghi BLOCKED đúng thực tế. Giữ quy tắc ký G5 và gửi ngoài.

### README.md và quy ước lưu trữ

Q&A được lưu ở đúng một nơi chính. Với đầu ra Markdown đã được người dùng chỉ định: dùng qa-drafting-2026-11-19/qa-draft.md làm bản biên tập của đợt, Internal Evidence riêng cùng thư mục. Workbook15 giữ mã/lịch sử hiện có, chỉ trỏ đến bản Markdown; không chép thêm bộ câu hỏi song song. Bản được duyệt phải có manifest/hash riêng. Nếu chuyển nơi chính sau này, ghi quyết định chuyển và liên kết, giữ bản cũ bất biến.

### AGENTS.md và skill requirement-review

Chỉ bổ sung dẫn chiếu rõ: ACCEPT nội dung đủ xét chuẩn bị WORKING_DRAFT sau kiểm điều kiện; G5 PASS/chữ ký độc lập vẫn bắt buộc cho APPROVED_QA và gate chính thức. Không xóa hay sửa yếu điều khoản reviewer khác tác giả. CLAUDE không cần thay đổi điều kiện phê duyệt; có thể thêm liên kết đến quy tắc mới nếu cần đồng bộ chỉ dẫn, sau chấp thuận.

Không sửa review-results.csv/qa_eligibility lịch sử hoặc ACCEPT thành ACCEPTED. Nếu cần cập nhật eligibility cho đợt mới, lập đánh giá mới liên kết WCP được duyệt, finding hash và review gốc; giữ nguyên hồ sơ review cũ.

## 6. Phạm vi có thể chạy tiếp sau chấp thuận

10 ứng viên ACCEPT nội dung: FND-0002, FND-0003, FND-0006, FND-0009, FND-0010, FND-0014, FND-0022, FND-0024, FND-0025, FND-0028.

Đây chưa phải10 câu hỏi tự động được phép gửi hoặc chắc chắn đủ điều kiện soạn. Prompt06 phải kiểm lại nguồn, hash, nội dung còn mở, No. cũ và phạm vi được reviewer cho giữ.16 REWRITE chưa được đưa vào nhánh soạn;20 REJECT và1 NEED_MORE_EVIDENCE giữ ngoài tập soạn. Không sửa các finding này trong tác vụ đề xuất quy trình.

Mẫu giao việc Prompt06 sau khi thay đổi được chấp thuận và áp dụng:

> Theo WCP-0001 đã được Tech Lead chấp thuận tại [hồ sơ duyệt], soạn qa-draft.md ở cấp WORKING_DRAFT, chỉ dùng các finding có ACCEPT nội dung đúng phiên bản/hash, đủ bằng chứng và còn cần quyết định khách. Kiểm log khách hiện hành, tái sử dụng No. cũ, không hỏi lại ý đã chốt. REWRITE chỉ đưa vào khi có bản sửa và ACCEPT nội dung sau kiểm lại đúng hash mới. Loại REJECT/NEED_MORE_EVIDENCE và phần thuần kỹ thuật. Mỗi câu chỉ làm rõ một quyết định, viết tiếng Việt, năm trường ID/Chức năng/Vấn đề cần xác nhận/Câu hỏi dành cho khách hàng/Lý do cần xác nhận. Internal Evidence liên kết QA ID–Finding ID–EV–review–snapshot riêng. Kiểm văn phong và đối chiếu phạm vi review. Giữ nguyên G1–G5, không tự ký review, không tự chạy thành G6 PASS, không APPROVED_QA, không gửi khách.

## 7. Kiểm tra khi triển khai thay đổi được duyệt

- ACCEPT nội dung + nguồn/hash đúng + quyết định còn mở + G5 BLOCKED: được tạo WORKING_DRAFT; không được APPROVED_QA.
- ACCEPT nhưng nguồn/finding đã đổi chưa kiểm lại: không đủ điều kiện.
- REWRITE chưa kiểm lại hoặc kiểm lại chưa ACCEPT: không đủ điều kiện.
- REJECT, NEED_MORE_EVIDENCE, đã trả lời hoặc thuần kỹ thuật: không có câu mới cho khách.
- Đủ G1–G6 nhưng thiếu Tech Lead duyệt đúng bản: chưa APPROVED_QA.
- APPROVED_QA nhưng thiếu ủy quyền gửi: không gửi ngoài.
- Chạy kiểm cơ học chỉ chứng minh schema/hash/link, không chứng minh chữ ký hoặc phê duyệt nghiệp vụ.

Giữ nguyên mọi gate-run cũ, review report/result, finding, evidence và bản Q&A cũ. Sau triển khai, tạo snapshot/change log mới; không cập nhật hash manifest lịch sử để che thay đổi quy tắc. Validator dựa snapshot cũ có thể báo nguồn quy trình thay đổi; phải phân biệt sự thay đổi quản trị được phê duyệt với thay đổi requirement gốc.

## 8. Quyết định xin Tech Lead

Chấp thuận hoặc yêu cầu sửa WCP-0001 với phạm vi: thêm nhánh WORKING_DRAFT từ ACCEPT nội dung, giữ G1–G6/chữ ký/ủy quyền gửi cho APPROVED_QA, bổ sung metadata và quy tắc lưu một bản chính. Chấp thuận đề xuất chỉ cho phép cập nhật workflow; chưa phải phê duyệt Q&A hoặc Quality Gate. Sau áp dụng, Prompt06 được thực hiện bằng một lệnh giao soạn WORKING_DRAFT riêng.

Lý do cần chấp thuận trước sửa: yêu cầu người dùng ở Bước4 ghi “Trước khi sửa các quy tắc quản trị hoặc điều kiện phê duyệt, trình bày thay đổi để Tech Lead chấp thuận.” Vì vậy đợt này chỉ tạo đề xuất có thể rà soát và snapshot đầu vào, không áp dụng các đoạn quy tắc dự kiến.
