# Rà soát đầu-cuối yêu cầu, luồng và độ sẵn sàng đặc tả

> **Bổ sung sau đối chiếu9 nguồn gốc:** xem [file26](26_Doi_chieu_9_nguon_va_cau_hoi_khach.md). Đã xem hình tổng quan92 trang PDF và26 ảnh DOCX; giới hạn “chưa xem hình” trong lần quét trước là lịch sử. Workbook15 hiện thêm `Gui_khach`/`Noi_bo`;4 RV đã đồng bộ một phần, không có câu trả lời khách mới và chưa đóng toàn bộ RV.

Ngày rà soát: **18/11/2026**. Phạm vi: **tài liệu**, gồm yêu cầu gốc, Q&A, bảng xác nhận, biên bản, màn hình, SCD, tài liệu phân tích và hướng dẫn tích hợp/thiết kế. Không đọc mã nguồn, môi trường, dữ liệu thật hoặc chạy dịch vụ để suy ra yêu cầu hay kết luận chức năng đã hoạt động.

## 1. Kết luận

**CHƯA ĐỦ CĂN CỨ để coi đặc tả toàn bộ hệ thống đã khép kín. Nếu dùng bộ tài liệu hiện tại để bắt đầu triển khai toàn bộ ngay: REJECTED.** Đây là kết luận về độ sẵn sàng của bộ đặc tả, không phải đánh giá chất lượng hay trạng thái phần mềm. Vẫn có thể giao từng phần độc lập đã chốt sau khi xác định điều kiện và ranh giới phần đó.

Phát hiện **33 vấn đề: 26 HIGH, 7 MEDIUM**. Không gán CRITICAL chỉ từ suy luận về tài liệu, cũng không suy ra không có rủi ro CRITICAL trong phần mềm. Các vấn đề HIGH phải được xử lý/loại khỏi phạm vi đợt triển khai bằng quyết định rõ; câu hỏi nghiệp vụ cốt lõi liên quan vẫn mở thì chưa phê duyệt chuỗi đó.

**16 mục L22 không phải bộ câu hỏi cuối cùng.** Một số là câu gộp, một số trỏ lại Q&A đã gửi, một số là việc đội thiết kế. Kể cả trả lời hết, còn việc đồng bộ đặc tả, giải quyết mâu thuẫn, định nghĩa lỗi/khôi phục, chốt phạm vi và nghiệm thu. **33 RV cũng không phải 33 câu mới gửi khách**: nhiều mục đội xử lý được, hoặc theo Q&A đang có.

## 2. Các tệp đi kèm

| Tệp | Dùng để làm gì |
|---|---|
| [24 – ma trận truy vết](24_Ma_tran_truy_vet_yeu_cau_luong.csv) | **67 dòng**: 60 mã SCD hiện có và 7 nhóm luồng chưa có SCD độc lập đầy đủ; nối nguồn → tác nhân/màn → input → xử lý/quy tắc → output/liên kết → AC hiện có → RV → scenario/câu hỏi. |
| [25 – kịch bản kiểm tra](25_Kich_ban_kiem_tra_luong_dau_cuoi.csv) | **84 scenario đề xuất**: 60 theo mã SCD (kể cả kiểm không mở chức năng 1-3), 7 theo nhóm bổ sung, 17 xuyên chức năng. Tất cả **CHƯA CHẠY**; có oracle còn bị chặn bởi quyết định chưa chốt. |
| [23 – danh mục nguồn](23_Danh_muc_nguon_ra_soat.csv) | **128 tệp** được lập chỉ mục/trích xuất, có loại nguồn, độ dài, số trang PDF, SHA256 và giới hạn đọc. Không phải 128 tệp đã được kiểm toán từng câu/hình. |
| [22 – sơ đồ tác nhân](22_So_do_tuong_tac_tac_nhan.md) | Bản đồ trình bày các luồng và G01–G20; RV làm rõ lỗi/điều kiện cụ thể bên trong các nhóm G, không thay mã G. |
| [15 – bảng câu hỏi](15_Cau_hoi_lam_ro_luong.xlsx) | Theo dõi câu hỏi đang có; giữ nguyên các dòng 確認. Đã ghi đủ33 điểm tắc RV: mở rộng19 mục cũ và thêm14 mục L23; A1 tiếp tục một phần do No.43/66. Xem bảng đối chiếu cuối báo cáo; không gửi lại các câu đã có No. |

`TR-*`, `RV-*`, `FL-*`, `EXT-*` là mã truy vết **nội bộ phục vụ rà soát**, không phải thêm mã chức năng hay yêu cầu khách đã duyệt. Bảng 24 chép quy tắc SCD để thấy mâu thuẫn; không được lấy cột đó làm baseline tự động khi RV còn mở. AC ghi “đề xuất” không có nghĩa khách đã duyệt. Scenario có oracle “cần chốt” là khung kiểm chứng, chưa phải test case thực thi hoàn chỉnh.

## 3. Nguồn, phương pháp và giới hạn

### 3.1. Đã quét những gì

- Hai bản **AI育成OS_概要要件定義書.docx** và **bản v2**, bao gồm đoạn văn/bảng có thể trích xuất; lấy v2 làm yêu cầu gốc hiện hành rồi đối chiếu quyết định mới.
- Năm PDF tổng **92 trang**: `要件説明資料` (42), `画面遷移図と画面案` (8), `アプリ画面案` (12), hai tài liệu style (12 + 18). Nội dung PDF được trích xuất text theo trang để tìm màn/luồng và so sánh; chưa kiểm toán hình vẽ từng trang bằng thị giác/OCR.
- Workbook **AI-Talent-OS_Q&A表.xlsx**: đọc cell text của **mọi sheet**; Q&A có **76 câu (43 Close, 33 Open)**, sheet `保留` có **No.50 Open**, `追加要件` có **CR-01–CR-25**. Hai sheet `デザインFB` và `お知らせ・メール文章` hiện chỉ có header; không coi là đã có nội dung thiết kế/copy hoàn chỉnh.
- Workbook **要件定義確認シート_AI育成OS.xlsx**, tất cả sheet hiện có, 118 dòng dữ liệu sheet `確認事項`; đối chiếu proposal/ý kiến/đánh dấu OK/quyết định mới, không chỉ dựa tick OK.
- Biên bản **17/11/2026**, 60 tệp chức năng SCD, 10 tệp câu hỏi theo EP, README SCD, tài liệu phân tích 00–22 và bảng CSV 15; đặc biệt quyền, phạm vi, workflow, business rule, edge case, màn hình và NFR.
- Tài liệu `database-design` và hướng dẫn/ca kiểm thử Auth, PWA, OneDrive, Upload-Post được đọc như **hợp đồng thiết kế/tài liệu kiểm thử**. Không dùng các dòng “đã chạy”, mã ví dụ hoặc tham chiếu test phần mềm để đóng yêu cầu nghiệp vụ. Không đọc code ngoài các đoạn minh họa có sẵn trong tài liệu; không triển khai hay sửa DB.

Danh mục 128 gồm cả hướng dẫn repo/vận hành/tiếp tục công việc, không phải 128 nguồn yêu cầu độc lập. Các bản sao mô tả cùng quyết định không được tính thành nhiều xác nhận.

### 3.1a. Vị trí tra nguồn Q&A và snapshot

Trong workbook Q&A: cột **A** là No., **E/F** là câu hỏi, **G/H** là nội dung trả lời có lịch sử ngày, **I** là status, **J** là comment. Ví dụ No.7 ở dòng Excel8; No.20 ở dòng21; No.39 ở dòng40; No.43 ở dòng44; No.66 ở dòng66 (No.50 đã chuyển sang sheet `保留`, không suy dòng từ No. sau mốc đó). Cần đọc cả nội dung cập nhật cuối G/H và status, không dùng riêng comment cũ để phủ quyết quyết định mới. Sheet CR cột **M/N** theo dõi status/phạm vi; cột trống không tự là đã duyệt.

SHA256 trong danh mục là snapshot tại lúc lập bảng, trước khi đợt quét này sửa A1 và thêm ghi chú vào file22/hướng dẫn15. Nó dùng nhận diện nguồn đã đối chiếu, không cam kết các tệp dẫn xuất đó giữ hash sau cập nhật. Các tệp review23–25 mới tạo không nằm trong 128 nguồn đầu vào.

### 3.2. Cách đánh giá

1. Lập chỉ mục nguồn; tách **nguồn gốc**, quyết định mới, bản dẫn xuất và đề xuất.
2. Đối chiếu 13 UC gốc với EP/SCD, màn, dữ liệu, quyền và 3 tác nhân chính. AI Core là khối nội bộ, không thêm vai trò đăng nhập.
3. Với mỗi mã, nối input → điều kiện/quy tắc → xử lý → trạng thái/output → consumer; rà AC và phần đang mở.
4. Kiểm các nhánh lỗi đầu vào, hết hạn, từ chối, hủy, tác vụ trùng, đồng thời, kết quả từng phần/chưa rõ, callback trễ, đổi quyền, exit, cleanup và khôi phục.
5. Đối chiếu Q&A ở cấp **nội dung quyết định**, không chỉ status. Close có thể chỉ đóng hướng nghiệp vụ, chưa giải quyết scope/giá/thiết kế hoặc tất cả trường hợp biên.
6. Ghi riêng việc cần khách, đội, provider POC và chủ dự án phê duyệt phạm vi. Bản thân đợt quét không trả lời thay khách.

### 3.3. Thứ tự tin cậy cần dùng

Phạm vi/hợp đồng đã ký và change approval có hiệu lực quyết định **có được làm không**. Quyết định nghiệp vụ mới có nguồn/date quyết định **phải làm gì**. Đề xuất kỹ thuật quyết định **làm như thế nào** sau khi đội chốt và không được trái business rule. Nguồn cùng thời điểm còn mâu thuẫn thì giữ conflict, không tự chọn.

**Không dùng quy tắc “migration > tài liệu” trong database-design/07 để quyết định yêu cầu nghiệp vụ.** Quy tắc đó chỉ phục vụ đối chiếu schema hiện trạng; câu hỏi lần này chỉ xét tài liệu. No.39/44/45 Close vẫn có nội dung báo tác động/đồng ý phạm vi; CR sheet cũ chưa cập nhật không tự thắng quyết định mới. Cũng không coi quyết định mới là đủ chứng minh đã có chấp thuận thương mại.

