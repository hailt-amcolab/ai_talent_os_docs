# Phạm vi dự án: Trong phạm vi / Ngoài phạm vi / Chưa rõ

> ⚠ File này viết theo bản yêu cầu v1. Bản v2 đã đổi một số nội dung và đánh lại toàn bộ số 確認 (mục cần xác nhận). Đọc [12_Cap_nhat_theo_v2.md](12_Cap_nhat_theo_v2.md) trước khi dùng nội dung bên dưới.

## 1. Căn cứ và cách phân loại

Phạm vi dự án gồm 54 chức năng, chia thành 9 nhóm lớn theo SOW (bản mô tả phạm vi công việc). Các hạng mục khác chỉ được xếp vào "trong phạm vi" hay "ngoài phạm vi" khi tài liệu ghi rõ ([YK] mục 1-3, mục 6, 別紙C – phụ lục C).

| Nhóm | Tiêu chí (chỉ theo tài liệu, không tự giả định) |
| --- | --- |
| **Trong phạm vi** | Có mã chức năng trong mục 6 và 別紙C (phụ lục C), hoặc là yêu cầu phi chức năng hay sản phẩm bàn giao ghi rõ trong mục 9 đến 12 |
| **Ngoài phạm vi** | Tài liệu ghi rõ là không làm, để sau (mục 13), thuộc hợp đồng khác, hoặc là việc của khách hàng. Đã được chốt trong SOW hoặc biên bản họp (別紙B – phụ lục B) |
| **Chưa rõ** | Còn chờ 確認 (mục cần xác nhận), có trong thiết kế màn hình nhưng không có mã chức năng, hoặc phụ thuộc tài liệu không có trong thư mục dự án (mục 4.2 của SOW) |

**Lưu ý về 確認 (mục cần xác nhận):** đây là giả định của FutureCore, khách chưa xác nhận. Chức năng trong phạm vi mà có 確認 kèm theo được đánh dấu ⚠ trong bảng. Phạm vi của những chức năng đó có thể đổi theo câu trả lời của khách.

**Mức ưu tiên** ([YK] mục 6, 12-2, 12-3):

- **高 (cao):** bắt buộc để bắt đầu sử dụng. Đây là các chức năng chủ yếu, nếu có lỗi nghiêm trọng thì phải sửa trước khi phát hành.
- **中 (trung bình):** cần khi vận hành chính thức, nhưng có thể tạm làm bằng cách khác.
- **低 (thấp):** có thì tiện. Nếu không kịp thời gian hoặc chi phí thì có thể làm sau khi vận hành chính thức, khi đó cần thỏa thuận bằng văn bản.
- Khi vận hành chính thức (cuối tháng 2/2027) chỉ cam kết các chức năng 高 và 中. Mức ưu tiên hiện là đề xuất của FutureCore, khách hàng chưa quyết (mục 14-4).

## 2. Trong phạm vi: 54 chức năng

Tổng cộng có 54 chức năng: 42 高 (cao), 11 中 (trung bình), 1 低 (thấp, chức năng 8-9). Mã chức năng đánh số theo nhóm SOW. Cột [YK] là vị trí của chức năng trong bản định nghĩa yêu cầu khái quát.

