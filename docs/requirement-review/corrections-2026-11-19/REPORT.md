# Sửa hồ sơ theo báo cáo kiểm chứng toàn bộ

Hoàn tất phần sửa FV-001–012 ngày20/11/2026; thư mục phiên bản giữ ngày19/11 của đợt bắt đầu. Đây là bản sửa của Analyst, **chưa được Independent Reviewer kiểm lại hoặc phê duyệt phát hành**.

## Đã sửa

- **12 requirement**: REQ-0020,0057,0078,0090,0092,0094,0117,0118,0120,0125,0159,0169. Tách thao tác Manager chuyển tay với đề xuất tự chuyển; sửa4tham chiếu màn; loại nghĩa không có căn cứ về trang do dịch vụ cung cấp; giữ mốc sáng hôm sau; bổ sung ngữ cảnh office/thử thách/đường nhập; thu hẹp nhãn giai đoạn sau.
- **4 business rule**: BR-0031,0044,0060,0069. Giữ phần nguồn đã nêu và phần còn mở riêng biệt; không tự quyết reset hoặc cơ chế kết nối.
- **8 flow**: FLOW-0003,0004,0006,0009,0013,0016,0021,0024, với12bước được cập nhật. M-20 hủy không lưu/quay M-07 là SOURCE_DESCRIBED, không phải khách đã duyệt. Giữ thứ tự đã vẽ ở từng đường nguồn; không tự nối thành đường đăng vô điều kiện.
- **TRANS-0009**: điểm chưa rõ chỉ là đề xuất tự chuyển sau khởi tạo; không phủ nhận Manager chuyển tay đã có mô tả. **CASE-0036** cập nhật kết quả nút hủy M-20.
- **FND-0003 R1, FND-0023 R2**: giữ ID, bổ sung ngữ cảnh/căn cứ và thu hẹp phần còn thiếu. Hai yêu cầu review **REV-0155/0156 đang OPEN**, chưa chỉ định reviewer, không tạo ACCEPT mới.
- Đồng bộ flow_ids của175REQ/90BR từ map G3 đã tồn tại, không thay nội dung các record ngoài12REQ/4BR nêu trên. Chỉ mục hiện hành: [current-view.json](current-view.json), [FLOW_INDEX](FLOW_INDEX.md), [thông tin còn thiếu](MISSING_INFORMATION_CURRENT.md).

35 EV bổ sung nằm tại [correction-evidence.csv](correction-evidence.csv), được nối vào Evidence Register; mở lại nguồn và phân biệt FACT với xác nhận khách. Không sửa một byte tài liệu nguồn. EV cũ,20REJECT, review/chữ ký cũ và các bản phân tích đã ban hành được giữ.

## Q&A và hiệu lực review

Giữ nguyên36ID và lời câu hỏi V4 trong V5; không thêm câu hỏi hoặc chuyển APPROVED. Cập nhật truy vết/hash và hiện rõ **HOLD** cho **WQA-057-01, WQA-057-02, WQA-066-02**, vì FND-0003/0023 đã có hash mới. Hai finding không tự kế thừa ACCEPT bản cũ. 33câu khác chưa được duyệt gửi.

[Q&A hiện hành](../qa-drafting-2026-11-19/qa-draft.md), [CSV hiện hành](../qa-drafting-2026-11-19/csv-export/qa-draft.csv), [hiệu lực từng finding](finding-review-applicability.csv). Review lịch sử vẫn có24ACCEPT/20REJECT/3NEED_MORE_EVIDENCE; trước đối chiếu nguồn mới,22hash ACCEPT không đổi,2hash mới chưa được review. Không viết lại kết quả lịch sử để che sự khác biệt.

## Phát hiện nguồn mới khi tiếp tục hoàn tất

Đã nhận diện thêm **4nguồn thực tế19/11**, nâng kiểm kê lên16tệp: biên bản FCP–AMCOLAB, hai PDF màn hình và một PDF flow. [Tiếp nhận và ảnh hưởng](NEW_DELIVERY_IMPACT.md) ghi riêng phần này. Biên bản có ý về Manager sửa từ cấm không cần trả Talent, bỏ nút xử lý thông báo và sửa bài chờ duyệt; không thể tiếp tục khẳng định mọi điểm còn thiếu như bộ12nguồn cũ.

Nguồn mới chưa được đối chiếu đầy đủ từng thay đổi/mã màn/thẩm quyền. Tất cả36Q&A đã được gắn trạng thái chờ đối chiếu nguồn mới; ba câu HOLD finding vẫn giữ riêng. Không tự đổi ý kiến FCP–AMCOLAB thành khách アデッソ xác nhận, không tự đóng No.57/66/… hoặc thay requirement bằng chính sách mới.

## Gate và bảo toàn lịch sử