### 3.4. Giới hạn còn lại

Đây là rà soát tĩnh có truy vết và căn cứ, không phải chứng minh toán học “đủ mọi trường hợp”. Chưa xem toàn bộ hình/connector nhúng trong DOCX/PDF, chưa đối chiếu bản hợp đồng/SOW/báo giá ký thực tế độc lập (repository chủ yếu dẫn lại nội dung), chưa xác nhận tài khoản/gói/API bên ngoài hoặc mức đáp ứng phần mềm. Không truy cập web để thay phiên bản tài liệu khách đang rà soát; mô tả provider là thông tin **đã ghi trong repo**, cần kiểm chứng riêng nếu dùng để triển khai.

Chỉ mục văn bản giúp không bỏ quên nguồn; không được hiểu là mọi mệnh đề trong 128 tệp đã được xác thực. Cần khách/FutureCore xác nhận baseline cuối và phần hình/màn chưa thể kết luận từ text trước khi sign-off toàn bộ.

## 4. Truy vết 13 luồng gốc

Các chuỗi dưới đây đều còn điều kiện mở; xem dòng chi tiết trong file24. Dấu mũi tên là bàn giao cần có trong đặc tả, không nói phần mềm đã chạy.

| UC gốc v2 | Chuỗi và tác nhân | Điểm chặn nổi bật |
|---|---|---|
| UC-01 Chọn/đăng ký Talent | Talent T-01 → Manager M-03 → email/tài khoản → first login → folder | RV-15/27/30: TTL/resend, consent, eligibility và lỗi tạo tài nguyên |
| UC-02 Nhập hồ sơ/mục tiêu | Manager ChatGPT hoặc màn còn chờ → OneDrive/DB → snapshot → AI Core | RV-11/16/31: kênh nhập, completeness, ưu tiên/version và đồng bộ |
| UC-03 Bắt đầu sử dụng | Talent T-03/T-04/T-05 → payment/SNS → đủ điều kiện AI | RV-15/17: mốc active, provider profile, OAuth/TTL và phần thiếu |
| UC-04 Hội thoại/duy trì đăng | Talent T-07/T-08 ↔ AI Core → nhận xét/chủ đề/thử thách/nhắc | RV-14/21/23/30: challenge, ba khung, limits, safety và dữ liệu nguồn |
| UC-05 Xem nháp/gửi tư liệu | AI Core → T-09 → T-10/media → rewrite/edit → adopt → NG/approval | RV-01/05/13/25: giới hạn rewrite, gate, auto mode và media readiness |
| UC-06 Chuẩn bị video | Talent/office → xác nhận giá → video job hoặc kho → preview → nháp/lượt phí | RV-07/08/18: kết quả muộn, quyền làm thay, định dạng/AI label |
| UC-07 Duyệt bài công việc | Talent xin → Manager đúng quyền M-04/M-05 → approval/return/expiry → schedule | RV-04/05/26: identity, phiên bản, nơi nhận và người được hành động |
| UC-08 Hẹn và đăng SNS | Điều kiện đủ → Upload-Post → kết quả từng mạng → cancel/retry/stop | RV-02/03/17/18/19/20: quota, partial/unknown, hủy sát giờ và retry |
| UC-09 Xem kết quả/cải thiện | Provider → snapshots → export → T-06/T-13/M-08 → AI Core | RV-22/23: nguồn/freshness/null, goal/streak, dữ liệu muộn |
| UC-10 Manager theo dõi/đưa chỉ dẫn | M-06..M-10/M-13..M-15 → audit/nhóm/chỉ thị → AI Core → Talent | RV-09/10/11/26/33: quyền xem khác quyền duyệt, chỉ thị và audit |
| UC-11 Trả phí tháng | Talent T-15 → kỳ/lượt/giá → provider → kết quả/thu lại/ngừng | RV-06/07/20/24: kỳ thu, adjustment, unknown và exit có nợ |
| UC-12 Đăng tài khoản công ty | Manager tạo office → kết nối/hồ sơ → dùng luồng đăng → đếm nội bộ | RV-08/12/17: nơi thao tác còn No.66, không cho làm thay Talent thường |
| UC-13 Đổi trạng thái/kết thúc | Manager → ended → thu hồi quyền → hủy tác vụ → giữ6tháng → xóa/restore | RV-19/24/27/28: callback muộn, phạm vi xóa/email/backup và recovery |

**7 nhóm bổ sung ngoài 60 mã:** period auto, challenge, category/phân công, chỉ thị/preview/rollback, màn nhập/completeness hồ sơ, recovery, vận hành/restore/release. Đây là phân rã yêu cầu hiện có hoặc điều kiện vận hành, không tự thêm 7 tính năng thương mại.

## 5. Danh sách vấn đề có căn cứ

Mức HIGH: có thể thay đổi quyền, dòng tiền, điều kiện đăng/dừng, mô hình dữ liệu hoặc chặn nghiệp vụ chính nếu làm theo tài liệu hiện tại. MEDIUM: còn thiếu hành vi/AC/quan sát quan trọng, cần giải quyết trước khi nghiệm thu phần liên quan; không có nghĩa được bỏ qua.

### RV-01 — AC viết lại vượt giới hạn đã chốt

**HIGH · Mâu thuẫn đặc tả · G08**  
Chức năng: [4-2](../SCD/EP04_Tao_noi_dung_bai_dang/4-2_Yeu_cau_sua_va_viet_lai.md), [4-1](../SCD/EP04_Tao_noi_dung_bai_dang/4-1_Tu_tao_ban_nhap.md). Theo dõi: Q&A No.39 Close; S04-09.

- **Bằng chứng:** SCD 4-2 §Quy tắc giới hạn AI viết lại 2 lần, nhưng §Tiêu chí chấp nhận #4 yêu cầu 3 lần sửa tạo 3 phiên bản mới; biên bản 17/11 §1 và Q&A No.39 xác nhận tối đa 2 lần.
- **Ảnh hưởng:** Agent hoặc QA có thể triển khai/nghiệm thu vượt giới hạn và phát sinh chi phí.
- **Phương án sửa/điều kiện đóng:** Đồng bộ AC thành lần AI thứ ba bị từ chối; tách sửa tay, khôi phục phiên bản, lỗi AI và retry kỹ thuật khỏi bộ đếm; chốt khi nào một lần được coi là đã sử dụng.
- **Trade-off:** Đếm khi request hay khi thành công cần quyết định riêng; không mặc định mọi phiên bản đều tiêu thụ lượt AI.
- **Người xử lý:** Đội; khách nếu thay cách đếm

### RV-02 — Trần 3 bài/ngày còn tồn tại sau quyết định bỏ trần

**HIGH · Mâu thuẫn đặc tả · G08/G14**  
Chức năng: [8-4](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-4_Chong_bi_khoa_tai_khoan.md), [8-1](../SCD/EP07_Ket_qua_va_phan_tich/8-1_Phan_tich_gio_dang.md), [4-3](../SCD/EP04_Tao_noi_dung_bai_dang/4-3_Chap_nhan_ban_nhap.md). Theo dõi: A5; S06-03; Q&A No.56 Open.

- **Bằng chứng:** SCD 8-4 §Đề xuất #2/#5 vẫn dùng mặc định 3 bài/ngày; biên bản 17/11 §7 確認37 quyết không có trần số bài. SCD 8-1/4-3 còn khoảng cách 3 giờ.
- **Ảnh hưởng:** Hoãn/chặn bài ngoài ý khách; khoảng cách cứng cũng tạo giới hạn thực tế cần giải thích.
- **Phương án sửa/điều kiện đóng:** Bỏ trần nghiệp vụ cũ khỏi đặc tả có hiệu lực; tách quota/rate-limit của provider khỏi quy tắc sản phẩm; giữ khoảng cách/rải giờ là đề xuất chờ xác nhận ảnh hưởng.
- **Trade-off:** Không có trần sản phẩm không có nghĩa provider nhận vô hạn; UI cần lý do trì hoãn theo từng mạng.
- **Người xử lý:** Đội; khách xác nhận lịch No.56

### RV-03 — Một bài thành công một phần có hai kết quả tổng khác nhau

**HIGH · Mâu thuẫn trạng thái · G12/G15**  
Chức năng: [C-01](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-01_Bo_trang_thai.md), [8-3](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-3_Dang_len_3_mang_xa_hoi.md), [8-5](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-5_Thong_bao_khi_dang_loi.md), [6-7](../SCD/EP07_Ket_qua_va_phan_tich/6-7_So_lieu_va_muc_dat_cho_tai_nang.md). Theo dõi: S10-01; S06-05; Q&A No.51/59 Open.

- **Bằng chứng:** SCD 8-3 §Luồng chính #4: ít nhất một mạng thành công thì bài đã đăng; C-01 §1 và AC #3: IG thành công, TikTok lỗi thì bài là 失敗.
- **Ảnh hưởng:** Danh sách, báo lỗi, thống kê và lựa chọn đăng lại có thể hiểu khác nhau, dẫn đến đăng trùng mạng đã thành công.
- **Phương án sửa/điều kiện đóng:** Chốt bảng chiếu kết quả từng mạng → trạng thái tổng/nhãn UI, điều kiện retry và cách tính ngày có đăng; bổ sung partial/unknown ở tầng kỹ thuật nhưng không tự thay bộ trạng thái khách.
- **Trade-off:** Một trạng thái tổng đơn giản cần thêm nhãn/kết quả từng mạng để không mất thông tin.
- **Người xử lý:** Đội; khách duyệt cách hiển thị

### RV-04 — Trả lại rồi xin duyệt lại là bài cũ hay bài mới chưa thống nhất

**HIGH · Mâu thuẫn trạng thái · G08/G12**  
Chức năng: [C-01](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-01_Bo_trang_thai.md), [7-7](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-7_Duyet_bai_dang.md), [4-2](../SCD/EP04_Tao_noi_dung_bai_dang/4-2_Yeu_cau_sua_va_viet_lai.md), [4-3](../SCD/EP04_Tao_noi_dung_bai_dang/4-3_Chap_nhan_ban_nhap.md). Theo dõi: L22-11; Q&A No.58 Open.

