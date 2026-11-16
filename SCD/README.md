# Đặc tả từng chức năng (SCD) – AI育成OS

Thư mục này có **một file cho mỗi chức năng**, chia thư mục con theo module EP01–EP10 ([file 16](../Phan_tich/16_Chia_module_phat_trien.md)). Mỗi file trả lời một câu hỏi: **chức năng này đã đủ để giao AI agent viết mã chưa, nếu chưa thì còn thiếu gì và ai phải lấp.**

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx` (bản định nghĩa yêu cầu tổng quan, bản 2). [AG] = `アプリ画面案_AI育成OS.pdf` (phương án màn hình ứng dụng). Các file phân tích nằm trong [Phan_tich/](../Phan_tich/).

## 1. Agent đọc gì, khi nào

| Tầng | Tài liệu | Khi nào đọc |
|---|---|---|
| Hệ thống | [CLAUDE.md](../CLAUDE.md), [file 17 – bối cảnh hệ thống](../Phan_tich/17_Tai_lieu_boi_canh_he_thong.md), [file 18 – hạ tầng](../Phan_tich/18_Ha_tang_he_thong.md) | Mọi lần |
| Module | Phần của module đó trong [file 16](../Phan_tich/16_Chia_module_phat_trien.md) | Khi làm bất kỳ chức năng nào trong module |
| Chức năng | Đúng một file trong thư mục này | Khi làm chức năng đó |

**Chỉ giao agent file có mức 🟢 hoặc 🟡, và đã viết đầy đủ** (không còn dòng "Bản khung" ở đầu file).

## 2. Hai loại file

- **Bản khung:** sinh tự động từ file 04, file 16 và bảng đánh giá ở mục 5. Đã có tác nhân, đầu vào, luồng chính, chỗ còn thiếu, điểm chưa rõ. Còn trống: luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Đầu file có dòng "Bản khung".
- **Bản đầy đủ:** do đội viết theo mẫu ở mục 4. Hiện đã viết đủ EP01, EP02, EP03. Mỗi module viết xong có thêm file `00_Cau_hoi_cho_khach.md` gom câu hỏi gửi khách (không xử lý 確認, chỉ nhắc mã).

Script sinh bản khung là [gen_ban_khung.py](gen_ban_khung.py). Chạy ở thư mục gốc dự án: `python3 SCD/gen_ban_khung.py .`. Script **không ghi đè** file đã xóa dòng "Bản khung", nên chạy lại không làm mất phần viết tay. Script còn sinh lại bảng đánh giá vào `SCD/_bang_danh_gia.md.part`; muốn cập nhật mục 5 thì chép bảng đó vào đây. Mức sẵn sàng của từng chức năng sửa trong biến `M` của script.

## 3. Tiêu chí "đủ để agent viết mã"

| Mã | Tiêu chí | Đạt khi |
|---|---|---|
| R1 | Mục đích, tác nhân, quyền | Biết ai làm, ai không được làm, kết quả cần đạt |
| R2 | Luồng chính | Các bước đánh số, mỗi bước có hành động và kết quả |
| R3 | Luồng lỗi, trường hợp biên | Mỗi chỗ có thể lỗi (nhập sai, dịch vụ ngoài lỗi, thao tác trùng, hết hạn) đều có cách xử lý |
| R4 | Quy tắc và giá trị số | Mọi giá trị đã chốt, hoặc được ghi là **tham số cài đặt** kèm giá trị mặc định |
| R5 | Dữ liệu và trạng thái | Biết đọc và ghi bảng nào, trường nào, trạng thái chuyển từ đâu sang đâu |
| R6 | Màn hình | Có màn trong [AG], và các 【要確認】 (cần xác nhận) còn lại không làm đổi luồng |
| R7 | Tích hợp ngoài | Đã chọn dịch vụ. Lệnh gọi, giới hạn và lỗi đã kiểm chứng trên tài khoản thật |
| R8 | Tiêu chí chấp nhận | Viết dạng "Cho / Khi / Thì", kiểm thử tự động được |
| R9 | Phụ thuộc | Chức năng hoặc phần nền cần trước đã có, hoặc đã có giao diện giả để thay tạm |

**Chỗ thiếu chia theo ai phải lấp:**
- **Khách:** chỉ khách trả lời được (các 確認, tức mục cần xác nhận, và các câu A/B/C/I).
- **Kiểm chứng:** phải thử trên dịch vụ thật (Upload-Post, GMO, fal.ai, Microsoft Graph).
- **Đội:** đội tự quyết khi viết đặc tả, ví dụ cấu trúc bảng, xử lý lỗi, tiêu chí chấp nhận.

| Mức | Nghĩa | Giao agent? |
|---|---|---|
| 🟢 Xanh | Chỉ thiếu những thứ đội tự quyết | Có, sau khi viết đầy đủ |
| 🟡 Vàng | Còn câu hỏi cho khách, nhưng có giả định an toàn: biến chỗ chưa rõ thành tham số cài đặt, hoặc tách riêng để sửa sau dễ | Có, nếu đặc tả ghi rõ giả định. Khi khách trả lời chỉ phải sửa nhỏ |
| 🔴 Đỏ | Câu trả lời của khách hoặc kết quả kiểm chứng có thể làm đổi luồng hay cấu trúc dữ liệu | Không. Chỉ dựng khung (bảng, giao diện giả) hoặc làm phần kiểm chứng trước |

**Lưu ý:** [YK2] chưa có 受入基準 (tiêu chí nghiệm thu) cho chức năng nào ([file 04](../Phan_tich/04_Yeu_cau_chuc_nang.md), "Các điểm chưa rõ chung" số 1). Vì vậy hiện không chức năng nào đạt R8. Đội viết tiêu chí chấp nhận ngay trong đặc tả, ghi [Đề xuất nội bộ], và gửi khách xem cùng màn hình thật. Mức ở mục 5 đánh giá theo giả định đội đã viết R8.

## 4. Mẫu đặc tả một chức năng

Mục nào chưa có thông tin thì ghi **⚠ chưa rõ** kèm mã câu hỏi. Không tự điền. Xem ví dụ đầy đủ: [EP01/1-4](EP01_Danh_tinh_va_quyen_truy_cap/1-4_Dang_ky_duyet_don_va_dang_nhap.md).

```markdown
# <mã> <tên>

