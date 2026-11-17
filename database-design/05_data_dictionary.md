# 05. Từ điển dữ liệu

> **Cập nhật 17/11/2026:** Từ điển bổ sung và scope hiện hành ở [10](10_confirmed_scope_and_remediation.md); Prisma schema phản ánh cột/FK mới. Bảng pending còn tồn tại không có nghĩa được phép triển khai.

Bản 1.0 · 17/11/2026 · Bước 5. Khớp với DDL ở `04_database_schema.md`. Cột "Yêu cầu" dùng mã ở `01_confirmed_requirements.md`; "KT" là cột hoặc ràng buộc kỹ thuật, không có yêu cầu nghiệp vụ riêng.

Viết tắt: PK khóa chính, FK khóa ngoại, UQ duy nhất, CK CHECK. Mọi khóa ngoại là ON DELETE RESTRICT, trừ khi ghi khác.

## managers

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| auth_user_id | uuid | Không | | UQ; tham chiếu auth.users không khóa ngoại, trigger chặn xóa (IR-03 cách c) | Người dùng Supabase Auth (email, mật khẩu, factor TOTP ở đó) | R01-09, R01-10 |
| is_active | boolean | Không | true | CK cùng deactivated_at | false: không đăng nhập, không nhận thông báo | R01-09 |
| created_by_manager_id | uuid | Có | | FK managers | Quản lý đã thêm người này; NULL với quản lý đầu tiên | R01-09 |
| deactivated_at | timestamptz | Có | | | Lúc bị vô hiệu | R01-09 |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## talent_applications

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| display_name | text | Không | | CK không rỗng | Tên (nghệ danh hoặc tên thật) | R01-02 |
| email | text | Không | | UQ theo lower(btrim(email)) | Email gửi đơn; sau khi duyệt thành email đăng nhập ở Auth. BE kiểm thêm không trùng người dùng đã có ở Auth (IR-12) | R01-02, R01-03 |
| birth_date | date | Không | | | Ngày sinh | R01-02 |
| status | text | Không | 'pending' | CK pending, approved, rejected | Trạng thái đơn | R01-01 |
| decided_by_manager_id | uuid | Có | | FK managers; CK có khi status khác pending | Quản lý đã duyệt hoặc từ chối | R01-01, R06-06 |
| decided_at | timestamptz | Có | | CK như trên | | R01-01 |
| version | integer | Không | 1 | | Khóa lạc quan: hai quản lý cùng bấm thì chỉ một người thành công | KT |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## talents

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| auth_user_id | uuid | Không | | UQ; tham chiếu auth.users không khóa ngoại, trigger chặn xóa (IR-03 cách c) | Người dùng Auth để đăng nhập ứng dụng tài năng | R01-07 |
| account_type | text | Không | | CK talent, office | `talent`: người gửi đơn, trả phí. `office`: tài khoản công ty, không trả phí | R08-01, R06-14 |
| display_name | text | Không | | CK không rỗng | Tên hiển thị; tìm theo tên ở danh sách | R01-02, R02-05 |
| birth_date | date | Có | | CK bắt buộc khi talent | Dùng để tính vị thành niên | R01-06 |
| status | text | Không | 'before_use' | CK before_use, in_use, ended | 利用前・利用中・利用終了 | R01-11 |
| is_approval_required | boolean | Không | false | CK luôn false khi office | Bài của tài năng này có cần duyệt không; đặt lúc duyệt đơn | R01-05, BR-20 |
| is_auto_posting_paused | boolean | Không | false | | Dừng đăng tự động cho riêng tài năng này | R06-12 |
| application_id | uuid | Có | | UQ; FK talent_applications; CK bắt buộc khi talent | Đơn đã duyệt tạo ra tài năng | R01-01 |
| created_by_manager_id | uuid | Có | | FK managers; CK bắt buộc khi office | Quản lý đã tạo tài khoản công ty | R08-01 |
| onedrive_folder_id | text | Có | | UQ | Mã thư mục riêng trên OneDrive | R02-01 |
| onedrive_folder_created_at | timestamptz | Có | | | | R02-01 |
| posting_service_profile_ref | text | Có | | UQ | Mã hồ sơ của tài năng ở Upload-Post | R06-09 |
| posting_service_registered_at | timestamptz | Có | | | Lúc đăng ký với Upload-Post (thời điểm còn chờ S06-02) | R06-09 |
| status_changed_at | timestamptz | Không | now() | | Lần đổi trạng thái gần nhất | R01-11 |
| version | integer | Không | 1 | | Khóa lạc quan | KT |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## billing_accounts

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | UQ; FK talents | Chỉ tài năng loại `talent` (kiểm ở tầng dịch vụ) | R08-01, R08-02 |
| provider_member_ref | text | Không | | UQ | Mã thành viên tại công ty thanh toán. Không có số thẻ hay thông tin thẻ | R08-02, BR-16 |
| registered_at | timestamptz | Không | | | Lúc đăng ký thanh toán xong; mốc tạo thư mục OneDrive | R02-01, R08-02 |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## social_accounts

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents | | R06-09 |
| platform | text | Không | | CK instagram, tiktok, youtube | | BR-11 |
| external_account_ref | text | Có | | | Mã hoặc tên tài khoản do Upload-Post trả về | R06-09 |
| status | text | Không | 'connected' | CK connected, disconnected | Hiện ở ứng dụng và màn quản trị | R06-09, [YK2] §6-10 8-6 |
| connected_at | timestamptz | Không | now() | | | R06-09 |
| disconnected_at | timestamptz | Có | | CK có khi disconnected | Lúc mất kết nối | [YK2] §6-10 8-6 |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## follower_goals

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents; UQ cùng platform | | R02-03 |
| platform | text | Không | | CK 3 mạng | | R02-03 |
| target_followers | integer | Không | 10000 | CK > 0 | Số người theo dõi mục tiêu | R02-03, BR-10 |
| deadline_on | date | Có | | | Hạn đạt | R02-03 |
| achieved_at | timestamptz | Có | | | Lúc đạt; dùng để chỉ báo một lần | R03-07 |
| updated_by_manager_id | uuid | Có | | FK managers | Người sửa gần nhất | R02-03 |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## coach_messages

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK | Tăng dần, dùng để xếp thứ tự và phân trang | KT |
| talent_id | uuid | Không | | FK talents | | R03-01 |
| sender | text | Không | | CK talent, coach | Ai gửi | R03-01 |
| body | text | Không | | CK không rỗng; P-02 độ dài | Nội dung (cả tin nhắn buổi sáng, tổng kết tuần của AI) | R03-01, R03-02 |
| created_at | timestamptz | Không | now() | | | R03-01 |

