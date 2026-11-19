# Báo cáo khả năng truy xuất nguồn — 19/11/2026

Phạm vi: Requirement Extraction theo yêu cầu người dùng; chưa rà soát hoàn thiện luồng G3, xác minh finding G4, review độc lập G5, soạn Q&A G6, ghi phê duyệt mới G7 hoặc chốt baseline G8.

## Kết quả

| Trạng thái xác nhận | Yêu cầu | Quy tắc nghiệp vụ |
|---|---:|---:|
| CONFIRMED | 63 | 58 |
| PARTIAL | 106 | 30 |
| CONFLICTED | 2 | 2 |
| UNKNOWN | 4 | 0 |
| Tổng | 175 | 90 |

Có **445 EV** trỏ trực tiếp nguồn trong `source_requiments/`, gồm đường dẫn, phiên bản, hash, vị trí, nguyên văn và người/thời điểm đọc. Mọi REQ/BR đều có EV; các liên kết này đã được kiểm cơ học, không đồng nghĩa toàn bộ diễn giải đã qua independent review.

## Nguồn đã đọc và cách sử dụng

- YK2: trích nội dung chức năng, quy tắc, dữ liệu, phi chức năng và ràng buộc bàn giao; bao phủ đủ54 mã chức năng chương6. Văn bản là bản0.1 mang tên v2, có cả giả định/đề xuất. Không coi mọi mô tả là khách đã duyệt.
- KS: đối chiếu118 dòng nội dung, dùng F/G/I và dấu OK theo từng ý; quyết định17/11 thay đúng phần cũ cùng chủ đề. Đề xuất dài G27 được giữ riêng khỏi quyết định I27.
- QA: đọc76 No. của sheet chính, No.50 trong bảo lưu và25 CR; đọc5 sheet, hai sheet góp ý/nội dung chỉ có tiêu đề. Phân biệt câu trả lời khách với cách hiểu/đề xuất đội, kể cả dòng Close.
- GJ: đọc phần đồng thuận, hành động và bảo lưu. Quyết định được trích đúng ý; việc hỏi cổng thanh toán/đề xuất tiến trình không được xem là đã xong.
- SD-T18 và SD-M18: dùng mô tả bằng chữ36 màn; không dùng chữ/số/tên trong hình mẫu làm giá trị chốt. Các nội dung cần xác nhận vẫn còn mở. Đã phân biệt bộ mã SD với AG.
- Nguồn lịch sử YK1/GT/SM/TK-T/TK-M và AG giữ nguyên ID/hash, dùng theo catalog hiện hành để kiểm lịch sử/không phục hồi ý đã thay; không trích lại toàn bộ nội dung cũ thành yêu cầu mới.

## Kiểm ngược và chống trùng

[source-coverage.csv](source-coverage.csv) có 319 đơn vị:54 chức năng YK2,118 dòng KS,76 No. QA,1 bảo lưu,25 CR,2 sheet chỉ có header,36 màn SD và7 mục đồng thuận GJ. Mỗi đơn vị nội dung có liên kết tới REQ hoặc ghi rõ chỉ là ngữ cảnh/đề xuất;25 CR được nối về capability đã có, **không tự biến thành25 yêu cầu được duyệt**.

Ma trận24 hiện có67 mục TR được nối đủ, gồm54 chức năng,6 mục chung và7 phần mở rộng. Nội dung/giới hạn/AC/quy tắc trong SCD và technical spec không được dùng để bổ sung yêu cầu khách. Workbook15 được đọc để giữ mã/mục theo dõi; không nhập trạng thái của workbook thành CONFIRMED hoặc VERIFIED. Các mã REQ mới phân rã hành vi, không đổi số chức năng hay số Q&A.

Các chiều nghiệp vụ được ghi riêng: actor, trigger, điều kiện trước, hành vi, liên kết BR, trạng thái, ngoại lệ, nguồn và xác nhận. Trường chưa có dữ liệu ghi UNKNOWN hoặc giới hạn; không tự thêm enum, retry, ngưỡng hoặc quy trình từ thiết kế DB/demo.

## Giới hạn của độ bao phủ

