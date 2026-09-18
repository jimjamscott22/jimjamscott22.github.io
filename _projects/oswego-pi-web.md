---
layout: project
title: Oswego Pi Web
permalink: /projects/oswego-pi-web/
status: active
last_updated: 2026-01-01
tech_stack: [html, css, linux, apache, raspberry-pi]
weight: 0
featured: true
description: "My first deployed website, hosted on a SUNY Oswego Raspberry Pi server."
image: /img/oswego_server_homepage.png
image_alt: "Oswego Raspberry Pi server website homepage"
demo: https://www.cs.oswego.edu/~jscott21/coursework/ISC250/index.html
---

## Overview

My first deployed website, hosted on a SUNY Oswego Raspberry Pi server. Built
to understand real-world hosting, Linux permissions, and serving content
outside my local lab — the step between "runs on my machine" and "runs on
someone else's server that I don't fully control."

<figure class="content-image content-image--wide">
  <img src="{{ "/img/oswego_server_homepage.png" | relative_url }}" alt="Oswego Raspberry Pi server website homepage" loading="lazy" decoding="async" />
  <figcaption>The site's homepage, live on the department Pi</figcaption>
</figure>

## What it is

- Static HTML/CSS coursework site
- Deployed to a shared Raspberry Pi running Apache under `~/public_html`
- First time working with real Linux file permissions and a server I didn't
  own or configure from scratch

## Decisions

<!-- TODO: 2-3 real tradeoffs made building this, with the option rejected and why -->

## Lessons

<!-- TODO: what you'd do differently -->
