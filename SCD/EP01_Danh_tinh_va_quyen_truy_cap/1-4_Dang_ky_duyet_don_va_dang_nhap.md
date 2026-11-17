# 1-4 Đăng ký, duyệt đơn và đăng nhập

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-1, chức năng 1-4; UC-01, UC-01 前提 (tiền đề), UC-03, UC-13 前提 |
| Màn hình [AG] | T-01, T-02, T-03, M-02, M-03. Thiếu màn đặt lại mật khẩu |
| Tên trong mã nguồn | Talent Sign-up & Login |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Dịch vụ gửi thư (C1) chưa chọn nên viết qua một lớp gửi thư dùng chung, chạy thử bằng hộp thư giả |

## Đánh giá

| R1 Mục đích | R2 Luồng chính | R3 Luồng lỗi | R4 Giá trị | R5 Dữ liệu | R6 Màn hình | R7 Tích hợp | R8 Tiêu chí | R9 Phụ thuộc |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ giả định, làm tham số | ⚠ đội đề xuất | ⚠ thiếu màn đặt lại mật khẩu | ❌ C1 | ⚠ đội đề xuất | ⚠ 7-4, C-01 dùng tạm |

## Mục đích

Người muốn dùng gửi đơn ngay trong ứng dụng. Chỉ người được quản lý duyệt mới đăng nhập được. Tài năng đăng nhập bằng email và mật khẩu, tự đặt và tự đặt lại mật khẩu.

## Tác nhân và quyền

| Tác nhân | Được làm | Không được làm |
|---|---|---|
| Người đăng ký (chưa có tài khoản) | Gửi đơn ở T-01 | Mọi thao tác khác |
| Quản lý (mọi quản lý, §3-3) | Duyệt hoặc từ chối đơn ở M-03. Khi duyệt thì chọn có dùng duyệt bài không | — |
| Tài năng | Đăng nhập, đặt mật khẩu lần đầu, tự đặt lại mật khẩu | Vào màn hình quản trị (§3-2) |

Tài khoản công ty không đi qua luồng này. Quản lý tạo trực tiếp ở M-12 (chức năng 1-2).

## Điều kiện trước, kết quả sau

- **Trước:** người đăng ký có email nhận được thư.
- **Sau khi duyệt:** có tài khoản đăng nhập dùng mật khẩu tạm, có bản ghi tài năng ở trạng thái 利用前 (chưa dùng), tài năng hiện ở M-06 ([AG] M-03).
- **Sau khi từ chối:** người đăng ký nhận thư báo không được duyệt và không đăng nhập được.

## Luồng chính

**A. Gửi đơn (T-01)**
1. Người đăng ký nhập tên (nghệ danh hoặc tên thật), email, ngày sinh; đọc điều khoản và tích đồng ý (UC-01 前提, 確認1).
2. Bấm 申し込む (gửi đơn). Hệ thống lưu đơn ở trạng thái chờ duyệt, hiện câu "quản lý sẽ xem đơn, được duyệt thì thư có mật khẩu tạm sẽ được gửi".
3. Hệ thống tạo thông báo loại 利用の申し込み (có người xin dùng) cho mọi quản lý (7-4, 別紙A tức phụ lục A).

**B. Duyệt đơn (M-03)**
4. Quản lý mở thông báo và vào M-03. Màn hình hiện tên, email, ngày sinh, tuổi kèm nhãn 未成年 (vị thành niên, chỉ để tham khảo, 確認2), giờ gửi, đã đồng ý điều khoản.
5. Quản lý bật hoặc tắt 投稿の承認を使う (dùng duyệt bài). Đổi được sau ở M-10.
6. Bấm 承認する (duyệt): tạo tài khoản đăng nhập kèm mật khẩu tạm, tạo bản ghi tài năng (利用前, loại "tài năng trả phí"), gửi thư có mật khẩu tạm, quay về M-02.
7. Hoặc bấm 拒否する (từ chối): gửi thư mẫu báo không được duyệt, **không ghi lý do** (UC-01 前提), quay về M-02.

