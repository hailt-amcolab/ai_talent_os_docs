# Quy trình phân tích và kiểm chứng yêu cầu

## Điểm vào hiện hành sau sửa theo kiểm chứng

[Báo cáo sửa](corrections-2026-11-19/REPORT.md) và [current-view.json](corrections-2026-11-19/current-view.json) xác định bản đang dùng. Register requirements/business-rules đã cập nhật liên kết G3; [flow index hiện hành](corrections-2026-11-19/FLOW_INDEX.md), [thông tin còn thiếu](corrections-2026-11-19/MISSING_INFORMATION_CURRENT.md), [hiệu lực review finding](corrections-2026-11-19/finding-review-applicability.csv) và Q&A V5 thay điểm vào tương ứng. Các mô tả/gate cũ bên dưới là lịch sử từng đợt, không phải trạng thái hiện hành. Không tự áp dụng PASS cũ cho hash sửa.

Thiết lập ngày 19/11/2026. Đây là quy trình nội bộ, không phải yêu cầu hoặc phê duyệt của khách. **Mốc thiết lập ban đầu chưa chạy phân tích nghiệp vụ. Đợt Requirement Extraction theo lệnh tiếp theo được ghi riêng ở cuối trang; chưa tạo Q&A hoặc thông qua G1–G8 cho module nào.**

Đọc [danh mục nguồn](../../TAI_LIEU_NGUON.md), [sổ nguồn](SOURCE_REGISTER.md), [quy tắc dữ liệu](DATA_MODEL.md), [quality gates (cổng kiểm soát)](QUALITY_GATES.md), rồi [hướng dẫn vận hành](RUNBOOK.md). Kết quả khảo sát và các quyết định vận hành còn thiếu ở [báo cáo thiết lập](SETUP_REPORT.md).

## Nơi quản lý duy nhất

| Thành phần | Nơi lưu nội dung chính | Lớp quản lý mới |
|---|---|---|
| Source Register (sổ nguồn) | TAI_LIEU_NGUON.md; kiểm kê28 JSON | SOURCE_REGISTER.md: phiên bản, hiệu lực, quan hệ, ưu tiên |
| Requirement Register (sổ yêu cầu) | Phan_tich/24_Ma_tran_truy_vet_yeu_cau_luong.csv | registers/requirements.csv: định danh từng yêu cầu, nguồn và kiểm chứng; trỏ dòng TR, không chép nguyên dòng |
| Business Rules (quy tắc nghiệp vụ) | Phan_tich/05_Quy_tac_nghiep_vu.md; phần quy tắc trong SCD | registers/business-rules.csv: chỉ mục và bằng chứng từng quy tắc |
| Business Flows (luồng nghiệp vụ) | Phan_tich/06_Workflow.md, 22; kịch bản25; SCD | registers/business-flows.csv: chỉ mục, nhánh và phạm vi đã kiểm tra |
| Findings (phát hiện) | Phan_tich/23; RV, G, L22/L23 hiện có; workbook15 | registers/findings.csv: chỉ bổ sung phát hiện chưa có nơi chính, hoặc trỏ phát hiện cũ để quản lý xác minh |
| Evidence (bằng chứng) | Nguồn gốc giữ nguyên | registers/evidence.csv: vị trí, hash, nội dung ngắn và hành vi được chứng minh |
| Q&A Draft (câu hỏi dự thảo) | Đợt Markdown đã được chỉ định: qa-drafting-2026-11-19/qa-draft.md; Internal Evidence riêng cùng thư mục. Workbook15 giữ ID/lịch sử hiện có | Một bản nội dung chính mỗi đợt; không chép bộ Markdown sang workbook thành kho song song. WORKING_DRAFT theo WCP-0001; APPROVED_QA cần G1–G6 và Tech Lead duyệt đúng bản |
| Independent Review (rà soát độc lập) | registers/reviews.csv | Người khác tác giả, ghi từng phản biện và kết quả xử lý |
| Customer Decisions (quyết định khách) | QA, KS, GJ là bằng chứng gốc | registers/customer-decisions.csv: chỉ mục quyết định, phần chưa chốt, tác động và quan hệ thay thế |
| Requirement Baseline (bản yêu cầu được chốt) | registers/baselines.csv | Danh sách ID và phiên bản bất biến; phê duyệt, phạm vi loại trừ, thay đổi |
| Readiness Report (báo cáo sẵn sàng) | SCD/README.md R1–R9; Phan_tich/23 là đánh giá trước | READINESS_REPORT.md: đánh giá mới theo phạm vi và snapshot, không sửa ngược lịch sử |
| Lịch sử qua gate | registers/gate-runs.csv | Mỗi lần chạy một dòng có input/output hash và người chịu trách nhiệm |

Ở mốc thiết lập, các CSV chỉ có tiêu đề. Đợt trích xuất19/11 đã điền requirements, business-rules và evidence; các sổ còn lại chỉ có tiêu đề trừ gate-runs lưu trạng thái chờ duyệt. Chúng là phần bổ sung quản lý truy vết, không thay thế tài liệu cũ. Nội dung nghiệp vụ chỉ lưu tại nơi chính; sổ mới lưu liên kết, trạng thái và bằng chứng. Không di chuyển/sửa workbook15 trong bước thiết lập.

## Đợt Requirement Extraction đã thực hiện

Xem [kết quả ngày19/11/2026](extraction-2026-11-19/README.md), [thông tin còn thiếu](extraction-2026-11-19/MISSING_INFORMATION.md) và [báo cáo truy xuất nguồn](extraction-2026-11-19/TRACEABILITY_REPORT.md). Đây là bản trích xuất chờ duyệt G2, không thay mốc thiết lập trong READINESS_REPORT.md hoặc đánh giá sẵn sàng của các module.

## Thay đổi workflow WCP-0001 đã được chấp thuận

Xem [hồ sơ chấp thuận và áp dụng](workflow-change-proposal-2026-11-19/application/APPROVAL_AND_CHANGELOG.md). Có hai cấp Q&A: WORKING_DRAFT nội bộ được chuẩn bị từ ACCEPT nội dung đủ điều kiện; APPROVED_QA cần G1–G6 PASS và Tech Lead duyệt đúng bản. Chữ ký reviewer và ủy quyền gửi ngoài giữ nguyên. Xem điều kiện ở QUALITY_GATES/DATA_MODEL và bước6a/6b trong RUNBOOK.

Với đợt Markdown hiện tại, qa-draft.md là bản biên tập chính; workbook15 giữ mã/lịch sử, các lần cập nhật sau chỉ trỏ bản Markdown, không chép thêm cùng bộ câu hỏi. Không sửa workbook trong đợt cập nhật quy trình này. Nếu chuyển nơi chính sau này phải có quyết định và liên kết, giữ bản cũ bất biến. Gói đã duyệt dùng manifest/hash riêng. Bản qa-draft.md trống hiện hữu và các gate BLOCKED cũ vẫn là hồ sơ lịch sử; chỉ thay bản khi được giao soạn và đã lưu phiên bản trước.