- **Bằng chứng:** C-01 §1 ghi trả lại → hủy, sửa và chấp nhận lại thành bài mới; SCD 7-7 mô tả sửa rồi gửi lại nhưng không xác định identity; Q&A No.58 đề xuất giữ cùng bài, chưa trả lời.
- **Ảnh hưởng:** Mất lịch sử duyệt, reset sai lượt AI, dùng nhầm lịch hoặc quyết định duyệt cũ.
- **Phương án sửa/điều kiện đóng:** Chốt identity bài, phiên bản, approval request và giờ sau resubmit; mọi quyết định chỉ áp dụng đúng phiên bản; đồng bộ C-01 và AC.
- **Trade-off:** Giữ cùng bài thuận truy vết nhưng cần lịch sử/version; bài mới vẫn cần liên kết nguồn.
- **Người xử lý:** Khách No.58; đội thiết kế

### RV-05 — Nhánh sửa từ cấm có thể đi thẳng tới hẹn giờ, bỏ qua duyệt

**HIGH · Thiếu gate xuyên chức năng · G10/G12**  
Chức năng: [4-4](../SCD/EP04_Tao_noi_dung_bai_dang/4-4_Phat_hien_tu_cam.md), [7-7](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-7_Duyet_bai_dang.md), [4-3](../SCD/EP04_Tao_noi_dung_bai_dang/4-3_Chap_nhan_ban_nhap.md). Theo dõi: B5; L22-08/10; Q&A No.57/71 Open.

- **Bằng chứng:** SCD 4-4 AC #2/#3: sạch hoặc Manager sửa sạch thì hẹn giờ; chưa ràng buộc bài đã xin duyệt. File 22 yêu cầu quay lại gate, Q&A No.57 còn mở.
- **Ảnh hưởng:** Bài công việc có thể được gửi provider trước khi có quyết định duyệt hợp lệ.
- **Phương án sửa/điều kiện đóng:** Mọi đường sửa/AI rewrite/auto phải quay lại điều kiện chung: version sạch + quyền duyệt + trạng thái tài khoản + cờ dừng + media sẵn sàng. Không gộp sửa sạch thành duyệt nếu chưa được khách chấp nhận.
- **Trade-off:** Thêm bước xác nhận có thể tăng thời gian xử lý; cần chốt quyền và UX.
- **Người xử lý:** Khách No.57/71; đội

### RV-06 — Kỳ thu theo ngày đăng ký xung đột ngày 1 và video tháng trước

**HIGH · Mâu thuẫn tài chính · G16**  
Chức năng: [1-1](../SCD/EP08_Thu_phi/1-1_Thu_phi_thue_bao_thang.md), [5-4](../SCD/EP08_Thu_phi/5-4_Dem_so_lan_tao_video_va_thu_gop_voi_phi_thang.md), [C-01](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-01_Bo_trang_thai.md). Theo dõi: S08-02/05/06; Q&A No.4/49/53/62/63 Open.

- **Bằng chứng:** SCD 1-1 §Luồng chính A#3 tính kỳ từ ngày đăng ký; B#4 và AC#2 vẫn thu ngày 1, video tháng trước. SCD 5-4 #6 cũng theo tháng trước; biên bản §6 chờ provider xác nhận chu kỳ.
- **Ảnh hưởng:** Thu chồng/thiếu kỳ, sai tiền video, khó quyết toán khi nghỉ giữa kỳ.
- **Phương án sửa/điều kiện đóng:** Chốt timezone, kỳ [start,end), mốc phát sinh lượt, cutoff, lần thu đầu/cuối, thất bại và điều chỉnh; dùng các ví dụ 28–31/1, tháng 2, đổi giá, rời giữa kỳ làm AC.
- **Trade-off:** Một chu kỳ thống nhất dễ hiểu hơn; tách kỳ video và thuê bao cần đối soát và giải thích rõ.
- **Người xử lý:** Khách + provider; đội

### RV-07 — Timeout video bị coi là lỗi tài chính đã chắc chắn

**HIGH · Thiếu trạng thái chưa rõ kết quả · G11/G16/G19**  
Chức năng: [5-1](../SCD/EP05_Tu_lieu_va_video_AI/5-1_Tao_video.md), [5-3](../SCD/EP05_Tu_lieu_va_video_AI/5-3_Xem_va_xu_ly_video_da_tao.md), [5-4](../SCD/EP08_Thu_phi/5-4_Dem_so_lan_tao_video_va_thu_gop_voi_phi_thang.md), [C-04](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-04_Xu_ly_khi_dich_vu_ngoai_loi.md). Theo dõi: S05-08; L22-12; Q&A No.1 Close/62 Open.

- **Bằng chứng:** SCD 5-1 §Luồng lỗi và 5-4 #2: quá 15 phút thì lỗi/trả lượt. Chưa có contract kết quả thành công đến muộn sau khi đã hoàn lượt hoặc đã chốt hóa đơn. Hợp đồng unknown/outbox đã có trong database-design/07 §4.4 nhưng chưa nối vào SCD này.
- **Ảnh hưởng:** Có video hoàn tất nhưng miễn phí ngoài ý định, thu lại bất ngờ hoặc tạo lại tốn phí hai lần.
- **Phương án sửa/điều kiện đóng:** Tách timeout khỏi provider-failed; đối soát trước khi kết luận, quyết định quyền dùng kết quả muộn và điều chỉnh sau cutoff; tham chiếu contract có sẵn.
- **Trade-off:** Giữ pending/unknown lâu hơn cần UI và người đối soát; trả lượt sớm phải là chính sách được duyệt.
- **Người xử lý:** Đội; khách chốt xử lý tài chính

### RV-08 — Quyền làm thay đã thu hẹp nhưng AC và nơi thao tác còn trái nhau

**HIGH · Mâu thuẫn quyền/phạm vi · G02/G11/G16**  
Chức năng: [5-1](../SCD/EP05_Tu_lieu_va_video_AI/5-1_Tao_video.md), [6-3](../SCD/EP05_Tu_lieu_va_video_AI/6-3_Gui_anh_va_video.md), [9-1](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/9-1_Dang_bai_bang_tai_khoan_cong_ty.md), [1-2](../SCD/EP08_Thu_phi/1-2_Loai_tai_khoan.md). Theo dõi: A1/B8; Q&A No.20/43 Close; No.66 Open.

- **Bằng chứng:** SCD 5-1 AC#4 và 6-3 AC#4 vẫn nói Manager tạo/gửi thay Talent A; biên bản 確認27 và No.43 chỉ cho office. No.43 bản 17/11 còn hỏi nơi thao tác qua No.66, trong khi No.20/9-1 theo app Talent.
- **Ảnh hưởng:** Có thể mở quyền không được yêu cầu hoặc chọn sai màn/API; bảng câu hỏi A1 đã đóng quá sớm nếu hiểu bao gồm nơi thao tác mới.
- **Phương án sửa/điều kiện đóng:** Sửa AC quyền thành chỉ office; giữ khả năng xem/duyệt Talent thường riêng. Theo dõi A1 một phần và No.66 cho app hay quản trị; không tự khẳng định No.20 giải quyết bản cập nhật No.43.
- **Trade-off:** Dùng app office giảm màn; thao tác quản trị cần phạm vi, audit và quyền rõ hơn.
- **Người xử lý:** Đội; khách No.66

### RV-09 — Hội thoại Manager đã rõ nhưng tài liệu phạm vi DB vẫn hoãn

**HIGH · Mâu thuẫn baseline · G01/G19**  
Chức năng: [7-1](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/7-1_Xem_thong_tin_tai_nang.md), [3-4](../SCD/EP03_Huan_luyen_vien_AI/3-4_Tro_chuyen_voi_huan_luyen_vien_AI.md), [1-4](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/1-4_Dang_ky_duyet_don_va_dang_nhap.md). Theo dõi: A4; Q&A No.7 Close; CR-24.

- **Bằng chứng:** Q&A No.7 cập nhật 17/11 đã Close: Manager xem toàn bộ, Talent được báo trước; database-design/07 §2 vẫn ghi Manager xem hội thoại hoãn vì No.7/CR-24. File 22 mô tả cho xem.
- **Ảnh hưởng:** Một đội làm tính năng đọc, đội khác chặn; có thể bỏ consent hoặc nghiệm thu sai phạm vi.
- **Phương án sửa/điều kiện đóng:** Đồng bộ bảng scope/thiết kế với No.7 và thông báo lần đầu; CR-24 là phương án riêng tư không được chọn, không là lý do hoãn. Xác định phạm vi ghi log xem.
- **Trade-off:** Đã rõ quyền nghiệp vụ không chứng minh cơ chế đọc/audit đã sẵn sàng.
- **Người xử lý:** Đội

### RV-10 — Tài liệu có hai mô hình thực thi quyền đọc dữ liệu

**HIGH · Mâu thuẫn hợp đồng bảo mật · G19**  
Chức năng: [1-5](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/1-5_Nhan_dien_tai_nang.md), [7-6](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/7-6_Nhat_ky_xem_thong_tin.md), [C-03](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-03_Nhat_ky_thao_tac_va_xu_ly.md). Theo dõi: L22-12; database-design/07 §4.2.

- **Bằng chứng:** SCD 1-5 main#1 và AC#2 trông cậy RLS lọc theo user; database-design/07 §4.2 nói runtime policy USING(true), DB không lọc theo user, BE phải lọc owner; file18 đầu file nói FE không đọc DB.
- **Ảnh hưởng:** Agent tin RLS tự lọc có thể viết truy vấn thiếu owner. Đây là rủi ro từ tài liệu, chưa kết luận phần mềm rò dữ liệu.
- **Phương án sửa/điều kiện đóng:** Chọn và mô tả duy nhất trust boundary: xác minh phiên → tra actor → kiểm quyền/owner mọi đường API, job, file và callback; thay AC kiểm bật RLS bằng ca truy cập chéo dưới đúng quyền runtime.
- **Trade-off:** BE lọc phù hợp kiến trúc hiện mô tả nhưng cần kiểm thử đầy đủ, RLS-enabled riêng không chứng minh cách ly.
- **Người xử lý:** Đội kiến trúc

### RV-11 — Ưu tiên chỉ thị AI không nhất quán trong cùng SCD

