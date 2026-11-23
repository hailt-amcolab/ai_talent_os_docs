# Ca kiểm thử OneDrive

> **Đối chiếu lưu trữ23/11/2026:** xem [kiến trúc OneDrive/Supabase](../KIEN_TRUC_LUU_TRU_ONEDRIVE_VA_SUPABASE.md) về phân loại file, nguồn dữ liệu và phương án media mới. Nội dung dưới giữ lịch sử; không mặc định Supabase chỉ lưu tạm, phải chuyển mọi media sang OneDrive hoặc dùng ROPC cho production. Chính sách/ca kiểm liên quan cần review trước triển khai, chưa có kết quả test mới.

Bản 2.1 · 18/11/2026 · Đi kèm [HUONG_DAN_TICH_HOP_VI.md](HUONG_DAN_TICH_HOP_VI.md) (viết tắt HD).

**Loại kiểm thử:**
- **ĐV** (đơn vị): `npm test` trong `apps/api`, với Microsoft giả (hàm `fetch` giả); chạy được không cần mạng.
- **TH** (tích hợp BE): `node:test` + PostgreSQL dùng một lần, chạy dưới một LOGIN thuộc `talent_runtime`, Microsoft giả (cách dựng ở §1).
- **MT** (Microsoft thật): tenant Microsoft 365 của khách hoặc tenant thử của đội. Ghi kết quả kèm tenant (thử/khách), ngày giờ, `requestId`; khi lỗi thì thêm `msRequestId` / `traceId`.

**Nguyên tắc ghi kết quả:**
- Ca chạy với giả **không** chứng minh Microsoft thật chấp nhận. Ca MT phải gọi Microsoft thật.
- Ca nào chưa chạy thì ghi `CHƯA CHẠY` kèm lý do.
- Cột "Đã có test" nêu tệp test của **bản demo**. Tính năng thật phải có test tương đương cho mã thật.

---

## 1. Dựng môi trường TH

```bash
docker run -d --name od-test -e POSTGRES_PASSWORD=owner -e POSTGRES_DB=t -p 127.0.0.1:55436:5432 postgres:17-alpine
docker exec -i od-test psql -q -v ON_ERROR_STOP=1 -U postgres -d t < apps/api/prisma/local/bootstrap.sql
for m in apps/api/prisma/migrations/2*/migration.sql; do docker exec -i od-test psql -q -v ON_ERROR_STOP=1 -U postgres -d t < "$m"; done
# LOGIN runtime cho test; quyền trên auth chỉ để tạo user mẫu, không có ở môi trường thật
docker exec od-test psql -q -U postgres -d t -c "CREATE ROLE od_rt LOGIN PASSWORD 'rt' IN ROLE talent_runtime; GRANT USAGE ON SCHEMA auth TO od_rt; GRANT INSERT ON auth.users TO od_rt;"
cd apps/api && TEST_DATABASE_URL='postgresql://od_rt:rt@127.0.0.1:55436/t?sslmode=disable' node --test 'src/modules/onedrive/*.integration.test.ts'
# Kiểm schema.prisma khớp DB sau migration: kết quả phải là "empty migration"
DIRECT_URL='postgresql://postgres:owner@127.0.0.1:55436/t?sslmode=disable' DATABASE_URL="$DIRECT_URL" node tools/prisma-safe.ts migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script
docker rm -f od-test
```

Không chạy test TH với `DATABASE_URL` của Supabase.

---

## 2. Ca đơn vị (ĐV)

**Adapter Graph** (dùng lại từ demo):

