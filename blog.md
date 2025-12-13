---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Short informational posts, lab notes, and writeups.

{% if site.posts and site.posts.size > 0 %}

## Browse by tag

{% assign tags_sorted = site.tags | sort %}
<div class="card-meta">
  {% for tag in tags_sorted %}
    {% assign tag_name = tag[0] %}
    <a class="badge tag" href="#tag-{{ tag_name | slugify }}">{{ tag_name }}</a>
  {% endfor %}
</div>

## Latest posts

<div class="post-list">
  {% for post in site.posts %}
    <article class="card post-item">
      <header class="card-header">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <span class="badge tag">{{ post.date | date: "%Y-%m-%d" }}</span>
      </header>

      {% if post.excerpt %}
        <p class="post-excerpt">{{ post.excerpt | strip_html | strip_newlines | truncate: 180 }}</p>
      {% endif %}

      {% if post.tags and post.tags.size > 0 %}
        <div class="card-meta">
          {% for tag in post.tags %}
            <a class="badge tag" href="#tag-{{ tag | slugify }}">{{ tag }}</a>
          {% endfor %}
        </div>
      {% endif %}

      <a class="card-link" href="{{ post.url | relative_url }}">read →</a>
    </article>
  {% endfor %}
</div>

## Tags

{% for tag in tags_sorted %}
  {% assign tag_name = tag[0] %}
  {% assign tag_posts = tag[1] %}

  <h3 id="tag-{{ tag_name | slugify }}">tag: {{ tag_name }}</h3>
  <div class="post-list">
    {% for post in tag_posts %}
      <article class="card post-item">
        <header class="card-header">
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          <span class="badge tag">{{ post.date | date: "%Y-%m-%d" }}</span>
        </header>
        <a class="card-link" href="{{ post.url | relative_url }}">open →</a>
      </article>
    {% endfor %}
  </div>
{% endfor %}

{% else %}

No posts yet. Add your first one in `_posts/` and it’ll appear here automatically.

{% endif %}