**C. Đăng nhập lần đầu (T-02 → T-03)**
8. Tài năng nhập email và mật khẩu tạm ở T-02, được chuyển bắt buộc sang T-03.
9. Ở T-03, tài năng nhập mật khẩu mới hai lần và tích xác nhận "quản lý đọc được hội thoại với AIコーチ" (確認13). Bấm 設定して進む (đặt và tiếp tục) để sang T-04 (chức năng 6-2).

**D. Đăng nhập thường (T-02)**
10. Nhập email và mật khẩu, vào T-07 ホーム (trang chủ). [AG] đang mở T-06, nhưng đội đề xuất T-07 cho khớp [YK2] 6-8 (B13). Đặt màn mở đầu thành tham số để đổi dễ.
11. Đăng nhập được giữ 30 ngày trên cùng thiết bị. Đổi máy thì đăng nhập lại và dùng tiếp như cũ (UC-13 前提).

**E. Quên mật khẩu**
12. Ở T-02 bấm パスワードを忘れたとき (quên mật khẩu), nhập email, nhận thư có đường dẫn, rồi đặt mật khẩu mới.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Chưa tích đồng ý điều khoản | Nút gửi đơn bị khóa | [AG] T-01 |
| Ngày sinh không hợp lệ hoặc ở tương lai | Báo lỗi ngay tại ô nhập | [Đề xuất nội bộ] |
| Email đã dùng (đơn chờ duyệt, đơn bị từ chối, hoặc đã có tài khoản) | Không tạo đơn. Hiện "email này không gửi đơn được, vui lòng liên hệ công ty" | §6-4 chức năng 2-2 (同じメールアドレスでは、申し込めません), S01-06 |
| Hai quản lý cùng xử lý một đơn | Người bấm trước quyết. Người sau thấy "đơn đã được xử lý bởi …" | [Đề xuất nội bộ], cùng nguyên tắc với 確認34 |
| Gửi thư lỗi | Thử lại qua hàng đợi, tối đa 3 lần, rồi ghi nhật ký xử lý (C-03) và cảnh báo đội vận hành | [Đề xuất nội bộ], §9-3 |
| Sai mật khẩu 5 lần liên tiếp | Khóa đăng nhập tài khoản đó 15 phút, hiện câu báo như T-02 | §6-1 |
| Mật khẩu tạm hết hạn (7 ngày, S01-05) | Không đăng nhập được bằng mật khẩu tạm. Tài năng dùng "quên mật khẩu" | [Đề xuất nội bộ] |
| Tài năng ở trạng thái 利用終了 (đã ngừng) | Từ chối đăng nhập | §6-2 chức năng 7-3, 確認54 |
| Một địa chỉ gửi quá nhiều đơn | Giới hạn số đơn theo địa chỉ IP và theo email trong một khoảng thời gian | [Đề xuất nội bộ], chặn đăng ký rác (file 04) |

## Quy tắc và giá trị

Mọi giá trị số ở chương 6 của [YK2] là giả định của FutureCore, sẽ chốt khi khách xem màn hình thật (file 04, điểm chưa rõ chung số 9). Vì vậy tất cả để ở **tham số cài đặt**, không viết cứng trong mã.

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Mã đăng nhập | Email | Chốt | UC-01 前提 |
| Độ dài, thành phần mật khẩu | Ít nhất 8 ký tự, có cả chữ và số | Tham số | §6-1 |
| Khóa khi sai | 5 lần liên tiếp, khóa 15 phút | Tham số | §6-1 |
| Nơi đếm và khóa | Ở BE, mọi đăng nhập đi qua `POST /api/v1/auth/login`; gọi thẳng Supabase Auth không bị đếm (rủi ro đã chấp nhận, vì hook kiểm tra mật khẩu cần gói Team) | Quyết định nội bộ 17/11/2026 | Bộ Supabase AU05 |
| Thời gian giữ đăng nhập | 30 ngày trên cùng thiết bị | Tham số | §6-1 |
| Hạn mật khẩu tạm | 7 ngày | Tham số [Đề xuất nội bộ] | — |
| Thư từ chối | Mẫu cố định, không có lý do | Chốt | UC-01 前提 |
| Tuổi vị thành niên | Dưới 18, tính từ ngày sinh, chỉ để tham khảo | Giả định | 確認2. Ngưỡng 18 theo luật dân sự Nhật là [Đề xuất nội bộ] |
| Loại tài khoản khi duyệt | Tài năng trả phí | Chốt | §6-3 chức năng 1-2 |

