# Tài liệu tích hợp cần bổ sung gì sau POC?

Bài học đầu tiên là **tách integration POC khỏi business workflow**. Demo trước đã làm quá phạm vi; scope hiện tại bỏ approval/roles/provisioning worker. Một bộ spec công nghệ cần cho agent biết rõ phần nào chỉ là bằng chứng tích hợp, phần nào là nghiệp vụ phải làm ở task khác.

| Khoảng trống | Bổ sung vào tài liệu |
|---|---|
| Auth cũ cookie SSR nhưng TECH_STACK Bearer/FE SDK | Chốt một transport trước code. POC theo Bearer, SDK giữ/refresh; token response no-store. |
| Native signup cần email confirmation/SMTP nhưng POC cần dùng ngay | Ghi riêng demo auto-confirm qua admin SDK, chỉ BE/dev. Không tự coi đó là quy trình email production đã kiểm chứng. |
| PWA dùng localhost API trên điện thoại hoặc FE HTTPS/BE HTTP | Runbook một HTTPS origin qua local proxy; API_URL rỗng, origin CORS chính xác. |
| Chỉ thử showNotification local | Thêm ca server Web Push → browser/device khác, account khác, đóng app, click/cold start; native subscription phải persist server. |
| Chưa nói ai nhận khi có nhiều user/device | Receiver code chọn account; fanout tất cả active device của account đó, không broadcast người khác. |
| Provider accepted dễ bị báo là đã nhận | UI counters trung thực; manual OS notification evidence riêng. |
| QR Supabase có XML prolog/comment | Parser hỗ trợ định dạng thật; unit regression + real-provider E2E. |
| OpenAPI nullable ref có thể làm login.auth bị nullable ngoài ý muốn | Sinh types/build để kiểm contract; dùng union ref+null cho registration response. |
| Danh sách test lớn nhưng NOT_RUN không gắn mã | AC → executable test → report; ghi rõ fake ports, provider thật, thiết bị thật. |

Cần thêm vào chuẩn agent_spec: **scope POC**, cấu hình env tối thiểu, runnable code sample, lệnh chạy từ môi trường sạch, AC quan sát được, test case/runnable test map, phân biệt mock/real-provider/device evidence và giới hạn demo. Không cần kéo state machine nghiệp vụ, roles hay worker vào bài kiểm chứng công nghệ đơn giản.
