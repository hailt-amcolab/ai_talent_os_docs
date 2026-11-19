# G1–G8: điều kiện chuyển bước

Chạy theo phạm vi module/luồng được giao và phiên bản nguồn cụ thể; không tuyên bố đạt toàn dự án từ mẫu nhỏ. Mỗi lần chạy ghi `registers/gate-runs.csv`, gồm input/output + hash, quy tắc đã kiểm, bằng chứng, kết quả, người lập/duyệt và lỗi cần xử lý. Người chịu trách nhiệm phải được chỉ định thật trước khi ký. Không có người hoặc thiếu bằng chứng: BLOCKED, không PASS.

## G1 — Source Integrity (toàn vẹn nguồn)

- **Input:** catalog hiện hành, 12 nguồn hoặc bộ nguồn bổ sung, kiểm kê28, Source Register.
- **Validation Rules:** liệt kê tệp thực tế; hash, tên/phiên bản/ngày nội dung; đủ sheet/trang/phụ lục; xác định thẩm quyền và giới hạn đọc hình; chỉ rõ bản lịch sử và quan hệ thay thế theo chủ đề; không sửa nguồn.
- **Pass Criteria:** mọi nguồn trong phạm vi truy xuất được, định danh được, ưu tiên có căn cứ; nguồn chưa có được ghi và tách phạm vi bị chặn rõ ràng.
- **Fail Criteria:** hash không khớp chưa giải thích, thiếu nguồn cần cho kết luận, ngày suy từ thư mục, coi nguồn nội bộ là khách duyệt, không đọc được phần quyết định.
- **Output:** snapshot nguồn + sổ nguồn cập nhật + danh sách giới hạn/phần bị chặn; bằng chứng G1.
- **Trách nhiệm:** BA quản lý nguồn thực hiện; Tech Lead duyệt phạm vi/giới hạn. Không ký phê duyệt thương mại thay chủ dự án.

## G2 — Requirement Traceability (truy vết yêu cầu)

- **Input:** G1 PASS đúng phạm vi; yêu cầu/quy tắc hiện có, file24, SCD, EV.
- **Validation Rules:** tách mệnh đề; gán FACT/INFERENCE/ASSUMPTION/PROPOSAL; mỗi kết luận có nguồn và locator; kiểm ngược từ nguồn tới yêu cầu và từ yêu cầu tới luồng/màn/AC; ghi trạng thái phê duyệt riêng; chống trùng ID.
- **Pass Criteria:** 100% mệnh đề trong phạm vi có EV hoặc được ghi rõ giả định/đề xuất chưa duyệt; mọi nội dung nguồn thuộc phạm vi được map hoặc ghi lý do chưa xử lý/loại trừ; chưa rõ có finding.
- **Fail Criteria:** kết luận không nguồn, bỏ sót nội dung mà không ghi nhận, trộn nhãn, nhập VERIFIED từ tài liệu dẫn xuất, coi tham số cấu hình là yêu cầu đã chốt.
- **Output:** sổ yêu cầu/quy tắc và ma trận liên kết; danh sách khoảng trống có chủ sở hữu.
- **Trách nhiệm:** BA lập; BA reviewer/Tech Lead kiểm truy vết.

## G3 — Flow Completeness (độ đầy đủ luồng)

- **Input:** G2 PASS; luồng/SCD, màn đúng phiên bản, file25, quy tắc và phụ thuộc.
- **Validation Rules:** đi từ đầu đến cuối từng actor; điều kiện trước/sau; quyền; nhánh chính/thay thế/lỗi; hủy/lặp/đồng thời/hết hạn; trạng thái và khôi phục; dữ liệu, thời gian, thông báo; oracle (kết quả kỳ vọng) có nguồn hoặc nhãn đề xuất.
- **Pass Criteria:** mọi bước/nhánh trong phạm vi đã kiểm đều có kết quả và bằng chứng hoặc finding rõ điểm chặn; phần không áp dụng có lý do. PASS có nghĩa hoàn tất rà soát luồng, chưa có nghĩa luồng đủ triển khai.
- **Fail Criteria:** mất nhánh, chuyển trạng thái không nguồn, tự giải quyết điểm chưa chốt, gọi luồng hoàn chỉnh khi còn nhánh chưa rà mà không ghi nhận.
- **Output:** chỉ mục luồng + liên kết scenario/AC + coverage (phạm vi đã kiểm) và finding.
- **Trách nhiệm:** BA + QA lập; Solution Architect kiểm tính liên thông.

