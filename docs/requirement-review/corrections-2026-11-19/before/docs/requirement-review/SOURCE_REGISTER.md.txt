# Sổ nguồn và quy tắc ưu tiên

Snapshot khảo sát 19/11/2026: kiểm tra trực tiếp 12 tệp, hash trùng [kiểm kê28](../../Phan_tich/28_Kiem_ke_nguon_19-11-2026.json). Tên tệp, đường dẫn, SHA-256, số trang/sheet đầy đủ tiếp tục quản lý tại JSON đó; không tạo bản hash chính thứ hai. [Danh mục nguồn](../../TAI_LIEU_NGUON.md) là đầu mối nhận nguồn, bảng dưới là phần quản lý hiệu lực. Hash chỉ xác nhận đúng tệp, không xác nhận đúng yêu cầu hoặc khách đồng ý.

## Thứ tự và giới hạn

Căn cứ trực tiếp: YK2, phần 関連資料 (tài liệu liên quan), trước §1: **hợp đồng > SOW (phạm vi công việc) > báo giá**; yêu cầu khác nhau giữa tài liệu thì dùng tài liệu ngày mới hơn. Áp dụng cùng quy tắc giải thích tại TAI_LIEU_NGUON.md §4.4–4.6: chỉ nội dung/quyết định cùng chủ đề, có ngày và thẩm quyền phù hợp mới thay phần cũ; không lấy ngày thư mục hoặc ngày sửa hệ thống làm ngày quyết định. Không dùng tính mới của bản vẽ để vượt hợp đồng hoặc xác nhận đề xuất chưa duyệt. Khi không đủ bằng chứng xác định ưu tiên, giữ xung đột mở.

- P0: văn bản hợp đồng/SOW/báo giá đúng phiên bản được đối chiếu. **Chưa có bản độc lập trong bộ 12 nguồn**. Trích dẫn trong QA No.45 chỉ chứng minh nội dung câu trả lời tại đó, không thay việc đọc bản ký.
- P1: quyết định khách có bằng chứng tại QA/KS/GJ, áp dụng đúng ý đã xác nhận; kiểm ngày, người trả lời, phạm vi và phần bảo lưu. Không xếp cả workbook hay biên bản là đã duyệt.
- P2: YK2 là đầu vào yêu cầu tổng quan hiện dùng; đoạn còn hỏi, số giả định, đề xuất phải giữ nguyên tính chất đó.
- P3: tài liệu giao diện dùng xác định màn/luồng, đối chiếu P0/P1/P2; không tự chứng minh phạm vi thương mại.
- H: nguồn lịch sử; chỉ phục hồi nội dung khi chứng minh chưa bị thay trong chủ đề đó.
- I/T: thiết kế nội bộ/đề xuất kỹ thuật, không có quyền xác nhận nghiệp vụ khách.

Đây là cách vận hành thứ tự có sẵn, không lập hệ ưu tiên mới theo tên tệp. Hai quyết định P1 mâu thuẫn mà không rõ ngày/phạm vi/thẩm quyền vẫn phải mở finding, không tự chọn.

## 12 nguồn đầu vào

Phiên bản “snapshot hash28” nghĩa là định danh theo SHA-256 trong kiểm kê28; không có số bản công bố riêng thì ghi rõ chưa xác định. Ngày dưới đây là ngày ghi trong nội dung, không phải ngày giao/duyệt. Mỗi mã có tên và đường dẫn đầy đủ trong TAI_LIEU_NGUON.md §2.

