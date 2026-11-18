# 07. Phạm vi triển khai và quy tắc khi viết mã

Bản 2.0 · 18/11/2026 · Bước 7. Dành cho AI agent lập trình. Thay `10_confirmed_scope_and_remediation.md` (bản 17/11/2026): phạm vi đợt 1, bảng đang chặn ghi, cách viết mã truy cập DB và quy tắc migration.

Bộ thiết kế DB:

| Tệp | Nội dung |
|---|---|
| `01_confirmed_requirements.md` | Phân loại yêu cầu, ma trận truy vết R…, quy tắc nghiệp vụ BR…, điểm chưa rõ U… |
| `02_entity_inventory.md` | Ranh giới dữ liệu, danh mục 38 bảng, những gì không thành bảng |
| `03_erd.md` | ERD, quyết định thiết kế D…, vòng đời trạng thái |
| `04_database_schema.md` | Quy ước, danh sách migration, đề xuất chờ khách P… |
| `05_data_dictionary.md` | Từ điển từng cột (sinh từ catalog bằng `gen_tu_dien.py`) |
| `06_extensibility_review.md` | Khách chốt một điểm chưa rõ thì phải đổi gì |
| `07_implementation_scope_and_rules.md` (tệp này) | Được làm gì, cách viết mã và migration |

**Thứ tự tin cậy:** SQL migration (`apps/api/prisma/migrations/`) > `05` > các tệp còn lại. Thấy lệch thì làm theo migration và sửa tài liệu.

Đọc kèm: [apps/api/PRISMA.md](../apps/api/PRISMA.md) (lệnh migration); [HD-Auth](../agent_spec/supabase-db-auth-spec/HUONG_DAN_TICH_HOP_VI.md) (đăng nhập, phiên, cách dùng các bảng `auth_*`); [HD-PWA](../agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md) (thông báo đẩy).

Ký hiệu: [YK2] = bản định nghĩa yêu cầu v2; [QA] = bảng hỏi đáp với khách; CR = yêu cầu bổ sung đã chốt ở sheet 追加要件 (yêu cầu bổ sung) của [QA]; R…, BR…, U… theo `01`.

---

## 1. Nguyên tắc phạm vi

Quyết định của chủ dự án ngày 17/11/2026: **chỉ làm phần đã chốt**, phần còn lại cập nhật dần.

- **Được làm:** chức năng có câu [QA] đã đóng (Close) hoặc CR đã chốt, với đúng các trường dữ liệu mà yêu cầu nêu.
- **Chỉ tra cứu:** nội dung chỉ có trong [YK2] (bản 0.1), chưa có xác nhận riêng. Không coi là khách đã đồng ý.
- **Hoãn:** câu [QA] còn mở, chưa rõ, mâu thuẫn. Không dùng quy tắc tạm để mở chức năng. Chỉ mở lại bằng tài liệu + migration mới (§3).
- Schema có sẵn **không** có nghĩa API, guard, worker hay giao diện đã xong.

---

## 2. Phạm vi đợt 1

