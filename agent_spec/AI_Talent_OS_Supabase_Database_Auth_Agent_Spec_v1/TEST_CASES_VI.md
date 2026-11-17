# Ca kiểm thử Database Auth với TOTP và SMS bản1.2

Tất cả NOT_RUN. TPxx là Authenticator mặc định; MFxx/SMSSEC là SMS khi policy cho phép; MP01 là lựa chọn/phân quyền hai phương thức.

## DB01-T01 Kết nối TLS đúng

- Căn cứ: TK; S04,S10.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khởi tạo dự án và cấu hình kết nối. → Kết nối TLS đúng → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Query kiểm tra version thành công và không lộ credential
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## DB01-T02 Sai database credential

- Căn cứ: TK; S04,S10.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khởi tạo dự án và cấu hình kết nối. → Sai database credential → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Readiness fail, log redacted
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## DB01-T03 Pool100 request

- Căn cứ: TK; S04,S10.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khởi tạo dự án và cấu hình kết nối. → Pool100 request → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Connections trong budget đo được, không storm
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## DB01-T04 Claims rò qua pool

- Căn cứ: TK; S04,S10.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khởi tạo dự án và cấu hình kết nối. → Claims rò qua pool → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: User A/B xen kẽ không thấy dữ liệu nhau
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## DB02-T01 Hai update cùng version

- Căn cứ: TK; S05.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đọc ghi và tính nhất quán nghiệp vụ. → Hai update cùng version → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Một commit, một409
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## DB02-T02 Timeout sau commit

- Căn cứ: TK; S05.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đọc ghi và tính nhất quán nghiệp vụ. → Timeout sau commit → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Retry key cũ nhận cùng result
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## DB02-T03 Key cũ body khác

- Căn cứ: TK; S05.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đọc ghi và tính nhất quán nghiệp vụ. → Key cũ body khác → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: 409, không side effect mới
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## DB02-T04 SQL injection ở filter

- Căn cứ: TK; S05.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đọc ghi và tính nhất quán nghiệp vụ. → SQL injection ở filter → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không thay cấu trúc query
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU01-T01 Public gắn role=manager

- Căn cứ: YC v2 UC-01,§6-1 1-4; Q&A No.11 và CR-01 đã chốt: làm ở SP1.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Nộp đơn Talent chưa được phép đăng nhập. → Public gắn role=manager → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: 422 extra fields, không self-promotion
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU01-T02 Trùng email hai request

- Căn cứ: YC v2 UC-01,§6-1 1-4; Q&A No.11 và CR-01 đã chốt: làm ở SP1.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Nộp đơn Talent chưa được phép đăng nhập. → Trùng email hai request → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Một application, public response generic
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU01-T03 Rejected login

- Căn cứ: YC v2 UC-01,§6-1 1-4; Q&A No.11 và CR-01 đã chốt: làm ở SP1.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Nộp đơn Talent chưa được phép đăng nhập. → Rejected login → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không domain quyền
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU01-T04 DOB ngày tương lai

- Căn cứ: YC v2 UC-01,§6-1 1-4; Q&A No.11 và CR-01 đã chốt: làm ở SP1.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Nộp đơn Talent chưa được phép đăng nhập. → DOB ngày tương lai → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: 422 và không lưu application
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU02-T01 Hai Manager duyệt

- Căn cứ: YC v2 UC-01,§6-1; TK saga.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Manager duyệt/từ chối đơn. → Hai Manager duyệt → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Một provisioning command
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU02-T02 Auth tạo xong DB lỗi

- Căn cứ: YC v2 UC-01,§6-1; TK saga.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Manager duyệt/từ chối đơn. → Auth tạo xong DB lỗi → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không domain quyền, saga phục hồi
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU02-T03 Email đã là user lạ

- Căn cứ: YC v2 UC-01,§6-1; TK saga.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Manager duyệt/từ chối đơn. → Email đã là user lạ → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không tự link, manual review
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU02-T04 Reject sau approved

