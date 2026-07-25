# JamieLab Website Improvement Handoff

## Task prompt for Codex

Review and improve the JamieLab website using the findings below. Preserve its terminal/cyber-lab identity while improving content quality, navigation, accessibility, and the visibility of Jamie's strongest work.

Before making changes:

1. Read the repository's `AGENTS.md` or `CLAUDE.md`.
2. Inspect the existing implementation and determine the framework and build commands.
3. Preserve the current visual identity, theme system, terminal interaction, and existing user content unless a finding below explicitly calls for removal or revision.
4. Prefer small, focused components and files rather than adding more logic to a monolithic file.
5. Verify changes at desktop and mobile widths, with keyboard navigation, reduced motion, and at 200% browser zoom.
6. After implementation, run the relevant checks and create an implementation summary in the repository's `docs` folder.

Live site reviewed: <https://jamielab.me/>

Pages directly reviewed:

- `/`
- `/projects/`
- `/homelab/`
- `/tools/`
- `/blog/`
- `/about/`

The reviewer did not modify the website.

## Product direction

The site already has a memorable and coherent terminal aesthetic, substantive project material, working metadata, useful browser tools, and a clear personal voice. The central improvement is to make the strongest evidence of Jamie's work easier to discover beneath the atmosphere.

Do not turn the site into a generic portfolio template. Retain the console concept, typography, themes, and playful controls. Improve the information hierarchy around them.

## Priority 0: Remove credibility leaks

Address these before larger redesign work:

- Remove, hide, or finish the blog entry titled `Post title here`.
- Remove the placeholder tags `tag1`, `tag2`, and `tag3`.
- Review `Blogpost Homelab`; its title and excerpt currently appear draft-like.
- Review `Tech Trends`; its excerpt reads like an article outline rather than a finished post.
- Replace or disable unfinished homelab links that currently point to `#`:
  - `Firewall notes →`
  - `ACL plan →`
  - `Dashboards →`
- Change the back-to-top link from `href="#"` to a real target such as `#top`.

### Acceptance criteria

- No visible production content looks like template or placeholder material.
- No apparent content CTA navigates to an empty fragment.
- Draft content is either completed, explicitly labeled as a draft, or excluded from production listings.

## Priority 1: Surface proof of work on the homepage

Add a compact featured-work section immediately after the homepage introduction. It should present:

- Two or three flagship projects, preferably selected from:
  - Fort Knox LAN
  - ThreatStream Lite
  - ChatArchive
  - VaultWarden BYOPM
- One recent, strong technical article.
- Clear actions such as `View project`, `Read write-up`, `View source`, or `Open demo`.

The goal is to let a recruiter, collaborator, or technical visitor identify Jamie's capabilities without first exploring the full navigation.

### Acceptance criteria

- At least two strong projects are visible within the first two typical desktop viewports.
- Each featured item has a concise outcome-oriented description.
- Calls to action are consistent and point to working destinations.
- The section fits the existing console visual language.

## Priority 2: Simplify navigation

The desktop sidebar currently exposes roughly fifteen destinations. Its final entries sit near or below the viewport fold, and theme/effect controls compete with primary navigation.

Explore grouped navigation such as:

- Work
  - Projects
  - Homelab
  - Timeline
- Knowledge
  - Blog
  - Notes
  - Archive
- Lab
  - Tools
  - Security Tools
  - CVE Tracker
  - CTF
  - Playground
  - Live Demo
- About

Move theme, rain, light/dark mode, and other visual preferences into a distinct `Console settings` area or popover. Consider allowing the desktop sidebar to collapse.

### Acceptance criteria

- Primary destinations remain discoverable with fewer simultaneously visible items.
- The current page has an unmistakable active state.
- The complete navigation remains usable on short laptop displays and at 200% zoom.
- Settings are visually and semantically separated from navigation.
- Mobile navigation supports keyboard and screen-reader use.

## Priority 3: Improve project storytelling

Turn the most important project pages into concise technical case studies. Use a reusable structure:

1. Problem or motivation
2. Role and ownership
3. Architecture
4. Technical decisions and tradeoffs
5. Security considerations
6. Screenshots, demo, or architecture diagram
7. Problems encountered and lessons learned
8. Results or current status
9. Repository/live-demo links when public
10. Next steps

Fort Knox LAN, ThreatStream Lite, ChatArchive, and VaultWarden BYOPM are especially suitable.

