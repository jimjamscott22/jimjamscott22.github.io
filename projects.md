---
layout: default
title: Projects
permalink: /projects/
---

# Projects

A rolling set of builds, tools, and lab experiments. Click the links below each project to view how I built it. Enjoy!

## Active builds

<div class="card-grid">
  <article class="card">
    <img src="{{ "/img/threat_stream_dash.png" | relative_url }}" alt="Screenshot of ThreatStream Lite dashboard" loading="lazy" decoding="async" />
    <header class="card-header">
      <h2>ThreatStream Lite</h2>
      <span class="badge status status-active">active</span>
    </header>
    <p>Lightweight intel aggregator pulling feeds into a local DB with quick search and IOC tagging.</p>
    <div class="card-meta">
      <span class="badge tag">python</span>
      <span class="badge tag">sqlite</span>
      <span class="badge tag">rss</span>
    </div>
    <a class="card-link" href="/projects/threatstream-lite/">View notes →</a>
  </article>

  <article class="card">
    <img src="{{ "/img/fort_knox_lan.png" | relative_url }}" alt="Image of a VLAN diagram" loading="lazy" decoding="async" />
    <header class="card-header">
      <h2>Fort Knox LAN</h2>
      <span class="badge status status-building">building</span>
    </header>
    <p>Network hardening lab with segmented VLANs, pfSense rules, and repeatable IaC templates.</p>
    <div class="card-meta">
      <span class="badge tag">pfsense</span>
      <span class="badge tag">ansible</span>
      <span class="badge tag">vlans</span>
    </div>
    <a class="card-link" href="/projects/fort-knox-lan/">Runbook draft →</a>
  </article>

  <article class="card">
    <img src="{{ "/img/byopm_schematic.webp" | relative_url }}" alt="VaultWarden password manager schematic" loading="lazy" decoding="async" />
    <header class="card-header">
      <h2>VaultWarden BYOPM</h2>
      <span class="badge status status-building">building</span>
    </header>
    <p>Self-hosted password manager with Docker, Unbound DNS, and automated backups—bringing your own password management home.</p>
    <div class="card-meta">
      <span class="badge tag">docker</span>
      <span class="badge tag">vaultwarden</span>
      <span class="badge tag">security</span>
    </div>
    <a class="card-link" href="/projects/vaultwarden-byopm/">Project details →</a>
  </article>

  <article class="card">
   <picture>
    <source srcset="{{ "/img/chatarchive_screenshot.png" | relative_url }}" type="image/png" alt="pic" loading="lazy" decoding="async">
   </picture>
    <header class="card-header">
      <h2>ChatArchive</h2>
      <span class="badge status status-building">building</span>
    </header>
    <p>Self-hosted chat archive for importing ChatGPT exports into local SQLite with a React UI and fast search planned.</p>
    <div class="card-meta">
      <span class="badge tag">fastapi</span>
      <span class="badge tag">react</span>
      <span class="badge tag">sqlite</span>
    </div>
    <a class="card-link" href="/projects/chatarchive/">Project details →</a>
  </article>

  <article class="card">
   <picture>
   <source srcset="{{ "/img/pytyping_screenshot.png" | relative_url }}" type="image/png" alt="PyTyping app screenshot" loading="lazy" decoding="async" >
   </picture>
    <header class="card-header">
      <h2>PyTyping</h2>
      <span class="badge status status-active">active</span>
    </header>
    <p>Lightweight local typing trainer built in Python/PyQt with real-time accuracy + speed feedback and session tracking.</p>
    <div class="card-meta">
      <span class="badge tag">python</span>
      <span class="badge tag">pyqt</span>
      <span class="badge tag">desktop</span>
    </div>
    <a class="card-link" href="/projects/pytyping/">Project details →</a>
  </article>
</div>

## Experiments

<div class="card-grid">
  <article class="card">
    <img src="{{ "/img/pihole_dash.png" | relative_url }}" alt="Experimental Pi-hole dashboard screenshot" loading="lazy" decoding="async" />
    <header class="card-header">
      <h2>Pi-hole + DNS toys</h2>
      <span class="badge status status-active">active</span>
    </header>
    <p>DNS sinkhole tests, DoH/DoT trials, and dashboard tweaks for home clients and lab guests.</p>
    <div class="card-meta">
      <span class="badge tag">dns</span>
      <span class="badge tag">pihole</span>
      <span class="badge tag">tailscale</span>
    </div>
    <a class="card-link" href="/projects/pihole-dns/">Blocklists & metrics →</a>
  </article>

   <article class="card">
    <img src="{{ "/img/oswego_server_homepage.png" | relative_url }}" alt="Oswego Raspberry Pi server website homepage" loading="lazy" decoding="async" />
    <header class="card-header">
      <h2>Oswego Pi Web</h2>
      <span class="badge status status-active">active</span>
    </header>
    <p>
      My first deployed website, hosted on a SUNY Oswego Raspberry Pi server.
      Built to understand real-world hosting, Linux permissions, and serving
      content outside my local lab.
    </p>
    <div class="card-meta">
      <span class="badge tag">html</span>
      <span class="badge tag">css</span>
      <span class="badge tag">linux</span>
      <span class="badge tag">apache</span>
      <span class="badge tag">raspberry-pi</span>
    </div>
    <a class="card-link" href="https://www.cs.oswego.edu/~jscott21/coursework/ISC250/index.html" target="_blank">Visit site →</a>
  </article>

</div>

