# Đồng bộ với các spec đã có

**Tình trạng ngày 17/11/2026 (sau kiểm chứng):** bộ PWA đã lên bản 1.1 theo v2 (có /apply, /auth/first-password với mật khẩu tạm 7 ngày, không còn /auth/activate và lời mời). Bộ OneDrive bản 1.1 tạo thư mục sau khi đăng ký thanh toán hoặc khi tạo tài khoản công ty, không dùng trigger trên auth.users. Vì vậy X01, X03, X04 **đã đồng bộ**. X02: giá trị theo v2 đã được Q&A No.25 xác nhận; cách khóa 5 lần sai phụ thuộc Q08 (hook chỉ có ở gói Team).

Ngày17/11/2026. Đây là hướng dẫn thay đổi cần review, không tự sửa ZIP cũ.

| ID | Bộ cũ | Nội dung cần đồng bộ |
|---|---|---|
| X01 | PWA v1 D01,F02,F03: invitation mặc định, chưa đọc v2 | Hiện v2 đã được đọc: application+Manager duyệt+password tạm+firstpassword; Q&A dòng12 vẫn nháp nên phạm vi cần xác nhận |
| X02 | PWA v1 Q11 auth values còn chưa rõ | V2 vẫn có 5/15phút,30ngày,admin30phút; Q&A dòng26 chưa trả lời; thêm enforcement Authhook+registry |
| X03 | PWA v1 API /auth/activate | Nếu giữ v2 dùng /auth/first-password; /activate chỉ adapter invitation nếu được chọn; đừng gọi inviteUserByEmail thay email password tạm mà không duyệt |
| X04 | OneDrive v1 thời điểm tạo folder chưa có v2 đọc lại | V2 §6-4: sau payment verified choTalent; office khi office create. Không auth.users trigger tạo folder |
| X05 | Upload-Post provider profile/Connect identity | Supabase Authuser khác SNSOAuth account. Supabase role/session không chứa provider tokens; profile binding server-owned và authflow callbacks riêng |
| X06 | App registry/Auth logout/push | Revoke registry và push binding cùng lifecycle; đừng coi signOut làm JWT cũ mất hiệu lực ngay |
| X07 | EmailOTP do yêu cầu mới — **đã bỏ, không làm (quyết định 17/11/2026)** | Bổ sung module existing-account OTP, production flag theo purpose; không tự thay Talent password hoặc Manager SMS MFA |
| X08 | Manager view audit | RLS SELECT trực tiếp Manager có thể bỏ qua audit. BFF Manager data endpoint cần verify aal2+idle+enabled và append view audit trước response |

Hai baseline onboarding phải chọn một qua nhật ký quyết định; không triển khai tự động cả invitation v1 và password tạmv2 cho cùng Talent. Tổ chức hiện tại một khách; multitenant là mô hình kỹ thuật bảo vệ dữ liệu, không tự thêm sản phẩm multiagency.

## Lịch sử CR-SMS-01 bản1.1 Đã bị CR-MFA-02 thay policy SMS-only

Người dùng yêu cầu chuyển Manager MFA sang OTP qua SMS. Nội dung v2 gốc vẫn là Authenticator; quyết định mới ghi đè phương thức trong spec triển khai này. Không sửa lịch sử nguồn. Tài khoản Talent và Email OTP riêng không tự đổi.

X09: thay enroll factorType=totp bằng phone, bỏ QR/secret khỏi DTO, thêm approved phone/E.164/cooldown/budget/sendRequestId; challenge là side effect gửi tin.
X10: Manager ready cần phone-specific session proof, không nhận aal2 do factor cũ như proof SMS. User TOTP cũ phải qua migration kiểm soát.
X11: thêm Advanced MFA Phone và SMS provider; phí add-on và phí tin riêng. Chưa bật trên môi trường thật. PWA/Manager đọc bản1.1 này khi ghép auth routes.

## CR-MFA-02 đã chốt ngày17/11/2026

Người dùng cung cấp đoạn yêu cầu Authenticator6 số/QR và SMS sẽ trao đổi, yêu cầu giữ cả hai. Phần SMS-only của CR-SMS-01 được thay, không còn hiệu lực như policy mặc định. Authenticator TOTP là chính; SMS là tùy chọn cấu hình có đầy đủ spec.

X12: guard chung chấp nhận một proof thuộc allowedMethods; không yêu cầu phone proof sau TOTP. X13: enrollment/challenge discriminated union method=totp|phone_sms; options API và UI chọn một. X14: không ép migration mọi TOTP user sang SMS; giữ cả SDK và case. SMS cost/provider còn điều kiện triển khai, không suy khách đã chốt SMS vì có code.
