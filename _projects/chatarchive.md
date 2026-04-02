---
layout: default
title: ChatArchive
permalink: /projects/chatarchive/
status: building
health: healthy
last_updated: 2025-12-15
tech_stack: [fastapi, react, sqlite, llm]
milestone_date: 2025-11-01
milestone_text: "Started ChatArchive conversation management app"
---

**Status:** Building  
**Tags:** fastapi, react, sqlite, llm, search

## Overview

ChatArchive is a self-hosted app for importing and organizing conversation exports from ChatGPT (and eventually Claude/others). The goal is a clean UI, local-first storage, and fast search over your history.

## Screenshot

<figure class="content-image content-image--wide">
  <img src="{{ "/img/chatarchive_screenshot.png" | relative_url }}" alt="ChatArchive UI screenshot" loading="lazy" decoding="async">
  <figcaption>ChatArchive conversation browser interface</figcaption>
</figure>

## What it does

- Import ChatGPT `conversations.json`
- Normalize conversations into a local database (SQLite)
- Browse conversations in a simple React UI
- Prep for full-text search, tags, and export

## Tech stack

- **Frontend:** React + TypeScript (Vite)
- **Backend:** FastAPI (Python)
- **Storage:** SQLite (planned: optional Postgres)

## Links

- GitHub: [github.com/jimjamscott22/ChatArchive](https://github.com/jimjamscott22/ChatArchive)

---
[← Back to Projects](/projects/)
