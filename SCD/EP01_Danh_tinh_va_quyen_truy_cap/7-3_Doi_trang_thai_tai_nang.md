<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Kích hoạt tài khoản và hồ sơ

Talent được duyệt nhưng chưa đăng ký phương thức thanh toán vẫn ở 利用前; mỗi lần đăng nhập mở hướng dẫn khởi tạo. Đăng ký phương thức thanh toán xong tự chuyển 利用中, tạo thư mục riêng và báo Manager. Manager bấm 「登録完了」 để đánh dấu hoàn tất hồ sơ và bắt đầu AI coach; không tự kiểm đủ trường bắt buộc. M-08 của YK3 có hồ sơ, định hướng, sở thích/sở trường, mục tiêu tương lai, giọng điệu; không trường nào bắt buộc.

**Phần còn mở/giới hạn:** Ngày bắt đầu thu và cách xử lý khởi đầu giữa tháng vẫn theo No.49; đăng ký phương thức thanh toán không tự chứng minh đã thu tiền.

Căn cứ: QA `Q&A!A52:J52 (No.52); Q&A!A53:J53 (No.53); Q&A!A54:J54 (No.54); Q&A!A92:J92 (No.92)`; `EV-1331` / `DEC-0015`.

### Chờ thanh toán và khôi phục

Khi Square thanh toán lại mà vẫn chưa xác nhận được thanh toán, báo Talent và Manager rồi tự chuyển 支払い待ち (Chờ thanh toán). Dừng AI coach, tạo video và đăng bài; vẫn thu phí tháng. Talent vẫn đăng nhập để đổi phương thức thanh toán. Xác nhận đã thanh toán thì tự trở lại 利用中. Trong lúc dừng không đăng; các bài lỡ giờ không tự đăng bù sau mở lại. Dùng cơ chế thu lại của cổng nếu có, không làm cơ chế thu lại riêng.

**Phần còn mở/giới hạn:** Thay đúng câu trả lời No.46 về không tự dừng. Không tự đặt số lần/ngày thu lại vì No.4/49 còn chờ kiểm Square. H86 bản Việt nói rõ bài tương lai tiếp tục; G86 không mô tả riêng chi tiết đó, không suy phục hồi các bài đã huỷ vì lý do khác.

Căn cứ: QA `Q&A!A63:J63 (No.63); Q&A!A86:J86 (No.86)`; `EV-1341` / `DEC-0025`.

### Tài khoản office và lưu dữ liệu

Manager nhập email khi tạo office, đăng nhập app office để nối SNS; hiện trong danh sách Talent với nhãn 事務所. Manager sửa email ở quản trị, mật khẩu đặt lại qua Quên mật khẩu. Kết thúc office huỷ lịch, khoá đăng nhập, gỡ SNS. Giữ dữ liệu 6 tháng rồi tự xoá như Talent theo phương án A của No.94; FCP sẽ bổ sung yêu cầu12-4.

**Phần còn mở/giới hạn:** Office là loại riêng miễn phí tháng; không áp 支払い待ち chỉ vì các trạng thái tài khoản dùng chung. Phần dữ liệu thu tiền giữ riêng vẫn No.98.

Căn cứ: QA `Q&A!A66:J66 (No.66); Q&A!A67:J67 (No.67); Q&A!A94:J94 (No.94)`; `EV-1344` / `DEC-0028`.

### Kết thúc sử dụng và khoản phí cuối

Talent đã 利用終了 không trở lại 利用中 trực tiếp; email còn đăng ký không được đăng ký lại trong thời gian giữ dữ liệu. Dữ liệu Talent/office giữ 6 tháng rồi tự xoá. Có phí đã phát sinh chưa thu vẫn được kết thúc ngay; thu khoản cuối (phí tháng cuối và video) một lần ở lần thu tiếp theo, sau đó ngừng thu.

**Phần còn mở/giới hạn:** No.98 mới chấp thuận việc kết thúc và khoản thu cuối; có lưu lịch sử thu tiền riêng trong OS và giữ bao lâu còn chờ Adesso (KS20261122 No.36). Không tự xoá hoặc giữ vô hạn dữ liệu tài chính.

Căn cứ: QA `Q&A!A69:J69 (No.69); Q&A!A94:J94 (No.94); Q&A!A98:J98 (No.98)`; `EV-1345` / `DEC-0029`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 7-3 Đổi trạng thái tài năng

## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Tạm dừng Talent:** Thêm trạng thái 一時停止 bên cạnh trước dùng/đang dùng/kết thúc. Tạm dừng vẫn tiếp tục tính phí; dừng các chức năng như lời nhắn AI, mở lại thì khôi phục. **Còn mở/giới hạn:** Chưa có ma trận quyền AI/video/đăng nhập, xử lý lịch đang có và ai được khôi phục. Tạm dừng khác kết thúc sử dụng và dừng riêng việc đăng. Nguồn `KS 確認事項!K116;20261120!F5;20261120!F32`; bằng chứng `EV-0964`.

