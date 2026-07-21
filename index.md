---
layout: default
title: Home
description: "JamieLab - Experiments, networks, homelab, and code. A personal cyber lab exploring security, networking, and software development."
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
    src="{{ "img/pro-hacker-jamie-2.jpg" | relative_url }}?v={{ cache_bust }}"
    alt="Portrait of Jamie"
    loading="lazy"
    decoding="async">
  <div class="profile-details">
    <p class="profile-callout">site operator :: jamie</p>
    <h2>Signal Origin</h2>
    <p>Hey, I’m Jamie—security tinkerer, homelab wrangler, and curator of this console. If you like neon terminals, packet traces, or odd experiments, you’re in the right place.</p>
  </div>
</div>

## Featured image

<div class="hero-grid">
  <div class="hero-shot">
    <img src="{{ "/img/minimalist_workstation.png" | relative_url }}?v={{ cache_bust }}" alt="guy at a computer" loading="lazy" decoding="async">
    <div class="hero-caption">Where thoughts become bits [01010101] </div>
  </div>

  <div class="hero-shot hero-shot--secondary">
    <img src="{{ "/img/mini_me.JPG" | relative_url }}?v={{ cache_bust }}"
         alt="Desk figurine of Jamie seated at workstation"
         loading="lazy"
         decoding="async">
    <div class="hero-caption">
      Physical avatar :: desk-side operator
    </div>
  </div>
</div>