| Mã | Chức năng | Nhóm SOW | Ưu tiên | Mục trong [YK] | ⚠ 確認 (mục cần xác nhận) liên quan |
| --- | --- | --- | --- | --- | --- |
| 1-1 | Thu phí thuê bao tháng (cước nhà mạng hoặc thẻ, qua màn hình của cổng thanh toán) | 1. Hợp đồng, đăng nhập, thu phí | 高 (cao) | 6-3 | ⚠ 8, 20, 33 |
| 1-2 | Phân loại tài năng có trả phí / miễn phí | 1 | 高 (cao) | 6-3 | ⚠ 2 |
| 1-3 | Chuyển từ có trả phí sang miễn phí | 1 | 中 (trung bình) | 6-3 |  |
| 1-4 | Đăng nhập của tài năng (email và mật khẩu, đường dẫn mời có hạn 7 ngày) | 1 | 高 (cao) | 6-1 |  |
| 1-5 | Nhận diện tài năng, tách biệt dữ liệu giữa các tài năng | 1 | 高 (cao) | 6-1 |  |
| 1-6 | Đăng nhập hai bước của quản lý, thêm hoặc vô hiệu hóa quản lý | 1 | 高 (cao) | 6-2 | ⚠ 3 |
| 2-1 | Đọc thông tin tài năng từ OneDrive mỗi sáng | 2. Quản lý cung cấp thông tin cho AI | 高 (cao) | 6-4 |  |
| 2-2 | Tự tạo thư mục riêng cho từng tài năng | 2 | 高 (cao) | 6-4 |  |
| 2-3 | Nhập thông tin tài năng từ ChatGPT | 2 | 高 (cao) | 6-4 |  |
| 2-4 | Đăng ký mục tiêu số người theo dõi và hạn đạt | 2 | 高 (cao) | 6-4 | ⚠ 1 |
| 3-1 | Hiểu tài năng và thuật toán của mạng xã hội | 3. Huấn luyện viên AI (AIコーチ) | 高 (cao) | 6-5 |  |
| 3-2 | Tự cải thiện (ghi thêm vào file của tài năng) | 3 | 高 (cao) | 6-5 |  |
| 3-3 | Giới hạn chủ đề trò chuyện, báo quản lý khi có chuyện nghiêm trọng | 3 | 高 (cao) | 6-5 | ⚠ 12 |
| 3-4 | Trò chuyện với huấn luyện viên AI, tin nhắn buổi sáng, tin nhắn sau khi đăng bài | 3 | 高 (cao) | 6-5 | ⚠ 9, 10, 24, 26 |
| 3-5 | Quản lý chi phí AI theo từng tài năng và từng tháng | 3 | 中 (trung bình) | 6-5 |  |
| 3-6 | Nhận xét bài hôm trước và gợi ý cải thiện | 3 | 高 (cao) | 6-5 |  |
| 3-7 | Thông báo khi số người theo dõi tăng và khi đạt mục tiêu | 3 | 中 (trung bình) | 6-5 | ⚠ 18 |
| 3-8 | Tổng kết tuần | 3 | 中 (trung bình) | 6-5 |  |
| 3-9 | Nhắc tài năng lâu không đăng bài (sau 3 ngày), báo quản lý (sau 7 ngày) | 3 | 中 (trung bình) | 6-5 | ⚠ 25 |
| 3-10 | Hiển thị số người theo dõi và tiến độ so với mục tiêu | 3 | 高 (cao) | 6-11 |  |
| 4-1 | Tự tạo 3 chủ đề gợi ý và bản nháp bài đăng (chú thích, hashtag, hướng dẫn chụp, kịch bản) | 4. Bản nháp bài đăng | 高 (cao) | 6-6 | ⚠ 11, 13 |
| 4-2 | Yêu cầu sửa và viết lại, tài năng tự sửa tay | 4 | 高 (cao) | 6-6 |  |
| 4-3 | 採用 (chấp nhận bản nháp), chọn có gửi quản lý duyệt hay không | 4 | 高 (cao) | 6-6 | ⚠ 14 |
| 4-4 | Phát hiện từ cấm | 4 | 高 (cao) | 6-6 | ⚠ 6, 34 |
| 5-1 | Tạo video (video ngắn hoặc video trình chiếu ảnh) từ ảnh | 5. Tạo video | 高 (cao) | 6-8 | ⚠ 17 |
| 5-2 | Video định dạng dọc, dùng chung cho 3 mạng xã hội | 5 | 高 (cao) | 6-8 |  |
| 5-3 | Xem video đã tạo, chọn dùng, tạo lại hoặc bỏ | 5 | 高 (cao) | 6-8 |  |
| 5-4 | Đếm số lần tạo video, tính gộp với phí tháng | 5 | 高 (cao) | 6-3 | ⚠ 23, 33 |
| 5-5 | Ghi rõ video do AI tạo | 5 | 高 (cao) | 6-8 |  |
| 6-1 | Tin nhắn trong ứng dụng và thông báo đẩy đến điện thoại | 6. PWA, thông báo, tư liệu | 高 (cao) | 6-12 |  |
| 6-2 | Hướng dẫn lần đầu (thêm vào màn hình chính, cho phép thông báo, đăng ký thanh toán, kết nối mạng xã hội) | 6 | 高 (cao) | 6-1 | ⚠ 7 |
| 6-3 | Gửi ảnh và video (cả tài năng và quản lý đều gửi được) | 6 | 高 (cao) | 6-7 | ⚠ 15, 16 |
| 6-4 | Lưu tư liệu lên OneDrive, mỗi ngày dùng một video tự làm | 6 | 高 (cao) | 6-7 | ⚠ 36 |
| 6-5 | Nhắc gửi tư liệu (trước giờ đăng 2 tiếng) | 6 | 中 (trung bình) | 6-7 |  |
| 6-6 | Xem trước bài đăng | 6 | 中 (trung bình) | 6-6 |  |
| 6-7 | Hiển thị số liệu và mức đạt mục tiêu cho tài năng | 6 | 高 (cao) | 6-11 |  |
| 6-8 | Nền tảng PWA (ứng dụng web mở từ màn hình chính của điện thoại) và màn hình đầu tiên của ứng dụng | 6 | 高 (cao) | 6-12 | ⚠ 30 |
| 7-1 | Xem thông tin tài năng (hồ sơ, mục tiêu, kết nối mạng xã hội, hội thoại) | 7. Màn hình quản trị và duyệt bài | 高 (cao) | 6-4 | ⚠ 4 |
| 7-2 | Xem bài đăng theo trạng thái | 7 | 高 (cao) | 6-10 | ⚠ 28 |
| 7-3 | Đổi trạng thái tài năng: 利用前 (trước khi dùng), 利用中 (đang dùng), 利用終了 (đã kết thúc) | 7 | 高 (cao) | 6-2 | ⚠ 22 |
| 7-4 | Danh sách thông báo cho quản lý | 7 | 高 (cao) | 6-12 |  |
| 7-5 | Dừng hoặc chạy lại toàn bộ việc đăng tự động | 7 | 高 (cao) | 6-10 | ⚠ 29 |
| 7-6 | Nhật ký việc quản lý xem thông tin | 7 | 中 (trung bình) | 6-2 |  |
| 7-7 | Duyệt hoặc trả lại bài đăng | 7 | 高 (cao) | 6-9 | ⚠ 37 |
| 8-1 | Phân tích và chọn giờ đăng | 8. Đăng bài và số liệu | 中 (trung bình) | 6-11 |  |
| 8-2 | Kết nối dịch vụ đăng bài (Upload-Post), màn hình kết nối mạng xã hội | 8 | 高 (cao) | 6-10 | ⚠ 27 |
| 8-3 | Đăng lên 3 mạng xã hội, ghi kết quả riêng cho từng mạng | 8 | 高 (cao) | 6-10 |  |
| 8-4 | Chống bị khóa tài khoản (giới hạn số bài mỗi ngày) | 8 | 高 (cao) | 6-10 |  |
| 8-5 | Thông báo khi đăng bài lỗi | 8 | 高 (cao) | 6-10 |  |
| 8-6 | Thông báo khi mất kết nối mạng xã hội | 8 | 中 (trung bình) | 6-10 |  |
| 8-7 | Lấy số liệu bài đăng và số người theo dõi mỗi ngày | 8 | 高 (cao) | 6-11 |  |
| 8-8 | Ghi số liệu vào file của tài năng | 8 | 高 (cao) | 6-11 |  |
| 8-9 | Lấy khung giờ bài được xem và được tương tác | 8 | 低 (thấp) | 6-11 |  |
| 9-1 | Đăng bài bằng tài khoản công ty | 9. Tài khoản công ty | 中 (trung bình) | 6-10 | ⚠ 21 |

