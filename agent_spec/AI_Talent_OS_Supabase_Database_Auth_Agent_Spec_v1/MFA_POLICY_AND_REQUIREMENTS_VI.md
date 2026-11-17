# Chính sách MFA và diễn giải yêu cầu

Bản1.2 ngày17/11/2026 · CR-MFA-02 thay quyết định SMS-only của bản1.1.

## 1. Nội dung người dùng vừa cung cấp

“スマートフォンの認証アプリ（6桁）を使います。初回はQRコードで登録。SMS方式は要件定義でご相談。”

Dịch: **Sử dụng ứng dụng xác thực trên điện thoại thông minh với mã6 số. Lần đầu đăng ký bằng QR. Phương thức SMS sẽ trao đổi trong giai đoạn định nghĩa yêu cầu.**

Đây là đoạn trích do người dùng cung cấp trong hội thoại; chưa có tên trang/section gốc của đoạn này nên không gán số trang tưởng tượng. DOCX v2 §6-2 đã đọc cũng mô tả app xác thực6 số. Không diễn giải “sẽ trao đổi” thành khách đã phê duyệt SMS production.

Người dùng yêu cầu giữ cả hai hướng trong spec. Vì vậy **Authenticator TOTP là mặc định theo yêu cầu nguồn; SMS là lựa chọn triển khai có cấu hình**, chưa tự bật dịch vụ/cước. Hai phương thức đều được đặc tả và code contract, không phải xóa một phương thức để làm phương thức kia.

## 2. Quy tắc cho agent

**Quyết định 17/11/2026:** đợt đầu chỉ code Authenticator TOTP. Nhánh SMS giữ đặc tả để bàn với khách, chưa code tới khi khách quyết. Không làm OTP qua email.

| Mục | Quy tắc |
|---|---|
| MFA của Manager | Bắt buộc sau email/password |
| Phương thức mặc định | TOTP Authenticator6 số, enrollment bằng QR |
| SMS | Giữ implementation/SDK/cases; chỉ hiện khi policy và cấu hình provider cho phép |
| Có cần cả hai mỗi lần login? | Không. Một phương thức MFA đã đăng ký, verified và được policy cho phép là đủ |
| Nếu bật cả hai | User chọn Authenticator hoặc SMS trong màn MFA; TOTP được gợi ý trước |
| Email OTP | Không làm (quyết định 17/11/2026) |
| Talent | Không tự bắt MFA chỉ vì Manager có MFA |
| Recovery | Không bỏ qua MFA bằng email/password-only; có thể dùng yếu tố khác đã verified và được phép nếu còn, nếu không thì quy trình hỗ trợ |

## 3. Cấu hình server đề xuất

MANAGER_MFA_ALLOWED_METHODS=totp mặc định. Sau quyết định khách và cấu hình SMS: totp,phone_sms. MANAGER_MFA_PREFERRED_METHOD=totp. MFA_SMS_ENABLED=false mặc định production tới khi xác nhận provider/chi phí/chính sách. Các chuỗi env phải parse thành enum/set thật; không coi string false là true.

Policy hiệu lực là giao giữa: quyết định phương thức cho role/tổ chức/user và khả năng môi trường đã cấu hình. Việc provider đang lỗi không tự thay đổi tập phương thức hoặc mở password-only; chỉ cho user chuyển sang phương thức khác đã verified và được policy cho phép. Không tự enroll yếu tố mới khi người dùng chỉ có password để lách recovery.

allowedMethods không rỗng; preferredMethod phải thuộc allowedMethods. Browser chỉ render policy server trả, không tự bật SMS. Không chấp nhận method được client sửa mà server policy không cho phép. Nếu khách sau này muốn SMS-only phải có quyết định thay đổi riêng; bản1.2 không mặc định chế độ đó.

## 4. Namespace phương thức

| Ứng dụng/API/DB proof | SDK factorType | Giao nhận |
|---|---|---|
| totp | totp | Authenticator tự sinh, không SMS/email |
| phone_sms | phone | challenge gửi SMS qua provider |

Không dùng field channel=sms để mô tả TOTP. ChallengeRef lưu method do server đối chiếu factor thật; verify body chỉ chứa code, không client tự khai loại proof. JWT aal2 là điều kiện cần; app còn kiểm factor/role/session/policy. Registry dùng last_mfa_method,last_mfa_factor_id,mfa_verified_at,mfa_policy_version gắn session; không yêu cầu phone proof khi user vừa hoàn tất TOTP hợp lệ.

## 5. Hiển thị theo tình huống

- Chưa có factor hợp lệ: hướng dẫn thiết lập Authenticator bằng QR; có CTA SMS nếu policy cho enrollment SMS. Phiên này chưa có dữ liệu admin.
- Có TOTP: cho nhập mã; không buộc đăng ký số trước khi login.
- Có cả hai và policy cho cả hai: chọn một; không chạy hai challenge nối tiếp bắt buộc.
- Chỉ có SMS nhưng policy hiện chỉ TOTP: không cho qua bằng SMS; chuyển enrollment/recovery theo quyết định migration, không im lặng xóa factor.
- TOTP đang lỗi/sai code: có thể user chọn SMS đã verified và được phép; không tự gửi SMS nếu chưa bấm yêu cầu.
- SMS lỗi: có thể chọn TOTP đã verified và được phép; không fallback email hoặc password-only.
- Policy đổi giữa challenge và verify: kiểm lại tại verify và trước domain access. Proof từ phương thức vừa bị cấm không hoàn tất admin login; UI refetch options.

## 6. Khác biệt với bản1.1

Bản1.1 từng ghi bắt buộc phone proof và coi TOTP là yếu tố cũ. Điều này được thay hoàn toàn cho policy hiện tại: TOTP là phương án chính, phone proof chỉ áp dụng cho nhánh phone_sms. Những SDK/schema/test SMS vẫn được giữ với điều kiện nhánh rõ ràng; không xóa hàng loạt TOTP factor. Không tự sửa các file nguồn khách hoặc các ZIP PWA/OneDrive khác.

## 7. Khởi động khi chưa cấu hình SMS

Nếu SMS chưa enabled, cấu hình/provider SMS không được làm TOTP ngừng hoạt động. Nếu SMS enabled nhưng thiếu credential hoặc khách chưa duyệt, không quảng bá phone_sms trong effective options; phát hiện lỗi cấu hình trước release và không tự hạ xuống password-only. Config validator kiểm allowedMethods không rỗng và preferredMethod thuộc tập đó; SMS outage tạm thời phải hiển thị trạng thái lỗi, không âm thầm đổi chính sách.
