# Readability & Visual Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve text readability, reduce CRT visual noise, and add syntax highlighting across a Jekyll site while preserving the terminal aesthetic.

**Architecture:** CSS is split across `base.css` (structure/layout/typography), per-theme files (colour variables), and a new `syntax.css` (Rouge token colours). The plan touches each layer independently so changes are isolated and reversible. No JavaScript changes are needed.

**Tech Stack:** Jekyll, kramdown, Rouge (built into GitHub Pages), vanilla CSS, `bundle exec jekyll serve` for local preview.

---

## Reference

- Spec: `docs/superpowers/specs/2026-03-22-readability-visual-clarity-design.md`
- Serve locally: `bundle exec jekyll serve` (from repo root)
- Preview at: `http://localhost:4000`
- Existing CSS: `assets/css/base.css`, `assets/css/custom.css`, `assets/css/theme-*.css`
- Layout: `_layouts/default.html`
- Config: `_config.yml`

---

## File Map

| Status | File | What changes |
|---|---|---|
| Modify | `_config.yml` | Add `highlighter: rouge` + kramdown syntax opts |
| Create | `assets/css/syntax.css` | Rouge token colours (cyber palette) |
| Modify | `_layouts/default.html` | Add `<link>` for `syntax.css` |
| Modify | `assets/css/base.css` | Remove global text-shadow; update typography, spacing, code block chrome |
| Modify | `assets/css/custom.css` | Remove `.terminal-body` text-shadow override |
| Modify | `assets/css/theme-soft-matrix.css` | Remove body/frame text-shadow override (keep `.accent` glow) |
| No change | `assets/css/theme-enhanced-matrix.css` | No text-shadow overrides — base.css covers it |
| No change | `assets/css/theme-neon-terminal.css` | No text-shadow overrides — base.css covers it |
| No change | `assets/css/theme-light-terminal.css` | Already has `text-shadow: none` — no action needed |

---

## Task 1: Enable Rouge syntax highlighter in `_config.yml`

**Files:**
- Modify: `_config.yml`

`_config.yml` already has `markdown: kramdown` at the top level but no `highlighter:` key and no `kramdown:` block. Do not add a second `markdown:` line.

- [ ] **Step 1: Pre-flight config check**

Before editing, verify the current state of `_config.yml`:

```bash
grep -n "highlighter\|kramdown\|markdown" _config.yml
```

Expected output: one line with `markdown: kramdown`, and nothing else for `highlighter:` or `kramdown:`. If `highlighter:` already exists, only update its value. If a `kramdown:` block already exists, merge into it rather than adding a second block.

- [ ] **Step 2: Add Rouge configuration to `_config.yml`**

After the existing `markdown: kramdown` line, add (do not duplicate `markdown:`):

```yaml
highlighter: rouge

kramdown:
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    block:
      line_numbers: false
```

After editing, verify with `grep -n "highlighter\|kramdown\|markdown" _config.yml` — there should be exactly one `markdown:` line, one `highlighter:` line, and one `kramdown:` block.

- [ ] **Step 3: Verify the site still builds**

```bash
bundle exec jekyll serve --livereload
```

Expected: Jekyll starts without errors. Watch for any `Liquid Exception` or config parse errors in the output. If you see `Unknown setting 'highlighter'`, check you haven't introduced a YAML indentation error.

- [ ] **Step 4: Verify Rouge is active on a page with a code block**

Open `http://localhost:4000/blog/` and navigate to any post with a fenced code block (e.g. the Nginx or SSH setup posts). In the browser, right-click a code block and Inspect Element. You should see `<div class="highlight"><pre class="highlight">` wrapping the code, with `<span>` elements inside carrying Rouge token classes (e.g. `class="nb"`, `class="s"`). If the spans are absent, Rouge is not tokenising — double-check Step 2.

- [ ] **Step 5: Commit**

```bash
git add _config.yml
git commit -m "config: enable Rouge syntax highlighter for code blocks"
```

---

## Task 2: Create `assets/css/syntax.css`

**Files:**
- Create: `assets/css/syntax.css`

This file styles the `<span>` elements Rouge generates. It also sets the code block surface (`.highlight`, `pre.highlight`). Write the full file contents in one step.

- [ ] **Step 1: Create `assets/css/syntax.css` with the following contents**

