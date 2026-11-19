# Ca kiểm thử Upload-Post

Bản 2.0 · 19/11/2026 · Đi kèm [HUONG_DAN_TICH_HOP_VI.md](HUONG_DAN_TICH_HOP_VI.md) (viết tắt HD). Thay `TEST_CASES.csv` của bộ 1.1 (117 ca; xem lịch sử git).

**Loại kiểm thử:**
- **ĐV** (đơn vị): `npm test` trong `apps/api`, với Upload-Post giả (hàm `fetch` giả); chạy được không cần mạng.
- **TH** (tích hợp BE): `node:test` + PostgreSQL dùng một lần, chạy dưới một LOGIN thuộc `talent_runtime`, Upload-Post giả. Cần migration UP-D1〜D6 và bật ghi các bảng đăng bài (HD §4); trước đó chưa chạy được.
- **UP** (Upload-Post thật): tài khoản thử của khách ([YK2] §12-4) hoặc của đội, với tài khoản mạng xã hội thử. Ghi kết quả kèm môi trường, ngày giờ, `requestId` nội bộ, `request_id`/`job_id` của Upload-Post; lược tên tài khoản và URL đăng nhập.

**Nguyên tắc ghi kết quả:**
- Ca chạy với giả **không** chứng minh Upload-Post thật chấp nhận. Ca UP phải gọi Upload-Post thật.
- Ca nào chưa chạy thì ghi `CHƯA CHẠY` kèm lý do. Hiện chưa có API key: mọi ca UP là `CHƯA CHẠY`.
- Cột "Đã có test" nêu tệp test trong `apps/api`. Hiện **chưa có mã Upload-Post trong `apps/api`**. Mẫu ở HD §5, §7.2, §8.1 đã qua `tsc` strict và phép kiểm `assert` ở thư mục tạm ngày 19/11/2026. Các ca đã kiểm như vậy ghi "mẫu HD đã kiểm"; khi đưa mã vào `apps/api` phải viết lại thành test thật.

---

## 1. Dựng môi trường TH

Giống bộ OneDrive (CK §1 của bộ đó): PostgreSQL 17 trong Docker, chạy `prisma/local/bootstrap.sql` rồi mọi migration, tạo LOGIN thuộc `talent_runtime`, chạy test với `TEST_DATABASE_URL`. Thêm:
- Upload-Post giả là một `fetch` giả nhận vào `UploadPostClient`. Không dựng máy chủ HTTP giả ra mạng.
- Webhook thử bằng `app.request()` của Hono với chữ ký tự tính từ bí mật giả.

Không chạy test TH với `DATABASE_URL` của Supabase.

---

## 2. Ca đơn vị (ĐV)

**Adapter** (HD §5):

| Mã | Kiểm | Kết quả mong đợi | Đã có test |
|---|---|---|---|
| UP-U01 | Mọi request | Có `Authorization: Apikey …`; host đúng cấu hình; `redirect: 'manual'`; có hạn chờ | **Chưa có** |
| UP-U02 | `path` không bắt đầu bằng `/api/` | Ném lỗi, không gọi `fetch` | **Chưa có** |
| UP-U03 | Upload-Post trả 3xx | `unavailable`, không theo chuyển hướng | **Chưa có** |
| UP-U04 | POST bị lỗi mạng hoặc quá hạn chờ | `outcome_unknown` (không phải `unavailable`) | **Chưa có** (mẫu HD đã kiểm) |
| UP-U05 | GET bị lỗi mạng; GET 500 | `unavailable` | **Chưa có** |
| UP-U06 | POST 500 | `outcome_unknown` | **Chưa có** (mẫu HD đã kiểm) |
| UP-U07 | 401 | `auth`; không gọi thêm lần nào | **Chưa có** |
| UP-U08 | 403 (`TEAM_SEAT_SUSPENDED`, vượt số hồ sơ) | `plan`, giữ `providerCode` | **Chưa có** |
| UP-U09 | 429 kèm `X-RateLimit-Reset` | `rate_limited`, `retryAfterSeconds` ≥ 5 | **Chưa có** |
| UP-U10 | 429 `SCHEDULED_POSTS_LIMIT`; 429 kèm `violations`; 429 "monthly limit" | `quota` cả ba | **Chưa có** (mẫu HD đã kiểm `SCHEDULED_POSTS_LIMIT`) |
| UP-U11 | 409 `IDEMPOTENCY_KEY_IN_USE` | `conflict` | **Chưa có** |
| UP-U12 | Thân lỗi không phải JSON | Vẫn phân loại theo mã HTTP, không ném lỗi parse | **Chưa có** |
| UP-U13 | `startConnect` nhận `authorize_url` không phải `https://` | `unavailable` (`BAD_RESPONSE`) | **Chưa có** |
| UP-U14 | `cancelSchedule('a/b')` | Đường dẫn là `/api/uploadposts/schedule/a%2Fb` | **Chưa có** |
| UP-U15 | Log của adapter (bắt `console.*`) | Không có API key, `authorize_url`, chú thích, email | **Chưa có** |

