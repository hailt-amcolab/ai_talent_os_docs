# Đối chiếu chín nguồn và biên tập bộ câu hỏi khách hàng

> Cập nhật đường dẫn ngày 19/11: đây là bản đối chiếu lịch sử của bộ chín nguồn ngày 18/11. Danh mục hiện hành đã chuyển sang `source_requiments/` và có 12 tệp, gồm hai bản định nghĩa màn hình 18/11. Đọc [TAI_LIEU_NGUON.md](../TAI_LIEU_NGUON.md) và [bản cập nhật28](28_Cap_nhat_danh_muc_nguon_19-11-2026.md); không dùng số chín trong báo cáo này làm giới hạn nguồn hiện tại.

Ngày18/11/2026. Theo danh mục người dùng chỉ định tại [TAI_LIEU_NGUON.md](../TAI_LIEU_NGUON.md). Tài liệu phân tích/SCD/guide/thiết kế DB là dẫn xuất, không phải bằng chứng khách đã đồng ý. Đợt này chỉ làm tài liệu; không dùng mã nguồn, demo hoặc cấu hình môi trường.

## 1. Phần đối chiếu đã bổ sung

Đã xem hình tổng quan **92/92 trang của5 PDF** và **26/26 ảnh nhúng DOCX** (gồm hình luồng và hình minh họa), kết hợp văn bản trích xuất. Các hình được render để đọc, không tạo ảnh thiết kế mới. Workbook được đọc lại mọi sheet và lịch sử trả lời, không chỉ summary dẫn xuất.

Đây là kiểm tra sơ đồ/màn/ghi chú nghiệp vụ, không là kiểm toán từng pixel/phông chữ hay chứng nhận pháp lý. Chưa có bản hợp đồng/SOW/báo giá ký độc lập ngoài các dẫn chiếu trong9 nguồn; không tự suy ra đã phê duyệt chi phí. Không xác minh khả năng provider bằng tài khoản thật trong đợt này.

| Mã | Tệp nguồn | Mức đối chiếu | SHA256 nguồn khi đối chiếu |
|---|---|---|---|
| QA | [AI-Talent-OS_Q&A表.xlsx](<../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx>) | Toàn bộ cell text5 sheet; QA76 câu (43 Close/33 Open); bảo lưu No.50 Open; CR25 dòng. | `d31c5c12825a8fa8093e0c6ec97cda4ff7d8b6641feb22b9298663979e7e5765` |
| YK2 | [AI育成OS_概要要件定義書_v2.docx](<../source_requiments/16112026/AI育成OS_概要要件定義書_v2.docx>) | Văn bản/bảng và26 ảnh nhúng đã xem; tra hình theo chú thích trong DOCX, gồm hình5-1/5-2/5-3 và UC01–13. | `30e6533faaece81d16b857a95e56d9483d29fa771b64b231cbbc265a12717fe3` |
| AG | [アプリ画面案_AI育成OS.pdf](<../source_requiments/16112026/アプリ画面案_AI育成OS.pdf>) | 12/12 trang: xem hình tổng quan từng trang và đối chiếu text/mã màn. | `4ac56463287f2d3087cac1f26a405ffb08e3c64469a238de15a8132c62cba181` |
| GT | [画面遷移図と画面案_AI育成OS.pdf](<../source_requiments/base/画面遷移図と画面案_AI育成OS.pdf>) | 8/8 trang: xem hình tổng quan từng trang, chú ý lựa chọn/mã màn cũ. | `52fa6c9cda4de6574b97149abc8b17b75d6f17cb4fc7315ceff88c724ba90eea` |
| KS | [要件定義確認シート_AI育成OS.xlsx](<../source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx>) | Toàn bộ sheet hiện có,118 dòng nội dung; đọc F/G/I và OK, không suy tick là đủ mọi chi tiết. | `b7e8d88ab7f57b6fb36b04060a55cf20b3ee37e8f34f4e4595c7c1067c36bd82` |
| SM | [要件説明資料_AI育成OS.pdf](<../source_requiments/base/要件説明資料_AI育成OS.pdf>) | 42/42 trang: xem hình tổng quan từng trang + text; xác nhận có LINE/miễn phí/2quyền cũ. | `8abc517d7e75ff026c365d0e0f8cff60b8c6c89c3e65206893ddef667d62dcae` |
| GJ | [20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md](<../source_requiments/17112026/20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md>) | Đọc biên bản, quyết định và action; phân biệt nội dung đã chốt với việc phải hỏi provider/đề xuất sau. | `c62c678eb1b0c10a889b0d45ac6c051fe48b537023301932ad6023f86acf5ed0` |
| TK-T | [★AI育成OS_タレントアプリ画面_かわいい版.pdf](<../source_requiments/base/★AI育成OS_タレントアプリ画面_かわいい版.pdf>) | 12/12 trang: xem hình tổng quan và text; có lượt miễn phí/mục tiêu tổng cũ. | `f3b116720fa706bd2711ca96e5ddd5e7fed7b021767575ae48fb6e1cd1f46559` |
| TK-M | [★AI育成OS_マネージャー管理画面_PC_携帯_カテゴリー_AI指示.pdf](<../source_requiments/base/★AI育成OS_マネージャー管理画面_PC_携帯_カテゴリー_AI指示.pdf>) | 18/18 trang: xem hình tổng quan và text; nhóm/chỉ thị là đề xuất trong bản thiết kế, có mã khác AG. | `d2461eaaf18467a63d515f2129b4ad4b31266c35838c8b7a5c893814981986ab` |

