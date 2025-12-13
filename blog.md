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
    {% assign __post_words = post.content | strip_html | strip_newlines | replace: "  ", " " | split: " " %}
    {% assign __post_word_count = __post_words | size %}
    {% assign __post_reading_mins = __post_word_count | plus: 199 | divided_by: 200 %}

    <article class="card post-item">
      <header class="card-header">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <span class="badge tag">{{ post.date | date: "%Y-%m-%d" }}</span>
      </header>

      {% if __post_word_count and __post_word_count > 0 %}
        <div class="post-meta">
          <span class="badge tag">{{ __post_reading_mins }} min read</span>
        </div>
      {% endif %}

      {% if post.description %}
        <p class="post-excerpt">{{ post.description | strip_html | strip_newlines | truncate: 180 }}</p>
      {% elsif post.excerpt %}
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
      {% assign __post_words = post.content | strip_html | strip_newlines | replace: "  ", " " | split: " " %}
      {% assign __post_word_count = __post_words | size %}
      {% assign __post_reading_mins = __post_word_count | plus: 199 | divided_by: 200 %}

      <article class="card post-item">
        <header class="card-header">
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          <span class="badge tag">{{ post.date | date: "%Y-%m-%d" }}</span>
        </header>

        {% if __post_word_count and __post_word_count > 0 %}
          <div class="post-meta">
            <span class="badge tag">{{ __post_reading_mins }} min read</span>
          </div>
        {% endif %}

        {% if post.description %}
          <p class="post-excerpt">{{ post.description | strip_html | strip_newlines | truncate: 140 }}</p>
        {% elsif post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html | strip_newlines | truncate: 140 }}</p>
        {% endif %}

        <a class="card-link" href="{{ post.url | relative_url }}">open →</a>
      </article>
    {% endfor %}
  </div>
{% endfor %}

{% else %}

No posts yet. Add your first one in `_posts/` and it’ll appear here automatically.

{% endif %}

