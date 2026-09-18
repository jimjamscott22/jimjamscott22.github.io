---
layout: project
title: Pi-hole + DNS toys
permalink: /projects/pihole-dns/
status: active
last_updated: 2026-01-10
tech_stack: [pihole, dns, tailscale, doh]
milestone_date: 2024-07-20
milestone_text: "Deployed Pi-hole DNS sinkhole for network-wide ad blocking"
weight: 3
description: "DNS sinkhole tests, DoH/DoT trials, and dashboard tweaks for home clients and lab guests."
image: /img/pihole_dash.png
image_alt: "Experimental Pi-hole dashboard screenshot"
---

## Overview
DNS sinkhole tests, DoH/DoT trials, and dashboard tweaks for home clients and lab guests.

## Screenshots

<div class="image-gallery">
  <figure>
    <img src="{{ "/img/blockliststats.png" | relative_url }}" alt="Blocklist statistics" loading="lazy" decoding="async" />
    <figcaption>Blocklist statistics</figcaption>
  </figure>
  <figure>
    <img src="{{ "/img/piholepic.PNG" | relative_url }}" alt="Pi-hole metrics dashboard" loading="lazy" decoding="async" />
    <figcaption>Pi-hole metrics</figcaption>
  </figure>
</div>

<figure class="content-image">
  <img src="{{ "/img/piholepic2.jpeg" | relative_url }}" alt="DNS query metrics" loading="lazy" decoding="async" />
  <figcaption>DNS query metrics over time</figcaption>
</figure>

## Notes

### Blocklists
[StevenBlack hosts](https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts)

## Decisions

<!-- TODO: 2-3 real tradeoffs made building this, with the option rejected and why -->

## Lessons

<!-- TODO: what you'd do differently -->