Không chỉnh sửa9 nguồn. Các hash dùng để nhận biết phiên bản nguồn của lần đối chiếu này. Danh mục128 tệp ở file23 là chỉ mục lần trước, không có nghĩa128 nguồn gốc.

## 2. Những điểm hình gốc giúp xác định

| Nội dung | Bằng chứng nguồn gốc | Kết quả sử dụng |
|---|---|---|
| Sáu trạng thái bài có thật, nhưng chưa đủ cho auto period mới | YK2 hình5-1; QA No.51 Open, cập nhật17/11 | Không hỏi khách xem có6 trạng thái không; đội bổ sung projection/luồng mới rồi trình phần thay đổi. |
| Kiểm từ cấm trước bước xin duyệt | YK2 hình5-2 (ảnh nhúng image6); AG trang4 T-09 và trang8 M-11 | Không biến sửa sạch thành tự động bỏ gate duyệt; phần sửa/thay duyệt còn No.57/71. |
| Thanh toán trước tạo folder theo luồng mô tả | YK2 UC-01 hình4-2; AG trang2 T-04 | Hướng đi đã có, nhưng thời điểm active/tính phí/completeness còn No.52–54; không đóng bằng hình happy path. |
| Office không duyệt và dùng app theo bản cũ | YK2 UC-12 hình4-13; AG trang8 M-12; QA No.20 Close | No.43 cập nhật17/11 vẫn hỏi app hay quản trị qua No.66; giữ câu hỏi đúng phần xung đột, không hỏi lại office-only. |
| Mục tiêu theo từng SNS | AG trang3 T-06 và trang8 M-10; QA No.14; KS xác nhận3 | Không hỏi lại chọn mục tiêu tổng từ TK-T trang3/7 hoặc TK-M trang9 vì bản cũ. |
| Không có lượt video miễn phí | YK2 §5.4/hình5-3; AG trang4 T-11/T-12 và trang12 đối chiếu | TK-T trang10/12 và SM trang10/24/26 còn miễn phí/hạn mức là nội dung lịch sử, không đưa thành lựa chọn mới. |
| Một loại quyền Manager | AG trang10 M-18 và trang12; QA No.5/CR-13 | Quyền dừng riêng ở TK-M trang16/17 và SM trang35/36 là bản cũ; người nhận duyệt còn No.6, không đồng nhất với loại quyền. |
| Đã có hướng ưu tiên chỉ thị riêng > nhóm > chung | TK-M trang13/14; AG trang9 M-14; YK2 xác nhận6 | Không coi thứ tự là hoàn toàn chưa từng được mô tả. RV-11 là mâu thuẫn SCD/thiếu thiết kế nhiều nhóm, hiệu lực và đồng bộ; đội giải quyết trước, chỉ hỏi hành vi chưa rõ. |
| Không cần nút mẫu câu | AG trang9 M-15/TK-M trang15 còn nút; GJ §7 xác nhận8 loại bỏ | Đội đồng bộ màn; không hỏi lại giữ/bỏ nút chỉ vì bản hình chưa sửa. |
| Có hai cách đăng, không chỉ vòng chấp nhận từng bài | GJ §1; KS xác nhận19/25/26; QA No.70/71 | Hình UC-05 cũ chưa thể đại diện auto period; hỏi quan hệ mode/period và dữ liệu từng bài. |
| Danh mục đã có màn đọc hội thoại và nhật ký | AG trang8 M-09, trang10 M-19; QA No.7/21 | Đội đồng bộ quyền/audit; không gửi lại lựa chọn hội thoại riêng tư đã rút. |
| Mã màn phải kèm nguồn | GT trang1 khác AG trang1; TK-T/TK-M dùng bộ mã khác | Dùng AG theo No.30/68, giữ crosswalk; không tạo yêu cầu mới từ cùng mã khác nghĩa. |

