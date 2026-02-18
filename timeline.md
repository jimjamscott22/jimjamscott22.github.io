---
layout: default
title: Timeline
permalink: /timeline/
description: "A chronological view of projects, blog posts, and technical milestones in the jamielab journey."
---

# Timeline

A chronological view of projects, posts, and milestones. For detailed posts, visit the [Blog](/blog/). For project details, see [Projects](/projects/).

<div class="timeline-container">
  {% comment %} Collect and sort posts {% endcomment %}
  {% assign sorted_posts = site.posts | sort: "date" | reverse %}

  {% comment %} Collect and sort project milestones {% endcomment %}
  {% assign sorted_projects = site.projects | where_exp: "p", "p.milestone_date" | sort: "milestone_date" | reverse %}

  {% comment %} Merge posts and projects into timeline {% endcomment %}
  {% assign all_items = "" | split: "" %}

  {% for post in sorted_posts %}
    {% assign item = post | hash %}
    {% assign all_items = all_items | push: item %}
  {% endfor %}

  {% for project in sorted_projects %}
    {% assign all_items = all_items | push: project %}
  {% endfor %}

  <div class="timeline-entries">
    {% comment %} Display posts {% endcomment %}
    {% for post in sorted_posts %}
      <div class="timeline-entry" data-date="{{ post.date | date: '%Y-%m-%d' }}">
        <div class="timeline-date">{{ post.date | date: "%Y-%m-%d" }}</div>
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

    {% comment %} Display project milestones {% endcomment %}
    {% for project in sorted_projects %}
      <div class="timeline-entry" data-date="{{ project.milestone_date }}">
        <div class="timeline-date">{{ project.milestone_date }}</div>
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
