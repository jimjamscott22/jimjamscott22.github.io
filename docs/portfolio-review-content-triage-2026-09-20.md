# Portfolio Review content triage — implementation summary

**Date:** 2026-09-20

## Changes

- Moved the Flutter, Java fundamentals, and GPU setup posts from `_posts/` to `_drafts/`, using the filenames `app-With-Flutter.md`, `java-fundamentals.md`, and `gpu-setup-guide.md`. Their contents were not edited; SHA-256 hashes matched before and after each move.
- Excluded `assets/js/vendor/` from the Jekyll output. The live playground imports the prebuilt `assets/js/playground-cm.bundle.js`; the vendor directory contains build inputs and local dependencies. Publishing its nested `node_modules` had caused 14 HTMLProofer failures in third-party package documentation.

## Verification

- `JEKYLL_ENV=production bundle exec jekyll build` — passed.
- HTMLProofer with the flags from `.github/workflows/link-checker.yml` — passed: 52 HTML files, 86 internal links, and 3 checks (images, links, scripts).
- Confirmed the three titles and slugs are absent from the generated blog, feed, search data, timeline, and sitemap. Confirmed the old generated post pages and `assets/js/vendor/` are absent from `_site/`.

On this Windows host, the standalone HTMLProofer gem required preloading LibreOffice's `libcurl.dll` through Ruby `Fiddle` to start. CI installs and runs HTMLProofer on Ubuntu and needs no workflow change.

The next Portfolio Review task is to finish the flagship project case studies and remove empty placeholder sections.