| Mã | Kiểm | Kết quả mong đợi | Đã có test (18/11/2026) |
|---|---|---|---|
| OD-U01 | Tạo thư mục tài năng | Có `<uuid>_<tên>/` với `プロフィール.md` (đủ 7 tiêu đề mục), `AIメモ.md`, `実績/`, `素材/`, `添付/` | `src/modules/onedrive/service.test.ts` |
| OD-U02 | Gọi lại tạo thư mục con đã có (Graph 409) | Dùng lại item cũ, không tạo "… 1" | như trên (`ensureFolder`) |
| OD-U03 | Đọc hoặc ghi một item nằm ngoài cây `タレント/` (id hợp lệ trong drive) | `NOT_FOUND`, không gọi ghi | như trên |
| OD-U04 | Ghi tệp với eTag cũ | `VERSION_CONFLICT`, nội dung không đổi | như trên |
| OD-U05 | Tên tệp có `../`, `:`, `*`, dấu chấm cuối; đuôi `.exe` | `NAME_INVALID` / `FILE_TYPE_NOT_ALLOWED` | như trên |
| OD-U06 | Upload 2×5 MiB + 123 byte | Đúng 3 khúc, `Content-Range` liên tiếp, khúc giữa là bội số 320 KiB, không có `Authorization` gửi tới `uploadUrl` | như trên |
| OD-U07 | Tệp `.jpg` mà nội dung là MP4 | `MEDIA_TYPE_MISMATCH` trước khi gửi khúc nào; phiên upload bị hủy (`DELETE uploadUrl`) | như trên |
| OD-U08 | Thân tệp ngắn hơn dung lượng khai báo | `MEDIA_SIZE_MISMATCH`; phiên bị hủy | như trên |
| OD-U09 | Tải về: Graph trả 302 | Theo URL mới **không** kèm bearer; nội dung đúng | như trên |
| OD-U10 | Graph 401 rồi 200 sau khi lấy token mới | Lấy token mới đúng 1 lần, request thành công | như trên (test "Graph: 401…") |
| OD-U11 | Graph 401 cả sau khi lấy token mới | `ONEDRIVE_FORBIDDEN`, không gọi thêm | như trên (mã lỗi khác: demo trả `ONEDRIVE_RECONNECT_REQUIRED`) |
| OD-U12 | Graph 429 kèm `Retry-After: 0`, rồi 200 | Chờ rồi gửi lại, thành công | như trên |
| OD-U13 | Graph 429 kèm `Retry-After: 120` trong request HTTP | `ONEDRIVE_THROTTLED`, không chờ 120 giây | như trên |
| OD-U14 | Graph 400 "Tenant does not have a SPO license" | `ONEDRIVE_DRIVE_UNSUPPORTED` | như trên |

**Đăng nhập ROPC** (HD §6; chưa có mã):

| Mã | Kiểm | Kết quả mong đợi | Đã có test |
|---|---|---|---|
| OD-U15 | Thân request ROPC | URL là `/{tenant}/oauth2/v2.0/token` (không phải `common`/`consumers`); có `grant_type=password`, `username`, `password`, `client_id`, `client_secret`; `scope` gồm `offline_access` | **Chưa có** |
| OD-U16 | 5 lời gọi `token()` song song khi chưa có token | Đúng **1** request ROPC | **Chưa có** |
| OD-U17 | Access token còn dưới 60 giây | Dùng refresh token, **không** gửi mật khẩu | **Chưa có** |
| OD-U18 | Refresh trả `invalid_grant` | Đăng nhập lại bằng mật khẩu đúng 1 lần, thành công | **Chưa có** |
| OD-U19 | Refresh trả 5xx / lỗi mạng | `ONEDRIVE_UNAVAILABLE`; **không** gửi mật khẩu; lần gọi sau thử lại bình thường | **Chưa có** |
| OD-U20 | ROPC trả 50126 (sai mật khẩu), rồi gọi `token()` thêm 10 lần | `ONEDRIVE_CREDENTIALS_REJECTED`; tổng cộng **1** request ROPC (dừng tới khi khởi động lại); log `ONEDRIVE_SIGNIN_STOPPED` | **Chưa có** |
| OD-U21 | ROPC trả 50076 / 53003 / 65001 | `ONEDRIVE_SIGNIN_BLOCKED`; dừng như OD-U20 | **Chưa có** |
| OD-U22 | ROPC trả `invalid_client` / 7000222 (secret hết hạn) | `ONEDRIVE_APP_MISCONFIGURED`; dừng như OD-U20 | **Chưa có** |
| OD-U23 | Log khi token endpoint lỗi | Có `msCodes`, `traceId`, `correlationId`, `requestId`; **không** có mật khẩu, tên tài khoản, token, secret, `error_description` | **Chưa có** (bắt `console.warn`, tìm chuỗi mật khẩu và tên tài khoản giả) |
| OD-U24 | `/me/drive` trả id khác `ONEDRIVE_DRIVE_ID` | `ONEDRIVE_DRIVE_MISMATCH`; không có request ghi nào | **Chưa có** |
| OD-U25 | Env `ropc` thiếu `ONEDRIVE_PASSWORD` / `ONEDRIVE_TENANT_ID=common`; env `app` thiếu `ONEDRIVE_DRIVE_ID` | API không khởi động, báo đúng tên biến, không in giá trị | **Chưa có** |
| OD-U26 | Lỗi khởi động khi Microsoft tạm hỏng | API vẫn chạy (`/health` ok); thao tác OneDrive trả `ONEDRIVE_UNAVAILABLE` | **Chưa có** |