- **Trả trước và quá hạn:** Phí tháng theo hướng trả trước; nguồn ghi đang xem xét dừng sử dụng nếu1tháng chưa thanh toán. **Còn mở/giới hạn:** “検討します” chưa chốt tự khóa sau1tháng. Chu kỳ cụ thể, khả năng cổng và No.46/49/86 còn mở; không tự xây retry hay thu sau. Nguồn `KS 確認事項!K104;20261120!F24`; bằng chứng `EV-0978`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Ba trạng thái nguồn mô tả: chưa dùng/đang dùng/đã kết thúc. Kết thúc dừng lời nhắn/thu phí/hủy lịch/chặn login; không trở lại đang dùng; giữ 6 tháng rồi xóa. Thanh toán đăng ký xong tự chuyển có thể dùng theo T19 trang 8–9.

Tạm dừng vì nợ và ảnh hưởng thu phí chưa được trả lời; không đồng nhất dừng đăng với kết thúc sử dụng.

Căn cứ: `M19:14,15;BF19:3,16` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0599;EV-0600;EV-0615;EV-0628`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-2, chức năng 7-3; §5-1; §7-3; UC-13 |
| Màn hình [AG] | M-10 |
| Tên trong mã nguồn | Talent Status Management |
| Mức sẵn sàng | 🔴 Đỏ – tên và số trạng thái chưa thống nhất (A3), sơ đồ trạng thái chưa có (C-01), 4 câu 確認53–56 chưa trả lời. **Chưa giao agent toàn bộ.** Xem mục "Phần làm được ngay" |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ thiếu bước 利用前 → 利用中 | ❌ | ✅ [KS] 確認55, 56 | ❌ C-01 | ⚠ 【要確認】 trên M-10 | ⚠ hủy lịch qua Upload-Post | ⚠ đội đề xuất | ❌ 1-1, 3-9, 7-2 |

## Mục đích

Quản lý đổi trạng thái sử dụng của tài năng. Khi chuyển sang đã ngừng thì hệ thống tự dừng nhắn tin, dừng thu phí, hủy bài đã hẹn giờ và chặn đăng nhập (§6-2 chức năng 7-3).

## Tác nhân và quyền

- Quản lý: đổi trạng thái ở M-10, có màn xác nhận.
- Hệ thống: tự làm các việc đi kèm khi trạng thái đổi.
- Tài năng: không tự đổi được. Muốn ngừng thì báo quản lý (確認53).

## Trạng thái và chuyển trạng thái

[YK2] §6-2 có 3 trạng thái: 利用前 (chưa dùng), 利用中 (đang dùng), 利用終了 (đã ngừng). UC-13 và 確認53–56 lại gọi là 退会 (rời đi). Đây là câu A3.

| Từ | Sang | Ai, khi nào | Tình trạng |
|---|---|---|---|
| (mới) | 利用前 | Quản lý duyệt đơn (1-4) | Rõ ([AG] M-03) |
| 利用前 | 利用中 | ⚠ chưa rõ: tự động khi đăng ký thanh toán xong, hay quản lý chuyển tay sau khi nhập hồ sơ? | **Chặn** |
| 利用中 | 利用終了 | Quản lý, có màn xác nhận | Rõ (確認53) |
| 利用終了 | 利用中 | **Không cho phép** | Chốt ([KS] 確認56) |
| 利用前 | 利用終了 | ⚠ chưa rõ | Chưa rõ |

## Luồng chính (đã rõ)

1. Quản lý mở M-10 của tài năng, bấm 切り替える (đổi).
2. Chọn trạng thái mới, hệ thống hiện màn xác nhận ghi rõ hậu quả.
3. Khi chuyển sang 利用終了:
   - dừng AIコーチ nhắn tin (3-4, 3-9);
   - dừng thu phí (1-1);
   - hủy mọi bài đã hẹn giờ, kể cả bên Upload-Post (7-2);
   - chặn đăng nhập (確認54);
   - giữ dữ liệu 6 tháng; hết 6 tháng thì việc chạy định kỳ tự xóa (DB, Supabase Storage, thư mục OneDrive), không khôi phục (§7-3, [KS] 確認55).
4. Ghi nhật ký thao tác: ai đổi, từ đâu sang đâu, lúc nào (§9-4).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Tình trạng |
|---|---|---|
| Hủy lịch trên Upload-Post lỗi | Ghi bài là "hủy lỗi", báo quản lý, thử lại | [Đề xuất nội bộ], cần kiểm chứng Upload-Post |
| Tài năng đang đăng nhập lúc bị chuyển sang 利用終了 | Lần gọi tiếp theo bị từ chối, về T-02 | [Đề xuất nội bộ] |
| Chuyển lại 利用中: thu phí lại từ khi nào | ⚠ chưa rõ (file 04) | Chặn phần thu phí |
| Bài chờ duyệt, bản nháp chưa dùng khi ngừng | Đề xuất: hủy bài chờ duyệt, giữ bản nháp (S01-04) | Giả định |
| Xóa đăng ký của tài năng trên Upload-Post (phí tính theo số tài năng) | Đề xuất: hủy đăng ký; quay lại thì kết nối lại (S01-03) | Giả định |
| Ngừng giữa tháng thì tính phí thế nào | Thu trọn tháng (khách ghi đồng ý ở 確認50, chưa chốt) | Giả định |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Thời gian giữ dữ liệu sau khi ngừng | 6 tháng, rồi tự xóa, không khôi phục | Chốt | §7-3, [KS] 確認55 |
| Có màn xác nhận trước khi đổi | Có | Chốt | §6-2 |

## Dữ liệu [Đề xuất nội bộ]

- `talents.status`: danh sách giá trị chờ C-01 chốt. Tạm dùng `before_use`, `active`, `ended`.
- `talent_status_history`: `talent_id`, `from_status`, `to_status`, `changed_by`, `changed_at`. Chỉ thêm, không sửa, dùng làm nhật ký thao tác (C-03).

## Màn hình

M-10: dòng ステータス (trạng thái) kèm nút 切り替える, câu giải thích hậu quả, 【要確認】 確認53, 54, 56 ([AG] trang 8).

## Tích hợp

- Upload-Post: hủy lịch các bài đã đặt (qua chức năng 7-2).
- GMO: dừng thu phí (qua chức năng 1-1).

## Tiêu chí chấp nhận [Đề xuất nội bộ, phần đã rõ]

1. Cho quản lý bấm đổi trạng thái, thì luôn có màn xác nhận trước khi đổi.
2. Cho tài năng có 2 bài đã hẹn giờ, khi chuyển sang 利用終了, thì cả 2 bài ở trạng thái đã hủy và lịch bên Upload-Post đã bị xóa.
3. Cho tài năng ở 利用終了, thì sáng hôm sau không nhận tin nhắn của AIコーチ và không đăng nhập được.
4. Cho mọi lần đổi trạng thái, thì có một dòng trong lịch sử trạng thái ghi người đổi và thời điểm.

## Phần làm được ngay (giao agent được)

- Cột trạng thái, bảng lịch sử, màn xác nhận ở M-10, việc chặn đăng nhập.
- Các việc đi kèm viết dưới dạng sự kiện "trạng thái đã đổi". Module khác (1-1, 3-9, 7-2) lắng nghe sự kiện này, để khi khách trả lời thì chỉ sửa phần lắng nghe.

**Chưa làm:** bước 利用前 → 利用中, thu phí lại khi quay về 利用中, xóa dữ liệu theo thời hạn.

## Ngoài phạm vi của chức năng này

- Tài năng tự xin ngừng trong ứng dụng: không có theo 確認53.

## Phụ thuộc

- C-01 (bộ trạng thái, 🔴). 1-1 (dừng thu phí), 3-9 (dừng nhắn), 7-2 (hủy bài). 1-4 (chặn đăng nhập).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| A3 | Tên và số trạng thái: 利用終了 hay 退会 | Có | Dùng tên của §6-2 |
| C-01 | Sơ đồ trạng thái tài năng (§5-1 ghi "sẽ viết ở bản cuối") | Có | Đội viết nháp, gửi khách duyệt |
| S01-01 | Ai chuyển 利用前 sang 利用中, và lúc nào | Có | Đề xuất: tự động khi đăng ký thanh toán xong |
| S01-02 | Quay lại 利用中 thì thu phí từ khi nào | Có (phần thu phí) | Đề xuất: thu trọn tháng quay lại |
| S01-03 | Hủy đăng ký Upload-Post khi ngừng | Không | Có hủy |
| S01-04 | Bài chờ duyệt và bản nháp khi ngừng | Không | Hủy bài chờ duyệt, giữ bản nháp |
| B7 | Thu tiền lỗi thì dừng thế nào | Không | Phương án A: dùng 利用終了 |
| 確認53 | Tài năng báo quản lý, quản lý đổi trạng thái | Không | Đúng như [YK2] |
| 確認54 | Chuyển sang đã ngừng thì chặn đăng nhập ngay | Không | Đúng như [YK2] |
| 確認55 | Giữ dữ liệu bao lâu sau khi ngừng | Không | Đã chốt ([KS]): 6 tháng rồi tự xóa |
| 確認56 | Cho quay lại 利用中 | Không | Đã chốt ([KS]): không cho quay lại |
| 確認50 | Ngừng giữa tháng thì tính phí thế nào | Có (phần thu phí) | Thu trọn tháng |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-1, §6-2 (7-3), §7-3, §9-4, UC-13, 確認50, 53–56.
- [AG] trang 8 (M-10).
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 2. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A3.


</details>

</details>
