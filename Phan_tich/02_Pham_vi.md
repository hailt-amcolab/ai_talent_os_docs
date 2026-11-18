# Phạm vi dự án: Trong phạm vi / Ngoài phạm vi / Chưa rõ

Tab này đã viết lại theo bản yêu cầu v2. [YK2] = AI育成OS_概要要件定義書_v2.docx. Số 確認 (mục cần xác nhận) theo đánh số của v2. 前提 là phần tiền đề ở cuối mỗi UC.

**Thay đổi phạm vi chính so với v1:** tài năng tự đăng ký trên ứng dụng chuyển từ "ngoài phạm vi" vào "trong phạm vi". Người ngoài công ty không còn là mục để sau mà dùng chung luồng đăng ký (⚠ 確認1). Loại tài năng miễn phí bị bỏ. Hủy bài trên màn hình quản trị và dừng đăng theo từng tài năng vào phạm vi. Màn hình chỉ dẫn cho AI và nhóm tài năng: khách quyết làm ngày 17/11 ([KS] 確認6–8, 47).

## 1. Căn cứ và cách phân loại

Phạm vi dự án gồm 54 chức năng, chia thành 9 nhóm lớn theo SOW (bản mô tả phạm vi công việc). Các hạng mục khác chỉ được xếp vào "trong phạm vi" hay "ngoài phạm vi" khi tài liệu ghi rõ ([YK2] mục 1-3, mục 6, 別紙C – phụ lục C).

| Nhóm | Tiêu chí (chỉ theo tài liệu, không tự giả định) |
| --- | --- |
| **Trong phạm vi** | Có mã chức năng trong mục 6 và 別紙C (phụ lục C), hoặc là yêu cầu phi chức năng hay sản phẩm bàn giao ghi rõ trong mục 9 đến 12 |
| **Ngoài phạm vi** | Tài liệu ghi rõ là không làm, để sau (mục 13), thuộc hợp đồng khác, hoặc là việc của khách hàng |
| **Chưa rõ** | Còn chờ 確認, có trong thiết kế màn hình nhưng không có mã chức năng, hoặc phụ thuộc tài liệu không có trong thư mục dự án (mục 4.2 của SOW) |

**Lưu ý về 確認:** đây là đề xuất của FutureCore, khách chưa xác nhận. Chức năng trong phạm vi mà có 確認 kèm theo được đánh dấu ⚠ trong bảng.

**Mức ưu tiên** ([YK2] mục 6, 12-2, 12-3):

- **高 (cao):** bắt buộc để bắt đầu sử dụng. Lỗi nghiêm trọng thì phải sửa trước khi phát hành.
- **中 (trung bình):** cần khi vận hành chính thức, nhưng có thể tạm làm bằng cách khác.
- **低 (thấp):** có thì tiện. Có thể làm sau khi vận hành chính thức, khi đó cần thỏa thuận bằng văn bản.
- Khi vận hành chính thức (cuối tháng 2/2027) chỉ cam kết các chức năng 高 và 中. Mức ưu tiên hiện là đề xuất của FutureCore, khách chưa quyết (mục 14-4).

## 2. Trong phạm vi: 54 chức năng

**Đã chốt thêm:** tự đăng ký (CR-01); 3 chủ đề (CR-02; nhịp đề xuất chỉnh qua chỉ thị cho AI, [KS] 確認14); trả lại kèm lý do (CR-03); hai loại video, video trình chiếu ghép ảnh ở máy chủ, không dùng Kling (CR-04); tìm tin tức (CR-05); màn sửa bài dính từ cấm tối thiểu (CR-06); màn cài đặt chung (CR-07); thông báo đạt mục tiêu và thu tiền lỗi (CR-08); quản lý gửi thay (CR-09, chỉ cho tài khoản công ty theo [KS] 確認27); lưu OneDrive (CR-10). Theo bảng xác nhận 17/11: CR-17 (nhóm tài năng: M-10 thiết kế khách = M-13 [AG]), CR-18 (màn chỉ thị cho AI: M-11 thiết kế khách = M-14, M-15 [AG]), CR-19 (duyệt theo nhóm hoặc quản lý phụ trách) và CR-21 (tài năng sửa chữ trực tiếp) **làm**; CR-20 (nhiều tài khoản trên một mạng) **không làm**; CR-22 (thử thách) đã chốt hướng, chờ khái niệm アデッソ viết; CR-23 (video tự làm thành bản nháp mỗi ngày) vẫn chờ khách (Q&A No.50); CR-24 (hội thoại riêng tư) **không làm** vì quản lý xem toàn bộ hội thoại (Q&A No.7 đóng 17/11); CR-25 **không cần** vì 画面定義書 do FutureCore làm (Q&A No.68 đóng 17/11). Ảnh hưởng tới báo giá và lịch của các CR nay làm: chưa rõ ([KS], tệp 21).

