---
layout: default
title: Notes
permalink: /notes/
---

# Notes

Lightweight notes, commands, and runbooks. Swap the placeholder links with real pages or gists later.

## Recent entries

| Date       | Topic                       | Type        | Link            |
| ---------- | --------------------------- | ----------- | --------------- |
| 2024-11-05 | pfSense rule tuning         | runbook     | [open](/notes/pfsense-rule-tuning/)       |
| 2024-10-18 | Pi-hole blocklist trims     | quick note  | [open](/notes/pihole-blocklist-trims/)       |
| 2024-09-27 | Tailscale subnet routing    | how-to      | [open](/notes/tailscale-subnet-routing/)       |
| 2024-08-14 | Prometheus scrape configs   | checklist   | [open](/notes/prometheus-scrape-configs/)       |

## Scratchpad

- Command snippets to stage here.
- Paste in diagrams or screenshots using the placeholders on other pages.
- Convert any of these into a dedicated page when they grow.

## Interactive notes

<div class="notes-panel" id="notes-app">
  <form id="note-form" class="note-form" autocomplete="off">
    <div class="note-field">
      <label for="note-title">Title</label>
      <input id="note-title" name="note-title" type="text" maxlength="80" required placeholder="New note title">
    </div>
    <div class="note-field">
      <label for="note-body">Body</label>
      <textarea id="note-body" name="note-body" rows="4" required placeholder="Details, commands, links, or TODOs"></textarea>
    </div>
    <div class="note-actions">
      <button type="submit" class="note-submit">Save note</button>
      <span class="note-hint">Stored locally in your browser. No sync, no server.</span>
    </div>
  </form>

  <div class="notes-list-shell">
    <div class="notes-list-header">
      <div class="notes-list-title">stored notes</div>
      <div id="note-count" class="note-count"></div>
    </div>
    <div id="notes-list" class="notes-list" aria-live="polite"></div>
    <div id="notes-empty" class="notes-empty">No notes yet. Add one above.</div>
  </div>
</div>

<script src="{{ "/assets/js/notes.js" | relative_url }}"></script>