- Căn cứ: YC v2 UC-01,§6-1; TK saga.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Manager duyệt/từ chối đơn. → Reject sau approved → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: 409, không gửi reject mail
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU03-T01 Password tạm hợp lệ

- Căn cứ: YC v2 §6-1; TK secret delivery.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Gửi mật khẩu tạm theo v2 và bắt buộc đổi. → Password tạm hợp lệ → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Chỉ vào màn đổi, không coach/admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU03-T02 Temp expired

- Căn cứ: YC v2 §6-1; TK secret delivery.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Gửi mật khẩu tạm theo v2 và bắt buộc đổi. → Temp expired → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không domain quyền, xin cấp lại
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU03-T03 Mail resend

- Căn cứ: YC v2 §6-1; TK secret delivery.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Gửi mật khẩu tạm theo v2 và bắt buộc đổi. → Mail resend → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Mật khẩu cũ mất hiệu lực theo rotation policy
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU03-T04 Auth đổi xong app commit lỗi

- Căn cứ: YC v2 §6-1; TK secret delivery.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Gửi mật khẩu tạm theo v2 và bắt buộc đổi. → Auth đổi xong app commit lỗi → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Operation còn cần reconcile, không mở quyền nhầm
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU04-T01 Talent hợp lệ

- Căn cứ: YC v2 §6-1 1-4/1-5.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đăng nhập Talent bằng mật khẩu. → Talent hợp lệ → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Chỉ own bootstrap, không admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU04-T02 before_use chưa payment

- Căn cứ: YC v2 §6-1 1-4/1-5.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đăng nhập Talent bằng mật khẩu. → before_use chưa payment → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Có onboarding, coach bị policy chặn
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU04-T03 Auth đúng nhưng ended

- Căn cứ: YC v2 §6-1 1-4/1-5.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đăng nhập Talent bằng mật khẩu. → Auth đúng nhưng ended → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không domain quyền
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU04-T04 Không membership

- Căn cứ: YC v2 §6-1 1-4/1-5.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đăng nhập Talent bằng mật khẩu. → Không membership → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không tự bootstrap thành Talent
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU05-T01 Sai5 lần qua BE

- Căn cứ: YC v2 §6-1; TK S07,S08.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khóa sau5 lần sai và rate limit. → Sai5 lần qua POST /auth/login rồi thử lần 6 với mật khẩu đúng → Gọi API/BFF; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Lần 6 bị từ chối, không gọi Supabase Auth; hết 15 phút thì đăng nhập được. Gọi thẳng Auth không bị đếm là rủi ro đã chấp nhận (AU05), không phải lỗi
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU05-T02 Password đúng lúc bị khóa

- Căn cứ: YC v2 §6-1; TK S07,S08.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khóa sau5 lần sai và rate limit. → Password đúng lúc bị khóa → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Vẫn theo lock policy server
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU05-T03 Bộ đếm khóa không ghi được

- Căn cứ: YC v2 §6-1; TK S07,S08.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khóa sau5 lần sai và rate limit. → DB lưu bộ đếm khóa không ghi được → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Fail closed có alert, không mở quyền
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU05-T04 OTP sai

- Căn cứ: YC v2 §6-1; TK S07,S08.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Khóa sau5 lần sai và rate limit. → OTP sai → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không tăng password counter nhầm
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU06-T01 Manager aal1 gọi listTalent

- Căn cứ: v2 §6-2; CR-MFA-02.
- Tiền điều kiện: Manager enabled; allowedMethods theo fixture totp hoặc totp,phone_sms; session chưa có MFA proof.
- Thực hiện: Thiết lập Manager bước đầu và giới hạn phiên chưa MFA. → Manager aal1 gọi listTalent → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: 403 MFA_REQUIRED, không metadata
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU06-T02 Manager chưa factor