| Luồng | Căn cứ | Được làm | Giới hạn |
|---|---|---|---|
| Gửi đơn, quản lý duyệt/từ chối, tạo tài khoản | [QA] No.11, CR-01; trường tên, email, ngày sinh ([YK2] §6-4 2-2) | Dữ liệu + lệnh tạo tài khoản (operation) | Chưa làm: gửi lại đơn bị từ chối, đảo quyết định, hạn mật khẩu tạm (chờ [QA] No.65). Đồng ý điều khoản chờ U-14: không thêm cột/CHECK giả định |
| Một loại quản lý; vô hiệu; nhật ký xem | [QA] No.5, 21; CR-13 | Có | Guard kiểm DB mỗi request; thời hạn phiên là cấu hình (HD-Auth §4), không viết cứng vào CHECK |
| Tài khoản công ty: loại riêng, không thu phí, không duyệt bài | [QA] No.20, 47–48; CR-11 | Dữ liệu + tạo tài khoản | Chưa làm màn đăng bài cho tài khoản công ty (chờ luồng đăng). Chi tiết vận hành chờ [QA] No.66 |
| Trạng thái tài năng, ngừng sử dụng | [QA] No.10 | Lưu trạng thái; `ended` thì chặn quyền | Không cho quay lại từ `ended` ([KS] 確認56; trigger P-18); xóa dữ liệu sau 6 tháng ([KS] 確認55; P-18). Thời điểm `before_use` → `in_use`, tính tiền chờ [QA] No.52, 53, 64 |
| Tư liệu do tài năng/quản lý gửi, lưu OneDrive | CR-09, CR-10 | Metadata, chủ sở hữu, outbox `media.transfer` | Giới hạn tệp, link chia sẻ, dọn bản tạm phải chốt khi tích hợp OneDrive. Không mở link công khai mặc định  Quản lý chỉ gửi thay cho tài khoản công ty ([KS] 確認27; P-19). |
| Chủ đề, bản nháp; danh sách từ cấm chung | [QA] No.9, 13, 40–41; CR-02, 06, 07 | Lưu và sửa bản nháp, tư liệu | Chưa làm: adopt (chấp nhận bản nháp), duyệt, hẹn giờ, gửi sang Upload-Post. Hạn và giờ đăng chờ [QA] No.55–57  Nhờ AI viết lại tối đa 2 lần, tài năng sửa chữ được ([KS] 確認28, 29; P-13). |
| Hội thoại và chi phí AI | [QA] No.17; CR-16 | Lưu tin nhắn, chi phí, outbox | Quản lý xem hội thoại: hoãn ([QA] No.7, CR-24). Gọi AI phải chống ghi trùng từng lần gọi |
| Thông báo cho tài năng | [QA] No.42; nền tảng PWA | Tin trong ứng dụng, đăng ký push, outbox | Không thêm loại thông báo chưa chốt; thông báo quản lý và "đã xử lý" chờ U-10, U-11 |
| Mục tiêu, số người theo dõi, kết nối mạng xã hội | [QA] No.14 (bình luận mâu thuẫn), No.23 mở | **Hoãn** | Chưa rõ mục tiêu tổng hay theo từng mạng; mỗi mạng một tài khoản đã chốt ([KS] 確認10); quy tắc kết nối lại |
| Tạo video AI có phí | Quy tắc đếm chốt ở [QA] No.1, 3; đơn giá, kỳ chưa chốt | **Hoãn chạy thật** | Không tạo lượt có thể phải tính tiền khi chưa có giá/kỳ |
| Duyệt, adopt, hẹn, đăng, hẹn lại, hủy ở Upload-Post | [QA] No.51, 57–61 mở | **Hoãn** | Không dùng bộ trạng thái tạm hay quy tắc "một mạng lỗi thì cả bài lỗi" |
| Thu phí tháng, giá video, hóa đơn, thanh toán | [QA] No.4, 49, 53, 62–64 mở | **Hoãn** | Không worker thu tiền, không hóa đơn giả  Chu kỳ một tháng từ ngày đăng ký đã chốt hướng ([KS] 確認48); vẫn chờ 確認49. |
| Nhóm tài năng, quản lý phụ trách, màn chỉ thị AI, thử thách | CR-17〜19, CR-22; [KS] 確認5–8, 34, 47 | **Đã chốt, chưa có bảng** | Thiết kế `04` P-15〜P-17 trước khi làm; không thêm bảng tổ chức nhiều bên |
| Cách đăng 自動投稿 / 要確認 | [KS] 確認19, 25 | **Đã chốt, chưa có bảng** | Chi tiết luồng chờ khách (U-16); phải sửa `chk_posts_adopted` (P-12) |
| Hội thoại riêng tư, SMS MFA | CR-24; SMS chưa bật | **Hoãn** | Không thêm SMS |

---

## 3. Bảng đang chặn ghi và điều kiện mở lại

Trigger `reject_deferred_write` từ chối mọi INSERT/UPDATE/DELETE (SQLSTATE 55000) trên: `billing_accounts`, `social_accounts`, `follower_goals`, `follower_snapshots`, `post_approval_decisions`, `post_deliveries`, `post_metric_snapshots`, `video_generations`, `video_generation_inputs`, `manager_notifications`. Trigger `require_draft_scope` trên `posts` chỉ cho ghi bài ở trạng thái `draft`.