---

## 3. Ca tích hợp (TH)

| Mã | Kiểm | Kết quả mong đợi | Đã có test |
|---|---|---|---|
| OD-I01 | `storage.provision` chạy 2 lần cho cùng tài năng | Một thư mục; `talents.onedrive_folder_id` không đổi; `onedrive_items` không trùng | **Chưa có** (HD §7.1) |
| OD-I02 | Worker chết sau khi tạo thư mục, trước khi tạo tệp mẫu | Lần sau tạo nốt phần thiếu, không tạo thư mục thứ hai | **Chưa có** |
| OD-I03 | Tài năng thường chưa đăng ký thanh toán | Không có việc `storage.provision` (EP08 bị chặn ghi) | **Chưa có** |
| OD-I04 | Tài khoản công ty vừa được tạo | Có việc `storage.provision` trong cùng giao dịch | **Chưa có** |
| OD-I05 | `media.transfer`: bản tạm hợp lệ | `media_assets.onedrive_item_id` và `sha256` được ghi; tệp nằm ở `素材/originals/YYYY/MM/<asset_uuid>.<đuôi>` | **Chưa có** (HD §7.5) |
| OD-I06 | `media.transfer` chạy lại sau khi đã chép xong (Graph 409) | Nhận tệp cũ sau khi so dung lượng/mã băm; không tạo bản thứ hai | **Chưa có** |
| OD-I07 | `media.transfer` khi đăng nhập đã dừng (OD-U20) | Việc ở lại hàng đợi, không bị đánh dấu hỏng vĩnh viễn; bài đăng vẫn dùng bản tạm | **Chưa có** |
| OD-I08 | Dọn bản tạm: bài đăng xong 7 ngày + 1 phút | `temp_object_path=NULL`, `temp_deleted_at` có giá trị; CHECK `chk_media_assets_location` vẫn thỏa | **Chưa có** |
| OD-I09 | Dọn bản tạm khi chưa chép sang OneDrive | Không xóa (CHECK chặn; dịch vụ cũng phải bỏ qua) | **Chưa có** |
| OD-I10 | AI ghi thêm `AIメモ.md` khi quản lý vừa sửa (412) | Đọc lại, nối lại; phần quản lý sửa còn nguyên; tối đa 3 lần | **Chưa có** (HD §7.3) |
| OD-I11 | Đọc buổi sáng: eTag không đổi | Không tải lại nội dung | **Chưa có** (HD §7.2) |
| OD-I12 | Đọc buổi sáng: một tài năng lỗi | Các tài năng khác vẫn có bản chụp | **Chưa có** |
| OD-I13 | Tài năng A gọi API với `item_id` thuộc tài năng B | `NOT_FOUND` / `FORBIDDEN`, không gọi Graph ghi | **Chưa có** cho mã thật (demo chỉ chặn ngoài cây) |
| OD-I14 | Quyền DB: LOGIN runtime trên `onedrive_items` | Được SELECT/INSERT/UPDATE; `anon`, `authenticated` không đọc được | **Chưa có** |
| OD-I15 | Tư liệu của một khoảng 自動投稿 còn chưa đăng hết, đã quá 7 ngày kể từ bài đầu | Bản tạm **không** bị xóa ([KS] 確認25) | **Chưa có** (HD §7.5) |
| OD-I16 | Tài năng 退会 5 tháng 29 ngày / 6 tháng + 1 ngày | Lần đầu không xóa gì; lần sau xóa thư mục OneDrive, bản tạm, các dòng `onedrive_items` ([KS] 確認55) | **Chưa có** (HD §7.7) |
| OD-I17 | Việc xóa 6 tháng chết giữa chừng (đã xóa OneDrive, chưa xóa bản tạm) | Lần sau làm tiếp phần còn lại; Graph 404 cho thư mục đã xóa thì coi là xong | **Chưa có** |
| OD-I18 | (Chỉ khi Q&A No.74 chọn B) Màn nhập thông tin ghi `プロフィール.md` khi tệp vừa bị sửa trên OneDrive | `VERSION_CONFLICT`, báo tải lại, không ghi đè ([KS] 確認8) | **Chưa có** (HD §7.6) |