- Căn cứ: v2 §6-2; CR-MFA-02.
- Tiền điều kiện: Manager enabled; allowedMethods theo fixture totp hoặc totp,phone_sms; session chưa có MFA proof.
- Thực hiện: Thiết lập Manager bước đầu và giới hạn phiên chưa MFA. → Manager chưa factor → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Chỉ enrollment endpoints
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU06-T03 Talent gọi admin bootstrap

- Căn cứ: v2 §6-2; CR-MFA-02.
- Tiền điều kiện: Manager enabled; allowedMethods theo fixture totp hoặc totp,phone_sms; session chưa có MFA proof.
- Thực hiện: Thiết lập Manager bước đầu và giới hạn phiên chưa MFA. → Talent gọi admin bootstrap → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: 403 không role escalation
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU06-T04 Manager disabled JWT cũ

- Căn cứ: v2 §6-2; CR-MFA-02.
- Tiền điều kiện: Manager enabled; allowedMethods theo fixture totp hoặc totp,phone_sms; session chưa có MFA proof.
- Thực hiện: Thiết lập Manager bước đầu và giới hạn phiên chưa MFA. → Manager disabled JWT cũ → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Chặn trước data read
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU07-T01 Reset email unknown

- Căn cứ: YC v2 §6-1; S03.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Quên và đặt lại mật khẩu. → Reset email unknown → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Response generic
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU07-T02 Recovery token hết hạn

- Căn cứ: YC v2 §6-1; S03.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Quên và đặt lại mật khẩu. → Recovery token hết hạn → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không update password
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU07-T03 Manager recovery xong

- Căn cứ: YC v2 §6-1; S03.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Quên và đặt lại mật khẩu. → Manager recovery xong → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Vẫn phải qua một MFA được policy cho phép (TOTP mặc định)
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU07-T04 Scanner prefetch link

- Căn cứ: YC v2 §6-1; S03.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Quên và đặt lại mật khẩu. → Scanner prefetch link → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không tự password change hoặc cấp admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU08-T01 Email pending

- Căn cứ: TK; CĐ quy trình email change.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đổi email tài khoản. → Email pending → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Identity vẫn userId cũ, không đổi owner
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU08-T02 Email collision

- Căn cứ: TK; CĐ quy trình email change.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đổi email tài khoản. → Email collision → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không gộp2Talent
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU08-T03 Chưa confirm new email

- Căn cứ: TK; CĐ quy trình email change.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đổi email tài khoản. → Chưa confirm new email → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không hiển thị đã đổi xong
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU08-T04 DisabledfeatureAPI

- Căn cứ: TK; CĐ quy trình email change.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Đổi email tài khoản. → DisabledfeatureAPI → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: 403 dù UI bị sửa
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU09-T01 Disable Manager JWT cũ

- Căn cứ: YC v2 UC-13,§6-2 7-3; S06.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Thu hồi, vô hiệu hóa và bật lại. → Disable Manager JWT cũ → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Request kế tiếp bị chặn
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU09-T02 EndTalent

- Căn cứ: YC v2 UC-13,§6-2 7-3; S06.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Thu hồi, vô hiệu hóa và bật lại. → EndTalent → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: App chặn ngay,job hủy ngoại vi được theo dõi
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU09-T03 Bật lại

- Căn cứ: YC v2 UC-13,§6-2 7-3; S06.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Thu hồi, vô hiệu hóa và bật lại. → Bật lại → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Session cũ vẫn bị revoke
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU09-T04 Disable while worker queued

- Căn cứ: YC v2 UC-13,§6-2 7-3; S06.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Thu hồi, vô hiệu hóa và bật lại. → Disable while worker queued → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Worker recheck state, không gửi nhắc/đăng mới
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU10-T01 Public first visitor

- Căn cứ: YC v2 §6-2/UC-12; TK bootstrap.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Tạo Manager đầu tiên và account văn phòng. → Public first visitor → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không bootstrap Manager
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU10-T02 Manager new chưa MFA