**HIGH · Mâu thuẫn quy tắc AI · G03/G05**  
Chức năng: [3-1](../SCD/EP03_Huan_luyen_vien_AI/3-1_Hieu_tai_nang_va_thuat_toan.md), [2-1](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-1_Doc_thong_tin_tai_nang.md), [2-3](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-3_Nhap_thong_tin_tu_ChatGPT.md), [3-2](../SCD/EP03_Huan_luyen_vien_AI/3-2_Tu_cai_thien.md). Theo dõi: L22-03; S03-01; Q&A No.45 Close/74 Open.

- **Bằng chứng:** SCD 3-1 §Luồng chính xếp chỉ thị chung ở trên chỉ thị riêng; §Luồng lỗi lại ghi chỉ thị riêng ưu tiên chung. Chưa đưa category đầy đủ vào thứ tự; biên bản 確認6 giao đội đề xuất.
- **Ảnh hưởng:** AI có thể tạo kết quả khác nhau tùy agent chọn đoạn nào; preview khác production hoặc dùng chỉ thị sai nhóm.
- **Phương án sửa/điều kiện đóng:** Lập bảng ưu tiên gồm quy tắc an toàn, global, category, Talent, memory, nội dung không tin cậy; chốt nhiều category, đổi nhóm, thời điểm có hiệu lực, rollback và preview không tạo side effect.
- **Trade-off:** Ưu tiên cụ thể là thiết kế đội trình bày để xác nhận, không tự coi mọi điều trong prompt là luật hệ thống.
- **Người xử lý:** Đội; khách xác nhận hành vi

### RV-12 — Trạng thái Q&A Close chưa đồng nghĩa đã được phép triển khai toàn bộ

**HIGH · Thiếu quản trị thay đổi · G05/G20**  
Chức năng: [C-06](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-06_Quy_tac_chung_cua_man_hinh.md), [C-02](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-02_Cai_dat_do_quan_ly_tu_chinh.md), [4-2](../SCD/EP04_Tao_noi_dung_bai_dang/4-2_Yeu_cau_sua_va_viet_lai.md). Theo dõi: Q&A No.34 Open/39/44/45 Close; 保留 No.50 Open; CR-17–25.

- **Bằng chứng:** Sheet 追加要件 còn M trống/N chờ quyết định cho các CR; No.39 đã Close nghiệp vụ nhưng còn yêu cầu báo tác động và đồng ý trước khi làm. SCD/README §3 cho phép vàng bằng giả định, database-design/07 §1 lại cấm mở phần chưa chốt.
- **Ảnh hưởng:** Tự mở rộng phạm vi hoặc biến tham số/giả định thành phê duyệt thương mại.
- **Phương án sửa/điều kiện đóng:** Lưu riêng quyết định nghiệp vụ, thiết kế kỹ thuật, phạm vi/chi phí, quyền phát hành; dẫn quyết định mới khi thay CR cũ. Lập manifest đợt phát hành. No.34 và No.50 không được đóng bằng suy đoán.
- **Trade-off:** Quy trình thêm dấu vết quyết định nhưng tránh xây tính năng chưa được giao; không chặn phần độc lập đã chốt.
- **Người xử lý:** Chủ dự án/FutureCore + khách

### RV-13 — Đăng tự động theo khoảng chưa có hợp đồng trọn vòng đời

**HIGH · Thiếu đặc tả chức năng đã yêu cầu · G07/G09/G12**  
Chức năng: [4-1](../SCD/EP04_Tao_noi_dung_bai_dang/4-1_Tu_tao_ban_nhap.md), [4-3](../SCD/EP04_Tao_noi_dung_bai_dang/4-3_Chap_nhan_ban_nhap.md), [7-5](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-5_Dung_dang_tu_dong_toan_bo_hoac_tung_tai_nang.md), [C-01](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-01_Bo_trang_thai.md). Theo dõi: L22-07/08/09; Q&A No.51/70/71/77 Open.

- **Bằng chứng:** SCD 4-3 và C-01 tự ghi chưa có SCD riêng cho 自動投稿; biên bản §1 đã yêu cầu theme + media + period. Không thể dùng 60 mã SCD làm bằng chứng đã đủ chức năng.
- **Ảnh hưởng:** Không rõ tạo trước hay hằng ngày, dùng ảnh mấy lần, hết media, đổi mode, hết kỳ và stop/resume.
- **Phương án sửa/điều kiện đóng:** Sau trả lời No.70/71/77 viết use case riêng, state machine và màn/AC cho period, bài con, media reservation, hết kỳ và thao tác đồng thời; tách mode khỏi cờ dừng vận hành.
- **Trade-off:** Có entity/luồng mới cần rà soát thiết kế tiếp; không ép qua 採用 của 要確認.
- **Người xử lý:** Khách + đội

### RV-14 — Thử thách còn dựa AI tự đánh giá, thiếu quy tắc kiểm được

**HIGH · Thiếu trạng thái và oracle · G07/G15**  
Chức năng: [3-7](../SCD/EP03_Huan_luyen_vien_AI/3-7_Thong_bao_khi_dat_muc_tieu.md), [3-4](../SCD/EP03_Huan_luyen_vien_AI/3-4_Tro_chuyen_voi_huan_luyen_vien_AI.md), [6-7](../SCD/EP07_Ket_qua_va_phan_tich/6-7_So_lieu_va_muc_dat_cho_tai_nang.md). Theo dõi: B12; L22-06; Q&A No.72 Open.

- **Bằng chứng:** SCD 3-7 main#4 nhờ AI đánh giá thử thách; biên bản §2 yêu cầu AI đề xuất, Talent nhận/từ chối, không cần duyệt; chưa có SCD trọn vòng đời nhận/từ chối/hết hạn và quy tắc đếm đã được chốt.
- **Ảnh hưởng:** Cùng dữ liệu có thể báo đạt khác nhau; lẫn chuỗi ngày, mục tiêu follower và thử thách.
- **Phương án sửa/điều kiện đóng:** Khách xác định điều kiện/chu kỳ và vai trò AI; đội mô tả accepted/rejected/active/completed/expired, nguồn bằng chứng và cách sửa khi dữ liệu muộn; tách lời văn AI khỏi tính toán có thể kiểm.
- **Trade-off:** Không tự mặc định một challenge hoạt động hay reset streak nếu chưa chốt No.72.
- **Người xử lý:** Khách No.72 + đội

### RV-15 — Activation nhiều bước chưa có kết quả bù trừ được thống nhất

**HIGH · Thiếu orchestration xuyên module · G02/G03/G16/G19**  
Chức năng: [6-2](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/6-2_Huong_dan_lan_dau_va_ket_noi_mang_xa_hoi.md), [1-1](../SCD/EP08_Thu_phi/1-1_Thu_phi_thue_bao_thang.md), [2-2](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-2_Tao_thu_muc_rieng_cho_tai_nang.md), [8-2](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-2_Ket_noi_dich_vu_dang_bai.md), [7-3](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/7-3_Doi_trang_thai_tai_nang.md). Theo dõi: S01-01; L22-01/12; Q&A No.52/53/54 Open.

- **Bằng chứng:** 6-2/1-1/2-2/8-2 nối đăng ký payment → in_use → folder → profile; file22 thêm điều kiện hồ sơ. Chưa có bảng duy nhất nói khi payment xong nhưng folder/profile lỗi thì Talent dùng phần nào và ai phục hồi.
- **Ảnh hưởng:** Thu tiền nhưng kẹt onboarding, mở AI thiếu hồ sơ, callback lặp tạo tài nguyên trùng hoặc tính phí khi chưa sẵn sàng.
- **Phương án sửa/điều kiện đóng:** Lập eligibility matrix payment/profile/folder/SNS/consent/account type; trạng thái từng bước, retry idempotent, chặn đúng chức năng và hành động Manager/ops; chốt mốc tính phí riêng.
- **Trade-off:** Nhiều trạng thái bước dễ quan sát hơn một cờ active; không phải mọi lỗi cần hoàn tiền hoặc rollback thanh toán.
- **Người xử lý:** Khách No.52–54; đội

### RV-16 — Fallback hồ sơ cũ đã có đề xuất nhưng thiếu giới hạn và nguồn bản chính

**HIGH · Thiếu contract dữ liệu · G03/G05**  
Chức năng: [2-1](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-1_Doc_thong_tin_tai_nang.md), [2-3](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-3_Nhap_thong_tin_tu_ChatGPT.md), [2-4](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-4_Dang_ky_muc_tieu.md), [3-2](../SCD/EP03_Huan_luyen_vien_AI/3-2_Tu_cai_thien.md), [8-8](../SCD/EP07_Ket_qua_va_phan_tich/8-8_Ghi_so_lieu_vao_file.md). Theo dõi: S02-04/05/07; L22-01/03; Q&A No.22 Close/54 Open.

- **Bằng chứng:** 2-1 cho dùng snapshot gần nhất khi Graph lỗi và tự cắt file; 2-4 DB là bản chính mục tiêu còn hồ sơ do ChatGPT/OneDrive ghi; hướng dẫn OneDrive có schema/eTag nhưng chưa chốt mức cũ cho từng loại dữ liệu và kích hoạt hồ sơ.
- **Ảnh hưởng:** AI có thể dùng chỉ thị đã bị sửa/xóa, cắt mất phần quan trọng, ghi đè mục tiêu hoặc không biết snapshot nào đang hiệu lực.
- **Phương án sửa/điều kiện đóng:** Theo từng loại dữ liệu định nghĩa source of truth, version/etag, valid/empty/missing, giới hạn tuổi cache, conflict và hiển thị stale; thay cắt im lặng bằng validation hoặc quyết định có căn cứ.
- **Trade-off:** Chặn dữ liệu quá cũ giảm khả dụng; tiếp tục bằng snapshot cần cảnh báo và giới hạn được duyệt.
- **Người xử lý:** Đội; khách xác nhận ảnh hưởng

### RV-17 — Flow nối SNS 48 giờ và OAuth 15 phút chưa được đồng bộ

**HIGH · Mâu thuẫn tích hợp · G02/G13/G19**  
Chức năng: [8-2](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-2_Ket_noi_dich_vu_dang_bai.md), [6-2](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/6-2_Huong_dan_lan_dau_va_ket_noi_mang_xa_hoi.md). Theo dõi: S06-02; Q&A No.23/66 Open; Upload-Post Q01–04/Q09.

