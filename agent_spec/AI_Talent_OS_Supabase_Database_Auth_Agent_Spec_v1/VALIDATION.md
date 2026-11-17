# Kiểm tra artifact bản1.2 ngày17/11/2026

- Parse tất cả JSON thành công; 29 schema nội bộ; MfaEnroll/MfaChallenge có oneOf theo method.
- 14 ví dụ pass kiểm required/extra fields/oneOf/const/enum/regex/UUID theo subset validator tự viết.4 payload negative bị từ chối: phone trên TOTP, thiếu phone trên SMS, sendRequestId trên TOTP, thiếu sendRequestId trên SMS. Đây không thay JSON Schema meta-validator đầy đủ.
- 158 case ID duy nhất, mapping hợp lệ, tất cả NOT_RUN; bổ sung TOTP và lựa chọn hai phương thức, giữ SMS cases có scope.
- SDK reference có cả factorType=totp và phone. Env mặc định totp, SMS chưa enabled. Markdown fence cân bằng; ZIP integrity kiểm bằng zipfile.testzip.
- Bản1.1 SMS-only được supersede rõ bởi CR-MFA-02; không sửa lịch sử tài liệu nguồn.

Chưa chạy SQL/Postgres/RLS/migration, TypeScript typecheck/build, UI/browser/Auth/TOTP/QR/SMS integration, full JSON Schema meta-validation, Mermaidrenderer hoặc tải thực tế. Chưa bật add-on/gửi SMS. SQL core vẫn là tham khảo, các bảng/proof/method policy cần migration mới khi code.
