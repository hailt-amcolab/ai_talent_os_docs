# Bộ tài liệu triển khai Upload-Post — AI Talent OS

Ngày: 17/11/2026. Bản 1.1 (bổ sung giới hạn của Upload-Post, nhãn AI từng mạng, gói tối thiểu, thống kê TikTok, Best Time to Post; xem `../KET_QUA_KIEM_CHUNG_17-11.md`). Kết nối dùng Connect API: quyết định của đội, khác trang 48 giờ trong [YK2] §6-10 chức năng 8-2, chờ khách đồng ý (Q02). TikTok, Instagram, YouTube.

## Tệp cần đọc

1. **UPLOAD_POST_IMPLEMENTATION_SPEC_VI.md**: đặc tả chính; phạm vi, kiến trúc, phân quyền, dữ liệu, state machine, API, xử lý lỗi và runbook.
2. **API_CONTRACTS.schema.json**: 14 schema đầu vào/đầu ra nội bộ để agent dùng làm cơ sở validation. Không phải schema chính thức của provider, chưa phải code production.
3. **TEST_CASES.csv**: 117 tình huống có tiền điều kiện, thao tác, kết quả và kiểm chứng provider. CSV UTF-8 có BOM, mở được bằng Excel. Tất cả hiện là Chưa chạy.
4. **SOURCE_MANIFEST.json**: định danh tài liệu nguồn cục bộ bằng SHA-256; link nguồn web trong spec.

## Cách giao cho agent

Đọc mục 0–5 trước. Chọn một bước trong mục 16, nêu case ID sẽ đáp ứng, triển khai fake adapter và test trước tích hợp thật. Ghi lại Q&A/POC ảnh hưởng phần việc. Không triển khai hosted page, không tự đăng lại bài lỗi và không thay đích bài khi reconnect ra tài khoản mới.

Schema JSON dùng `$defs`; validate theo đúng schema endpoint, ví dụ `#/$defs/ScheduleRequest`, không validate chỉ ở root. Cấu trúc response ứng dụng bọc `data` và `meta` theo mục 7. Validator còn phải kiểm tra quyền, giờ tương lai, timezone IANA, trạng thái duyệt và ownership trong use case; JSON Schema không thay thế các kiểm tra đó.

Sơ đồ Mermaid nằm trực tiếp trong Markdown; mở bằng trình đọc hỗ trợ Mermaid. Các ví dụ API provider là hợp đồng đã đối chiếu tài liệu, nhưng adapter phải được thử với tài khoản test và fixture thực tế trước production.

## Trạng thái và giới hạn

- Đây là thiết kế để agent bắt đầu scaffolding, migration và mock tests, không phải tuyên bố mọi quyết định nghiệp vụ đã được khách duyệt.
- Spec chứa 16 Q&A và 10 POC. Các mục chặn production nêu rõ ở phần 18.
- Đã đọc lại requirement v2 và các dòng Q&A liên quan; chưa chạy API thật, chưa đọc trực tiếp hợp đồng/SOW/báo giá.
- Không có API key, token, dữ liệu tài khoản khách, bản sao đầy đủ tài liệu nhà cung cấp hoặc tài liệu gốc trong ZIP.
- Bộ này là tài liệu, không chứa một implementation đã chạy. Danh sách test chưa được thực thi trên sản phẩm.