Nguồn: [YK] mục 6 (nội dung từng chức năng), 別紙C (phụ lục C, đối chiếu với SOW), và các 確認 ghi ở cuối mỗi mục, mỗi tình huống sử dụng trong mục 4 đến 6.

## 3. Trong phạm vi: yêu cầu phi chức năng và sản phẩm bàn giao

Ngoài 54 chức năng, tài liệu còn cam kết các yêu cầu và sản phẩm bàn giao dưới đây.

| Hạng mục | Nội dung đã ghi rõ | Mục trong [YK] |
| --- | --- | --- |
| Thiết bị | Ứng dụng tài năng chạy trên iPhone và Android dưới dạng PWA (ứng dụng web cài lên màn hình chính). Màn hình quản trị chạy trên trình duyệt máy tính | 9-1 |
| Môi trường | Có môi trường thật và môi trường kiểm thử. Không ảnh hưởng ứng dụng tự động nhắn tin Instagram đang chạy của khách | 9-1 |
| Hiệu năng | Xử lý buổi sáng (đọc thông tin, đọc số liệu, tạo bản nháp) phải xong trước giờ nhắn tin | 9-2 |
| Sự cố | Dịch vụ bên ngoài lỗi thì chỉ dừng chức năng đó, phần khác vẫn chạy. Báo khi đăng bài lỗi | 9-3 |
| Nhật ký | Nhật ký xem thông tin. Nhật ký thao tác (duyệt bài, đổi trạng thái, dừng hoặc chạy lại đăng tự động). Nhật ký xử lý (đăng bài, lấy số liệu, tạo video, thu phí) | 9-4 |
| Bảo mật | Quản lý đăng nhập hai bước. Mã hóa đường truyền và dữ liệu lưu trữ. Khóa kết nối dịch vụ ngoài không hiện trên màn hình hay nhật ký. AI không được dùng dữ liệu để huấn luyện. Không lưu thông tin thẻ | 10-1, 10-2 |
| Thông báo | 15 loại thông báo tự động (ai nhận, khi nào, qua kênh nào) | 6-13, 別紙A (phụ lục A) |
| Màn hình chung | Ưu tiên dễ dùng hơn đẹp. Dùng tên, logo và màu của ứng dụng アデッソ hiện có. Hiển thị rõ khi lỗi, khi không có dữ liệu, khi đang tải | 6-14 |
| Danh sách từ cấm mẫu | FutureCore soạn bản mẫu chung, khách xem lại và bổ sung | 4 (UC-02 – tình huống sử dụng 02), 11 |
| Tài liệu yêu cầu | Bản định nghĩa yêu cầu chính thức và 画面定義 (bản định nghĩa màn hình) | 1-5 |
| Kiểm thử | Kiểm thử theo tiêu chí nghiệm thu và giao kết quả. Trả lời câu hỏi và sửa lỗi trong đợt kiểm thử nghiệm thu. Kiểm tra đăng bài bằng tài khoản mạng xã hội thật sau khi đưa lên môi trường thật | 2-3, 12-1, 12-4 |
| Hướng dẫn cho quản lý | 8 nhóm thao tác trên màn hình quản trị và ChatGPT | 12-5 |
| Ước tính chi phí vận hành | Chi phí dịch vụ ngoài và máy chủ hằng tháng, kể cả khi số tài năng tăng (sẽ gửi riêng) | 8, 9-2 |

