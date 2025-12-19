---
layout: default
title: Home
---

# JamieLab System Console

{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

<div id="intro" data-text="Initializing JamieLab command console..."></div>

Welcome to the lab. Systems online.  
Homelab status: operational.  
Network tools engaged.

<div class="profile-card">
  <img
    class="profile-photo"
    src="{{ "/img/my_profile.webp" | relative_url }}?v={{ cache_bust }}"
    alt="Portrait of Jamie"
    loading="lazy"
    decoding="async">
  <div class="profile-details">
    <p class="profile-callout">site operator :: jamie</p>
    <h2>Signal Origin</h2>
    <p>Hey, I’m Jamie—security tinkerer, homelab wrangler, and curator of this console. If you like neon terminals, packet traces, or odd experiments, you’re in the right place.</p>
  </div>
</div>

<script defer src="{{ "/assets/js/typewriter.js" | relative_url }}?v={{ cache_bust }}"></script>

## Featured image

<div class="hero-shot">
  <img src="{{ "/img/guy_at_pc.png" | relative_url }}?v={{ cache_bust }}" alt="guy at a computer" loading="lazy" decoding="async">
  <div class="hero-caption">The Lonely Hacker</div>
</div>
