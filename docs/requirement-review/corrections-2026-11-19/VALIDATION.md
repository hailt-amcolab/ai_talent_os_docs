# Kiểm tra bộ sửa

Chạy `python3 docs/requirement-review/corrections-2026-11-19/validate_corrections.py` và `python3 docs/requirement-review/validate.py`.

Kiểm schema, số lượng/ID, giới hạn trường được sửa, bản trước, bảo toàn20REJECT và review/chữ ký lịch sử, chỉ2finding đổi canonical, câu hỏi V4/V5 giữ nguyên lời/ID,3HOLD và hiệu lực nguồn mới, map flow, hash nguồn và manifest. Kiểm kê hiện hành16nguồn được kiểm nghiêm ngặt; snapshot12nguồn cũ không bị viết lại. Validator chung dùng kiểm kê hiện hành nếu có, vẫn yêu cầu đúng danh sách/hash mọi tệp.

Các bản Markdown trước sửa lưu `.md.txt`, nội dung byte giữ nguyên. Các validator snapshot lịch sử chưa hiểu successor sẽ báo thay đổi khi đọc register hiện tại; không sửa hash/manifest cũ để ép PASS. Validator mới kiểm prefix cũ và chỉ cho phép đúng thay đổi/append được ghi nhận.

PASS kiểm cơ học không có nghĩa G1–G6 PASS, không xác nhận nội dung nguồn mới đã được hòa giải, không thay review độc lập hoặc cho phép phát hành. 12nhóm sửa chờ review;4nguồn mới chờ đối chiếu;2finding mới chưa có ACCEPT;3Q&A HOLD finding và cả36câu chờ đối chiếu đợt19/11.

## Kết quả đã chạy

- Validator bộ sửa: PASS các kiểm tra bảo toàn/phạm vi sửa,36câu giữ nguyên lời/ID,3HOLD; nguồn mới vẫn PENDING.
- Validator chung: PASS16nguồn đúng danh sách/hash,9schema CSV và liên kết tài liệu.

Không có kiểm tra nào cấp ACCEPT độc lập hoặc PASS gate.


## Kiểm lại sau tiếp nhận QA/KS ngày20/11/2026

- `python3 docs/requirement-review/validate.py`: PASS —16nguồn khớp kiểm kê/hash hiện hành,9schema và liên kết workflow.
- Kiểm delta workbook bằng ZIP/XML thư viện chuẩn: PASS —QA5sheet không đổi giá trị/công thức; KS2ô sửa,39+3mục mới chưa có trả lời,19bình luận. So với HEAD được kiểm SHA-256 khớp snapshot cũ; hash nguồn sau kiểm trùng hash lúc tiếp nhận. Dữ liệu so sánh giữ trong `new-delivery-intake.json`, không sinh báo cáo/gói mới.
- `python3 docs/requirement-review/corrections-2026-11-19/validate_corrections.py`: FAIL tại kiểm mutation ngoài phạm vi — `source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx`. Đây là thay đổi nguồn được người dùng thông báo, nằm ngoài snapshot của bộ sửa cũ; KS cũng đổi hash. Chưa chạy hết các kiểm tra sau assertion này, không tuyên bố chúng đạt. Không sửa manifest/input/hash lịch sử để ép PASS. Kết quả PASS trước cập nhật phía trên chỉ có hiệu lực với snapshot lúc đó.
- Sáu gate-run mới chỉ ghi G1–G5 STALE/G6 BLOCKED theo phạm vi cập nhật. Không có Independent Verification mới, chữ ký reviewer, phê duyệt Q&A hoặc xác nhận nghiệp vụ trong lượt này.


## Sau quyết định DEC-0001 — không giới hạn lần AI viết lại