## ai_usage_events

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK | | KT |
| talent_id | uuid | Không | | FK talents | | R03-04 |
| occurred_at | timestamptz | Không | now() | | Dùng để tổng theo tháng | R03-04 |
| model | text | Không | | | Model AI đã gọi | R03-04 |
| input_tokens, output_tokens | integer | Không | 0 | CK ≥ 0 | | R03-04 |
| cost_amount | numeric(14,6) | Không | | CK ≥ 0 | Chi phí theo bảng giá của nhà cung cấp | R03-04 |
| cost_currency | char(3) | Không | | CK 3 chữ hoa | Mã tiền tệ ISO 4217 | R03-04 |

## theme_suggestions

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents; UQ cùng suggested_on, position | | R04-01 |
| suggested_on | date | Không | | | Ngày gợi ý (giờ Nhật) | R04-01 |
| position | smallint | Không | | CK 1–3 | Thứ tự trong 3 chủ đề | BR-09 |
| content | text | Không | | | Nội dung chủ đề | R04-01 |
| selected_at | timestamptz | Có | | | Lúc tài năng chọn | R04-01 |
| created_at | timestamptz | Không | now() | | | KT |

## posts

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents | Chủ bài (tài năng hoặc tài khoản công ty) | R04-02, R06-14 |
| theme_suggestion_id | uuid | Có | | FK theme_suggestions | NULL khi tài năng tự nêu chủ đề | R04-01 |
| revised_from_post_id | uuid | Có | | FK posts | Bản nháp gốc khi sửa qua AI | R04-04 |
| status | text | Không | 'draft' | CK 6 giá trị | draft 投稿案, awaiting_approval 承認待ち, scheduled 予約済み, published 投稿済み, failed 失敗, cancelled 取り消し | R06-01 |
| caption | text | Không | | | Chú thích, dùng chung cho 3 mạng | R04-02, R04-03 |
| hashtags | text[] | Không | '{}' | | Danh sách hashtag theo thứ tự | R04-02 |
| shot_guide | text | Có | | | Hướng dẫn chụp | R04-02 |
| video_script | text | Có | | | Kịch bản (bài video) | R04-02 |
| scheduled_at | timestamptz | Có | | CK bắt buộc khi đã chấp nhận | Giờ đăng do hệ thống chọn | R04-09, BR-18 |
| adopted_at | timestamptz | Có | | CK như trên | Lúc chấp nhận | R04-05 |
| adopted_by_manager_id | uuid | Có | | FK managers | Quản lý chấp nhận (tài khoản công ty); NULL khi tài năng tự chấp nhận | R06-14 |
| approval_requested_at | timestamptz | Có | | CK bắt buộc khi awaiting_approval | Lúc gửi duyệt | R04-06 |
| ng_detected_at | timestamptz | Có | | CK đi cùng ng_detection_reason | Lúc AI phát hiện từ cấm; bài không được hẹn giờ | R04-07 |
| ng_detection_reason | text | Có | | | Lý do hiện cho tài năng | R04-07 |
| cancel_reason | text | Có | | CK manager_cancelled, approval_expired, auto_posting_paused, talent_ended | Lý do hủy | R06-07, R06-12, R06-13, R01-12 |
| cancelled_at | timestamptz | Có | | CK bắt buộc khi cancelled | | R06-07 |
| version | integer | Không | 1 | | Khóa lạc quan cho đổi trạng thái | KT |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## post_media

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| post_id | uuid | Không | | PK (cùng media_asset_id); FK posts ON DELETE CASCADE | | R04-05 |
| media_asset_id | uuid | Không | | FK media_assets | | R04-05 |
| position | smallint | Không | | UQ cùng post_id; CK > 0 | Thứ tự hiển thị | KT |