**Form gửi lịch** (HD §7.2):

| Mã | Kiểm | Kết quả mong đợi | Đã có test |
|---|---|---|---|
| UP-U16 | Giờ đăng đã qua | `SCHEDULE_TIME_PASSED`; không có form nào được tạo | **Chưa có** (mẫu HD đã kiểm) |
| UP-U17 | Bài ảnh cho YouTube | `PLATFORM_NOT_APPLICABLE` | **Chưa có** |
| UP-U18 | YouTube | `title` = tiêu đề (≤ 100 ký tự), `description` = chú thích; tiêu đề 101 ký tự → `PLATFORM_INPUT_INVALID` | **Chưa có** (mẫu HD đã kiểm phần `description`) |
| UP-U19 | Instagram, TikTok | Chú thích ở `title`; không có `description` | **Chưa có** |
| UP-U20 | TikTok thiếu `tiktokPrivacy` | `PLATFORM_INPUT_INVALID` | **Chưa có** (mẫu HD đã kiểm) |
| UP-U21 | Video AI cho từng mạng | TikTok `is_aigc`, Instagram `is_ai_generated`, YouTube `containsSyntheticMedia` = `true`; tư liệu không phải AI thì không có trường nào | **Chưa có** (mẫu HD đã kiểm YouTube) |
| UP-U22 | `scheduled_date` | ISO-8601 UTC có `Z`; không có trường `timezone` | **Chưa có** |
| UP-U23 | Mọi form | Đúng một `platform[]`; có `async_upload=true`, `request_id`, `external_id` | **Chưa có** |
| UP-U24 | Gọi gửi | Header `Idempotency-Key` = khóa của delivery; không đặt `Content-Type` bằng tay | **Chưa có** |

**Chữ ký webhook** (HD §8.1):

| Mã | Kiểm | Kết quả mong đợi | Đã có test |
|---|---|---|---|
| UP-U25 | Chữ ký đúng với bí mật mới, danh sách `[cũ, mới]` | `ok` | **Chưa có** (mẫu HD đã kiểm) |
| UP-U26 | Chữ ký tính bằng bí mật không có trong danh sách | `bad_signature` | **Chưa có** (mẫu HD đã kiểm) |
| UP-U27 | Timestamp lệch 301 giây (cả hai phía) | `stale` | **Chưa có** (mẫu HD đã kiểm phía cũ) |
| UP-U28 | Thiếu header; không có tiền tố `sha256=`; timestamp không phải số | `missing` | **Chưa có** |
| UP-U29 | Hex không hợp lệ hoặc sai độ dài | `bad_signature`, không ném lỗi | **Chưa có** (mẫu HD đã kiểm) |
| UP-U30 | Thân bị sửa một byte | `bad_signature` | **Chưa có** |

**Phân loại lỗi mạng xã hội** (HD §9; mẫu chuỗi chốt sau UP-K08):

| Mã | Kiểm | Kết quả mong đợi | Đã có test |
|---|---|---|---|
| UP-U31 | Các chuỗi mất phiên và `tiktok_reconnect_required` | `reauth_required` | **Chưa có** |
| UP-U32 | `account_checkpoint_required` | Lý do riêng: "mở Instagram để xác nhận", không phải `reauth_required` | **Chưa có** |
| UP-U33 | `account_restricted` kèm `restricted_until` | Lưu thời điểm hết tạm dừng, không thử lại trước đó | **Chưa có** |
| UP-U34 | `content_rejected` (`spam_risk_text`) | `publish_failed`, gợi ý sửa chú thích; không gửi lại | **Chưa có** |
| UP-U35 | Chuỗi lỗi lạ | `publish_failed`, lý do "không rõ", vào đối soát tay | **Chưa có** |

---

## 3. Ca tích hợp (TH)

Thứ tự theo HD §14.