## Dữ liệu [Đề xuất nội bộ]

- `signup_applications`: `id`, `display_name`, `email`, `birth_date`, `tos_version`, `tos_agreed_at`, `status` (`pending` → `approved` hoặc `rejected`, chỉ đổi một lần), `approval_required` (chọn khi duyệt), `decided_by`, `decided_at`, `created_at`.
- `talents`: `id`, `auth_user_id`, `application_id`, `display_name`, `email`, `birth_date`, `account_type` (`talent` hoặc `office`), `status` (theo C-01), `approval_required`, `must_change_password`, `created_at`.
- Đếm số lần sai và thời điểm hết khóa: `failed_login_count`, `locked_until`. Supabase Auth không có sẵn kiểu khóa theo tài khoản này (file 18 mục 7).
- Mật khẩu chỉ nằm trong Supabase Auth, bảng của mình không lưu.

## Màn hình

| Màn [AG] | Phần tử chính |
|---|---|
| T-01 | Tên, email, ngày sinh, ô tích đồng ý kèm đường dẫn điều khoản, nút gửi, đường dẫn "đã có thư duyệt thì đăng nhập" |
| T-02 | Email, mật khẩu, nút đăng nhập, "quên mật khẩu", câu báo khóa 15 phút, đường dẫn "lần đầu thì xin dùng" |
| T-03 | Mật khẩu mới hai lần, quy tắc mật khẩu, ô xác nhận "quản lý đọc được hội thoại" (確認13) |
| M-03 | Thông tin đơn, nhãn vị thành niên, nút bật duyệt bài, nút duyệt và từ chối |
| Đặt lại mật khẩu | **Chưa có trong [AG]** (file 14 §3.2 điểm 11). Tạm dùng màn đơn giản cùng kiểu với T-02 |

Thư và thông báo phát ra: thư mật khẩu tạm, thư từ chối, thư đặt lại mật khẩu, thông báo quản lý loại 利用の申し込み.

## Tích hợp

- **Supabase Auth:** tạo người dùng kèm mật khẩu tạm bằng khóa quản trị, chỉ chạy phía máy chủ. Đặt lại mật khẩu dùng luồng có sẵn của Supabase.
- **Dịch vụ gửi thư (C1, chưa chọn):** cấu hình làm SMTP riêng cho Supabase Auth và dùng để gửi thư mẫu. Trong mã chỉ gọi một lớp gửi thư dùng chung. Khi chạy trên máy dùng hộp thư giả của Supabase CLI.
- **Chống gửi trùng:** việc gửi thư đặt khóa theo `application_id` và loại thư. Thử lại không gửi thư hai lần.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho người chưa tích đồng ý điều khoản, khi bấm gửi đơn, thì không gửi được.
2. Cho đơn hợp lệ, khi gửi, thì đơn ở trạng thái chờ duyệt và mọi quản lý thấy thông báo 利用の申し込み ở M-02.
3. Cho đơn chờ duyệt, khi quản lý duyệt và bật duyệt bài, thì người đăng ký nhận thư có mật khẩu tạm, tài năng hiện ở M-06 với trạng thái 利用前, và cài đặt duyệt bài đang bật.
4. Cho đơn chờ duyệt, khi quản lý từ chối, thì người đăng ký nhận thư mẫu không có lý do và không đăng nhập được.
5. Cho hai quản lý cùng mở một đơn, khi cả hai bấm, thì chỉ lần bấm đầu có hiệu lực.
6. Cho tài năng đăng nhập bằng mật khẩu tạm, thì không vào được màn nào khác trước khi xong T-03.
7. Cho mật khẩu mới chỉ 7 ký tự, hoặc không có chữ số, thì bị từ chối kèm câu giải thích.
8. Cho 5 lần sai liên tiếp, thì lần thứ 6 bị từ chối kể cả khi đúng mật khẩu, cho tới khi hết 15 phút.
9. Cho tài năng đã đăng nhập, khi mở lại ứng dụng trên cùng thiết bị trong vòng 30 ngày, thì không phải đăng nhập lại.
10. Cho tài năng ở trạng thái 利用終了, khi đăng nhập, thì bị từ chối.
11. Cho tài năng quên mật khẩu, khi làm theo thư đặt lại, thì đăng nhập được bằng mật khẩu mới và mật khẩu cũ không dùng được nữa.
12. Cho email đã từng gửi đơn (kể cả đơn bị từ chối), khi gửi đơn mới bằng email đó, thì không tạo đơn.

