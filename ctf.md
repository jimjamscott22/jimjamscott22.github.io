---
layout: default
title: CTF Write-ups
permalink: /ctf/
description: "Capture the Flag write-ups and solutions across web, pwn, crypto, forensics, and reversing challenges."
---

# CTF Write-ups

{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

Solutions and walk-throughs from Capture the Flag challenges. Filter by category or difficulty, or search by title, event, or tag.

<div class="wiki-controls">
  <div class="search-container">
    <input type="text" id="ctf-search" class="search-input" placeholder="Search by title, event, or tag...">
  </div>

  <div class="wiki-filters">
    <div class="filter-group">
      <label>Category:</label>
      <button class="ctf-cat-btn active" data-category="all">All</button>
      <button class="ctf-cat-btn" data-category="web">Web</button>
      <button class="ctf-cat-btn" data-category="pwn">Pwn</button>
      <button class="ctf-cat-btn" data-category="crypto">Crypto</button>
      <button class="ctf-cat-btn" data-category="forensics">Forensics</button>
      <button class="ctf-cat-btn" data-category="reversing">Reversing</button>
      <button class="ctf-cat-btn" data-category="misc">Misc</button>
    </div>
    <div class="filter-group">
      <label>Difficulty:</label>
      <button class="ctf-diff-btn active" data-difficulty="all">All</button>
      <button class="ctf-diff-btn" data-difficulty="easy">Easy</button>
      <button class="ctf-diff-btn" data-difficulty="medium">Medium</button>
      <button class="ctf-diff-btn" data-difficulty="hard">Hard</button>
    </div>
  </div>

  <div id="ctf-count" class="search-count"></div>
</div>

<div class="card-grid" id="ctf-grid">
  {% assign writeups = site.ctf | sort: "date" | reverse %}
  {% for w in writeups %}
    <div class="card ctf-card"
         data-category="{{ w.category | default: 'misc' | downcase }}"
         data-difficulty="{{ w.difficulty | default: 'unknown' | downcase }}"
         data-title="{{ w.title | downcase }}"
         data-event="{{ w.event | downcase }}"
         data-tags="{{ w.tags | join: ',' | downcase }}">
      <div class="card-header">
        <h2><a href="{{ w.url | relative_url }}">{{ w.title }}</a></h2>
        {% if w.difficulty %}<span class="badge ctf-diff ctf-diff-{{ w.difficulty | downcase }}">{{ w.difficulty }}</span>{% endif %}
      </div>
      <div class="card-meta">
        {% if w.category %}<span class="badge ctf-cat">{{ w.category }}</span>{% endif %}
        {% if w.event %}<span class="badge tag">{{ w.event }}</span>{% endif %}
        {% if w.points %}<span class="badge tag">{{ w.points }} pts</span>{% endif %}
        {% if w.date %}<span class="badge tag">{{ w.date | date: "%Y-%m-%d" }}</span>{% endif %}
      </div>
      {% if w.description %}
        <p class="card-excerpt">{{ w.description | strip_html | truncate: 150 }}</p>
      {% elsif w.excerpt %}
        <p class="card-excerpt">{{ w.excerpt | strip_html | truncate: 150 }}</p>
      {% endif %}
      {% if w.tags %}
        <div class="card-meta">
          {% for tag in w.tags %}<span class="badge tag">{{ tag }}</span>{% endfor %}
        </div>
      {% endif %}
      <a class="card-link" href="{{ w.url | relative_url }}">read write-up →</a>
    </div>
  {% endfor %}
</div>

<script src="{{ "/assets/js/ctf.js" | relative_url }}?v={{ cache_bust }}"></script>