## G4 — Finding Validity (tính hợp lệ phát hiện)

- **Input:** G2/G3 PASS; finding mới/cũ, bằng chứng và toàn bộ nhật ký liên quan.
- **Validation Rules:** mở nguồn hiện hành; thử phản chứng; tìm câu trả lời ở 5 sheet QA, KS, GJ, SD và workbook15; kiểm mâu thuẫn cùng chủ đề/phiên bản; thiếu nội dung phải ghi nơi đã tìm; phân bên xử lý khách/đội/provider/thương mại.
- **Pass Criteria:** mỗi finding có EV, tác động, mức chặn, điều kiện đóng; mục trùng nối về mã chính; câu đã trả lời không thành câu hỏi mới; vấn đề kỹ thuật có người xử lý nội bộ.
- **Fail Criteria:** lỗi chỉ do phân tích cũ sai, câu đã có trả lời, “không có” mà chưa tìm, thiếu căn cứ, đẩy lựa chọn thư viện/schema/retry sang khách.
- **Output:** finding VALIDATED hoặc INVALID/DUPLICATE có lý do; danh sách việc theo bên xử lý.
- **Trách nhiệm:** BA xác minh; Tech Lead kiểm phân loại kỹ thuật/phạm vi.

## G5 — Independent Review (rà soát độc lập)

- **Input:** G1–G4 PASS, artifact và snapshot nguồn, finding/EV.
- **Validation Rules:** reviewer khác tác giả, đọc trực tiếp nguồn cho mọi kết luận chặn/nghi vấn, kiểm bằng chứng ngược, câu đã trả lời, phần suy diễn; ghi phản biện từng mục và kiểm lại phiên bản sau sửa.
- **Pass Criteria:** reviewer được chỉ định ký ACCEPTED; mọi phản biện chặn đã giải quyết bằng nguồn hoặc chuyển điểm chưa chốt sang finding hợp lệ; không có ý kiến chặn việc xuất bản kết quả review chưa xử lý.
- **Fail Criteria:** tác giả tự ký, reviewer chỉ đọc bản tóm tắt, không có hồ sơ phản biện/nguồn, dùng kết quả review của phiên bản cũ cho bản mới.
- **Output:** reviews.csv, danh sách sửa đổi và bằng chứng re-review; bộ phát hiện được review, không phải quyết định khách.
- **Trách nhiệm:** BA/QA độc lập hoặc Tech Lead không phải tác giả; thiếu người thì BLOCKED. Không tự spawn agent khi chưa được phép.

## Chuẩn bị Q&A nội bộ trước G6 — WORKING_DRAFT

Theo [WCP-0001 đã được chấp thuận](workflow-change-proposal-2026-11-19/application/APPROVAL_AND_CHANGELOG.md), Analyst được soạn WORKING_DRAFT khi có lệnh giao việc riêng. Đây là hoạt động chuẩn bị nội bộ, không phải chạy hoặc vượt G6.

Điều kiện phải đủ cho từng câu:

- Finding có ID, hash đúng bản được review và EV truy xuất tới nguồn đúng phiên bản/hash/vị trí; không có thay đổi hoặc điểm chặn nguồn/nội dung chưa được kiểm lại.
- Có kết quả review nội dung ACCEPT cho đúng phần được giữ. Kết quả hỗ trợ của reviewer AI được ghi đúng danh tính/giới hạn; không thay chữ ký ACCEPTED hay G5 PASS.
- Có quyết định nghiệp vụ còn mở cần thẩm quyền khách; đã kiểm log khách hiện hành, ý đã trả lời, việc thuần kỹ thuật và trùng lặp. ACCEPT tạo ứng viên, không bắt buộc phát sinh câu hỏi.
- REWRITE chỉ được xét sau khi tác giả sửa và có bản ghi kiểm lại nội dung ACCEPT gắn hash mới. REJECT, NEED_MORE_EVIDENCE, ALREADY_ANSWERED và TECHNICAL_ONLY không được đưa vào tập soạn câu hỏi khách.
- Giữ QA No./ID hiện có cho cùng quyết định; liên kết QA ID–Finding ID–EV–review–snapshot tại Internal Evidence. Không cấp ID câu hỏi giữ chỗ hoặc dùng ID mới để hỏi lại ý cũ.

Đầu trang ghi: **WORKING_DRAFT — bản nháp nội bộ, chưa được phê duyệt, không gửi khách**; ghi trạng thái gate riêng. Giữ nguyên trạng thái G1–G5 thực tế. Thiếu chữ ký/gate hành chính không tự chặn nhánh chuẩn bị này; thiếu nguồn, sai hash hoặc phản biện nội dung chưa xử lý vẫn chặn câu liên quan. Không tự đổi finding thành REVIEWED hoặc review thành ACCEPTED.

Analyst chịu trách nhiệm soạn/truy vết; Tech Lead rà phạm vi khách/đội. Điều kiện chi tiết về cấp Q&A và metadata tại [DATA_MODEL](DATA_MODEL.md); cách chạy tại [RUNBOOK](RUNBOOK.md).

## G6 — Q&A Quality (chất lượng câu hỏi)

- **Input:** G5 PASS, finding REVIEWED cần khách quyết định, workbook15 và QA/KS/GJ hiện hành. Điều kiện này áp dụng cho đánh giá/phê duyệt G6 chính thức; soạn WORKING_DRAFT theo nhánh chuẩn bị phía trên. Chỉ chạy khi được giao đánh giá G6.
- **Validation Rules:** tiếng Việt, dễ hiểu với người không kỹ thuật, một quyết định mỗi câu; nêu bối cảnh, điểm cần chọn, ảnh hưởng, lựa chọn nếu hữu ích và đề xuất tách nhãn; tra lại câu đã trả lời ngay trước khi đưa ra; No. cũ giữ nguyên; không ép khách chọn thiết kế kỹ thuật.
- **Pass Criteria:** 100% câu có finding/EV, không trùng hoặc đã được trả lời, cần đúng thẩm quyền khách; không gửi nội dung thuần kỹ thuật; có người duyệt và thứ tự/phụ thuộc; người không kỹ thuật đọc hiểu được.
- **Fail Criteria:** hỏi lại No. cũ như câu mới, câu dẫn dắt, thuật ngữ không giải thích, trộn đề xuất và quyết định, câu không ảnh hưởng hành vi/phạm vi, dùng tiếng Nhật cho Q&A mới trái yêu cầu hiện tại.
- **Output:** bộ Q&A đạt G6 và được Tech Lead phê duyệt đúng danh sách ID, phạm vi, phiên bản/hash, người/ngày được ghi APPROVED_QA; lưu tại nơi chính theo README và biên bản G6. Không tự chuyển WORKING_DRAFT sang APPROVED_QA. G1–G5 PASS phải còn hiệu lực trong phạm vi được duyệt. G6 không cho phép tự gửi; gửi ngoài repository cần ủy quyền riêng. APPROVED_QA không phải Customer Confirmed; G7 cần phản hồi thật, G8 giữ điều kiện hiện hành.
- **Trách nhiệm:** BA biên tập; reviewer kiểm ngôn ngữ; Tech Lead lọc việc kỹ thuật; đầu mối khách quyết định việc gửi.

## G7 — Customer Confirmation (xác nhận khách hàng)