**Việc mới theo bảng xác nhận 17/11** (chưa có mã chức năng; tệp 21 §3): hai cách đăng 自動投稿 / 要確認; nhịp đề xuất chỉnh qua chỉ thị cho AI; màn nhập thông tin tài năng cho AI (chờ Q&A No.74); gửi tin theo khung sáng, trưa, tối; tự xóa dữ liệu tài năng rời đi sau 6 tháng; chu kỳ thu phí từ ngày đăng ký.

Tổng cộng có 54 chức năng: 42 高 (cao), 11 中 (trung bình), 1 低 (thấp, chức năng 8-9). Mã và số chức năng không đổi so với v1. Cột cuối ghi 確認 liên quan theo số của v2.

| Mã | Chức năng | Nhóm SOW | Ưu tiên | Mục trong [YK2] | ⚠ 確認 liên quan |
| --- | --- | --- | --- | --- | --- |
| 1-1 | Thu phí thuê bao tháng cho mọi tài năng (cước nhà mạng hoặc thẻ, qua màn hình của cổng thanh toán), xem lịch sử hóa đơn qua trang của cổng | 1. Hợp đồng, đăng nhập, thu phí | 高 (cao) | 6-3 | ⚠ 48, 49, 50 |
| 1-2 | Loại tài khoản (tài năng có trả phí / tài khoản công ty). Tên trong [YK2] vẫn là "phân loại trả phí / miễn phí" | 1 | 高 (cao) | 6-3 |  |
| 1-3 | Đổi loại. V2 ghi không còn việc để làm | 1 | 中 (trung bình) | 6-3 |  |
| 1-4 | Đăng ký trên ứng dụng, quản lý duyệt, email mật khẩu tạm, đăng nhập, tự đặt lại mật khẩu | 1 | 高 (cao) | 6-1 | ⚠ 1, 2 |
| 1-5 | Nhận diện tài năng, tách biệt dữ liệu giữa các tài năng | 1 | 高 (cao) | 6-1 |  |
| 1-6 | Đăng nhập hai bước của quản lý, thêm hoặc vô hiệu hóa quản lý | 1 | 高 (cao) | 6-2 | ⚠ 41 |
| 2-1 | Đọc thông tin tài năng từ OneDrive mỗi sáng | 2. Quản lý cung cấp thông tin cho AI | 高 (cao) | 6-4 |  |
| 2-2 | Tự tạo thư mục riêng khi tài năng thanh toán xong (tài khoản công ty: khi được tạo) | 2 | 高 (cao) | 6-4 |  |
| 2-3 | Nhập thông tin tài năng từ ChatGPT project của tài năng | 2 | 高 (cao) | 6-4 | ⚠ 5 |
| 2-4 | Đăng ký mục tiêu số người theo dõi và hạn đạt | 2 | 高 (cao) | 6-4 | ⚠ 3 |
| 3-1 | Hiểu tài năng và thuật toán của mạng xã hội | 3. Huấn luyện viên AI (AIコーチ) | 高 (cao) | 6-5 |  |
| 3-2 | Tự cải thiện (ghi thêm vào file của tài năng) | 3 | 高 (cao) | 6-5 |  |
| 3-3 | Giới hạn chủ đề trò chuyện, báo quản lý khi có chuyện nghiêm trọng | 3 | 高 (cao) | 6-5 | ⚠ 17, 23 |
| 3-4 | Trò chuyện với huấn luyện viên AI, tin nhắn buổi sáng, tin nhắn sau khi đăng bài | 3 | 高 (cao) | 6-5 | ⚠ 14, 15, 18, 21, 22, 23 |
| 3-5 | Quản lý chi phí AI theo từng tài năng và từng tháng | 3 | 中 (trung bình) | 6-5 |  |
| 3-6 | Nhận xét bài hôm trước và gợi ý cải thiện | 3 | 高 (cao) | 6-5 |  |
| 3-7 | Thông báo khi đạt mục tiêu, chúc mừng khi hoàn thành チャレンジ (thử thách) | 3 | 中 (trung bình) | 6-5 | ⚠ 39 |
| 3-8 | Tổng kết tuần | 3 | 中 (trung bình) | 6-5 |  |
| 3-9 | Nhắc tài năng lâu không đăng bài (sau 3 ngày), báo quản lý (sau 7 ngày) | 3 | 中 (trung bình) | 6-5 | ⚠ 19 |
| 3-10 | Hiển thị số người theo dõi và tiến độ so với mục tiêu | 3 | 高 (cao) | 6-11 |  |
| 4-1 | Tự tạo chủ đề gợi ý (3 mỗi lần đề xuất) và bản nháp; nhờ AI viết lại tối đa 2 lần ([KS] 確認29) | 4. Bản nháp bài đăng | 高 (cao) | 6-6 | ⚠ 15, 16, 24 |
| 4-2 | Yêu cầu AI sửa và viết lại | 4 | 高 (cao) | 6-6 | ⚠ 28, 29 |
| 4-3 | 採用 (chấp nhận bản nháp), chọn có gửi quản lý duyệt hay không | 4 | 高 (cao) | 6-6 | ⚠ 25, 26, 33 |
| 4-4 | Phát hiện từ cấm. Quản lý đăng ký danh sách | 4 | 高 (cao) | 6-6 | ⚠ 4 |
| 5-1 | Tạo video (video ngắn hoặc video trình chiếu ảnh) từ ảnh | 5. Tạo video | 高 (cao) | 6-8 | ⚠ 31 |
| 5-2 | Video định dạng dọc, dùng chung cho 3 mạng xã hội | 5 | 高 (cao) | 6-8 |  |
| 5-3 | Xem video đã tạo, chọn dùng, tạo lại hoặc bỏ | 5 | 高 (cao) | 6-8 |  |
| 5-4 | Đếm số lần tạo video, tính gộp với phí tháng. Tài khoản công ty chỉ đếm, không thu | 5 | 高 (cao) | 6-3 | ⚠ 49, 51 |
| 5-5 | Ghi rõ video do AI tạo | 5 | 高 (cao) | 6-8 |  |
| 6-1 | Tin nhắn trong ứng dụng và thông báo đẩy đến điện thoại | 6. PWA, thông báo, tư liệu | 高 (cao) | 6-12 | ⚠ 12 |
| 6-2 | Hướng dẫn lần đầu (thêm vào màn hình chính, cho phép thông báo, đăng ký thanh toán, kết nối mạng xã hội) | 6 | 高 (cao) | 6-1 | ⚠ 9, 11, 12, 13 |
| 6-3 | Gửi ảnh và video (tài năng, quản lý gửi thay) | 6 | 高 (cao) | 6-7 | ⚠ 26, 27 |
| 6-4 | Lưu tư liệu lên OneDrive, mỗi ngày dùng một video tự làm | 6 | 高 (cao) | 6-7 | ⚠ 32 |
| 6-5 | Nhắc gửi tư liệu (trước giờ đăng 2 tiếng) | 6 | 中 (trung bình) | 6-7 |  |
| 6-6 | Xem trước bài đăng | 6 | 中 (trung bình) | 6-6 |  |
| 6-7 | Hiển thị số liệu và mức đạt mục tiêu cho tài năng | 6 | 高 (cao) | 6-11 | ⚠ 40 |
| 6-8 | Nền tảng PWA (ứng dụng web mở từ màn hình chính của điện thoại) và màn hình đầu tiên của ứng dụng | 6 | 高 (cao) | 6-12 |  |
| 7-1 | Xem thông tin tài năng (hồ sơ, mục tiêu, kết nối mạng xã hội, hội thoại) | 7. Màn hình quản trị và duyệt bài | 高 (cao) | 6-4 | ⚠ 42, 44, 47 |
| 7-2 | Xem bài đăng theo trạng thái, hủy bài đã hẹn trên màn hình quản trị | 7 | 高 (cao) | 6-10 |  |
| 7-3 | Đổi trạng thái tài năng: 利用前 (trước khi dùng), 利用中 (đang dùng), 利用終了 (đã kết thúc) | 7 | 高 (cao) | 6-2 | ⚠ 53–56 |
| 7-4 | Danh sách 8 loại thông báo cho quản lý, đánh dấu đã xử lý | 7 | 高 (cao) | 6-12 | ⚠ 45, 46 |
| 7-5 | Dừng hoặc chạy lại đăng tự động, toàn bộ hoặc từng tài năng | 7 | 高 (cao) | 6-10 |  |
| 7-6 | Nhật ký việc quản lý xem thông tin | 7 | 中 (trung bình) | 6-2 | ⚠ 44 |
| 7-7 | Duyệt hoặc trả lại bài đăng | 7 | 高 (cao) | 6-9 | ⚠ 33–36 |
| 8-1 | Phân tích và chọn giờ đăng | 8. Đăng bài và số liệu | 中 (trung bình) | 6-11 | ⚠ 30 |
| 8-2 | Kết nối dịch vụ đăng bài (Upload-Post), màn hình kết nối mạng xã hội | 8 | 高 (cao) | 6-10 | ⚠ 9, 10, 11 |
| 8-3 | Đăng lên các mạng đã kết nối, ghi kết quả riêng cho từng mạng | 8 | 高 (cao) | 6-10 |  |
| 8-4 | Chống bị khóa tài khoản (biện pháp chưa quyết) | 8 | 高 (cao) | 6-10 | ⚠ 37 |
| 8-5 | Thông báo khi đăng bài lỗi | 8 | 高 (cao) | 6-10 | ⚠ 38 |
| 8-6 | Thông báo khi mất kết nối mạng xã hội | 8 | 中 (trung bình) | 6-10 |  |
| 8-7 | Lấy số liệu bài đăng và số người theo dõi mỗi ngày | 8 | 高 (cao) | 6-11 |  |
| 8-8 | Ghi số liệu vào file của tài năng | 8 | 高 (cao) | 6-11 |  |
| 8-9 | Lấy khung giờ bài được xem và được tương tác | 8 | 低 (thấp) | 6-11 |  |
| 9-1 | Đăng bài bằng tài khoản công ty | 9. Tài khoản công ty | 中 (trung bình) | 6-10 | ⚠ 52 |

