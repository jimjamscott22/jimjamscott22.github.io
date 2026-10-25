---
layout: default
title: Home
seo_title: "Jamie Scott · Homelab, Security & Software Projects"
description: "Jamie Lab - Experiments, networks, homelab, and code. A personal cyber lab exploring security, networking, and software development."
---

# Jamie Lab System Console

{% assign cache_bust = site.github.build_revision %}
{% if cache_bust == nil or cache_bust == "" %}
{% assign cache_bust = site.time | date: "%s" %}
{% endif %}

<div id="intro" data-text="Initializing JamieLab command console..."></div>

<p class="identity-line">Jamie — BA in Information Science (SUNY Oswego). I build self-hosted security tooling and full-stack apps, and document how they work. Currently looking for an internship or entry-level role in security or software.</p>

## Featured work

<div class="card-grid">
  <article class="card">
    <header class="card-header">
      <h3><a href="{{ "/projects/codevault/" | relative_url }}">CodeVault</a></h3>
      <span class="badge status status-building">building</span>
    </header>
    <p>Keeps reusable code, commands, and configs in a local desktop vault with a companion CLI.</p>
    <div class="card-links">
      <a class="card-link" href="{{ "/projects/codevault/" | relative_url }}">Case study →</a>
      <a class="card-link" href="https://github.com/jimjamscott22/Code-Vault" target="_blank" rel="noopener noreferrer">Source →</a>
    </div>
  </article>

  <article class="card">
    <header class="card-header">
      <h3><a href="{{ "/projects/waypoint/" | relative_url }}">Waypoint</a></h3>
      <span class="badge status status-building">building</span>
    </header>
    <p>Tracks job applications, discovers new matches, and turns follow-ups into a private dashboard.</p>
    <div class="card-links">
      <a class="card-link" href="{{ "/projects/waypoint/" | relative_url }}">Case study →</a>
      <a class="card-link" href="https://github.com/jimjamscott22/waypoint" target="_blank" rel="noopener noreferrer">Source →</a>
    </div>
  </article>

  <article class="card">
    <header class="card-header">
      <h3><a href="{{ "/projects/villagesim/" | relative_url }}">VillageSim</a></h3>
      <span class="badge status status-building">building</span>
    </header>
    <p>Simulates autonomous village life with a Rust simulation and a React + Canvas renderer.</p>
    <div class="card-links">
      <a class="card-link" href="{{ "/projects/villagesim/" | relative_url }}">Case study →</a>
      <a class="card-link" href="https://github.com/jimjamscott22/Villiage-Sims" target="_blank" rel="noopener noreferrer">Source →</a>
    </div>
  </article>
</div>

## Latest write-up

<div class="card-grid">
  <article class="card">
    <header class="card-header">
      <h3><a href="{{ "/blog/2026/01/18/vaultwarden-backup-solution/" | relative_url }}">Self-Hosting Vaultwarden on a Raspberry Pi (With a Disaster-Recovery Fallback)</a></h3>
      <span class="badge tag">2026-01-18</span>
    </header>
    <p>Self-hosting a Bitwarden-compatible password manager on a Raspberry Pi 5, with a warm-standby second Pi as a disaster-recovery fallback.</p>
    <div class="card-links">
      <a class="card-link" href="{{ "/blog/2026/01/18/vaultwarden-backup-solution/" | relative_url }}">Read →</a>
    </div>
  </article>
</div>

<div class="profile-card">
  <img
    class="profile-photo"
    src="{{ "img/pro-hacker-jamie-2.jpg" | relative_url }}?v={{ cache_bust }}"
    alt="Portrait of Jamie"
    loading="lazy"
    decoding="async">
  <div class="profile-details">
    <p class="profile-callout">site operator :: jamie</p>
    <h3>Signal Origin</h3>
    <p>Hey, I’m Jamie—security tinkerer, homelab wrangler, and curator of this console. If you like neon terminals, packet traces, or odd experiments, you’re in the right place.</p>
  </div>
</div>

Welcome to the lab. Systems online.  
Homelab status: operational.  
Network tools engaged.

<div class="hero-grid">
  <div class="hero-shot">
    <img src="{{ "/img/minimalist_workstation.webp" | relative_url }}?v={{ cache_bust }}" alt="Dark minimalist desk setup with an ultrawide monitor showing code and a green backlit keyboard beside a rainy window" width="1024" height="1024" loading="lazy" decoding="async">
    <div class="hero-caption">Where thoughts become bits [01010101] </div>
  </div>

</div>
