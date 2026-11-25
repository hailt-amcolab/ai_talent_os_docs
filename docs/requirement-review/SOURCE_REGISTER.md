## Tiếp nhận24112026 — kiểm25/11/2026

| Mã | Nguồn mới | Phiên bản và giới hạn |
|---|---|---|
| YK3 | [AI育成OS_要件定義書.docx](../../source_requiments/24112026/AI育成OS_要件定義書.docx) | 0.3,24/11/2026;1411đoạn XML gồm đoạn trống;57ảnh;16luồng; mô tả yêu cầu, còn chờ rà/duyệt |
| EXT24 | [AI育成OS_外部サービスの比較_20261124.pptx](../../source_requiments/24112026/AI育成OS_外部サービスの比較_20261124.pptx) | 14slide,24/11/2026;13ảnh minh họa; so sánh do FCP trình, không tự xác nhận giá/quy định/provider |
| KS24 | [要件定義確認シート_AI育成OS.xlsx](../../source_requiments/24112026/要件定義確認シート_AI育成OS.xlsx) | 5sheet, trùng byte KS trong Q&A; không tính là hai xác nhận |

QA hiện hành100câu chính (53Close/47Open); No.50 đã bỏ khỏi保留, không là quyết định đóng. KS có確認事項,20261120,20261122,プロジェクトを進めるために決める事項,アクション一覧. Ngày thư mục không tự là ngày quyết định; J101 là phân vai nội bộ25/11.

> **Hiện hành — nguồn24/11, kiểm25/11/2026:** 23 tệp; QA đủ5sheet, KS đủ5sheet. YK3 bản0.3 và14slide EXT24; KS24 trùng byte KS đang sống. QA No.101 xác nhận agent/DB/backup; actionKS No.16 ghi Square sau họp. CR hiện hành01–14 đổi nghĩa so với snapshot cũ. [Kết quả, phần còn mở và tác động](corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). G1 BLOCKED, phần phụ thuộc G2–G4 STALE, G5/G6 BLOCKED; chưa cấp G7/G8 PASS. Những thông báo “hiện hành” cũ bên dưới là lịch sử ở phần đã thay.

> **Hiện hành — đợt23112026:** Có 20 tệp nguồn; đã đọc bốn tệp mới gồm 52 trang PDF và DOCX 356 đoạn. UI-M20 lập20/11; báo cáo/slide lập22/11 để chuẩn bị24/11. TikTok nháp, xác nhận lại bài AI sửa, ranking, lưu đồng ý phụ huynh và pilot là các đề nghị chưa được duyệt phạm vi. [Kết quả, locator và giới hạn](corrections-2026-11-19/DELIVERY_23112026_REVIEW.md). G1 BLOCKED chờ duyệt phạm vi; G2–G4 STALE ở nhánh bị ảnh hưởng, G5/G6 BLOCKED; chưa có G7/G8 PASS. Các đợt trước giữ làm lịch sử.

## Nguồn nhận trong23112026 — hiện hành20 tệp

| Mã | Tệp | Ngày trong nội dung | Phạm vi/thẩm quyền |
|---|---|---|---|
| UI-M20 | [AI育成OS_管理画面_全画面案1.pdf](../../source_requiments/23112026/AI育成OS_管理画面_全画面案1.pdf) | 2026-11-20 | Đề xuất màn Manager, không là screen definition đã duyệt — 29 trang PDF; không tự duyệt phạm vi |
| ISS22-D | [AI育成OS_開発に向けた問題点と確認事項.docx](../../source_requiments/23112026/AI育成OS_開発に向けた問題点と確認事項.docx) | 2026-11-22 | Đề nghị/đánh giá và câu hỏi trước họp24/11, DOCX — 356 đoạn, không ảnh; không tự duyệt phạm vi |
| ISS22-P | [AI育成OS_開発に向けた問題点と確認事項.pdf](../../source_requiments/23112026/AI育成OS_開発に向けた問題点と確認事項.pdf) | 2026-11-22 | Bản PDF cùng báo cáo đề nghị; không tính như xác nhận thứ hai — 11 trang PDF; không tự duyệt phạm vi |
| ADV22 | [★ｎ11.22AI育成OS_問題点の整理と確認事項.pdf](../../source_requiments/23112026/★ｎ11.22AI育成OS_問題点の整理と確認事項.pdf) | 2026-11-22 | Slide 9 lời khuyên, 7 vấn đề và 8 ưu tiên; đề nghị chuẩn bị24/11 — 12 trang PDF; không tự duyệt phạm vi |