- Căn cứ: YC v2 §6-2/UC-12; TK bootstrap.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Tạo Manager đầu tiên và account văn phòng. → Manager new chưa MFA → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Chỉ enrollment
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU10-T03 OfficePWA

- Căn cứ: YC v2 §6-2/UC-12; TK bootstrap.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Tạo Manager đầu tiên và account văn phòng. → OfficePWA → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không billing, không admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## AU10-T04 Switch account

- Căn cứ: YC v2 §6-2/UC-12; TK bootstrap.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Tạo Manager đầu tiên và account văn phòng. → Switch account → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không lộ cache/account trước
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## OP01-T01 Migration đang có traffic

- Căn cứ: TK; S04,S11.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Migration, backup và khôi phục. → Migration đang có traffic → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không phá client cũ,lock trong budget
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## OP01-T02 Restore staging

- Căn cứ: TK; S04,S11.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Migration, backup và khôi phục. → Restore staging → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Auth/RLS/identity/bindings được kiểm chứng
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## OP01-T03 Outbox sau rollback

- Căn cứ: TK; S04,S11.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Migration, backup và khôi phục. → Outbox sau rollback → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Không blind republish
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## OP01-T04 Prod command nhầm dev

- Căn cứ: TK; S04,S11.
- Tiền điều kiện: Staging hoặc mock theo case; TalentA/B,ManagerA/B,office,disabled,orphan fixtures; cấu hình policy đúng phạm vi. Không dùng dữ liệu khách chưa được phép.
- Thực hiện: Thiết lập Migration, backup và khôi phục. → Prod command nhầm dev → Gọi API/BFF và đường trực tiếp Auth/Data API khi phù hợp; kiểm UI,DB,provider calls và log redacted.
- Mong đợi: Environment guard chặn
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId và assertion/log redacted; DB invariants hoặc provider event evidence thật cho integration.

