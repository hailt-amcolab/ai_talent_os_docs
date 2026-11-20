> **Bản bổ sung hiện hành:** 4 mục nội bộ (2 nháp trước + 2 ứng viên chưa content ACCEPT), 38 ID tracking. Đề xuất và câu hỏi tách riêng; không kế thừa phê duyệt. Số đếm các đợt trước bên dưới là lịch sử.

> **Cập nhật QA mới — 2026-11-20:** đã lọc trùng 5 sheet; bản nháp còn 2 câu, rút thêm 24 câu (gồm 6 câu phí/thanh toán theo yêu cầu). Các số đếm và gate ở nội dung đợt trước bên dưới là lịch sử; G1–G4 hiện STALE, G5/G6 BLOCKED. Bản chính: `docs/requirement-review/qa-drafting-2026-11-19/qa-draft.md`.

# Kiểm chứng yêu cầu AI Talent OS

**Bản đối chiếu hiện hành: nguồn19/11 và QA/KS20/11/2026.** Đã đối chiếu175yêu cầu,90quy tắc,30luồng,47finding cũ và36ID Q&A; thêm FND-0048 đang cần bằng chứng. Chưa duyệt Q&A hoặc Independent Verification của bản mới.

| Cần xem | Bản chính |
|---|---|
| Nguồn và thẩm quyền | [Catalog](../../TAI_LIEU_NGUON.md), [Source Register](SOURCE_REGISTER.md) |
| Kết quả đối chiếu và điểm còn thiếu | [Báo cáo hiện hành](corrections-2026-11-19/NEW_DELIVERY_IMPACT.md) |
| Yêu cầu và quy tắc | [Requirements](registers/requirements.csv), [business rules](registers/business-rules.csv) |
| Luồng đã đối chiếu | [30luồng hiện hành](corrections-2026-11-19/FLOW_INDEX.md) |
| Finding và hiệu lực review | [Findings](registers/findings.csv), [chi tiết hiện hành](corrections-2026-11-19/finding-details.csv), [review applicability](corrections-2026-11-19/finding-review-applicability.csv) |
| Bằng chứng và phạm vi tài liệu đã rà | [Evidence](registers/evidence.csv), [hồ sơ nguồn/bản đồ đối chiếu](corrections-2026-11-19/new-delivery-intake.json) |
| Q&A hiện hành | [26câu nháp và10ID rút/phân tuyến](qa-drafting-2026-11-19/qa-draft.md), [CSV26câu](qa-drafting-2026-11-19/csv-export/qa-draft.csv) |
| Trạng thái gate | [Gate runs](registers/gate-runs.csv), [readiness](READINESS_REPORT.md) |

Đã đọc81trang PDF mới bằng chữ và hình, biên bản FCP–AMCOLAB, QA5sheet và KS3sheet. Các nguồn mới không tự là khách duyệt;42mục trong hai sheet KS mới chưa có trả lời. H65 đã chốt theo DEC-0001: không giới hạn số lần AI viết lại.

**Gate hiện hành:** G1 PASS cho phạm vi toàn vẹn/định danh16nguồn, có giới hạn nguồn được tách rõ; G2–G4 bản sửa còn STALE, G5/G6 BLOCKED. Kết quả đối chiếu tác giả không thay reviewer khác tác giả, Tech Lead duyệt Q&A hoặc bằng chứng khách trả lời. Các lần PASS trước chỉ áp dụng snapshot/phạm vi của chúng.

Đọc [quy tắc dữ liệu](DATA_MODEL.md), [G1–G8](QUALITY_GATES.md), [runbook](RUNBOOK.md), [WCP-0001](workflow-change-proposal-2026-11-19/application/APPROVAL_AND_CHANGELOG.md) khi vận hành. Không tạo kho Q&A song song trong SCD hoặc workbook15.

Kiểm cấu trúc/hash và sự khớp bản xuất hiện hành: `python3 docs/requirement-review/validate.py`. Kiểm cơ học không thay Independent Review hoặc phê duyệt nghiệp vụ.

Các thư mục theo ngày, chữ ký, review và manifest trước đây giữ làm hồ sơ lịch sử. Nội dung trước sửa được lưu trong changes.csv, không sửa ngược để ép PASS validator snapshot cũ. [Bộ tài liệu dự án](../README.md).
