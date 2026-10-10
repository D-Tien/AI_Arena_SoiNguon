---
type: project
created: 2026-05-25
updated: 2026-07-12
---

# Project Conventions

## Git Workflow
- Always create a new dedicated branch for major code changes.
- Branch name format should follow: `feature/[task-slug]` or `fix/[bug-slug]`.

## Supported AI platforms (AG Kit)
- AG Kit **only supports Gemini CLI and Google Antigravity**.
- Do not claim compatibility with Claude Code, Cursor, Copilot, Windsurf, or other assistants unless the user explicitly expands scope.
- Copy on the website, docs, FAQ, README, and marketing should describe AG Kit as a toolkit for Gemini CLI / Antigravity-style agent setups.

## Sợi Nguồn Asset Naming Convention
- **Cấu trúc thư mục:** `[loại áo]/[giới tính]/[màu sắc]/`
  - Loại áo: `tu_than`, `ngu_than`, `ba_ba`
  - Giới tính: `male`, `female`
  - Màu sắc:
    + Đối với `tu_than`: `1`, `2`, `default`
    + Đối với `ngu_than`, `ba_ba`: Tên màu (vd: `blue`, `green`) và `default`
    + (Trong các thư mục này chứa ảnh base và ảnh có phụ kiện)
- **Cú pháp tên file:**
  - Áo + chân đất: `[tên áo]_[giới tính]` (vd: `ao_tu_than_female`)
  - Áo + giày: `[tên áo]_[loại giày]` (giày: `s`=sneaker, `gd`=giày da, `gm`=guốc mộc)
  - Áo + phụ kiện đội đầu: `[tên phụ kiện]` (vd: `non_la`)
  - Áo + phụ kiện đội đầu + giày: `[tên phụ kiện]_[loại giày]` (vd: `non_la_s`)
  - Áo + khăn: `[tên khăn]` (vd: `khan`, `non_quai_thao`)
  - Áo + khăn + giày: `[tên khăn]_[loại giày]`
  - Áo + nón lá + khăn: `non_la_khan`
  - Áo + nón lá + khăn + giày: `non_la_khan_[loại giày]`
