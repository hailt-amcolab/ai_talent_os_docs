# 04. Schema vật lý

Bản 1.0 · 17/11/2026 · Bước 4. **Đã triển khai ngày 17/11/2026**: SQL dưới đây (kèm trigger `updated_at`, RLS, dòng `system_settings` viết đầy đủ) là migration `apps/api/prisma/migrations/20261117000000_init`, cộng phần đổi IR-03 ở `20261117000200_auth_ref_by_trigger`, đã áp lên Supabase dev. Từ nay mọi thay đổi đi bằng migration mới (`apps/api/PRISMA.md`); sửa schema thì cập nhật cả tài liệu này cho khớp.

## 1. Quy ước

| Mục | Quy ước | Ví dụ |
|---|---|---|
| DB | PostgreSQL 17 trên Supabase, schema `public` | — |
| Bảng | snake_case, số nhiều | `talents`, `post_deliveries` |
| Cột | snake_case | `scheduled_at` |
| Khóa chính | `id`. UUID (`gen_random_uuid()`) cho dữ liệu nghiệp vụ; `bigint GENERATED ALWAYS AS IDENTITY` cho bảng chỉ thêm, nhiều dòng (nhật ký, ảnh chụp số liệu, tin nhắn) | — |
| Khóa ngoại | `<thực thể>_id`; vai trò khác thì thêm tiền tố: `created_by_manager_id` | — |
| Boolean | `is_`, `has_`, `can_` | `is_counted` |
| Thời gian | `timestamptz`; `created_at`, `updated_at`; ngày thuần dùng `date` | — |
| Tiền | `numeric`, không dùng `float` | `ai_usage_events.cost_amount` |
| Tham chiếu tới `auth.users` | Không dùng khóa ngoại (Prisma không đọc được DB có khóa ngoại sang schema khác, lỗi P4002). Trigger trên `auth.users` chặn xóa người dùng còn được tham chiếu (IR-03 cách c) | `trg_auth_users_block_referenced_delete` |
| Tên ràng buộc | `pk_<bảng>`, `fk_<bảng>_<cột>`, `uq_<bảng>_<cột>`, `chk_<bảng>_<ý nghĩa>`, `idx_<bảng>_<cột>` | — |
| Liệt kê | `text` + CHECK (D-16) | — |
| Xóa | Không xóa mềm (không có yêu cầu). Dữ liệu tài năng giữ lại khi ngừng ([YK2] §7-3); khóa ngoại tới `talents` là RESTRICT | — |
| Múi giờ | Lưu UTC (`timestamptz`). Các mốc nghiệp vụ theo ngày (chủ đề mỗi sáng, ảnh chụp số liệu) dùng ngày theo giờ Nhật (`Asia/Tokyo`), do tầng dịch vụ tính | Giả định kỹ thuật: [YK2] không nói múi giờ |

Ràng buộc được đánh dấu:
- **[NV]**: ràng buộc nghiệp vụ, có mã BR ở `01` §4.
- **[KT]**: ràng buộc kỹ thuật, giữ dữ liệu nhất quán.
- **PROPOSED**: chưa đưa vào schema chính thức vì yêu cầu chưa xác nhận hoặc tải thực tế chưa rõ (§4).

## 2. DDL tham khảo