```css
/* ========== ROUGE SYNTAX HIGHLIGHTING ========== */
/* Token colours use the cyber palette. */
/* .highlight is the wrapper div Rouge generates around every code block. */

.highlight {
  background: rgba(0, 8, 3, 0.95);
  border-radius: 3px;
  overflow-x: auto;
  margin: 1rem 0;
}

.highlight pre {
  margin: 0;
  padding: 1rem 1.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace;
  font-size: 0.92rem;
  line-height: 1.6;
  background: transparent;
  border: none;
  border-left: 3px solid var(--accent-bright);
  border-radius: 0 3px 3px 0;
  overflow-x: auto;
}

/* Default token colour */
.highlight .highlight {
  color: #9de8b8;
}

/* Comments */
.highlight .c,
.highlight .cm,
.highlight .c1,
.highlight .ch,
.highlight .cs,
.highlight .cp {
  color: rgba(100, 200, 130, 0.5);
  font-style: italic;
}

/* Keywords */
.highlight .k,
.highlight .kd,
.highlight .kn,
.highlight .kr,
.highlight .kt,
.highlight .kp,
.highlight .kc {
  color: #00e5ff;
  font-weight: 500;
}

/* Strings */
.highlight .s,
.highlight .s1,
.highlight .s2,
.highlight .si,
.highlight .sb,
.highlight .sc,
.highlight .sd,
.highlight .se,
.highlight .sh,
.highlight .sx {
  color: #ff9966;
}

/* Numbers */
.highlight .m,
.highlight .mi,
.highlight .mf,
.highlight .mh,
.highlight .mo,
.highlight .il {
  color: #bd93f9;
}

/* Functions, method names, built-in names */
.highlight .nf,
.highlight .nc,
.highlight .nb,
.highlight .nd {
  color: #4dff88;
}

/* Operators and punctuation */
.highlight .o,
.highlight .ow {
  color: #ffc53d;
}

/* Named constants, class attributes */
.highlight .na,
.highlight .no {
  color: #ffc53d;
}

/* Variables, generic identifiers */
.highlight .n,
.highlight .nx,
.highlight .nv,
.highlight .nl {
  color: #9de8b8;
}

/* Generic output / prompts (e.g. shell $ prompt) */
.highlight .gp {
  color: #4dff88;
  font-weight: 600;
  user-select: none;
}

/* Generic emphasis, strong */
.highlight .ge { font-style: italic; }
.highlight .gs { font-weight: bold; }

/* Errors */
.highlight .err {
  color: #ff6b6b;
}
```

- [ ] **Step 2: Verify the file exists**

```bash
ls -la assets/css/syntax.css
```

Expected: file exists, non-zero size.

- [ ] **Step 3: Commit**

```bash
git add assets/css/syntax.css
git commit -m "style: add Rouge syntax highlighting stylesheet (cyber palette)"
```

---

## Task 3: Link `syntax.css` in `_layouts/default.html`

**Files:**
- Modify: `_layouts/default.html` (around line 60–65, after the existing CSS links)

- [ ] **Step 1: Add the `syntax.css` link**

In `_layouts/default.html`, find the block of `<link>` stylesheet tags. It currently ends with:

```html
  <!-- Shared image styling (keeps images consistent across themes) -->
  <link rel="stylesheet" href="{{ '/assets/css/images.css' | relative_url }}?v={{ cache_bust }}">
```

Add one line immediately after it:

```html
  <!-- Syntax highlighting (Rouge token colours) -->
  <link rel="stylesheet" href="{{ '/assets/css/syntax.css' | relative_url }}?v={{ cache_bust }}">
```

- [ ] **Step 2: Rebuild and verify syntax colours appear**

```bash
bundle exec jekyll serve --livereload
```

Open a post with a fenced code block that includes keywords, strings, and comments. Open browser DevTools → Elements. For each token type, confirm the span's `class` and the computed `color`:

| Token class | Expected computed colour |
|---|---|
| `.c`, `.c1`, `.cm` (comments) | `rgba(100, 200, 130, 0.5)` — dimmed green, italic |
| `.k`, `.kd`, `.kn` (keywords) | `#00e5ff` — cyan |
| `.s`, `.s1`, `.s2` (strings) | `#ff9966` — orange |
| `.m`, `.mi` (numbers) | `#bd93f9` — soft purple |
| `.nf`, `.nb` (functions/built-ins) | `#4dff88` — bright green |
| `.o` (operators) | `#ffc53d` — amber |

If a colour is wrong: the Rouge class name on the span may not match the selector in `syntax.css`. Check the actual class on the span in DevTools and add it to the matching selector group.

Confirm `.highlight` background is dark (`rgba(0,8,3,0.95)`) with a green left border — including when the **Light Terminal** theme is active.

If colours do not appear at all: confirm `syntax.css` loaded (check Network tab in DevTools), confirm Rouge spans are present (Task 1 verification).

- [ ] **Step 3: Commit**