Nguồn: [YK2] mục 6 (nội dung từng chức năng), 別紙C (phụ lục C, đối chiếu với SOW), và các 確認 ở cuối mỗi UC trong mục 4.

## 3. Trong phạm vi: yêu cầu phi chức năng và sản phẩm bàn giao

| Hạng mục | Nội dung đã ghi rõ | Mục trong [YK2] |
| --- | --- | --- |
| Thiết bị | Ứng dụng tài năng chạy trên iPhone và Android dưới dạng PWA (ứng dụng web cài lên màn hình chính). Màn hình quản trị chủ yếu chạy trên trình duyệt máy tính, và phải dễ xem trên trình duyệt điện thoại | 9-1, UC-10 前提 |
| Môi trường | Có môi trường thật và môi trường kiểm thử. Không ảnh hưởng ứng dụng tự động nhắn tin Instagram đang chạy của khách | 9-1 |
| Hiệu năng | Xử lý buổi sáng phải xong trước giờ nhắn tin | 9-2 |
| Sự cố | Dịch vụ bên ngoài lỗi thì chỉ dừng chức năng đó. Báo khi đăng bài lỗi | 9-3 |
| Nhật ký | Nhật ký xem thông tin, nhật ký thao tác, nhật ký xử lý | 9-4 |
| Bảo mật | Quản lý đăng nhập hai bước. Mã hóa. Khóa kết nối dịch vụ ngoài không hiện ra. AI không được dùng dữ liệu để huấn luyện. Không lưu thông tin thẻ | 10-1, 10-2 |
| Thông báo | 17 loại thông báo tự động, kể cả email kết quả đăng ký và thông báo có người đăng ký | 6-13, 別紙A (phụ lục A) |
| Màn hình chung | Ưu tiên dễ dùng hơn đẹp. Thiết kế của アデッソ làm tham khảo, giống Instagram, Trang của tôi là trung tâm, nhân vật モモ (Momo). Hiển thị rõ khi lỗi, khi không có dữ liệu, khi đang tải | 6-14 |
| Danh sách từ cấm mẫu, mẫu file kinh nghiệm đăng bài | FutureCore soạn bản mẫu, khách xem lại | UC-02 前提, 11 |
| Tài liệu yêu cầu | Bản định nghĩa yêu cầu chính thức và 画面定義書 (bản định nghĩa màn hình), làm lại từ thiết kế của khách | 1-5, 6-14 |
| Kiểm thử | Kiểm thử theo tiêu chí nghiệm thu và giao kết quả. Hỗ trợ đợt kiểm thử nghiệm thu. Kiểm tra đăng bài bằng tài khoản thật | 2-3, 12-1, 12-4 |
| Hướng dẫn cho quản lý | 8 nhóm thao tác trên màn hình quản trị và ChatGPT, kể cả duyệt đơn và tạo tài khoản công ty | 12-5 |
| Ước tính chi phí vận hành | Chi phí dịch vụ ngoài và máy chủ hằng tháng, kể cả bảng giá Upload-Post theo số tài năng (sẽ gửi riêng) | 8, 9-2, UC-08 前提 |

