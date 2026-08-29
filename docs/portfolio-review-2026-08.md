# Portfolio Review — jamielab.me

**Date:** 2026-08-29
**Scope:** Full site review of the Jekyll source in this repository, plus a
production build (`bundle exec jekyll build JEKYLL_ENV=production`) and an
HTMLProofer pass over `_site`.
**Question asked:** what would make this read as a *portfolio* rather than a
*homelab playground* — while keeping the playground pages and code editor.

This document is findings and proposals only. No site files were changed.

---

## The diagnosis in one paragraph

The site is not short on work. It is short on *evidence presented as work*.
Everything a visitor needs in order to conclude "this person can build things"
exists somewhere in the repository — but it is stored as scaffolding, not as
finished argument. Seven project pages average **160 words** and contain **29
empty HTML-comment placeholders** between them. Exactly **one** project links to
source code. The homepage shows a portrait, a desk figurine and a stock-looking
workstation photo, and no work at all. Meanwhile the genuinely impressive
engineering — a browser-based Python/JS code runner, a 650-line tool suite, an
822-line terminal emulator, an eight-theme design system — is framed as *toys
for the visitor to play with* rather than *software Jamie wrote*. The playground
is not the problem. The problem is that the playground is the only thing on the
site that is actually finished, and it isn't credited as a project.

So the shift you're asking for is mostly **not** about removing lab content. It
is three moves:

1. **Finish the front door.** Homepage and project pages must state outcomes,
   not statuses.
2. **Re-rank the navigation.** Right now Projects is 1 of 15 equal-weight links;
   ten of the fifteen are lab surfaces.
3. **Reclassify the lab as evidence.** The playground, tools, terminal, CVE
   tracker and this site itself are portfolio artifacts. Give each one a project
   page with a repo link, and the "playground" stops competing with the
   portfolio and starts feeding it.

---

## 0. Fix first — verified defects

These are confirmed from the build output, not inferred. Several are actively
costing credibility with the exact audience a portfolio is for.

### 0.1 `site.pages` is shadowed — every landing page is missing from the sitemap

`_config.yml` declares a collection literally named `pages`:

```yaml
collections:
  pages:
    output: true
```

There is no `_pages/` directory, and declaring a collection with that name
shadows Jekyll's built-in `site.pages`. `sitemap.xml` loops over `site.pages` to
emit static pages, so that loop yields **nothing**.

Verified: the built `_site/sitemap.xml` contains the homepage, posts, and the
`projects`/`notes`/`info` collections — and **zero** landing pages. `/projects/`,
`/about/`, `/blog/`, `/tools/`, `/homelab/`, `/timeline/`, `/playground/`,
`/archive/`, `/ctf/`, `/cve-tracker/`, `/security-tools/` are all absent. I
confirmed causation by temporarily removing the `pages:` collection and
rebuilding — all of them reappeared.

The `/projects/` index — the single page you most want indexed — is not in your
sitemap.

**Fix:** delete the `pages` collection block. It also serves no purpose: the
`defaults` entry scoped to `path: "_pages"` targets a directory that does not
exist.

### 0.2 Repository internals are published to the public domain

Because Jekyll processes root and `docs/` Markdown, these are live and
crawlable (`robots.txt` is `Allow: /`):

| Live URL | What it is |
|---|---|
| `jamielab.me/CLAUDE.html` | AI agent instructions for this repo |
| `jamielab.me/AGENTS.html` | Notes on the site owner's working preferences |
| `jamielab.me/THEMES.html` | Internal theme spec |
| `jamielab.me/docs/jamielab-website-improvement-handoff.html` | A prior consultant's full critique of this website's weaknesses |
| `jamielab.me/docs/REVIEW_SUMMARY.html` | Another internal review |
| `jamielab.me/docs/PERFORMANCE_STYLE_REVIEW.html` | Another internal review |
| `jamielab.me/docs/futureUpgadesPlanned.html` | Unbuilt backlog (also a typo in the filename) |
| `jamielab.me/api/create-project.js` | Raw serverless function source |
| `jamielab.me/api/README.md` | Its setup docs |