```bash
git add _layouts/default.html
git commit -m "layout: link syntax.css for Rouge code highlighting"
```

---

## Task 4: Remove global `text-shadow` from `base.css`

**Files:**
- Modify: `assets/css/base.css` (around lines 70–76)

This is the most impactful single change. The current rule applies a glow to every character on the page:

```css
body,
.terminal-frame,
.nav-panel,
.top-bar,
.status-bar {
  text-shadow: 0 0 4px var(--glow-color);
}
```

- [ ] **Step 1: Remove the `text-shadow` declaration from the shared selector block**

Find the rule above in `base.css`. Remove only the `text-shadow` line. Keep the selector block intact — other rules may be added to it in future. Result:

```css
body,
.terminal-frame,
.nav-panel,
.top-bar,
.status-bar {
  /* text-shadow removed: reading-first approach — glow on UI chrome only */
}
```

Or if the selector block becomes empty, delete it entirely.

- [ ] **Step 2: Remove `text-shadow` from `.terminal-body` in `base.css`**

`base.css` has a second text-shadow on `.terminal-body` (around line 551) that acts as the fallback when no theme override is present. Since Tasks 7 and 8 remove the per-theme overrides, this fallback would otherwise still glow prose text. Remove it here:

Find:
```css
.terminal-body {
  flex: 1;
  padding: 0.75rem;
  font-size: 0.9rem;
  color: var(--accent-bright);
  text-shadow: 0 0 6px var(--glow-color);
}
```

Remove only the `text-shadow` line. Keep all other properties — padding is updated in Task 6, others stay. Note: theme files may still override `color` and add back glow on specific UI elements — that's intentional.

- [ ] **Step 3: Reduce scanline and noise overlay opacities**

In `base.css`, find `.scanlines-overlay` and `.noise-overlay`. Update their `opacity` values:

```css
.scanlines-overlay {
  /* ... existing properties ... */
  opacity: 0.02;   /* was 0.13 */
}

.noise-overlay {
  /* ... existing properties ... */
  opacity: 0.04;   /* was 0.08 */
}
```

- [ ] **Step 4: Verify text sharpness in browser**

```bash
bundle exec jekyll serve --livereload
```

Open any page. Body text should appear crisp with no glow bloom. The terminal frame border glow (`box-shadow`) should still be visible. The `.nav-prefix` `>` symbols and the brand cursor blink should still glow (those are handled by theme files, not base.css). Scanlines should be barely perceptible.

- [ ] **Step 5: Commit**

```bash
git add assets/css/base.css
git commit -m "style: remove global text-shadow; reduce scanline/noise opacity (reading-first)"
```

---

## Task 5: Update typography in `base.css`

**Files:**
- Modify: `assets/css/base.css` (typography section, around lines 568–614)

- [ ] **Step 1: Update heading sizes and spacing**

Find the heading rules in `base.css`. h1–h4 all receive `margin-bottom: 0.65rem`. Only h1, h2, h3 get new font sizes — h4 font-size is NOT changed (leave whatever value it has now).

```css
h1, h2, h3, h4 {
  margin-top: 0;
  margin-bottom: 0.65rem;   /* applies to all four — including h4 */
  color: var(--text-secondary);
  text-transform: lowercase;
  letter-spacing: 0.08em;
}

h1 { font-size: 1.35rem; }  /* was 1.25rem */
h2 { font-size: 1.15rem; }  /* was 1.05rem */
h3 { font-size: 1.05rem; }  /* was 0.98rem */
/* h4: no font-size rule here — keep its existing value from base.css */

/* Push h2/h3 away from preceding content when they follow a sibling */
* + h2,
* + h3 {
  margin-top: 1.5rem;
}
```

- [ ] **Step 2: Update body prose styles inside `.terminal-body`**

After the heading rules, add a new section for prose content. The `.terminal-body` selector already exists in `base.css` for padding — add beneath it (or in the typography section):

```css
/* ========== PROSE CONTENT TYPOGRAPHY ========== */

.terminal-body p,
.terminal-body li,
.terminal-body blockquote {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 1rem;
  line-height: 1.75;
}

.terminal-body p {
  margin: 0.75rem 0;
}

.terminal-body ul,
.terminal-body ol {
  padding-left: 1.5rem;
}

.terminal-body li + li {
  margin-top: 0.3rem;
}

.terminal-body blockquote {
  margin: 0.75rem 0;
  padding-left: 0.5rem;
  border-left: 3px solid var(--accent-bright);
  opacity: 0.9;
}
```

- [ ] **Step 3: Update card body text to use proportional font**

Find the `.card` rules in `base.css`. Add after `.card { ... }`:

