---
layout: default
title: Tools
permalink: /tools/
description: "Interactive browser-based utilities including text converters, encoders, and other useful tools for developers and security professionals."
---

# Tools

Interactive utilities for your terminal adventures. All tools run entirely in your browser - no data is sent anywhere.

<div class="tools-grid">

<div class="tool-card" id="password-generator">
<h2>Password Generator</h2>
<p>Generate secure, customizable passwords.</p>

<div class="tool-controls">
<div class="control-row">
<label for="pw-length">Length: <span id="pw-length-display">16</span></label>
<input type="range" id="pw-length" min="8" max="64" value="16">
</div>

<div class="control-row checkbox-group">
<label><input type="checkbox" id="pw-upper" checked> Uppercase (A-Z)</label>
<label><input type="checkbox" id="pw-lower" checked> Lowercase (a-z)</label>
<label><input type="checkbox" id="pw-numbers" checked> Numbers (0-9)</label>
<label><input type="checkbox" id="pw-symbols" checked> Symbols (!@#$...)</label>
</div>

<div class="output-box">
<input type="text" id="pw-output" readonly placeholder="Click Generate">
<button class="tool-btn copy-btn" data-copy="pw-output" aria-label="Copy password">Copy</button>
</div>

<div class="button-row">
<button class="tool-btn primary" id="pw-generate">Generate</button>
</div>

<div class="pw-strength" id="pw-strength"></div>
</div>
</div>

<div class="tool-card" id="ascii-art">
<h2>ASCII Art Generator</h2>
<p>Transform text into ASCII art banners.</p>

<div class="tool-controls">
<div class="control-row">
<label for="ascii-input">Text:</label>
<input type="text" id="ascii-input" placeholder="Enter text..." maxlength="20">
</div>

<div class="control-row">
<label for="ascii-font">Style:</label>
<select id="ascii-font">
<option value="block">Block</option>
<option value="banner">Banner</option>
<option value="mini">Mini</option>
<option value="slant">Slant</option>
<option value="digital">Digital</option>
</select>
</div>

<div class="output-box ascii-output-container">
<pre id="ascii-output" class="ascii-pre">Type something above...</pre>
<button class="tool-btn copy-btn" data-copy-pre="ascii-output" aria-label="Copy ASCII art">Copy</button>
</div>
</div>
</div>

<div class="tool-card" id="encoder">
<h2>Text Encoder/Decoder</h2>
<p>Convert text between different encodings.</p>

<div class="tool-controls">
<div class="control-row">
<label for="encoder-input">Input:</label>
<textarea id="encoder-input" rows="3" placeholder="Enter text to encode/decode..."></textarea>
</div>

<div class="control-row">
<label for="encoder-mode">Mode:</label>
<select id="encoder-mode">
<option value="base64-encode">Base64 Encode</option>
<option value="base64-decode">Base64 Decode</option>
<option value="binary">Text → Binary</option>
<option value="binary-decode">Binary → Text</option>
<option value="hex">Text → Hex</option>
<option value="hex-decode">Hex → Text</option>
<option value="rot13">ROT13</option>
<option value="reverse">Reverse</option>
<option value="url-encode">URL Encode</option>
<option value="url-decode">URL Decode</option>
</select>
</div>

<div class="output-box">
<textarea id="encoder-output" rows="3" readonly placeholder="Output will appear here..."></textarea>
<button class="tool-btn copy-btn" data-copy-textarea="encoder-output" aria-label="Copy output">Copy</button>
</div>

<div class="button-row">
<button class="tool-btn primary" id="encoder-convert">Convert</button>
<button class="tool-btn" id="encoder-swap">Swap ↔</button>
</div>
</div>
</div>

<div class="tool-card" id="hash-generator">
<h2>Hash Generator</h2>
<p>Generate cryptographic hashes of text.</p>

<div class="tool-controls">
<div class="control-row">
<label for="hash-input">Input:</label>
<textarea id="hash-input" rows="2" placeholder="Enter text to hash..."></textarea>
</div>

<div class="hash-results">
<div class="hash-row">
<span class="hash-label">MD5:</span>
<input type="text" id="hash-md5" readonly>
<button class="tool-btn copy-btn small" data-copy="hash-md5">Copy</button>
</div>
<div class="hash-row">
<span class="hash-label">SHA-1:</span>
<input type="text" id="hash-sha1" readonly>
<button class="tool-btn copy-btn small" data-copy="hash-sha1">Copy</button>
</div>
<div class="hash-row">
<span class="hash-label">SHA-256:</span>
<input type="text" id="hash-sha256" readonly>
<button class="tool-btn copy-btn small" data-copy="hash-sha256">Copy</button>
</div>
<div class="hash-row">
<span class="hash-label">SHA-512:</span>
<input type="text" id="hash-sha512" readonly>
<button class="tool-btn copy-btn small" data-copy="hash-sha512">Copy</button>
</div>
</div>
</div>
</div>

</div>

<script defer src="{{ '/assets/js/tools.js' | relative_url }}"></script>
