# Quy tắc dữ liệu và truy vết

## Định danh và tránh bản sao

Giữ nguyên các mã hiện có: UC/chức năng YK2, TR trong file24, FL trong file25, RV trong báo cáo23, G trong file22, 確認 (mục xác nhận), S/A/B/C/I/L22/L23/CT trong workbook15, QA No. và CR. Không cấp số thay thế chúng. Trong các sổ mới, `legacy_ref`/`canonical_ref` ghi đường dẫn + sheet/mã/mục; nếu cùng đối tượng đã có nơi chính thì chỉ bổ sung metadata kiểm chứng. Một dòng file24 có thể chứa nhiều yêu cầu: khi tách ở giai đoạn được giao, dùng REQ-0001… và `legacy_ref=TR-…`; giữ nguyên hàng gốc.

Mã mới: REQ-####, BR-####, FLOW-####, FND-####, EV-####, REV-####, DEC-####, BL-####, GATE-####. Chỉ cấp khi thực sự có bản ghi; không tự tạo câu hỏi nghiệp vụ trong bước thiết lập. Bản ghi có sẵn được tham chiếu bằng mã cũ thay vì phát sinh bản mới trùng nội dung. Câu hỏi mới sau này tuân quy ước workbook15/SCD; câu có QA No. tiếp tục dưới No. đó, không cấp No. khách mới.

## Nhãn nhận định

| Nhãn | Nghĩa / bằng chứng |
|---|---|
| FACT (sự kiện) | Nội dung đọc trực tiếp tại nguồn đúng phiên bản/vị trí. FACT rằng tài liệu đề xuất X không có nghĩa khách đã đồng ý X. |
| INFERENCE (suy luận) | Kết luận từ các FACT; ghi từng tiền đề, cách suy luận và phần chưa được xác nhận. Không được ghi là yêu cầu đã chốt. |
| ASSUMPTION (giả định) | Tạm dùng cho thiết kế; ghi chủ sở hữu, rủi ro, điều kiện hết hiệu lực, nơi kiểm tra. Không chuyển thành quyết định khách. |
| PROPOSAL (đề xuất) | Cách làm do đội/nguồn đề nghị; ghi người đề xuất và người cần quyết định. Không dùng làm expected result đã được khách duyệt. |

Mỗi mệnh đề chỉ có một nhãn. Nếu một đoạn gồm nhiều loại, tách từng mệnh đề trước khi gán nhãn. `authority` tách riêng: yêu cầu nguồn / khách xác nhận / thiết kế giao diện / nội bộ / kỹ thuật / lịch sử. Bốn trục phê duyệt độc lập: nghiệp vụ, thiết kế, thương mại, phát hành. Giá trị CHƯA XÁC NHẬN là mặc định; KHÔNG ÁP DỤNG phải có lý do và người chấp thuận.

## Bằng chứng tối thiểu

Mỗi EV lưu Source ID, đường dẫn, phiên bản/hash chính xác, locator (vị trí), trích đoạn ngắn nguyên văn, diễn giải tiếng Việt, ý được chứng minh và giới hạn. PDF: trang tính từ 1 + mã màn của đúng tài liệu; DOCX: mục/chức năng/đoạn hoặc hình, ảnh nhúng phải xem trực quan trước khi kết luận; XLSX: sheet + No./mã + dải ô (số dòng không phải No.); GJ: tiêu đề mục/đoạn. Đọc cả ngữ cảnh, ngày/người trả lời, ghi chú bảo lưu và nguồn có khả năng phủ định. Trích xuất văn bản không chứng minh đã đọc hình.

`checked_by`, `checked_at`, `source_sha256`, `counter_evidence`, `limits` phải đi cùng trạng thái kiểm chứng. Không thể đọc hình/ô hoặc chưa có nguồn thì ghi giới hạn, không điền theo báo cáo nội bộ. Trường nhiều ID phân cách bằng `;`; CSV dùng UTF-8 và trích dẫn chuẩn cho ô có dấu phẩy/xuống dòng. Thời gian ISO 8601 kèm múi giờ; ngày vận hành theo Asia/Saigon.

## Trạng thái