```css
.card p,
.card-body p,
.card-excerpt {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 1rem;
  line-height: 1.75;
}
```

- [ ] **Step 4: Verify in browser**

```bash
bundle exec jekyll serve --livereload
```

- Open a blog post or note with several paragraphs. The prose should now use a proportional sans-serif font at a comfortable size.
- Headings should remain monospace and visually larger/more distinct than before.
- An h2 or h3 that follows a paragraph should have clear visual space above it.
- UI chrome (nav links, badges, timestamps) should be unchanged — still monospace.

- [ ] **Step 5: Commit**

```bash
git add assets/css/base.css
git commit -m "style: proportional font + improved sizes for body prose and headings"
```

---

## Task 6: Update spacing in `base.css`

**Files:**
- Modify: `assets/css/base.css`

- [ ] **Step 1: Increase terminal body padding**

Find `.terminal-body` in `base.css` (around line 546). Update `padding`:

```css
.terminal-body {
  flex: 1;
  padding: 1.25rem;   /* was 0.75rem */
  font-size: 0.9rem;
  color: var(--accent-bright);
  /* text-shadow already removed in Task 4 Step 2 */
}
```

Note: `text-shadow` was removed from this rule in Task 4. Do not re-add it. `color` stays — theme files override it with their palette.

- [ ] **Step 2: Increase card padding and grid gap**

Find `.card` in `base.css`:

```css
.card {
  /* ... existing properties ... */
  padding: 1rem;       /* was 0.75rem */
  /* ... */
}

.card-grid {
  /* ... existing properties ... */
  gap: 1rem;           /* was 0.75rem */
}
```

- [ ] **Step 3: Increase main panel gap**

Find `.main-panel` in `base.css`:

```css
.main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;    /* was 0.5rem */
}
```

- [ ] **Step 4: Update mobile padding override**

`base.css` has a media query at `@media (max-width: 600px)` that overrides `.terminal-body` padding to `0.6rem`. Update it proportionally:

```css
@media (max-width: 600px) {
  .terminal-body {
    padding: 0.85rem;   /* was 0.6rem — keep proportional to desktop 1.25rem */
  }
  /* ... other mobile rules remain unchanged ... */
}
```

- [ ] **Step 5: Update post body margin**

Find `.post-body` in `base.css` (around line 1213):

```css
.post-body {
  margin-top: 1.25rem;   /* was 0.75rem */
}
```

- [ ] **Step 6: Verify spacing improvements in browser**

```bash
bundle exec jekyll serve --livereload
```

- Open a blog post. The content should have noticeably more breathing room inside the terminal frame.
- Cards on the Projects page should feel less cramped.
- The gap between the top-bar, content area, and status-bar should be slightly more generous.

- [ ] **Step 7: Commit**

```bash
git add assets/css/base.css
git commit -m "style: increase terminal body padding, card padding, and main panel spacing"
```

---

## Task 7: Update code block chrome in `base.css`

**Files:**
- Modify: `assets/css/base.css` (around lines 602–613, the `pre` and `code` rules)