## 4. Ngoài phạm vi

**Bị cắt so với báo giá (không làm):** phân loại trả phí/miễn phí, trần tháng tạo video, hai loại quản lý, người duyệt chỉ định, tự đăng lại, trần phí AI (CR-11〜CR-16). Riêng việc gửi yêu cầu duyệt theo nhóm hoặc quản lý phụ trách nay làm theo CR-19 ([KS] 確認34). Nhiều tài khoản trên một mạng (CR-20): không làm ([KS] 確認10).

### 4.1 Đã chốt loại trừ

| Hạng mục | Căn cứ |
| --- | --- |
| Giao diện tài năng qua LINE (đã đổi sang PWA ngày 20/10/2026) | 別紙B (phụ lục B) số 17, 18 |
| Ứng dụng cài đặt qua App Store hoặc Google Play | 6-12 (6-8), UC-03 前提 |
| Dùng hệ thống của ứng dụng アデッソ hiện có (chỉ dùng tên, logo và màu) | 2-6, 6-14, 別紙B số 27 |
| Loại tài năng miễn phí, và việc chuyển qua lại giữa trả phí và miễn phí | 5-4, 6-3 (1-2, 1-3) |
| Mức trần phí tạo video hằng tháng, số lần tạo video miễn phí | 5-4, 6-14, 別紙B số 14 |
| Không duyệt đơn và chấp nhận người lạ vào dùng | UC-01 |
| Lưu thông tin thẻ, lưu bằng chứng đồng ý của phụ huynh trong hệ thống | 10-2, 7-2, UC-03 前提 |
| Tự động đăng lại bài bị lỗi. Đăng bù bài đã bị hủy khi dừng đăng tự động | 6-10 (8-5, 7-5), UC-08 前提 |
| Ưu tiên thẩm mỹ (đã chốt: ưu tiên dễ dùng hơn đẹp) | 6-14, 別紙B |
| Bảo trì sau phát hành, xử lý khi dịch vụ ngoài đổi đặc tả, giá hoặc điều khoản (sẽ làm hợp đồng riêng) | 11, 別紙B số 38 |
| Đảm bảo tài khoản mạng xã hội không bị khóa, thông báo luôn tới nơi, nội dung AI chính xác | 9-5, 11 |
| Những chỗ còn sót trong thiết kế của khách: LINE, lượt video miễn phí, hạn mức tiền video, không có bước trả lại bài, quyền riêng để dừng đăng tự động | 6-14 |

