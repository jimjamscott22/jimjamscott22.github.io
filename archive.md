---
layout: default
title: Archive
permalink: /archive/
description: "Complete chronological archive of all blog posts, notes, and updates from jamielab."
---

# Archive

Looking for specific content? Try [searching the blog](/blog/).

<div class="archive-container">
  {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in posts_by_year %}
    <div class="archive-year" data-year="{{ year.name }}">
      <h2 class="archive-year-header">
        <span class="archive-toggle">▼</span>
        {{ year.name }}
        <span class="badge">{{ year.items | size }} posts</span>
      </h2>
      <div class="archive-year-content">
        {% assign posts_by_month = year.items | group_by_exp: "post", "post.date | date: '%B'" %}
        {% for month in posts_by_month %}
          <div class="archive-month">
            <h3>{{ month.name }} <span class="badge">{{ month.items | size }}</span></h3>
            <ul class="archive-list">
              {% for post in month.items %}
                <li class="archive-item">
                  <span class="archive-date">{{ post.date | date: "%Y-%m-%d" }}</span>
                  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                  {% if post.tags %}
                    <span class="archive-tags">
                      {% for tag in post.tags %}
                        <span class="badge tag">{{ tag }}</span>
                      {% endfor %}
                    </span>
                  {% endif %}
                </li>
              {% endfor %}
            </ul>
          </div>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>

<script src="{{ '/assets/js/archive.js' | relative_url }}"></script>