## 3. Workbook15 được biên tập lại

- **Luong:** giữ nguyên203 dòng/14 cột, kể cả56 mục xác nhận; đây là danh mục điểm tắc nội bộ, không phải toàn bộ thư gửi khách.
- **Chi_tiet:** giữ64 câu hỏi và các cột trả lời; bổ sung đường đi tới câu khách liên quan và nhắc phần đội tự thiết kế. Giữ bộ lọc, danh sách chọn và liên kết nội bộ.
- **Gui_khach:** **52 quyết định** phân rã từ các Q&A còn Open, không phải52 câu mới. Mỗi dòng một quyết định,2 phương án kèm ảnh hưởng, đề xuất có nhãn chưa duyệt, nguồn sheet/No./dòng, mục luồng và phụ thuộc. Khách có thể chọn phương án khác bằng nội dung tự do. Có cột câu trả lời/người-ngày/phạm vi, tất cả còn trống và chưa gửi.
- **Noi_bo:** **33 việc** theo RV, người chuẩn bị, đầu ra và quyết định khách liên quan. Các phần đã sửa được ghi riêng; không đóng RV khi còn rule/AC cần xác nhận.

52 dòng nhiều hơn một cuộc họp nên **không gửi tất cả cùng lúc**. Lọc theo nhóm1A (9 quyết định auto),1B (8 quyết định quyền/activation/phí/office),1C (11 quyết định duyệt/lịch), rồi nhóm2 vận hành và nhóm3 màn/thông báo. Trong mỗi buổi chọn các quyết định đang chặn việc gần nhất và đã đủ thông tin chuẩn bị. Không dùng thời hạn cũ20/11 như deadline mới tự đặt.

Câu đã có số No. vẫn theo No. đó; không tự cấp số QA hay sửa workbook khách. Câu bổ sung chi tiết chưa có nguyên văn trong QA được ghi “bổ sung chi tiết, chưa gửi”. Ví dụ trạng thái tổng được hỏi bằng nhãn/màn mẫu; khách không phải thiết kế enum DB, retry key, transaction hay token.

## 4. Đội đã sửa trực tiếp và phần vẫn mở

| RV | Sửa đã làm trong SCD dẫn xuất | Chưa được coi đã hoàn tất |
|---|---|---|
| RV-01 | 4-2: bỏ AC cho3 lần AI sửa; lần thứ3 bị chặn, sửa tay riêng | Cách tính lượt khi lỗi/thử lại/copy vẫn cần làm rõ. |
| RV-02 | 8-4: bỏ trần3 bài/ngày khỏi main/rule/AC; quota provider tách riêng | Khoảng cách, rải giờ và giờ bài2 còn No.56; không tự chốt số đề xuất. |
| RV-08 | 5-1/6-3: AC làm thay chỉ office, không tính hóa đơn Talent thường; rút khẳng định màn quản trị đã chốt | No.66 còn mở; role/audit thực hiện office cần thiết kế. |
| RV-22 | 3-7/C-05: giữ mốc25/50/75% theo QA No.14 thay đề xuất bỏ | Đây là đề xuất cần xác nhận trên màn; gộp nhiều mốc/đổi goal/backfill chưa đóng. |

Không sửa phần chưa có quyết định để làm báo cáo đẹp hơn. Các RV còn lại ở `Noi_bo` có đầu ra cần làm; phần phụ thuộc khách/provider không thể đóng trong một cuộc rà soát tĩnh. Bản kết luận “chưa đủ để triển khai toàn bộ” của file23 vẫn có hiệu lực.

## 5. Kiến thức dự án được lưu lại

Đã thêm danh mục9 nguồn và quy tắc phân loại vào `TAI_LIEU_NGUON.md`, nối từ `AGENTS.md`/`CLAUDE.md`/`TIEP_TUC.md`. Thay kết luận cũ trong CLAUDE về CR-24/25 và “mọi thông báo cho mọi Manager”; phần diễn giải cũ trái khối quy tắc nguồn phải đọc lại từ QA/KS/GJ. Đây là cập nhật tài liệu chỉ dẫn bền vững của repository, không phải huấn luyện lại mô hình.
