<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Quyền, phân công và khôi phục Manager

Mọi Manager có thể duyệt và cập nhật mọi Talent. Mỗi Talent có một Manager phụ trách, gán thủ công tại M-11 ❺, không gán theo category. Trước khi vô hiệu hoá Manager phải chuyển Talent sang người khác; chặn tự vô hiệu hoá và vô hiệu hoá Manager cuối. Quên mật khẩu đặt lại qua email; mất thiết bị xác thực thì Manager khác đặt lại 2FA. Lần đăng nhập đầu M-01: sau kiểm mật khẩu hiện QR và ô mã 6 số. M-02/M-04 mặc định chỉ hiện Talent phụ trách, có lọc xem tất cả.

**Phần còn mở/giới hạn:** Yêu cầu duyệt gửi Manager phụ trách; dự phòng khi nghỉ/bỏ sót và nơi nhận các thông báo khác vẫn chờ Adesso tại No.87/88, KS20261122 No.35. Quyền thao tác mọi Talent không đồng nghĩa gửi thông báo cho mọi Manager. FCP còn phải bổ sung màn QR.

Căn cứ: QA `Q&A!A7:J7 (No.6); Q&A!A67:J67 (No.67); Q&A!A87:J87 (No.87); Q&A!A88:J88 (No.88); Q&A!A89:J89 (No.89)`; `EV-1333` / `DEC-0017`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 1-6 Đăng nhập và quyền của quản lý

## Đối chiếu nguồn hiện hành — 20/11/2026

Manager dùng ứng dụng mã 6 số như Google Authenticator; đăng ký QR lần đầu. Thêm tên/email; vô hiệu hóa chặn đăng nhập và ngừng nhận thông báo.

Khôi phục mất phương tiện 2FA và bảo vệ Manager cuối vẫn là No.67; không tự duyệt quy trình khôi phục.