- **Bằng chứng:** SCD 8-2 dùng hosted link 48 giờ và xóa profile khi nghỉ; guide Upload-Post §6.2 chọn Connect API 15 phút có Q02 cần chấp thuận; §10.4 không tự xóa profile ngay. Guide đã có xử lý account switch, nhưng SCD chưa nối cùng lifecycle.
- **Ảnh hưởng:** Sai UX, TTL, quota hoặc mất chứng cứ/lịch khi xóa provider profile trước đối soát.
- **Phương án sửa/điều kiện đóng:** Chốt adapter/UI và gói thực tế; đồng bộ TTL, lifecycle profile, reconnect cùng/khác remote ID, lịch cũ, duplicate SNS giữa Talent; tham chiếu contract kỹ thuật đã có.
- **Trade-off:** Chọn lại hosted page có thể giảm UI nhưng cần đánh giá hạn chế; không gọi khác biệt TTL là lỗi provider.
- **Người xử lý:** Đội + khách; provider POC

### RV-18 — Thiếu đầu vào bắt buộc của SNS trong đường đăng và màn hình

**HIGH · Thiếu contract xuất bản · G11/G14/G20**  
Chức năng: [8-3](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-3_Dang_len_3_mang_xa_hoi.md), [5-5](../SCD/EP05_Tu_lieu_va_video_AI/5-5_Ghi_ro_video_do_AI_tao.md), [6-6](../SCD/EP04_Tao_noi_dung_bai_dang/6-6_Xem_truoc_bai_dang.md). Theo dõi: B3/C3; Upload-Post Q05/Q15; S05-10.

- **Bằng chứng:** Upload-Post guide §8.4a/§18 Q15 tự ghi privacy, trẻ em, tài trợ, nhạc/AI chưa biết nhập ở đâu; SCD 6-6 chỉ xem media/caption/mạng. Guide B04 và §19 còn ràng buộc chọn nội dung/sửa qua AI cũ, khác mode auto và sửa tay đã chốt.
- **Ảnh hưởng:** Payload thiếu lựa chọn người dùng hoặc tự suy đoán; luồng auto và office có thể không tương thích điều kiện tích hợp đã ghi.
- **Phương án sửa/điều kiện đóng:** Lập capability matrix theo account/media/network và input/consent từng màn; chặn trường hợp thiếu lựa chọn; provider xác nhận trách nhiệm và tương thích mode auto/office. Đồng bộ B04 và hướng dẫn giao việc.
- **Trade-off:** Có thể phải thu hẹp một số đường đăng khi chưa kiểm chứng; không dùng nhãn text thay native label mặc định.
- **Người xử lý:** Đội + provider; khách về UX/phạm vi

### RV-19 — SCD hủy/dừng khẳng định thành công trước khi có đối soát

**HIGH · Mâu thuẫn điều kiện kết thúc · G13/G17/G19**  
Chức năng: [7-2](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-2_Xem_va_huy_bai_dang.md), [7-5](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-5_Dung_dang_tu_dong_toan_bo_hoac_tung_tai_nang.md), [7-3](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/7-3_Doi_trang_thai_tai_nang.md). Theo dõi: L22-09/12; Q&A No.60/61/77 Open; Upload-Post Q08.

- **Bằng chứng:** SCD 7-2 main#4 và 7-5 #2 chuyển đã hủy sau lệnh gọi; guide Upload-Post §10 có cancel_requested/outcome_unknown, xử lý stop chưa hết và không kịp hủy.
- **Ảnh hưởng:** Manager tin đã dừng hết nhưng bài vẫn xuất bản, callback muộn hồi sinh lịch; khó truy trách nhiệm.
- **Phương án sửa/điều kiện đóng:** Đưa kết quả pending/confirmed/too_late vào hợp đồng UI và AC; chặn lịch mới trước, quét lại tác vụ đang bay, xác nhận từng mạng; nút resume không bỏ qua cờ stop khác.
- **Trade-off:** Không hứa thu hồi bài đã live; UX cần hiển thị kết quả một phần và đường xử lý thủ công.
- **Người xử lý:** Đội + khách No.77/Q08

### RV-20 — Quy tắc retry chung chưa nối với side effect của từng dịch vụ

**HIGH · Thiếu đồng bộ recovery · G19**  
Chức năng: [C-04](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-04_Xu_ly_khi_dich_vu_ngoai_loi.md), [C-03](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-03_Nhat_ky_thao_tac_va_xu_ly.md), [1-1](../SCD/EP08_Thu_phi/1-1_Thu_phi_thue_bao_thang.md), [5-1](../SCD/EP05_Tu_lieu_va_video_AI/5-1_Tao_video.md), [8-3](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-3_Dang_len_3_mang_xa_hoi.md). Theo dõi: L22-12; I8; database-design/07 §4.4; Upload-Post §9–12.

- **Bằng chứng:** C-04 main#1 nói mọi gọi ngoài retry backoff; database-design/07 và Upload-Post đã có operation/outbox, lease, unknown và reconcile. Billing/video/email chưa có một bảng áp dụng thống nhất cùng UI/manual recovery.
- **Ảnh hưởng:** Đọc lại an toàn bị lẫn với tạo video/thu tiền/đăng lại; worker crash sau side effect có thể tạo trùng.
- **Phương án sửa/điều kiện đóng:** Lập bảng mỗi operation: khóa idempotency, trạng thái, evidence, giới hạn retry, unknown, đối soát, bù trừ, người được resolve; tham chiếu thiết kế hiện có, không phát minh hàng đợi thứ hai.
- **Trade-off:** Không đảm bảo exactly-once ở mọi provider; có trường hợp phải chờ người đối soát.
- **Người xử lý:** Đội tích hợp/vận hành

### RV-21 — Chat đa thiết bị và stream dở chưa có quy tắc hội thoại đầy đủ

**MEDIUM · Thiếu trường hợp đồng thời · G06/G08/G19**  
Chức năng: [3-4](../SCD/EP03_Huan_luyen_vien_AI/3-4_Tro_chuyen_voi_huan_luyen_vien_AI.md), [4-1](../SCD/EP04_Tao_noi_dung_bai_dang/4-1_Tu_tao_ban_nhap.md), [4-2](../SCD/EP04_Tao_noi_dung_bai_dang/4-2_Yeu_cau_sua_va_viet_lai.md), [3-5](../SCD/EP03_Huan_luyen_vien_AI/3-5_Quan_ly_chi_phi_AI.md). Theo dõi: S03-09; L22-04/12.

- **Bằng chứng:** SCD 3-4 khóa nút gửi khi câu trước chưa xong nhưng đó chỉ là một màn; lỗi giữ tin và cho gửi lại. Chưa xác định tin stream dở, hai máy nhắn/chọn chủ đề, reconnect và tính usage/rewrite khi retry.
- **Ảnh hưởng:** Thứ tự context khác nhau, nhiều bản nháp cho một lựa chọn hoặc ghi trùng chi phí.
- **Phương án sửa/điều kiện đóng:** Định nghĩa message/command identity, terminal state của response, thứ tự xử lý, retry cùng command, lấy lại response, phân biệt UI đã nhận và server đã lưu.
- **Trade-off:** Tuần tự theo hội thoại dễ hiểu nhưng giảm song song; không khóa toàn tài khoản quá lâu.
- **Người xử lý:** Đội

### RV-22 — Mốc follower đã có trong Q&A nhưng SCD vẫn đề xuất bỏ

**MEDIUM · Mâu thuẫn thông báo · G15/G18**  
Chức năng: [3-7](../SCD/EP03_Huan_luyen_vien_AI/3-7_Thong_bao_khi_dat_muc_tieu.md), [C-05](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-05_Danh_muc_thong_bao.md), [2-4](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-4_Dang_ky_muc_tieu.md). Theo dõi: A7; Q&A No.14 Close.

- **Bằng chứng:** Q&A No.14 thiết kế mốc 25/50/75% rồi xác nhận trên màn; SCD 3-7 main#3 và §Quy tắc vẫn không gửi riêng/bỏ フォロワーの増加; file22 lại thể hiện các mốc.
- **Ảnh hưởng:** Thiếu thông báo đã dự kiến, hoặc báo lặp khi đổi mục tiêu, follower giảm/tăng và dữ liệu muộn.
- **Phương án sửa/điều kiện đóng:** Đồng bộ loại/mốc, giữ nhãn đề xuất chờ xác nhận UI; chốt goal version, khi nhảy qua nhiều mốc, đổi goal và backfill có báo không.
- **Trade-off:** Nhiều mốc dễ gây nhiều tin; gộp thông báo phải được chốt, không tự bỏ.
- **Người xử lý:** Đội; khách xác nhận UI

### RV-23 — Metrics có contract kỹ thuật nhưng oracle cuối chuỗi còn thiếu

**MEDIUM · Thiếu truy vết dữ liệu · G03/G15**  
Chức năng: [8-7](../SCD/EP07_Ket_qua_va_phan_tich/8-7_Lay_so_lieu.md), [8-8](../SCD/EP07_Ket_qua_va_phan_tich/8-8_Ghi_so_lieu_vao_file.md), [8-9](../SCD/EP07_Ket_qua_va_phan_tich/8-9_Lay_khung_gio_tuong_tac.md), [8-1](../SCD/EP07_Ket_qua_va_phan_tich/8-1_Phan_tich_gio_dang.md), [3-6](../SCD/EP03_Huan_luyen_vien_AI/3-6_Nhan_xet_bai_hom_truoc_va_goi_y_cai_thien.md), [3-8](../SCD/EP03_Huan_luyen_vien_AI/3-8_Tong_ket_tuan.md), [3-10](../SCD/EP07_Ket_qua_va_phan_tich/3-10_Hien_thi_so_nguoi_theo_doi.md), [6-7](../SCD/EP07_Ket_qua_va_phan_tich/6-7_So_lieu_va_muc_dat_cho_tai_nang.md). Theo dõi: L22-06/13; S07-01–09; Upload-Post Q07.

