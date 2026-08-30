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

`pages` collection is defined in `_config.yml` for scoped defaults; most site pages are root-level `.md` files (e.g. `playground.md`, `tools.md`).

`future: true` is set, so future-dated posts are included in builds.

### Layouts

Two layouts in `_layouts/`, no `_includes/` directory — layouts are self-contained:
- `default.html` — Master layout: SEO meta tags (Open Graph, Twitter Cards, JSON-LD), cache busting via git revision, theme stylesheet loading, RSS feed link
- `post.html` — Extends default: reading time (word count ÷ 200), tag links, Giscus comments (GitHub Discussions), Schema.org BlogPosting markup

### CSS Architecture

`base.css` owns structure/layout/typography; `theme-*.css` owns color variables; `custom.css` holds cyber-lab overrides. Keep this split when editing styles. `syntax.css` and `images.css` are shared utilities.

### Theme System

Five CSS themes in `assets/css/`: `cyber-lab`, `enhanced-matrix`, `light-terminal`, `neon-terminal`, `soft-matrix`. Switching is handled by `assets/js/theme-switcher.js` with `localStorage` persistence. The active theme stylesheet is loaded dynamically.

### JavaScript

Most JS is static in `assets/js/` — no bundler. Exception: `playground.js` imports pre-bundled `playground-cm.bundle.js` (CodeMirror). Key files:
- `search.js` — Client-side content search
- `theme-switcher.js` — Theme switching
- `notes.js` — Notes with `localStorage` persistence
- `terminal.js` — Terminal emulation
- `playground.js` — Interactive demos
- `tools.js` — Utility tools
- `code-copy.js` — Copy-to-clipboard for code blocks

### Serverless API (Optional)

`/api/create-project.js` — A serverless function for an admin project-creation interface. Integrates with the GitHub API to create `_projects/*.md` files. Can be deployed to Vercel or Netlify. Not required for the main site to function.

The admin UI (`project-admin.md`, `assets/js/project-admin.js`) is excluded from the Jekyll build by default (see `exclude:` in `_config.yml`) — it's a public token prompt with nowhere to post to until `project_admin_api_url` is set and the serverless function above is deployed. Remove both entries from `exclude:` only once that backend is actually live.

### Content Front Matter

Posts support: `title`, `tags`, `excerpt_separator: <!--more-->`.
Layouts derive reading time and structured data automatically from content.

### Gotchas

- Markdown processor is kramdown (Rouge highlighter)
- Mermaid diagrams loaded via CDN
- Local validation: `gem install html-proofer` if not already available
- Ruby 3+ requires `webrick` gem (already in Gemfile) for `jekyll serve`