GATE-0013–0016 ghi **STALE đúng phạm vi G2–G5 bị sửa**; GATE-0017 ghi **G6 BLOCKED**. GATE-0018 ghi **G1 STALE cho4nguồn mới**. Đây là ghi hiệu lực bản sửa/nguồn mới theo DATA_MODEL, không phải tự đổi các lần PASS trước thành FAIL hoặc xin duyệt lại mọi phần không đổi. Các lần PASS, chữ ký và hash trước vẫn được lưu nguyên trạng.

Khi dùng nguồn mới, phải đánh giá lại phạm vi ảnh hưởng vào phần từng được coi không đổi; không dùng42mục ký cũ hoặc33câu không đổi như chứng nhận rằng đã đối chiếu xong đợt19/11. Không tạo baseline, Customer Confirmed hoặc quyền gửi khách.

## Lịch sử và cách kiểm

- [issue-resolution.csv](issue-resolution.csv):12nhóm đã áp dụng, chờ review.
- [changes.csv](changes.csv): trước/sau các sửa biên tập và map.
- [register-deltas.csv](register-deltas.csv): đầy đủ thay đổi từng trường register so với bản trước.
- [before](before): bản trước sửa; Markdown lưu đuôi `.md.txt` để giữ nguyên byte mà không bị hiểu là trang đang hoạt động.
- [VALIDATION.md](VALIDATION.md): lệnh và kết quả kiểm tra. Kiểm cơ học không thay Independent Review.

Reviewer tiếp theo cần kiểm đúng nguồn/hash của các bản sửa và xử lý delta4nguồn mới trước khi Tech Lead tái duyệt phạm vi gate/Q&A. Mọi phần chưa được nguồn chốt tiếp tục để mở, không giải quyết thay khách.


## Cập nhật QA/KS ngày 20/11/2026

Hai workbook đổi hash; QA giữ nguyên giá trị/công thức cả năm sheet. KS sửa H65/H105, thêm sheet `20261120` gồm39mục, sheet chi phí/quy mô gồm3mục và19bình luận FCP. Các cột trả lời mới trống; không ghi Customer Confirmed. GATE-0019–0024 ghi G1–G5 STALE/G6 BLOCKED theo phạm vi nguồn cập nhật, giữ nguyên lịch sử. Xem [đối chiếu, phần loại bỏ, thiếu bằng chứng và điểm dừng Tech Lead](NEW_DELIVERY_IMPACT.md). Lượt này chỉ tiếp nhận G1; chưa chạy Independent Verification mới hoặc phê duyệt Q&A.


## DEC-0001 — Không giới hạn số lần AI viết lại (20/11/2026)

- Người quyết định: người dùng trực tiếp trong hội thoại dự án; ghi nhận lúc 2026-11-20T10:17:16+07:00. Không tự gán danh tính hoặc vai trò đại diện アデッソ.
- Nguyên văn chỉ đạo: “chốt theo ghi chú h65 là sẽ không giới hạn số lần, quyết định và tiếp tục các bước tiếp”.
- Phạm vi: áp dụng KS `確認事項!H65`, 確認29; bỏ giới hạn hai lần nhờ AI viết lại bản nháp. Không còn nhánh bắt buộc không đăng trong ngày chỉ vì đã viết lại hai lần. Không thay quyền sửa tay, kiểm từ cấm, phê duyệt bài, trạng thái khóa sau chấp nhận, phí video hoặc chính sách trần phí AI.
- Thay thế đúng phần: giới hạn hai lần và hệ quả dừng vì hết hai lượt trong G65/I65 và các dẫn xuất. Các ô nguồn giữ nguyên để bảo toàn lịch sử; quyết định hiện hành được ghi tại DEC-0001.
- Đây là quyết định trực tiếp của người dùng cho tài liệu dự án; không tự đổi thành Customer Confirmed/G7 PASS, phê duyệt thương mại hoặc G6. Không hỏi lại người dùng cùng lựa chọn số lần.
- Công việc tiếp theo đã thực hiện: đồng bộ REQ-0053, BR-0039, FLOW-0013, nhánh/transition/scenario và các tài liệu phân tích/SCD đang dùng; lưu nội dung trước sửa trong changes.csv. Mục đếm lượt để áp trần hai lần không còn là điều kiện cần hỏi khách; lỗi dịch vụ, kết quả không rõ và gửi lặp vẫn cần thiết kế đội, không được tự coi đã giải quyết.
- G1 toàn bộ tập16nguồn vẫn chưa PASS do ma trận ảnh hưởng/đọc hình và thẩm quyền các chủ đề khác còn thiếu. Đồng bộ theo quyết định cụ thể không phải chạy vượt G2–G5 toàn dự án; các gate phụ thuộc tiếp tục STALE, G6 BLOCKED. Independent Verification của bản mới chưa được thực hiện, chưa có chữ ký khác tác giả.
