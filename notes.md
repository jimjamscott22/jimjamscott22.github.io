---
layout: default
title: Notes
permalink: /notes/
description: "Technical knowledge base with notes on networking, security, programming, and various IT concepts."
mermaid: true
---

# Knowledge Base

{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

Searchable knowledge base of runbooks, how-tos, and technical notes. For project-specific documentation, see [Projects](/projects/).

<div class="wiki-controls">
  <div class="search-container">
    <input type="text" id="wiki-search" class="search-input" placeholder="Search knowledge base...">
  </div>

  <div class="wiki-filters">
    <div class="filter-group">
      <label>Category:</label>
      <button class="wiki-filter-btn active" data-category="all">All</button>
      <button class="wiki-filter-btn" data-category="networking">Networking</button>
      <button class="wiki-filter-btn" data-category="homelab">Homelab</button>
      <button class="wiki-filter-btn" data-category="development">Development</button>
      <button class="wiki-filter-btn" data-category="security">Security</button>
    </div>
    <div class="filter-group">
      <label>Type:</label>
      <button class="wiki-filter-btn active" data-type="all">All</button>
      <button class="wiki-filter-btn" data-type="runbook">Runbook</button>
      <button class="wiki-filter-btn" data-type="how-to">How-To</button>
      <button class="wiki-filter-btn" data-type="quick-note">Quick Note</button>
      <button class="wiki-filter-btn" data-type="checklist">Checklist</button>
    </div>
  </div>

  <div id="wiki-count" class="search-count"></div>
</div>

<div class="wiki-grid" id="wiki-grid" data-wiki-data-url="{{ '/assets/data/wiki-data.json' | relative_url }}">
  {% for note in site.notes %}
    <div class="wiki-card card"
         data-category="{{ note.category | default: 'uncategorized' }}"
         data-type="{{ note.type }}"
         data-url="{{ note.url | relative_url }}"
         data-title="{{ note.title | downcase }}"
         data-tags="{{ note.tags | join: ',' | downcase }}">
      <div class="card-header">
        <h3><a href="{{ note.url | relative_url }}">{{ note.title }}</a></h3>
        <div class="wiki-meta">
          <span class="badge">{{ note.type }}</span>
          {% if note.category %}
            <span class="badge tag">{{ note.category }}</span>
          {% endif %}
        </div>
      </div>
      {% if note.date %}
        <div class="wiki-date">{{ note.date | date: "%Y-%m-%d" }}</div>
      {% endif %}
      {% if note.tags %}
        <div class="wiki-tags">
          {% for tag in note.tags %}
            <span class="badge tag">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
      {% if note.excerpt %}
        <p class="wiki-excerpt">{{ note.excerpt | strip_html | truncate: 150 }}</p>
      {% endif %}
    </div>
  {% endfor %}
</div>

---

## Scratchpad

Working space for rough thinking, fast sketches, and ideas that haven't earned their own page yet.

### Diagrams

<div class="mermaid">

flowchart TD
    A[💡 Idea Spark] --> B[Scope the Lab]
    B --> C[System Sketch]
    C --> D[Build MVP]
    D --> E[Test & Break]
    E --> F[Harden & Observe]
    F --> B

</div>

Low-friction visual thinking. If it survives iteration, it graduates to a project page.

---

### Commands

- `ip a && ip r` — quick sanity check on network state
- `journalctl -u service --since "10 min ago"` — recent service logs
- `git status && git diff` — reality check before committing

---

### Ideas

- Convert recurring diagrams into reusable templates
- Add a "threat-awareness" branch to app design flows
- Tie Scratchpad diagrams directly to project changelogs

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

<script defer src="{{ "/assets/js/wiki.js" | relative_url }}?v={{ cache_bust }}"></script>
<script defer src="{{ "/assets/js/notes.js" | relative_url }}?v={{ cache_bust }}"></script>
