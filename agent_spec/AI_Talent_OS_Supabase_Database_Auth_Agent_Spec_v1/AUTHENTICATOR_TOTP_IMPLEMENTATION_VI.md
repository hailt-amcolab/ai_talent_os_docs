# Triển khai Authenticator TOTP cho Manager

Bản1.2 ngày17/11/2026. Đây là phương án mặc định theo đoạn trích yêu cầu người dùng cung cấp và DOCX v2 §6-2. SMS được giữ ở tài liệu riêng như lựa chọn cấu hình. Mã TOTP do Authenticator sinh, không được gửi qua email/SMS.

## TP01 Đăng ký lần đầu bằng QR

Sau email/password và kiểm Manager enabled, server xác định phiên đủ điều kiện enrollment từ invitation/provisioning của tài khoản, chưa cho đọc dữ liệu admin. Người dùng bấm thiết lập, BFF gọi auth.mfa.enroll({factorType:'totp',friendlyName}) bằng user client, không dùng admin client.

Trả factorId, QR và secret của factor pending cho đúng user/session. UI hiển thị QR bằng img/data URL từ SDK hoặc renderer an toàn; chỉ cung cấp secret thủ công khi user yêu cầu để nhập vào Authenticator. Không lưu QR/secret trong bảng app, log, analytics, idempotency cache lâu dài hoặc localStorage. Response no-store, secret biến mất khi đóng màn hình; không gửi ảnh QR cho hỗ trợ.

enroll chỉ tạo yếu tố chưa verified. User quét bằng ứng dụng Authenticator, nhập mã6 số; tạo challenge rồi verify. Chỉ sau verify thành công, session aal2 được xác minh và proof method=totp được ghi ở server mới vào admin. Đếm code bằng string, giữ số0 đầu.

Double-click/React render không gọi enroll lặp. Server đối soát factor pending; mất response QR phải cleanup unverified factor theo quyền và enroll lại, không tạo QR giả từ factorId. Hủy setup không gỡ verified factor cũ. Mở lại không tự lấy secret cũ từ DB. Pending enrollment có TTL app riêng, không coi TTL đó là tuổi thọ TOTP secret.

## TP02 Đăng nhập bằng mã Authenticator

GET /auth/mfa/options trả policy và metadata factor chính user. User chọn TOTP đã verified, server đối chiếu factorType và allowedMethods rồi gọi mfa.challenge({factorId}). Challenge TOTP không gửi SMS, không có resend SMS hoặc budget tin nhắn.

Map challengeRef với user/session/factor/method=totp/purpose/expiry. Verify chỉ nhận code6 số, server kiểm binding/rate/TTL và mfa.verify. Sau thành công propagate cookies, đọc aal2 và ghi last_mfa_method=totp/last_mfa_factor_id/mfa_verified_at gắn session và policyVersion. Manager guard chấp nhận proof này nếu totp còn được phép; không đòi thêm SMS.

Mã sai/hết hạn/replay do Supabase quyết định. Điện thoại lệch thời gian thì hướng dẫn đồng bộ thời gian tự động và thử mã mới, không tăng tolerance bằng verifier tự viết. Challenge hết hạn có thể tạo challenge mới theo thao tác user; không dùng nút “gửi lại SMS” trên TOTP. Timeout verify phải đối soát đúng operation/factor/session trước hoàn tất; nếu không chứng minh được thì giữ restricted và hướng dẫn xác minh lại. Không suy proof từ aal2 không rõ phương thức.

Đóng/mở app hoặc reload không gửi lại tin nhắn, không enroll lại tự động. Hai tab có challenge riêng gắn session và purpose; reject challengeRef user khác hoặc method bị sửa. Counter password/TOTP/SMS verify độc lập; rate policy phải server-side.

## TP03 Thay điện thoại hoặc factor Authenticator

Có factor cũ: recent password và một MFA đang verified, được policy cho phép. Enroll factor TOTP mới, quét QR và verify mới trước khi bỏ cũ nếu provider cho nhiều factor. Nếu provider giới hạn, dùng quy trình thay có kiểm soát/recovery; không xóa yếu tố cuối rồi tiếp tục cấp admin.

Chuyển active binding bằng version/concurrency, tăng security_version và revoke registry theo policy; xóa factor cũ bằng mfa.unenroll với quyền user aal2. Fail cleanup để pending có audit, không coi đã xóa. Không sao chép secret cũ từ DB hoặc email. Nếu còn SMS hợp lệ được policy cho phép, có thể dùng nó để xác minh thao tác thay TOTP theo policy recent-auth; không tự bật SMS nếu môi trường chưa được phép.

Đổi/xóa qua Auth trực tiếp cũng phải được phát hiện bằng chiến lược fresh factor/reconcile đã POC. Guard không tin proof của factor đã bị gỡ. Không cho xóa yếu tố verified cuối cùng trong tập được policy cho phép trừ recovery workflow đã duyệt.

## TP04 Mất Authenticator và khôi phục

Nếu còn phone_sms đã verified, nằm trong policy và dịch vụ đã cấu hình, user có thể chọn SMS để login hoặc step-up; đây là lựa chọn MFA được phép, không bỏ xác thực. Nếu không còn phương thức được phép nào, tạo recovery request và xác minh người thật theo runbook của công ty/owner dự án.

Email proof hoặc password một mình không được gỡ MFA tự động. Trước reset revoke registry/tăng security_version; Auth admin reset có audit và operation status, timeout vẫn giữ app restricted. Sau reset login password mới và enroll/verify một phương thức được policy cho phép, mặc định hướng dẫn TOTP. Manager cuối theo owner runbook, không tài khoản backdoor. Recovery codes experimental vẫn tắt tới khi có quyết định/POC riêng.

## TP05 Bảo mật và cấu hình

TOTP enrollment/verify dùng Supabase Auth, app không tự xây bảng shared secret/verifier. Bật TOTP ở Supabase đúng project; Manager required trong app guard, không suy từ toggle provider. Thiết lập SDK/browser/server cookie đúng mô hình SSR, secret không lọt response cache/ServiceWorker. Không cần cấp quyền camera trong PWA để scan QR: Authenticator bên ngoài là ứng dụng quét; nếu cần đặt mã trên cùng điện thoại cung cấp hướng dẫn/manual key an toàn, không hứa tự import mọi ứng dụng.

Kiểm bằng Authenticator thật: enrollment QR, mã0 đầu, lệch giờ, sai/hết hạn, verify timeout, reload/duplicate enroll, cleanup pending, đổi/mất factor, direct Auth change, TOTP được chấp nhận mà không SMS. Không đánh dấu pass chỉ từ mock.

## Nguồn

Đoạn trích người dùng trong MFA_POLICY_AND_REQUIREMENTS_VI.md; DOCX v2 §6-2; S01,S20,S21 và tài liệu TOTP chính thức trong SOURCE_MANIFEST.json. Chính sách proof/session/concurrency là thiết kế app, không cam kết SDK tự cung cấp toàn bộ.
