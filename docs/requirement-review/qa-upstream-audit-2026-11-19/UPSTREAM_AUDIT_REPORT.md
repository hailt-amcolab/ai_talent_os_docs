# Truy ngược sai sót Q&A đến nguồn và các gate

**Kết luận: có lỗi nội dung và truy vết ở upstream, nhưng chưa có căn cứ nói toàn bộ tài liệu G1–G5 sai.** Truy ngược44 câu Q&A V3 đã được rà ở V4, gồm cả16 câu giữ nguyên,18 câu viết lại,8 câu giữ chờ,1 câu loại và1 câu tách ý. Lượt này chỉ kiểm/ghi nhận ảnh hưởng, không sửa requirement, flow, finding, review, Q&A hoặc gate.

## Kết quả xác định được

| Phát hiện | Record cụ thể | Kết luận |
|---|---|---|
| Diễn đạt UNKNOWN quá rộng | REQ-0020 | Nguồn đã mô tả Manager chuyển bằng tay; đề xuất tự chuyển mới là phần chưa chốt. Cần sửa claim/expected_behavior và cách tách trạng thái xác nhận. |
| Gán sai mã màn từ chú giải trang flow | REQ-0092, REQ-0117, REQ-0118, REQ-0125 | Bị gán T-01 từ chú giải. Phải giữ tham chiếu trang flow và gắn mã màn thực trong bước; không gọi cả trang flow là màn T-01. |
| Khẳng định sai hai nhóm lựa chọn trên view | WQA-071-01 | Lỗi khẳng định xuất hiện ở Q&A. REQ-0116.expected_behavior và FLOW-0018-M01 mô tả đúng hai chế độ; phần metadata/diễn giải lịch sử chưa ngăn được câu hỏi sai. |
| Ngữ cảnh office chưa cập nhật đầy đủ | REQ-0092, BR-0069, FLOW-0024-M04/A01.01/E02.01 | Có chênh lệch nguồn lịch sử, nhưng cần ghi rõ SD-M18 p33 đã mô tả dùng app/nối SNS và p9/p15 đã có danh sách/email. Không hỏi như những mô tả đó chưa tồn tại. |

**Danh sách sửa chắc chắn hiện có5 dòng requirement**, không phải5 requirement phải bỏ:1 dòng cần sửa diễn đạt,4 dòng cần sửa metadata màn. Những mục ngữ cảnh/phân tuyến còn lại được ghi riêng, không tự gọi tất cả là yêu cầu sai. Xem [confirmed-fix-list.csv](confirmed-fix-list.csv).

## WQA-071-01 sai từ đâu

- **Nguồn**: SD-T18 p12 có một lựa chọn có/không xác nhận trước khi đăng; GJ §1 có cách nói tự động/đăng1lần. Hai cách diễn đạt cần được đối chiếu, không tạo thành hai nhóm nút trên view.
- **G2**: REQ-0116.expected_behavior viết đúng hai chế độ. missing_information còn giữ câu hỏi về hai cách gọi mà chưa giải thích rõ cái nào là mô tả lịch sử, cái nào thực có trên bản màn. Đây là ngữ cảnh cần sửa, không đủ căn cứ kết luận toàn requirement sai.
- **G3**: FLOW-0018-M01 cũng chỉ mô tả hai chế độ, không đặt ra lựa chọn thứ hai trên view. Chưa tìm thấy bước nào ởflow này khẳng định hai nhóm nút.
- **G4/G5**: FND-0002 ghi cách hiểu còn mơ hồ; review hiện hành chỉ cho giữ giao điểm chế độ/duyệt/từ cấm. Việc một finding có ACCEPT không xác nhận mọi tiền đề của câu viết về sau.
- **Q&A W1/V3**: câu “trong phần thiết lập có..., còn khi bắt đầu đăng có...” biến cách nói trong biên bản thành mô tả giao diện đang có. Đây là điểm khẳng định sai đã xác định. V4 đã loại câu đó, giữ câu071-02 về duyệt bài công việc trên đường không xác nhận.

## Chuỗi truy vết đã lập

[trace-matrix.csv](trace-matrix.csv) có44 dòng, mỗi Q&A nối về Finding ID/canonical hiện hành, review ID, nhóm requirement/rule/flow/step liên quan và nguồn. Có61 REQ và66 BR trong các tập ngữ cảnh, **không có nghĩa tất cả các record đó sai hoặc đã được tái thẩm định toàn bộ**. Những claim bị chỉ ra cụ thể có trích nguyên văn tại [artifact-excerpts.csv](artifact-excerpts.csv).

Nguồn được mở lại trực tiếp từ DOCX/XLSX/PDF/Markdown, có68 lượt theo các nhóm kết luận; [source-evidence.csv](source-evidence.csv) giữ locator/hash/nguyên văn. Đồng thời kiểm91 tham chiếu dạng document–page–screen trong Requirement Register để phát hiện4 lỗi chú giải ở trên; [screen-reference-check.csv](screen-reference-check.csv) ghi giới hạn phép kiểm. Đây không phải kiểm chứng toàn bộ nội dung hình/connector.

