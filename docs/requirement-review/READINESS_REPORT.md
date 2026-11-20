> **Cập nhật QA mới — 2026-11-20:** đã lọc trùng 5 sheet; bản nháp còn 2 câu, rút thêm 24 câu (gồm 6 câu phí/thanh toán theo yêu cầu). Các số đếm và gate ở nội dung đợt trước bên dưới là lịch sử; G1–G4 hiện STALE, G5/G6 BLOCKED. Bản chính: `docs/requirement-review/qa-drafting-2026-11-19/qa-draft.md`.

# Trạng thái sẵn sàng hiện hành

Cập nhật20/11/2026 sau đối chiếu nguồn19/11 và QA/KS20/11. Kết quả biên tập/phân tích không tự là phê duyệt bàn giao.

| Gate | Hiệu lực hiện hành | Phạm vi/việc còn lại |
|---|---|---|
| G1 | PASS — GATE-0031 | Toàn vẹn/định danh16nguồn; phần hình BF19trang10 bị cắt và văn bản ký chưa có được tách phạm vi |
| G2–G4 | STALE — GATE-0032–0034 | Đã đối chiếu/cập nhật bản tác giả; còn truy vết nguyên tử cho ý mới và kiểm lại phản chứng/phạm vi bản mới |
| G5 | BLOCKED — GATE-0035 | Chưa có reviewer khác tác giả cho snapshot mới; không kế thừa ACCEPT/chữ ký cũ |
| G6 | BLOCKED — GATE-0036 | 26câu nháp chưa duyệt;10ID rút/phân tuyến. Không gửi ngoài |
| G7 | Chưa cấp PASS mới | Không tự biến mô tả FCP, cột trả lời trống hoặc quyết định người dùng thành xác nhận đại diện khách |
| G8 | Chưa đánh giá đạt | Chưa có baseline/sẵn sàng triển khai được duyệt theo các gate còn hiệu lực |

Chi tiết: [kết quả đối chiếu](corrections-2026-11-19/NEW_DELIVERY_IMPACT.md), [gate runs](registers/gate-runs.csv). Chưa tuyên bố module nào đủ bàn giao hoặc được phát hành.

<details>
<summary>Snapshot thiết lập19/11 — giữ nguyên để tra lịch sử</summary>

# Báo cáo sẵn sàng theo quy trình mới

Ngày thiết lập: 19/11/2026. Phạm vi: hạ tầng quản lý yêu cầu, không đánh giá nghiệp vụ module.

| Gate | Kết quả hiện tại | Lý do |
|---|---|---|
| G1 | NOT_RUN | Đã đối chiếu cơ học 12 tệp và khảo sát nguồn cho thiết lập; chưa có đợt G1 theo phạm vi và người duyệt |
| G2–G4 | NOT_RUN | Chưa được yêu cầu phân tích/trích yêu cầu, rà luồng hoặc xác minh finding |
| G5 | NOT_RUN | Chưa chỉ định reviewer độc lập cho đợt phân tích |
| G6 | NOT_RUN | Chưa được phép soạn Q&A mới |
| G7 | NOT_RUN | Chưa chạy đối chiếu quyết định theo phạm vi mới; không nhập trạng thái từ báo cáo cũ |
| G8 | NOT_RUN | Chưa có phạm vi, bằng chứng và phê duyệt baseline theo quy trình mới |

**Chưa tuyên bố module nào đủ điều kiện bàn giao.** Bảng R1–R9/màu của SCD và đánh giá23 giữ nguyên giá trị lịch sử, không được tự quy đổi thành kết quả G8.

Mỗi lần đánh giá sau này phải lập phiên bản báo cáo theo phạm vi, ghi: người lập/duyệt, nguồn và hash, danh sách REQ/BR/FLOW/AC/SCD, gate-run, phạm vi đã kiểm/loại trừ, finding chặn và bên xử lý, quyết định nghiệp vụ/thiết kế/thương mại/phát hành, bằng chứng kỹ thuật, kết luận READY/BLOCKED/NOT_ASSESSED và baseline liên quan. READY chỉ khi G8 PASS còn hiệu lực; phạm vi chưa đánh giá là NOT_ASSESSED. Bản này là mốc thiết lập, không ghi đè để mất lịch sử.

</details>