Các bảng này giữ lại để không mất thiết kế, **không** phải thiết kế đã xong. Trước khi gỡ chặn cho một luồng phải có: quyết định của khách → cập nhật tệp này → migration mới (bảng, quyền runtime, chỉ mục) → test. Không gỡ trigger hay bật bằng biến môi trường cho chạy được.

| Luồng | Phải thiết kế thêm trước khi mở |
|---|---|
| Duyệt và đăng (EP06) | Yêu cầu duyệt gắn với phiên bản nội dung; tách lượt gửi / lần thử / kết quả theo từng mạng; chống trùng callback; trạng thái do khách chốt ([QA] No.51); dừng/tiếp tục đăng khi có lượt gửi đang bay. Thử callback trễ, timeout của Upload-Post  Nơi nhận yêu cầu duyệt theo nhóm hoặc người phụ trách (P-16); cách đăng 自動投稿 (P-12). |
| Thu phí (EP08) | Hợp đồng phí có hiệu lực, giá chụp lại lúc phát sinh, kỳ thu, hóa đơn và dòng hóa đơn, lần thanh toán, điều chỉnh sau khi chốt kỳ, chống thu hai lần. Không sửa lùi `is_counted` của dữ liệu cũ |
| Mạng xã hội, mục tiêu | Số tài khoản mỗi mạng (đã chốt: một, P-01); định danh không đổi khi kết nối lại; mục tiêu tổng hay theo mạng |

Các đề xuất (P-01…P-20; P-13, P-18 trigger, P-19 làm được ngay) ở `04_database_schema.md` §4; tác động của từng điểm chưa rõ ở `06_extensibility_review.md` §2.

---

## 4. Cách viết mã truy cập DB

### 4.1. Quy ước schema

Đặt tên, kiểu khóa, thời gian và múi giờ, tiền, liệt kê, xóa: `04_database_schema.md` §1.

### 4.2. Quyền và chủ sở hữu

- BE kết nối bằng `talent_api` (nhóm `talent_runtime`). Policy RLS của runtime là `USING (true)`: **DB không lọc theo người dùng**. Mọi truy vấn của tài năng phải có điều kiện chủ sở hữu lấy từ phiên đã xác minh (`talent_id` tra theo `actor.userId`), không lấy từ body.
- Khóa ngoại kép (`id`, `talent_id`) chặn gắn tư liệu, chủ đề, bài của người khác. Ghi bảng con thì truyền đúng `talent_id` của chủ.
- Quản lý xem dữ liệu riêng của tài năng: ghi `manager_view_logs` trong cùng giao dịch, trước khi trả dữ liệu.

### 4.3. Khóa lạc quan

`talent_applications`, `talents`, `posts`, `domain_operations` có `version`. Trigger bắt mỗi UPDATE tăng **đúng 1**, nhưng không thay được kiểm tra của dịch vụ:

```ts
const n = await db.$executeRaw`UPDATE public.talent_applications
  SET status = 'approved', decided_by_manager_id = ${managerId}::uuid, decided_at = now(), version = version + 1
  WHERE id = ${id}::uuid AND version = ${expectedVersion} AND status = 'pending'`
if (n !== 1) throw new AppError('VERSION_CONFLICT', 409)   // quản lý khác đã quyết trước
```

### 4.4. Tác động ra ngoài: operation + outbox

Mọi việc gọi dịch vụ ngoài (tạo người dùng Auth, chuyển tư liệu sang OneDrive, gửi push…) đi theo giao thức này. Bảng: `app_private.domain_operations`, `app_private.outbox_events`.