---

## 4. Ca Microsoft thật (MT)

Chạy khi có tenant (HD §12, K1–K2). Trước khi chạy: cấu hình Entra theo HD §3.1, điền HD §3.2, áp migration.

| Mã | Kiểm | Kết quả mong đợi | Kết quả |
|---|---|---|---|
| OD-M01 | Khởi động BE rồi gọi một thao tác OneDrive, **không** có bước kết nối nào | Tự đăng nhập; `/me/drive` trả `driveType: business` | CHƯA CHẠY: chưa có tenant |
| OD-M02 | Tạo thư mục tài năng (tài khoản công ty) | Thấy cây ở HD §2 trên OneDrive web của tài khoản dịch vụ, đúng tên tiếng Nhật | CHƯA CHẠY |
| OD-M03 | Tạo, đọc, sửa, đổi tên, xóa tệp `.md` | Đúng trên OneDrive web; xóa thì vào thùng rác | CHƯA CHẠY |
| OD-M04 | Quản lý sửa `プロフィール.md` qua thư mục được chia sẻ, rồi hệ thống ghi bằng eTag cũ | `VERSION_CONFLICT`; bản quản lý sửa còn nguyên | CHƯA CHẠY: chờ K4 |
| OD-M05 | Ảnh JPEG 5 MB, video MP4 khoảng 200 MB từ iPhone và Android | Lên Supabase bằng TUS, rồi lên `素材/`; SHA-256 khớp; tải về xem được | CHƯA CHẠY |
| OD-M06 | Ngắt mạng giữa lúc tải video lên Supabase | Tải tiếp được, không bắt đầu lại từ 0 | CHƯA CHẠY |
| OD-M07 | Để hệ thống chạy hơn 2 giờ | Thao tác vẫn chạy; có làm mới token; không gửi lại mật khẩu khi refresh còn dùng được | CHƯA CHẠY |
| OD-M08 | Admin thu hồi phiên của tài khoản dịch vụ (Revoke sessions trong Entra) | Hệ thống tự đăng nhập lại bằng mật khẩu, thao tác tiếp tục, không ai thao tác | CHƯA CHẠY |
| OD-M09 | Đổi mật khẩu trong Entra, **chưa** đổi biến môi trường | Đúng 1 lần thử ROPC, `ONEDRIVE_CREDENTIALS_REJECTED`, log `ONEDRIVE_SIGNIN_STOPPED`; tài khoản **không** bị khóa; cập nhật biến và khởi động lại thì chạy lại | CHƯA CHẠY |
| OD-M10 | Bật MFA cho tài khoản dịch vụ | `ONEDRIVE_SIGNIN_BLOCKED` (50076/50079); dừng, không thử lại | CHƯA CHẠY |
| OD-M11 | Bỏ admin consent của app | `ONEDRIVE_SIGNIN_BLOCKED` (65001) | CHƯA CHẠY |
| OD-M12 | Kiểm dung lượng hằng ngày | Ghi `quota.used/total/state`; báo khi `nearing` | CHƯA CHẠY |
| OD-M13 | 100 thư mục tài năng, đọc buổi sáng song song | Xong trong thời hạn đợt sáng; gặp 429 thì chờ đúng `Retry-After` | CHƯA CHẠY |
| OD-M14 | Chia sẻ thư mục gốc cho tài khoản của một quản lý (`invite`) | Quản lý mở và sửa được trên OneDrive; không có liên kết "mọi người có liên kết" | CHƯA CHẠY: chờ K4 |
| OD-M15 | Chế độ `app` (nếu K2 không miễn được MFA) | OD-M01…M05 qua, không có tài khoản người dùng nào đăng nhập | CHƯA CHẠY |
| OD-M16 | Chế độ `app` trỏ vào OneDrive cá nhân | `ONEDRIVE_DRIVE_UNSUPPORTED`; log có `msCode` | **ĐÃ GẶP** 18/11/2026: Graph trả `400 Tenant does not have a SPO license` (bản demo) |