### 4.2 Để sau, chưa cam kết (mục 13 今後検討する機能 – các chức năng sẽ xem xét sau)

| Nhóm | Chức năng | Căn cứ |
| --- | --- | --- |
| Tăng động lực | Bảng xếp hạng và phần thưởng. Trò chuyện bằng giọng nói (tính phí riêng) | 13, 別紙B số 20, 32 |
| Mở rộng đối tượng | X (Twitter cũ). Phát trực tiếp trên TikTok. Suất cho công ty trong tập đoàn. Người hâm mộ dùng. Vận hành mạng xã hội cho doanh nghiệp đối tác. Chức năng cho nhà tài trợ và công ty tiếp thị. Mức làm trong đợt này sẽ bàn sau | 13, UC-01 前提 |
| Thêm chức năng | Trả lời bình luận. 連絡網 (mạng liên lạc nội bộ). Quản lý lịch. Thu thập xu hướng. TikTok Shop và các chức năng tạo doanh thu | 13, 別紙B số 22, 36, 37 |
| Thay đổi kiến trúc | Liên kết với hệ thống hiện có. Chạy AI trên máy cục bộ hoặc máy chủ riêng | 13, 別紙B số 28, 33 |

### 4.3 Việc thuộc về khách hàng (アデッソ), FutureCore không làm