- **Input:** câu đã qua G6 và phản hồi thật; hoặc quyết định đã có ở QA/KS/GJ được truy vết trực tiếp, kèm G1–G5 cho phạm vi tái sử dụng.
- **Validation Rules:** người trả lời/thẩm quyền/ngày, đúng câu/ý; kiểm phần chốt và phần bảo lưu; đối chiếu mâu thuẫn, liên kết thay thế; tách nghiệp vụ/thiết kế/thương mại/phát hành. Với quyết định đã có, ghi G6 không áp dụng có lý do vào hồ sơ G7, không tạo Q&A để hợp thức hóa.
- **Pass Criteria:** từng ý được chốt có EV và người đủ thẩm quyền; mọi ý cần để chốt phạm vi gate đã trả lời rõ; phần chưa chốt nằm ngoài phạm vi PASS có danh sách và ảnh hưởng. Phê duyệt thương mại cần văn bản đúng thẩm quyền khi áp dụng.
- **Fail Criteria:** im lặng, Close/OK đơn lẻ, ý đội/provider, màn hình đề xuất, thiếu nguồn ký mà ghi thương mại đã duyệt, phản hồi một phần được tính là toàn bộ.
- **Output:** customer-decisions.csv trỏ nguồn gốc, phần còn mở, bản đồ tác động. Không sửa nguồn để khớp kết luận.
- **Trách nhiệm:** đại diện khách có thẩm quyền quyết định nghiệp vụ; BA ghi; chủ dự án/đầu mối thương mại xác nhận phạm vi–giá–lịch riêng.

## G8 — Specification Readiness (sẵn sàng đặc tả)

- **Input:** G1–G5 PASS còn hiệu lực; G6 khi có Q&A mới; G7 cho các quyết định cần thiết; SCD R1–R9, EV, quyết định, kiểm chứng kỹ thuật, bản baseline đề xuất.
- **Validation Rules:** truy vết toàn chuỗi; không còn xung đột/giả định ảnh hưởng hành vi chưa chốt trong phạm vi; AC có nguồn và trạng thái phê duyệt; kỹ thuật có bằng chứng phù hợp R7; đúng bộ mã SD/AG; các thay đổi SCD/ma trận đã đồng bộ; đủ phê duyệt cần thiết, phụ thuộc và loại trừ.
- **Pass Criteria:** mọi yêu cầu thuộc baseline kiểm chứng lại từ nguồn; không còn điểm chặn; R1–R9 có bằng chứng hiện hành, nội dung không áp dụng được duyệt có lý do; người được chỉ định chấp thuận baseline và phạm vi bàn giao. Phần loại trừ không làm sai hành vi phần bàn giao.
- **Fail Criteria:** màu xanh/vàng cũ được dùng thay gate, cấu hình hóa giả định để bỏ qua khách chốt, provider chưa kiểm chứng nhưng tuyên bố đạt, thiếu AC/quyền/người duyệt hoặc nguồn thay đổi chưa rà lại.
- **Output:** readiness report theo phạm vi + baseline APPROVED khi đủ ký; nếu không đạt ghi BLOCKED/FAIL và việc cần làm. Không đồng nghĩa phê duyệt phát hành.
- **Trách nhiệm:** Tech Lead chịu trách nhiệm bàn giao kỹ thuật; BA chịu truy vết; QA kiểm AC/coverage; người có thẩm quyền chốt baseline theo phạm vi nghiệp vụ/thương mại.

## Khi không đạt hoặc nguồn thay đổi

FAIL/BLOCKED: ghi tiêu chí không đạt, chủ sở hữu, điều kiện chạy lại; không chuyển phần phụ thuộc sang gate sau. Cho phép chuẩn bị nháp/khảo sát phần độc lập, ghi rõ chưa qua gate. Riêng Q&A, áp dụng điều kiện WORKING_DRAFT phía trên; đây là chuẩn bị nội bộ có kiểm soát, không chuyển phần phụ thuộc qua gate và không tạo PASS có điều kiện. Thay đổi nguồn hoặc artifact: giữ lịch sử, đánh STALE gate và baseline bị ảnh hưởng, lập bản đồ tác động rồi chạy lại từ gate sớm nhất liên quan đến G8. Không cần chạy lại phần độc lập nếu có đánh giá ảnh hưởng và người chịu trách nhiệm xác nhận.
