# Potential Website Upgrades

## Interactive & Engagement Features

1. **Tag Filtering System** ✅ - Let users click tags to filter blog posts dynamically
2. **Reading Progress Bar** ✅ - Show scroll progress on blog posts
3. **Table of Contents** ✅ - Auto-generated TOC for longer blog posts and documentation
4. **Related Posts** ✅ - Show similar content based on tags/categories at the bottom of posts
5. **Keyboard Shortcuts** - Add more terminal-style keyboard shortcuts (beyond ESC for search)
6. **Terminal Easter Eggs** - Hidden commands users can type (fits your CRT theme perfectly)

## Content Discovery ✅ (Completed)

7. **Archive Page** ✅ - Chronological archive of all posts by year/month
8. **Timeline View** ✅ - Visual timeline of homelab milestones and project progress
9. **Wiki/Knowledge Base** ✅ - Expand your notes into a searchable wiki-style documentation section
10. **Project Status Dashboard** ✅ - Live status indicators for homelab services

## Technical Enhancements

11. **Estimated Read Time** - Complete implementation across all content
12. **Lazy Loading Images** - If not already implemented for the image gallery
13. **Service Worker/PWA** - Make it installable as a Progressive Web App
14. **Syntax Highlighting Themes** - Multiple options or enhance current highlighting
15. **JSON Resume** - Machine-readable resume/CV at `/resume.json`

## Homelab-Specific Features

16. **Network Diagram** - Interactive SVG diagram of your homelab infrastructure
17. **Uptime Monitor Display** - Show uptime stats for your services (using UptimeRobot API or similar)
18. **Resource Metrics** - Display CPU/RAM/storage usage charts (if you have Prometheus/Grafana)
19. **Lab Changelog** - Dedicated page tracking infrastructure changes
20. **Hardware Inventory** - Searchable catalog of your homelab hardware

## Community & Growth

21. **Newsletter Signup** - Email subscription (via Mailchimp, Buttondown, etc.)
22. **Share Buttons** - Quick social sharing for blog posts
23. **Webmentions** - Track mentions from other sites
24. **GitHub Star Counter** - Show stars/forks for your projects

## Security/Cybersec Focused

25. **CVE Tracker** ✅ - List of vulnerabilities you're researching or patching
26. **Security Tools Catalog** ✅ - Curated list of tools you use/recommend
27. **Capture the Flag Write-ups** ✅ - Dedicated section for CTF solutions
28. **Threat Intelligence Feed** - Display recent security news (RSS aggregation)

## Analytics & Performance

29. **Privacy-Friendly Analytics** - Plausible, GoatCounter, or Umami integration
30. **Core Web Vitals Badge** - Display performance metrics
31. **Carbon Footprint Indicator** - Website environmental impact (using websitecarbon.com API)

## Code Playground Enhancements

The `/playground/` interactive editor received a bundle of improvements:

- **Autosave & Language Persistence** ✅ - Editor buffer is saved per-language to
  `localStorage` and restored on the next visit; the last-used language is also
  remembered (no more losing code on refresh)
- **Line-Number Gutter** ✅ - Live line numbering alongside the editor, scroll-synced
- **Smart Auto-Indent** ✅ - Enter preserves the current line's indentation and adds
  an extra level after an opening `{`, `:`, `[`, or `(`
- **Stderr Error Styling** ✅ - Python `stderr` output now renders in the error color
  instead of plain text
- **Pyodide Upgrade** ✅ - Bumped the Python runtime from v0.24.1 to v0.26.4 (faster
  load, slimmer core)
- **Web Worker for Python timeout** - Outstanding: Pyodide still runs on the main
  thread, so an infinite Python loop can freeze the tab. Moving execution into a Web
  Worker would make the 5s timeout enforceable for Python (currently JS-only)
- **Syntax Highlighting** - Outstanding: editor is still a styled `<textarea>`; a
  CodeMirror 6 integration (themed to match the site) would add real highlighting

## Creative/Fun Additions

32. **ASCII Art Generator** - Tool to convert images to ASCII (fits terminal theme)
33. **Command History** - Fake terminal history showing your recent activities
34. **Matrix Rain Effect** ✅ - Toggle-able matrix rain background overlay
35. **Hacker Typer Mode** - Fun interactive typing effect
