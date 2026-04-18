# Performance & Style Review (2026-04-18)

This document summarizes a targeted review of the JamieLab website codebase, focusing on frontend performance and maintainability/style consistency.

## Baseline checks run

- `bundle _2.6.9_ exec jekyll build`
- `bundle _2.6.9_ exec jekyll build JEKYLL_ENV=production`
- `htmlproofer ./_site --disable-external --allow-hash-href --ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/,/^http:\/\/pi.hole/"`

Result: build and HTML/link validation pass.

## Key findings and recommended improvements

### High impact

1. **Large embedded data blobs in rendered HTML**
   - Evidence:
     - `window.searchData` on `/blog/` is ~53 KB (`blog.md` inline script)
     - `window.wikiData` on `/notes/` is ~20 KB (`notes.md` inline script)
     - `window.siteData` is injected on every page (`_layouts/default.html`)
   - Why it matters: larger HTML payloads increase TTFB/parse time and hurt mobile performance.
   - Recommendation:
     - Move search/wiki datasets to generated JSON assets and fetch them on demand.
     - Scope `window.siteData` to pages/features that actually require it (or lazy-fetch in `terminal.js`).

2. **Very large image assets are shipped directly**
   - Evidence: several images in `img/` exceed 1–6 MB, e.g., `img/fort_knox_lan.png` (~2.2 MB) and `img/network_topology_var.png` (~1.4 MB).
   - Why it matters: slows LCP and increases bandwidth usage significantly.
   - Recommendation:
     - Create responsive, compressed variants (WebP/AVIF where possible).
     - Serve sized images with `srcset`/`sizes` and keep full-res files only where truly needed.

3. **Global scripts/features loaded unconditionally**
   - Evidence:
     - `terminal.js` loaded on all pages (`_layouts/default.html`)
     - Mermaid module loaded on all pages (`_layouts/default.html`) even when no diagrams exist.
   - Why it matters: unnecessary JS download/parse/execute on pages that do not use these features.
   - Recommendation:
     - Load Mermaid only when page content contains Mermaid blocks.
     - Defer terminal bootstrapping until first interaction (hotkey/button), then initialize lazily.

4. **Cache-control meta tags currently disable caching**
   - Evidence: `_layouts/default.html` uses `Cache-Control: no-store, max-age=0` and related no-cache metas.
   - Why it matters: fights browser caching and can degrade repeat-visit performance.
   - Recommendation:
     - Remove no-store/no-cache meta directives for normal pages and rely on cache-busted asset URLs (`?v={{ cache_bust }}`) plus hosting headers.

### Medium impact

5. **Search performs repeated normalization work per keystroke**
   - Evidence: `assets/js/search.js` lowercases title/content/tags for every item on every query.
   - Why it matters: scales poorly as content grows.
   - Recommendation:
     - Precompute normalized fields once when building the index in memory.
     - Keep debounce, and consider lightweight indexing/tokenization if content volume increases.

6. **Script loading consistency can be improved**
   - Evidence: some page scripts are loaded without `defer` (e.g. `tools.md`, `project-admin.md`, `notes.md`).
   - Why it matters: inconsistent behavior and potential parser blocking.
   - Recommendation:
     - Standardize script loading strategy (`defer` for non-module scripts where safe).
     - Keep one documented pattern for page-level script tags.

7. **Base stylesheet is monolithic and growing**
   - Evidence: `assets/css/base.css` is ~49 KB and very broad in scope.
   - Why it matters: harder maintenance, review overhead, and increased CSS parse cost.
   - Recommendation:
     - Split base styles into logical partials (layout/components/utilities/page-specific), then concatenate via Jekyll includes or Sass pipeline.

### Style/maintainability enhancements

8. **Use explicit transition properties instead of `transition: all`**
   - Evidence: multiple `transition: all ...` declarations in `assets/css/base.css`.
   - Why it matters: animating unintended properties can trigger extra paint/layout work.
   - Recommendation:
     - Replace with targeted properties (e.g., `color`, `background-color`, `border-color`, `transform`, `box-shadow`).

9. **Adopt and enforce JS formatting/lint conventions**
   - Evidence: mixed quote styles and varying module patterns across `assets/js/*.js`.
   - Why it matters: inconsistent style increases review friction.
   - Recommendation:
     - Define a minimal JS style standard and enforce via formatting/lint checks in CI.

## Suggested rollout order

1. Image optimization + responsive delivery.
2. Move search/wiki/site data out of inline HTML and load on demand.
3. Conditional/lazy loading for Mermaid and terminal runtime.
4. Remove no-store cache meta directives.
5. Refine search indexing and CSS/JS style consistency improvements.

## Expected outcomes

- Smaller HTML payloads and lower JS work on first load.
- Better LCP and repeat-visit performance.
- Cleaner, more maintainable styling and frontend code conventions.
