---
layout: project
title: jamielab.me itself
permalink: /projects/jamielab-me/
status: active
last_updated: 2026-09-18
tech_stack: [jekyll, github-pages, css, javascript]
weight: 11
description: "This whole site: a Jekyll build constrained to only what GitHub Pages will run, with client-side search, 8 swappable themes, and CI that checks every link before it ships."
demo: https://jamielab.me/
repo: https://github.com/jimjamscott22/jimjamscott22.github.io
image: /img/jamielab_prototype.png
image_alt: "Early prototype of the jamielab.me interface"
---

## Overview

This site is itself a project worth a page: a Jekyll static site on GitHub Pages, built entirely on the `github-pages` gem's plugin whitelist — no custom Ruby plugins, no build step beyond what `jekyll build` does out of the box — and yet it has client-side search, 8 themes with persistence, and a CI pipeline that fails the build on a broken link.

## Approach

**Content model:** four collections (`_posts`, `_projects`, `_notes`, `_info`) plus root-level pages for anything that isn't naturally a series. `_layouts/` has no `_includes/` directory — `default.html` and `post.html`/`project.html` are self-contained, with `post.html`/`project.html` starting from `layout: default` in their own front matter to inherit the page shell rather than duplicating it.

**Search without a plugin:** GitHub Pages won't run arbitrary Jekyll plugins, so there's no server-side search index generator available. `assets/data/search-data.json` gets around that by being a `.json` file with empty front matter (`---\n---`), which is enough to make Jekyll run it through Liquid — a Liquid `for` loop over `site.posts` builds a static JSON array of every post's title, url, date, and stripped content at build time. `search.js` then `fetch()`es that file once and does the actual matching in the browser.

**Theme system:** 8 CSS files (cyber-lab, enhanced-matrix, soft-matrix, neon-terminal, amber-phosphor, oceanic-console, solarized-lab, light-terminal) built on CSS custom properties, swapped by rewriting the theme `<link>`'s `href` at runtime. `theme-switcher.js` persists the choice in `localStorage` and separately remembers the last *dark* theme picked, so toggling light/dark mode doesn't lose which dark theme you had.

**CI:** `.github/workflows/link-checker.yml` runs `jekyll build` in production mode, then HTMLProofer against the output, on every push and PR — internal links, image `src`s, and script tags all get checked before anything merges.

## Result

A fully static site — no database, no server-side code beyond GitHub Pages' own Jekyll build — that still has real interactivity (search, an interactive terminal, a code playground with two language runtimes) and structural CI. Every one of the site's own "lab" features doubles as evidence for how the site itself works.

## Decisions

Empty-front-matter `.json` files for the search/site-data indexes instead of a Jekyll plugin — GitHub Pages' plugin whitelist doesn't include a search-index generator, and self-hosting the build (to unlock arbitrary plugins) would trade GitHub Pages' free, zero-maintenance hosting for something to operate. Pre-rendering the index as Liquid-templated JSON keeps the site 100% static while still getting real search.

No `_includes/` directory — `post.html` and `project.html` each declare `layout: default` and repeat a little chrome-scaffolding rather than factoring shared bits into includes. For a two-layout site this trades a small amount of duplication for every layout being readable top-to-bottom in one file, which mattered more while the layouts were still changing shape often.

## Lessons

<!-- TODO: what you'd do differently -->
