# Bằng chứng về ChatGPT, OneDrive và MCP

## 0. Cập nhật 17/11/2026 – kết luận đã sửa

Bản 16/11 chỉ đọc docx v1 và 4 PDF nên kết luận "chưa có bằng chứng MCP". Kiểm tra lại toàn bộ tài liệu trong dự án:

- `AI育成OS_概要要件定義書_v2.docx` ([YK2]): không có chữ MCP; §6-4 chức năng 2-3 giữ yêu cầu "ChatGPT cho xem tài năng nào, nội dung gì, quản lý xác nhận rồi mới ghi".
- `AI-Talent-OS_Q&A表.xlsx`, câu số 45 (phân loại 追加要件, về màn AIへの指示): trích **御見積書 (bản báo giá) 前提条件A4: 「マネージャーはChatGPT(MCP)経由でAIを調整」**. Câu hỏi đưa ba phương án A/B/C; AMCOLAB đề xuất A (không làm màn chỉ thị trong quản trị, điều chỉnh AI qua ChatGPT như báo giá). Cột trả lời chưa có nội dung.
- [YK2] §1: khi tài liệu mâu thuẫn, ưu tiên hợp đồng, SOW, rồi báo giá; báo giá đứng trên [YK2].

**Kết luận đã sửa:** MCP có căn cứ hợp đồng trong báo giá. Thiết kế lấy MCP riêng của AI Talent OS làm phương án chính cho tuyến quản lý ↔ ChatGPT. Còn phải chốt: phạm vi chính xác của MCP (câu 45 chưa trả lời; nguyên văn báo giá chưa có trong kho) và gói ChatGPT của khách có cho connector MCP tự làm ghi dữ liệu không (P09, S02-01). Mục 1–4 dưới đây là bản 16/11, giữ để truy vết.


Ngày kiểm tra: 16/11/2026. Mục tiêu: phân biệt yêu cầu chức năng được viết trong nguồn với cơ chế kỹ thuật người triển khai đề xuất.

## 1. Tài liệu đã đọc lại

5 file gốc trong bản lưu `AI_Talent_OS_translation_work.zip`: DOCX v1 và 4 PDF. Đã đọc đoạn DOCX bằng XML/paragraph/table; trích xuất văn bản tất cả trang PDF; đọc nội dung liên quan OneDrive/ChatGPT. Không OCR toàn bộ chữ trong ảnh. SHA-256 ở SOURCE_MANIFEST.json.

**Giới hạn:** chưa có bản v2 trong bộ nguồn khôi phục. Không đưa kết luận “v2 không nhắc MCP” hoặc “mọi tài liệu đều không nhắc MCP”. Không sử dụng file ZIP đặc tả Upload-Post làm chứng cứ thay cho tài liệu yêu cầu gốc.

## 2. Nội dung được xác nhận

| Nguồn | Nội dung đọc thấy | Ý nghĩa |
|---|---|---|
| DOCX v1 §6-4, 2-3 | Manager chỉ định Talent và truyền thông tin qua ChatGPT để đăng ký vào file trong folder Talent | Có yêu cầu luồng ghi xuất phát từ ChatGPT |
| DOCX v1 §6-4, 2-3 | Trước khi đăng ký, ChatGPT hiển thị Talent nào và nội dung gì; Manager kiểm tra | Phải có xác nhận trước ghi |
| DOCX v1 §6-4, 2-3 | Có thể bổ sung/chỉnh thông tin đã đăng ký cùng cách | Không chỉ đọc hoặc upload file thủ công một lần |
| DOCX v1 §6-4, 2-1 | Đọc file folder Talent và folder chung trước buổi sáng | Có yêu cầu cập nhật ngữ cảnh định kỳ |
| DOCX v1 §7-2 | Hồ sơ/mục tiêu/know-how/kết quả trong OneDrive; Manager và AI Coach chỉ phần Talent của mình | Cần quyền ứng dụng và scope AI, không chỉ tên thư mục |
| DOCX v1 §7-2 | Ảnh/video trong OneDrive, Talent và Manager xem được; hội thoại ở hệ thống | Không tự gộp mọi loại dữ liệu vào cùng context |
| DOCX v1 §7-5 | Sửa file thì AI dùng nội dung ở đợt sáng tiếp theo | Cần đồng bộ hoặc truy xuất lại nguồn; không dùng bản copy cũ mãi |
| PDF giải thích trang 7 | ChatGPT/Codex dùng cho know-how/chỉ dẫn, file cloud có thể sửa | Là định hướng công cụ, chưa là thiết kế OAuth/MCP |
| PDF giải thích trang 33 và thiết kế Manager trang 9 | Hiển thị nội dung từ folder OneDrive, sửa trong file | Cần hỗ trợ thay đổi ngoài ứng dụng |

Một đoạn minh họa nguyên bản của DOCX v1 §6-4, 2-3:

> 登録の前に、どのタレントに何を登録するかを ChatGPT が示し、マネージャーが確かめてから登録します。

Dịch: Trước khi ghi, ChatGPT hiển thị sẽ đăng ký nội dung gì cho Talent nào; Manager kiểm tra rồi mới ghi.

## 3. Kết luận giới hạn

**Có yêu cầu ChatGPT đọc/ghi hoặc làm việc với thông tin Talent lưu trên OneDrive. Chưa có bằng chứng trong phần văn bản đã đọc rằng MCP là cơ chế bắt buộc.** Kết quả tìm chuỗi MCP/Model Context Protocol trong 5 file được ghi ở manifest đều không có hit văn bản.

“ChatGPT Project liên kết folder”, “connector Microsoft có thể ghi”, “Project bảo vệ quyền folder”, “cần xây MCP server riêng” là các khẳng định khác nhau; không khẳng định cái nào chỉ dựa vào câu “ChatGPT đăng ký thông tin”.

## 4. Thiết kế đề xuất và điều cần hỏi

Đề xuất kỹ thuật là gateway kiểm soát truy cập; nếu chọn MCP, Manager xác thực vào MCP, công cụ đọc theo ID nội bộ, ghi bằng proposal có xác nhận và conditional write qua Graph. Backend AI Coach trong app dùng snapshot riêng. ChatGPT subscription/Project và API của app không tự chia sẻ hội thoại, token hoặc file.

Cần khách xác nhận:

1. Cung cấp bản v2/Q&A hiện hành để đối chiếu mục ChatGPT/OneDrive và mốc tạo folder.
2. Muốn dùng app Microsoft có sẵn trong ChatGPT hay chấp nhận MCP riêng?
3. Gói ChatGPT/tài khoản Microsoft 365/chính sách admin thực tế là gì?
4. Cần đọc hay cả ghi; xác nhận ghi trong chat hay qua app là chấp nhận được?
5. Có yêu cầu ràng buộc mỗi Project với một Talent bằng kiểm soát kỹ thuật không?

Nguồn khả năng kỹ thuật hiện hành: https://developers.openai.com/api/docs/mcp và https://developers.openai.com/plugins/build/auth. Các nguồn này chứng minh khả năng xây tích hợp MCP, không chứng minh khách đã yêu cầu triển khai nó hoặc mọi gói tài khoản đều bật được.

