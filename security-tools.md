---
layout: default
title: Security Tools
permalink: /security-tools/
description: "A curated catalog of the security tools I use and recommend — recon, scanning, exploitation, web, forensics, and more."
---

# Security Tools Catalog

{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

Tools I reach for and recommend. Filter by category or cost, or search by name or tag.

<div class="wiki-controls">
  <div class="search-container">
    <input type="text" id="tool-search" class="search-input" placeholder="Search by name or tag...">
  </div>

  <div class="wiki-filters">
    <div class="filter-group">
      <label>Category:</label>
      <button class="tool-cat-btn active" data-category="all">All</button>
      <button class="tool-cat-btn" data-category="recon">Recon</button>
      <button class="tool-cat-btn" data-category="scanning">Scanning</button>
      <button class="tool-cat-btn" data-category="exploitation">Exploitation</button>
      <button class="tool-cat-btn" data-category="web">Web</button>
      <button class="tool-cat-btn" data-category="network">Network</button>
      <button class="tool-cat-btn" data-category="forensics">Forensics</button>
      <button class="tool-cat-btn" data-category="password">Password</button>
      <button class="tool-cat-btn" data-category="defensive">Defensive</button>
      <button class="tool-cat-btn" data-category="osint">OSINT</button>
      <button class="tool-cat-btn" data-category="misc">Misc</button>
    </div>
    <div class="filter-group">
      <label>Cost:</label>
      <button class="tool-cost-btn active" data-cost="all">All</button>
      <button class="tool-cost-btn" data-cost="open-source">Open Source</button>
      <button class="tool-cost-btn" data-cost="free">Free</button>
      <button class="tool-cost-btn" data-cost="freemium">Freemium</button>
      <button class="tool-cost-btn" data-cost="paid">Paid</button>
    </div>
  </div>

  <div id="tool-count" class="search-count"></div>
</div>

<div class="card-grid" id="tool-grid">
  {% assign tools = site.data.security_tools | sort: "name" %}
  {% for tool in tools %}
    <div class="card tool-card"
         data-category="{{ tool.category | default: 'misc' | downcase }}"
         data-cost="{{ tool.cost | default: 'unknown' | downcase }}"
         data-name="{{ tool.name | downcase }}"
         data-tags="{{ tool.tags | join: ',' | downcase }}">
      <div class="card-header">
        <h2>{{ tool.name }}</h2>
        {% if tool.cost %}<span class="badge cost-{{ tool.cost | downcase }}">{{ tool.cost }}</span>{% endif %}
      </div>
      <div class="card-meta">
        {% if tool.category %}<span class="badge tool-cat">{{ tool.category }}</span>{% endif %}
        {% if tool.platform %}<span class="badge tag">{{ tool.platform }}</span>{% endif %}
      </div>
      {% if tool.summary %}<p class="card-excerpt">{{ tool.summary }}</p>{% endif %}
      {% if tool.tags %}
        <div class="card-meta">
          {% for tag in tool.tags %}<span class="badge tag">{{ tag }}</span>{% endfor %}
        </div>
      {% endif %}
      {% if tool.url %}<a class="card-link" href="{{ tool.url }}" target="_blank" rel="noopener noreferrer">visit site →</a>{% endif %}
    </div>
  {% endfor %}
</div>

<script src="{{ "/assets/js/security-tools.js" | relative_url }}?v={{ cache_bust }}"></script>