## Ngoài phạm vi của chức năng này

- Tạo thư mục OneDrive: chức năng 2-2, chạy sau khi tài năng đăng ký thanh toán.
- Đăng ký thanh toán: chức năng 1-1. Hướng dẫn lần đầu: chức năng 6-2.
- Tài khoản công ty: chức năng 1-2. Đăng nhập của quản lý: chức năng 1-6.
- Đổi email của tài năng: không làm chức năng. 7-1 chỉ hiển thị, nên màn sửa là ngoài phạm vi. Đội hỗ trợ sửa theo yêu cầu bằng văn bản (S01-06).

## Phụ thuộc

- C-01 (trạng thái tài năng): tạm dùng ba giá trị 利用前, 利用中, 利用終了.
- 7-4 (danh sách thông báo quản lý): tạm ghi vào bảng thông báo, chưa cần màn M-02 hoàn chỉnh.
- Dịch vụ gửi thư (C1): dùng hộp thư giả tới khi khách chọn.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng khi viết mã |
|---|---|---|---|
| 確認1 | Đọc và tích đồng ý điều khoản khi gửi đơn; người ngoài công ty đi cùng luồng | Không | Ô tích kèm đường dẫn điều khoản. Lưu phiên bản điều khoản và thời điểm đồng ý |
| 確認2 | Xác định vị thành niên từ ngày sinh, chỉ để tham khảo | Không | Dưới 18 thì hiện nhãn 未成年 |
| 確認13 | Báo "quản lý đọc được hội thoại" và cho tài năng xác nhận | Không | Đặt ở T-03 như [AG] |
| C1 | Dùng dịch vụ gửi thư nào | Không chặn viết mã. Chặn chạy thật | Lớp gửi thư dùng chung |
| File 14 §3.2 điểm 11 | [AG] thiếu màn đặt lại mật khẩu | Không | Màn đơn giản cùng kiểu với T-02 |
| B11, S01-06 | Đơn bị từ chối và đổi thông tin cơ bản | Không | Không cho gửi lại bằng email đã dùng; không làm chức năng sửa email |
| B13 | Màn mở đầu sau đăng nhập | Không | T-07, đặt thành tham số |
| File 04 | Có cho đăng nhập một tài khoản trên nhiều thiết bị cùng lúc không | Không | Cho phép |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-1 (1-4), §6-4 (2-2: không gửi đơn bằng email đã dùng), §3-2, §3-3, UC-01, UC-01 前提, UC-03, UC-13 前提, 確認1, 2, 13.
- [AG] trang 2 (T-01 đến T-04), trang 6 (M-01 đến M-04).
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 1. [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 4 và 7. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP01.

## Cập nhật theo Q&A (bản ngày 15/11/2026)

- Q&A No.11, CR-01 (đã chốt): tự đăng ký, quản lý duyệt.
- Q&A No.65 (đang hỏi): mật khẩu tạm hạn 7 ngày, quản lý bấm gửi lại; email bị từ chối vẫn bị chặn, quản lý xóa đơn để người đó đăng ký lại.
