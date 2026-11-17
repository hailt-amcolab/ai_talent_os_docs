# Thiết lập môi trường và vận hành

## Trước khi code adapter

Chọn project dev/staging/production riêng, region/plan, access owner và backup. Không dùng dữ liệu production để debug khi chưa được phép. Ghi CLI/SDK/driver versions thật trong lockfile; không giả số version trong spec. Ưu tiên Supabase CLI và Postgres migration SQL làm nguồn schema; nếu chọn ORM migration phải một owner, không hai công cụ tự áp DDL song song.

## Cấu hình Auth

1. Email/password enabled theo baseline. Public signup disable nếu approval saga dùng admin tạo identity; SiteURL/callback allowlist chính xác cho từng môi trường; không wildcard production redirect.
2. Password length/character policy theo nguồn. Khóa 5 lần sai/15 phút làm ở BE (AU05, quyết định 17/11/2026) vì hook chỉ có ở gói Team; đặt rate limit đăng nhập của Supabase chặt và cảnh báo trên log Auth.
3. TOTP bật cho phương án mặc định; SMS giữ như tùy chọn khi allowedMethods và provider/add-on đã được duyệt/cấu hình. Manager cần một MFA được phép, không cả hai. Không ép phone proof sau TOTP.
4. Không làm OTP qua email (quyết định 17/11/2026).
5. Custom SMTP, From domain và xác minh DNS. Test gửi đến mailbox kiểm thử ngoài Supabase team; accepted/delivered/bounce khác nhau. Không giữ quota số lượng mặc định làm cam kết, đọc Dashboard hiện tại và đo burst100Talent.
6. Cấu hình session timebox với paidplan khi áp dụng. Registry app vẫn enforce ended/disable/idle ngay, vì Auth refresh/JWT có độ trễ. Không đặt JWT30ngày để thực hiện session30ngày.
7. Callback: thống nhất PKCE/recovery tokenhash; xác minh cookie/Set-Cookie khi redirect, multi-tab và scanner prefetch. Không cache SSR/auth response.

## Secrets

Public: NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Server: SUPABASE_SECRET_KEY hoặc legacy service_role theo project, DATABASE_URL,MIGRATION_DATABASE_URL,EMAIL_HASH_PEPPER,transactionalSMTPcredentials/secret store ref. RuntimeSQLrole không migration role. Không ship .env có giá trị thật; .env.example trong gói chỉ là placeholder.

## Kiểm tra cơ sở dữ liệu

Trên DB disposable Supabase: review SQLscaffold, chạy schema, xác minh role grants/privateSchema/RLS bằng actual authenticated JWT và SET ROLE fixtures an toàn. Nếu dùng SQLclaimsfixtures chỉ là DBunit, không thay end-to-end Auth test. Manager audit đọc qua BFF cần repository giao dịch riêng; chưa có trong scaffold.

Kiểm index plan trên list theo tổ chức/owner, tra cứu phiên và audit date. Bounded statement timeout/lock timeout; retry serialization/deadlock cùng command key. Ngoại vi Auth/SMTP không ở DB transaction.

## Sự cố

- Authdown: không nhận password, dùng cacheJWT chỉ trong phạm vi policy đã xác minh; action nhạy cảm cần kiểm lại factor thì fail closed; không cấp role tạm.
- DBdown: authenticated nhưng không resolve quyền ->503, không mặc định allow. Login Auth thành công mà registry không ghi được không có domain permission.
- SMTPdown: attempts/pending delivery có trạng thái; không resend vô hạn hoặc đánh dấu email đã xác minh.
- Password hook khóa nhầm: runbook owner project khôi phục config sauaudit, không mở backdoor công khai; kiểm thử staging trước đổi hook.
- Key/JWKSrotation: dùng SDK verify/cachedJWKS chuẩn, refresh lookup khi key mới, không tin unverified decode khi fetch thất bại. Xoay secret key tách publishable xoay signing key, kiểm project dashboard.
- Restore:maintenance+dừng worker; xác minh Auth/membership/registry/RLS; reconcile outbox/provider trước resume; không đăng/charge lại tất cả job cũ.

Không tự deploy/config Supabase hoặc gửi email thật từ bộ tài liệu này. Đây là runbook để agent triển khai trong môi trường được cung cấp sau.

## Runbook riêng cho SMS

Đọc SMS_MFA_IMPLEMENTATION_VI.md trước cấu hình thật. Cần provider, quốc gia nhận SMS, sender/đăng ký vùng, credential, approved phone ban đầu và runbook mất số. Advanced MFA Phone có phí theo giờ bật, ngoài phí từng tin; Spend Cap không bao phủ add-on. Không bật dev/staging/production tự động chỉ vì chạy migration SQL.

POC: password+SMS -> aal2+proof; direct Auth abuse không bypass provider limits; delayed/duplicate SMS; dispatch_unknown; resend hai tab; số cũ còn mã tới expiry; chuyển số có/không multiple factors; số cấp lại; TOTP hợp lệ được policy cho phép vào admin mà không cần SMS; SMS outage không fallback yếu hơn. Chỉ số test được cho phép, không gửi tới số mẫu trong CONTRACT_EXAMPLES.

## Bản1.2 Đưa vào sử dụng

Mặc định MANAGER_MFA_ALLOWED_METHODS=totp,preferred=totp,MFA_SMS_ENABLED=false. Code cả hai adapter nhưng không tự bật add-on SMS. Khi khách chọn SMS và provider/cost sẵn sàng, cho allowedMethods=totp,phone_sms; UI có lựa chọn. Nếu chỉ TOTP được phép thì API SMS cũng phải từ chối, không chỉ ẩn nút.

POC bắt buộc: QR enrollment, verify TOTP0 đầu, lệch giờ, không phát SMS ở TOTP; chọn một trong hai khi cùng verified; method/factor mismatch; policy đổi giữa challenge/verify; yếu tố khác vẫn dùng được khi một provider lỗi; không email/password-only fallback; chuyển qua lại không tạo job gửi SMS ngầm.