```sql
-- =========================================================
-- Hàm dùng chung
-- =========================================================
CREATE FUNCTION set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END $$;

CREATE FUNCTION reject_change() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION '% is append-only', TG_TABLE_NAME; END $$;

-- =========================================================
-- EP01. Danh tính và quyền truy cập
-- =========================================================
CREATE TABLE managers (
  id                     uuid        NOT NULL DEFAULT gen_random_uuid(),
  auth_user_id           uuid        NOT NULL,
  is_active              boolean     NOT NULL DEFAULT true,          -- R01-09: vô hiệu thì không đăng nhập
  created_by_manager_id  uuid,                                        -- NULL: quản lý đầu tiên do vận hành tạo
  deactivated_at         timestamptz,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_managers PRIMARY KEY (id),
  CONSTRAINT uq_managers_auth_user_id UNIQUE (auth_user_id),                        -- [KT] BR-17
  CONSTRAINT fk_managers_created_by_manager_id FOREIGN KEY (created_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_managers_deactivated CHECK (is_active = (deactivated_at IS NULL))   -- [KT]
);

CREATE TABLE talent_applications (
  id                     uuid        NOT NULL DEFAULT gen_random_uuid(),
  display_name           text        NOT NULL,                       -- R01-02: nghệ danh hoặc tên thật
  email                  text        NOT NULL,                       -- R01-02
  birth_date             date        NOT NULL,                       -- R01-02
  status                 text        NOT NULL DEFAULT 'pending',
  decided_by_manager_id  uuid,
  decided_at             timestamptz,
  version                integer     NOT NULL DEFAULT 1,             -- [KT] khóa lạc quan: quản lý quyết trước thì thắng
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_talent_applications PRIMARY KEY (id),
  CONSTRAINT fk_talent_applications_decided_by_manager_id FOREIGN KEY (decided_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_talent_applications_status CHECK (status IN ('pending', 'approved', 'rejected')),       -- [NV] R01-01
  CONSTRAINT chk_talent_applications_decision CHECK (
    (status = 'pending') = (decided_by_manager_id IS NULL AND decided_at IS NULL)),                      -- [KT]
  CONSTRAINT chk_talent_applications_display_name CHECK (btrim(display_name) <> '')                       -- [KT]
);
-- [NV] BR-01: một email chỉ gửi đơn một lần (so khớp không phân biệt hoa thường)
CREATE UNIQUE INDEX uq_talent_applications_email ON talent_applications (lower(btrim(email)));
-- IR-12: email cũng không được trùng người dùng đã có ở auth.users (quản lý, tài khoản công ty): BE kiểm lúc nhận đơn và lúc duyệt.
CREATE INDEX idx_talent_applications_status_created_at ON talent_applications (status, created_at DESC);

CREATE TABLE talents (
  id                             uuid        NOT NULL DEFAULT gen_random_uuid(),
  auth_user_id                   uuid        NOT NULL,
  account_type                   text        NOT NULL,                 -- 'talent' | 'office' (D-01)
  display_name                   text        NOT NULL,
  birth_date                     date,                                 -- NULL khi office
  status                         text        NOT NULL DEFAULT 'before_use',
  is_approval_required           boolean     NOT NULL DEFAULT false,   -- R01-05, [YK2] §5-6
  is_auto_posting_paused         boolean     NOT NULL DEFAULT false,   -- R06-12
  application_id                 uuid,                                 -- bắt buộc khi talent
  created_by_manager_id          uuid,                                 -- bắt buộc khi office
  onedrive_folder_id             text,                                 -- R02-01: có sau khi tạo thư mục
  onedrive_folder_created_at     timestamptz,
  posting_service_profile_ref    text,                                 -- R06-09: mã hồ sơ ở Upload-Post
  posting_service_registered_at  timestamptz,
  status_changed_at              timestamptz NOT NULL DEFAULT now(),
  version                        integer     NOT NULL DEFAULT 1,       -- [KT] khóa lạc quan
  created_at                     timestamptz NOT NULL DEFAULT now(),
  updated_at                     timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_talents PRIMARY KEY (id),
  CONSTRAINT uq_talents_auth_user_id UNIQUE (auth_user_id),                                     -- [KT] BR-17
  CONSTRAINT uq_talents_application_id UNIQUE (application_id),                                 -- [KT] một đơn thành một tài năng
  CONSTRAINT uq_talents_onedrive_folder_id UNIQUE (onedrive_folder_id),                         -- [KT]
  CONSTRAINT uq_talents_posting_service_profile_ref UNIQUE (posting_service_profile_ref),       -- [KT]
  CONSTRAINT fk_talents_application_id FOREIGN KEY (application_id) REFERENCES talent_applications (id) ON DELETE RESTRICT,
  CONSTRAINT fk_talents_created_by_manager_id FOREIGN KEY (created_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_talents_account_type CHECK (account_type IN ('talent', 'office')),            -- [NV] R08-01
  CONSTRAINT chk_talents_status CHECK (status IN ('before_use', 'in_use', 'ended')),           -- [NV] BR-05
  CONSTRAINT chk_talents_origin CHECK (                                                         -- [NV] BR-02, BR-03
    (account_type = 'talent' AND application_id IS NOT NULL AND created_by_manager_id IS NULL)
    OR (account_type = 'office' AND application_id IS NULL AND created_by_manager_id IS NOT NULL)),
  CONSTRAINT chk_talents_birth_date CHECK (account_type = 'office' OR birth_date IS NOT NULL), -- [NV] BR-04
  CONSTRAINT chk_talents_office_no_approval CHECK (account_type = 'talent' OR NOT is_approval_required), -- [NV] BR-20, [QA] No.20
  CONSTRAINT chk_talents_display_name CHECK (btrim(display_name) <> '')                        -- [KT]
);
-- IR-16: không tạo chỉ mục cho status, created_by_manager_id (≤ 1.000 dòng, quét tuần tự đủ nhanh)

-- IR-03 cách (c) (đổi ngày 17/11/2026, migration 20261117000200_auth_ref_by_trigger):
-- managers.auth_user_id, talents.auth_user_id KHÔNG có khóa ngoại sang auth.users. Thay vào đó:
--   - chiều thêm: BE tạo người dùng Auth trước, ghi đúng id được trả về;
--   - chiều xóa: trigger trên auth.users chặn xóa người dùng còn được tham chiếu (thay ON DELETE RESTRICT).
CREATE FUNCTION block_referenced_auth_user_delete() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.managers WHERE auth_user_id = OLD.id)
     OR EXISTS (SELECT 1 FROM public.talents WHERE auth_user_id = OLD.id) THEN
    RAISE EXCEPTION 'auth user % is referenced by managers or talents', OLD.id USING ERRCODE = 'foreign_key_violation';
  END IF;
  RETURN OLD;
END $$;
-- Chỉ tạo khi DB có schema auth (DB tạm của Prisma không có):
-- CREATE TRIGGER trg_auth_users_block_referenced_delete BEFORE DELETE ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.block_referenced_auth_user_delete();

-- =========================================================
-- EP08. Thu phí (phần đã xác nhận)
-- =========================================================
CREATE TABLE billing_accounts (
  id                    uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id             uuid        NOT NULL,
  provider_member_ref   text        NOT NULL,   -- mã thành viên ở công ty thanh toán; KHÔNG có thông tin thẻ (BR-16)
  registered_at         timestamptz NOT NULL,   -- R02-01: mốc tạo thư mục OneDrive
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_billing_accounts PRIMARY KEY (id),
  CONSTRAINT uq_billing_accounts_talent_id UNIQUE (talent_id),                       -- [KT] một tài năng một đăng ký
  CONSTRAINT uq_billing_accounts_provider_member_ref UNIQUE (provider_member_ref),   -- [KT]
  CONSTRAINT fk_billing_accounts_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT
);
-- Tài khoản công ty không đăng ký thanh toán (R08-01): kiểm ở tầng dịch vụ (CHECK không nhìn được bảng khác).

-- =========================================================
-- EP06. Kết nối mạng xã hội
-- =========================================================
CREATE TABLE social_accounts (
  id                    uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id             uuid        NOT NULL,
  platform              text        NOT NULL,
  external_account_ref  text,                    -- mã hoặc tên tài khoản do Upload-Post trả về
  status                text        NOT NULL DEFAULT 'connected',
  connected_at          timestamptz NOT NULL DEFAULT now(),
  disconnected_at       timestamptz,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_social_accounts PRIMARY KEY (id),
  CONSTRAINT fk_social_accounts_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_social_accounts_platform CHECK (platform IN ('instagram', 'tiktok', 'youtube')), -- [NV] BR-11
  CONSTRAINT chk_social_accounts_status CHECK (status IN ('connected', 'disconnected')),          -- [NV] R06-09
  CONSTRAINT chk_social_accounts_disconnected CHECK ((status = 'disconnected') = (disconnected_at IS NOT NULL)) -- [KT]
);
CREATE INDEX idx_social_accounts_talent_id_platform ON social_accounts (talent_id, platform);
-- PROPOSED P-01 (U-05, chờ [QA] No.23): mỗi mạng một tài khoản đang kết nối
-- CREATE UNIQUE INDEX uq_social_accounts_talent_id_platform ON social_accounts (talent_id, platform) WHERE status = 'connected';

-- =========================================================
-- EP02. Mục tiêu
-- =========================================================
CREATE TABLE follower_goals (
  id                     uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id              uuid        NOT NULL,
  platform               text        NOT NULL,
  target_followers       integer     NOT NULL DEFAULT 10000,     -- [NV] BR-10, [QA] No.14
  deadline_on            date,                                     -- R02-03: hạn đạt; NULL cho tới khi quản lý nhập
  achieved_at            timestamptz,                              -- R03-07: dùng để chỉ báo đạt một lần
  updated_by_manager_id  uuid,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_follower_goals PRIMARY KEY (id),
  CONSTRAINT uq_follower_goals_talent_id_platform UNIQUE (talent_id, platform),          -- [NV] BR-10
  CONSTRAINT fk_follower_goals_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT fk_follower_goals_updated_by_manager_id FOREIGN KEY (updated_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_follower_goals_platform CHECK (platform IN ('instagram', 'tiktok', 'youtube')), -- [NV] BR-11
  CONSTRAINT chk_follower_goals_target CHECK (target_followers > 0)                              -- [KT]
);

-- =========================================================
-- EP03. AI coach
-- =========================================================
CREATE TABLE coach_messages (
  id          bigint      GENERATED ALWAYS AS IDENTITY,
  talent_id   uuid        NOT NULL,
  sender      text        NOT NULL,                 -- 'talent' | 'coach'
  body        text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_coach_messages PRIMARY KEY (id),
  CONSTRAINT fk_coach_messages_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_coach_messages_sender CHECK (sender IN ('talent', 'coach')),   -- [NV] R03-01
  CONSTRAINT chk_coach_messages_body CHECK (btrim(body) <> '')                 -- [KT]
  -- PROPOSED P-02 (R03-02, con số §6): CHECK (sender <> 'talent' OR char_length(body) <= 1000)
);
CREATE INDEX idx_coach_messages_talent_id_id ON coach_messages (talent_id, id DESC);  -- xem lại hội thoại, mới trước

CREATE TABLE ai_usage_events (
  id             bigint        GENERATED ALWAYS AS IDENTITY,
  talent_id      uuid          NOT NULL,
  occurred_at    timestamptz   NOT NULL DEFAULT now(),
  model          text          NOT NULL,
  input_tokens   integer       NOT NULL DEFAULT 0,
  output_tokens  integer       NOT NULL DEFAULT 0,
  cost_amount    numeric(14,6) NOT NULL,          -- chi phí theo bảng giá của nhà cung cấp AI
  cost_currency  char(3)       NOT NULL,          -- mã tiền tệ ISO 4217, ví dụ USD
  CONSTRAINT pk_ai_usage_events PRIMARY KEY (id),
  CONSTRAINT fk_ai_usage_events_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_ai_usage_events_tokens CHECK (input_tokens >= 0 AND output_tokens >= 0),  -- [KT]
  CONSTRAINT chk_ai_usage_events_cost CHECK (cost_amount >= 0),                             -- [KT]
  CONSTRAINT chk_ai_usage_events_currency CHECK (cost_currency ~ '^[A-Z]{3}$')              -- [KT] IR-20
);
CREATE INDEX idx_ai_usage_events_talent_id_occurred_at ON ai_usage_events (talent_id, occurred_at); -- R03-04: tổng theo tháng

-- =========================================================
-- EP05. Tư liệu và video AI
-- =========================================================
CREATE TABLE media_assets (
  id                      uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id               uuid        NOT NULL,
  kind                    text        NOT NULL,          -- 'photo' | 'video'
  source                  text        NOT NULL,          -- 'upload' | 'ai_generated'
  uploaded_by_manager_id  uuid,                          -- R05-01: quản lý gửi thay; NULL khi tài năng tự gửi
  mime_type               text        NOT NULL,
  size_bytes              bigint      NOT NULL,
  onedrive_item_id        text,                          -- R05-02: có sau khi chuyển sang OneDrive
  temp_object_path        text,                          -- bản tạm ở Supabase Storage (R05-03)
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_media_assets PRIMARY KEY (id),
  CONSTRAINT uq_media_assets_onedrive_item_id UNIQUE (onedrive_item_id),                                  -- [KT]
  CONSTRAINT fk_media_assets_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT fk_media_assets_uploaded_by_manager_id FOREIGN KEY (uploaded_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_media_assets_kind CHECK (kind IN ('photo', 'video')),                                    -- [NV] R05-01
  CONSTRAINT chk_media_assets_source CHECK (source IN ('upload', 'ai_generated')),                        -- [NV] R05-10
  CONSTRAINT chk_media_assets_ai_is_video CHECK (source <> 'ai_generated' OR kind = 'video'),             -- [NV] R05-06: AI chỉ tạo video
  CONSTRAINT chk_media_assets_size CHECK (size_bytes > 0),                                                 -- [KT]
  CONSTRAINT chk_media_assets_location CHECK (onedrive_item_id IS NOT NULL OR temp_object_path IS NOT NULL) -- [KT]
  -- PROPOSED P-04 (R05-04, UNKNOWN): giới hạn định dạng và dung lượng
);
CREATE INDEX idx_media_assets_talent_id_created_at ON media_assets (talent_id, created_at DESC); -- R05-02: thư viện tư liệu

CREATE TABLE video_generations (
  id                       uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id                uuid        NOT NULL,
  video_type               text        NOT NULL,          -- 'short' | 'slide'
  status                   text        NOT NULL DEFAULT 'requested',
  is_counted               boolean     NOT NULL DEFAULT true,   -- BR-13: đếm lúc gửi yêu cầu; false khi dịch vụ tạo video lỗi.
                                                                -- Tính tiền = is_counted AND talents.account_type = 'talent' (IR-09)
  requested_by_manager_id  uuid,                                -- CR-09: quản lý tạo thay; NULL khi tài năng tự tạo
  idempotency_key          text        NOT NULL,                -- [KT] bấm hai lần không thành hai lượt tính phí
  provider_job_ref         text,                                -- mã việc ở fal.ai; NULL với video trình chiếu (ghép ở máy chủ)
  result_media_asset_id    uuid,
  failure_reason           text,
  requested_at             timestamptz NOT NULL DEFAULT now(),
  completed_at             timestamptz,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_video_generations PRIMARY KEY (id),
  CONSTRAINT uq_video_generations_idempotency_key UNIQUE (idempotency_key),                                -- [KT]
  CONSTRAINT uq_video_generations_result_media_asset_id UNIQUE (result_media_asset_id),                    -- [KT]
  CONSTRAINT fk_video_generations_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT fk_video_generations_requested_by_manager_id FOREIGN KEY (requested_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT fk_video_generations_result_media_asset_id FOREIGN KEY (result_media_asset_id) REFERENCES media_assets (id) ON DELETE RESTRICT,
  CONSTRAINT chk_video_generations_video_type CHECK (video_type IN ('short', 'slide')),                     -- [NV] BR-12
  CONSTRAINT chk_video_generations_status CHECK (status IN ('requested', 'processing', 'succeeded', 'failed')), -- [KT]
  CONSTRAINT chk_video_generations_result CHECK ((status = 'succeeded') = (result_media_asset_id IS NOT NULL)), -- [KT]
  CONSTRAINT chk_video_generations_completed CHECK (
    (status IN ('succeeded', 'failed')) = (completed_at IS NOT NULL))                                       -- [KT]
  -- PROPOSED P-03 (U-02, R05-11): unit_price_amount numeric(10,0) — đơn giá lúc gửi yêu cầu
);
CREATE INDEX idx_video_generations_talent_id_requested_at ON video_generations (talent_id, requested_at); -- R08-07: đếm theo tháng
CREATE INDEX idx_video_generations_in_progress ON video_generations (requested_at) WHERE status IN ('requested', 'processing'); -- việc nền dò việc đang chạy

CREATE TABLE video_generation_inputs (
  video_generation_id  uuid     NOT NULL,
  media_asset_id       uuid     NOT NULL,
  position             smallint NOT NULL,     -- thứ tự ảnh (video trình chiếu dùng thứ tự)
  CONSTRAINT pk_video_generation_inputs PRIMARY KEY (video_generation_id, media_asset_id),
  CONSTRAINT uq_video_generation_inputs_video_generation_id_position UNIQUE (video_generation_id, position), -- [KT]
  CONSTRAINT fk_video_generation_inputs_video_generation_id FOREIGN KEY (video_generation_id) REFERENCES video_generations (id) ON DELETE CASCADE,
  CONSTRAINT fk_video_generation_inputs_media_asset_id FOREIGN KEY (media_asset_id) REFERENCES media_assets (id) ON DELETE RESTRICT,
  CONSTRAINT chk_video_generation_inputs_position CHECK (position > 0)                                     -- [KT]
  -- PROPOSED P-04 (S05-07): số ảnh tối đa mỗi loại video
);
CREATE INDEX idx_video_generation_inputs_media_asset_id ON video_generation_inputs (media_asset_id);

-- =========================================================
-- EP04. Nội dung bài đăng
-- =========================================================
CREATE TABLE theme_suggestions (
  id            uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id     uuid        NOT NULL,
  suggested_on  date        NOT NULL,          -- ngày theo giờ Nhật
  position      smallint    NOT NULL,          -- 1, 2, 3
  content       text        NOT NULL,
  selected_at   timestamptz,                   -- R04-01: tài năng chọn chủ đề này
  created_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_theme_suggestions PRIMARY KEY (id),
  CONSTRAINT uq_theme_suggestions_talent_id_suggested_on_position UNIQUE (talent_id, suggested_on, position), -- [NV] BR-09
  CONSTRAINT fk_theme_suggestions_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_theme_suggestions_position CHECK (position BETWEEN 1 AND 3)                                   -- [NV] BR-09
);

CREATE TABLE posts (
  id                     uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id              uuid        NOT NULL,
  theme_suggestion_id    uuid,                          -- NULL khi tài năng tự nêu chủ đề (R04-01)
  revised_from_post_id   uuid,                          -- R04-04: bản sửa qua AI của bản nháp nào
  status                 text        NOT NULL DEFAULT 'draft',
  caption                text        NOT NULL,          -- R04-02
  hashtags               text[]      NOT NULL DEFAULT '{}', -- R04-02 (D-07)
  shot_guide             text,                          -- R04-02: hướng dẫn chụp
  video_script           text,                          -- R04-02: kịch bản khi là bài video
  scheduled_at           timestamptz,                   -- R04-09: hệ thống quyết giờ đăng
  adopted_at             timestamptz,                   -- R04-05: lúc chấp nhận
  adopted_by_manager_id  uuid,                          -- R06-14: quản lý chấp nhận cho tài khoản công ty
  approval_requested_at  timestamptz,                   -- R04-06: NULL khi không gửi duyệt
  ng_detected_at         timestamptz,                   -- R04-07: phát hiện từ cấm, không hẹn giờ
  ng_detection_reason    text,                          -- R04-07: lý do hiện cho tài năng
  cancel_reason          text,
  cancelled_at           timestamptz,
  version                integer     NOT NULL DEFAULT 1,  -- [KT] khóa lạc quan cho mọi lần đổi trạng thái
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_posts PRIMARY KEY (id),
  CONSTRAINT fk_posts_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT fk_posts_theme_suggestion_id FOREIGN KEY (theme_suggestion_id) REFERENCES theme_suggestions (id) ON DELETE RESTRICT,
  CONSTRAINT fk_posts_revised_from_post_id FOREIGN KEY (revised_from_post_id) REFERENCES posts (id) ON DELETE RESTRICT,
  CONSTRAINT fk_posts_adopted_by_manager_id FOREIGN KEY (adopted_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_posts_status CHECK (status IN
    ('draft', 'awaiting_approval', 'scheduled', 'published', 'failed', 'cancelled')),                   -- [NV] BR-06
  CONSTRAINT chk_posts_adopted CHECK (
    status IN ('draft', 'cancelled') OR (adopted_at IS NOT NULL AND scheduled_at IS NOT NULL)),         -- [KT] BR-18
  CONSTRAINT chk_posts_awaiting_approval CHECK (
    status <> 'awaiting_approval' OR approval_requested_at IS NOT NULL),                                -- [KT]
  CONSTRAINT chk_posts_cancel_reason CHECK (cancel_reason IN
    ('manager_cancelled', 'approval_expired', 'auto_posting_paused', 'talent_ended')),                  -- [NV] R06-07, R06-12, R06-13, R01-12
  CONSTRAINT chk_posts_cancelled CHECK (
    (status = 'cancelled') = (cancel_reason IS NOT NULL AND cancelled_at IS NOT NULL)),                 -- [KT]
  CONSTRAINT chk_posts_ng CHECK ((ng_detected_at IS NULL) = (ng_detection_reason IS NULL))              -- [KT]
  -- PROPOSED P-06 (U-03, U-04): lý do hủy 'returned' và trạng thái thêm của [QA] No.51, No.58, No.60
);
CREATE INDEX idx_posts_talent_id_status ON posts (talent_id, status);                      -- R06-13: lọc theo trạng thái
CREATE INDEX idx_posts_talent_id_created_at ON posts (talent_id, created_at DESC);         -- danh sách bản nháp
CREATE INDEX idx_posts_scheduled_at ON posts (scheduled_at)
  WHERE status IN ('awaiting_approval', 'scheduled');                                       -- việc nền: hết hạn duyệt, sắp đăng
CREATE INDEX idx_posts_theme_suggestion_id ON posts (theme_suggestion_id);
CREATE INDEX idx_posts_revised_from_post_id ON posts (revised_from_post_id);
CREATE INDEX idx_posts_ng_detected_at ON posts (ng_detected_at) WHERE ng_detected_at IS NOT NULL; -- danh sách bài dính từ cấm

CREATE TABLE post_media (
  post_id         uuid     NOT NULL,
  media_asset_id  uuid     NOT NULL,
  position        smallint NOT NULL,
  CONSTRAINT pk_post_media PRIMARY KEY (post_id, media_asset_id),
  CONSTRAINT uq_post_media_post_id_position UNIQUE (post_id, position),            -- [KT]
  CONSTRAINT fk_post_media_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
  CONSTRAINT fk_post_media_media_asset_id FOREIGN KEY (media_asset_id) REFERENCES media_assets (id) ON DELETE RESTRICT,
  CONSTRAINT chk_post_media_position CHECK (position > 0)                            -- [KT]
  -- PROPOSED P-04 (R05-04): số tư liệu tối đa mỗi bài
);
CREATE INDEX idx_post_media_media_asset_id ON post_media (media_asset_id);

-- =========================================================
-- EP06. Duyệt và đăng bài
-- =========================================================
CREATE TABLE post_approval_decisions (
  id          uuid        NOT NULL DEFAULT gen_random_uuid(),
  post_id     uuid        NOT NULL,
  manager_id  uuid        NOT NULL,
  decision    text        NOT NULL,         -- 'approved' | 'returned'
  reason      text,                         -- bắt buộc khi trả lại
  decided_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_post_approval_decisions PRIMARY KEY (id),
  CONSTRAINT fk_post_approval_decisions_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE RESTRICT,
  CONSTRAINT fk_post_approval_decisions_manager_id FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_post_approval_decisions_decision CHECK (decision IN ('approved', 'returned')),           -- [NV] R06-05
  CONSTRAINT chk_post_approval_decisions_reason CHECK (decision <> 'returned' OR btrim(coalesce(reason, '')) <> '') -- [NV] BR-08
);
CREATE INDEX idx_post_approval_decisions_post_id_decided_at ON post_approval_decisions (post_id, decided_at DESC);
CREATE INDEX idx_post_approval_decisions_manager_id ON post_approval_decisions (manager_id);

CREATE TABLE post_deliveries (
  id                         uuid        NOT NULL DEFAULT gen_random_uuid(),
  post_id                    uuid        NOT NULL,
  platform                   text        NOT NULL,
  social_account_id          uuid        NOT NULL,
  provider_state             text        NOT NULL DEFAULT 'not_submitted', -- IR-01: vòng đời ở Upload-Post cho mạng này
  provider_state_changed_at  timestamptz NOT NULL DEFAULT now(),
  provider_job_ref           text,                       -- mã việc ở Upload-Post; có từ khi gửi lịch thành công
  failure_reason             text,                       -- R06-11: lý do lỗi, hiện cho tài năng
  external_post_ref          text,                       -- mã bài trên mạng xã hội
  published_at               timestamptz,
  created_at                 timestamptz NOT NULL DEFAULT now(),
  updated_at                 timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_post_deliveries PRIMARY KEY (id),
  CONSTRAINT uq_post_deliveries_post_id_platform UNIQUE (post_id, platform),                           -- [NV] BR-07
  CONSTRAINT fk_post_deliveries_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE RESTRICT,
  CONSTRAINT fk_post_deliveries_social_account_id FOREIGN KEY (social_account_id) REFERENCES social_accounts (id) ON DELETE RESTRICT,
  CONSTRAINT chk_post_deliveries_platform CHECK (platform IN ('instagram', 'tiktok', 'youtube')),      -- [NV] BR-11
  CONSTRAINT chk_post_deliveries_provider_state CHECK (provider_state IN (
    'not_submitted', 'submitted', 'submit_failed',                -- gửi lịch sang Upload-Post
    'cancel_requested', 'cancelled', 'cancel_failed',             -- hủy lịch (R06-12, R06-13, R01-12)
    'published', 'publish_failed')),                              -- kết quả đăng (R06-03)
  CONSTRAINT chk_post_deliveries_job_ref CHECK (
    provider_state IN ('not_submitted', 'submit_failed') OR provider_job_ref IS NOT NULL),             -- [KT] đã gửi lịch thì có mã việc
  CONSTRAINT chk_post_deliveries_published CHECK ((provider_state = 'published') = (published_at IS NOT NULL)), -- [KT]
  CONSTRAINT chk_post_deliveries_failure CHECK (
    provider_state NOT IN ('submit_failed', 'cancel_failed', 'publish_failed') OR failure_reason IS NOT NULL) -- [KT]
  -- PROPOSED P-05 (U-06): giá trị 'skipped' (bỏ qua vì chưa kết nối, không có video)
);
CREATE INDEX idx_post_deliveries_social_account_id_published_at ON post_deliveries (social_account_id, published_at DESC); -- số ngày không đăng
CREATE INDEX idx_post_deliveries_needs_attention ON post_deliveries (provider_state_changed_at)
  WHERE provider_state IN ('submit_failed', 'cancel_requested', 'cancel_failed', 'publish_failed');      -- việc nền và cảnh báo (IR-01, IR-15)

-- =========================================================
-- EP07. Kết quả
-- =========================================================
CREATE TABLE follower_snapshots (
  id                 bigint      GENERATED ALWAYS AS IDENTITY,
  social_account_id  uuid        NOT NULL,
  captured_on        date        NOT NULL,      -- ngày theo giờ Nhật
  follower_count     integer     NOT NULL,
  captured_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_follower_snapshots PRIMARY KEY (id),
  CONSTRAINT uq_follower_snapshots_social_account_id_captured_on UNIQUE (social_account_id, captured_on), -- [NV] R07-01: mỗi ngày 1 lần
  CONSTRAINT fk_follower_snapshots_social_account_id FOREIGN KEY (social_account_id) REFERENCES social_accounts (id) ON DELETE RESTRICT,
  CONSTRAINT chk_follower_snapshots_count CHECK (follower_count >= 0)                                      -- [KT]
);

CREATE TABLE post_metric_snapshots (
  id                bigint      GENERATED ALWAYS AS IDENTITY,
  post_delivery_id  uuid        NOT NULL,
  captured_on       date        NOT NULL,
  metrics           jsonb       NOT NULL,       -- D-08: chỉ số do Upload-Post trả về (U-07)
  captured_at       timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_post_metric_snapshots PRIMARY KEY (id),
  CONSTRAINT uq_post_metric_snapshots_post_delivery_id_captured_on UNIQUE (post_delivery_id, captured_on), -- [NV] R07-01
  CONSTRAINT fk_post_metric_snapshots_post_delivery_id FOREIGN KEY (post_delivery_id) REFERENCES post_deliveries (id) ON DELETE RESTRICT,
  CONSTRAINT chk_post_metric_snapshots_metrics CHECK (jsonb_typeof(metrics) = 'object')                    -- [KT]
);

-- =========================================================
-- EP09. Thông báo
-- =========================================================
CREATE TABLE talent_notifications (
  id           uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id    uuid        NOT NULL,
  kind         text        NOT NULL,          -- loại theo 別紙A; không CHECK (U-11)
  title        text        NOT NULL,
  body         text        NOT NULL,
  target_path  text,                          -- màn mở khi bấm (R09-01); chỉ đường dẫn trong ứng dụng
  event_key    text        NOT NULL,          -- [KT] chống tạo trùng cùng một sự kiện
  read_at      timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_talent_notifications PRIMARY KEY (id),
  CONSTRAINT uq_talent_notifications_talent_id_event_key UNIQUE (talent_id, event_key),                   -- [KT]
  CONSTRAINT fk_talent_notifications_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_talent_notifications_target_path CHECK (target_path IS NULL OR target_path ~ '^/[^/\\]') -- [KT] IR-07: không cho '//' (chuyển ra trang ngoài)
);
CREATE INDEX idx_talent_notifications_talent_id_created_at ON talent_notifications (talent_id, created_at DESC);
CREATE INDEX idx_talent_notifications_unread ON talent_notifications (talent_id) WHERE read_at IS NULL;   -- số chưa đọc

CREATE TABLE manager_notifications (
  id                     uuid        NOT NULL DEFAULT gen_random_uuid(),
  kind                   text        NOT NULL,          -- 8 loại [YK2] §6-12 7-4; không CHECK (U-11)
  talent_id              uuid,
  talent_application_id  uuid,
  post_id                uuid,
  coach_message_id       bigint,
  event_key              text        NOT NULL,          -- [KT]
  handled_at             timestamptz,                   -- R09-02: đã xử lý (U-10)
  handled_by_manager_id  uuid,
  created_at             timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_manager_notifications PRIMARY KEY (id),
  CONSTRAINT uq_manager_notifications_event_key UNIQUE (event_key),                                       -- [KT]
  CONSTRAINT fk_manager_notifications_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT fk_manager_notifications_talent_application_id FOREIGN KEY (talent_application_id) REFERENCES talent_applications (id) ON DELETE RESTRICT,
  CONSTRAINT fk_manager_notifications_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE RESTRICT,
  CONSTRAINT fk_manager_notifications_coach_message_id FOREIGN KEY (coach_message_id) REFERENCES coach_messages (id) ON DELETE RESTRICT,
  CONSTRAINT fk_manager_notifications_handled_by_manager_id FOREIGN KEY (handled_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_manager_notifications_subject CHECK (talent_id IS NOT NULL OR talent_application_id IS NOT NULL), -- [KT] luôn mở được màn liên quan (R09-02)
  CONSTRAINT chk_manager_notifications_handled CHECK ((handled_at IS NULL) = (handled_by_manager_id IS NULL))   -- [KT]
);
CREATE INDEX idx_manager_notifications_kind_created_at ON manager_notifications (kind, created_at DESC);   -- R09-02: lọc theo loại
CREATE INDEX idx_manager_notifications_unhandled ON manager_notifications (created_at DESC) WHERE handled_at IS NULL; -- R09-02: chưa xử lý
CREATE INDEX idx_manager_notifications_talent_id ON manager_notifications (talent_id);
CREATE INDEX idx_manager_notifications_talent_application_id ON manager_notifications (talent_application_id);
CREATE INDEX idx_manager_notifications_post_id ON manager_notifications (post_id);
CREATE INDEX idx_manager_notifications_coach_message_id ON manager_notifications (coach_message_id);

CREATE TABLE push_subscriptions (
  id              uuid        NOT NULL DEFAULT gen_random_uuid(),
  talent_id       uuid        NOT NULL,
  endpoint        text        NOT NULL,       -- địa chỉ của máy chủ đẩy
  p256dh_key      text        NOT NULL,       -- khóa mã hóa nội dung (Web Push)
  auth_secret     text        NOT NULL,       -- khóa bí mật của đăng ký (Web Push)
  is_active       boolean     NOT NULL DEFAULT true,
  last_success_at timestamptz,
  deactivated_at  timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_push_subscriptions PRIMARY KEY (id),
  CONSTRAINT uq_push_subscriptions_endpoint UNIQUE (endpoint),                                    -- [KT] một máy một dòng
  CONSTRAINT fk_push_subscriptions_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_push_subscriptions_endpoint CHECK (endpoint LIKE 'https://%'),                  -- [KT]
  CONSTRAINT chk_push_subscriptions_deactivated CHECK (is_active = (deactivated_at IS NULL))      -- [KT]
);
CREATE INDEX idx_push_subscriptions_talent_id ON push_subscriptions (talent_id) WHERE is_active;

-- =========================================================
-- EP10. Cài đặt và nhật ký
-- =========================================================
CREATE TABLE system_settings (
  id                           smallint    NOT NULL DEFAULT 1,
  morning_message_time         time        NOT NULL DEFAULT '08:00',  -- R10-02, giờ Nhật
  media_reminder_hours_before  smallint    NOT NULL DEFAULT 2,        -- R10-02
  coach_inactivity_days        smallint    NOT NULL DEFAULT 3,        -- R03-05
  manager_inactivity_days      smallint    NOT NULL DEFAULT 7,        -- R03-05
  weekly_review_weekday        smallint    NOT NULL DEFAULT 1,        -- R03-06; ISO: 1 = thứ Hai … 7 = Chủ nhật
  is_auto_posting_paused       boolean     NOT NULL DEFAULT false,    -- R06-12: dừng đăng tự động toàn bộ
  updated_by_manager_id        uuid,
  updated_at                   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_system_settings PRIMARY KEY (id),
  CONSTRAINT fk_system_settings_updated_by_manager_id FOREIGN KEY (updated_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_system_settings_single_row CHECK (id = 1),                                            -- [KT] D-15
  CONSTRAINT chk_system_settings_reminder CHECK (media_reminder_hours_before > 0),                    -- [KT]
  CONSTRAINT chk_system_settings_inactivity CHECK (coach_inactivity_days > 0 AND manager_inactivity_days > 0), -- [KT]
  CONSTRAINT chk_system_settings_weekday CHECK (weekly_review_weekday BETWEEN 1 AND 7)                -- [KT]
);
-- Dữ liệu khởi tạo: INSERT INTO system_settings DEFAULT VALUES;  (một dòng duy nhất)

CREATE TABLE ng_words (
  id                     uuid        NOT NULL DEFAULT gen_random_uuid(),
  word                   text        NOT NULL,
  created_by_manager_id  uuid,                       -- NULL khi nạp từ mẫu ban đầu ([YK2] §7-4)
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_ng_words PRIMARY KEY (id),
  CONSTRAINT fk_ng_words_created_by_manager_id FOREIGN KEY (created_by_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT chk_ng_words_word CHECK (btrim(word) <> '')                                  -- [KT]
);
CREATE UNIQUE INDEX uq_ng_words_word ON ng_words (lower(btrim(word)));                     -- [NV] BR-15

CREATE TABLE manager_view_logs (
  id          bigint      GENERATED ALWAYS AS IDENTITY,
  manager_id  uuid        NOT NULL,
  talent_id   uuid        NOT NULL,
  screen      text        NOT NULL,         -- 'talent_info' | 'conversation' | 'metrics'
  viewed_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_manager_view_logs PRIMARY KEY (id),
  CONSTRAINT fk_manager_view_logs_manager_id FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT fk_manager_view_logs_talent_id FOREIGN KEY (talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_manager_view_logs_screen CHECK (screen IN ('talent_info', 'conversation', 'metrics')) -- [NV] R01-14
);
CREATE INDEX idx_manager_view_logs_talent_id_viewed_at ON manager_view_logs (talent_id, viewed_at DESC); -- R01-14: lọc theo tài năng và thời gian
CREATE INDEX idx_manager_view_logs_viewed_at ON manager_view_logs (viewed_at DESC);                      -- R01-14: lọc theo thời gian
CREATE INDEX idx_manager_view_logs_manager_id ON manager_view_logs (manager_id);
CREATE TRIGGER trg_manager_view_logs_append_only                                                          -- [NV] BR-14
  BEFORE UPDATE OR DELETE ON manager_view_logs FOR EACH ROW EXECUTE FUNCTION reject_change();

CREATE TABLE activity_logs (
  id                bigint      GENERATED ALWAYS AS IDENTITY,
  actor_type        text        NOT NULL,          -- 'manager' | 'talent' | 'system'
  actor_manager_id  uuid,
  actor_talent_id   uuid,
  action            text        NOT NULL,          -- ví dụ 'post.approve', 'talent.status_change', 'metrics.import'
  target_type       text,
  target_id         text,                          -- D-11: tham chiếu mềm
  result            text,                          -- 'succeeded' | 'failed'; NULL với thao tác không có kết quả riêng
  details           jsonb,                         -- giá trị trước, sau; mã lỗi. KHÔNG chứa mật khẩu, token, khóa;
                                                   -- chỉ ghi các khóa có trong danh sách cho phép của đặc tả (IR-21)
  occurred_at       timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pk_activity_logs PRIMARY KEY (id),
  CONSTRAINT fk_activity_logs_actor_manager_id FOREIGN KEY (actor_manager_id) REFERENCES managers (id) ON DELETE RESTRICT,
  CONSTRAINT fk_activity_logs_actor_talent_id FOREIGN KEY (actor_talent_id) REFERENCES talents (id) ON DELETE RESTRICT,
  CONSTRAINT chk_activity_logs_actor_type CHECK (actor_type IN ('manager', 'talent', 'system')),       -- [NV] R10-04
  CONSTRAINT chk_activity_logs_actor CHECK (
    (actor_type = 'manager' AND actor_manager_id IS NOT NULL AND actor_talent_id IS NULL)
    OR (actor_type = 'talent' AND actor_talent_id IS NOT NULL AND actor_manager_id IS NULL)
    OR (actor_type = 'system' AND actor_manager_id IS NULL AND actor_talent_id IS NULL)),              -- [KT]
  CONSTRAINT chk_activity_logs_result CHECK (result IN ('succeeded', 'failed'))                        -- [KT]
);
CREATE INDEX idx_activity_logs_occurred_at ON activity_logs (occurred_at DESC);
CREATE INDEX idx_activity_logs_target ON activity_logs (target_type, target_id, occurred_at DESC);   -- lịch sử của một đối tượng
CREATE INDEX idx_activity_logs_actor_manager_id ON activity_logs (actor_manager_id) WHERE actor_manager_id IS NOT NULL;
CREATE INDEX idx_activity_logs_actor_talent_id ON activity_logs (actor_talent_id) WHERE actor_talent_id IS NOT NULL;
CREATE TRIGGER trg_activity_logs_append_only                                                          -- [KT] nhật ký chỉ thêm
  BEFORE UPDATE OR DELETE ON activity_logs FOR EACH ROW EXECUTE FUNCTION reject_change();

-- =========================================================
-- Trigger cập nhật updated_at
-- =========================================================
-- Với mỗi bảng có cột updated_at:
--   CREATE TRIGGER trg_<bảng>_updated_at BEFORE UPDATE ON <bảng> FOR EACH ROW EXECUTE FUNCTION set_updated_at();
-- Áp cho: managers, talent_applications, talents, billing_accounts, social_accounts, follower_goals,
--         media_assets, video_generations, posts, post_deliveries, push_subscriptions, system_settings, ng_words.

-- =========================================================
-- Quyền truy cập (R10-08): FE không đọc DB
-- =========================================================
-- Với MỌI bảng ở trên (bảng tạo sau migration 20261117000200 tự bật RLS và không có quyền mặc định):
--   ALTER TABLE <bảng> ENABLE ROW LEVEL SECURITY;
--   REVOKE ALL ON TABLE <bảng> FROM PUBLIC, anon, authenticated;
--   (bảng có cột IDENTITY: REVOKE ALL ON SEQUENCE <bảng>_id_seq FROM PUBLIC, anon, authenticated;)
-- Không tạo policy cho anon, authenticated. BE kết nối bằng role có quyền, không đi qua Data API.
```