## post_approval_decisions

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| post_id | uuid | Không | | FK posts | | R06-05 |
| manager_id | uuid | Không | | FK managers | Bất kỳ quản lý nào | R06-06 |
| decision | text | Không | | CK approved, returned | Duyệt hoặc trả lại | R06-05 |
| reason | text | Có | | CK bắt buộc khi returned | Lý do trả lại, hiện cho tài năng | R06-05, BR-08 |
| decided_at | timestamptz | Không | now() | | | R06-05 |

## post_deliveries

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| post_id | uuid | Không | | FK posts; UQ cùng platform | | R06-03 |
| platform | text | Không | | CK 3 mạng | | BR-07, BR-11 |
| social_account_id | uuid | Không | | FK social_accounts | Tài khoản dùng để đăng | R06-03 |
| provider_state | text | Không | 'not_submitted' | CK 8 giá trị | Vòng đời ở Upload-Post cho mạng này: not_submitted, submitted, submit_failed (gửi lịch); cancel_requested, cancelled, cancel_failed (hủy lịch); published, publish_failed (kết quả đăng) | R06-03, R06-12, R06-13, R01-12, IR-01 |
| provider_state_changed_at | timestamptz | Không | now() | | Lần đổi provider_state gần nhất; việc nền dùng để đối soát | IR-01 |
| provider_job_ref | text | Có | | CK bắt buộc khi đã gửi lịch | Mã việc ở Upload-Post | R06-03 |
| failure_reason | text | Có | | CK bắt buộc khi submit_failed, cancel_failed, publish_failed | Lý do lỗi, hiện cho tài năng hoặc quản lý | R06-11 |
| external_post_ref | text | Có | | | Mã bài trên mạng xã hội | R07-01 |
| published_at | timestamptz | Có | | CK có khi và chỉ khi published | Lúc đăng thành công; dùng tính số ngày không đăng | R06-03, R02-05 |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## media_assets

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents | | R05-01 |
| kind | text | Không | | CK photo, video | | R05-01 |
| source | text | Không | | CK upload, ai_generated; ai_generated thì kind là video | Nguồn; `ai_generated` dùng để ghi nhãn AI khi đăng | R05-10 |
| uploaded_by_manager_id | uuid | Có | | FK managers | Quản lý gửi thay | R05-01 |
| mime_type | text | Không | | P-04 | | R05-04 |
| size_bytes | bigint | Không | | CK > 0; P-04 | | R05-04 |
| onedrive_item_id | text | Có | | UQ | Mã tệp trên OneDrive sau khi chuyển | R05-02 |
| temp_object_path | text | Có | | CK có ít nhất một trong hai vị trí | Đường dẫn bản tạm ở Supabase Storage | R05-03 |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## video_generations

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents | Lượt được tính cho tài năng này (kể cả khi quản lý tạo thay) | R05-07, CR-09 |
| video_type | text | Không | | CK short, slide | | BR-12 |
| status | text | Không | 'requested' | CK requested, processing, succeeded, failed | | R05-06〜R05-09 |
| is_counted | boolean | Không | true | | Đếm vào số lần tạo video trong tháng; false khi dịch vụ tạo video lỗi. Chỉ tính tiền khi tài năng là loại `talent` (tài khoản công ty được đếm, không thu tiền) | BR-13, R08-04, R08-07 |
| requested_by_manager_id | uuid | Có | | FK managers | Quản lý tạo thay | CR-09 |
| idempotency_key | text | Không | | UQ | Chống tạo hai lượt khi bấm lặp | KT |
| provider_job_ref | text | Có | | | Mã việc ở fal.ai (video ngắn) | R05-06 |
| result_media_asset_id | uuid | Có | | UQ; FK media_assets; CK có khi succeeded | Video kết quả | R05-09 |
| failure_reason | text | Có | | | Lý do hiện cho tài năng | [YK2] §6-8 5-1 |
| requested_at | timestamptz | Không | now() | | Thời điểm tính lượt | R05-07 |
| completed_at | timestamptz | Có | | CK có khi succeeded hoặc failed | | KT |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## video_generation_inputs

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| video_generation_id | uuid | Không | | PK (cùng media_asset_id); FK ON DELETE CASCADE | | R05-08 |
| media_asset_id | uuid | Không | | FK media_assets | Ảnh nguồn | R05-08 |
| position | smallint | Không | | UQ cùng video_generation_id; CK > 0 | Thứ tự ảnh | KT |

