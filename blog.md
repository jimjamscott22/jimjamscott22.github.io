---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Short informational posts, lab notes, and writeups.

<div class="blog-actions">
  <a href="{{ "/feed.xml" | relative_url }}" class="rss-link">
    <svg class="rss-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6.18" cy="17.82" r="2.18"/>
      <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
    </svg>
    Subscribe via RSS
  </a>
</div>

{% if site.posts and site.posts.size > 0 %}

## Search posts

<div id="search-container" class="search-container">
  <div class="search-box">
    <input 
      type="text" 
      id="search-input" 
      class="search-input" 
      placeholder="Search posts by title, content, or tags..."
      aria-label="Search blog posts">
  </div>
  <div id="search-count" class="search-count"></div>
  <div id="search-results" class="search-results"></div>
</div>

<script>
  // Embed search data in the page
  window.searchData = [
    {% for post in site.posts %}
    {
      title: {{ post.title | jsonify }},
      url: {{ post.url | relative_url | jsonify }},
      date: {{ post.date | date: "%Y-%m-%d" | jsonify }},
      content: {{ post.content | strip_html | strip_newlines | jsonify }},
      tags: {{ post.tags | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>
<script defer src="{{ "/assets/js/search.js" | relative_url }}"></script>

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

