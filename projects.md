---
layout: default
title: Projects
permalink: /projects/
description: "A collection of builds, tools, and lab experiments including ThreatStream Lite, Fort Knox LAN, VaultWarden, and more homelab projects."
---

# Projects

A rolling set of builds, tools, and lab experiments. Click a card to see how I built it.

{% assign all_projects = site.projects | sort: "weight" %}

{% assign tag_string = "" %}
{% for project in all_projects %}
  {% if project.tech_stack %}
    {% assign joined = project.tech_stack | join: "," %}
    {% assign tag_string = tag_string | append: joined | append: "," %}
  {% endif %}
{% endfor %}
{% assign all_tags = tag_string | split: "," | uniq | sort %}

<script defer src="{{ "/assets/js/tag-filter.js" | relative_url }}"></script>

## Filter by stack

<div class="tag-filter-bar" id="tag-filter-bar">
  <button class="badge tag tag-filter-btn tag-filter-active" data-tag="all">all</button>
  {% for tag in all_tags %}
    <button class="badge tag tag-filter-btn" data-tag="{{ tag | slugify }}">{{ tag }}</button>
  {% endfor %}
</div>
<p class="tag-filter-status" id="tag-filter-status" aria-live="polite"></p>

<div id="filtered-post-list">

<h2>Featured</h2>

<div class="card-grid">
  {% for project in all_projects %}
    {% if project.featured %}
      <article class="card post-item" data-tags="{% if project.tech_stack %}{{ project.tech_stack | join: ',' | slugify: 'latin' }}{% endif %}">
        {% if project.image %}
          <img src="{{ project.image | relative_url }}" alt="{{ project.image_alt | default: project.title }}" loading="lazy" decoding="async" />
        {% endif %}
        <header class="card-header">
          <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
          {% if project.status %}<span class="badge status status-{{ project.status }}">{{ project.status }}</span>{% endif %}
        </header>
        {% if project.description %}<p>{{ project.description }}</p>{% endif %}
        {% if project.tech_stack %}
          <div class="card-meta">
            {% for tech in project.tech_stack %}<span class="badge tag">{{ tech }}</span>{% endfor %}
          </div>
        {% endif %}
        <div class="card-links">
          <a class="card-link" href="{{ project.url | relative_url }}">Case study →</a>
          {% if project.repo %}<a class="card-link" href="{{ project.repo }}" target="_blank" rel="noopener">Source →</a>{% endif %}
          {% if project.demo %}<a class="card-link" href="{{ project.demo }}" target="_blank" rel="noopener">Live demo →</a>{% endif %}
        </div>
      </article>
    {% endif %}
  {% endfor %}
</div>

<h2>All projects</h2>

<div class="card-grid">
  {% for project in all_projects %}
    {% unless project.featured %}
      <article class="card post-item" data-tags="{% if project.tech_stack %}{{ project.tech_stack | join: ',' | slugify: 'latin' }}{% endif %}">
        {% if project.image %}
          <img src="{{ project.image | relative_url }}" alt="{{ project.image_alt | default: project.title }}" loading="lazy" decoding="async" />
        {% endif %}
        <header class="card-header">
          <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
          {% if project.status %}<span class="badge status status-{{ project.status }}">{{ project.status }}</span>{% endif %}
        </header>
        {% if project.description %}<p>{{ project.description }}</p>{% endif %}
        {% if project.tech_stack %}
          <div class="card-meta">
            {% for tech in project.tech_stack %}<span class="badge tag">{{ tech }}</span>{% endfor %}
          </div>
        {% endif %}
        <div class="card-links">
          <a class="card-link" href="{{ project.url | relative_url }}">Case study →</a>
          {% if project.repo %}<a class="card-link" href="{{ project.repo }}" target="_blank" rel="noopener">Source →</a>{% endif %}
          {% if project.demo %}<a class="card-link" href="{{ project.demo }}" target="_blank" rel="noopener">Live demo →</a>{% endif %}
        </div>
      </article>
    {% endunless %}
  {% endfor %}
</div>

</div>