## 4. Ngoài phạm vi

Chỉ gồm những mục tài liệu ghi rõ là không làm, để sau, hoặc đã chốt trong SOW hay biên bản họp. Các loại trừ chỉ dựa trên 確認 (mục cần xác nhận, chưa chốt) nằm ở mục 5.

### 4.1 Đã chốt loại trừ

| Hạng mục | Căn cứ |
| --- | --- |
| Giao diện tài năng qua LINE (đã đổi sang PWA trong cuộc họp 20/10/2026) | [YK] 別紙B (phụ lục B), 正式要件整理表 (bảng tổng hợp yêu cầu chính thức) số 17, 18 |
| Ứng dụng cài đặt qua App Store hoặc Google Play | [YK] mục 6-12 (chức năng 6-8) |
| Dùng hệ thống của ứng dụng アデッソ hiện có (chỉ dùng tên, logo và màu) | [YK] mục 2-6, 6-14, 別紙B số 27 |
| Tài năng tự đăng ký tài khoản | [YK] mục 4, UC-01 |
| Nhận đơn đăng ký sử dụng và ký hợp đồng với tài năng (アデッソ làm ngoài hệ thống) | [YK] mục 4, UC-01 |
| Mức trần phí tạo video hằng tháng riêng của hệ thống | [YK] mục 5-4, 別紙B (đã chốt trong SOW) |
| Số lần tạo video miễn phí mỗi tháng | [YK] mục 5-4, 別紙B số 14 (họp 20/10/2026) |
| Chuyển tài năng từ miễn phí sang có trả phí | [YK] mục 5-4 |
| Lưu thông tin thẻ trong hệ thống | [YK] mục 10-2, 7-2 |
| Tự động đăng lại bài bị lỗi | [YK] mục 6-10 (chức năng 8-5) |
| Ưu tiên thẩm mỹ (đã chốt trong SOW: ưu tiên dễ dùng hơn đẹp) | [YK] mục 6-14, 別紙B |
| Bảo trì sau phát hành, xử lý khi dịch vụ ngoài đổi đặc tả, giá hoặc điều khoản (sẽ làm hợp đồng riêng) | [YK] mục 11, 別紙B số 38 |
| Đảm bảo tài khoản mạng xã hội không bị khóa, thông báo luôn tới nơi, nội dung AI chính xác | [YK] mục 9-5, 11 |