## follower_snapshots

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK | | KT |
| social_account_id | uuid | Không | | FK social_accounts; UQ cùng captured_on | | R07-01 |
| captured_on | date | Không | | | Ngày lấy số liệu (giờ Nhật) | R07-01 |
| follower_count | integer | Không | | CK ≥ 0 | | R07-01, R07-04 |
| captured_at | timestamptz | Không | now() | | | KT |

## post_metric_snapshots

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK | | KT |
| post_delivery_id | uuid | Không | | FK post_deliveries; UQ cùng captured_on | | R07-01 |
| captured_on | date | Không | | | | R07-01 |
| metrics | jsonb | Không | | CK là object | Chỉ số do Upload-Post trả về, giữ nguyên tên gốc | R07-02 |
| captured_at | timestamptz | Không | now() | | | KT |

## talent_notifications

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents; UQ cùng event_key | | R09-01 |
| kind | text | Không | | (không CK, U-11) | Loại theo 別紙A | R09-03 |
| title, body | text | Không | | | Câu chữ do khách duyệt ([YK2] §6-13) | R09-03 |
| target_path | text | Có | | CK bắt đầu bằng "/" và không phải "//" | Màn mở khi bấm, chỉ trong ứng dụng | R09-01, IR-07 |
| event_key | text | Không | | UQ cùng talent_id | Khóa chống tạo trùng | KT |
| read_at | timestamptz | Có | | | Lúc đọc; NULL là chưa đọc | R09-01 |
| created_at | timestamptz | Không | now() | | | KT |