- **Bằng chứng:** Guide Upload-Post §11 phân biệt null/captured_at/unavailable_reason/confidence; SCD 6-7 cộng metric các mạng và 3-8 lấy ngày gần nhất; chưa ràng buộc freshness/cửa sổ/nguồn thống nhất tới export, biểu đồ, AI, streak và bài ngoài hệ thống.
- **Ảnh hưởng:** Hiểu dữ liệu thiếu thành 0, cộng chỉ số khác định nghĩa, nhận xét sai hoặc nhắc không đăng nhầm.
- **Phương án sửa/điều kiện đóng:** Bảng lineage từng metric: định nghĩa, nguồn, timezone/event time, độ mới, null, dedupe ngoài hệ thống, sửa snapshot muộn và cách dùng trong AI; nối guide vào AC từng consumer.
- **Trade-off:** Không thể cam kết cùng metric cho mọi mạng; phải hiển thị phần không hỗ trợ.
- **Người xử lý:** Đội + provider POC; khách về hiển thị

### RV-24 — Xóa sau 6 tháng chưa khép kín với backup, nợ và callback muộn

**HIGH · Thiếu vòng đời dữ liệu · G17/G19**  
Chức năng: [7-3](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/7-3_Doi_trang_thai_tai_nang.md), [2-2](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/2-2_Tao_thu_muc_rieng_cho_tai_nang.md), [C-03](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-03_Nhat_ky_thao_tac_va_xu_ly.md), [C-04](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-04_Xu_ly_khi_dich_vu_ngoai_loi.md), [1-1](../SCD/EP08_Thu_phi/1-1_Thu_phi_thue_bao_thang.md). Theo dõi: L22-14; S01-03/09; Q&A No.29 Close/69 Open; I8.

- **Bằng chứng:** Biên bản §5 và SCD 7-3 yêu cầu xóa không khôi phục; No.69 còn mở phạm vi. Chưa có bảng cuối cùng cho Auth, OneDrive, ChatGPT/project, provider, log/evidence, hóa đơn và dữ liệu khôi phục từ backup.
- **Ảnh hưởng:** Xóa thiếu/làm sống lại dữ liệu đã xóa, xóa chứng cứ trước quyết toán hoặc job muộn tái tạo tài nguyên.
- **Phương án sửa/điều kiện đóng:** Lập deletion manifest, ended_at/deletion_due, điểm chặn job, xác nhận từng kho, tombstone tối thiểu nếu được duyệt; restore phải áp lại deletion ledger trước mở hệ thống; chốt email đăng ký lại.
- **Trade-off:** Giữ evidence/tombstone hay hóa đơn lâu hơn phải có quyết định phạm vi riêng; không tự đặt thời hạn pháp lý.
- **Người xử lý:** Khách No.69; đội vận hành

### RV-25 — Quota lưu trữ và xóa tư liệu đang được tham chiếu chưa đủ policy

**MEDIUM · Thiếu vận hành lưu trữ · G11/G17/G19**  
Chức năng: [6-3](../SCD/EP05_Tu_lieu_va_video_AI/6-3_Gui_anh_va_video.md), [6-4](../SCD/EP05_Tu_lieu_va_video_AI/6-4_Luu_tu_lieu.md), [5-3](../SCD/EP05_Tu_lieu_va_video_AI/5-3_Xem_va_xu_ly_video_da_tao.md), [4-3](../SCD/EP04_Tao_noi_dung_bai_dang/4-3_Chap_nhan_ban_nhap.md). Theo dõi: C2; S05-02/03; Q&A No.8/55/70 Open.

- **Bằng chứng:** Biên bản action9 chờ xử lý đầy OneDrive; guide có ONEDRIVE_QUOTA_EXCEEDED và SCD 6-4 giữ bản tạm theo bài cuối/auto period, nhưng chưa khép kín xóa tay trên OneDrive, quota cả kho và media đang giữ cho job/lịch.
- **Ảnh hưởng:** Lịch không tải được file, xóa nhầm tư liệu dùng chung, tiếp nhận upload vô hạn khi bản chính đầy.
- **Phương án sửa/điều kiện đóng:** Định nghĩa ready/transferring/missing, reference/reservation, ngưỡng quota/cảnh báo, đường cleanup và phục hồi khi Manager xóa file; không xóa theo tuổi đơn thuần khi còn tham chiếu.
- **Trade-off:** Giữ media đến kết thúc mọi job tăng chi phí; chặn upload cần thông báo rõ và người xử lý.
- **Người xử lý:** Đội; khách về retention/quota

### RV-26 — Recipient, quyền duyệt, read và handled chưa phải cùng một khái niệm

**HIGH · Thiếu hợp đồng thông báo/quyền · G04/G18**  
Chức năng: [7-4](../SCD/EP09_Thong_bao_va_nen_tang_PWA/7-4_Danh_sach_thong_bao_cho_quan_ly.md), [7-7](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/7-7_Duyet_bai_dang.md), [6-1](../SCD/EP09_Thong_bao_va_nen_tang_PWA/6-1_Tin_nhan_trong_ung_dung_va_thong_bao_day.md), [C-05](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-05_Danh_muc_thong_bao.md). Theo dõi: L22-02/15; A6; S09-02/03; Q&A No.6/75/76 Open.

- **Bằng chứng:** No.6 đã có hướng Manager phụ trách nhưng fallback còn Open; SCD 7-4 main#2 dùng thông báo chung/trừ duyệt và #5 dùng handled chung. Chưa rõ ai có thể duyệt sau đổi người phụ trách, thông báo cũ, read từng người và email nhạy cảm.
- **Ảnh hưởng:** Lộ nội dung qua email/push, người không phụ trách vẫn duyệt hoặc yêu cầu bị bỏ quên khi đổi phân công.
- **Phương án sửa/điều kiện đóng:** Bảng event → recipients → viewers → action permissions → channel → deep link → handled transition; quy định reassign, vô hiệu Manager, fallback, thời hạn và chống spam.
- **Trade-off:** Gửi rộng tránh bỏ sót nhưng tăng tiết lộ; email là scope riêng, không đồng nghĩa chọn SMTP.
- **Người xử lý:** Khách No.6/75/76 + đội

### RV-27 — Recovery tài khoản còn thiếu điều kiện vận hành được xác nhận

**HIGH · Thiếu luồng khôi phục · G01/G19**  
Chức năng: [1-4](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/1-4_Dang_ky_duyet_don_va_dang_nhap.md), [1-6](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/1-6_Dang_nhap_va_quyen_cua_quan_ly.md), [6-8](../SCD/EP09_Thong_bao_va_nen_tang_PWA/6-8_Nen_tang_PWA.md). Theo dõi: L22-16; S01-05/06; Q&A No.65/67 Open.

- **Bằng chứng:** SCD 1-6 đề xuất quản lý khác reset TOTP và chặn quản lý cuối; No.67 chưa trả lời. SCD 1-4 giả định mật khẩu tạm 7 ngày/quên mật khẩu; chưa khép kín TTL/resend, recovery cấp quyền, thu hồi phiên trên thiết bị và audit.
- **Ảnh hưởng:** Khóa toàn bộ quản trị hoặc reset MFA không có quy trình xác minh; liên kết cũ/phien cũ tiếp tục dùng ngoài kỳ vọng.
- **Phương án sửa/điều kiện đóng:** Viết runbook tạo Manager đầu/cuối, mất mọi MFA, kiểm chứng người yêu cầu, cấp quyền tối thiểu, recovery audit và thu hồi phiên; đồng bộ reset/invite với màn thiếu, không vô hiệu MFA để chữa tạm.
- **Trade-off:** Recovery có kiểm soát tăng thời gian hỗ trợ; không tự tạo super-admin nghiệp vụ mới.
- **Người xử lý:** Khách No.65/67; đội

### RV-28 — Chỉ tiêu vận hành, khôi phục và không ảnh hưởng hệ thống cũ chưa kiểm được

**HIGH · Thiếu NFR/AC vận hành · G19/G20**  
Chức năng: [C-04](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-04_Xu_ly_khi_dich_vu_ngoai_loi.md), [C-03](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-03_Nhat_ky_thao_tac_va_xu_ly.md), [C-06](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-06_Quy_tac_chung_cua_man_hinh.md). Theo dõi: I1/I6/I8; Q&A No.24 Open; YK2 §9/12.

- **Bằng chứng:** YK2 §9.2–9.4 và Phan_tich/09 còn khung hoạt động, backup, retention, tải đồng thời, thời gian đáp ứng; file18 có đề xuất/cảnh báo nhưng chưa có bộ ngưỡng được duyệt và restore drill/không ảnh hưởng InstagramDM.
- **Ảnh hưởng:** Không có chuẩn pass/fail khi queue trễ, VPS chết, restore, hết quota hoặc tài nguyên dùng chung ảnh hưởng ứng dụng đang chạy.
- **Phương án sửa/điều kiện đóng:** Đội đề xuất SLO, RPO/RTO, tải/ngưỡng và runbook; khách xác nhận cam kết. Gắn test plan morning batch, per-provider outage, queue backlog, restore, rollback và isolation tài nguyên.
- **Trade-off:** SLO cao làm tăng hạ tầng/chi phí; chưa có số thì không tự ghi 99.9% hay zero downtime.
- **Người xử lý:** Đội vận hành + khách về cam kết

### RV-29 — Đếm đủ chức năng chưa chứng minh bao phủ requirement và ngoại lệ

**MEDIUM · Thiếu quản trị AC/test · G20**  
Chức năng: [C-05](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-05_Danh_muc_thong_bao.md), [C-06](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-06_Quy_tac_chung_cua_man_hinh.md), [C-01](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-01_Bo_trang_thai.md). Theo dõi: A10; L22-16; SCD/README §3/§6.

- **Bằng chứng:** SCD/README tổng hợp 54 nhưng thực có 60 tệp kể cả 6 chức năng chung; §3 nói không chức năng đạt R8 gốc, các SCD có AC đề xuất nhưng chưa có ma trận có ID và phê duyệt tới từng ngoại lệ. C-05 chưa có mục AC riêng.
- **Ảnh hưởng:** Bỏ sót chức năng không có mã, hoặc coi đã có tiêu đề/AC là đã khách chấp nhận/đã kiểm thử.
- **Phương án sửa/điều kiện đóng:** Dùng ma trận file24 và scenario file25; tách AC hiện hữu/AC đề xuất/được khách duyệt/kết quả chạy. Thêm truy vết phần auto, category, chỉ thị, challenge, recovery và vận hành.
- **Trade-off:** Ma trận cần duy trì theo thay đổi; không biến số lượng case thành tỷ lệ coverage hành vi.
- **Người xử lý:** Đội BA/QA

