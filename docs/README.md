> **Cập nhật QA mới — 2026-11-20:** đã lọc trùng 5 sheet; bản nháp còn 2 câu, rút thêm 24 câu (gồm 6 câu phí/thanh toán theo yêu cầu). Các số đếm và gate ở nội dung đợt trước bên dưới là lịch sử; G1–G4 hiện STALE, G5/G6 BLOCKED. Bản chính: `docs/requirement-review/qa-drafting-2026-11-19/qa-draft.md`.

# Tài liệu AI Talent OS

Điểm bắt đầu để tra cứu tài liệu. Mỗi phần có một vai trò; không coi các tài liệu dẫn xuất là nguồn yêu cầu ngang quyền với tài liệu khách.

| Cần làm gì | Đọc ở đâu |
|---|---|
| Xác định nguồn và quyết định của khách | [Danh mục nguồn](../TAI_LIEU_NGUON.md) → `source_requiments/` |
| Xem yêu cầu, luồng, điểm thiếu và Q&A hiện hành | [Kiểm chứng yêu cầu](requirement-review/README.md) |
| Hiểu bối cảnh, tra phân tích và mã cũ | [Phân tích](../Phan_tich/README.md) |
| Làm rõ hoặc triển khai một chức năng | [Đặc tả EP01–EP10](../SCD/README.md), đối chiếu kết quả kiểm chứng hiện hành |
| Thiết kế kỹ thuật và viết mã | [Stack và cấu trúc dự án](../agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md) |

`Phan_tich/` còn cần cho bối cảnh, mã TR/FL/RV và workbook15. `SCD/` còn cần cho đặc tả từng chức năng, luồng lỗi và tiêu chí chấp nhận nội bộ. Registers không thay được các nội dung này. Phân tích, SCD và code không tự chứng minh khách duyệt.

Không tạo báo cáo tổng hợp song song cho cùng nội dung. Cập nhật bản chính tương ứng; hồ sơ từng đợt chỉ lưu bằng chứng, phạm vi và thay đổi cần truy vết. Q&A đang biên tập có một [bản chính](requirement-review/qa-drafting-2026-11-19/qa-draft.md); các câu hỏi cũ trong SCD và workbook dùng tra lịch sử, phải đối chiếu trước khi dùng lại.

Ngày 20/11/2026 đã gom điều hướng về trang này. Hồ sơ kiểm chứng cũ giữ nguyên đường dẫn và nội dung vì manifest/hash, ID và liên kết hiện hành còn phụ thuộc vào chúng. Trong VS Code, hồ sơ từng đợt được ẩn khỏi Explorer bằng `.vscode/settings.json`; vẫn mở được bằng liên kết hoặc tắt `files.exclude`. Đây là dọn điểm đọc, chưa xóa hoặc di chuyển hồ sơ lịch sử.

Đã đối chiếu nguồn ngày19/11 và QA/KS20/11, cập nhật các bản chính;26câu Q&A còn nháp và10ID được rút/phân tuyến. Review độc lập/phê duyệt bản mới còn chờ. Đọc [trạng thái hiện hành](requirement-review/README.md) trước khi dùng phân tích, đặc tả hoặc Q&A cũ.
