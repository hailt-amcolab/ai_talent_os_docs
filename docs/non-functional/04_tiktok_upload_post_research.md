# TikTok và Upload-Post: lưu nháp, đăng trực tiếp và điều kiện tuân thủ

Ngày khảo sát: **25/11/2026 (UTC)**. Người thực hiện: Codex. Trạng thái: nghiên cứu kỹ thuật nội bộ dựa trên tài liệu công khai; chưa có kiểm thử đăng thật hoặc xác nhận độc lập của TikTok cho toàn bộ luồng AI育成OS. Không thay đổi yêu cầu, quyết định khách hoặc gate G1–G8.

## 1. Kết luận cho hai vấn đề khách giao

**Có đủ tài liệu để khẳng định Upload-Post cung cấp chức năng đăng trực tiếp lên TikTok.** TikTok có Direct Post API chính thức; Upload-Post công bố tích hợp đã được duyệt và hỗ trợ chế độ `DIRECT_POST`. [TikTok Direct Post](https://developers.tiktok.com/docs/en/content-posting-api-get-started), [Upload-Post TikTok FAQ](https://www.upload-post.com/platforms/tiktok/).

**Chưa đủ bằng chứng để khẳng định mọi cách tự động đăng của AI育成OS đều phù hợp quy định.** Cần phân biệt ba việc: API có chức năng; tài khoản thực tế đăng thành công; toàn bộ cách vận hành được nền tảng chấp nhận. Hai việc đầu không tự chứng minh việc thứ ba.

| Vấn đề | Kết quả | Giới hạn |
|---|---|---|
| API lưu nháp có được hỗ trợ không? | FACT: Có luồng Upload chính thức, người dùng hoàn tất trong TikTok | Cần quyền và sự cho phép; đây là gửi vào inbox để tiếp tục biên tập, không phải bài đã đăng |
| App đăng thẳng sang TikTok có bị cấm mặc nhiên không? | INFERENCE: Không; TikTok cung cấp API cho chính mục đích này | Phải dùng tích hợp/quyền hợp lệ và đáp ứng quy định áp dụng |
| Upload-Post có đăng trực tiếp được không? | FACT về tài liệu nhà cung cấp: Có `DIRECT_POST`, video và ảnh | Chưa chạy thật trong đợt khảo sát này |
| Đặt lịch có được Upload-Post hỗ trợ không? | FACT: Có cơ chế lưu và quản lý job | Khả năng đặt lịch ở dịch vụ không tự xác nhận TikTok chấp nhận mọi luồng đồng ý |
| AI chọn/sửa bài rồi đăng, không duyệt từng bài, không chọn privacy có chắc tuân thủ không? | Chưa chứng minh được | Mâu thuẫn đã ghi trong KS và YK3 còn nguyên |

Căn cứ cho luồng nháp: [TikTok Get Started – Upload, Prerequisites và Upload draft](https://developers.tiktok.com/docs/en/content-posting-api-get-started-upload-content). Căn cứ cho lịch: [Upload-Post Manage Scheduled Posts](https://docs.upload-post.com/api/schedule-posts).

## 2. Yêu cầu và quyết định đang có trong nguồn khách

Đã mở lại DOCX bản **0.3 ngày 24/11/2026**, đọc trực tiếp các đoạn XML dưới đây. Số `p` là thứ tự tất cả `w:p` trong `word/document.xml`, tính cả đoạn trống; **không phải số trang Word**. Hash và các ô đã trích được lưu tại [hồ sơ nguồn](04_tiktok_upload_post_evidence.json).

| Nguồn / vị trí | FACT đọc được | Ý nghĩa đối với khảo sát |
|---|---|---|
| YK3 §3-7, p929–930 | Giới hạn tần suất và các biện pháp khác sẽ được xác định khi thiết kế, tham chiếu §2-5 | Chưa có cam kết rằng chỉ cần giảm tần suất là đủ |
| YK3 §3-8, p940 | Adesso chuẩn bị hợp đồng và thủ tục xét duyệt dịch vụ ngoài | Tích hợp cần điều kiện vận hành thực tế |
| YK3 §3-8, p943 | Không bảo đảm không khóa SNS; đặt lịch, không xác nhận, tự động đăng và chỉ định công khai không khớp câu trả lời TikTok tháng 11/2026 | Không thể bỏ cảnh báo chỉ dựa vào việc Upload-Post có API |
| YK3 §3-8, p949–950 | Tài khoản đủ tuổi từng SNS; phương pháp kiểm quyền tư liệu chốt khi thiết kế | Cần kiểm tài khoản và nội dung riêng |
| KS `20261122!F20:H20`, No.19 | Giữ đăng trực tiếp qua Upload-Post, không chuyển nháp; chép lại câu trả lời TikTok và Upload-Post khác nhau | Đây là hướng đi dự án được ghi trong nguồn; không phải bằng chứng TikTok chấp thuận |
| KS `20261122!F21:H21`, No.20 | Manager vẫn được duyệt; ghi thao tác; ghi rủi ro khi thiếu Talent xác nhận | Chưa được suy luận quyền Manager thay mọi đồng ý mà TikTok yêu cầu |
| KS `20261122!F22:H23`, No.21–22 | Provider là Upload-Post / TONVI TECH SL; dự kiến khoảng 200 tài khoản, Talent tự kết nối | Đúng chủ đề kiểm nhà cung cấp; không đặt lại câu hỏi đã có |
| KS `20261122!F24:H24`, No.23 | Không thêm ô Talent chọn công khai từng bài; nguồn ghi TikTok yêu cầu nhưng Upload-Post nói không cần dựng màn đó ở OS | Điểm chưa được tài liệu công khai giải quyết dứt điểm |
| KS `20261122!F25:H25`, No.24 | Ghi hạn mức và lời provider rằng cách đăng hiện tại không chịu daily active-user cap | Phải đối chiếu đúng route và capability thực tế |

KS là `source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx`. Đã quét văn bản đủ năm sheet của QA và năm sheet KS để tìm TikTok/Upload-Post/quy định. Không tạo Q&A mới, không đổi trạng thái câu cũ. Những “câu trả lời TikTok/Upload-Post” ở KS là **nội dung nguồn thuật lại**; đợt này chưa có email/ticket gốc kèm ngày, bên gửi và phạm vi chấp thuận để xác thực độc lập.

## 3. Chuỗi bằng chứng cho khả năng đăng trực tiếp

### A. TikTok cho phép tích hợp API trong phạm vi được cấp

FACT: Developer Terms §II.1 cho phép tương tác tự động với Developer Services theo Developer Documentation; §II.3–4 giữ nghĩa vụ tuân thủ và quyền kiểm tra. Vì vậy không thể đồng nhất mọi lệnh API với bot trái phép, cũng không thể xem tự động hóa là quyền không giới hạn. [TikTok Developer Terms, sửa 26/12/2025](https://www.tiktok.com/legal/page/global/tik-tok-developer-terms-of-service/en).

### B. TikTok có endpoint đăng thẳng

FACT: `POST /v2/post/publish/video/init/`, scope `video.publish`, là endpoint Direct Post; client chưa audit bị giới hạn hiển thị riêng tư. Tài liệu yêu cầu metadata và đồng ý rõ ràng trước khi gửi. [Direct Post API Reference, cập nhật 27/10/2026, Overview / Initialize](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post).

### C. Upload-Post cung cấp khả năng đó cho ứng dụng tích hợp

FACT về tuyên bố provider: FAQ “Do I need TikTok developer approval to use it?” nói họ vận hành tích hợp Content Posting API đã duyệt, người dùng dịch vụ không phải nộp app riêng cho audited-client review. Đây là bằng chứng từ Upload-Post, **chưa phải hồ sơ audit do TikTok cung cấp**. [Upload-Post TikTok FAQ](https://www.upload-post.com/platforms/tiktok/).

FACT: Hướng dẫn white-label mô tả tạo profile, cấp link kết nối, người dùng kết nối SNS, rồi ứng dụng quản lý nội dung thay họ qua API. Đây là bằng chứng phù hợp cho mô hình OS → Upload-Post → SNS. [White-label Integration, Steps 1–4](https://docs.upload-post.com/guides/user-profile-integration).

FACT: Terms §1.1 và §2.2 cho phép agency và sản phẩm để khách kết nối tài khoản trên gói tương ứng. Phần mở đầu và §5.4 nêu Upload-Post độc lập, không được TikTok bảo trợ; §6.5 không bảo đảm quyền truy cập/quota/duyệt API bên ngoài. Hai điều này không mâu thuẫn với việc có một app được duyệt. [Upload-Post Terms, cập nhật 02/10/2026](https://www.upload-post.com/terms-of-use/).

### D. Cấu hình API có thể kiểm chứng

FACT: Upload Video quy định `post_mode=DIRECT_POST` để đăng, `MEDIA_UPLOAD` để gửi nháp; mặc định là Direct Post. Ví dụ dưới chỉ minh họa hợp đồng API, **chưa thực thi**; chỉ dùng privacy đã được chọn/cho phép. [Upload Video, TikTok parameters](https://docs.upload-post.com/api/upload-video/).

```sh
curl -X POST 'https://api.upload-post.com/api/upload' \
  -H 'Authorization: Apikey YOUR_API_KEY' \
  -F 'user=talent-test-profile' \
  -F 'platform[]=tiktok' \
  -F 'video=@/path/to/approved-video.mp4' \
  -F 'title=Caption da duoc xac nhan' \
  -F 'post_mode=DIRECT_POST' \
  -F 'privacy_level=SELF_ONLY' \
  -F 'disable_comment=true' \
  -F 'disable_duet=true' \
  -F 'disable_stitch=true' \
  -F 'disable_inbox_fallback=true' \
  -F 'async_upload=true'
```

Đây là mẫu thử riêng tư; không chứng minh đăng công khai. Để kiểm công khai phải chọn mức được tài khoản cho phép, có đồng ý phù hợp và ghi nhận bài thật. Không đưa API key vào frontend hoặc tài liệu bằng chứng.

Ảnh có API riêng `/api/upload_photos`, hỗ trợ cả hai mode. Video draft không mang caption; photo draft có thể giữ title/description. [Upload Photos, TikTok](https://docs.upload-post.com/api/upload-photo), [Active User Cap guide, MEDIA_UPLOAD](https://docs.upload-post.com/guides/reached-active-user-cap-error/).

## 4. Những điều kiện chưa thể bỏ qua

### Đồng ý, privacy và đối tượng sử dụng

FACT: Content Sharing Guidelines yêu cầu người dùng biết và kiểm soát bài; xem trước, chỉnh nội dung, đồng ý trước khi gửi; tự chọn privacy không mặc định; bật tương tác thủ công theo khả năng tài khoản; khai báo nội dung thương mại. Intended Use không chấp nhận công cụ chỉ phục vụ tài khoản của bản thân/nhóm. [TikTok Content Sharing Guidelines, Intended Use / Required UX, cập nhật 04/08/2026](https://developers.tiktok.com/docs/en/content-sharing-guidelines).

INFERENCE: OAuth cấp quyền kết nối không tự chứng minh người dùng đã duyệt nội dung cuối cùng do AI sửa sau đó. Không có đủ tài liệu để suy ra việc dùng API trung gian miễn toàn bộ nghĩa vụ trên. Cần biết **route cụ thể** Upload-Post dùng và phạm vi TikTok duyệt cho route đó trước khi áp dụng kết luận Direct Post cho mọi loại kết nối.

FACT: Creator Info trả privacy và tương tác theo tài khoản. [TikTok Query Creator Info](https://developers.tiktok.com/docs/en/content-posting-api-reference-query-creator-info). Upload-Post có `GET /api/uploadposts/tiktok/settings?profile=...`; cần xử lý lỗi mức riêng tư không được phép và yêu cầu reconnect. [Get TikTok Publishing Settings](https://docs.upload-post.com/api/get-tiktok-settings/).

### Đặt lịch khác với tự tạo bài không duyệt

FACT: Upload-Post có job lịch để xem, sửa, hủy. [Manage Scheduled Posts](https://docs.upload-post.com/api/schedule-posts). KS No.19 thuật lại provider gửi sang TikTok khi đến giờ, còn TikTok yêu cầu xác nhận và đăng trong cùng luồng.

INFERENCE: Một endpoint nhận lịch chứng minh khả năng giữ lịch ở provider. Nó chưa giải quyết câu hỏi có được dùng đồng ý chung để AI tự chọn thời điểm/nội dung và đăng về sau không. Cũng không nên viết “TikTok cấm mọi hình thức đặt lịch” từ việc endpoint TikTok không có tham số lịch. Mâu thuẫn cụ thể của OS vẫn cần đối chiếu hồ sơ provider/nền tảng.

### Hạn mức và chống khóa

FACT: TikTok Direct Post init giới hạn 6 request/phút/token. [Direct Post Reference, Request](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post). Upload endpoint có lỗi quá nhiều pending shares, tối đa 5 pending trong 24 giờ theo mô tả API. Đây không phải cam kết toàn hệ thống chỉ được đăng 5 bài/ngày. [TikTok Upload Reference, Error codes](https://developers.tiktok.com/docs/en/content-posting-api-reference-upload-video).

FACT: Upload-Post công bố mức 15 bài/24 giờ/tài khoản và idempotency chống gửi trùng. [Rate Limits, Daily Upload Caps / Duplicate Protection](https://docs.upload-post.com/guides/rate-limits). TikTok mô tả posting cap thường khoảng 15, có thể thay đổi và dùng chung giữa client. [Content Sharing Guidelines, caps](https://developers.tiktok.com/docs/en/content-sharing-guidelines).

FACT về provider: kết nối mới được mô tả không chịu active-user cap cũ; kết nối cũ có thể fallback sang inbox với `success:true` và `fallback_to_inbox:true`. [Reached Active User Cap](https://docs.upload-post.com/guides/reached-active-user-cap-error/). Vì vậy không khẳng định cả 200 tài khoản đều không có cap khi chưa đọc capability của từng kết nối.

FACT: User Profiles phân biệt các nhóm capability theo kiểu kết nối; có nhóm không có `video_privacy` và luôn đăng video public. [User Profiles, TikTok capabilities](https://docs.upload-post.com/api/user-profiles/). Đây là bằng chứng cần kiểm route; không phải bằng chứng được phép bỏ lựa chọn privacy.

PROPOSAL cho §3-7: giới hạn theo tài khoản, chống trùng, dừng khi bị hạn chế, đối soát trạng thái, hủy lịch ngoài khi cần dừng. Phân công đội tích hợp/provider xác định thông số thực tế. Không tăng tài khoản/API key để né hạn mức. TikTok yêu cầu tôn trọng throttling và không spam; quyền tích hợp có thể bị thu hồi. [Developer Guidelines, Maintenance Requirements](https://developers.tiktok.com/docs/en/our-guidelines-developer-guidelines).

### Nội dung, AI, âm nhạc và PR

FACT: API có trường khai báo AI; cần đối chiếu cách gắn nhãn trên tài khoản thực tế. [Upload-Post AI Content Labeling](https://docs.upload-post.com/guides/ai-content-labeling). Quy định nội dung TikTok vẫn áp dụng cho mọi người/bài. [Community Guidelines tiếng Nhật](https://www.tiktok.com/community-guidelines/ja/).

FACT: Branded Content Policy yêu cầu bật commercial disclosure khi đăng branded content. Do đó chỉ tự thêm chữ `PR` trong caption chưa chứng minh đáp ứng yêu cầu bật nhãn nền tảng. [Branded Content Policy, What do you need to do](https://www.tiktok.com/legal/page/global/bc-policy/en). Music Usage Confirmation yêu cầu không có nhạc được bảo hộ hoặc có đủ giấy phép cần thiết. [Music Usage Confirmation](https://www.tiktok.com/legal/page/global/music-usage-confirmation/en).

Đây là kiểm tra kỹ thuật/chính sách liên quan; không tự sửa quyết định KS No.32 về cách Talent nhập PR.

## 5. Bằng chứng cần thu để chứng minh với tài khoản thật

PROPOSAL — đội tích hợp thực hiện, không phải Q&A mới cho khách và chưa gửi provider trong tác vụ này:

| Việc | Bằng chứng cần lưu | Ai xử lý |
|---|---|---|
| Xác định tích hợp | Tên app/client/route thực tế, scope, phạm vi audit/được phép white-label, điều kiện với tài khoản agency và Talent | Provider + Tech Lead |
| Giải quyết khác biệt UX | Email/ticket gốc về lịch, không xác nhận từng bài, AI sửa bài, Manager duyệt, privacy mặc định; căn cứ TikTok cho ngoại lệ nếu có | Provider + đầu mối TikTok |
| Kiểm tài khoản | Profile, route/capabilities/settings, loại tài khoản, phạm vi được phép; che token | Đội tích hợp |
| Đăng Direct Post ngay | Request đã che bí mật, mode thực tế, kết quả cuối, post ID/URL, ảnh bài trên profile; người đồng ý và hash nội dung | Đội tích hợp + QA |
| Kiểm public | Tài khoản đủ điều kiện; chọn public hợp lệ; kiểm từ tài khoản/ngữ cảnh khác; bài private không thay bằng chứng public | QA |
| Đặt lịch | job ID, thời điểm yêu cầu/thực thi, trạng thái cuối; kiểm hủy và việc sửa nội dung sau duyệt | Đội tích hợp + QA |
| Nhánh nháp và fallback | Inbox có media, chưa có bài công khai, caption video/photo, flag fallback, lỗi quota | QA |
| Quy mô dự kiến | Hạn mức gói/profile và route thực tế, tải lịch có kiểm soát; không đăng hàng loạt để chứng minh “không bị khóa” | Provider + đội tích hợp |

FACT: TikTok `PUBLISH_COMPLETE` biểu thị đã đăng, khác upload đang xử lý. [Get Post Status](https://developers.tiktok.com/docs/en/content-posting-api-reference-get-video-status). Upload-Post Status có thể báo thành công nhưng post ID/URL còn chờ moderation; cần đọc lại status/history. [Upload Status, Behavior](https://docs.upload-post.com/api/upload-status), [Upload History](https://docs.upload-post.com/api/upload-history).

INFERENCE: Thành công một lần chứng minh khả năng đăng của cấu hình đã thử. Không chứng minh nền tảng chấp nhận mọi hoạt động tương lai hay bảo đảm tài khoản không bị khóa. Việc thiếu API key/kiểm thử ở đây giới hạn kết luận thực nghiệm, không phủ nhận chức năng đã được tài liệu hóa.

## 6. Đề xuất diễn đạt cho báo cáo nội bộ và §3-7/§3-8

**PROPOSAL**, chưa thay văn bản nguồn hoặc đặc tả đã duyệt:

> Có cơ sở tài liệu để triển khai đăng trực tiếp lên TikTok thông qua Upload-Post. Dịch vụ hỗ trợ cả Direct Post và gửi nháp, đồng thời cung cấp cơ chế đặt lịch ở phía dịch vụ. Việc gửi nháp yêu cầu người dùng hoàn tất bài trong ứng dụng TikTok. Khả năng đăng trực tiếp không đồng nghĩa mọi luồng tự động đăng đều đã được TikTok chấp thuận. Với luồng hiện tại của AI育成OS, cần tiếp tục kiểm chứng phạm vi tích hợp, xác nhận nội dung, lựa chọn công khai và điều kiện sử dụng cho Talent/agency. Giữ cảnh báo hạn chế bài/tài khoản và không bảo đảm chống khóa tuyệt đối.

Không cần đổi quyết định giữ Direct Post sang nháp để ghi nhận kết quả nghiên cứu này. Cũng chưa có cơ sở xóa cảnh báo p943. Chưa đánh VERIFIED cho tuân thủ toàn luồng; không cấp PASS G5/G8 hoặc thay chữ ký reviewer.

## 7. Danh mục tài liệu chính thức đã tra

Phạm vi là tài liệu liên quan trực tiếp đến hai vấn đề, không tuyên bố đã tìm hết mọi trang TikTok/Upload-Post trên Internet. Các link trong nội dung là bằng chứng chính; dưới đây bổ sung nhóm tài liệu hỗ trợ.

| Nhóm | Tài liệu và vị trí đọc |
|---|---|
| TikTok API | [Direct Post tutorial](https://developers.tiktok.com/docs/en/content-posting-api-get-started), [Upload tutorial](https://developers.tiktok.com/docs/en/content-posting-api-get-started-upload-content), [Direct Post reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post), [Upload reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-upload-video), [Creator Info](https://developers.tiktok.com/docs/en/content-posting-api-reference-query-creator-info), [Post Status](https://developers.tiktok.com/docs/en/content-posting-api-reference-get-video-status), [Media Transfer Guide](https://developers.tiktok.com/docs/en/content-posting-api-media-transfer-guide) |
| TikTok quy định | [Content Sharing Guidelines](https://developers.tiktok.com/docs/en/content-sharing-guidelines), [Developer Guidelines](https://developers.tiktok.com/docs/en/our-guidelines-developer-guidelines), [Developer Terms](https://www.tiktok.com/legal/page/global/tik-tok-developer-terms-of-service/en), [ROW Terms tiếng Nhật](https://www.tiktok.com/legal/page/row/terms-of-service/ja), [Community Guidelines](https://www.tiktok.com/community-guidelines/ja/), [Music](https://www.tiktok.com/legal/page/global/music-usage-confirmation/en), [Branded Content](https://www.tiktok.com/legal/page/global/bc-policy/en) |
| Upload-Post tích hợp | [TikTok FAQ](https://www.upload-post.com/platforms/tiktok/), [White-label guide](https://docs.upload-post.com/guides/user-profile-integration), [White-label product](https://www.upload-post.com/whitelabel/), [User Profiles](https://docs.upload-post.com/api/user-profiles/), [Publishing Settings](https://docs.upload-post.com/api/get-tiktok-settings/) |
| Upload-Post đăng/vận hành | [Video](https://docs.upload-post.com/api/upload-video/), [Photos](https://docs.upload-post.com/api/upload-photo), [Schedules](https://docs.upload-post.com/api/schedule-posts), [Status](https://docs.upload-post.com/api/upload-status), [History](https://docs.upload-post.com/api/upload-history), [Webhooks](https://docs.upload-post.com/api/webhooks), [Rate Limits](https://docs.upload-post.com/guides/rate-limits), [Active User Cap](https://docs.upload-post.com/guides/reached-active-user-cap-error/), [AI labels](https://docs.upload-post.com/guides/ai-content-labeling) |
| Upload-Post điều khoản | [Terms of Use](https://www.upload-post.com/terms-of-use/), [Privacy](https://www.upload-post.com/data-and-privacy-policy/) |

Giới hạn truy xuất: URL Developer Terms cũ bị robots chặn, đã mở được trang pháp lý chính thức thay thế ở trên. Trang Help Center AIGC tiếng Nhật không trả nội dung đọc được nên không dùng làm bằng chứng kết luận. ROW Terms trả bản ghi cập nhật 02/2020; không nhận là đã xác minh toàn bộ điều khoản theo vùng/tài khoản tại ngày phát hành. Chưa đọc toàn bộ 57 ảnh DOCX; kết luận nguồn trong đợt này giới hạn ở đoạn chữ §3-7/§3-8 và ô KS liên quan. Không dùng các giới hạn này để tự thay đặc tả hoặc phủ nhận quyết định đang có.