| Mã | Kiểm | Kết quả mong đợi | Đã có test |
|---|---|---|---|
| UP-I01 | `social.provision` chạy 2 lần cho cùng tài năng | Một lần `POST /users`; tên hồ sơ không đổi | **Chưa có** |
| UP-I02 | Tạo hồ sơ bị quá hạn chờ, hồ sơ thật đã có | Đọc lại cùng tên, đánh dấu `active`; không tạo tên khác | **Chưa có** |
| UP-I03 | Tài năng chưa 利用中 bấm kết nối | 409/403, không gọi Upload-Post | **Chưa có** |
| UP-I04 | Tài năng A gọi `verify` cho tài năng B / quản lý gọi route `me` | 404/403; không lộ dữ liệu | **Chưa có** |
| UP-I05 | URL trả về `connect_status=success` nhưng hồ sơ chưa có mạng đó | Không lưu `connected` | **Chưa có** |
| UP-I06 | Kết nối lại ra tài khoản khác khi còn lịch | Chặn gửi mới cho mạng đó; lịch cũ không gắn sang tài khoản mới | **Chưa có** |
| UP-I07 | Webhook hợp lệ | Một hàng hộp thư + một sự kiện outbox trong cùng giao dịch; trả 200 | **Chưa có** (route mẫu HD đã kiểm với `record` giả) |
| UP-I08 | Cùng `X-Upload-Post-Delivery` gửi 2 lần; cùng mã mà thân khác | Lần 2: 200, không thêm hàng. Thân khác: 409, không ghi đè | **Chưa có** |
| UP-I09 | DB lỗi khi ghi hộp thư | 5xx (để Upload-Post gửi lại); không trả 200 | **Chưa có** |
| UP-I10 | `upload_completed` đến trước khi lưu `job_id`; gửi lại thủ công (mã mới, `Redelivery-Of`) | `unmatched` rồi ghép được sau; chỉ một thông báo | **Chưa có** |
| UP-I11 | Sự kiện lỗi cũ đến sau sự kiện thành công | Delivery giữ `published` | **Chưa có** |
| UP-I12 | Bài `awaiting_approval` | Không có request gửi lịch nào | **Chưa có** |
| UP-I13 | Bài ảnh, ba mạng đã nối | Hai delivery (Instagram, TikTok); YouTube không gửi | **Chưa có** |
| UP-I14 | Hai worker nhận cùng `publishing.submit` | Đúng một POST; khóa chống trùng là UNIQUE trong DB | **Chưa có** |
| UP-I15 | POST quá hạn chờ, rồi worker chạy lại | Không POST mới; đối soát tìm thấy `job_id` → `submitted` | **Chưa có** |
| UP-I16 | Công tắc dừng bật giữa lúc ghi ý định và lúc Upload-Post trả 202 | Sinh `publishing.cancel` bù ngay | **Chưa có** |
| UP-I17 | Tài năng chấp nhận bài thứ 4 trong ngày | Không bị chặn vì trần số bài (trần đã bỏ, [KS] 確認37); vẫn kiểm các điều kiện khác | **Chưa có** |
| UP-I18 | Quản lý hủy bài đã gửi ba mạng | Ba DELETE; bài `cancelled`, `manager_cancelled`; có nhật ký thao tác | **Chưa có** |
| UP-I19 | DELETE trả 200 nhưng đối soát thấy đã đăng | Giữ `published`, báo "hủy không kịp" | **Chưa có** |
| UP-I20 | Dừng toàn bộ, 10 bài đã hẹn, 2 lần DELETE lỗi | Lệnh dừng chưa xong; M-16 hiện 2 bài chưa hủy; không gửi bài mới; mở lại không khôi phục bài đã hủy | **Chưa có** |
| UP-I21 | Đổi tài năng sang 退会 | Như UP-I20 với `talent_ended`; xóa hồ sơ chỉ sau khi hủy xong | **Chưa có** |
| UP-I22 | Lấy số liệu 2 lần cùng ngày | Một hàng mỗi tài khoản mỗi ngày | **Chưa có** |
| UP-I23 | Thiếu số người theo dõi TikTok ở `analytics` | Lấy từ `audience.followers_daily`; không có thì `null` kèm lý do, không phải 0 | **Chưa có** |
| UP-I24 | Lỗi ở một mạng | Hai mạng còn lại vẫn lưu; sự kiện OneDrive chỉ phát sau khi commit | **Chưa có** |
| UP-I25 | Quản lý hẹn lại bài lỗi ở một mạng (sau UP-Q04) | Chỉ mạng lỗi; `generation` mới; khóa mới; có người ra lệnh | **Chưa có** |
| UP-I26 | Tài năng gọi API hẹn lại hoặc hủy | 403 (trừ khi UP-Q04 cho phép tài năng hẹn lại) | **Chưa có** |

