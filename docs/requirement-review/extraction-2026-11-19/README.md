# Kết quả Requirement Extraction ngày 19/11/2026

Bản trích xuất G2 để rà soát, chưa phải baseline hoặc đặc tả được duyệt. Không tạo Customer Q&A, không sửa nguồn hay kết quả phân tích cũ.

| Đầu ra | Tệp chính |
|---|---|
| Requirement Register — sổ yêu cầu | [requirements.csv](../registers/requirements.csv) |
| Business Rules Register — sổ quy tắc nghiệp vụ | [business-rules.csv](../registers/business-rules.csv) |
| Bằng chứng nguyên văn và vị trí | [evidence.csv](../registers/evidence.csv) |
| Thông tin còn thiếu | [MISSING_INFORMATION.md](MISSING_INFORMATION.md), chi tiết tại [missing-information.csv](missing-information.csv) |
| Báo cáo khả năng truy xuất nguồn | [TRACEABILITY_REPORT.md](TRACEABILITY_REPORT.md) |
| Danh sách nguồn → yêu cầu | [source-coverage.csv](source-coverage.csv) |
| No. còn mở đã tồn tại | [existing-open-items.csv](existing-open-items.csv) — chỉ mục tham chiếu, không phải Q&A mới |
| Snapshot và số lượng | [source-snapshot.json](source-snapshot.json), [counts.json](counts.json) |

CSV là bản chính duy nhất cho dữ liệu trích xuất; các báo cáo là diễn giải và thống kê. Không sửa workbook15, ma trận24, SCD hoặc technical spec trong đợt này. `legacy_ref` trỏ TR cũ; `spec_refs` chỉ là nơi có thể đồng bộ sau, không phải bằng chứng khách xác nhận. Một TR có nhiều REQ là phân rã hành vi của cùng chức năng, không tạo lại chức năng mới.

## Cách đọc Requirement Register

| Thông tin yêu cầu | Cột |
|---|---|
| Mã | requirement_id; legacy_ref |
| Module / chức năng | module; feature |
| Mô tả nghiệp vụ | business_description |
| Tác nhân / sự kiện | actor; trigger |
| Điều kiện trước / hành vi mong muốn | preconditions; expected_behavior |
| Quy tắc nghiệp vụ | business_rules; rule_ids — tham chiếu BR tại sổ quy tắc, không chép nội dung lần hai |
| Trạng thái / ngoại lệ | related_states; described_exceptions |
| Nguồn bằng chứng | source_refs; evidence_ids — tra EV để biết đường dẫn, phiên bản, hash, mục/trang/sheet/ô và nguyên văn |
| Trạng thái xác nhận | confirmation_status; confirmation_notes |
| Thông tin thiếu | missing_information |
| Trạng thái đối chiếu nguồn | verification_status; checked_by; checked_at |
| Phê duyệt riêng | business_approval; design_approval; commercial_approval; release_approval |

`CONFIRMED`: nguồn có thẩm quyền xác nhận đúng hành vi/ý được ghi, không xác nhận mọi chi tiết của feature. `PARTIAL`: nguồn có một phần, có đề xuất hoặc thiếu bằng chứng xác nhận toàn mệnh đề. `CONFLICTED`: có khác biệt hiện chưa giải nghĩa, giữ cả hai phía. `UNKNOWN`: chưa có quyết định/thông tin cần thiết cho chính mệnh đề đang trích.

`UNKNOWN` trong trường trạng thái/ngoại lệ không có nghĩa đã chứng minh không có trạng thái/ngoại lệ; chỉ nghĩa chưa trích được nội dung tương ứng từ nguồn cho mệnh đề này. Không tự bổ sung đường lỗi từ SCD/technical spec. `VERIFIED` chỉ là đã mở nguồn và đối chiếu bản trích; không có nghĩa khách duyệt, qua review độc lập hoặc đã kiểm phần mềm. Bằng chứng cho một đề xuất có thể VERIFIED trong khi yêu cầu vẫn PARTIAL và claim_type=PROPOSAL.

## Ký hiệu nguồn rút gọn

- `Y:P` = YK2, đoạn XML P của `word/document.xml`; đếm mọi `w:p` từ1 kể cả đoạn trống. EV ghi thêm mục/chức năng. Không dùng số dòng PDF hoặc số ảnh làm số nghiệp vụ.
- `K:r` = KS, sheet `確認事項` (mục xác nhận), hàng Excel r. `Q:r` = QA, sheet `Q&A`, hàng r. **Hàng Excel không phải No.** Ví dụ `Q:12` là hàng12/No.11; `Q:51` là hàng51/No.51.
- `H:r` = QA, sheet `保留` (bảo lưu); `C:r` = QA, sheet `追加要件` (yêu cầu bổ sung).
- `G:n` = GJ, mục n của phần nội dung đồng thuận ngày17/11; không dùng việc sẽ làm như quyết định đã xong.
- `T:p`/`M:p` = SD-T18/SD-M18, trang PDF p từ1. Mã màn phải đi cùng tài liệu/phiên bản; không đổi mã AG thành mã SD.
- `F:505` = YK2 §5-1 hình5-1 tại đoạn P505; đã xem trực quan ảnh nhúng. Đây là bộ trạng thái cũ phải cập nhật theo QA No.51, không phải enum cuối.

Kiểm tra: `python3 docs/requirement-review/validate.py` và `python3 docs/requirement-review/extraction-2026-11-19/validate_extraction.py`. Đây là kiểm tra cơ học, không ký gate.