## SEC01 Manager view audit

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: GET dữ liệu riêng tư admin khi audit write thất bại → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Fail closed, không gửi response data chưa audit
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC02 RLS anonymous

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: anon key không JWT đọc preferences/private schema → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không rows/permission denied; không metadata private
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC03 RLS TalentA/B

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: TalentA SELECT/filter talentB và RPC thay owner → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không dữ liệuB, không mutation
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC04 RLS Manager aal1

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: JWTaal1 Manager gọi directDataAPI/endpoint admin → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không admin data, không bootstrap count
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC05 Metadata escalation

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: updateUser data.role=manager rồi refreshJWT → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không membershipManager hoặc quyền mới
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC06 Tenant mismatch

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: ManagerorgA gọi resource orgB → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: 404/403 không data/side effect
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC07 Column privileges

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: authenticated INSERT/UPDATE enabled/role/registry → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Permission denied; registry server-owned
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC08 RLS helper definer

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Tạo object shadow search_path hoặc gọi helper argument lạ → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không nâng quyền; fully qualified/search path rỗng
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC09 Service-role audit

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Gọi BFF privileged path với user khác owner/aal1 → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Authorize trước service query; không dựa RLS service
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC10 Expired session registry

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: JWT valid nhưng registry expired/revoked → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: App từ chối ngay, direct owner read cũng bị RLS chặn
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC11 Admin idle polling

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Chạy background polling hơn30phút không thao tác → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không kéo dài idle, yêu cầu password và MFA được policy cho phép
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC12 Talent30ngày

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Refresh mỗi giờ quá auth_time+30ngày → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không reset mốc, registry hết hạn
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC13 Cookie cache

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Hai user SSR cùng URL qua CDN/SW → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không cache giữa người dùng, private/no-store và Set-Cookie đúng
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC14 Server user singleton

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Hai request song song cookieA/B → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Client request scoped không token bleed
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC15 Refresh race

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Mở 2tab cùng refresh và SSR request → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không over write cookie mới bằng cũ; session errors xử lý đúng
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC16 Direct MFA reset

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Unenroll factor trực tiếp bằng Auth SDK rồi dùng JWT cũ gọi adminwrite → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Factor vừa được xác minh/registry security policy chặn
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC19 OTP brute force

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Thử 6số nhiều IP/cùng attempt → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Giới hạn số lần thử phân tán hoạt động, không clientonly
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC20 CSRF

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: CrossoriginPOST dùng cookie session → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Bị chặn trước side effect
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC21 Open redirect

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Auth callback next=https://attacker.invalid hoặc //attacker.invalid → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Chặn allowlist, không chuyển hướng ra ngoài
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC22 Purpose confusion

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Dùng login OTP attempt choreset/invite/email change → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Bị chặn đúng purpose, không mutation
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC23 DB transaction unknown

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Ngắt kết nối sauCOMMIT trước response → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Tra/retry command key cũ, không double outbox
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC24 Deadlock retry

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Hai transaction khóa ngược gây40P01 → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Retry có giới hạn cùng key, lời gọi bên ngoài không nằm transaction
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC25 TLS bad cert

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: SaiCA/host khiDBconnect → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không disable TLS verify để chạy tiếp
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC26 Worker stale actor

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Job queued từ Talent vừa ended → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Recheck policy, không provider action mới
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC27 Signup disabled

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Gọi AuthsignUp trực tiếp publicURL → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không domain binding/quyền dù Auth trả user
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC28 Recovery codes thử nghiệm

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: SDK/project chưa bật experimental mà UIrecoverycode visible → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Tính năng tắt; khônghứa hỗ trợ chưa kiểm chứng
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC29 Migration grants regression

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Thêm bảng/view/function mà chưa RLS/revoke → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: CI/dbtest phát hiện, chặn phát hành
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC30 Secret scan

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: Build bundle/source map và gửi telemetry lỗi xác thực → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không key/token/password/code/connection string
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC31 Provider email delivery

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: SMTPaccepted nhưng email bị trả lại/delay → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: Không đánh dấu email đã xác minh; quan sát delivery riêng
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## SEC32 Approval email falseproof

- Căn cứ: TK security invariant.
- Tiền điều kiện: Fixtures và môi trường disposable/staging; có thể điều khiển lỗi và adapter.
- Thực hiện: CreateUser email_confirm:true không user proof → Kiểm kết quả DB/HTTP/Auth provider và log redacted.
- Mong đợi: CĐ được chốt hoặc thêm email proof trước full quyền
- Trạng thái: NOT_RUN.
- Bằng chứng: Assertion kết quả thật hoặc test tự động; Version SDK/config và requestId.

