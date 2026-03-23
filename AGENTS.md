# AGENTS.md

## Learned User Preferences

- Prefers the visual companion browser tool when making design decisions — show rendered mockups rather than describing options in text.
- Gives minimal verbal responses ("yes", "okay", "picked one") and relies on browser click events to communicate visual choices; always check `.events` file before interpreting a vague reply.
- Prefers the brainstorming skill's section-by-section approval flow for design work — present one section at a time and wait for confirmation before continuing.
- Image placement improvements on the site are a noted future task (deferred from the readability redesign session).

## Learned Workspace Facts

- Jekyll site hosted on GitHub Pages at jimjamscott22.github.io; uses kramdown as the Markdown processor.
- CSS architecture: `base.css` owns structure, layout, and typography; `theme-*.css` files own colour variables; `custom.css` holds the default (cyber-lab) theme overrides. Keep this split clean when editing styles.
- Default theme is `theme-cyber-lab.css` (green-on-black CRT aesthetic). Other themes: `theme-enhanced-matrix.css`, `theme-soft-matrix.css`, `theme-neon-terminal.css`, `theme-light-terminal.css`. Theme is swapped at runtime via `assets/js/theme-switcher.js`.
- Content collections: `_posts/`, `_notes/`, `_projects/`, `_info/`. Layout template is `_layouts/default.html`; post layout is `_layouts/post.html`.
- Mermaid.js loaded via CDN for diagrams; Giscus used for comments; interactive CLI terminal via `assets/js/terminal.js`.
- Approved readability design direction: glow reserved for headings and UI chrome only (not body prose); scanlines and noise overlays reduced to near-invisible; no `text-shadow` on body, nav panel, or terminal frame.
- Approved readability design direction: body prose uses a proportional system font (`system-ui, -apple-system, 'Segoe UI', sans-serif`); monospace kept for code blocks, nav links, badges, timestamps, and all UI chrome.
- Approved readability design direction: full syntax highlighting for code blocks using cyber palette — green for commands/functions, amber for flags/operators, orange for strings, cyan for keywords, dimmed italic for comments.
