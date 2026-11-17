# Kiểm tra bộ tài liệu

16/11/2026. Đã kiểm tra cấu trúc:

- 117 case ID duy nhất, đầy đủ trường; trạng thái tất cả Chưa chạy.
- 12 schema được Draft202012Validator kiểm tra cú pháp; 16 mẫu positive/negative đi qua validator có kiểm tra UUID/date-time.
- JSON đọc được; 6 sơ đồ Mermaid có code fence cân bằng.
- 18 Q&A, 11 POC; nguồn manifest gồm đúng 5 tài liệu khôi phục.
- ZIP có CRC hợp lệ và đủ danh mục tệp.

Đây không phải kết quả chạy test sản phẩm. Chưa chạy Microsoft Graph/MCP/ChatGPT live, chưa kiểm tra tenant/gói/license thật; chưa render sơ đồ Mermaid bằng trình duyệt. Việc không tìm chuỗi MCP chỉ áp dụng phần văn bản đã trích xuất, không OCR toàn bộ ảnh hoặc xác nhận nội dung v2.

## Cập nhật bản 1.1 (17/11/2026)

- Spec sửa theo [YK2] v2: mốc tạo thư mục, file `AIメモ.md`, cấu trúc thư mục tiếng Nhật (thống nhất `SCD/EP02/2-2`), bỏ xuất danh sách từ cấm, tải media qua Supabase Storage rồi chép sang OneDrive, MCP là phương án chính theo 御見積書 前提条件A4.
- FOLDER_MANIFEST.example.json viết lại theo cây mới; JSON đọc được.
- 3 ca kiểm thử sửa theo tên mới: IMPORT-08, EXPORT-04, EXPORT-05. Tổng số ca không đổi.
- SOURCE_MANIFEST thêm [YK2] v2, [AG], file Q&A kèm SHA-256.
