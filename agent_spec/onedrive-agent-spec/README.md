# Tài liệu triển khai OneDrive cho AI Talent OS

Bản 1.1 · 17/11/2026 · Dành cho lập trình viên và AI agent. Đã đối chiếu lại với [YK2] v2, [AG], file Q&A và `SCD/` (xem `../KET_QUA_KIEM_CHUNG_17-11.md`).

## Đọc theo thứ tự

1. `CHATGPT_MCP_EVIDENCE_VI.md`: bằng chứng về ChatGPT đọc/ghi OneDrive; mục 0 (17/11): MCP có căn cứ trong 御見積書 前提条件A4 (Q&A số 45).
2. `ONEDRIVE_IMPLEMENTATION_SPEC_VI.md`: cấu trúc folder, phân quyền 4 lớp, ownership, DB schema, Graph API, đồng bộ, conflict, media, snapshot AI và phương án MCP.
3. `FOLDER_MANIFEST.example.json`: manifest cây thư mục và chủ dữ liệu đề xuất.
4. `DOCUMENT_CONTRACTS.schema.json`: 12 schema nội bộ, validate bằng `$defs` đúng tên; không phải schema chính thức của Microsoft.
5. `TEST_CASES_VI.md` / `TEST_CASES.json`: 117 tình huống, tất cả Chưa chạy; có tiền điều kiện, kích hoạt, kết quả và kiểm chứng bên ngoài.
6. `SOURCE_MANIFEST.json` / `VALIDATION.md`: nguồn đã đọc và kết quả kiểm tra bộ tài liệu.

## Điều quan trọng trước khi code

- Không đồng bộ hai chiều mọi trường. Hồ sơ/know-how do tài liệu OneDrive sở hữu; dữ liệu nghiệp vụ/goal/metrics do DB sở hữu.
- Không coi tên folder, prompt hay ChatGPT Project là ranh giới phân quyền.
- Không coi app Microsoft trong ChatGPT chỉ đọc là đã hoàn thành yêu cầu ghi thông tin.
- MCP riêng là phương án chính theo báo giá; bật production sau POC P09 và khi phạm vi (Q&A số 45) được chốt; phải có OAuth, kiểm tra scope và xác nhận ghi thật.
- File hợp lệ, role, version và snapshot được kiểm tra trước khi đưa vào AI; không dùng file để điều khiển quyền hoặc xuất bản SNS.
- Có 18 Q&A và 11 POC cần xử lý theo phạm vi; chưa có tài khoản Graph/ChatGPT khách để kiểm chứng live.

## Prompt giao việc cho agent

Đọc evidence và spec trước. Triển khai một bước ở mục 19, nêu case ID tương ứng.
Viết mock Graph adapter và kiểm thử quyền/concurrency trước POC. Không gọi Graph trực tiếp từ frontend hoặc cho mô hình chọn drive/path tùy ý. Không auto broaden permission, không blind overwrite khi 412, không khẳng định đã ghi file khi operation còn unknown. Không đưa secret vào fixture. Ghi rõ Q&A và POC đang chặn production.

## Giới hạn nguồn

Bản 1.1 dùng [YK2] v2, [AG] và file Q&A trong thư mục dự án (SHA-256 ở SOURCE_MANIFEST.json). Mốc tạo thư mục, cấu trúc thư mục tiếng Nhật, file `AIメモ.md`, cách tải media qua Supabase Storage đã sửa theo v2 và `SCD/`. Không có bản sao nguyên gốc khách hàng hoặc token trong gói này.