- Kiểm chứng: NOT_CHECKED → CHECKING → VERIFIED hoặc NEEDS_CLARIFICATION/CONFLICT. VERIFIED chỉ xác nhận mệnh đề đã đối chiếu nguồn; không đồng nghĩa khách duyệt.
- Nguồn thay hash hoặc nhận quyết định ảnh hưởng: đánh dấu STALE (cần kiểm tra lại) ở EV, REQ/BR/FLOW, finding/review/gate/baseline liên quan; không xóa kết quả cũ.
- Finding: DRAFT → VALIDATED → REVIEWED → WAITING_CUSTOMER/WAITING_TEAM/WAITING_PROVIDER → RESOLVED → CLOSED. Khi nhận phản hồi mới chỉ chuyển RESOLVED; đóng sau kiểm nguồn và kiểm tác động. INVALID/DUPLICATE phải có lý do và bản ghi chính.
- Review: OPEN → CHANGES_REQUESTED hoặc ACCEPTED; chỉ ACCEPTED sau khi người review kiểm tra lại sửa đổi. Tác giả không tự ký review độc lập.
- Gate: NOT_RUN/PASS/FAIL/BLOCKED/STALE; không có PASS mặc định hoặc “PASS có điều kiện” cho gate bắt buộc. KHÔNG ÁP DỤNG chỉ là tiêu chí trong gate, phải giải thích và có người duyệt.
- Baseline: DRAFT → PROPOSED → APPROVED → SUPERSEDED. Thiếu thẩm quyền hoặc phê duyệt cần thiết thì giữ PROPOSED/BLOCKED. Không ghi đè baseline APPROVED; tạo bản kế tiếp và liên kết thay đổi.

## Trường dữ liệu bắt buộc khi có bản ghi

Tiêu đề CSV tại `registers/` là schema ban đầu. Trường rỗng chỉ được giữ trong bản nháp; trước gate liên quan phải điền hoặc ghi lý do không áp dụng.

- Yêu cầu/quy tắc: nội dung nguyên tử hoặc tham chiếu nội dung chính, phạm vi, nhãn, EV, người phụ trách; liên kết nguồn–yêu cầu–quy tắc–luồng–màn–AC (tiêu chí chấp nhận)–finding–quyết định–SCD.
- Luồng: tác nhân/quyền, điểm bắt đầu, điều kiện trước/sau, luồng chính/thay thế/lỗi, chuyển trạng thái, dữ liệu vào/ra, thời gian, thông báo, phụ thuộc ngoài và tiêu chí chấp nhận. Thiếu phần nào phải có finding, không tự bù quy tắc.
- Finding: mệnh đề vấn đề, hai phía bằng chứng nếu mâu thuẫn, phạm vi tìm kiếm nếu thiếu, tác động, mức chặn, bên xử lý, điều kiện đóng; kiểm trùng workbook15/QA/KS/GJ và báo cáo23 trước khi tạo.
- Review: tác giả và reviewer khác nhau, phiên bản artifact và nguồn đã đọc, phản biện, quyết định, sửa đổi và kiểm lại. Review AI nếu có chỉ là bằng chứng hỗ trợ; không tự thay người phê duyệt được chỉ định.
- Quyết định: đúng người/thẩm quyền, ngày, ý được chốt, ý còn mở, EV, quyết định cũ bị thay theo từng ý, 4 trục phê duyệt và nơi phải cập nhật.
- Baseline/gate: danh sách phạm vi/loại trừ, phiên bản/hash input và output, bằng chứng, người lập/duyệt, kết quả, ngày, lý do fail, việc cần làm và liên kết bản trước. Hash baseline là hash gói tài liệu được chốt, không tự hash vòng chính bản ghi chứa hash đó.

Mọi sửa trạng thái phải có ngày/người/lý do trong bản ghi hoặc gate-run, bảo toàn lịch sử bằng version control và phiên bản artifact. Không dùng trạng thái cũ của workbook15 hay màu SCD để tự nhập VERIFIED, APPROVED hoặc PASS.

## Mở rộng cho đợt Requirement Extraction19/11/2026

`requirements.csv` bổ sung module/feature, mô tả nghiệp vụ, actor, trigger, điều kiện trước, hành vi, quy tắc, trạng thái, ngoại lệ, nguồn, phần thiếu và bốn trục phê duyệt. `business-rules.csv` bổ sung nội dung/điều kiện áp dụng và căn cứ xác nhận. `confirmation_status` dùng CONFIRMED/PARTIAL/CONFLICTED/UNKNOWN theo yêu cầu người dùng, tách độc lập khỏi `verification_status`. Quy tắc diễn giải và ký hiệu nguồn ở README của đợt extraction.