### RV-30 — Quyền nội dung, đồng ý và dữ liệu gửi AI chưa có quy trình cuối

**HIGH · Thiếu điều kiện trước nghiệp vụ · G01/G06/G11/G19**  
Chức năng: [1-4](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/1-4_Dang_ky_duyet_don_va_dang_nhap.md), [3-1](../SCD/EP03_Huan_luyen_vien_AI/3-1_Hieu_tai_nang_va_thuat_toan.md), [3-3](../SCD/EP03_Huan_luyen_vien_AI/3-3_Gioi_han_chu_de_tro_chuyen.md), [6-3](../SCD/EP05_Tu_lieu_va_video_AI/6-3_Gui_anh_va_video.md), [5-5](../SCD/EP05_Tu_lieu_va_video_AI/5-5_Ghi_ro_video_do_AI_tao.md). Theo dõi: S01-10; S03-02/03/04; YK2 §10.2–10.3/§11/§14.4.

- **Bằng chứng:** YK2 §11 để cách xác nhận quyền nội dung/tư liệu ở bản cuối; No.18 chỉ giao nội dung quy tắc dưới 18 tuổi cho khách, không đóng quy trình chuyện nghiêm trọng. SCD 3-3 khi classifier lỗi trả lời thường; bộ 50 câu/90% là đề xuất, chưa là policy được duyệt.
- **Ảnh hưởng:** Đăng tư liệu không rõ quyền, đưa thông tin nhạy cảm không cần thiết vào context/log, bỏ sót hoặc gửi sai cảnh báo nghiêm trọng.
- **Phương án sửa/điều kiện đóng:** Xác định bước/ai xác nhận quyền nội dung và điều khoản; khách cung cấp policy/copy, đội mô tả tối thiểu dữ liệu AI, fallback classifier, recipient/privacy, chống prompt injection từ file/news và phép sửa memory. Test bằng dữ liệu giả.
- **Trade-off:** Đây là yêu cầu làm rõ từ tài liệu, không kết luận tuân thủ pháp lý hay đảm bảo AI phân loại tuyệt đối.
- **Người xử lý:** Khách cung cấp policy; đội BA/AI/security

### RV-31 — Màn hình có mã chưa đủ hợp đồng trường dữ liệu và lỗi

**MEDIUM · Thiếu đặc tả UI · G01/G07/G09/G15/G20**  
Chức năng: [C-06](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-06_Quy_tac_chung_cua_man_hinh.md), [6-8](../SCD/EP09_Thong_bao_va_nen_tang_PWA/6-8_Nen_tang_PWA.md), [6-6](../SCD/EP04_Tao_noi_dung_bai_dang/6-6_Xem_truoc_bai_dang.md), [6-7](../SCD/EP07_Ket_qua_va_phan_tich/6-7_So_lieu_va_muc_dat_cho_tai_nang.md). Theo dõi: A10/B13; L22-16; Q&A No.30/68 Close/70–74 Open.

- **Bằng chứng:** AG có 34 mã T/M; thiết kế style cũ dùng mã khác. No.68 giao FutureCore màn định nghĩa; file22 ghi chưa có mã riêng cho reset/period/challenge/biểu đồ. Thiếu bảng validation, lỗi, empty/loading/recovery theo màn.
- **Ảnh hưởng:** Đúng màn nhưng không nhập đủ dữ liệu để chạy; không biết tiếp tục từ đâu sau lỗi hoặc hết phiên.
- **Phương án sửa/điều kiện đóng:** Đội lập screen contract và crosswalk mã cũ→chuẩn, thêm nhánh chưa có màn là pending chứ không tự đặt mã khách mới; ghi unsaved changes, expiry, offline/update và lỗi deep link.
- **Trade-off:** Một số nhánh có thể là modal/thẻ thay màn mới; phải được thể hiện và nghiệm thu.
- **Người xử lý:** FutureCore/đội; khách duyệt UX

### RV-32 — Điều kiện tài khoản ngoài và nghiệm thu từng đợt chưa có manifest cuối

**HIGH · Thiếu readiness vận hành · G14/G16/G19/G20**  
Chức năng: [8-2](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-2_Ket_noi_dich_vu_dang_bai.md), [8-3](../SCD/EP06_Phe_duyet_va_dang_len_mang_xa_hoi/8-3_Dang_len_3_mang_xa_hoi.md), [8-9](../SCD/EP07_Ket_qua_va_phan_tich/8-9_Lay_khung_gio_tuong_tac.md), [1-1](../SCD/EP08_Thu_phi/1-1_Thu_phi_thue_bao_thang.md), [5-1](../SCD/EP05_Tu_lieu_va_video_AI/5-1_Tao_video.md). Theo dõi: I2/I3/I4/I5; Upload-Post §15; YK2 §8/§12.1–12.4.

- **Bằng chứng:** YK2 cho hoãn riêng tích hợp chưa xong hợp đồng/xét duyệt; guide Upload-Post có UP-K01〜K11/điều kiện gói và OneDrive có ca MT chưa chạy. Tài liệu có checklist nhưng chưa có manifest đã ký cho đợt, tài khoản, vùng, quota và bằng chứng được nghiệm thu.
- **Ảnh hưởng:** Bị hiểu rằng tài liệu API/giả lập đủ để phát hành; thiếu dịch vụ khiến chuỗi đã bán không chạy được.
- **Phương án sửa/điều kiện đóng:** Lập release manifest từng chuỗi: scope quyết định, dependency, tài khoản/gói/consent, POC evidence, AC pass/fail, owner và đường tắt/ẩn nếu hoãn; không chạy provider thật trong cuộc rà soát tài liệu này.
- **Trade-off:** Phát hành từng phần có thể hợp lý nhưng cần chấp nhận phạm vi rõ, không giấu tính năng chặn.
- **Người xử lý:** Chủ dự án + khách + đội tích hợp

### RV-33 — Nhật ký xem và lỗi ghi log chưa đồng bộ về khả dụng/retention

**MEDIUM · Thiếu quyết định vận hành · G17/G19**  
Chức năng: [7-6](../SCD/EP01_Danh_tinh_va_quyen_truy_cap/7-6_Nhat_ky_xem_thong_tin.md), [C-03](../SCD/EP10_Nen_tang_chung_va_quan_tri_he_thong/C-03_Nhat_ky_thao_tac_va_xu_ly.md), [7-1](../SCD/EP02_Thong_tin_tai_nang_va_nguon_du_lieu_cho_AI/7-1_Xem_thong_tin_tai_nang.md). Theo dõi: S01-09; S10-02; Q&A No.21/29 Close; I8.

- **Bằng chứng:** SCD 7-6 §Luồng lỗi: không ghi log thì không hiện dữ liệu; retention mặc định không xóa. C-03 chỉ append trừ expiry; No.29 giao đội thiết kế retention; chưa có thống nhất log xem bắt buộc, log kỹ thuật, xóa Talent và fail-closed theo loại.
- **Ảnh hưởng:** Sự cố log có thể khóa toàn bộ Manager đọc; giữ vô hạn mâu thuẫn hướng xóa dữ liệu nếu không tách loại/thời hạn.
- **Phương án sửa/điều kiện đóng:** Đội định nghĩa data class, quyền xem, retention và fail-open/closed từng hành động; với log xem bắt buộc giữ nguyên chặn khi thất bại, kèm hỗ trợ/cảnh báo; phân biệt lỗi audit và lỗi đẩy observability.
- **Trade-off:** Fail-closed bảo vệ truy vết nhưng giảm khả dụng; đổi chính sách phải xác nhận vì ảnh hưởng cam kết.
- **Người xử lý:** Đội vận hành/security; khách nếu đổi hành vi

## 6. Hành động sau rà soát

| Nhóm việc | Làm cụ thể | Không được coi là đã hoàn tất khi |
|---|---|---|
| Đồng bộ quyết định đã có | RV-01/02/08/09/22: cập nhật các thân SCD, AC, scope và hướng dẫn đang giữ quyết định cũ; RV-10/11: chốt hợp đồng kỹ thuật nhất quán | Chỉ thêm một đoạn cuối file nhưng phần main/AC vẫn trái nhau |
| Chờ khách theo câu đã gửi | Theo No.6, 49, 51–63, 65–67, 69–77 và những mục mở tương ứng file15; không gửi lại như câu mới | Q&A Close nhưng câu gộp chưa trả lời hết, hoặc chưa có quyết định phạm vi |
| Đội thiết kế | Version/state projection, eligibility, event contract, source of truth, idempotency/reconcile, screen contract, runbook, AC | Chỉ đặt tham số mặc định để che rule chưa chốt |
| Provider/POC | Các POC trong guide Upload-Post, OneDrive, payment/video; account/gói/quota/consent/callback/cancel/media cần evidence thật | Chỉ đọc docs provider, dùng mock, hoặc thấy một response HTTP thành công |
| BA/QA xác nhận | Đọc lại mỗi chain với khách/FutureCore; đi qua happy path và nhánh điều kiện từ file25; chốt pass/fail/owner | Chỉ có số lượng 60 chức năng, 34 màn hay 84 scenario |
| Chủ dự án quyết định đợt | Manifest chỉ gồm phần đã chốt và đủ dependency; đánh dấu rõ phần hoãn và tác động | Gỡ chặn kỹ thuật để chạy được khi nghiệp vụ cốt lõi chưa xác nhận |

Đợt quét này **không tự sửa hết SCD hoặc chốt rule mới**. Các sửa trực tiếp là bổ sung báo cáo/ma trận/scenario/nguồn, ghi đầy đủ33 điểm tắc vào CSV15 (mở rộng19 mục, thêm14 mục), thêm liên kết điều hướng, đính chính độ chắc chắn của A1 và kết quả file22. Để đóng RV phải sửa các nguồn dẫn xuất được nêu, kiểm lại AC và ghi lại quyết định; trạng thái ban đầu của cả 33 RV là **MỞ**.

## 7. Điều kiện sign-off từng chuỗi

Một chuỗi được coi **sẵn sàng triển khai theo tài liệu** khi:

