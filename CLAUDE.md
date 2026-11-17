# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

Code lives in `apps/` (FE and BE fully separate, decided 2026-11-17). It is a **base skeleton** (optimized 2026-11-17; demo features removed, no archive kept). **Read `agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md` before adding code**: stack, versions, folder layout, patterns, how to add a module or screen. `apps/web/` = Next.js 16 talent PWA, frontend only (no API routes): PWA platform (manifest, service worker, install guide, push subscribe, update banner, offline), `lib/api/client.ts` is the only BE caller, all UI text in `lib/messages.ts` (Japanese). `apps/api/` = Hono + TypeScript BE, modular monolith: `config/`, `core/errors.ts`, `infra/` (database via Prisma 7 on Supabase Postgres, Web Push adapter), `modules/<feature>/`, `http/app.ts`, composition root `container.ts`; only endpoint is `GET /health`; Prisma schema has the 25 models of `database-design/04` (introspected), applied to Supabase dev 2026-11-17 (3 migrations). `prisma migrate dev` works directly on Supabase dev; CHECKs, triggers and expression indexes live only in migration SQL; new tables in `public` get RLS and no anon/authenticated grants automatically; no FKs to `auth.users` (a trigger on `auth.users` blocks deleting referenced users). See `apps/api/PRISMA.md`. Runs under PM2; root `docker-compose.yml` = migrate + api + web (+ optional local db), no Caddy. Commands: in `apps/web/` `npm run dev:https`, `npm run build`, `npm run lint`, `npm test`; in `apps/api/` `npm run dev`, `npm test` (one file: `node --test src/http/app.test.ts`), `npm run typecheck`, `npm run build`, `npm run db:check|db:status|db:migrate`. Next.js 16 differs from older versions: read `apps/web/node_modules/next/dist/docs/` before writing FE code.

Everything else is Japanese specification documents for **AI育成OS** (AI talent-development OS), built by FutureCore Partners for the client アデッソ様 (a talent agency). Git repo on `main`.