| Việc | Căn cứ |
| --- | --- |
| Quyết định duyệt đơn đăng ký (quản lý thao tác trên hệ thống). Mức phí tháng do hợp đồng giữa アデッソ và tài năng | 2-3 |
| Soạn điều khoản sử dụng, cách hiển thị giá và thu phí, ghi chú theo 特定商取引法 (luật giao dịch thương mại đặc thù của Nhật) | 2-3, 11, 確認1 |
| Quyết đơn giá mỗi lần tạo video. Quyết toán nội bộ phí video của tài khoản công ty | UC-06 前提, UC-12 前提 |
| Chuẩn bị kinh nghiệm đăng bài và chỉ dẫn đối phó thuật toán. Xem lại danh sách từ cấm, gửi thêm cách nói công ty không dùng | 2-3, 2-4, UC-02 前提, 確認4 |
| Tạo ChatGPT project cho từng tài năng và gắn với thư mục OneDrive (thao tác của quản lý ngoài hệ thống) | UC-01 前提 |
| Ký hợp đồng và làm thẩm định với các dịch vụ ngoài. Chịu phí cả trong giai đoạn phát triển và kiểm thử | 8, 14-4 |
| Nhận ủy thác xử lý dữ liệu cá nhân và quyền hình ảnh của tài năng thuộc công ty khi ký hợp đồng. Lấy đồng ý của phụ huynh với người vị thành niên | 2-3, 10-3, UC-03 前提 |
| Nhập dữ liệu ban đầu (thông tin tài năng, mục tiêu, kinh nghiệm đăng bài, từ cấm) | 7-4 |
| Cung cấp tài khoản và thông tin kết nối cho giai đoạn phát triển và kiểm thử, tài khoản mạng xã hội để kiểm thử | 8, 12-4, 14-4 |
| Cung cấp ảnh logo, mã màu, tài liệu qua thư mục Google Drive | 6-14, 14-2 |
| Tài năng tự chuyển Instagram sang tài khoản doanh nghiệp hoặc nhà sáng tạo | UC-03 前提 |
| Duyệt tài liệu, trả lời bảng xác nhận, quyết mức ưu tiên của chức năng | 1-5, 14-4 |

## 5. Chưa rõ phạm vi

Các mục dưới đây chưa được xếp vào "trong phạm vi" hay "ngoài phạm vi", vì phạm vi còn phụ thuộc câu trả lời của khách hàng hoặc tài liệu không có trong thư mục dự án.

### 5.1 Phụ thuộc tài liệu không có trong thư mục dự án

