# 1-1 Thu phí thuê bao tháng

## Đối chiếu nguồn hiện hành — 20/11/2026

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

Căn cứ: `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP08 – Thu phí |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-3, chức năng 1-1; §5-4 (hình 5-3); UC-11, UC-11 前提 (tiền đề); §8 |
| Màn hình [AG] | T-04 (bước 3), T-15 (ご利用とお支払い); M-02 (支払いの失敗), M-10 |
| Tên trong mã nguồn | Monthly Subscription Billing |
| Mức sẵn sàng | 🔴 Đỏ – chưa biết GMO có thu được số tiền thay đổi mỗi tháng không (chờ 確認49), chưa có mức phí, ngày chốt, ngày thu (S08-01, S08-02) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ S08-02 | ⚠ S08-03 | ❌ S08-01, S08-02 | ⚠ đội đề xuất | ✅ | ❌ GMO chưa kiểm chứng | ⚠ đội đề xuất | ⚠ 5-4 |

## Mục đích

Thu phí tháng của tài năng qua GMO Payment Gateway (thanh toán qua nhà mạng hoặc thẻ). Hóa đơn tháng = phí tháng + số lần tạo video × đơn giá (hình 5-3). Thu lỗi thì báo tài năng và quản lý, không tự dừng sử dụng. Tài năng đổi được cách thanh toán; xem lịch sử ở trang của GMO (§6-3 chức năng 1-1).

## Tác nhân và quyền

- Tài năng: đăng ký và đổi cách thanh toán trên trang của GMO; xem số tiền dự kiến ở T-15.
- Hệ thống: tính tiền, gửi yêu cầu thu, nhận kết quả.
- Quản lý: nhận báo thu lỗi, quyết có dừng sử dụng không (UC-11).
- Tài khoản công ty: không bị thu (1-2).

## Luồng chính

1. Đăng ký/đổi thanh toán và xem lịch sử tại trang nhà cung cấp; hệ thống không lưu số thẻ. Chưa chọn cổng chính thức: GMO trong tài liệu là dự kiến, Square tại KS H105 mới là ghi chú cần kiểm.
2. Đăng ký phương thức xong tự kích hoạt và tạo folder theo SD-T19 trang8–9; không suy đăng ký đồng nghĩa đã thu tiền.
3. Tổng hóa đơn gồm phí tháng và phí video hợp lệ. Trả trước/sau, ngày bắt đầu/kỳ thu, khả năng thu số tiền biến đổi còn KS20261120 No.23–26 và QA No.4/53.
4. Không chốt thu ngay kỳ đầu, ngày1 hay thử lại sau3ngày từ giả định cũ. Đội đề xuất lịch/đối soát sau khi có quyết định và bằng chứng provider.
5. Thu lỗi báo Talent/Manager; Manager quyết định dừng. Tạm dừng nợ và phí trong thời gian dừng còn No.63.
6. Talent xem dự kiến, lượt video và link đổi thanh toán/lịch sử tại T-19 (SD-T19 trang25).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| GMO không thu được số tiền thay đổi qua nhà mạng | Thu phí tháng bằng thu định kỳ cố định; phí video thu riêng một lần mỗi tháng | S08-04 (phương án dự phòng); chờ 確認49 |
| Tài năng hủy ở trang GMO | Bước 3 của hướng dẫn chưa xong; AIコーチ chưa dùng được | 6-2 |
| Kết quả từ GMO đến hai lần | Xử lý một lần (khóa theo mã giao dịch) | [Đề xuất nội bộ] |
| Tài năng chuyển sang 利用終了 giữa tháng | Không thu tháng sau; tháng này đã thu trọn (khách ghi đồng ý ở 確認50, chưa chốt). Phí video tháng đó thu vào lần thu cuối | S08-05 |
| GMO ngừng dịch vụ | Không đăng ký thanh toán mới được; lần thu tháng dời tới khi GMO chạy lại | §9-3 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Hóa đơn tháng | Phí tháng + số lần tạo video × đơn giá | Chốt | §5-4 (hình 5-3) |
| Phí tháng | Theo hợp đồng giữa アデッソ và tài năng | ❌ chưa có số | Hình 5-3, §2-3, S08-01 |
| Cách thanh toán | Qua nhà mạng hoặc thẻ, một công ty thanh toán | Chốt | §5-4 |
| Tháng đầu thu trọn | — | Chốt | §5-4 |
| Ngày chốt và ngày thu | Ngày 1 hằng tháng | Đề xuất | S08-02 |
| Thu lỗi không tự dừng | — | Chốt | §6-3 |
| Không giữ thông tin thẻ | — | Chốt | §10-2 |

## Dữ liệu [Đề xuất nội bộ]

- `billing_accounts`: `talent_id`, `gmo_member_id`, `method` (`carrier`, `card`), `registered_at`, `monthly_fee_jpy` (S08-01).
- `invoices`: `talent_id`, `month`, `subscription_jpy`, `video_count`, `video_jpy`, `total_jpy`, `status` (theo C-01: `pending`, `charging`, `paid`, `failed`), `gmo_order_id`, `attempts`, `updated_at`.

## Màn hình

T-04 bước 3; T-15 ([AG] trang 5); M-02 (支払いの失敗); M-10 (phí tháng của tài năng nếu S08-01 chọn mỗi người một mức).

## Tích hợp

GMO Payment Gateway: đăng ký thành viên và cách thanh toán qua trang của GMO, thu định kỳ hoặc thu theo lần, nhận kết quả. Kiểm chứng trên môi trường thử của GMO (§12-4).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng đăng ký thẻ trên trang GMO, thì tài năng sang 利用中 và hệ thống không lưu số thẻ ở đâu cả.
2. Cho ngày 1, tài năng có 3 lần tạo video tháng trước, đơn giá 500 yên, phí tháng 3.000 yên, thì yêu cầu thu là 4.500 yên.
3. Cho thu lỗi, thì tài năng và mọi quản lý được báo, tài năng vẫn dùng được.
4. Cho tài năng đổi thẻ sau khi thu lỗi, thì hệ thống thu lại ngay.
5. Cho tài khoản công ty, thì không có hóa đơn.

## Ngoài phạm vi của chức năng này

- Màn lịch sử hóa đơn trong ứng dụng: xem ở trang của GMO (UC-11 前提). Hoàn tiền, giảm giá: không có trong [YK2].
- Nội dung điều khoản sử dụng, cách hiện phí, thông tin theo luật bán hàng (特定商取引法): アデッソ quyết (§11).

## Phụ thuộc

6-2, 5-4, 7-3, 2-2, 8-2, 7-4, 6-1, câu I5 (file 18).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認48, 49, 50.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S08-01 | Phí tháng: một mức chung hay mỗi tài năng một mức | Có | Một mức chung là tham số |
| S08-02 | Ngày chốt, ngày thu | Có | Ngày 1 hằng tháng |
| S08-03 | Thu lại khi lỗi | Không | Khi đổi cách thanh toán và sau 3 ngày |
| S08-04 | Dự phòng nếu GMO không thu được số tiền thay đổi | Không | Tách hai lần thu |
| S08-05 | Phí video của tháng ngừng | Không | Thu ở lần thu cuối |
| B7 | Thu lỗi thì dừng thế nào | Không | Phương án A |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP08: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §2-3, §5-4 (hình 5-3), §6-3 (1-1), §8, §10-2, §11, §12-4, UC-11, UC-11 前提, 確認48–50.
- [AG] trang 2 (T-04), trang 5 (T-15). [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) câu I5.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.46 (đã chốt): tháng đầu thu đủ 1 tháng; thu lỗi thì báo tài năng và quản lý, không tự dừng.
- Q&A No.49, No.53 (đang hỏi): đề xuất cũ "thu cùng ngày cuối tháng" **trái** với [KS] 確認48 (kỳ một tháng tính từ ngày đăng ký); làm theo [KS]. Phần "tính phí từ ngày đăng ký thanh toán" vẫn khớp.