| File | What it is |
|---|---|
| `AI育成OS_概要要件定義書_v2.docx` | Outline requirements definition, v2 (cover still says 0.1版 2026-11-13). **Primary source of truth.** 確認 renumbered 1–56; each UC now has a 前提 (premises) block. |
| `AI育成OS_概要要件定義書.docx` | v1 of the same doc (確認1–37). Superseded; v1→v2 diff and 確認 number mapping are in `Phan_tich/12_Cap_nhat_theo_v2.md`. |
| `AI-Talent-OS_Q&A表.xlsx` | AMCOLAB's Q&A sheet with the client (sheets Q&A, デザインFB, お知らせ・メール文章, 追加要件; has its own SCD-tracking columns). Updated version read 2026-11-17: Q&A sheet No.1–68 (33 Close, 34 Open; No.49, 51–68 are new, unanswered and overlap our S/B questions), 保留 No.50 (client to prioritize out-of-estimate features), 追加要件 CR-01〜CR-25. Answers dated 11/13 record the client's choices from its 確認シート (118-row confirmation sheet, not in repo); 11/15 entries are AMCOLAB's own decisions following v2. Net result: v2 is followed (self sign-up, 3 themes, OneDrive media, return-with-reason, settings screen…), paid for by cuts CR-11〜16; CR-17〜25 (categories M-10, AI-instruction screen M-11, category approvers, multi-account SNS, direct text edit, challenge/game UI, self-made video daily, private chats, screen-definition doc) must not be built until the client decides. Mapping in `Phan_tich/19_Doi_chieu_QA_bao_gia.md` and CSV column "Q&A AMCOLAB". No.45 quotes the 御見積書 (estimate) premise A4 "マネージャーはChatGPT(MCP)経由でAIを調整", so MCP has a contractual basis (estimate outranks [YK2]). |
| `agent_spec/` | Technical implementation specs for agents: `pwa-platform-spec/` (PWA platform only: manifest, install, service worker, Web Push; the older PWA bundle mixes business features already in SCD and is reference only), PWA, OneDrive, Upload-Post, Supabase DB+Auth (v1.3: Manager MFA = Authenticator TOTP only for now, SMS spec kept pending client discussion (S01-11), no email OTP, 5-failure lockout enforced in the BE because the Password Verification Hook needs the Team plan; DB schema parts deliberately not reviewed, schema to be designed later) (v1.1, aligned to v2/[AG]/SCD on 2026-11-17; review in `agent_spec/KET_QUA_KIEM_CHUNG_17-11.md`). Media upload is unified: browser → Supabase Storage (TUS) → worker → OneDrive. |
| `Phan_tich/` | Our Vietnamese analysis (00 report, 01–11 by topic, all written against v2; 12 = v1→v2 changes and 確認 renumbering; 13 = post time reached but draft not adopted; 14 = analysis of `アプリ画面案`; 20 = technical risk register RT01–RT12 with POC plan (supersedes the T1–T9 table in 11 §3.2); 19 = Q&A sheet decisions, CR list and overlap with our questions; 18 = infrastructure design (what runs on Vercel / Supabase / VPS worker, environments, scheduled jobs, open questions I1–I8; mostly proposals, marked [Chốt]/[Cũ]/[Đề xuất]); 17 = system context document (SCD: actors, external services, boundaries, constraints; read first before any dev work); 16 = development modules EP01–EP10 (54 functions regrouped, with [AG] screens and build order); `15_Cau_hoi_lam_ro_luong.csv` = master question list: all 確認1–56 plus our new questions A/B/C, column "Loại" tells them apart, column "Module" maps each row to EP01–EP10 of file 16). 00–12 are exported from the Claude Doc tabs, which are the source. Docs cite v2 as `[YK2]`, the screen proposal as `[AG]` |
| `SCD/` | Per-feature specs for AI-agent coding: one file per function, folders EP01–EP10. `SCD/README.md` has the readiness criteria (R1–R9, 🟢/🟡/🔴), the spec template and the readiness matrix. All 60 files (EP01–EP10) are fully written; each module folder also has `00_Cau_hoi_cho_khach.md` (client questions with Japanese drafts). `SCD/gen_ban_khung.py` regenerates skeletons but never overwrites hand-written files. Only hand an agent a 🟢/🟡 file. EP06's question file has the Upload-Post verification checklist; C-01 has the post state machine from [YK2] fig. 5-1. |
| `アプリ画面案_AI育成OS.pdf` | **Latest screen proposal** (FutureCore, 2026-11-12, 12 pp): T-01〜T-15 talent, M-01〜M-19 admin. Client design style, content fixed to match v2. Red 【要確認】/red frames = pending a 確認 |
| `画面遷移図と画面案_AI育成OS.pdf` | Older screen transition diagram (2026-11-11, 8 pp, T-01〜T-12, M-01〜M-10, based on a pre-v2 spec). Likely superseded by `アプリ画面案` |
| `要件説明資料_AI育成OS.pdf` | Older requirements explainer deck (42 pp) |
| `Design style/★…タレントアプリ画面_かわいい版.pdf` | Talent app visual design: L-00〜L-09, mascot AI coach "モモ", Instagram-like, My Page as hub |
| `Design style/★…マネージャー管理画面_PC_携帯….pdf` | Manager admin design: M-01〜M-11, PC (left menu) + mobile (bottom menu) |

Reading the docs: `.docx` text can be extracted with `python3` `zipfile` + regex on `word/document.xml`; PDFs via `pdftotext -enc UTF-8` (both available in this WSL environment; on Windows set `PYTHONIOENCODING=utf-8` and use Git Bash).

**Screen IDs collide across docs:** the same code means different screens in the client designs (L-xx, M-01〜M-11), `画面遷移図` and `アプリ画面案` (e.g. M-10 = category mgmt / view log / talent settings). Always name the source when citing a screen ID. The mapping table is in `Phan_tich/10_Giao_dien.md` §8.1. Which set becomes official is still open.

**Conflicts between docs:** the docx says newer documents win, and contract > SOW > estimate. The older deck describes the talent UI as LINE (Messaging API/LIFF) with n8n. That was dropped in the 2026-10-20 meeting in favor of a **PWA** (docx 別紙B, 正式要件整理表 No.17).

## Rules for writing documents (analysis, reports, docs for the user)