## manager_notifications

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| kind | text | Không | | (không CK, U-11) | Đơn mới, yêu cầu duyệt, từ cấm, đăng lỗi, lâu không đăng, chuyện nghiêm trọng, đạt mục tiêu, thu tiền lỗi | R09-02 |
| talent_id | uuid | Có | | FK talents; CK có talent_id hoặc talent_application_id | Tài năng liên quan | R09-02 |
| talent_application_id | uuid | Có | | FK talent_applications | Với thông báo "đơn mới" | R09-02 |
| post_id | uuid | Có | | FK posts | Với yêu cầu duyệt, từ cấm, đăng lỗi | R09-02 |
| coach_message_id | bigint | Có | | FK coach_messages | Với chuyện nghiêm trọng | R03-03 |
| event_key | text | Không | | UQ | Khóa chống tạo trùng | KT |
| handled_at | timestamptz | Có | | CK đi cùng handled_by_manager_id | Đã xử lý (dùng chung cho mọi quản lý, U-10) | R09-02 |
| handled_by_manager_id | uuid | Có | | FK managers | | R09-02 |
| created_at | timestamptz | Không | now() | | | KT |

## push_subscriptions

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| talent_id | uuid | Không | | FK talents | | R09-01 |
| endpoint | text | Không | | UQ; CK https | Địa chỉ nhận của máy chủ đẩy | R09-01 |
| p256dh_key, auth_secret | text | Không | | P-10 | Khóa mã hóa của đăng ký Web Push | R09-01, R10-06 |
| is_active | boolean | Không | true | CK cùng deactivated_at | false khi đăng xuất, tắt thông báo, hoặc máy chủ đẩy trả 404/410 | R09-01 |
| last_success_at | timestamptz | Có | | | Lần gửi thành công gần nhất | KT |
| deactivated_at | timestamptz | Có | | | | KT |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## system_settings

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | smallint | Không | 1 | PK; CK = 1 | Bảng chỉ có một dòng | KT |
| morning_message_time | time | Không | '08:00' | | Giờ AI nhắn buổi sáng (giờ Nhật) | R10-02 |
| media_reminder_hours_before | smallint | Không | 2 | CK > 0 | Nhắc gửi tư liệu trước giờ đăng bao nhiêu giờ | R10-02 |
| coach_inactivity_days | smallint | Không | 3 | CK > 0 | Số ngày không đăng thì AI nhắn tài năng | R03-05 |
| manager_inactivity_days | smallint | Không | 7 | CK > 0 | Số ngày không đăng thì báo quản lý | R03-05 |
| weekly_review_weekday | smallint | Không | 1 | CK 1–7 | Thứ gửi tổng kết tuần (1 = thứ Hai) | R03-06 |
| is_auto_posting_paused | boolean | Không | false | | Dừng đăng tự động toàn bộ | R06-12 |
| updated_by_manager_id | uuid | Có | | FK managers | | R10-01 |
| updated_at | timestamptz | Không | now() | | | KT |

## ng_words

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK | | KT |
| word | text | Không | | UQ theo lower(btrim(word)); CK không rỗng | Từ hoặc cụm từ cấm | R04-07, BR-15 |
| created_by_manager_id | uuid | Có | | FK managers | NULL khi nạp từ mẫu ban đầu | R10-01 |
| created_at, updated_at | timestamptz | Không | now() | | | KT |