| Hạng mục | Vì sao chưa rõ | Căn cứ |
| --- | --- | --- |
| Danh sách loại trừ ở mục 4.2 của SOW (作業対象外 – công việc không thuộc phạm vi) | [YK2] chỉ ghi "theo SOW". Thư mục dự án không có hợp đồng, SOW hay báo giá | 1-3, 別紙D (phụ lục D) |
| Hình 4-1 (đối chiếu chức năng với UC) | Là hình ảnh, chưa trích được nội dung | Mục 4 |

### 5.2 Phạm vi phụ thuộc câu trả lời của khách

| 確認 | Đề xuất của FutureCore | Nếu khách không đồng ý | Mục trong [YK2] | Khách trả lời 17/11 ([KS]) |
| --- | --- | --- | --- | --- |
| 1 | Người ngoài công ty đăng ký theo cùng luồng với người thuộc công ty | Thêm thủ tục riêng cho người ngoài công ty (hợp đồng, đồng ý) | UC-01 | Đồng ý giả định |
| 6, 7, 8 | Màn hình chỉ dẫn cho AI: phạm vi toàn bộ / nhóm / tài năng, chạy thử, lịch sử phiên bản, mẫu câu. Phần theo nhóm cần kiểm chứng kỹ thuật | Nếu khách muốn: thêm màn hình mới, cần bàn chi phí và lịch (14-3). Nếu không: giữ cách chỉ dẫn qua ChatGPT và OneDrive | UC-02 | **Làm** màn chỉ dẫn (CR-18); không có nút mẫu câu; cần thêm màn nhập thông tin tài năng (確認8) |
| 47 | Nhóm tài năng: tạo nhóm, một tài năng nhiều nhóm, lọc theo nhóm | Như trên | UC-10 | **Làm** (CR-17) |
| 5 | チャレンジ (thử thách) do quản lý ghi qua ChatGPT vào file của tài năng | Nếu AI tự đề xuất thử thách thì thêm logic | UC-02 | AI đề xuất thử thách theo tình hình, quản lý đề xuất qua chỉ thị AI, tài năng nhận/từ chối, không duyệt; chờ khái niệm アデッソ viết |
| 11 | Kết nối thiếu mạng vẫn dùng được, chỉ đăng lên mạng đã kết nối | Chặn sử dụng cho tới khi kết nối đủ | UC-03 | Đồng ý: thiếu mạng vẫn dùng được |
| 10 | Mỗi mạng một tài khoản | Hỗ trợ nhiều tài khoản | UC-03, 6-10 (8-2) | Mỗi mạng một tài khoản; tài khoản nhóm (ユニット) coi là tài khoản công ty (CR-20 không làm) |
| 23, 29 | Không giới hạn số lần trò chuyện và viết lại bản nháp. Hạn chế chuyện riêng tư | Thêm giới hạn và cảnh báo | UC-04, UC-05 | Trò chuyện: khách ghi "đặt giới hạn", chưa chốt (確認23). Viết lại: **tối đa 2 lần** (確認29) |
| 27 | Quản lý gửi ảnh và tạo video thay tài năng. Chưa rõ cho tài năng hay chỉ tài khoản công ty | Nếu cho cả tài năng thì phí video tính vào hóa đơn của tài năng | UC-05 | Chỉ tài khoản công ty |
| 28 | Tài năng không tự sửa bản nháp, chỉ nhờ AI viết lại | Thêm chức năng sửa tay | UC-05 | **Tài năng tự sửa được** (CR-21) |
| 30 | Tài năng không đổi được giờ đăng | Thêm chức năng đổi giờ | UC-05 | Đồng ý: AI quyết giờ theo chỉ thị của アデッソ |
| 33 | Chỉ bài công việc cần khách hàng cho phép mới cần duyệt. AI không tự xác định | Thêm phân loại bằng AI hoặc mở rộng loại bài cần duyệt | UC-07 | Khách ghi: bài về công việc tài năng tham gia; chưa chốt |
| 37 | Không giới hạn số bài mỗi ngày vì lý do chi phí | Giữ giới hạn số bài | UC-08 | Đồng ý: không giới hạn |
| 43 | Quản lý góp ý qua chỉ dẫn cho AI, huấn luyện viên AI chuyển lời | Thêm chức năng nhắn tin trực tiếp từ quản lý | UC-10 | Đồng ý; tin nhắn trực tiếp để giai đoạn sau |
| 45 | Thông báo cho quản lý chỉ hiện trên màn hình quản trị | Thêm email hoặc thông báo điện thoại cho quản lý | UC-10 | Khách ghi: thêm email; chưa chốt |
| 52 | Tài khoản công ty không duyệt bài | Thêm luồng duyệt cho 9-1 | UC-12 | Đồng ý giả định |
| 20 | Khách còn ý tưởng tạo động lực nào khác không (câu hỏi mở) | Phạm vi có thể tăng, cần đối chiếu với SOW (14-3) | UC-04 | Đồng ý giả định (không thêm ý tưởng) |