Use sanitized architecture diagrams where exact network details would be sensitive.

### Acceptance criteria

- At least three flagship projects follow a consistent case-study structure.
- Project descriptions explain outcomes, not only technologies.
- Status and update dates are meaningful and current.
- Each page ends with an obvious next action.

## Priority 4: Accessibility and usability

The live review identified these implementation concerns:

- The theme `<select>` did not expose an apparent accessible name. Add a visible label or an accessible name such as `Select theme`.
- The rain toggle should expose its state using `aria-pressed`.
- Non-form buttons should explicitly use `type="button"` rather than relying on the default `submit` type.
- Several animated headings appeared in the DOM as partial words during inspection, including `Pro`, `To`, and `Abou`. If headings are typed character by character, ensure screen readers receive a stable complete heading rather than the animated partial text.
- Add strong, theme-appropriate `:focus-visible` styles.
- Respect `prefers-reduced-motion` for typing, rain, glow, cursor, and other animated effects.
- Offer a persistent reduced-effects preference if practical.
- Slightly increase body-text readability through font size, line height, contrast, or panel spacing without losing the terminal atmosphere.
- Verify the sidebar and content at narrow laptop heights and 200% zoom.
- Make project cards fully clickable if this can be done without nested interactive-control problems.

### Acceptance criteria

- Every interactive control has an accessible name.
- Toggle states are announced programmatically.
- Heading hierarchy contains complete, stable text for assistive technology.
- All functions can be reached and used with a keyboard.
- Focus indicators are clearly visible in every theme.
- Reduced-motion mode removes nonessential animation.
- No horizontal scrolling is required at 320 CSS pixels or at 200% zoom under normal content conditions.

## Priority 5: Content and conversion improvements

Enhance the About page with a clearer professional path:

- GitHub
- Résumé
- LinkedIn, if Jamie wants it public
- Direct contact option
- Short statement of current goals or desired opportunities

Standardize project-card calls to action. Existing labels include `View notes`, `Runbook draft`, and `Project details`; adopt a small consistent vocabulary based on actual destination type.

Consider these later additions:

- A sanitized homelab/network topology diagram
- A `Now` page showing current projects and learning
- Search across projects, notes, and blog posts
- Project filtering by technology, category, and status
- Short demo videos or animated screenshots
- Related posts/projects at the end of articles
- Copyable commands with explanations of what they change
- A security disclosure page and `/.well-known/security.txt`
- `Last reviewed` dates on technical tutorials
- Sanitized public service-status widgets

## Existing strengths to preserve

- Strong and coherent cyber-lab identity
- Useful theme selection and playful terminal interactions
- Good page-specific meta descriptions
- Canonical URLs
- Open Graph metadata
- Image alternative text
- Structured data
- RSS support
- Browser-only utilities that state no data is transmitted
- Project status indicators and technology tags
- Friendly, recognizable personal voice

No console warnings or errors were observed during the reviewed session.

## Suggested implementation sequence

1. Remove placeholders and repair dead fragment links.
2. Address control semantics, stable headings, focus styles, and reduced motion.
3. Add featured work to the homepage.
4. Group navigation and separate console settings.
5. Upgrade the three strongest project pages into case studies.
6. Improve the About page's professional links and calls to action.
7. Add search/filtering and optional richer lab visualizations.

## Verification checklist

- Run the repository's formatter, lint, tests, and production build.
- Verify the homepage and all primary navigation destinations.
- Check every visible CTA for a valid destination.
- Test at representative widths around 320, 768, 1024, and 1440 CSS pixels.
- Test a short-height desktop viewport.
- Test at 200% browser zoom.
- Navigate the entire interface using only Tab, Shift+Tab, Enter, Space, and Escape.
- Verify visible focus in every available theme.
- Test with `prefers-reduced-motion: reduce`.
- Check heading order, landmarks, control names, and toggle state with an accessibility inspector.
- Confirm theme and effects preferences persist as intended.
- Confirm draft or placeholder posts are absent from listings, tags, RSS, and archive pages.
- Confirm the production build has no new browser console warnings or errors.

## Expected implementation handoff

When finished, report:

- Files changed
- Findings completed
- Findings deferred and why
- Screenshots or descriptions of desktop/mobile results
- Accessibility checks performed
- Commands run and their results
- Any content decisions Jamie still needs to make