## Tại sao các mục HOLD không đồng nghĩa upstream sai

Các câu về rải giờ, lịch sử phiên bản, quyền đổi giá, dữ liệu xóa, ranh giới kỳ phí hoặc khôi phục có thể dựa trên gap thật. Điều chưa đạt là chưa có phương án/đối chiếu của đội để chứng minh phần nào cần khách quyết định. Giữ chúng chờ không có nghĩa khách đã trả lời, nguồn không tồn tại hoặc requirement phải loại bỏ.

Đặc biệt, REQ-0074 và BR-0057 đã ghi đúng xử lý bài chưa duyệt đúng giờ. WQA-056-03 cũ gộp trường hợp đó với tư liệu đến muộn; lỗi nằm ở phạm vi câu hỏi, không phải thiếu quy tắc upstream. REQ-0049/BR-0032 cũng đúng khi giữ ngưỡng3/7 chưa được chốt; cần nêu rõ đây là giá trị đang dự kiến trong M-17, không nâng thành CONFIRMED.

## Các nhóm kết luận

| Mã | Chủ đề | Điểm sớm nhất xác định / phân loại |
|---|---|---|
| [BT-001](cases/BT-001.md) | Hai nhóm lựa chọn bị khẳng định là cùng có trên view | Q&A W1 — lỗi khẳng định UI; G2 thiếu phân biệt ngữ cảnh trong missing_information / PROVEN_QA_FALSE_PREMISE |
| [BT-002](cases/BT-002.md) | UNKNOWN quá rộng làm mất thao tác chuyển bằng tay đã được mô tả | G2 — REQ-0020.claim/expected_behavior / PROVEN_OVERBROAD_UNKNOWN |
| [BT-003](cases/BT-003.md) | Mã T-01 trong chú giải trang flow bị gán thành mã màn requirement | G2 — screen_refs / PROVEN_SCREEN_TRACE_METADATA_ERROR |
| [BT-004](cases/BT-004.md) | Đường office chưa nêu đầy đủ mô tả app18/11 trong diễn giải hiện hành | G2/G3 — ngữ cảnh mới chưa được phản ánh đủ; khẳng định hỏi lại ởQ&A / SOURCE_CONTEXT_NOT_PROPAGATED |
| [BT-005](cases/BT-005.md) | Gộp tư liệu đến muộn với bài chưa được duyệt đúng giờ | Q&A W1/V3 — phạm vi câu hỏi / QA_SCOPE_OVERREACH_UPSTREAM_RULE_CORRECT |
| [BT-006](cases/BT-006.md) | Hỏi ai có quyền đổi/sửa mà chưa đối chiếu một quyền Manager | G4/R1 bổ sung quyền đổi giá; Q&A cụ thể hóa phân quyền / CUSTOMER_TECH_BOUNDARY_NOT_PROVEN_BUSINESS_ERROR |
| [BT-007](cases/BT-007.md) | Đẩy lựa chọn giờ AI/cách rải lịch sang khách trước phương án đội | Phân tuyến ởG4/G5 và chọn câu G6 / DEPENDENCY_NOT_CONTENT_FALSITY |
| [BT-008](cases/BT-008.md) | Nhầm thiếu xác nhận phạm vi email với chưa có bất kỳ mô tả email nào | Q&A — bối cảnh thiếu trường hợp đã mô tả / QA_CONTEXT_OMISSION |
| [BT-009](cases/BT-009.md) | Phạm vi xóa6tháng cần inventory trước câu hỏi rộng | Q&A — thiếu đầu vào đối chiếu đối tượng dữ liệu / MISSING_INTERNAL_PREPARATION |
| [BT-010](cases/BT-010.md) | Trường hồ sơ đã có danh sách dự kiến nhưng chưa có tiêu chí đủ | Ngữ cảnhG2/G3; biên tậpQ&A thêm vai trò / CONTEXT_AND_SCOPE_SPLIT |
| [BT-011](cases/BT-011.md) | Lịch sử duyệt và khôi phục cần phương án cụ thể trước câu hỏi rộng | G4/G5 phân tuyến và G6 chọn phần phụ thuộc / MISSING_INTERNAL_PREPARATION |
| [BT-012](cases/BT-012.md) | Ranh giới kỳ video cần kết quả provider và đề xuất đội | G6 — thiếu điều kiện của câu hỏi / DEPENDENCY_NOT_CONTENT_FALSITY |
| [BT-013](cases/BT-013.md) | Ngưỡng dự kiến và thông báo/hủy bị gộp nhiều quyết định | Q&A — diễn đạt và tính đơn nhất quyết định / EDITORIAL_CORRECTION_NOT_UPSTREAM_ERROR |

## Ảnh hưởng gate

[gate-impact.csv](gate-impact.csv) phân loại theo phạm vi:

- **G1**: chưa phát hiện nguồn bị sửa hoặc hash sai. Không có cơ sở dùng các lỗi Q&A này để thu hồi toànG1; giới hạn bản ký/hình vẫn giữ.
- **G2**: cần sửa5 dòng xác định được và rà các phần ngữ cảnh đã chỉ. Chưa đủ căn cứ đánh giá175REQ đều đúng hoặc đều sai.
- **G3**: cần rà các bước office/hồ sơ được chỉ; không kết luận toàn30flow sai. Những bước hai chế độ và quy tắc hủy khi chưa duyệt có căn cứ vẫn giữ.
- **G4/G5**: cần xem lại reasoning và phân tuyến của đúng các ý có vấn đề khi sửa artifact. Giữ chữ ký/lịch sử đã có; phê duyệt cũ không tự phủ lên bản sửa mới. Không tự đổi finding ACCEPT thành REJECT chỉ vì một câu bịHOLD.
- **G6**: Q&A vẫn làDRAFT_UNAPPROVED. Tự ràV4 hoặc kýG5 không thay phê duyệt chất lượng câu hỏi.
- **G7/G8**: không chạy xác nhận khách hoặc chốt baseline trong lượt này.

Không thay trạng thái gate trong lượt truy ngược. Các phạm vi nêu trên cần được đánh giá lại hiệu lực khi sửa nội dung; đánh dấu STALE/chạy lại theo DATA_MODEL tại đợt xử lý ảnh hưởng, không tự xóa hay viết lại lần PASS lịch sử.

## Kết quả validator: phải đọc đúng phiên bản

Đã chạy6 validator chỉ đọc, log đầy đủ ở [historical-validator-results.json](historical-validator-results.json):

- Validator chung và extraction PASS. Chúng kiểm hash/schema/liên kết, nhưng vẫn bỏ lọt claimUNKNOWN quá rộng và metadataT-01 sai. Vì vậy PASS script không chứng minh đúng nghĩa.
- Validator flow/gap/current-review báoFAIL khi đọc ledger và workflow hiện hành khác snapshot lịch sử. Các thay đổi này gồm thêm finding/review, WCP-0001, kýG5 và cập nhậtQ&A; không được sửa manifest cũ để épPASS.
- Thông báo “Review signature invented” của current-review xuất phát từ hai điều kiện cố định: tổng review phải bằng63+47 và mọi dòng thêm sau63 phảiOPEN. Sổ hiện tại là63+47+44;44dòng kýACCEPTED có mã trong hồ sơ người dùng duyệtG5. Prefix63dòng trước không đổi. [review-ledger-reconciliation.json](review-ledger-reconciliation.json) kiểm điều này. Thông báo đó tự nó không chứng minh chữ ký giả hoặc review cũ bị sửa.
- ValidatorQ&A V4 PASS về44IDđãrà,36câucòn lại và tính đồng bộ; chưa thay độc lập kiểm nghĩa.

Kiểm cơ học lịch sử và kiểm tính hợp lệ của bước kế tiếp cần tách nhau. Nếu sau này nâng validator để hiểu successor/supersession, phải kiểm append-only và phê duyệt đúng hash, không nới lỏng để chấp nhận mọi thay đổi. Lượt này chưa sửa script cũ.

## Thứ tự sửa đề nghị

1. Sửa5dòng trong confirmed-fix-list, giữ bản trước và hash mới; không thay FACT nguồn đã có.
2. Cập nhật ngữ cảnh/bước được chỉ, đặc biệt office và M-20; giữ các phần xác nhận thực sự còn mở.
3. Reviewer kiểm lại đúng claim/metadata/flow bị sửa, rồi đánh giá phạm vi G2–G5 cần chạy lại. Không yêu cầu khách giải quyết lỗi phân tích nội bộ.
4. Đội chuẩn bị phương án cho các câuHOLD; chỉ đưa lại vào Q&A sau khi chứng minh quyết định khách còn cần thiết. Giữ ID và nguyên nhân thay đổi.
5. Tech Lead kiểm bảnQ&A sau cập nhật liên quan; chạy G6 khi đủ điều kiện, không suy được gửi từG5PASS.

## Giới hạn và bảo toàn hồ sơ

Đây là truy ngược có mục tiêu từ44câu và các vấn đềV4, không phải chứng nhận lại toàn bộ175REQ/90BR/30flow/SCD/code.61REQ/66BR trong ma trận là tập ngữ cảnh; những node ngoài các trích dẫn kết luận chưa được kiểm toàn bộ. Không suy phần chưa kiểm là đúng hoặc sai.

Không sửa các file input, nguồn, register, finding, review, Q&A hoặc gate. Chỉ tạo thư mục audit này. Các kết luận được gắn hash và vị trí; không tự tạo quyết định khách, baseline hoặc chữ ký. Báo cáo sẵn sàng để Tech Lead quyết định đợt sửa theo danh sách cụ thể.