1. Server tạo `operation_key` (theo người gọi + use case + lệnh). Cùng khóa mà khác `payload_hash` → 409. Không băm mật khẩu hay mã OTP làm khóa.
2. Thay đổi nghiệp vụ + `domain_operations` + `outbox_events` ghi **trong cùng một giao dịch**.
3. Worker lấy sự kiện `pending` bằng `FOR UPDATE SKIP LOCKED`, ghi `lease_token`, `lease_until` rồi **commit trước** khi gọi HTTP. Không giữ khóa DB trong lúc gọi HTTP.
4. Hoàn tất: `UPDATE … WHERE state = 'leased' AND lease_token = $token`. Worker cũ không hoàn tất được lượt đã bị lấy lại.
5. Hết giờ chờ sau khi đã gửi, hoặc lease hết hạn khi có thể đã gửi → `unknown`, rồi đối soát với dịch vụ ngoài trước khi thử lại. Không đẩy mù về `pending`.
6. Dịch vụ có idempotency thì dùng id của operation; không có thì đối soát hoặc bù trừ. Không hứa "đúng một lần".
7. Payload thật đọc lại từ bảng nghiệp vụ theo tham chiếu; outbox không chứa mật khẩu, token, thông tin cá nhân.
8. Tin trong ứng dụng + operation/outbox của push ghi cùng giao dịch; UNIQUE `event_key` chống trùng.

Nhóm `talent_dispatcher` hiện chỉ quản lý lease của outbox và đọc operation. Worker cụ thể cần quyền nào thì cấp tối thiểu trong migration riêng, có test.

### 4.5. Thứ tự khóa

Trong một lệnh: đơn đăng ký → quản lý/tài năng → principal → phiên → challenge → bài/tư liệu → operation → outbox; trong cùng loại khóa theo `id` tăng dần. Gặp lỗi 40P01 (deadlock) hay 40001 (xung đột tuần tự) thì thử lại **cả giao dịch** có giới hạn, không lặp tác động ra ngoài.

---

## 5. Thay đổi schema

Lệnh và quy trình: [apps/api/PRISMA.md](../apps/api/PRISMA.md). Quy tắc:

1. Chỉ thay đổi bằng migration mới. **Không sửa migration đã áp**; sai thì sửa tiến bằng migration sau. Không `prisma db push`, không `migrate reset` trên Supabase.
2. Dùng `npm run db:dev` / `db:diff` / `db:pull` (bọc qua `tools/prisma-safe.ts` để Prisma coi các bảng `auth.*` là bảng bên ngoài). Migration không được CREATE/ALTER/DROP gì trong schema `auth`.
3. Thêm tay vào SQL: CHECK, trigger `updated_at`, chỉ mục theo biểu thức, **GRANT + POLICY cho `talent_runtime`** đúng các lệnh cần (bảng nhật ký chỉ SELECT/INSERT); mẫu ở HD-Auth §5.2.
4. Migration có dữ liệu thật: `SET LOCAL lock_timeout = '5s'`; kiểm dữ liệu sai trước khi thêm ràng buộc, không tự xóa hay sửa dữ liệu theo phỏng đoán; thay đổi lớn chia thành mở rộng → điền dữ liệu → kiểm.
5. Trước khi áp lên Supabase: chạy lại toàn bộ migration trên Postgres cục bộ (`apps/api/prisma/local/bootstrap.sql` rồi `migrate deploy`); chạy thử trong giao dịch rồi ROLLBACK trên Supabase dev; kiểm không bảng nào tắt RLS và `anon`/`authenticated` không có quyền.
6. Sau migration: sinh lại `05_data_dictionary.md` bằng `gen_tu_dien.py` (thêm mô tả cho bảng/cột mới trong script); cập nhật `01` (truy vết), `02`–`04`, `06` và §2–§3 của tệp này nếu phạm vi đổi.

---

## 6. Nguồn

[YK2] §2, §5-1, §6-1, §6-2, §6-4, §6-6, §6-7, §6-9, §6-11, §7-3, UC-01; [QA] No.1–5, 7, 9–11, 13, 14, 17, 20, 21, 23, 40–42, 47–49, 51–53, 55–66; CR-01, 02, 06, 07, 09–11, 13, 16–19, 24; quyết định của chủ dự án ngày 17/11/2026 (chỉ làm phần đã chốt). Tệp này thay `10_confirmed_scope_and_remediation.md`; các báo cáo review và triển khai `07`–`12` cũ (bản 17/11/2026) xem trong lịch sử Git.