| Source ID | Tên tài liệu | Phiên bản | Ngày ghi trong tài liệu | Loại / phạm vi | Hiệu lực và quan hệ | Ưu tiên |
|---|---|---|---|---|---|---|
| YK2 | AI育成OS_概要要件定義書_v2.docx | Tên v2; bìa 0.1; snapshot hash28 | 13/11/2026 | Yêu cầu tổng quan, UC, chức năng, quy tắc, phụ lục | Đầu vào hiện hành; thay bản YK1 theo đối chiếu12; quyết định cùng chủ đề phải đọc QA/KS/GJ; không phải baseline đã ký | P2; phần đề xuất không phải P1 |
| QA | AI-Talent-OS_Q&A表.xlsx | Nhật ký sống; snapshot hash28 | Ngày từng dòng/ô; không có một ngày quyết định chung | Hỏi đáp, bảo lưu, góp ý, thông báo, yêu cầu bổ sung; 5 sheet | Hiện hành; đọc mọi sheet, phân biệt E/F hỏi với G/H trả lời, I trạng thái; đối chiếu KS/GJ | P1 chỉ với câu trả lời đúng thẩm quyền/phạm vi |
| KS | 要件定義確認シート_AI育成OS.xlsx | Nhật ký sống; snapshot hash28 | Cột I ghi quyết định 17/11/2026; kiểm từng dòng | Bảng xác nhận; sheet 確認事項 (mục xác nhận) | Hiện hành; A là OK, F đề xuất, G ý kiến, I quyết định; đối chiếu GJ/QA | P1 theo từng ý xác nhận |
| GJ | 20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md | created/updated 17/11; snapshot hash28 | 17/11/2026 | Biên bản: đồng thuận, hành động, bảo lưu | Hiện hành theo chủ đề; 合意事項 (đồng thuận) khác アクション (việc cần làm) | P1 với quyết định; hành động không phải phê duyệt |
| SD-T18 | 画面定義書_タレントのアプリ_AI育成OS.pdf | Bản lập 18/11; snapshot hash28 | 18/11/2026 | Giao diện Talent, 28 trang; T-01–T-16; luồng trang 21–28 | Hiện hành để đối chiếu; bổ sung AG; chưa chứng minh thay toàn bộ AG; 要確認 (cần xác nhận) còn mở | P3 |
| SD-M18 | 画面定義書_管理画面_AI育成OS.pdf | Bản lập 18/11; snapshot hash28 | 18/11/2026 | Giao diện Manager, 34 trang; M-01–M-20; luồng trang 24–34 | Hiện hành để đối chiếu; M-20 không tự đóng QA No.74; mã màn không đồng nhất AG | P3 |
| AG | アプリ画面案_AI育成OS.pdf | Bản đề xuất 12 trang; snapshot hash28 | 12/11/2026 | Phương án màn T-01–T-15/M-01–M-19 | Cơ sở trích dẫn lịch sử QA No.30/68; đối chiếu SD mới theo từng màn; không đổi mã cũ hàng loạt | P3; H với phần đã thay |
| YK1 | AI育成OS_概要要件定義書.docx | Tên v1 nội bộ; bìa 0.1; snapshot hash28 | 13/11/2026 | Yêu cầu tổng quan ban đầu | Lịch sử so với YK2; map số xác nhận ở phân tích12; bìa trùng không phải cùng bản | H |
| GT | 画面遷移図と画面案_AI育成OS.pdf | 8 trang; snapshot hash28 | 11/11/2026 | Sơ đồ chuyển màn cũ | Lịch sử; AG/SD bổ sung hoặc thay phần liên quan; không kết luận toàn tệp vô hiệu | H |
| SM | 要件説明資料_AI育成OS.pdf | 42 trang; snapshot hash28 | Chưa xác định ngày ban hành từ nội dung đã kiểm tra | Giải thích yêu cầu cũ, gồm LINE/n8n | Lịch sử; không phục hồi phương án đã thay; YK2 phụ lục B là nơi đối chiếu | H |
| TK-T | ★AI育成OS_タレントアプリ画面_かわいい版.pdf | 12 trang; snapshot hash28 | Bìa 11/2026, không ghi ngày cụ thể | Thiết kế trực quan Talent, bộ mã L | Lịch sử/đối chiếu hình thức; map qua AG, SD; không suy quy tắc từ hình mẫu | H/P3 theo phần còn áp dụng |
| TK-M | ★AI育成OS_マネージャー管理画面_PC_携帯_カテゴリー_AI指示.pdf | 18 trang; snapshot hash28 | Bìa 11/2026, không ghi ngày cụ thể | Thiết kế Manager PC/điện thoại, nhóm/chỉ thị AI | Lịch sử/đối chiếu; bộ M riêng, không trộn AG/SD | H/P3 theo phần còn áp dụng |

## Nguồn nội bộ và nguồn còn thiếu

| ID nội bộ | Nơi / phiên bản nhận diện | Vai trò / hiệu lực | Quan hệ / giới hạn ưu tiên |
|---|---|---|---|
| INT-GUIDE | AGENTS.md, CLAUDE.md, TIEP_TUC.md hiện có | Hướng dẫn tác vụ và bàn giao; có snapshot cũ | I; đọc cùng catalog hiện hành; quy ước tiếng Việt hiện tại thắng hướng dẫn viết Q&A tiếng Nhật cũ |
| INT-ANALYSIS | Phan_tich/00–28; 23 CSV/24 CSV/25 CSV; workbook15 XLSX | Phân tích trước, RV/G/TR/FL, dự thảo hỏi khách | I; giữ ID và nội dung chính; 26 là snapshot 9 nguồn lịch sử, 28 bổ sung 12 nguồn |
| INT-SCD | SCD/README.md và EP01–EP10, C-01–C-06 | Đặc tả và R1–R9 nội bộ | I; màu sẵn sàng/AC nội bộ không phải G8 hoặc khách nghiệm thu |
| INT-TECH | agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md, KET_QUA_KIEM_CHUNG_17-11.md; 5 bộ tích hợp hiện có | Thiết kế/kiểm chứng kỹ thuật: auth-DB, PWA, OneDrive, Upload-Post, ChatGPT MCP; cùng hướng dẫn stack chung | I/T; phiên bản ở đầu từng guide; bản Upload-Post hiện tại v2.0 thay gói cũ trong phạm vi hướng dẫn đó |
| INT-DB | database-design/01–07 | Thiết kế dữ liệu, kể cả tệp tên confirmed_requirements | I/T; tên “confirmed” không chứng minh khách đã chốt |
| MISSING-COMMERCIAL | Hợp đồng, SOW, báo giá độc lập được nhắc tại YK2 phần tài liệu liên quan | Chưa có trong source_requiments/ | Không gán hash, phiên bản, ngày ký hoặc hiệu lực giả; chủ dự án cung cấp khi cần xác nhận thương mại |

Khi nhận nguồn mới: giữ bản cũ và ID, lập phiên bản/hash mới, ghi người cung cấp/ngày nhận riêng ngày tài liệu; ghi rõ chủ đề/đoạn nào bổ sung hoặc thay thế và bằng chứng. Chỉ đổi hiệu lực phần có căn cứ. Nếu chưa xác định ngày/phiên bản/thẩm quyền, ghi CHƯA XÁC ĐỊNH và chặn kết luận liên quan, không chặn phần độc lập đã đủ nguồn.