`MISS-####` là mã ghi chú phần thiếu của đợt extraction, không phải ID requirement khách hoặc Q&A. Nhiều MISS có thể cùng trỏ một No. cũ; chưa chạy G4 nên không đếm chúng thành phát hiện độc lập đã xác minh. `source-coverage.csv` và `existing-open-items.csv` chỉ là chỉ mục truy vết, không là bản chính câu hỏi/quyết định. Nguồn chính vẫn được giữ nguyên.

## Hai cấp Q&A — WCP-0001

Quy tắc có hiệu lực theo [chấp thuận WCP-0001](workflow-change-proposal-2026-11-19/application/APPROVAL_AND_CHANGELOG.md). Các trục độc lập:

| Trục | Giá trị / ý nghĩa |
|---|---|
| `content_review_result` | ACCEPT / REWRITE / REJECT / NEED_MORE_EVIDENCE; đánh giá nội dung đúng bản finding |
| Review ký | Giữ nguyên review.status OPEN / CHANGES_REQUESTED / ACCEPTED; cần reviewer đúng thẩm quyền, khác tác giả |
| Gate | Giữ nguyên gate.result và điều kiện G1–G8; không suy PASS từ ACCEPT nội dung |
| `qa_level` | WORKING_DRAFT hoặc APPROVED_QA; chỉ cấp khi có Q&A thật, không gán cấp cho bản trống |
| Xác nhận khách | Chỉ ghi theo G7 và phản hồi thật; không suy từ APPROVED_QA |

WORKING_DRAFT được chuẩn bị theo điều kiện tại QUALITY_GATES, chưa được phê duyệt và không được gửi. APPROVED_QA chỉ sau G1–G6 PASS đúng phạm vi/còn hiệu lực và Tech Lead phê duyệt rõ ID, phiên bản/hash, người/ngày. Gửi ngoài cần ủy quyền riêng. G7/G8 không phải điều kiện trước khi gửi câu hỏi; vẫn giữ điều kiện hiện hành cho xác nhận khách và readiness.

### Metadata Q&A và Internal Evidence

Mỗi Q&A thật có metadata trong Internal Evidence, không cần thêm kho nội dung hoặc sửa schema CSV hiện hành:

- Định danh: `qa_id`, `existing_qa_refs`, `finding_ids`, `finding_sha256_refs`, `evidence_ids`, `internal_evidence_ref`.
- Review: `content_review_refs`, `content_review_result`, `recheck_refs`, `source_snapshot_ref`.
- Phiên bản: `qa_level`, `draft_version`, `draft_sha256`, `prepared_by`, `prepared_at`, `change_reason`, `supersedes_ref`.
- Phê duyệt: `gate_run_refs`, `tech_lead_approval_ref`, `release_authorization_ref`. Với WORKING_DRAFT, trường chưa có ghi rõ chưa có/không áp dụng; không tạo chữ ký mặc định.

Mỗi câu chỉ một quyết định nghiệp vụ và có EV đúng ý. Nhiều finding cùng quyết định có thể chung câu nhưng giữ đầy đủ Finding ID. Nếu một finding chứa nhiều quyết định, tách câu theo quyết định và giữ liên kết No. cũ. ID đã phát hành không đổi khi sửa/gộp; bản bị thay giữ lịch sử và trỏ mã chính. Không cấp số khách mới thay câu cũ.

Ghi nguồn, giả định, giới hạn và technical notes ở Internal Evidence, liên kết bằng QA ID; phần khách đọc dùng tiếng Việt, năm trường ID/Chức năng/Vấn đề cần xác nhận/Câu hỏi dành cho khách hàng/Lý do cần xác nhận.

REWRITE phải có bản sửa/hash mới và kết quả kiểm lại nội dung ACCEPT trước khi xét WORKING_DRAFT. Không đổi ACCEPT thành ACCEPTED hoặc sửa `qa_eligibility` lịch sử của independent review để hợp thức hóa nhánh mới. Đợt eligibility mới phải trỏ WCP-0001, review gốc và finding hash, ghi rõ lý do khác kết quả chuyển bước cũ.

Nguồn hoặc nội dung thay đổi sau duyệt: giữ bản cũ, tạo phiên bản mới, đánh giá lại phần gate/phê duyệt bị ảnh hưởng; bản mới không kế thừa phê duyệt tự động. Tình trạng chờ sửa/lỗi thời/loại khỏi gói ghi riêng, không biến thành cấp phê duyệt mới.
