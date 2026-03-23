# Readability & Visual Clarity Improvements

**Date:** 2026-03-22  
**Approach:** CSS improvements + Jekyll Rouge syntax highlighting  
**Scope:** Text readability, glow/scanline reduction, code block highlighting, spacing  
**Out of scope:** Image placement (deferred), nav panel restructuring, new themes

---

## Problem

The site's CRT aesthetic applies effects uniformly — global `text-shadow` glow on all text, scanlines over the full viewport, and a single-colour code style with no syntax differentiation. This works for short glances but creates fatigue during actual reading sessions. Specific pain points identified:

- Body prose is monospace at `0.9rem` with `1.5` line-height — tight for long-form reading
- `text-shadow` is on `body`, `.terminal-frame`, `.nav-panel`, `.top-bar`, `.status-bar` — every character blooms
- Scanline overlay at `0.13` opacity noticeably reduces contrast
- Code blocks have no syntax differentiation; font size matches body; border feels undifferentiated
- Paragraph margin at `0.45rem` and terminal body padding at `0.75rem` make everything feel cramped

---

## Architecture

Five files touched:

| File | Change |
|---|---|
| `_config.yml` | Enable Rouge syntax highlighter |
| `assets/css/base.css` | Remove global text-shadow, fix typography, fix spacing |
| `assets/css/custom.css` + all `theme-*.css` files | Remove body/frame text-shadow overrides per-theme |
| `assets/css/syntax.css` *(new)* | Rouge token colours using the cyber palette |
| `_layouts/default.html` | Add `<link>` for `syntax.css` |

The existing CSS split is preserved: `base.css` owns structure/layout/typography, theme files own colour variables, `syntax.css` owns code highlighting. Nothing else is touched.

---

## Section 1 — Typography

**Body prose** (`.terminal-body p`, `.terminal-body li`, `.terminal-body blockquote`):
- Font: `system-ui, -apple-system, 'Segoe UI', sans-serif`
- Size: `0.9rem` → `1rem`
- Line-height: `1.5` → `1.75`
- Paragraph margin: `0.45rem` → `0.75rem` top/bottom

**Headings** (h1–h4) — stay monospace, the terminal aesthetic anchor:
- h1: `1.25rem` → `1.35rem`
- h2: `1.05rem` → `1.15rem`
- h3: `0.98rem` → `1.05rem`
- Add `margin-bottom: 0.65rem` on all headings
- Letter-spacing and `text-transform: lowercase` unchanged

**UI chrome** (nav links, badges, timestamps, status bar, footer):
- Stays monospace, stays at existing small sizes (`0.7–0.85rem`)
- No changes — these are interface elements, not reading material

**Code and `pre`** — stays monospace, handled in Section 3.

---

## Section 2 — Glow & Scanline Treatment

**Glow removed from (body text becomes crisp):**
- `text-shadow` removed from `body`, `.terminal-frame`, `.nav-panel`, `.top-bar`, `.status-bar` in `base.css`
- `text-shadow` removed from `.terminal-body` colour override in `custom.css` and all `theme-*.css` files

**Glow kept on (UI chrome retains presence):**
- Headings (h1–h4): subtle glow via theme colour — intentional accent
- `.nav-prefix` (the `>` symbol), `.brand-blink` (cursor), `.accent` class
- `.top-bar-status-indicator` (pulsing dot), `.top-bar-label`
- `box-shadow` on panel borders and frames — structural, unchanged

**Scanlines & noise:**
- `.scanlines-overlay` opacity: `0.13` → `0.02`
- `.noise-overlay` opacity: `0.08–0.12` → `0.04`
- CRT flicker animation: left in place, imperceptible at these overlay opacities

---

## Section 3 — Code Blocks & Rouge

**`_config.yml` additions:**
```yaml
highlighter: rouge
markdown: kramdown
kramdown:
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    block:
      line_numbers: false
```

**New `assets/css/syntax.css`** — cyber palette token colours:

| Token type | Colour | Covers |
|---|---|---|
| Default text | `#9de8b8` | Identifiers, plain text |
| Comments (`.c`, `.cm`, `.c1`, `.ch`) | `rgba(100,200,130,0.45)`, italic | `# comments`, `// comments` |
| Keywords (`.k`, `.kd`, `.kn`, `.kr`) | `#00e5ff` (cyan) | `if`, `for`, `def`, `import` |
| Strings (`.s`, `.s1`, `.s2`, `.si`) | `#ff9966` (orange) | `'quoted values'` |
| Numbers (`.m`, `.mi`, `.mf`, `.mh`) | `#bd93f9` (soft purple) | `192.168.1.0`, `8080` |
| Functions/names (`.nf`, `.na`, `.nb`) | `#4dff88` (bright green) | Command names, function calls |
| Operators/flags (`.o`, `.p`) | `#ffc53d` (amber) | `--flags`, `=`, `&&` |

**Code block chrome (in `base.css` and `syntax.css`):**
- Font size: `0.88rem` → `0.92rem`
- Line-height: add `1.6`
- Padding: `0.5rem` → `1rem 1.25rem`
- Border: replace all-side border with left accent only — `border-left: 3px solid var(--accent-bright)`, other sides removed
- `.highlight` wrapper (Rouge's generated div): inherits dark background and border-radius from `pre`

**`_layouts/default.html`:** One additional `<link rel="stylesheet">` for `syntax.css`, loaded after `base.css`.

---

## Section 4 — Spacing & Density

**Terminal body:**
- Padding: `0.75rem` → `1.25rem`

**Paragraphs & lists:**
- Paragraph margin: `0.45rem` → `0.75rem` top/bottom
- List items: add `0.3rem` gap between items
- Blockquote: `0.5rem` left padding + left accent border

**Headings:**
- `margin-top: 1.5rem` on h2 and h3 when following body content
- `margin-bottom: 0.65rem` on all headings

**Cards:**
- Card padding: `0.75rem` → `1rem`
- Card grid gap: `0.75rem` → `1rem`
- Card body text: receives same proportional font as `.terminal-body` prose

**Main panel:**
- Gap between top-bar / content / status-bar: `0.5rem` → `0.75rem`

**Post layout:**
- `.post-body` top margin: `0.75rem` → `1.25rem`

**Unchanged:**
- Nav panel width (260px)
- Overall max-width (1200px)
- Page shell padding and gap

---

## Error Handling & Edge Cases

- **Themes other than cyber-lab:** Each `theme-*.css` file has its own `text-shadow` overrides on body/frame selectors. All must have the body/frame text-shadow removed to match the reading-first approach. The `base.css` removal handles the structural override; per-theme files need individual cleanup.
- **Rouge not available on GitHub Pages:** Rouge is a supported highlighter on GitHub Pages and requires no additional gem installation. The `highlighter: rouge` setting is sufficient.
- **Fenced code blocks without language hint:** Rouge falls back to plain text tokenisation — the default `#9de8b8` text colour applies. No breakage.
- **Inline `code` spans:** Not processed by Rouge. Will retain existing styling (monospace, accent colour from theme). No change needed.
- **Light terminal theme:** The light theme uses a light background — the syntax token colours chosen (cyan, orange, amber, soft purple) have enough contrast against light backgrounds to remain legible without a separate light-mode syntax sheet. Verify visually after implementation.

---

## Out of Scope

- Image placement improvements (deferred to a future session)
- Reading mode toggle (considered as Approach 3, not selected)
- Nav panel restructuring or sizing changes
- New theme creation