---

## 4. Ca Upload-Post thật (UP)

Chạy theo UP-K01〜K11 (HD §15.2). Mỗi ca lưu bằng chứng đã lược (mã HTTP, các trường liên quan, ảnh màn hình nếu là luồng giao diện).

| Mã | Kiểm | Kết quả cần ghi | Kết quả |
|---|---|---|---|
| UP-M01 | Tạo, đọc, xóa hồ sơ; tạo vượt số hồ sơ của gói | Mã 403 và thân lỗi khi vượt | CHƯA CHẠY (chưa có API key) |
| UP-M02 | Kết nối Instagram (doanh nghiệp), TikTok, YouTube trên máy tính | `connect_status`, hồ sơ đọc lại có tài khoản | CHƯA CHẠY |
| UP-M03 | Như UP-M02 trên PWA đã cài, chia 4 ô: iPhone / Android × **có** / **không** cài app TikTok (làm lại cho Instagram, YouTube). Mỗi ô: bấm kết nối ở T-05, đăng nhập, cho phép | Trang đăng nhập mở ở đâu (khung trình duyệt / app TikTok / Safari, Chrome); sau khi cho phép thì về đâu; trang `/pwa/sns/return` có phiên không; quay lại PWA thì `verify` tự chạy và T-05 hiện 接続済み; tài khoản TikTok tạo bằng Apple/Google/số điện thoại có đăng nhập được trên web không (HD §6.2, §6.2a) | CHƯA CHẠY (chưa có API key Upload-Post, chưa có tài khoản TikTok thử) |
| UP-M04 | Từ chối cấp quyền; để quá 15 phút rồi mới mở URL | `ACCESS_DENIED`; `INVALID_STATE` | CHƯA CHẠY |
| UP-M05 | Instagram cá nhân; YouTube có nhiều kênh; nối cùng tài khoản vào hồ sơ thứ hai | Lỗi trả về; kênh được chọn; `account_moved` và webhook của hồ sơ cũ | CHƯA CHẠY |
| UP-M06 | Hẹn giờ video và ảnh cho từng mạng; nhiều ảnh; chú thích dài | 202 + `job_id`; bài đăng đúng giờ; trường chú thích của bài ảnh | CHƯA CHẠY |
| UP-M07 | Gửi lại cùng `Idempotency-Key` (cùng nội dung, khác nội dung) | Có nhận lại việc cũ không; có trường nào báo việc cũ | CHƯA CHẠY |
| UP-M08 | Ngắt mạng ngay sau khi gửi POST | `status`/`history` theo `request_id` có thấy không, sau bao lâu | CHƯA CHẠY |
| UP-M09 | Hủy trước giờ 1 giờ; hủy trước giờ 1 phút; hủy 5 bài liên tiếp | Kết quả DELETE, bài có lên không | CHƯA CHẠY |
| UP-M10 | Webhook đủ bốn sự kiện; kiểm chữ ký thật; gửi lại thủ công | Header thật, payload thật (đã lược), thứ tự | CHƯA CHẠY |
| UP-M11 | Thu hồi quyền ứng dụng trên mạng rồi đăng | Chuỗi lỗi thật từng mạng; có `social_account_reauth_required` không | CHƯA CHẠY |
| UP-M12 | Video gắn nhãn AI trên ba mạng | Nhãn có hiện trên bài không | CHƯA CHẠY |
| UP-M13 | Lịch tương lai, xóa bản tạm trên Supabase Storage sau khi gửi | Upload-Post đã chép tư liệu hay lỗi lúc đăng | CHƯA CHẠY |
| UP-M14 | `posts/retry` sau khi một mạng lỗi | Mã việc mới, tư liệu dùng lại, có bị chặn trùng 48 giờ không | CHƯA CHẠY |
| UP-M15 | `analytics`, `post-analytics`, `audience`, `best-times` cho tài khoản thử | Chỉ số có thật, `confidence`, độ trễ số liệu | CHƯA CHẠY |
| UP-M16 | Đọc `X-RateLimit-*`, `api_usage.count` trên gói đang dùng | Hạn mức thật so với bảng HD §12 | CHƯA CHẠY |