- Validator chung: PASS16hash nguồn,9schema và liên kết workflow.
- Kiểm truy vết: PASS — EV-0552 trỏ bản ghi đúng hash; DEC-0001 liên kết REQ-0053/BR-0039/FLOW-0013; nhánh FLOW-0013-A01 và TRANS-0028 đã đánh SUPERSEDED; AC lần3 không còn từ chối hết lượt. Các bản thay đổi có before/after trong changes.csv.
- Tiếp tục kiểm nguồn trực tiếp:16tệp khớp hash; PDF mở được, số trang khớp và trích chữ được; XML của DOCX/XLSX mở được; QA5sheet, KS3sheet đúng kiểm kê. Chi tiết tại new-delivery-intake.json, `g1_technical_recheck_after_DEC_0001`. Chưa phải đọc trực quan mọi hình/kiểm từng claim hoặc Independent Verification.
- Không đổi nguồn, workbook15, review/chữ ký lịch sử hoặc36câu Q&A. Validator bộ sửa snapshot cũ vẫn không áp dụng cho source/artifact successor; không sửa manifest lịch sử để ép PASS.


## Đối chiếu toàn bộ tài liệu theo nguồn mới — 20/11/2026

- `python3 docs/requirement-review/validate.py`: PASS — 16 tệp nguồn đúng hash, 9 schema CSV và liên kết workflow hợp lệ.
- Kiểm tính nhất quán bổ sung: PASS — giữ 36 ID Q&A, gồm 26 nháp đang hoạt động và 10 mục được giải quyết hoặc phân tuyến; đồng bộ bản Markdown, CSV xuất, truy vết và hash bằng chứng.
- Kiểm đủ phạm vi: 175 yêu cầu, 90 quy tắc, 30 luồng, 48 finding; đối chiếu 42 mục KS mới và đọc trực quan 81 trang PDF mới. 209 bằng chứng workbook có bản kế tiếp; bản ghi và kết quả review lịch sử được giữ nguyên.
- G1 PASS chỉ trong phạm vi nhận diện và tính toàn vẹn nguồn. G2–G4 cần tái đánh giá theo phiên bản hiện hành; G5 BLOCKED vì chưa có người rà soát độc lập khác tác giả, G6 BLOCKED. Các kiểm tra trên không thay Independent Verification hoặc phê duyệt Q&A.
- Kết quả FAIL của validator snapshot cũ ở trên vẫn được giữ, không thay manifest lịch sử để ép PASS. Không sửa tệp nguồn trong đợt đối chiếu này.


## Biên tập Q&A theo giao điểm quy tắc

Giữ 36 ID theo dõi, 26 câu hoạt động (16 ưu tiên/10 bổ sung), 10 disposition không đổi. Đồng bộ Markdown, CSV xuất, Internal Evidence và manifest. Không đổi nguồn, finding, review hoặc gate để hợp thức hóa bản biên tập. Kiểm cơ học bằng `python3 docs/requirement-review/validate.py`; kiểm bổ sung đối chiếu ID, câu hỏi và hash bản chính với CSV xuất. Các kiểm tra này không thay content review hoặc Independent Verification.


## QA mới — lọc trùng và bỏ giá tiền

Đọc đủ 5 sheet; so delta từng ô với bản đã tiếp nhận trước. Giữ 36 ID tracking; còn 13 câu xuất, 23 mục đã rút/phân tuyến. Đồng bộ Markdown, questions.csv, Internal Evidence, CSV xuất, screen trace và hash. Không sửa nguồn hoặc review lịch sử. Validator cơ học không thay review độc lập hoặc xác nhận khách.


**Kết quả lọc cuối, gồm cả No. cũ:** còn 2 câu bổ sung (WQA-076-01 về ngoại lệ tâm sự nghiêm trọng và WQA-066-02 chỉ về thời hạn giữ dữ liệu văn phòng). Rút 24/26 câu: 15 trùng No. gốc, 2 có trả lời đúng ý, 1 chờ đối chiếu mô tả phân công, 6 về giá/phí/thanh toán. Giữ 36 ID và 34 disposition. Các số đếm 13 câu ở bước trung gian phía trên đã được thay thế. Không đóng câu gốc còn mở.


## Hai ứng viên giao điểm mới

38 ID theo dõi, 4 mục xuất (2 nháp trước + 2 ứng viên chờ content review), 34 disposition. 50 finding. Đề xuất riêng với câu hỏi, không có content ACCEPT/Independent Verification hoặc phê duyệt mới. Kiểm ID/hash/nguồn bằng validator cấu trúc; không thay đánh giá nghiệp vụ.
