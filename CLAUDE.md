# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Local development server (with live reload)
bundle exec jekyll serve

# Production build
bundle exec jekyll build

# Link/HTML validation (same as CI)
bundle exec jekyll build JEKYLL_ENV=production
bundle exec htmlproofer ./_site --disable-external --allow-hash-href
```

CI runs link checking via `.github/workflows/link-checker.yml` on every push to `main` and all PRs.

## Architecture

This is a Jekyll static site deployed to GitHub Pages at `jamielab.me`. It uses the `github-pages` gem (not a custom Jekyll version), so only GitHub Pages-supported plugins are available.

### Collections

Defined in `_config.yml`:
- `_posts/` — Blog posts, permalink `/blog/:year/:month/:day/:title/`
- `_projects/` — Project showcases, permalink `/projects/:name/`
- `_notes/` — Technical reference notes, permalink `/notes/:name/`
- `_info/` — Educational reference pages (algorithms, data structures, git, design patterns), permalink `/info/:name/`

`future: true` is set, so future-dated posts are included in builds.

### Layouts

Two layouts in `_layouts/`, no `_includes/` directory — layouts are self-contained:
- `default.html` — Master layout: SEO meta tags (Open Graph, Twitter Cards, JSON-LD), cache busting via git revision, theme stylesheet loading, RSS feed link
- `post.html` — Extends default: reading time (word count ÷ 200), tag links, Giscus comments (GitHub Discussions), Schema.org BlogPosting markup

### Theme System

Five CSS themes in `assets/css/`: `cyber-lab`, `enhanced-matrix`, `light-terminal`, `neon-terminal`, `soft-matrix`. Switching is handled by `assets/js/theme-switcher.js` with `localStorage` persistence. The active theme stylesheet is loaded dynamically.

### JavaScript

All JS is in `assets/js/` and loaded as static files — no bundler. Key files:
- `search.js` — Client-side content search
- `theme-switcher.js` — Theme switching
- `notes.js` — Notes with `localStorage` persistence
- `terminal.js` — Terminal emulation
- `playground.js` — Interactive demos
- `tools.js` — Utility tools
- `code-copy.js` — Copy-to-clipboard for code blocks

### Serverless API (Optional)

`/api/create-project.js` — A serverless function for an admin project-creation interface. Integrates with the GitHub API to create `_projects/*.md` files. Can be deployed to Vercel or Netlify. Not required for the main site to function.

### Content Front Matter

Posts support: `title`, `tags`, `excerpt_separator: <!--more-->`.
Layouts derive reading time and structured data automatically from content.