### 4.2 Để sau, chưa cam kết (mục 13 今後検討する機能 – các chức năng sẽ xem xét sau)

| Nhóm | Chức năng | Căn cứ |
| --- | --- | --- |
| Tăng động lực | Bảng xếp hạng và phần thưởng. Trò chuyện bằng giọng nói (tính phí riêng) | [YK] mục 13, 別紙B số 20, 32 |
| Mở rộng đối tượng | X (Twitter cũ). Phát trực tiếp trên TikTok. Tài năng ngoài công ty. Vận hành mạng xã hội cho doanh nghiệp đối tác. Chức năng cho nhà tài trợ và công ty tiếp thị | [YK] mục 13, 別紙B số 4, 34, 35 |
| Thêm chức năng | Trả lời bình luận. 連絡網 (mạng liên lạc nội bộ). Quản lý lịch. Thu thập xu hướng trên toàn bộ mạng xã hội. TikTok Shop và các chức năng tạo doanh thu | [YK] mục 13, 別紙B số 22, 36, 37 |
| Thay đổi kiến trúc | Liên kết với hệ thống hiện có (ví dụ dùng chung đăng nhập). Chạy AI trên máy cục bộ hoặc máy chủ riêng | [YK] mục 13, 別紙B số 28, 33 |

### 4.3 Việc thuộc về khách hàng (アデッソ), FutureCore không làm

| Việc | Căn cứ |
| --- | --- |
| Quyết định ai dùng, ai có trả phí hay miễn phí. Mức phí tháng do hợp đồng giữa アデッソ và tài năng | [YK] mục 2-3 |
| Điều khoản sử dụng, cách hiển thị giá và thu phí, phần ghi chú theo 特定商取引法 (luật giao dịch thương mại đặc thù của Nhật) | [YK] mục 2-3, 11 |
| Quyết đơn giá mỗi lần tạo video (FutureCore chỉ đưa mức tham khảo) | [YK] 別紙B số 15 |
| Chuẩn bị kinh nghiệm đăng bài và chỉ dẫn đối phó thuật toán. Xem lại danh sách từ cấm | [YK] mục 2-3, 2-4, 11 |
| Ký hợp đồng và làm thẩm định với các dịch vụ ngoài. Chịu phí cả trong giai đoạn phát triển và kiểm thử | [YK] mục 8, 14-4 |
| Lấy đồng ý xử lý dữ liệu cá nhân từ tài năng, và đồng ý của phụ huynh với người vị thành niên | [YK] mục 2-3, 10-3 |
| Nhập dữ liệu ban đầu (thông tin tài năng, mục tiêu, kinh nghiệm đăng bài, từ cấm) | [YK] mục 7-4 |
| Cung cấp tài khoản và thông tin kết nối cho giai đoạn phát triển và kiểm thử, tài khoản mạng xã hội để kiểm thử | [YK] mục 8, 12-4, 14-4 |
| Cung cấp ảnh logo và mã màu | [YK] mục 6-14 |
| Tài năng tự chuyển Instagram sang tài khoản doanh nghiệp hoặc tài khoản nhà sáng tạo | [YK] mục 4, UC-03 |
| Duyệt tài liệu, trả lời bảng các mục cần xác nhận, quyết mức ưu tiên của chức năng | [YK] mục 1-5, 14-4 |