| Mục | Giá trị |   ← module, ưu tiên, mục [YK2], màn hình [AG], tên trong mã nguồn, mức sẵn sàng

## Đánh giá   ← bảng R1–R9: ✅ đạt / ⚠ có giả định / ❌ thiếu
## Mục đích
## Tác nhân và quyền
## Điều kiện trước, kết quả sau
## Luồng chính
## Luồng lỗi và trường hợp biên        | Tình huống | Xử lý | Nguồn hoặc [Đề xuất nội bộ] |
## Quy tắc và giá trị                  | Quy tắc | Giá trị | Chốt / giả định / tham số cài đặt | Nguồn |
## Dữ liệu                             ← bảng, trường đọc và ghi, trạng thái chuyển
## Màn hình                            ← mã [AG], phần tử chính, thông báo phát ra (別紙A, tức phụ lục A)
## Tích hợp                            ← dịch vụ, lệnh gọi, lỗi, chống xử lý trùng
## Tiêu chí chấp nhận                  ← Cho … Khi … Thì …
## Ngoài phạm vi của chức năng này
## Phụ thuộc
## Câu hỏi mở                          | Mã | Nội dung | Chặn? | Giả định tạm dùng khi viết mã |
## Nguồn
```

## 5. Bảng đánh giá

Đánh giá ban đầu, dựa trên file 04 (điểm chưa rõ của từng module), [file 15](../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) và [AG]. Kiểm tra lại khi viết đầy đủ từng file.

### EP01 – Danh tính và quyền truy cập

Câu hỏi gửi khách của module: [00_Cau_hoi_cho_khach.md](EP01_Danh_tinh_va_quyen_truy_cap/00_Cau_hoi_cho_khach.md).

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 1-4 | [Đăng ký, duyệt đơn và đăng nhập](EP01_Danh_tinh_va_quyen_truy_cap/1-4_Dang_ky_duyet_don_va_dang_nhap.md) | 🟡 Vàng | 確認1 (đồng ý điều khoản); C1 (dịch vụ gửi thư); [AG] thiếu màn đặt lại mật khẩu | — | Hạn mật khẩu tạm, chặn đăng ký rác, đơn trùng email |
| 1-5 | [Nhận diện tài năng](EP01_Danh_tinh_va_quyen_truy_cap/1-5_Nhan_dien_tai_nang.md) | 🟢 Xanh | — | — | Thiết kế RLS và cách worker chỉ đọc đúng thư mục |
| 6-2 | [Hướng dẫn lần đầu và kết nối mạng xã hội](EP01_Danh_tinh_va_quyen_truy_cap/6-2_Huong_dan_lan_dau_va_ket_noi_mang_xa_hoi.md) | 🟡 Vàng | 確認11, 12, 13 | — | Lưu tiến độ từng bước; bước 3, 4 dùng giao diện giả tới khi có 1-1, 8-2 |
| 1-6 | [Đăng nhập và quyền của quản lý](EP01_Danh_tinh_va_quyen_truy_cap/1-6_Dang_nhap_va_quyen_cua_quan_ly.md) | 🟡 Vàng | Xử lý khi mất điện thoại xác thực | — | Cách mời quản lý mới, tạo quản lý đầu tiên |
| 7-3 | [Đổi trạng thái tài năng](EP01_Danh_tinh_va_quyen_truy_cap/7-3_Doi_trang_thai_tai_nang.md) | 🔴 Đỏ | 確認53–56; A3 (tên và số trạng thái); ai chuyển 利用前 sang 利用中 | — | Sơ đồ trạng thái (C-01) |
| 7-6 | [Nhật ký xem thông tin](EP01_Danh_tinh_va_quyen_truy_cap/7-6_Nhat_ky_xem_thong_tin.md) | 🟡 Vàng | 確認44; thời gian giữ nhật ký (§9-4) | — | Danh sách màn hình được ghi |

### EP02 – Thông tin tài năng và nguồn dữ liệu cho AI

Câu hỏi gửi khách của module: [00_Cau_hoi_cho_khach.md](EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/00_Cau_hoi_cho_khach.md).

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 2-2 | [Tạo thư mục riêng cho tài năng](EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-2_Tao_thu_muc_rieng_cho_tai_nang.md) | 🔴 Đỏ | I3 (quyền Microsoft Graph, vị trí thư mục); báo quản lý khi thư mục đã tạo | Tạo thư mục qua Microsoft Graph | Cấu trúc thư mục |
| 2-3 | [Nhập thông tin từ ChatGPT](EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-3_Nhap_thong_tin_tu_ChatGPT.md) | 🔴 Đỏ | C4 (ai thiết lập phía ChatGPT); 確認5 | Gắn dự án ChatGPT với thư mục OneDrive | Định dạng file hồ sơ |
| 2-4 | [Đăng ký mục tiêu](EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-4_Dang_ky_muc_tieu.md) | 🟡 Vàng | 確認3, 5; B12 | — | — |
| 2-1 | [Đọc thông tin tài năng](EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-1_Doc_thong_tin_tai_nang.md) | 🟡 Vàng | I3 | Tốc độ đọc OneDrive cho 1.000 người | Định dạng file, xử lý khi đọc lỗi |
| 7-1 | [Xem thông tin tài năng](EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/7-1_Xem_thong_tin_tai_nang.md) | 🟡 Vàng | 確認2, 47; cột hiển thị trong danh sách | — | — |

### EP03 – Huấn luyện viên AI

Câu hỏi gửi khách của module: [00_Cau_hoi_cho_khach.md](EP03_Huan_luyen_vien_AI/00_Cau_hoi_cho_khach.md).

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 3-1 | [Hiểu tài năng và thuật toán](EP03_Huan_luyen_vien_AI/3-1_Hieu_tai_nang_va_thuat_toan.md) | 🟡 Vàng | Định dạng file kiến thức nghề và chỉ dẫn thuật toán | — | Thiết kế lời nhắc (prompt) |
| 3-4 | [Trò chuyện với huấn luyện viên AI](EP03_Huan_luyen_vien_AI/3-4_Tro_chuyen_voi_huan_luyen_vien_AI.md) | 🟡 Vàng | 確認14, 18, 21, 22, 23 | Chi phí OpenAI khi không giới hạn số tin | — |
| 3-3 | [Giới hạn chủ đề trò chuyện](EP03_Huan_luyen_vien_AI/3-3_Gioi_han_chu_de_tro_chuyen.md) | 🔴 Đỏ | S03-02 (dấu hiệu tự hại), S03-04 (thế nào là chuyện nghiêm trọng); 確認17 | — | Câu từ chối cố định |
| 3-9 | [Nhắc tài năng lâu không đăng bài](EP03_Huan_luyen_vien_AI/3-9_Nhac_tai_nang_lau_khong_dang_bai.md) | 🟡 Vàng | 確認19, 43 | — | — |
| 3-2 | [Tự cải thiện](EP03_Huan_luyen_vien_AI/3-2_Tu_cai_thien.md) | 🟡 Vàng | — | — | Cấu trúc và giới hạn dung lượng file bộ nhớ |
| 3-6 | [Nhận xét bài hôm trước và gợi ý cải thiện](EP03_Huan_luyen_vien_AI/3-6_Nhan_xet_bai_hom_truoc_va_goi_y_cai_thien.md) | 🟡 Vàng | C5 (giờ lấy kết quả) | — | Nội dung khi hôm trước không đăng |
| 3-8 | [Tổng kết tuần](EP03_Huan_luyen_vien_AI/3-8_Tong_ket_tuan.md) | 🟡 Vàng | — | — | Nội dung bản tổng kết |
| 3-7 | [Thông báo khi đạt mục tiêu](EP03_Huan_luyen_vien_AI/3-7_Thong_bao_khi_dat_muc_tieu.md) | 🟡 Vàng | 確認5, 39; A7 | — | — |
| 3-5 | [Quản lý chi phí AI](EP03_Huan_luyen_vien_AI/3-5_Quan_ly_chi_phi_AI.md) | 🟡 Vàng | Cách hiện phí AI ở M-10 (S03-08) | — | — |

### EP04 – Tạo nội dung bài đăng

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 4-1 | [Tự tạo bản nháp](EP04_Tao_noi_dung_bai_dang/4-1_Tu_tao_ban_nhap.md) | 🔴 Đỏ | 確認15, 16, 24; A8; B1, B2, B3 | Nguồn tin tức (確認16) | Giới hạn độ dài chung cho 3 mạng |
| 4-2 | [Yêu cầu sửa và viết lại](EP04_Tao_noi_dung_bai_dang/4-2_Yeu_cau_sua_va_viet_lai.md) | 🟡 Vàng | 確認28, 29 | — | — |
| 4-3 | [Chấp nhận bản nháp (採用)](EP04_Tao_noi_dung_bai_dang/4-3_Chap_nhan_ban_nhap.md) | 🔴 Đỏ | 確認25, 26; B1, B6; chấp nhận sau giờ đăng | — | — |
| 4-4 | [Phát hiện từ cấm](EP04_Tao_noi_dung_bai_dang/4-4_Phat_hien_tu_cam.md) | 🟡 Vàng | 確認4; B5 (luồng quản lý sửa) | Độ chính xác khi AI kiểm tra theo ngữ cảnh | — |
| 6-6 | [Xem trước bài đăng](EP04_Tao_noi_dung_bai_dang/6-6_Xem_truoc_bai_dang.md) | 🟢 Xanh | — | — | Bố cục xem trước |

### EP05 – Tư liệu và video AI

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 6-3 | [Gửi ảnh và video](EP05_Tu_lieu_va_video_AI/6-3_Gui_anh_va_video.md) | 🟡 Vàng | 確認27; C2 | — | Định dạng và dung lượng tối đa (§9-2) |
| 6-4 | [Lưu tư liệu](EP05_Tu_lieu_va_video_AI/6-4_Luu_tu_lieu.md) | 🔴 Đỏ | 確認32; B4 | — | Thời gian giữ và cách xóa |
| 6-5 | [Nhắc gửi tư liệu](EP05_Tu_lieu_va_video_AI/6-5_Nhac_gui_tu_lieu.md) | 🟡 Vàng | Nhiều bài trong ngày thì nhắc mấy lần | — | — |
| 5-1 | [Tạo video](EP05_Tu_lieu_va_video_AI/5-1_Tao_video.md) | 🔴 Đỏ | 確認31; đơn giá; B9 | Tham số Kling, thời gian tạo | — |
| 5-2 | [Định dạng video](EP05_Tu_lieu_va_video_AI/5-2_Dinh_dang_video.md) | 🟡 Vàng | — | Định dạng đăng được trên cả 3 mạng | — |
| 5-3 | [Xem và xử lý video đã tạo](EP05_Tu_lieu_va_video_AI/5-3_Xem_va_xu_ly_video_da_tao.md) | 🟡 Vàng | Video bị bỏ có lưu không | — | — |
| 5-5 | [Ghi rõ video do AI tạo](EP05_Tu_lieu_va_video_AI/5-5_Ghi_ro_video_do_AI_tao.md) | 🔴 Đỏ | C3 | Upload-Post có gắn được nhãn AI trên 3 mạng không | — |

### EP06 – Phê duyệt và đăng lên mạng xã hội

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 7-7 | [Duyệt bài đăng](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-7_Duyet_bai_dang.md) | 🔴 Đỏ | 確認33–36; A2 | Bài chờ duyệt đã đặt lịch trên Upload-Post chưa | — |
| 8-2 | [Kết nối dịch vụ đăng bài](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-2_Ket_noi_dich_vu_dang_bai.md) | 🔴 Đỏ | 確認9, 10, 11; lúc nào đăng ký tài năng với Upload-Post | Luồng kết nối, đường dẫn hạn 48 giờ | — |
| 8-3 | [Đăng lên 3 mạng xã hội](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-3_Dang_len_3_mang_xa_hoi.md) | 🟡 Vàng | B3 (tiêu đề YouTube) | Lệnh đăng và kết quả theo từng mạng | — |
| 8-4 | [Chống bị khóa tài khoản](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-4_Chong_bi_khoa_tai_khoan.md) | 🔴 Đỏ | 確認37; chưa có nội dung (§9-5) | Quy định của từng mạng | — |
| 8-5 | [Thông báo khi đăng lỗi](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-5_Thong_bao_khi_dang_loi.md) | 🔴 Đỏ | 確認30, 38; ai đặt lịch lại (file 14 §3.2 điểm 9) | — | — |
| 8-6 | [Thông báo khi mất kết nối](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-6_Thong_bao_khi_mat_ket_noi.md) | 🟡 Vàng | — | Upload-Post báo mất kết nối bằng cách nào | — |
| 7-5 | [Dừng đăng tự động, toàn bộ hoặc từng tài năng](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-5_Dung_dang_tu_dong_toan_bo_hoac_tung_tai_nang.md) | 🟡 Vàng | B6 | Hủy hàng loạt trên Upload-Post | — |
| 7-2 | [Xem và hủy bài đăng](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-2_Xem_va_huy_bai_dang.md) | 🟡 Vàng | Danh sách trạng thái bài đăng (C-01) | Hủy lịch qua API | — |
| 9-1 | [Đăng bài bằng tài khoản công ty](EP06_Phe_duyet_va_dang_len_mang_xa_hoi/9-1_Dang_bai_bang_tai_khoan_cong_ty.md) | 🔴 Đỏ | A1, A2, 確認52; B10 | — | — |

### EP07 – Kết quả và phân tích

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 8-7 | [Lấy số liệu](EP07_Ket_qua_va_phan_tich/8-7_Lay_so_lieu.md) | 🔴 Đỏ | C5 | Upload-Post trả về những chỉ số nào (quyết định cấu trúc dữ liệu) | — |
| 8-8 | [Ghi số liệu vào file](EP07_Ket_qua_va_phan_tich/8-8_Ghi_so_lieu_vao_file.md) | 🟡 Vàng | — | — | Định dạng file kết quả |
| 3-10 | [Hiển thị số người theo dõi](EP07_Ket_qua_va_phan_tich/3-10_Hien_thi_so_nguoi_theo_doi.md) | 🟡 Vàng | Tổng 3 mạng hay từng mạng (別紙B số 20) | — | — |
| 6-7 | [Số liệu và mức đạt cho tài năng](EP07_Ket_qua_va_phan_tich/6-7_So_lieu_va_muc_dat_cho_tai_nang.md) | 🟡 Vàng | 確認22, 40 | — | — |
| 8-1 | [Phân tích giờ đăng](EP07_Ket_qua_va_phan_tich/8-1_Phan_tich_gio_dang.md) | 🔴 Đỏ | 確認30; B1; thế nào là đủ số liệu | Có số liệu theo khung giờ không | — |
| 8-9 | [Lấy khung giờ tương tác](EP07_Ket_qua_va_phan_tich/8-9_Lay_khung_gio_tuong_tac.md) | 🔴 Đỏ | — | Upload-Post có số liệu theo khung giờ không | — |

### EP08 – Thu phí

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 1-1 | [Thu phí thuê bao tháng](EP08_Thu_phi/1-1_Thu_phi_thue_bao_thang.md) | 🔴 Đỏ | 確認48, 49, 50; mức phí; ngày chốt | Môi trường thử GMO, thu số tiền thay đổi | — |
| 1-2 | [Loại tài khoản](EP08_Thu_phi/1-2_Loai_tai_khoan.md) | 🟡 Vàng | A1 (tài khoản công ty thao tác ở đâu) | — | — |
| 1-3 | [Đổi loại](EP08_Thu_phi/1-3_Doi_loai.md) | Không làm | — | — | — |
| 5-4 | [Đếm số lần tạo video và thu gộp với phí tháng](EP08_Thu_phi/5-4_Dem_so_lan_tao_video_va_thu_gop_voi_phi_thang.md) | 🔴 Đỏ | Đơn giá; 確認51; B8, B9 | — | — |

### EP09 – Thông báo và nền tảng PWA

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| 6-1 | [Tin nhắn trong ứng dụng và thông báo đẩy](EP09_Thong_bao_va_nen_tang_PWA/6-1_Tin_nhan_trong_ung_dung_va_thong_bao_day.md) | 🟡 Vàng | C6; 確認12 | Web Push trên iOS 16.4 trở lên | — |
| 7-4 | [Danh sách thông báo cho quản lý](EP09_Thong_bao_va_nen_tang_PWA/7-4_Danh_sach_thong_bao_cho_quan_ly.md) | 🟡 Vàng | 確認45, 46; A6 | — | — |
| 6-8 | [Nền tảng PWA](EP09_Thong_bao_va_nen_tang_PWA/6-8_Nen_tang_PWA.md) | 🟡 Vàng | B13; hệ điều hành và trình duyệt hỗ trợ (§9-1) | — | — |

### EP10 – Nền tảng chung và quản trị hệ thống

| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |
|---|---|---|---|---|---|
| C-01 | [Bộ trạng thái](EP10_Nen_tang_chung_va_quan_tri_he_thong/C-01_Bo_trang_thai.md) | 🔴 Đỏ | §5-1 ghi sẽ viết ở bản cuối; A3 | — | Đội viết nháp sơ đồ trạng thái rồi gửi khách duyệt |
| C-02 | [Cài đặt do quản lý tự chỉnh](EP10_Nen_tang_chung_va_quan_tri_he_thong/C-02_Cai_dat_do_quan_ly_tu_chinh.md) | 🟢 Xanh | — | — | — |
| C-03 | [Nhật ký thao tác và xử lý](EP10_Nen_tang_chung_va_quan_tri_he_thong/C-03_Nhat_ky_thao_tac_va_xu_ly.md) | 🟡 Vàng | Thời gian giữ (§9-4) | — | — |
| C-04 | [Xử lý khi dịch vụ ngoài lỗi](EP10_Nen_tang_chung_va_quan_tri_he_thong/C-04_Xu_ly_khi_dich_vu_ngoai_loi.md) | 🟡 Vàng | — | — | Cách xử lý cho từng dịch vụ |
| C-05 | [Danh mục thông báo](EP10_Nen_tang_chung_va_quan_tri_he_thong/C-05_Danh_muc_thong_bao.md) | 🟡 Vàng | A6 | — | — |
| C-06 | [Quy tắc chung của màn hình](EP10_Nen_tang_chung_va_quan_tri_he_thong/C-06_Quy_tac_chung_cua_man_hinh.md) | 🟡 Vàng | Logo và mã màu (§6-14) | — | — |
## 6. Tổng hợp

| Mức | Số chức năng (trong 54) |
|---|---|
| 🟢 Xanh | 2 (1-5, 6-6) |
| 🟡 Vàng | 32 |
| 🔴 Đỏ | 19 |
| Không làm | 1 (1-3) |

- **Ít chức năng xanh không có nghĩa là chưa làm được gì.** 32 chức năng vàng giao agent được ngay khi đặc tả ghi rõ giả định.
- **Các chức năng đỏ dồn vào ba chỗ:**
  - **Upload-Post:** 8-2, 8-7, 8-9, 5-5, 7-7. Nên kiểm chứng Upload-Post càng sớm càng tốt.
  - **Thu phí:** 1-1, 5-4. Chờ 確認48–51 và đơn giá.
  - **Luồng bản nháp và đăng bài:** 4-1, 4-3, 8-5. Chờ B1 (giờ đăng quyết lúc nào) và 確認30.
- **C-01 (bộ trạng thái) là điểm nghẽn chung** của 7-3, 7-2, 7-7, 8-5. Đội nên viết nháp sơ đồ trạng thái ngay rồi gửi khách duyệt.

Thứ tự viết đầy đủ: theo thứ tự phát triển ở file 16 mục 4, trong mỗi module để chức năng đỏ sau cùng.
