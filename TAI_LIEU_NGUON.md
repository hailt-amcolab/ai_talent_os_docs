# Danh mục nguồn yêu cầu gốc

Người dùng xác định danh mục này ngày 18/11/2026. Đây là kiến thức dự án được lưu trong repository để các lần làm việc sau đọc lại; không phải khẳng định bộ nhớ của mô hình tự cập nhật vĩnh viễn.

## Chín tệp nguồn

| Mã | Tệp | Vai trò và giới hạn |
|---|---|---|
| QA | [AI-Talent-OS_Q&A表.xlsx](AI-Talent-OS_Q&A表.xlsx) | Hỏi đáp gốc; đọc câu hỏi, lịch sử trả lời, trạng thái và ghi chú. Đọc cả các sheet bảo lưu và yêu cầu bổ sung. Câu hỏi/đề xuất không phải câu trả lời. |
| YK2 | [AI育成OS_概要要件定義書_v2.docx](AI育成OS_概要要件定義書_v2.docx) | Yêu cầu tổng quan và hình luồng; bìa ghi bản0.1 ngày13/11. Các mục cần xác nhận chưa mặc nhiên được duyệt. |
| AG | [アプリ画面案_AI育成OS.pdf](アプリ画面案_AI育成OS.pdf) | Phương án màn hình12 trang ngày12/11; bộ mã T-01–T-15/M-01–M-19 theo QA No.30/68. Khung đỏ là phần cần xác nhận; số/văn bản minh họa không tự thành quy tắc. |
| GT | [画面遷移図と画面案_AI育成OS.pdf](画面遷移図と画面案_AI育成OS.pdf) | Phương án luồng/màn cũ8 trang ngày11/11; không dùng lại mã hay lựa chọn cũ đã được thay thế. |
| KS | [要件定義確認シート_AI育成OS.xlsx](要件定義確認シート_AI育成OS.xlsx) | Bảng xác nhận gốc: dấu OK, đề xuất, ý kiến và quyết định17/11. Có OK không đồng nghĩa ghi chú đã được giải nghĩa hoặc mọi chi tiết đã chốt. |
| SM | [要件説明資料_AI育成OS.pdf](要件説明資料_AI育成OS.pdf) | Tài liệu giải thích cũ42 trang; còn LINE, lượt miễn phí và phân loại cũ. Dùng truy lịch sử, không phục hồi quyết định đã thay. |
| GJ | [20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md](20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md) | Biên bản17/11, quyết định và việc được giao; phân biệt quyết định với việc sẽ đề xuất/xác nhận sau. |
| TK-T | [Thiết kế Talent](<Design style/★AI育成OS_タレントアプリ画面_かわいい版.pdf>) | Thiết kế trực quan12 trang, mã L; có nội dung cũ đã được AG/Q&A/KS thay thế. |
| TK-M | [Thiết kế Manager](<Design style/★AI育成OS_マネージャー管理画面_PC_携帯_カテゴリー_AI指示.pdf>) | Thiết kế trực quan18 trang, mã M khác AG; có đề xuất nhóm/chỉ thị và nội dung cũ. |

## Quy tắc sử dụng

1. Các tệp khác là kết quả phân tích, đặc tả hoặc quyết định kỹ thuật nội bộ. Chúng hỗ trợ truy vết nhưng không xác nhận thay khách; nhiều tệp lặp một ý không tạo thêm bằng chứng độc lập. Bản DOCX v1 ngoài danh mục trên chỉ là bản lịch sử.
2. Trích dẫn nghiệp vụ phải quay về một trong chín nguồn: mục/hình DOCX; trang PDF và mã màn theo đúng tệp; sheet/No./ô Excel; mục biên bản. Tên hình `imageN.png` chỉ là tên tài nguyên trong DOCX, cần tra ngược tới chú thích/mục.
3. Quyết định mới có ngày và cùng chủ đề thay nội dung cũ; nếu các nguồn mới còn khác nhau, giữ xung đột và hỏi đúng phần khác. Không dùng quy tắc “tệp mới thắng tất cả”.
4. Tách bốn việc: khách chốt hành vi; đội chốt thiết kế; hai bên chốt phạm vi/giá/lịch; chủ dự án chốt phát hành. QA Close không tự đóng cả bốn. Không có phản hồi không được coi là phê duyệt.
5. Có dẫn hợp đồng/SOW/báo giá trong chín nguồn không có nghĩa đã đối chiếu bản ký độc lập. Không tự xác nhận phạm vi thương mại từ bản phân tích.
6. Không sửa chín tệp nguồn để làm hết mâu thuẫn. Ghi kết quả ở tài liệu dẫn xuất, giữ lịch sử và vị trí nguồn. Không dùng mã nguồn, demo, `.env` hoặc kết quả chạy thử để suy ra yêu cầu khách.
7. Với bộ câu hỏi: chỉ đưa quyết định nghiệp vụ/phạm vi thật sự cần khách; câu đã có No. thì phân rã theo No. đó, không cấp No. Q&A mới hay gửi lặp. Việc đội/provider xử lý được phải có người và đầu ra riêng.

## Cách đọc workbook15

`Luong` và `Chi_tiet` là danh mục nội bộ đầy đủ, không phải nguyên bộ cần gửi khách. `Gui_khach` là bản biên tập các quyết định còn mở, có lựa chọn/ảnh hưởng/căn cứ; chưa gửi và chưa được duyệt. `Noi_bo` là việc đội phải chuẩn bị/đồng bộ trước và sau câu trả lời. Giữ nguyên các dòng 確認 (mục cần xác nhận) trong sheet `Luong`.