## 5. Chưa rõ phạm vi

Các mục dưới đây chưa được xếp vào "trong phạm vi" hay "ngoài phạm vi", vì phạm vi còn phụ thuộc câu trả lời của khách hàng hoặc tài liệu không có trong thư mục dự án.

### 5.1 Phụ thuộc tài liệu không có trong thư mục dự án

| Hạng mục | Vì sao chưa rõ | Căn cứ |
| --- | --- | --- |
| Danh sách loại trừ ở mục 4.2 của SOW (作業対象外 – công việc không thuộc phạm vi) | [YK] chỉ ghi "theo SOW", không liệt kê. Thư mục dự án không có hợp đồng, SOW hay báo giá | [YK] mục 1-3, 別紙D (phụ lục D) |

### 5.2 Loại trừ hoặc giới hạn dự kiến, chờ khách xác nhận

| 確認 (mục cần xác nhận) | Giả định của FutureCore | Nếu khách không đồng ý | Mục trong [YK] |
| --- | --- | --- | --- |
| 16 | Quản lý được gửi ảnh và tạo video thay tài năng. Chưa rõ chỉ áp dụng cho tài khoản công ty hay cho cả tài năng | Nếu áp dụng cho cả tài năng thì phí video tính vào hóa đơn của tài năng | 4 (UC-05), 6-7 (chức năng 6-3) |
| 19 | Quản lý khuyên tài năng qua kênh liên lạc hiện có, không gửi từ hệ thống | Thêm chức năng nhắn tin từ quản lý tới tài năng | 4 (UC-10) |
| 21 | Bài của tài khoản công ty không cần duyệt | Thêm luồng duyệt cho chức năng 9-1 | 4 (UC-12) |
| 28 | Hủy bài đã hẹn giờ chỉ làm trên màn hình của Upload-Post, không làm từ ứng dụng hay màn hình quản trị | Thêm chức năng hủy bài | 6-10 (chức năng 7-2) |
| 29 | Bài đến hạn lúc đang dừng đăng tự động thì không tự đăng sau khi chạy lại | Thêm xử lý đăng bù | 6-10 (chức năng 7-5) |
| 31 | Màn hình quản trị chỉ tối ưu cho máy tính | Phải làm giao diện cho điện thoại. Bản thiết kế [TK-M] đã vẽ cả bản cho điện thoại (trang 1, 2, 18) | 9-1 |
| 32 | Không lưu bằng chứng đồng ý của phụ huynh | Thêm chức năng lưu đồng ý | 10-3 |
| 37 | Chỉ bài cho công việc cần khách hàng cho phép mới cần duyệt. AI không tự xác định bài nào là bài công việc | Thêm phân loại bằng AI hoặc mở rộng loại bài cần duyệt | 5-3 |
| 27 | Mỗi tài năng kết nối một tài khoản trên mỗi mạng xã hội | Hỗ trợ nhiều tài khoản | 6-10 (chức năng 8-2) |
| 35 | Khách còn ý tưởng nào khác để tạo động lực không (câu hỏi mở) | Phạm vi có thể tăng, cần đối chiếu với SOW và báo giá (mục 14-3) | 4 (UC-04) |