## manager_view_logs

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK | | KT |
| manager_id | uuid | Không | | FK managers | Ai xem | R01-14 |
| talent_id | uuid | Không | | FK talents | Xem của ai | R01-14 |
| screen | text | Không | | CK talent_info, conversation, metrics | Màn đã mở: thông tin, hội thoại, kết quả | R01-14 |
| viewed_at | timestamptz | Không | now() | | Lúc xem | R01-14 |

Cả bảng: trigger chặn UPDATE và DELETE (BR-14).

## activity_logs

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK | | KT |
| actor_type | text | Không | | CK manager, talent, system | Ai làm | R10-04 |
| actor_manager_id | uuid | Có | | FK managers; CK khớp actor_type | | R10-04 |
| actor_talent_id | uuid | Có | | FK talents; CK khớp actor_type | | R10-04 |
| action | text | Không | | | Tên hành động, ví dụ `post.approve`, `talent.status_change`, `auto_posting.pause`, `metrics.import`, `video.generate`, `billing.charge`, `onedrive.read` | R10-04, R02-07 |
| target_type, target_id | text | Có | | | Đối tượng (tham chiếu mềm, D-11) | R10-04 |
| result | text | Có | | CK succeeded, failed | Kết quả của việc xử lý | R10-04 |
| details | jsonb | Có | | | Giá trị trước, sau; mã lỗi. Không chứa mật khẩu, token, khóa; chỉ các khóa có trong danh sách cho phép (IR-21) | R10-04, R10-06 |
| occurred_at | timestamptz | Không | now() | | | R10-04 |

Cả bảng: trigger chặn UPDATE và DELETE (chỉ thêm).

## Bổ sung hiện hành — migration 20261117000300

| Bảng/cột thay đổi | Kiểu và ý nghĩa | Ràng buộc hiện hành |
|---|---|---|
| managers.principal_kind | text, manager | Cố định bằng CHECK; FK kép auth_principals |
| talents.principal_kind | text, talent (kể cả office) | CHECK + FK kép; một Auth identity không đóng hai vai trò |
| talents.application_status | text, approved | Cố định bằng CHECK; FK kép tới application id/status; office có application_id NULL |
| billing_accounts.account_type | text, talent | CHECK + FK kép talent/id/type; chưa mở ghi billing |
| post_media.talent_id | uuid NOT NULL | Backfill từ post; FK kép cả post và media |
| video_generation_inputs.talent_id | uuid NOT NULL | Backfill từ video; FK kép video và input; chưa mở ghi video |
| post_deliveries.talent_id | uuid NOT NULL | Backfill từ post; FK kép post và account/id/owner/platform; chưa mở ghi delivery |
| auth_principals.* | identity, kind, must_change_password, security_version, timestamps | FK Auth thật; default restricted; version dương |
| auth_session_registry.* | session/user, purpose, version snapshot, auth_time/expiry, activity, password/MFA proof, revoke | Origin/expiry/version bất biến; revoke không gỡ; proof tuple đầy đủ hoặc NULL hết |
| auth_challenges.* | challenge id/provider id, session/user, factor, purpose, state, attempts/expiry/verify time | FK kép registry; verified có timestamp; không secret |
| password_lock_state.* | user, số lần sai, blocked_until, last_failed_at, updated_at | PK/FK principal; counters không âm; ngưỡng do policy server |
| domain_operations.* | id, operation_key, actor/kind/subject, hash, state/step/provider ref/version/error | UNIQUE key; partial UNIQUE application.provision; hash không secret; CAS version |
| outbox_events.* | operation/generation/type, state, attempts, available_at, lease token/expiry, error | UNIQUE operation/generation/type; leased có đủ token/expiry, trạng thái khác không giữ lease |

Tên đầy đủ, nullability và index ở Prisma schema và migration; contract Auth/outbox, dữ liệu cấm lưu và scope ở tài liệu `10`. Không dùng dictionary cũ để kết luận `auth_user_id` chỉ có delete trigger hoặc chưa có FK ownership. app_private không mở cho Data API client.