## 3. Bảng tổng hợp

| Bảng | Khóa chính | Khóa ngoại tới | UNIQUE | CHECK nghiệp vụ | Ước lượng số dòng |
|---|---|---|---|---|---|
| `managers` | uuid | auth.users (trigger, không khóa ngoại), managers | auth_user_id | — | ~5 |
| `talent_applications` | uuid | managers | email | status | ≈ số người gửi đơn |
| `talents` | uuid | auth.users (trigger, không khóa ngoại), talent_applications, managers | auth_user_id, application_id, onedrive_folder_id, posting_service_profile_ref | account_type, status, nguồn gốc, ngày sinh, công ty không duyệt | 30 → 1.000 ([YK2] §9-2) |
| `billing_accounts` | uuid | talents | talent_id, provider_member_ref | — | ≤ số tài năng |
| `social_accounts` | uuid | talents | — (P-01) | platform, status | ≈ 3 × tài năng |
| `follower_goals` | uuid | talents, managers | (talent_id, platform) | platform | 3 × tài năng |
| `coach_messages` | bigint | talents | — | sender | Lớn: hàng chục mỗi tài năng mỗi ngày |
| `ai_usage_events` | bigint | talents | — | — | Lớn: mỗi lần gọi AI một dòng |
| `theme_suggestions` | uuid | talents | (talent_id, suggested_on, position) | position 1–3 | 3 × tài năng × ngày |
| `posts` | uuid | talents, theme_suggestions, posts, managers | — | status, cancel_reason | Vài bản nháp mỗi tài năng mỗi ngày |
| `post_media` | (post_id, media_asset_id) | posts, media_assets | (post_id, position) | — | ≈ số bài × số tư liệu |
| `post_approval_decisions` | uuid | posts, managers | — | decision, lý do khi trả lại | Ít (chỉ bài cần duyệt) |
| `post_deliveries` | uuid | posts, social_accounts | (post_id, platform) | platform, provider_state | ≤ 3 × số bài đã chấp nhận |
| `media_assets` | uuid | talents, managers | onedrive_item_id | kind, source, AI chỉ tạo video | Vài mỗi tài năng mỗi ngày |
| `video_generations` | uuid | talents, managers, media_assets | idempotency_key, result_media_asset_id | video_type | Theo số lần tạo video |
| `video_generation_inputs` | (video_generation_id, media_asset_id) | video_generations, media_assets | (video_generation_id, position) | — | Theo số ảnh nguồn |
| `follower_snapshots` | bigint | social_accounts | (social_account_id, captured_on) | — | 3 × tài năng × ngày |
| `post_metric_snapshots` | bigint | post_deliveries | (post_delivery_id, captured_on) | — | Theo số bài × số ngày theo dõi (U-09) |
| `talent_notifications` | uuid | talents | (talent_id, event_key) | — | Vài mỗi tài năng mỗi ngày |
| `manager_notifications` | uuid | talents, talent_applications, posts, coach_messages, managers | event_key | — | Theo sự kiện |
| `push_subscriptions` | uuid | talents | endpoint | — | ≈ 1–2 × tài năng |
| `system_settings` | smallint (= 1) | managers | — | — | 1 |
| `ng_words` | uuid | managers | lower(word) | — | Vài trăm |
| `manager_view_logs` | bigint | managers, talents | — | screen; chỉ thêm | Theo số lần quản lý xem |
| `activity_logs` | bigint | managers, talents | — | actor_type; chỉ thêm | Lớn |

