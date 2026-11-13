# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

No source code yet. The repo holds only Japanese specification documents for **AI育成OS** (AI talent-development OS), built by FutureCore Partners for the client アデッソ様 (a talent agency). No build/lint/test commands exist; add them here once a project is scaffolded. Not a git repository yet.

| File | What it is |
|---|---|
| `AI育成OS_概要要件定義書_v2.docx` | Outline requirements definition, v2 (cover still says 0.1版 2026-11-13). **Primary source of truth.** 確認 renumbered 1–56; each UC now has a 前提 (premises) block. |
| `AI育成OS_概要要件定義書.docx` | v1 of the same doc (確認1–37). Superseded; v1→v2 diff and 確認 number mapping are in `Phan_tich/12_Cap_nhat_theo_v2.md`. |
| `AI-Talent-OS_Q&A表.xlsx` | Q&A sheet (not yet analyzed) |
| `Phan_tich/` | Our Vietnamese analysis exports (00 report, 01–11 by topic, all written against v2; 12 = v1→v2 changes and 確認 renumbering). Markdown is exported from the Claude Doc tabs, which are the source |
| `画面遷移図と画面案_AI育成OS.pdf` | Screen transition diagram (T-xx talent screens, manager screens) |
| `要件説明資料_AI育成OS.pdf` | Older requirements explainer deck (42 pp) |
| `Design style/★…タレントアプリ画面_かわいい版.pdf` | Talent app visual design: L-00〜L-09, mascot AI coach "モモ", Instagram-like, My Page as hub |
| `Design style/★…マネージャー管理画面_PC_携帯….pdf` | Manager admin design: M-01〜M-11, PC (left menu) + mobile (bottom menu) |

Reading the docs: `.docx` text can be extracted with Python `zipfile` + regex on `word/document.xml` (set `PYTHONIOENCODING=utf-8` on Windows); PDFs via `pdftotext -enc UTF-8` (available in Git Bash).

**Conflicts between docs:** the docx says newer documents win, and contract > SOW > estimate. The older deck describes the talent UI as LINE (Messaging API/LIFF) with n8n. That was dropped in the 2026-10-20 meeting in favor of a **PWA** (docx 別紙B, 正式要件整理表 No.17).

## Rules for writing documents (analysis, reports, docs for the user)

- Write in **pure Vietnamese**. Do not mix in English where a Vietnamese word exists (e.g. "Trong phạm vi", not "In Scope").
- Every Japanese term gets a Vietnamese note right beside it: `確認 (mục cần xác nhận)`, `高 (cao)`, `別紙B (phụ lục B)`. In a long table, notes may sit in a legend above the table instead of in every cell.
- Proper nouns and product names stay as they are (Instagram, OneDrive, Upload-Post). Common acronyms get a Vietnamese note on first use, e.g. "PWA (ứng dụng web cài lên màn hình chính)".
- Cite the source of every claim: document, section (§), function ID, 確認 number, and PDF page. The .docx has no fixed line numbers, so cite sections instead.
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