1. Có baseline nguồn/date/version và phạm vi đợt đã được xác nhận; phân biệt business approval, thiết kế đội, scope thương mại và release approval.
2. Mọi đầu vào/role/owner/eligibility/validation được định nghĩa, có màn hoặc kênh nhập, trạng thái trước/sau và output/consumer rõ.
3. Không còn HIGH/mâu thuẫn thuộc chuỗi; business rule cốt lõi đã chốt. Phần tách hoãn phải không tạo đường đi vòng vào side effect của chuỗi đó.
4. Có state/transition cho lỗi/expired/returned/cancel/partial/unknown; thao tác đồng thời và recovery không gây đăng/thu/tạo trùng hoặc vượt quyền.
5. AC có ID, dữ liệu ví dụ và oracle xác định; các nội dung đề xuất đã được người có thẩm quyền duyệt. Scenario bị blocked phải có quyết định trước khi tính PASS.
6. Hợp đồng tích hợp và kế hoạch kiểm chứng có owner; điều kiện provider còn thiếu được ghi thành blocker đúng giai đoạn. Muốn **phát hành/nghiệm thu** còn phải có bằng chứng kiểm thử phù hợp, NFR/restore và runbook, không chỉ tài liệu sẵn sàng viết mã.
7. Kiểm tra lại các phần chịu tác động sau mỗi câu trả lời, nhất là No.70/71/77 (auto), No.49/53/62/63 (billing), No.6/75 (phân công/thông báo), No.69 (xóa), No.74 (nhập hồ sơ).

Không có ngày/thời gian chờ nào tự biến thành phê duyệt, và không có danh sách hữu hạn nào đảm bảo mọi tình huống thực tế. Ma trận giúp nhận biết phạm vi đã xét, điều kiện còn thiếu và bằng chứng cần có để ra quyết định có giới hạn rõ.

## 8. Điểm theo dõi chính trong CSV15 sau khi ghi đầy đủ điểm tắc

Tất cả33 RV vẫn **MỞ**. Một RV có một mục chính; các dòng khác chỉ liên kết để tránh hỏi trùng. 14 mã L23 mới là điểm tắc chưa có mục phù hợp, không có nghĩa thêm14 yêu cầu khách đã phê duyệt. 56 dòng 確認 không sửa. Tổng CSV15: **203 dòng dữ liệu**.

| RV | Mục chính CSV15 | Mức | Người xử lý | Ranh giới luồng bị chặn |
|---|---|---|---|---|
| RV-01 | L23-01 | HIGH | Đội; khách nếu thay cách đếm | Chặn hoàn thiện đặc tả/AC bộ đếm rewrite; không chặn sửa tay đã chốt. |
| RV-02 | S06-03 | HIGH | Đội; khách xác nhận lịch No.56 | Chặn policy lập lịch/chống khóa hoàn chỉnh; quota provider khác trần nghiệp vụ. |
| RV-03 | S10-01 | HIGH | Đội; khách duyệt cách hiển thị | Chặn trạng thái/UI, retry và thống kê xuyên chức năng; không ép partial/unknown thành thành công hoặc lỗi tất cả. |
| RV-04 | L22-11 | HIGH | Khách No.58; đội thiết kế | Chặn identity/version của bài trả lại, lịch duyệt và lịch đăng. |
| RV-05 | B5 | HIGH | Khách No.57/71; đội | Chặn nhánh NG → sửa → duyệt → hẹn; không tự hẹn chỉ vì đã sửa sạch. |
| RV-06 | S08-02 | HIGH | Khách + provider; đội | Chặn nghiệm thu/cấu hình thu tiền thật, hóa đơn và quyết toán cuối kỳ. |
| RV-07 | S05-08 | HIGH | Đội; khách chốt xử lý tài chính | Chặn kết luận lỗi video, hoàn lượt/tạo lại và phí kết quả muộn; không chỉ chọn thời gian timeout. |
| RV-08 | L23-02 | HIGH | Đội; khách No.66 | Chặn hợp đồng quyền/AC làm thay; không mở quyền Talent thường bằng suy đoán. |
| RV-09 | L23-03 | HIGH | Đội | Chặn nhất quán quyền đọc hội thoại/consent/audit trong đặc tả; không mở lại lựa chọn nghiệp vụ No.7 đã đóng. |
| RV-10 | L23-04 | HIGH | Đội kiến trúc | Chặn hợp đồng phân quyền và truy vấn an toàn của mọi luồng có dữ liệu riêng. |
| RV-11 | L22-03 | HIGH | Đội; khách xác nhận hành vi | Chặn context AI/preview/nhịp tạo nội dung theo chỉ thị; không dùng prompt tự giải quyết quyền hoặc gate nghiệp vụ. |
| RV-12 | L23-05 | HIGH | Chủ dự án/FutureCore + khách | Chặn giao việc/phát hành phần chưa có quyền triển khai; không cản phần độc lập đã chốt đủ. |
| RV-13 | L22-07 | HIGH | Khách + đội | Chặn toàn bộ period auto theo khoảng; tách mode của Talent khỏi stop vận hành. |
| RV-14 | B12 | HIGH | Khách No.72 + đội | Chặn lifecycle/đánh giá thử thách, cách đếm streak và thông báo đạt; không thay số liệu bằng AI tự phán đoán. |
| RV-15 | S01-01 | HIGH | Khách No.52–54; đội | Chặn activation đầu-cuối và mốc tính phí; office có đường bỏ payment riêng. |
| RV-16 | S02-07 | HIGH | Đội; khách xác nhận ảnh hưởng | Chặn fallback/dữ liệu có hiệu lực của AI và điều kiện hồ sơ ready; đọc được file không đồng nghĩa hồ sơ đã đủ. |
| RV-17 | L23-06 | HIGH | Đội + khách; provider POC | Chặn contract kết nối SNS, thay/ngắt account và xóa profile an toàn; không chỉ là đổi TTL. |
| RV-18 | L23-07 | HIGH | Đội + provider; khách về UX/phạm vi | Chặn xuất bản ở trường hợp thiếu input/consent/capability bắt buộc; không tự suy đoán privacy hoặc native AI label. |
| RV-19 | L22-09 | HIGH | Đội + khách No.77/Q08 | Chặn dừng/hủy/resume có kết quả đáng tin; không khẳng định đã hủy mọi mạng sau một HTTP request. |
| RV-20 | L22-12 | HIGH | Đội tích hợp/vận hành | Chặn recovery mọi luồng có side effect ngoài; có outbox chưa đủ nếu consumer không tuân contract. |
| RV-21 | L23-08 | MEDIUM | Đội | Chặn contract chat/stream đa thiết bị và chống tạo nháp/tính phí AI trùng; không thay giới hạn hội thoại còn chờ khách. |
| RV-22 | L23-09 | MEDIUM | Đội; khách xác nhận UI | Chặn hoàn thiện event/AC mốc follower và chống báo lặp; A7 đã đóng câu cũ không có nghĩa phần đồng bộ đã xong. |
| RV-23 | L22-13 | MEDIUM | Đội + provider POC; khách về hiển thị | Chặn số liệu đầu-cuối, đánh giá thành tích/AI/giờ đăng và thông báo dựa dữ liệu; không chỉ xử lý UI null. |
| RV-24 | L22-14 | HIGH | Khách No.69; đội vận hành | Chặn exit → retention → xóa → restore/đăng ký lại; không tự đặt thời hạn pháp lý hoặc xóa chứng cứ trước đối soát. |
| RV-25 | L23-10 | MEDIUM | Đội; khách về retention/quota | Chặn lưu/xóa/tái dùng media an toàn và phục hồi khi kho đầy; tránh lịch mất tư liệu. |
| RV-26 | L22-02 | HIGH | Khách No.6/75/76 + đội | Chặn phân tuyến/quyền duyệt, xử lý notification và fallback; không suy quyền hành động từ quyền xem mọi Talent. |
| RV-27 | S01-07 | HIGH | Khách No.65/67; đội | Chặn recovery quản trị/phiên an toàn và đường thoát khi bị khóa; đồng bộ với các câu mật khẩu tạm đã có. |
| RV-28 | L23-11 | HIGH | Đội vận hành + khách về cam kết | Chặn kế hoạch nghiệm thu/vận hành/khôi phục và catch-up có kiểm soát; không phải tất cả đều là câu khách tự thiết kế. |
| RV-29 | L23-12 | MEDIUM | Đội BA/QA | Chặn tuyên bố đủ đặc tả/nghiệm thu; không thể đóng chỉ vì có bảng 60 chức năng hay 84 scenario. |
| RV-30 | L23-13 | HIGH | Khách cung cấp policy; đội BA/AI/security | Chặn contract consent/quyền nội dung và dữ liệu AI/safety trước đăng thật; không yêu cầu hệ thống lưu đồng ý phụ huynh trái ranh giới đã ghi. |
| RV-31 | L22-16 | MEDIUM | FutureCore/đội; khách duyệt UX | Chặn giao UI/API đầu-cuối khi thiếu nơi nhập dữ liệu hoặc đường phục hồi; có mã màn chưa chứng minh contract đủ. |
| RV-32 | L23-14 | HIGH | Chủ dự án + khách + đội tích hợp | Chặn phát hành/nghiệm thu chuỗi phụ thuộc dịch vụ chưa sẵn sàng; không tự triển khai thay việc kiểm chứng nhà cung cấp. |
| RV-33 | S01-09 | MEDIUM | Đội vận hành/security; khách nếu đổi hành vi | Chặn contract audit/khả dụng/retention nhất quán; không gửi lại khách yêu cầu đội tự chọn số ngày đã được giao. |

## 9. Chuyển bảng15 sang workbook và theo dõi câu hỏi chi tiết

Bản chính hiện tại là [15_Cau_hoi_lam_ro_luong.xlsx](15_Cau_hoi_lam_ro_luong.xlsx), thay CSV: sheet `Luong` giữ nguyên203 dòng/14 cột, gồm56 mục 確認; sheet `Chi_tiet` bổ sung64 câu CT về trạng thái, validation, quyền, dữ liệu/đồng thời, lỗi và vận hành. Các câu chi tiết có tham chiếu mục luồng/RV, bên xử lý, phụ thuộc và cột quyết định/SCD/AC. Chưa có câu trả lời mới hoặc RV nào được đóng khi chuyển định dạng. Các chỗ báo cáo ghi CSV15 mô tả bảng nguồn tại lúc quét; hiện tra cùng mã ở sheet `Luong`.
