---
layout: default
title: Code Playground
permalink: /playground/
description: Interactive code editor supporting JavaScript and Python. Write, run, and share code snippets directly in your browser.
---

# Code Playground

Write and execute code directly in your browser. JavaScript runs in a sandboxed environment, and Python is powered by [Pyodide](https://pyodide.org/).

<div class="playground-container">

<div class="playground-header">
<div class="playground-controls">
<select id="language-select" class="playground-select" aria-label="Select language">
<option value="javascript">JavaScript</option>
<option value="python">Python</option>
</select>

<select id="example-select" class="playground-select" aria-label="Load example">
<option value="">-- Select Example --</option>
</select>

<span id="pyodide-status" class="status-badge status-ready">JavaScript ready</span>
</div>

<div class="playground-actions">
<button id="run-code" class="playground-btn primary">Run</button>
<button id="clear-output" class="playground-btn">Clear</button>
<button id="share-code" class="playground-btn">Share</button>
</div>
</div>

<div class="playground-editor-container">
<div class="editor-header">
<span class="editor-title">Editor</span>
<div class="editor-actions">
<button id="copy-code" class="editor-btn">Copy Code</button>
</div>
</div>
<textarea id="code-editor" placeholder="Write your code here..." spellcheck="false"></textarea>
</div>

<div class="playground-output-container">
<div class="output-header">
<span class="output-title">Output</span>
<div class="output-meta">
<span id="execution-time"></span>
<button id="copy-output" class="editor-btn">Copy Output</button>
</div>
</div>
<div id="code-output"></div>
</div>

<div class="playground-shortcuts">
<div class="shortcuts-title">Keyboard Shortcuts</div>
<div class="shortcuts-list">
<div class="shortcut-item">
<span class="shortcut-key">Ctrl</span>+<span class="shortcut-key">Enter</span>
<span>Run code</span>
</div>
<div class="shortcut-item">
<span class="shortcut-key">Ctrl</span>+<span class="shortcut-key">S</span>
<span>Share link</span>
</div>
<div class="shortcut-item">
<span class="shortcut-key">Tab</span>
<span>Indent</span>
</div>
</div>
</div>

</div>

<script src="{{ '/assets/js/playground.js' | relative_url }}"></script>

---

## Features

- **JavaScript Execution**: Run JavaScript code in a secure sandboxed iframe
- **Python Support**: Full Python 3 via Pyodide (loads on first use)
- **Code Examples**: Pre-built examples for common patterns
- **Share Links**: Generate shareable URLs with your code
- **Keyboard Shortcuts**: Quick run with Ctrl+Enter
- **Execution Timing**: See how long your code takes to run

## Limitations

- **5 second timeout**: Code that runs longer will be terminated
- **No network access**: Fetch/requests are blocked for security
- **No file system**: Cannot read/write files
- **Browser-only**: Code runs entirely client-side
- **Python packages**: Only standard library and a few extras available

## Tips

- Use `console.log()` in JavaScript to print output
- Use `print()` in Python to display results
- Python loads on first use (~5MB download)
- Share links include your code in the URL (keep them short!)
