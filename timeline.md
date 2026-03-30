---
layout: default
title: Timeline
permalink: /timeline/
description: "A chronological view of projects, blog posts, and technical milestones in the jamielab journey."
---

# Timeline

A chronological view of projects, posts, and milestones. For detailed posts, visit the [Blog](/blog/). For project details, see [Projects](/projects/).

{% assign sorted_posts = site.posts | sort: "date" %}
{% assign sorted_projects = site.projects | where_exp: "p", "p.milestone_date" | sort: "milestone_date" %}
{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

<div class="mermaid">
gantt
    title jamielab · Posts & Projects
    dateFormat YYYY-MM-DD
    axisFormat %b '%y
    section Posts
    {% for post in sorted_posts %}{% assign safe_title = post.title | replace: ":", " " | replace: '"', '' | truncate: 38, "" %}
    {{ safe_title }} :milestone, p{{ forloop.index }}, {{ post.date | date: "%Y-%m-%d" }}, 0d
    {% endfor %}
    section Projects
    {% for project in sorted_projects %}{% assign safe_title = project.title | replace: ":", " " | replace: '"', '' | truncate: 38, "" %}
    {{ safe_title }} :milestone, proj{{ forloop.index }}, {{ project.milestone_date }}, 0d
    {% endfor %}
</div>

<div class="timeline-container">
  <div class="timeline-entries">
    {% comment %} Render posts {% endcomment %}
    {% for post in site.posts %}
      <div class="timeline-entry" data-date="{{ post.date | date: '%Y-%m-%d' }}">
        <div class="timeline-date">{{ post.date | date: "%b %d" }}</div>
        <div class="timeline-marker"></div>
        <div class="timeline-connector"></div>
        <div class="timeline-content">
          <div class="timeline-badge-type badge badge-post">post</div>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.description %}
            <p class="timeline-description">{{ post.description }}</p>
          {% endif %}
          {% if post.tags %}
            <div class="timeline-tags">
              {% for tag in post.tags %}
                <span class="badge tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </div>
    {% endfor %}

    {% comment %} Render project milestones {% endcomment %}
    {% assign milestone_projects = site.projects | where_exp: "p", "p.milestone_date" %}
    {% for project in milestone_projects %}
      <div class="timeline-entry" data-date="{{ project.milestone_date }}">
        <div class="timeline-date">{{ project.milestone_date | date: "%b %d" }}</div>
        <div class="timeline-marker timeline-marker-project"></div>
        <div class="timeline-connector"></div>
        <div class="timeline-content">
          <div class="timeline-badge-type badge badge-project">project</div>
          <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
          {% if project.milestone_text %}
            <p class="timeline-description">{{ project.milestone_text }}</p>
          {% endif %}
          {% if project.status %}
            <span class="badge status-{{ project.status }}">{{ project.status }}</span>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<script defer src="{{ "/assets/js/timeline.js" | relative_url }}?v={{ cache_bust }}"></script>
