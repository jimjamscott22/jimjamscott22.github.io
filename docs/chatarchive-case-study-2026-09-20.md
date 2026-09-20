# ChatArchive case study — implementation summary

**Date:** 2026-09-20

## Change

Rewrote `_projects/chatarchive.md` as a source-backed case study with a problem, approach, technical decisions, result, and current limits. Kept the existing screenshot and source link. Updated the stack and description to reflect the current PostgreSQL architecture, removed the stale `last_updated` value, and removed empty Decisions and Lessons placeholders. No ChatArchive application files were changed.

## Evidence used

Inspected the local ChatArchive checkout on `main` at commit `13b2855` (2026-09-16). This is a local source snapshot; the remote was not fetched.

- `backend/app/database.py` requires PostgreSQL and validates its connection at startup.
- `backend/app/main.py` has separate import endpoints for ChatGPT, Claude, Gemini, and Copilot, plus full-text search with an `ILIKE` fallback.
- `backend/app/importers/` holds source-specific parsers; `backend/app/models.py` defines shared conversation, message, tag, project, and import-history records.
- `backend/app/auth.py` requires an application bearer token for data routes; `frontend/src/App.tsx` contains the browser, filters, export, and analytics views.

The page makes no personal authorship, user-count, deployment-scale, or speed claims that the source cannot establish.

## Verification

- Production Jekyll build passed.
- HTMLProofer passed with the CI flags: 52 HTML files, 86 internal links, and image, link, and script checks.
- Confirmed the rendered ChatArchive page contains the new sections and no placeholder text or old SQLite/search-planned description.
- `git diff --check` passed.

On this Windows host, HTMLProofer was launched through Ruby with LibreOffice's `libcurl.dll` preloaded; the CI workflow runs it directly on Ubuntu.
