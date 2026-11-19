# Báo cáo thiết lập ngày 19/11/2026

## Kết quả và giới hạn khảo sát

Đã thiết lập workflow, quy tắc dữ liệu, G1–G8, sổ metadata trống, hướng dẫn Codex và skill cấp repository. Chưa phân tích toàn bộ nghiệp vụ, chưa tạo Customer Q&A, chưa nhập quyết định hoặc gán VERIFIED từ kết quả cũ, chưa thông qua gate cho module nào.

Đã đọc AGENTS.md, CLAUDE.md, TIEP_TUC.md, TAI_LIEU_NGUON.md; kiểm kê đường dẫn thực tế của nguồn/phân tích/SCD/technical specification/thiết kế DB. Đã đọc cấu trúc, phần mở đầu và chỉ mục tài liệu nội bộ; đọc hướng dẫn15, README SCD, ma trận24/kịch bản25 và cập nhật28 để chọn nơi tái sử dụng. Đây là khảo sát cấu trúc và cơ chế nguồn, **không tuyên bố kiểm chứng toàn văn mọi phân tích/SCD**.

Đã đối chiếu hash của toàn bộ 12 nguồn với JSON28, trích xuất văn bản PDF/DOCX để kiểm nhận diện và quy tắc ưu tiên, đọc biên bản GJ, kiểm cấu trúc Excel qua XML gốc (không cần cài thư viện). Nội dung nguồn không thay đổi. Chưa kiểm chứng bằng mắt mọi hình nhúng và mọi màn PDF; không dùng phần chưa đọc trực quan để kết luận nghiệp vụ.

Nhận diện 12 nguồn: YK1, YK2, QA, KS, GJ, AG, SD-T18, SD-M18, GT, SM, TK-T, TK-M. Chi tiết phiên bản/ngày/hiệu lực/phạm vi/quan hệ/ưu tiên tại SOURCE_REGISTER.md và tên/đường dẫn/hash tại catalog/JSON28 hiện có. YK2 phần tài liệu liên quan xác định hợp đồng > SOW > báo giá; giới hạn áp dụng theo catalog hiện hành. QA/KS/GJ chứa câu trả lời/quyết định và việc còn mở; không coi cả tệp đã được phê duyệt. Không lập danh sách quyết định nghiệp vụ mới trong đợt thiết lập.

## Những gì đã tạo hoặc sửa

- Sửa nối thêm AGENTS.md gốc: quy tắc kiểm soát yêu cầu, điểm vào workflow/skill; giữ phần hướng dẫn và thay đổi có trước.
- Tạo `.agents/skills/requirement-review/SKILL.md`: skill Codex dùng quy trình, không tự mở rộng phạm vi.
- Tạo `docs/requirement-review/README.md`, `SOURCE_REGISTER.md`, `DATA_MODEL.md`, `QUALITY_GATES.md`, `RUNBOOK.md`, `READINESS_REPORT.md`, `SETUP_REPORT.md`.
- Tạo 9 CSV chỉ có header trong `docs/requirement-review/registers/`: requirements, business-rules, business-flows, findings, evidence, reviews, customer-decisions, baselines, gate-runs.
- Tạo `docs/requirement-review/validate.py`: kiểm tra cơ học chỉ đọc nguồn, schema và link.

Không sửa CLAUDE.md/TIEP_TUC.md, catalog/kiểm kê28, nguồn gốc, nội dung phân tích/SCD/technical spec hoặc workbook15 trong đợt này. Working tree đã có nhiều sửa/xóa/thêm trước tác vụ; không khôi phục, stage hoặc commit chúng. Thư mục `.agents` được bảo vệ ghi ở sandbox; đã tạo skill bằng quyền ghi được cơ chế duyệt môi trường chấp nhận, không cần cài global.

## Cách dùng

Theo RUNBOOK.md: giao phạm vi → G1 nguồn → G2 truy vết → G3 luồng → G4 finding → G5 review độc lập → G6 soạn Q&A khi được yêu cầu → G7 ghi xác nhận → G8 chốt sẵn sàng. Quyết định đã có đi theo nhánh tái sử dụng G7, không hỏi lại khách. Mỗi gate có input, luật kiểm, điều kiện đạt/không đạt, đầu ra, người chịu trách nhiệm trong QUALITY_GATES.md.

Lệnh kiểm tra cơ học từ gốc: `python3 docs/requirement-review/validate.py`. Kiểm skill: `python3 /home/amcolab/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/requirement-review`. Không có build/test ứng dụng vì chỉ thêm tài liệu và công cụ kiểm tra đọc tệp.

## Điều còn thiếu để vận hành một đợt thật

| Cần bổ sung | Người chịu trách nhiệm | Ảnh hưởng |
|---|---|---|
| Phạm vi module/luồng và lệnh bắt đầu phân tích | Người dùng/chủ dự án | Chưa chạy G2–G8 |
| BA lập, reviewer khác tác giả, người duyệt và đầu mối khách có thẩm quyền | Tech Lead/chủ dự án | G5/G7/G8 không tự ký bằng vai trò trống |
| Hợp đồng/SOW/báo giá đúng bản nếu cần chốt thương mại | Chủ dự án/đầu mối thương mại | Không khẳng định phạm vi/chi phí đã phê duyệt từ trích dẫn thứ cấp |
| Nguồn phản hồi hiện hành và quyền lưu bản snapshot của các lần cập nhật | Đầu mối tài liệu | Cần tiếp nhận nguồn trước khi dùng log thay đổi |
| Bằng chứng đọc ảnh/sơ đồ và kiểm chứng kỹ thuật theo từng phạm vi | BA/QA/Tech Lead/provider | Chỉ phát sinh khi đợt phân tích cần; chưa có đủ để tuyên bố G8 |
| Tiếp nhận dữ liệu cũ từng phạm vi bằng review nguồn | BA + reviewer | Sổ mới cố ý chưa nhập trạng thái cũ như đã kiểm chứng |

## Điểm Tech Lead cần quyết định trước đợt đầu

1. Chọn module/luồng đầu tiên, phạm vi bàn giao và thứ tự phụ thuộc; không tự coi toàn bộ dự án là một đợt.
2. Chỉ định tên người lập/reviewer/người duyệt baseline, đầu mối khách và người có quyền duyệt thương mại. Nếu không có reviewer độc lập, giữ G5 BLOCKED.
3. Xác định bằng chứng kỹ thuật cần cho R7/G8, môi trường thử và ai cung cấp tài khoản; không biến việc này thành Customer Q&A nghiệp vụ.
4. Chọn phạm vi baseline và cách đóng gói manifest/hash, nơi lưu dấu phê duyệt thật. Mặc định đề xuất là gói theo module/luồng, chưa phải quyết định đã duyệt.

Không cần các quyết định này để hoàn tất thiết lập; chúng là điều kiện trước khi vận hành các giai đoạn liên quan.

## Kết quả kiểm tra thiết lập

- `validate.py`: PASS — 12 nguồn khớp kiểm kê/hash, 9 schema CSV và các link của bộ quy trình hợp lệ.
- Trình kiểm tra skill: `Skill is valid!`.
- Đã kiểm hành vi validator bằng fixture trong thư mục tạm: dữ liệu sạch đạt; nguồn đổi hash, nguồn ngoài danh mục và ID CSV trùng đều bị báo lỗi như dự kiến. Fixture không thay nguồn dự án.
- `git diff --check -- AGENTS.md`: đạt.

Các kiểm tra trên xác nhận cấu trúc và công cụ thiết lập, không phải independent review nghiệp vụ, xác nhận khách hoặc kết quả PASS G1–G8.