Các 確認 (mục cần xác nhận) khác, đánh dấu ⚠ ở mục 2, chỉ thay đổi chi tiết bên trong một chức năng đã thuộc phạm vi, không làm đổi ranh giới phạm vi.

### 5.3 Có trong thiết kế hoặc nghiệp vụ nhưng không có mã chức năng

| Hạng mục | Vì sao chưa rõ | Căn cứ |
| --- | --- | --- |
| M-10: tạo và quản lý nhóm phân loại tài năng | Thiết kế ghi 追加 (bổ sung), không có trong 54 chức năng | [TK-M] trang 2, 3, 12, 13 |
| M-11: màn hình sửa chỉ dẫn cho AI | Thiết kế ghi 追加 (bổ sung). [YK] mục 7-5 quy định sửa chỉ dẫn bằng file trên OneDrive, không có màn hình riêng | [TK-M] trang 1, 2, 13–15, [YK] mục 7-5 |
| Nhiệm vụ mỗi ngày, chúc mừng, ghi nhớ sở thích của tài năng | Có trong UC-04 và 別紙B (phụ lục B) nhưng không có trong phần mô tả chức năng ở mục 6-5, nên chưa rõ thuộc chức năng nào và nghiệm thu ra sao | [YK] mục 4 (UC-04), 別紙B |
| Đưa tin tức trong ngày vào gợi ý chủ đề | Chỉ có ở mục 5-3 và 確認11. Phần mô tả chức năng 4-1 không nhắc tới | [YK] mục 5-3, 6-6 (chức năng 4-1) |
| Nhật ký thao tác và nhật ký xử lý | Mục 9-4 yêu cầu ghi lại, nhưng chỉ có chức năng xem nhật ký truy cập (7-6). Chưa rõ có cần màn hình xem hai loại nhật ký này không | [YK] mục 9-4, 6-2 (chức năng 7-6) |
| Cách quản lý kiểm tra huấn luyện viên AI chạy đúng trước khi giao cho tài năng | Ghi 画面定義で決めます (sẽ quyết trong bản định nghĩa màn hình), chưa biết có cần chức năng riêng không | [YK] mục 4 (UC-01) |
| Xóa dữ liệu sau khi tài năng rời | Chỉ ghi giữ lại 一定の期間 (một khoảng thời gian nhất định), chưa rõ có cần chức năng tự xóa không | [YK] mục 7-3 |
| Cách kiểm tra bản quyền nội dung và tư liệu | Ghi "sẽ viết trong bản cuối", chưa rõ là một chức năng hay chỉ là quy trình vận hành | [YK] mục 11 |

### 5.4 Phạm vi có điều kiện

| Hạng mục | Điều kiện | Căn cứ |
| --- | --- | --- |
| Chức năng phụ thuộc dịch vụ ngoài (thanh toán, đăng bài, tạo video…) | Nếu chưa xong hợp đồng hoặc thẩm định trước đợt kiểm thử nghiệm thu thì bỏ khỏi nghiệm thu và phát hành riêng sau | [YK] mục 12-1 |
| Phát hành từng phần | Sẽ quyết sau, tùy tiến độ phát triển | [YK] mục 12-1 |
| Chức năng 8-9, ưu tiên 低 (thấp) | Có thể làm sau khi vận hành chính thức nếu không kịp, cần thỏa thuận bằng văn bản | [YK] mục 6, 12-3 |
| Mức ưu tiên của cả 54 chức năng | Là đề xuất của FutureCore, khách chưa quyết. Phạm vi khi vận hành chính thức (高 và 中) có thể đổi | [YK] mục 6, 14-4 |
| Thu phí gộp số tiền thay đổi theo tháng (chức năng 5-4) | Phụ thuộc cổng thanh toán có hỗ trợ không | [YK] mục 5-4, 確認33 |
| Cách gửi thông báo đẩy (chức năng 6-1) | Chức năng thuộc phạm vi nhưng cách làm còn 今後検討 (sẽ xem xét sau) | [YK] mục 8 |
