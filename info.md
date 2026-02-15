---
layout: default
title: Info
permalink: /info/
---

# Info

{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

Reference material and breakdowns on different subjects. Quick-access knowledge sheets for networking, programming, and more.

<div class="wiki-controls">
  <div class="search-container">
    <input type="text" id="info-search" class="search-input" placeholder="Search info pages...">
  </div>

  <div class="wiki-filters">
    <div class="filter-group">
      <label>Category:</label>
      <button class="info-filter-btn active" data-category="all">All</button>
      <button class="info-filter-btn" data-category="networking">Networking</button>
      <button class="info-filter-btn" data-category="programming">Programming</button>
    </div>
  </div>

  <div id="info-count" class="search-count"></div>
</div>

<div class="wiki-grid" id="info-grid">
  {% for entry in site.info %}
    <div class="info-card card"
         data-category="{{ entry.category | default: 'uncategorized' }}"
         data-title="{{ entry.title | downcase }}"
         data-tags="{{ entry.tags | join: ',' | downcase }}">
      <div class="card-header">
        <h3><a href="{{ entry.url | relative_url }}">{{ entry.title }}</a></h3>
        <div class="wiki-meta">
          {% if entry.category %}
            <span class="badge tag">{{ entry.category }}</span>
          {% endif %}
        </div>
      </div>
      {% if entry.date %}
        <div class="wiki-date">{{ entry.date | date: "%Y-%m-%d" }}</div>
      {% endif %}
      {% if entry.tags %}
        <div class="wiki-tags">
          {% for tag in entry.tags %}
            <span class="badge tag">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
      {% if entry.excerpt %}
        <p class="wiki-excerpt">{{ entry.excerpt | strip_html | truncate: 150 }}</p>
      {% endif %}
    </div>
  {% endfor %}
</div>

<script src="{{ "/assets/js/info.js" | relative_url }}?v={{ cache_bust }}"></script>