Ngày thư mục23/11 là ngày tiếp nhận; UI không đổi thành bản23/11 hoặc SD-M23. DOCX/PDF cùng báo cáo không tạo hai lần xác nhận. [Kiểm kê20tệp](source-inventory-current.json). Nội dung bên dưới là lịch sử các đợt trước cho phần đã có cập nhật.

> **Hiện hành — tiếp nhận23/11/2026:** đã rà QA đủ5sheet và KS đủ3sheet, so với kiểm kê20/11. QA thêm No.93–99; No.87/88 mở lại; KS thêm18ô quyết địnhK và33ô trả lời ở20261120. [Kết quả và giới hạn](corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md). Bốn câu nội bộ đã có tại No.93–96, không xuất câu hỏi trùng. G1 BLOCKED chờ duyệt snapshot mới; G2–G4 STALE, G5/G6 BLOCKED; chưa cấp G7/G8 PASS. Các số liệu/phát biểu hiện hành20/11 bên dưới là lịch sử cho phần bị thay.

> **Cập nhật QA mới — 2026-11-20:** đã lọc trùng 5 sheet; bản nháp còn 2 câu, rút thêm 24 câu (gồm 6 câu phí/thanh toán theo yêu cầu). Các số đếm và gate ở nội dung đợt trước bên dưới là lịch sử; G1–G4 hiện STALE, G5/G6 BLOCKED. Bản chính: `docs/requirement-review/qa-drafting-2026-11-19/qa-draft.md`.

# Sổ nguồn và quy tắc ưu tiên

> **Bản đối chiếu hiện hành20/11:** đã đọc81trang PDF19/11 bằng chữ và hình, biên bản GJ19, QA5sheet và KS3sheet. Các thông báo chờ kiểm kê bên dưới là lịch sử. Đã cập nhật bản chính và phân tuyến36Q&A thành26câu nháp/10câu rút. Số trang mục lục/KS có chỗ lệch trang thực tế; luôn dùng locator PDF thực tế. Xem [kết quả và giới hạn](corrections-2026-11-19/NEW_DELIVERY_IMPACT.md).

> **DEC-0001 ngày20/11:** người dùng đã chốt H65: không giới hạn số lần AI viết lại; không còn chờ quyết định số lượt hoặc yêu cầu Tech Lead chọn giữa2lần/không giới hạn. Chỉ thay đúng chủ đề; các phần nguồn khác và Independent Verification vẫn theo gate hiện hành. [Bản ghi](corrections-2026-11-19/REPORT.md).

> **Cập nhật QA/KS ngày 20/11/2026:** vẫn16tệp;14tệp giữ hash kiểm kê trước, hai workbook đổi hash. QA không đổi giá trị/công thức cả5sheet; KS có2ô sửa, thêm2sheet và bình luận FCP, chưa có trả lời trong các cột trả lời mới. Các số liệu/hash12nguồn bên dưới là lịch sử. Kiểm kê hiện hành và phạm vi G1 STALE tại [hồ sơ tiếp nhận](corrections-2026-11-19/NEW_DELIVERY_IMPACT.md).

## Nguồn tiếp nhận thêm ngày20/11/2026

Kiểm kê hiện hành16tệp tại [source-inventory-current.json](source-inventory-current.json); snapshot12tệp bên dưới giữ nguyên. Bốn nguồn mới: GJ19 (biên bản FCP–AMCOLAB), SD-T19 (33trang), SD-M19 (27trang), BF19 (21trang), ngày lập trong nội dung19/11/2026. Mã và trang phải kèm đúng bản; chưa tự thay/copy mã18/11.

GJ19 phân biệt ý kiến FCP, AMCOLAB, quyết định giữa hai bên và việc sẽ hỏi アデッソ; không nâng toàn bộ thành P1 khách xác nhận. SD-T19/SD-M19 là P3 mô tả giao diện, BF19 mô tả luồng; 要確認 (cần xác nhận) vẫn mở. [Tiếp nhận/hash](corrections-2026-11-19/new-delivery-intake.json) và [phạm vi ảnh hưởng cần đối chiếu](corrections-2026-11-19/NEW_DELIVERY_IMPACT.md).

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