`syntax.css` handles the `.highlight` wrapper. `base.css` handles `pre` and inline `code` fallbacks (for blocks that Rouge doesn't wrap, and for inline code spans).

- [ ] **Step 1: Update `pre` styles only — do not change inline `code`**

The spec only prescribes changes to block-level `pre` elements. Inline `code` spans are UI chrome and must stay unchanged (monospace, existing size from theme).

Find the existing rules. The `code, pre` shared rule sets `font-family: inherit` — leave that selector untouched. Only update the standalone `pre` rule:

```css
pre {
  background-color: rgba(0, 0, 0, 0.8);
  border: none;                                      /* remove old all-side border */
  border-left: 3px solid var(--accent-bright);       /* accent left border */
  border-radius: 0 3px 3px 0;
  padding: 1rem 1.25rem;                             /* was 0.5rem */
  line-height: 1.6;                                  /* new */
  font-size: 0.92rem;                                /* was 0.88rem — on pre only, not code */
  overflow-x: auto;
}
```

Do **not** change the `code, pre { font-family: inherit; font-size: 0.88rem; }` shared rule — that would change inline code size, which is out of spec.

However, fenced code blocks render as `<pre><code>…</code></pre>`, so the inner `<code>` element inherits the shared rule's `0.88rem` and ignores `pre`'s `0.92rem`. Fix this with a more-specific rule immediately after the `pre` block:

```css
pre code {
  font-size: inherit;  /* inherit from pre (0.92rem), not from code,pre shared rule */
}
```

This does **not** touch the `code, pre` shared rule and does not affect standalone inline `code` spans.

Note: `.highlight pre` in `syntax.css` (Task 2) already sets `font-size: 0.92rem` directly on `.highlight pre`, so Rouge-wrapped blocks are unaffected by this. This `pre` rule and `pre code` fix apply to plain non-highlighted blocks only.

- [ ] **Step 2: Verify code blocks not wrapped by Rouge still look correct**

Open a page with a plain `<pre>` block (not a fenced code block). It should have the left accent border and comfortable padding. It will not have coloured tokens since Rouge didn't process it — that is expected behaviour.

- [ ] **Step 3: Commit**

```bash
git add assets/css/base.css
git commit -m "style: update pre/code chrome (border-left accent, larger font, more padding)"
```

---

## Task 8: Clean `text-shadow` from `custom.css` and `theme-soft-matrix.css`

**Files:**
- Modify: `assets/css/custom.css`
- Modify: `assets/css/theme-soft-matrix.css`

These are the only two theme files with body/frame text-shadow overrides that need removing. The other three theme files either have no text-shadow overrides (`theme-enhanced-matrix.css`, `theme-neon-terminal.css`) or already set `text-shadow: none` (`theme-light-terminal.css`).

- [ ] **Step 1: Remove `.terminal-body` text-shadow from `custom.css`**

In `assets/css/custom.css`, find (around line 578):

```css
.terminal-body {
  color: #4dff88;
  text-shadow: 0 0 6px rgba(0,255,102,0.6);
}
```

Remove only the `text-shadow` line. Keep `color`. Result:

```css
.terminal-body {
  color: #4dff88;
}
```

- [ ] **Step 2: Remove body/frame text-shadow from `theme-soft-matrix.css`**

In `assets/css/theme-soft-matrix.css`, find (around line 30):

```css
body,
.terminal-frame,
.nav-panel,
.top-bar,
.status-bar {
  text-shadow: 0 0 2px var(--glow-color);
}
```

Remove only the `text-shadow` line. Keep the selector block (empty or with a comment). Result:

```css
body,
.terminal-frame,
.nav-panel,
.top-bar,
.status-bar {
  /* text-shadow removed: reading-first approach */
}
```

**Do not touch** the `.accent { text-shadow: 0 0 4px var(--glow-color); }` rule in the same file — that is intentional UI chrome glow and should remain.

- [ ] **Step 3: Verify both themes in browser**

Switch to the **Cyber Lab** theme (default). Prose text should be crisp. Switch to **Soft Matrix**. Same — crisp body text, accent elements still glow.

Use the theme selector in the nav sidebar to switch themes.

- [ ] **Step 4: Commit**

```bash
git add assets/css/custom.css assets/css/theme-soft-matrix.css
git commit -m "style: remove body/frame text-shadow overrides in cyber-lab and soft-matrix themes"
```

---

## Task 9: Final cross-theme verification

**Files:** None — verification only, no code changes.

- [ ] **Step 1: Serve the site**

```bash
bundle exec jekyll serve --livereload
```

- [ ] **Step 2: Check each theme systematically**

Use the theme selector in the sidebar to cycle through all five themes. For each theme, verify:

| Check | Expected |
|---|---|
| Body prose in a post | Proportional font, no glow, comfortable line spacing |
| Headings | Monospace, visually larger, good separation from body |
| Code block (fenced, with language) | Dark background, left green border, coloured tokens |
| Code block (no language hint) | Dark background, left green border, plain green text — no error |
| Nav links | Still monospace, small, glow on `>` prefix preserved |
| Frame border | `box-shadow` glow on panel borders still visible |
| Scanlines (all themes except Light Terminal) | Barely perceptible (opacity `0.02` set in Task 4) |
| Scanlines (Light Terminal only) | Slightly more visible — `theme-light-terminal.css` intentionally overrides to `0.05` / `0.03`. This is correct; do not "fix" it. |

Themes to check: **Cyber Lab**, **Enhanced Matrix**, **Soft Matrix**, **Neon Terminal**, **Light Terminal**.

- [ ] **Step 3: Check responsive layout**

Resize the browser to mobile width (<900px). The nav collapses to top; content fills full width. Verify prose and code blocks are still readable.

- [ ] **Step 4: Final commit if any small fixes were made**

```bash
git add -A
git commit -m "style: readability improvements — final cross-theme verification fixes"
```

---

## Done

All tasks complete. The site now has:
- Proportional body font for prose, monospace for UI and code
- Reading-first glow (body text crisp; UI chrome and headings retain glow)
- Near-invisible scanlines and noise
- Full Rouge syntax highlighting with the cyber colour palette
- More generous spacing throughout