Các 確認 khác (đánh dấu ⚠ ở mục 2) chỉ thay đổi chi tiết bên trong một chức năng đã thuộc phạm vi.

### 5.3 Có trong nghiệp vụ nhưng không có mã chức năng

| Hạng mục | Vì sao chưa rõ | Căn cứ |
| --- | --- | --- |
| Nhiệm vụ mỗi ngày, chúc mừng, ghi nhớ sở thích, tiến độ thử thách | Có trong UC-04 và 確認14, 20 nhưng không có trong mô tả chức năng ở 6-5 | UC-04, 確認14, 20 |
| Đưa tin tức trong ngày vào gợi ý chủ đề | Chỉ có ở 5-3 và 確認16 | 5-3, 6-6 (4-1) |
| Nhật ký thao tác và nhật ký xử lý | Mục 9-4 yêu cầu ghi lại, nhưng chỉ có chức năng xem nhật ký xem (7-6) | 9-4, 6-2 (7-6) |
| Gửi email (kết quả đăng ký, mật khẩu tạm, đặt lại mật khẩu) | Chắc chắn cần nhưng mục 8 chưa có dịch vụ gửi email | 6-1 (1-4), 8 |
| Báo quản lý khi tài năng thanh toán xong và cần nhập hồ sơ | Luồng UC-01 cần nhưng 7-4 không có loại thông báo này | UC-01 前提, 6-12 (7-4) |
| Xóa đơn bị từ chối | Chưa có quy định. (Xóa dữ liệu tài năng rời đi đã chốt: 6 tháng rồi tự xóa, [KS] 確認55; nay thuộc phạm vi, chưa có mã chức năng) | 7-3 |
| Cách kiểm tra bản quyền nội dung và tư liệu | Ghi "sẽ viết trong bản cuối" | 11 |

### 5.4 Phạm vi có điều kiện

| Hạng mục | Điều kiện | Căn cứ |
| --- | --- | --- |
| Chức năng phụ thuộc dịch vụ ngoài | Nếu chưa xong hợp đồng hoặc thẩm định trước đợt kiểm thử nghiệm thu thì bỏ khỏi nghiệm thu và phát hành riêng sau. Vì mọi tài năng phải thanh toán trước khi dùng AI, cổng thanh toán chậm sẽ chặn cả luồng chính | 12-1, UC-03 前提 |
| Phát hành từng phần | Sẽ quyết sau, tùy tiến độ phát triển | 12-1 |
| Chức năng 8-9, ưu tiên 低 (thấp) | Có thể làm sau khi vận hành chính thức, cần thỏa thuận bằng văn bản | 6, 12-3 |
| Mức ưu tiên của cả 54 chức năng | Là đề xuất của FutureCore, khách chưa quyết | 6, 14-4 |
| Thu phí gộp số tiền thay đổi theo tháng (5-4) | Phụ thuộc cổng thanh toán có hỗ trợ không | 5-4, 確認49 |
| Cách gửi thông báo đẩy (6-1) | Chức năng thuộc phạm vi nhưng cách làm còn 今後検討 (sẽ xem xét sau) | 8 |
| Biện pháp chống khóa tài khoản (8-4) | Chức năng thuộc phạm vi nhưng nội dung sẽ quyết sau khi xem quy định từng mạng | 6-10 (8-4), UC-08 前提 |
