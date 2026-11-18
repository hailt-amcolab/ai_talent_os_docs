# ChatGPT → MCP của AI育成OS

Bản 1.0 · 19/11/2026 · **Đặc tả triển khai, chưa phải tính năng đã chạy.**

Mục đích: để ChatGPT gọi công cụ nghiệp vụ do BE cung cấp; không phải cài Supabase MCP quản trị database vào ChatGPT.

Đọc theo thứ tự:

1. [Hướng dẫn tích hợp](HUONG_DAN_TICH_HOP_VI.md): nguồn, phạm vi, kiến trúc, OAuth, quyền, hợp đồng công cụ, ghi OneDrive, vận hành và điều kiện mở tính năng.
2. [Ca kiểm thử và AC](CA_KIEM_THU_VI.md): đầu vào, kết quả, bằng chứng cần thu; tất cả đang **NOT RUN**.
3. [Mẫu service](examples/commit-profile.ts): cổng nghiệp vụ và thứ tự kiểm tra khi nhận yêu cầu ghi. Không phải SDK adapter hoặc mã production hoàn chỉnh.
4. [Cấu hình mẫu](examples/mcp.env.example): tên biến **đề xuất mới**, chưa được env parser của ứng dụng hỗ trợ.

Đọc trước [kiến trúc chung](../TECH_STACK_VA_CAU_TRUC_DU_AN.md), [Auth](../supabase-db-auth-spec/HUONG_DAN_TICH_HOP_VI.md), [OneDrive](../onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md), [danh mục nguồn](../../TAI_LIEU_NGUON.md). Không triển khai các mục đang chờ khách bằng cách tự chọn một câu trả lời.
