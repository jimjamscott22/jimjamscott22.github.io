---
layout: default
title: Notes
permalink: /notes/
---

# Notes

{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

Lightweight notes, commands, and runbooks. Swap the placeholder links with real pages or gists later.

## Recent entries

| Date       | Topic                     | Type       | Link                                      |
| ---------- | ------------------------- | ---------- | ----------------------------------------- |
| 2024-11-05 | pfSense rule tuning       | runbook    | [open](/notes/pfsense-rule-tuning/)       |
| 2024-10-18 | Pi-hole blocklist trims   | quick note | [open](/notes/pihole-blocklist-trims/)    |
| 2024-09-27 | Tailscale subnet routing  | how-to     | [open](/notes/tailscale-subnet-routing/)  |
| 2024-08-14 | Prometheus scrape configs | checklist  | [open](/notes/prometheus-scrape-configs/) |

## Scratchpad

  <!-- Mermaid.js for diagrams -->
  flowchart TD
    %% ===== IDEA & INTENT =====
    A[Boot Sequence<br/>💡 Idea Spark] --> B[Intent Definition<br/>What am I building?]
    B --> C[Problem Statement<br/>Real pain, not vibes]

    %% ===== LAB PLANNING =====
    C --> D[Scope the Lab<br/>MVP or it didn't happen]
    D --> E[System Sketch<br/>Boxes & arrows first]
    D --> F[Threat Awareness<br/>Assume misuse exists]

    %% ===== ARCHITECTURE =====
    E --> G[Stack Selection<br/>Tools I actually trust]
    G --> H[Repo + Structure<br/>Order before code]
    H --> I[Local Environment<br/>Reproducible dev setup]

    %% ===== BUILD PHASE =====
    I --> J[Core Functionality<br/>One feature that works]
    J --> K[Break & Test<br/>Inputs fight back]

    K --> L{Lab Stable?}
    L -- No --> J
    L -- Yes --> M[UX Pass<br/>Make it human]

    %% ===== HARDENING =====
    M --> N[Performance Pass<br/>Latency matters]
    N --> O[Security Pass<br/>Validate, sanitize, isolate]

    %% ===== DEPLOYMENT =====
    O --> P[Staging Deploy<br/>Safe proving ground]
    P --> Q[Observability Layer<br/>Logs · Metrics · Signals]

    %% ===== RELEASE =====
    Q --> R[Production Release<br/>Ship calmly]
    R --> S[Feedback Intake<br/>Users are data]

    %% ===== ITERATION LOOP =====
    S --> T[Refinement Cycle<br/>Fix · Improve · Extend]
    T --> D
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

<script src="{{ "/assets/js/notes.js" | relative_url }}?v={{ cache_bust }}"></script>