## MF01-T01 Đăng ký số E.164 đã được phê duyệt

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: enroll phone dưới đúng session Manager → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Factor unverified, không gửi SMS ở enroll và chưa có admin quyền
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF01-T02 Số sai định dạng

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Nhập thiếu country code hoặc số không hợp lệ theo thư viện → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: 422 PHONE_INVALID, không gọi provider
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF01-T03 Số khác approved phone

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Password đúng nhưng enroll số attacker → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: 403 PHONE_NOT_APPROVED, không factor mới
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF01-T04 Double-click enroll

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Hai request enroll đồng thời → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không tạo nhiều pending factor không kiểm soát
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF01-T05 Hủy setup chưa verified

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Rời màn hình và hủy pending factor → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không cấp quyền; chỉ cleanup factor của chính mình
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF01-T06 Country bị chặn

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Số thuộc quốc gia ngoài allowlist → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không gửi SMS, hiển thị lý do cấu hình an toàn
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF01-T07 Factor quota hoặc duplicate

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Provider từ chối thêm factor số đã tồn tại/quota → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không xóa factor cũ để lách; có hướng dẫn retry/recovery
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T01 Gửi và xác minh SMS đúng

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Passwordlogin -> challenge -> nhập mã hợp lệ → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Cookie/session aal2 và server-owned phone proof đúng session trước admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T02 Số0 đầu

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Nhập code012345 trong fixture → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Giữ string6 ký tự, không chuyển số nguyên
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T03 Mã sai

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Nhập mã sai nhiều lần → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không proof, limiter verify server hoạt động
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T04 Mã/challenge hết hạn

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Verify challengeRef hết expires_at → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: 410, không admin; cho gửi mới sau cooldown
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T05 Challenge của user khác

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: B dùng challengeRef của A → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: 403/404, không lộ số/factor/code
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T06 Gửi hai tab cùng lúc

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Hai sendRequestId cạnh tranh cùng factor → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Khóa gửi/cooldown, không phát hai tin không kiểm soát
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T07 Cùng key khác payload

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Reuse sendRequestId với factor/purpose khác → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: 409, không gọi challenge mới
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T08 Timeout gửi sau provider accepted

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Mất response challengeId → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: dispatch_unknown, không tự gửi lại; GET status không side effect
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T09 SMS provider429/outage

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Provider trả429/503 → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Giữ restricted; Retry-After/cooldown; không fallback email/password-only
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T10 Budget hết

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Budget provider/app đã đạt ngưỡng → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Chặn gửi; không gọi provider và không bỏ MFA
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T11 SMS đến trễ sau resend

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Mã cũ đến sau mã mới → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: App chặn reference superseded; không hứa provider vô hiệu mọi mã cũ trước expiry
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T12 Verify timeout sau success

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Auth verify thành công nhưng response/DB proof lỗi → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Đối soát phone proof; nếu không chứng minh được thì restricted và verify lại có kiểm soát
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T13 Callback/reload

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Reload màn SMS pending → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Đọc attempt cũ, không gửi SMS tự động
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF02-T14 SMS accepted không delivered

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Provider accepted nhưng tin không đến → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không mark verified, cho hướng dẫn đợi/gửi lại theo cooldown
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF03-T01 Đổi số có số cũ

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Recent password+SMS cũ, duyệt số mới, verify mới → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Chuyển active binding sau verify mới; revoke registry cũ
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF03-T02 Số mới chưa verify

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Enrollment số mới rồi dừng → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Số cũ còn bảo vệ; không chuyển active binding
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF03-T03 Không hỗ trợ nhiều factor

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Provider chặn enroll số mới khi số cũ tồn tại → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Chuyển workflow được duyệt, không xóa cũ rồi mở admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF03-T04 Cleanup số cũ lỗi

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Đã switch active nhưng unenroll timeout → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Binding cũ không tự active lại; cleanup pending có audit
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF03-T05 Hai thay đổi số cạnh tranh

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Hai tab cùng expectedVersion → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Một chuyển đổi commit, một409
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF03-T06 Số liên hệ khác MFA

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Gọi auth.updateUser(phone) ngoài workflow → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không đổi approved MFA binding hoặc phone proof
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF04-T01 Mất số chỉ có email

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Thử đặt lại bằng link quên mật khẩu qua email → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không tự gỡ MFA hoặc cấp admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF04-T02 Recovery được phê duyệt

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Owner xác minh người thật và số mới → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Revoke trước reset; password+verify SMS mới trước admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF04-T03 Recovery provider timeout

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Reset factor chưa rõ kết quả → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: App giữ khóa, theo operation; không tự cho qua
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF04-T04 Manager cuối mất số

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Không còn Manager có quyền trong app → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Theo project owner runbook, không backdoor
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF04-T05 Số được cấp lại hoặc SIM swap

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Nghi số điện thoại đổi chủ → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Đóng băng binding và quy trình kiểm tra danh tính
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF04-T06 TOTP được policy cho phép

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Đăng nhập password rồi verify TOTP của chính user khi totp nằm trong policy.
- Mong đợi: Admin được cấp sau proof TOTP hợp lệ, không bắt SMS hoặc migration.
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## MF04-T07 Thêm SMS khi đang có TOTP

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Recent TOTP hợp lệ, user tự chọn thêm approved phone khi phone_sms được phép.
- Mong đợi: Verify SMS mới tạo factor bổ sung; TOTP không tự bị xóa và không bắt dùng cả hai mỗi login.
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T01 Không log OTP/số nguyên

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Theo dõi log/errortracking auth/SMS → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không OTP, số nguyên, provider secret hoặc bearer
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T02 SMS pumping qua Auth trực tiếp

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Bypass BFF gọi Auth URL để gửi nhiều tin → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Provider/Supabase rate-country-budget kiểm được hoặc chặn release
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T03 Kênh gửi cố định SMS

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Client cố thêm channel=whatsapp/email → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Schema từ chối; không chuyển kênh
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T04 Proof tự khai

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Client gửi method=phone hoặc verified_at → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Không ghi registry, server-only proof
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T05 Hook signature/replay nếu dùng

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Giả request hoặc lặp delivery webhook → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Từ chối giả mạo, không gửi duplicate do retry hook
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T06 Không tạo mã riêng

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Adapter phát mã tự sinh thay code Auth → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Kiểm thử phát hiện sai thiết kế; chỉ chuyển mã Auth tạo
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T07 Chi phí add-on

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: Kiểm config môi trường và runbook → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Ghi phí add-on riêng với phí tin, không auto-enable môi trường thật
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## SMSSEC-T08 Web không đọc SMS