Căn cứ: `M19:5,24` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0590;EV-0609`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-2, chức năng 1-6; §3-2, §3-3; §10-1; UC-13, UC-13 前提 |
| Màn hình [AG] | M-01, M-18 |
| Tên trong mã nguồn | Manager Auth & Management |
| Mức sẵn sàng | 🟡 Vàng – luồng chính đủ. Cách mời quản lý mới và cách xử lý khi mất điện thoại xác thực là đề xuất của đội, cần khách đồng ý |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ thiếu luồng mời | ⚠ đội đề xuất | ⚠ giả định, làm tham số | ⚠ đội đề xuất | ✅ | ✅ Supabase MFA | ⚠ đội đề xuất | ✅ |

## Mục đích

Chỉ quản lý vào được màn hình quản trị, bằng đăng nhập hai bước. Quản lý tự thêm và vô hiệu hóa quản lý khác. Chỉ có một loại quyền (§6-2 chức năng 1-6).

## Tác nhân và quyền

- Quản lý: đăng nhập; thêm, sửa, vô hiệu hóa quản lý khác ở M-18. Mọi quản lý có cùng quyền.
- Tài năng: không đăng nhập được màn hình quản trị (§3-2).

## Điều kiện trước, kết quả sau

- **Trước:** quản lý đang ở trạng thái "dùng được", đã đăng ký ứng dụng xác thực.
- **Sau:** có phiên đăng nhập quản trị đã qua bước 2. Bị vô hiệu hóa thì không đăng nhập được và không nhận thông báo (UC-13 前提).

## Luồng chính

**A. Đăng nhập (M-01)**
1. Bước 1: nhập email, mật khẩu, bấm 次へ (tiếp).
2. Bước 2: nhập mã 6 số từ ứng dụng xác thực, bấm ログイン (đăng nhập), vào M-02.
3. Lần đầu: quét mã QR để đăng ký ứng dụng xác thực rồi nhập mã ([AG] M-01).
4. 30 phút không thao tác thì phải đăng nhập lại.

**B. Thêm quản lý (M-19 bản19/11, trang24)**
5. Bấm 追加する (thêm), nhập tên và email.
6. [Đề xuất nội bộ] Hệ thống gửi thư mời có đường dẫn đặt mật khẩu. Lần đăng nhập đầu, người mới đăng ký ứng dụng xác thực (bước 3).

**C. Vô hiệu hóa (M-19 bản19/11, trang24)**
7. Bấm 使えなくする (vô hiệu hóa), xác nhận. Người đó bị đăng xuất khỏi mọi phiên ngay, không nhận thông báo nữa. Dữ liệu tài năng và bài đăng không đổi ([AG] M-18).
8. Bấm 変更 (sửa) để đổi tên, email, hoặc cho dùng lại quản lý đã vô hiệu hóa.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Sai mật khẩu 5 lần liên tiếp | Khóa 15 phút, giống tài năng | §6-2 chức năng 1-6 |
| Sai mã 6 số | Báo sai, cho nhập lại. Tính chung vào số lần sai | [Đề xuất nội bộ] |
| Tài năng đăng nhập ở màn hình quản trị | Từ chối như sai thông tin, không cho biết tài khoản là của tài năng | §3-2; [Đề xuất nội bộ] |
| Mất điện thoại xác thực | Một quản lý khác xóa đăng ký xác thực của người đó ở M-18. Lần đăng nhập sau người đó đăng ký lại | [Đề xuất nội bộ], ⚠ cần khách đồng ý |
| Quản lý tự vô hiệu hóa chính mình, hoặc vô hiệu hóa quản lý cuối cùng còn dùng được | Không cho | [Đề xuất nội bộ] |
| Email trùng quản lý đã có | Báo lỗi | [Đề xuất nội bộ] |
| Hết 30 phút không thao tác giữa lúc đang nhập | Đăng nhập lại; nội dung chưa lưu bị mất | §6-2 chức năng 1-6 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Đăng nhập hai bước | TOTP (mã dùng một lần theo thời gian) 6 số, không dùng tin nhắn SMS ở đợt đầu; SMS chờ bàn với khách (S01-11) | Chốt (SMS: [SM] trang 28) | §6-2, §10-1 |
| Quy tắc mật khẩu và khóa khi sai | Giống tài năng (1-4) | Tham số | §6-2 |
| Hết phiên khi không thao tác | 30 phút | Tham số | §6-2 |
| Số loại quyền | 1 | Chốt | §6-2 |
| Quản lý đầu tiên | Đội phát triển tạo khi triển khai | [Đề xuất nội bộ] | — |

## Dữ liệu [Đề xuất nội bộ]

`managers`: `id`, `auth_user_id`, `name`, `email`, `active`, `created_by`, `created_at`, `disabled_by`, `disabled_at`. Việc thêm, sửa, vô hiệu hóa đều ghi nhật ký thao tác (C-03, §9-4). Vai trò quản lý lưu trong thông tin của người dùng ở Supabase Auth, để RLS và tầng trung gian (middleware) kiểm tra.

## Màn hình

- M-01: bước 1 (email, mật khẩu, quên mật khẩu), bước 2 (mã 6 số, câu "lần đầu quét mã QR").
- M-18: danh sách tên, email, trạng thái; nút thêm, sửa, vô hiệu hóa; câu giải thích hậu quả khi vô hiệu hóa.

## Tích hợp

- **Supabase Auth MFA TOTP:** mọi đường dẫn quản trị đòi mức xác thực AAL2 (đã qua bước 2).
- **Hết phiên 30 phút:** Supabase không có cài đặt này riêng cho từng vai trò, nên tầng trung gian của Next.js kiểm tra thời điểm thao tác cuối trên tên miền quản trị (file 18 mục 7).
- **Vô hiệu hóa:** gọi lệnh đăng xuất mọi phiên của người dùng đó bằng khóa quản trị.
- **Thư mời:** qua lớp gửi thư dùng chung (C1).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho quản lý nhập đúng mật khẩu nhưng chưa nhập mã 6 số, thì không mở được trang quản trị nào.
2. Cho quản lý đăng nhập lần đầu, thì phải quét mã QR và nhập mã đúng mới vào được M-02.
3. Cho quản lý không thao tác 30 phút, khi bấm bất kỳ đâu, thì phải đăng nhập lại.
4. Cho tài khoản tài năng, khi đăng nhập ở màn hình quản trị, thì bị từ chối.
5. Cho quản lý B bị vô hiệu hóa khi đang đăng nhập, thì lần thao tác tiếp theo của B bị từ chối và B không còn nhận thông báo.
6. Cho chỉ còn một quản lý dùng được, khi người đó vô hiệu hóa chính mình, thì không cho.
7. Cho quản lý được thêm mới, thì nhận thư mời và đặt được mật khẩu.

## Ngoài phạm vi của chức năng này

- Đăng nhập của tài năng (1-4). Ghi lượt xem thông tin tài năng (7-6).

## Phụ thuộc

- Lớp gửi thư dùng chung (C1, dùng chung với 1-4). C-03 (nhật ký thao tác).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| File 04 | Thêm quản lý cần những trường nào, mời bằng cách nào | Không | Tên và email, thư mời đặt mật khẩu |
| File 04 | Mất điện thoại xác thực thì làm sao | Không | Quản lý khác xóa đăng ký xác thực |
| File 04 | Ai tạo quản lý đầu tiên | Không | Đội phát triển tạo khi triển khai |
| 確認41 | Mọi quản lý thấy mọi tài năng | Không | Đúng như [YK2] |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-2, §3-3, §6-2 (1-6), §10-1, UC-13, UC-13 前提, 確認41. [SM] trang 28 (TOTP qua Supabase Auth MFA, không dùng SMS).
- [AG] trang 6 (M-01), trang 10 (M-18).
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 2. [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 7.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.5, CR-13 (đã chốt): một loại quản lý.
- Q&A No.67 (đang hỏi): mất thiết bị xác thực 2 bước thì quản lý khác đặt lại; không cho tự vô hiệu hóa mình và vô hiệu hóa quản lý cuối cùng.

</details>