- Write in **pure Vietnamese**. Do not mix in English where a Vietnamese word exists (e.g. "Trong phạm vi", not "In Scope").
- Every Japanese term gets a Vietnamese note right beside it: `確認 (mục cần xác nhận)`, `高 (cao)`, `別紙B (phụ lục B)`. In a long table, notes may sit in a legend above the table instead of in every cell.
- Proper nouns and product names stay as they are (Instagram, OneDrive, Upload-Post). Common acronyms get a Vietnamese note on first use, e.g. "PWA (ứng dụng web cài lên màn hình chính)".
- Cite the source of every claim: document, section (§), function ID, 確認 number, and PDF page. The .docx has no fixed line numbers, so cite sections instead.
- In `SCD/EPxx/00_Cau_hoi_cho_khach.md`, do not propose answers or Japanese drafts for 確認 items (they are already in the client's sheet); only reference their numbers. Every proposal must stay within the 54 functions of [YK2] ch.6 or general requirements already in [YK2]. Work handoff and conventions: `TIEP_TUC.md`.
- Do not assume anything the client has not confirmed. Items that rest only on a 確認 go under "chưa rõ" (unclear), not into the in-scope or out-of-scope lists.

## What the system does

Talents (start ~30, +10/month, ~100 soon; target 200–300, later 1,000; includes approved non-affiliated applicants) post daily to Instagram, TikTok, and YouTube (same media + caption to all three) with help from a per-talent **AIコーチ**. The goal is 10k followers per platform (default, editable per talent). Managers (~5) approve sign-ups and set talents up once. After that, the AI does the daily work and managers only handle notifications.

Daily loop: 8:00 AI coach reviews yesterday and proposes 3 theme candidates → talent picks one → AI writes caption, hashtags, shot list (plus a script for video) → talent uploads photo/video → talent adopts the draft (optionally requesting manager approval) → scheduled post to all 3 SNS → metrics are pulled back in for the next day.

Two front ends:
- **Talent app**: smartphone PWA (iOS push needs 16.4+). Talents see only their own data and never log in to the admin.
- **Admin (管理画面)**: PC browser first but must also be readable on a phone browser, 2FA login. Every manager sees every talent, including all coach conversations, and gets every notification.

## Planned stack / external services (assumed, not finalized)

- Hosting: Vercel + Supabase (paid plans) + Xserver VPS. The older deck names Next.js.
- AI: OpenAI API, with training on submitted data disabled.
- Posting + metrics: Upload-Post API (per-talent registration and SNS-connect URLs; monthly price scales with registered talents, not post count; registration timing after self sign-up is unclear in v2 §8-2).
- Video generation: Kling via fal.ai.
- Payments: GMO Payment Gateway (carrier + card). Monthly bill = subscription + per-video-generation charges. Card data is never stored.
- Storage: Microsoft 365 / OneDrive, one folder per talent (profile, know-how, metrics, media), created when the talent registers payment (office accounts: when created). Managers then create a ChatGPT project per talent linked to that folder, enter talent info by chatting, and the AI coach reads it every morning. No drafts until that info exists.
- Push notification mechanism: TBD.
- Must not affect the client's running Instagram-DM automation app. Reuse the existing アデッソ app's name/logo only, not its systems.

## Business rules that shape the design

- Posts have 6 states, and success/failure is tracked **per SNS**. Talent status, video, SNS connection, and billing also get state machines (details in docx §5-1, to be finalized).
- Manager-configurable defaults: morning message 8:00; reminder 2h before post time; nudge after 3 days without a post; manager alert after 7; weekly review on Monday. Post time is chosen per talent by the AI from metrics, falling back to agency algorithm instructions.
- Approval is a per-talent setting. The talent decides whether to request it (the AI does not classify job posts). Proposed in v2: first manager to act decides; rejection has a reason and the talent can resubmit; unapproved by post time → reservation cancelled.
- NG-word list (one, global): a hit blocks the post and notifies managers. The check is AI, context-aware.
- Sign-up (v2): talent applies in the PWA (name, email, birth date, ToS consent) → manager approves/rejects → email with temp password (or fixed rejection mail). Minor status is derived from birth date. Password reset is self-service.
- No free tier: every app applicant pays and must register payment before using the coach. Office accounts (事務所アカウント) are a separate type created by managers, never billed; their video-generation counts are shown in admin and settled internally.
- Drafts: as many as the talent asks for. Post time is set by the system. Goals have a deadline plus small チャレンジ (challenges).
- Setting status to 退会 (withdrawn) cancels scheduled posts and stops billing.
- Anti-ban measures (what to limit is TBD per SNS terms; the fixed 1 photo + 1 video/day cap was dropped), a global and a per-talent "stop auto-posting" switch (stopping also cancels already-scheduled posts), scheduled-post cancellation from the admin, and audit logs (manager views, operations, processing results).
- External-service outage → disable only that feature and notify on failed posts.
- Coach stays on-topic and escalates health/withdrawal consultations to managers.

Use-case IDs UC-01〜UC-13 (docx ch.4) and function sections 6-1〜6-14 are the shared vocabulary with the client. Reference them in code/PRs. Open questions are tagged 確認N and tracked in the client's Google Sheet.

## Schedule

Target go-live end of February 2027; UAT from mid-January 2027; acceptance around weeks 2–3 of February 2027. Regular meetings through end of 2026: Tue (after 16:00) and Fri (11:00–15:00). Communication goes through a new Chatwork chat, docs are shared in Google Docs, and files go through a Google Drive folder.