- Căn cứ: CR-MFA-02 nhánh phone_sms; S19–S23.
- Tiền điều kiện: Policy cho phép phone_sms, provider mock/staging sẵn sàng; ManagerA/B và approved phone. Không dùng số thật ngoài phạm vi test được phép.
- Thực hiện: User không có autofill trên browser → Kiểm HTTP/session/cookie, registry proof, DB audit và số lần gọi provider.
- Mong đợi: Nhập tay hoạt động, không xin quyền danh bạ/đọcSMS
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId, adapter/provider log đã che số và mã; Assertion quyền/session/proof và trạng thái UI; integration cần evidence thật.

## TP01-T01 Quét QR lần đầu

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Enrollment TOTP qua password/session đủ điều kiện → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Có QR/secret một lần, factor chưa verified; chưa admin
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP01-T02 Verify enrollment đúng

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Quét QR bằng Authenticator thật, nhập code hợp lệ → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Verified factor + aal2/proof totp, không yêu cầu SMS
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP01-T03 Double-click/render lặp

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Gọi enroll đồng thời hoặc StrictMode → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Không nhân pending factor không kiểm soát
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP01-T04 Đóng setup trước verify

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Cancel rồi mở lại → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Không cấp quyền; cleanup pending của đúng user, không lấy secret cũ từ DB
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP01-T05 QR response bị mất

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Timeout enroll sau provider tạo factor → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Reconcile/cleanup pending rồi setup lại, không QR giả
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP01-T06 Không có camera trong PWA

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Người dùng cài Authenticator trên cùng điện thoại → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Có hướng dẫn/manual key an toàn, không xin quyền camera PWA vô cớ
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T01 Đăng nhập TOTP đúng

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Password rồi challenge/verify TOTP → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Admin sau proof totp thuộc policy, không SMS
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T02 Code có0 đầu

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Fixture012345 → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Giữ string6 ký tự
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T03 Sai mã

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Nhập sai nhiều lần → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Không aal2/proof mới, server limiter TOTP hoạt động
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T04 Điện thoại lệch giờ

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Authenticator sai do clock → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Hướng dẫn sync, không thay tolerance hoặc bỏ MFA
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T05 Challenge hết hạn

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Verify sau expiresAt → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Không cấp quyền; tạo challenge mới theo user, không SMS resend
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T06 Replay/user khác

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Dùng challengeRef A cho B hoặc mã đã dùng → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Server kiểm binding, provider quyết replay; không quyền B
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T07 Timeout verify

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Provider success nhưng cookie/proof chưa hoàn tất → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Reconcile đúng method/session, không tự cấp proof từ aal2 bất kỳ
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP02-T08 Reload TOTP screen

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Tải lại khi pending → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Không enroll lặp, không phát SMS
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP03-T01 Thay Authenticator

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Recent MFA, enroll/verify TOTP mới → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Đổi sau verify, không bỏ yếu tố cuối trước
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP03-T02 Gỡ yếu tố cuối allowed

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Còn SMS nhưng policy chỉ totp → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Không cho xóa để tiếp tục admin; theo recovery/migration policy
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP03-T03 Cleanup factor cũ lỗi

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Unenroll timeout sau switch → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Pending cleanup có audit, proof không quay lại factor cũ
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP03-T04 Factor thay qua Auth trực tiếp

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Gỡ factor bên ngoài BFF rồi dùng proof cũ → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Fresh factor/securitypolicy chặn hoặc release chưa đạt POC
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP04-T01 Mất TOTP còn SMS hợp lệ

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Policy cho cả hai, user chọn SMS đã verified → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Login/step-up qua SMS được phép, không cần support reset trước
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP04-T02 Mất mọi yếu tố

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Không còn factor allowed dùng được → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Recovery có xác minh người thật, không email/password-only reset
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP04-T03 Manager cuối mất TOTP

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Không còn Manager app dùng được → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Owner runbook có audit, không backdoor
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## TP04-T04 Sau reset

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Revoke registry rồi reset Auth → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Password + enroll/verify một yếu tố allowed trước admin, mặc định TOTP
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T01 Default đúng nguồn

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Cấu hình mặc định mới → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: TOTP QR/6 số hiện trước, SMS chưa tự bật
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T02 Hai phương thức cùng verified

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Policy totp,phone_sms → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Chọn một đủ, không bắt liên tiếp cả hai
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T03 TOTP proof không phone proof

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Verify TOTP trong policy cho cả hai → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Admin không bị chặn thiếu phone proof
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T04 SMS bị cấm ở server

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Client tự thêm method=phone_sms → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: 403 trước external send, không chỉ ẩn UI
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T05 Factor/method mismatch

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Client gọi method totp với phone factorId → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: 422, không tạo proof sai phương thức
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T06 Policy đổi giữa verify

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Sau challenge TOTP, policy mới không còn cho phương thức đó → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Không hoàn tất admin bằng proof bị cấm; refetch options
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T07 SMS outage còn TOTP

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: User chọn TOTP verified và được phép → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: TOTP vẫn dùng, không tự gửi SMS hoặc password-only
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T08 TOTP sai còn SMS

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: User bấm chọn SMS verified/allowed → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Chỉ gửi sau user action/cooldown, không tự gửi mỗi lần TOTP sai
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T09 TOTP branch có sendRequestId

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Gửi payload SMS vào TOTP branch → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Schema từ chối extra field
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T10 Resend SMS cho TOTP

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Gọi resend trên challenge totp → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: 422 RESEND_NOT_APPLICABLE, không SMS
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T11 Policy response invalid

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Preferred method không thuộc allowed hoặc allowed rỗng → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: Server config validation fail, không silently allow
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.

## MP01-T12 Không secret leak

- Căn cứ: CR-MFA-02; S01,S20,S21,S24; project design.
- Tiền điều kiện: Manager enabled, fixtures Authenticator/SMS theo case; các integration chỉ dùng tài khoản test được phép.
- Thực hiện: Quan sát QR/log/cache/network tracing → Kiểm UI/API/cookie/AAL, registry proof, factor và số lần gọi provider.
- Mong đợi: QR/secret/OTP không log hoặc persistent app storage
- Trạng thái: NOT_RUN.
- Bằng chứng: RequestId/assertion đã redacted; Auth integration evidence thật khi kiểm factor/QR/session.