## 4. Đề xuất chưa đưa vào schema chính thức (PROPOSED)

| Mã | Đề xuất | Lý do chưa đưa vào | Khi nào đưa vào |
|---|---|---|---|
| P-01 | UNIQUE (`talent_id`, `platform`) trên tài khoản đang kết nối | U-05: mỗi mạng một tài khoản còn PENDING (※10, [QA] No.23) | [QA] No.23 đóng theo "một tài khoản" |
| P-02 | CHECK độ dài tin nhắn của tài năng ≤ 1.000 ký tự | Con số §6 là giả định (R03-02) | Khi chốt trên màn hình |
| P-03 | Cột đơn giá lúc yêu cầu ở `video_generations` | U-02 | [QA] No.2, No.62 đóng |
| P-04 | Giới hạn định dạng, dung lượng tư liệu; số tư liệu mỗi bài; số ảnh mỗi loại video | UNKNOWN (R05-04) | Khi chốt S05-01, S05-07 |
| P-05 | Giá trị `skipped` cho `post_deliveries.provider_state` | U-06 | Khi chốt bảng trạng thái theo mạng ([QA] No.51) |
| P-06 | Lý do hủy `returned`, trạng thái "giữ lại khi đang dừng" | U-03, U-04 ([QA] No.51, No.58, No.60) | Khi các câu này đóng |
| P-07 | Chỉ mục trigram trên `talents.display_name` cho tìm theo tên | R02-05 cần tìm theo tên; với ≤ 1.000 dòng, quét tuần tự vẫn nhanh | Khi số tài năng vượt vài nghìn |
| P-08 | Khóa ngoại kép để DB tự đảm bảo tài khoản mạng xã hội, tư liệu cùng tài năng với bài | Thêm cột trùng `talent_id` vào bảng con | Nếu kiểm ở tầng dịch vụ để lọt lỗi (07, M-02) |
| P-09 | Chia bảng theo tháng (partition) cho `coach_messages`, `ai_usage_events`, `activity_logs`, `post_metric_snapshots` | Tải thực tế chưa rõ; thời gian giữ dữ liệu chưa chốt (U-09) | Khi có số liệu tải và chính sách giữ dữ liệu |
| P-11 | `approval_round` ở `posts` và `post_approval_decisions`, UNIQUE (`post_id`, `approval_round`) | IR-11: chỉ cần nếu [QA] No.58 chốt "gửi duyệt lại là cùng bài" | Khi [QA] No.58 đóng theo hướng đó |
| P-10 | Mã hóa ở tầng ứng dụng cho `push_subscriptions.p256dh_key`, `auth_secret` | [YK2] §10-2 yêu cầu mã hóa dữ liệu lưu; Supabase đã mã hóa ổ đĩa. Mã hóa thêm ở ứng dụng là lựa chọn | Khi đánh giá bảo mật yêu cầu |