-100% liên kết EV không có nghĩa100% mọi đoạn, hình, trường màn hoặc nghiệp vụ đã được đặc tả/khách duyệt.319 đơn vị kiểm ngược là danh mục quản lý, không phải toàn bộ mệnh đề có thể có trong các tài liệu. Phần chung/phi chức năng/tiến hành đã được trích thành các REQ; chưa kiểm chứng độc lập đầy đủ từng câu.
- Đã xem trực quan YK2 §5-1 hình5-1 để nhận diện6 trạng thái cũ. QA No.51 yêu cầu cập nhật sau quyết định tự động nên vẫn PARTIAL. Các ảnh nhúng khác và mọi hình mẫu màn chưa được kiểm trực quan toàn bộ; không dùng phần đó xác nhận chuyển trạng thái/giá trị.
- Chưa có hợp đồng/SOW/báo giá độc lập trong nguồn; QA No.34 còn hỏi phiên bản. Không gán thương mại đã duyệt từ Close/OK, không coi im lặng là phê duyệt dù YK2 có mô tả điều khoản thời hạn.
- Các quyền đồng thuận được hiểu trong phạm vi bản ghi khách đã cung cấp; chưa xác minh bên ngoài thẩm quyền ký thương mại hoặc phát hành. Không có phê duyệt mới phát sinh trong đợt này.
- CONFIRMED chỉ cho mệnh đề được ghi; phần thiếu ngoài mệnh đề nằm tại missing_information. PARTIAL gồm cả chưa đủ chi tiết lẫn chưa đủ bằng chứng xác nhận toàn bộ; confirmation_notes giải thích từng trường hợp.

## Các quyết định đã được thay thế đúng phạm vi

- Không bật lại Talent đã rời dịch vụ: KS xác nhận56/GJ17/11 thay YK2 chức năng7-3 cho phép phục hồi. Đăng ký lại email là No.69 riêng.
- Mỗi SNS chỉ1 tài khoản: quyết định17/11 thay ý kiến nhiều tài khoản; tài khoản unit coi là office.
- Manager đăng thay chỉ office: quyết định17/11 thay ý kiến cũ làm cả Talent thường. Đường thao tác office vẫn còn CONFLICTED, không tự chọn từ màn mới.
- Không có nút bộ phận mẫu câu và không làm Manager nhắn trực tiếp Talent ở đợt này: trích quyết định mới, không khôi phục đề xuất cũ.
- Home là màn đầu và My Page là nơi điều hướng không tự được coi là mâu thuẫn: có thể là hai vai trò màn khác nhau. Giữ PARTIAL về phê duyệt bố cục thay vì tạo conflict do diễn giải.

## Gate và khả năng bàn giao

| Gate | Kết quả | Căn cứ |
|---|---|---|
| G1 | BLOCKED — hồ sơ đã chuẩn bị | Đủ12 nguồn đúng hash; giới hạn nguồn/đọc hình đã ghi. Chưa có người được chỉ định ký duyệt phạm vi và giới hạn; chưa có phê duyệt thương mại. |
| G2 | BLOCKED — đã chuẩn bị bản extraction | Các sổ và bằng chứng đã lập, kiểm cơ học đạt; G1 chưa ký và chưa có reviewer/Tech Lead được chỉ định kiểm chấp thuận. |
| G3–G8 | NOT_RUN | Ngoài phạm vi lệnh extraction; không tự ký independent review hoặc tạo Q&A. |

Theo RUNBOOK, khi gate chưa ký vẫn có thể chuẩn bị nháp phần độc lập. Các đầu ra đợt này là bản G2 chờ duyệt; **chưa tuyên bố đủ đặc tả, chưa lập baseline APPROVED và chưa tự đóng finding/No.** Chủ dự án/Tech Lead cần chỉ định người duyệt nguồn, reviewer và phạm vi đợt review tiếp theo.

## Kiểm tra

- `python3 docs/requirement-review/validate.py`: kiểm12 nguồn/hash,9 schema CSV và link của bộ quy trình.
- `python3 docs/requirement-review/extraction-2026-11-19/validate_extraction.py`: kiểm trường yêu cầu, trạng thái, liên kết REQ/BR/EV, hash snapshot/đầu vào cũ và54 chức năng/67 TR.

Các kiểm tra chỉ chứng minh tính nhất quán cơ học. Không dùng kết quả PASS của script để thay G1/G2/G5/G7/G8.

Kết quả chạy và thử đường lỗi: [VALIDATION.md](VALIDATION.md). Các lệnh kiểm tra đều đạt; nguồn và các đầu vào cũ không thay đổi.
