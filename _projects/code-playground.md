---
layout: project
title: Code Playground
permalink: /projects/code-playground/
status: active
last_updated: 2026-08-30
tech_stack: [javascript, python, pyodide, codemirror, webassembly]
weight: 8
featured: true
description: "A browser-only multi-language runtime: a CodeMirror editor, sandboxed JavaScript execution, and real Python via Pyodide/WASM — no server, no accounts, shareable by URL."
demo: /playground/
repo: https://github.com/jimjamscott22/jimjamscott22.github.io/blob/main/assets/js/playground.js
---

## Overview

`/playground/` is a CodeMirror-based editor that runs JavaScript and Python entirely in the visitor's browser — no backend, no account, nothing sent over the network to execute code. It's a static Jekyll site with a real interpreter embedded in it.

## Approach

**JavaScript** runs inside a hidden, sandboxed `<iframe sandbox="allow-scripts">` built from a `srcdoc` string — deliberately without `allow-same-origin`, so the iframe gets its own opaque origin with no access to the parent page's DOM, cookies, or `localStorage`. `console.log`/`error`/`warn`/`info` are overridden inside the iframe to `postMessage` their arguments back to the parent instead of writing to the real console, and a hard 5-second `setTimeout` force-removes the iframe and rejects if the code never finishes (an infinite `while(true)` in the editor can't hang the page).

**Python** runs via [Pyodide](https://pyodide.org/) — CPython compiled to WebAssembly — loaded lazily from a CDN the first time a visitor picks Python, so JavaScript-only visitors never pay for it. `sys.stdout`/`sys.stderr` are redirected to `StringIO` buffers around each run and read back afterward, which is how the output panel captures `print()` output without Pyodide needing any custom I/O hooks.

**Sharing** a snippet doesn't touch a database: `shareCode()` base64-encodes the editor contents into a `?lang=&code=` query string, and `loadFromURL()` decodes it back on load. The whole feature is stateless by construction — a link *is* the storage.

## Result

Two full language runtimes (a JS sandbox and a WASM CPython) running client-side on a static Jekyll site, with a working share feature that needs no backend — `git log` on `playground.js` shows it growing in place over several passes (CodeMirror swap-in, autosave, Pyodide version bumps) rather than a rewrite, which is the shape you'd expect from a page that's actually being used and iterated on.

## Decisions

Iframe + `postMessage` over a Web Worker for JavaScript — a worker can't touch the DOM at all (no `console` object patched onto a real one, no `document`), but this playground is meant to let people experiment with DOM APIs too, not just pure functions. The iframe sandbox trades a slightly larger attack surface (postMessage instead of a fully separate thread) for letting arbitrary browser JS actually run.

Pyodide loaded from a CDN on first use rather than bundled — it's tens of megabytes of WASM + stdlib; shipping it with every page load would tax every visitor for a feature most won't touch, so the cost is deferred to the moment someone actually picks Python.

URL-encoded snippets instead of a share backend — the entire site is static GitHub Pages with nothing to write to, so persistence had to be either "no sharing" or "put the state in the URL." The latter also means shared links never expire or 404.

## Lessons

<!-- TODO: what you'd do differently -->
