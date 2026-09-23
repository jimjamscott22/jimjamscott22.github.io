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

<p class="identity-line">Jamie — BA in Information Science (SUNY Oswego). I build self-hosted security tooling and full-stack apps, and document how they work. Currently looking for an internship or entry-level role in security or software.</p>

## Featured work

<div class="card-grid">
  <article class="card">
    <header class="card-header">
      <h2><a href="{{ "/projects/chatarchive/" | relative_url }}">ChatArchive</a></h2>
      <span class="badge status status-building">building</span>
    </header>
    <p>Pulls exported conversations from four AI tools into one searchable, self-hosted archive.</p>
    <div class="card-links">
      <a class="card-link" href="{{ "/projects/chatarchive/" | relative_url }}">Case study →</a>
      <a class="card-link" href="https://github.com/jimjamscott22/ChatArchive" target="_blank" rel="noopener noreferrer">Source →</a>
    </div>
  </article>

  <article class="card">
    <header class="card-header">
      <h2><a href="{{ "/projects/vaultwarden-byopm/" | relative_url }}">VaultWarden BYOPM</a></h2>
      <span class="badge status status-building">building</span>
    </header>
    <p>Self-hosted password management, fully in-house — no third party holds the keys.</p>
    <div class="card-links">
      <a class="card-link" href="{{ "/projects/vaultwarden-byopm/" | relative_url }}">Case study →</a>
    </div>
  </article>

  <article class="card">
    <header class="card-header">
      <h2><a href="{{ "/projects/code-playground/" | relative_url }}">Code Playground</a></h2>
      <span class="badge status status-active">active</span>
    </header>
    <p>Runs real JavaScript and Python in the browser — no install, no account, no server.</p>
    <div class="card-links">
      <a class="card-link" href="{{ "/projects/code-playground/" | relative_url }}">Case study →</a>
      <a class="card-link" href="{{ "/playground/" | relative_url }}">Live demo →</a>
    </div>
  </article>
</div>

## Latest write-up

<div class="card-grid">
  <article class="card">
    <header class="card-header">
      <h2><a href="{{ "/blog/2026/01/18/vaultwarden-backup-solution/" | relative_url }}">Self-Hosting Vaultwarden on a Raspberry Pi (With a Disaster-Recovery Fallback)</a></h2>
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
    <h2>Signal Origin</h2>
    <p>Hey, I’m Jamie—security tinkerer, homelab wrangler, and curator of this console. If you like neon terminals, packet traces, or odd experiments, you’re in the right place.</p>
  </div>
</div>

Welcome to the lab. Systems online.  
Homelab status: operational.  
Network tools engaged.

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