A hiring manager who finds `/docs/jamielab-website-improvement-handoff.html`
reads a point-by-point list of everything wrong with the site, written by
someone else. **This document will be in that same folder — exclude the folder
before merging anything.**

**Fix:** add to `_config.yml`:

```yaml
exclude:
  - docs/
  - api/
  - CLAUDE.md
  - AGENTS.md
  - THEMES.md
  - README.md
  - Gemfile
  - Gemfile.lock
  - bin/
```

### 0.3 Every social share renders a broken image

`_layouts/default.html:43` and `:54` set the Open Graph and Twitter Card image
fallback to `/img/my_profile.webp`. **That file does not exist in `img/`.**

Every link to this site posted on LinkedIn, Slack, Discord or X — i.e. every
time you share your portfolio — renders with a blank or broken preview card.

**Fix:** point the fallback at a real file and add a purpose-built 1200×630 OG
card. Also switch `twitter:card` from `summary` to `summary_large_image`.

### 0.4 CI is red on `main`

HTMLProofer, run with the same flags as `.github/workflows/link-checker.yml`,
fails:

```
internal image /img/7osi_layers2.jpg.jpg does not exist
  at _site/info/osi-model/index.html:245
```

(The other hit, `http://pi.hole/admin`, is already ignored by the workflow.)

A red badge on the repo backing your portfolio is a bad first impression for
anyone who clicks through to the source. Note the doubled extension —
`.jpg.jpg` — suggests a rename that was never followed through.

### 0.5 A blank template post is live

`_posts/2026-12-31-blog-template.md` publishes at
`/blog/2026/01/09/blog-template/` (the front-matter date wins over the
filename), titled **"Post title here"**, tagged `tag1`, `tag2`, `tag3`. It is
in the blog listing, the archive, the timeline, the RSS feed and the search
index. Flagged in the previous handoff; still present.

**Fix:** move it to `_drafts/`.

### 0.6 Three posts have no front matter

`2026-01-14-tech-trends.md`, `2026-01-18-vaultwarden-backup-solution.md` and
`2026-02-25-blogpost-homelab.md` begin with a Markdown heading, not `---`.

Jekyll still publishes them, but with a slug-derived title, no description, no
tags, and a second `<h1>` from the body heading. Verified in the build:

- `Vaultwarden Backup Solution` (should be *"Self-Hosting Vaultwarden on a
  Raspberry Pi (With a Disaster-Recovery Fallback)"*)
- `Blogpost Homelab`
- `Tech Trends`

Each renders **two `<h1>` elements**, has an empty `<meta name="description">`,
and appears in no tag filter or related-posts block.

This matters more than it sounds: **the Vaultwarden self-hosting piece is the
single best writing on the site** — a real project, a real threat model, a real
disaster-recovery design — and it is currently titled after its filename and
excluded from every discovery surface.

### 0.7 Three homelab CTAs go nowhere

`homelab.md:30`, `:45`, `:64` — "Firewall notes →", "ACL plan →", "Dashboards →"
all point at `href="#"`. Also flagged previously; still present. A card that
promises detail and delivers a page jump is worse than a card with no link.

### 0.8 The CTF section is a single page that announces it's a demo

`_ctf/sample-sqli-login-bypass.md` is the only entry, and its body opens:

> **Note:** This is a sample write-up to demonstrate the CTF section. Replace or
> delete it once you add your own.

It has a top-level nav slot. Either write one real CTF or remove the section.

### 0.9 The status dashboard reports fabricated health

`projects.md` renders `health` and `uptime_pct` badges from front matter. All
seven projects are hardcoded `health: healthy`, including **Pi cluster, which
has `status: planned`** — a project that does not exist is reported as healthy.
No project sets `uptime_pct`, so that badge never renders.

A technically literate reviewer reads a green dot next to a planned project as
either decoration or dishonesty. Neither helps. Same problem with the sitewide
footer: `IFCONFIG: homelab up | tailscale active | pihole filtering` is a static
string on every page, including this one.

**Fix:** drop `health`/`uptime_pct`, or wire them to something real. Keep
`status` — that one is honest.

### 0.10 `/project-admin/` is a public token prompt

`project-admin.md` is not in the nav but is publicly reachable, and presents an
"Admin Token" password field. `site.project_admin_api_url` is empty, so it
posts nowhere. A public page soliciting a credential — even a dead one — is a
bad look on a security-focused portfolio.

**Fix:** exclude it from the build, or gate it behind a local-only workflow.

### 0.11 `/live-demo/` is an unrelated artifact bundle

`live-demo.html` is 51 KB of `layout: null` bundler output titled **"Bundled
Page"**. It renders outside the site chrome entirely, is `sitemap: false`, and
has a top-level nav slot between "playground" and "blog". Whatever it was, it no
longer reads as part of the site.

### 0.12 Minor

- **Missing `<h1>` on three project pages.** `chatarchive`, `pytyping` and
  `vaultwarden-byopm` omit the `# Title` line, so their content starts at `<h2>`.
  The page title only appears in the terminal chrome. Broken heading hierarchy
  on your three most-developed project pages.
- **`README.md` links are broken.** It points to `FEATURES.md` and
  `THEME_GUIDE.md` at the repo root; both moved to `docs/`.
- **`back-to-top.js:7`** still uses `href="#"` (previously flagged).
- **Date drift.** `chatarchive.md` says `last_updated: 2025-12-15` but embeds a
  screenshot named `CArchive-08-26-2026.png`. `pytyping.md` says `2025-08-30` —
  a year stale. `2026-01-15-gpu-setup-guide.md` carries a front-matter date of
  `2025-12-24`. Hand-maintained dates always drift; derive them or drop them.

---

## 1. Navigation — the ratio problem

The sidebar has **15 links**, flat, all equal weight:

```
home · projects · homelab · timeline · notes · info · tools · cve tracker
sec tools · ctf · playground · live demo · blog · archive · about
```

Two of those fifteen (`projects`, `about`) are portfolio surfaces. Ten are lab
surfaces. That ratio *is* the answer to your question — the site tells visitors,
structurally, that it is a lab with a projects page attached.

Below the links sit a matrix-rain toggle, an eight-option theme picker and a
light/dark toggle, so on a laptop the last nav items and the settings compete
for the fold.

**Proposal — five top-level destinations, settings separated:**

```
> work            → /work/     (projects, case studies — the landing page)
> writing         → /blog/     (blog + archive + notes folded in)
> lab             → /lab/      (hub: playground, tools, terminal, CVE tracker,
                                security tools, CTF, homelab, timeline)
> about           → /about/    (bio, skills, résumé, contact)
> résumé          → /resume/   (or a direct PDF link)

[ console settings ]  ← collapsed popover: theme, rain, light/dark
```

`/lab/` becomes a real page rather than a dropdown — a short intro plus cards
for each lab surface. That keeps every playground page one click from anywhere,
gives the lab a coherent identity instead of nine scattered nav entries, and
frees the top level for work.

Two things to add while you're in there: a visible **active state** for the
current page, and a **skip-to-content link** (`#main-content` already exists as
a target in `_layouts/default.html`, but nothing links to it).

---

## 2. The project system — the biggest lever

This is where the portfolio is won or lost, and it currently has three separate
structural problems.

### 2.1 Project pages are outlines, not case studies

| Page | Words | Empty placeholder sections | Repo link |
|---|---|---|---|
| `vaultwarden-byopm` | 349 | 9 | — |
| `pihole-dns` | 174 | 5 | — |
| `chatarchive` | 149 | 0 | ✅ |
| `pytyping` | 137 | 0 | "(add link when ready)" |
| `threatstream-lite` | 120 | 4 | — |
| `pi-cluster` | 114 | 6 | — |
| `fort-knox-lan` | 104 | 5 | — |

Those placeholders are HTML comments *under real rendered headings*. So
`/projects/fort-knox-lan/` shows a visitor five headings — "Network
Architecture", "pfSense Configuration", "Ansible Playbooks", "Testing &
Validation", "Troubleshooting" — each followed by nothing at all. An empty
heading is worse than an absent one: it advertises exactly what you haven't
finished.

Every page also opens by restating `**Status:** Building` and `**Tags:** ...` in
prose, duplicating front matter the layout already has.

**Proposal:** a `_layouts/project.html` and a consistent case-study spine.

```
Problem        — what was broken or missing, in two sentences
Role           — what you personally built vs. configured vs. adapted
Approach       — architecture, with a sanitized diagram
Decisions      — 2-3 real tradeoffs, with the option you rejected and why
Result         — what changed, measured if possible
Lessons        — what you'd do differently
Links          — source, demo, related write-up
```

The "Decisions" section is what separates a portfolio from a runbook. *"Chose
SQLite over Postgres because the deployment target is a single Pi and the write
volume is one import per week; the cost is no concurrent writers, which is fine
for a single-user archive"* — that sentence does more hiring work than the
entire current ChatArchive page.

Also, **delete the sections you can't fill.** A 300-word page with five complete
sections beats a 300-word page with five complete and nine empty ones.

### 2.2 The projects index is maintained in two places

`projects.md` renders a Liquid dashboard over `site.projects` **and then**
hand-written HTML cards for the same projects. They have already diverged:

- **Oswego Pi Web** exists only as a hardcoded card. It is not in the collection,
  so it is missing from the dashboard, the timeline, the sitemap and search.
  This is your *first deployed site on real hosting* — genuinely good portfolio
  material — and it is invisible to every automated surface.
- **Pi cluster** is in the dashboard with no card.
- CTA labels are inconsistent across cards: "View notes →", "Runbook draft →",
  "Project details →", "Blocklists & metrics →", "Visit site →".
- A `crud_infographic.png` sits inside the "Status Dashboard" block, unrelated to
  any project's status.

**Proposal:** one Liquid loop over `site.projects`, sorted by an explicit
`weight` field, with `featured: true` controlling the top row. Adding a project
becomes: create one file. Add filtering by `tech_stack` — the data is already in
front matter and currently unused for anything but display.

### 2.3 The portfolio is 5:2 infrastructure-to-software, and the software is buried

Current mix: Fort Knox LAN, Pi-hole, Pi cluster, VaultWarden, ThreatStream Lite
(infra/security) vs. ChatArchive, PyTyping (software).

You are finishing a BA in Information Science and the About page says *"I like
building all different types of software projects."* The site does not
demonstrate that. ChatArchive (FastAPI + React + TypeScript + SQLite) is the
most portfolio-relevant thing in the collection and it sits fourth in the grid
with a 149-word page.

**Proposal — promote these to first-class project pages:**

| Candidate | Evidence already in the repo | Why it belongs |
|---|---|---|
| **Code Playground** | `playground.js` (849 lines) + a pre-bundled CodeMirror build | A browser-only multi-language runtime: CodeMirror editor, Pyodide/WASM Python, sandboxed JS eval, shareable snippets. This is the most technically interesting thing on the site. |
| **Browser tool suite** | `tools.js` (658 lines) | Password generator with strength scoring, encoders, converters — all client-side, explicitly no data transmitted. That privacy claim is a design decision worth writing up. |
| **Terminal emulator** | `terminal.js` (822 lines) | Command parsing, history, output rendering. Commit `65e2572` hardened it against DOM XSS — **that is a security case study you already did and never wrote down.** |
| **jamielab.me itself** | This whole repo | Jekyll, 5 collections, 8 themes on CSS custom properties with `localStorage` persistence, client-side search, CI link checking. Meta, but every developer portfolio benefits from "here's how this site works". |
| **Oswego Pi Web** | Live at `cs.oswego.edu` | Real hosting, real Linux permissions, real Apache. Promote from hardcoded card to collection entry. |

That single change flips the ratio to roughly 6:5 software-to-infrastructure,
and — this is the important part — **it does it without deleting a single lab
page.** The playground stays exactly where it is and gains a case-study page
pointing at it. You asked to keep the playground; this makes keeping it the
argument rather than the liability.

### 2.4 Nothing links to source

One project of seven links to a repo. No live demos are linked. For a software
portfolio this is the most-clicked link that doesn't exist.

**Proposal:** add `repo:`, `demo:` and `writeup:` to project front matter and
render them as consistent buttons in `_layouts/project.html`. Where a repo is
private or unfinished, say so explicitly ("source private — happy to walk
through it") rather than "(add link when ready)".

---

## 3. The homepage shows no work

`index.md` in full is: an ASCII-ish console heading, a typewriter line, three
lines of status flavour, a profile card, and a section headed **"Featured
image"** containing a workstation photo and a photo of a desk figurine.

A visitor who lands here and leaves after eight seconds — which is most of them
— learns that Jamie likes neon terminals. They see no project, no skill, no link
to work.

The profile copy is *"security tinkerer, homelab wrangler, and curator of this
console."* Charming, and it says nothing about capability or what you're looking
for.

**Proposal — keep the console aesthetic, change what's inside the frame:**

1. **Identity line.** Who you are, what you build, what you want. Something like:
   *"Jamie — Information Science BA (SUNY Oswego, 2026). I build self-hosted
   security tooling and full-stack apps, and I document how they work.
   Currently looking for [X]."* One sentence beats a paragraph of atmosphere.
2. **Featured work — three cards, above the fold.** ChatArchive, VaultWarden
   BYOPM, Code Playground. Each with one outcome sentence, not a tech list.
   Consistent CTAs: `Case study →` / `Source →`.
3. **Latest write-up — one card.** The Vaultwarden self-hosting post (once it has
   front matter) or the Raspberry Pi backup post. Both are genuinely good.
4. **Then** the personality: profile card, photos, status flavour. Keep all of
   it — just below the proof, not instead of it.

The "Featured image" heading should go regardless. It labels a decorative photo
as though it were content.

---

## 4. About → a page someone can act on

`about.md` currently has: two paragraphs, a stack list, a focus-areas list, a
Formspree form, and two photos (the site owner and the site owner's dog).

Missing, and all of it standard for a portfolio:

- **A résumé.** No link, no PDF, no `/resume/` page. `docs/futureUpgadesPlanned.md`
  lists "JSON Resume" as an idea; it was never built. This is the single highest-
  value addition to the site.
- **LinkedIn**, if you want it public.
- **A visible email address.** A form is a dead end for a recruiter who wants to
  forward your details to a colleague.
- **Graduation date and availability.** "Currently finishing my BA" doesn't say
  when, and timing is the first thing a hiring manager needs.
- **GitHub link.** It exists as a small icon in the sidebar footer only.
- **Skills mapped to evidence.** The stack list names pfSense, Docker, k3s,
  Ansible, Terraform, Prometheus, Grafana, Python, Bash — with nothing linking
  any of them to a project that proves it. Link each skill to the page where you
  used it. Unlinked skill lists read as aspiration; linked ones read as
  inventory.

Keep the dog. Keep the voice. Add the machinery that lets someone hire you.

---

## 5. Content triage

15 posts. They fall into three very different groups, and mixing them is
diluting the good ones.

**Genuinely strong — lead with these:**
- *Self-Hosting Vaultwarden on a Raspberry Pi (With a Disaster-Recovery
  Fallback)* — real project, real threat model, real design. Needs front matter.
- *Backing Up a Raspberry Pi Home Directory (Without Hoarding 15 GB Forever)* —
  concrete before/after (15 GB → 4.6 GB), a real problem, a measured result.
  This is exactly the shape every post should have.

**Solid practical runbooks — keep:** SSH setup, UFW rules, Nginx, reverse proxy,
DNS troubleshooting, dev machine setup.

**Generic content that dilutes the rest:**
- *Tech Trends* — publishes as an unedited outline, complete with a "HEADLINES"
  block listing five alternative titles. Currently live.
- *From Scratch to Success: Learning the Fundamentals of Java Programming*
- *The #1 Way to Build a Standout Mobile App: With Flutter*
- *Setting up a new GPU* — a consumer graphics-card install guide
- *Post title here* — the template

These read as SEO filler, and their presence makes a reader wonder which of the
good posts are also filler. **Recommendation:** move them to `_drafts/`. Nothing
is deleted; they stop appearing in listings, RSS, search, timeline and sitemap.

**On `_info/` (11 pages).** Big-O, sorting algorithms, Java basics, Python
basics, design patterns, git commands. These are study notes — useful to you,
and they read as *a student revising* rather than *an engineer demonstrating*.
Don't delete them; relabel the section "Study notes", move it under `/lab/`, and
take it out of the top-level nav. The OSI page also carries the one broken image
failing CI.

---

## 6. Trust and polish

- **One professional photo.** The site currently uses `pro-hacker-jamie-2.jpg`
  (home), `cyberme.JPG` and `hackerdog.PNG` (about), plus `mini_me.JPG` (a desk
  figurine) and `jamiehacker.PNG`. Pick one clear headshot for the profile card
  and the OG image; keep the rest as personality below the fold.
- **Meaningful `last_updated`.** Either derive from git or remove — a stale date
  is worse than no date.
- **Standardize CTA vocabulary.** `Case study →` (internal write-up),
  `Source →` (repo), `Live demo →` (running thing), `Read →` (post). Four verbs,
  used consistently.
- **`prefers-reduced-motion`.** The typewriter, matrix rain, scanlines and glow
  should all respect it. Currently only the typewriter caret does
  (`_layouts/default.html`, inline `<style>`).
- **`:focus-visible` styles** across all eight themes — carried over from the
  previous handoff; worth confirming.
- **`type="button"`** on non-submit buttons, so a stray button inside the contact
  form can't submit it.
- **Consider `CNAME`/canonical consistency.** Canonicals point at `jamielab.me`;
  make sure `jimjamscott22.github.io` redirects rather than serving a duplicate.

---

## 7. Suggested sequence

**Phase 1 — stop the bleeding (small, high impact)**
1. `exclude:` internal docs, `api/`, `CLAUDE.md`, `AGENTS.md`, `README.md`
2. Remove the `pages` collection → sitemap covers the site again
3. Fix the OG image; add a real 1200×630 card
4. Fix `7osi_layers2.jpg.jpg` → CI green
5. Add front matter to the three posts missing it
6. `_drafts/` the template post and the four generic posts
7. Fix or remove the three `href="#"` homelab CTAs
8. Exclude `/project-admin/` and `/live-demo/`

**Phase 2 — build the portfolio spine**
9. `_layouts/project.html` with the case-study structure and repo/demo buttons
10. Rewrite the top three projects as real case studies (ChatArchive, VaultWarden
    BYOPM, Code Playground)
11. Delete unfillable placeholder sections everywhere else
12. Collapse `projects.md` to a single Liquid loop; add Oswego Pi Web to the
    collection; add tech filtering

**Phase 3 — the front door**
13. Homepage: identity line + three featured projects + latest write-up
14. About: résumé, LinkedIn, email, graduation date, skills linked to evidence
15. `/resume/` page plus a PDF

**Phase 4 — reframe the lab**
16. `/lab/` hub page; collapse the nav to five top-level items
17. Case-study pages for the tool suite, terminal (including the XSS hardening),
    and the site itself
18. Retire fabricated health/uptime indicators

---

## Appendix — how these findings were verified

```bash
bundle install
bundle exec jekyll build JEKYLL_ENV=production     # succeeds under a UTF-8 locale
htmlproofer ./_site --disable-external --allow-hash-href
```

- Sitemap shadowing confirmed by removing the `pages:` collection, rebuilding,
  and diffing `_site/sitemap.xml` (config restored afterwards — no change is
  committed in this PR).
- Missing images confirmed by resolving every `src="/img/..."` in `_site`
  against `img/`.
- Heading structure, post titles and blog listings confirmed by grepping the
  built HTML.
- Placeholder and word counts taken directly from `_projects/*.md`.

## Note on the earlier review

`docs/jamielab-website-improvement-handoff.md` covers related ground —
placeholder removal, homepage featured work, nav grouping, project storytelling,
accessibility. Several of its accessibility items have since been done (`aria-pressed`
on the rain toggle, a label on the theme select). Its Priority 0 content items —
the template post, the `tag1`/`tag2`/`tag3` tags, the three `href="#"` links, the
back-to-top anchor — are **all still open**, which is why they reappear above.

This review adds what that one did not have: build-verified defects (the sitemap
shadowing, the broken OG image, the red CI check, the published internal docs,
the front-matter-less posts), and a specific answer to the playground question —
promote the lab software to project status rather than hiding it.
