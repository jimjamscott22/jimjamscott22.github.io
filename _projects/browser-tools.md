---
layout: project
title: Browser Tool Suite
permalink: /projects/browser-tools/
status: active
last_updated: 2026-08-30
tech_stack: [javascript, web-crypto, cryptography]
weight: 10
description: "Password generator, encoder/decoder, hash generator, and ASCII art — four client-side utilities that never make a network request, with the privacy claim actually true in the code."
demo: /tools/
repo: https://github.com/jimjamscott22/jimjamscott22.github.io/blob/main/assets/js/tools.js
---

## Overview

`/tools/` bundles four small utilities — a password generator, a text encoder/decoder, a hash generator, and an ASCII art maker — behind one claim: "all tools run entirely in your browser - no data is sent anywhere." `tools.js` has zero `fetch`/`XMLHttpRequest` calls, so that claim is verifiable, not just asserted.

## Approach

**Password generator** builds a charset from the selected upper/lower/number/symbol categories and draws from it with `crypto.getRandomValues()` — the browser's CSPRNG, not `Math.random()`, which matters because `Math.random()`'s output is predictable enough to reconstruct in some engines and has no business generating anything security-relevant. Strength is scored out of 8 points (length thresholds at 8/12/16/24 chars, one point each for lower/upper/digit/symbol presence) and bucketed into Weak/Fair/Strong/Very Strong.

**Encoder/decoder** covers Base64, binary, hex, ROT13, string reversal, and URL encoding — each a direct, reversible transform (`btoa`/`atob` for Base64, `charCodeAt`/`fromCharCode` for binary and hex) with a swap button to flip input and output.

**Hash generator** offers MD5 alongside the SHA family. The two are implemented completely differently: MD5 is a hand-rolled pure-JS implementation (the browser has no native MD5, since it's cryptographically broken) explicitly commented `for demonstration - not for security use`; SHA-1/256/384/512 call the browser's native `crypto.subtle.digest()` instead of a JS reimplementation.

## Result

Four working utilities, no server round-trip for any of them — confirmed by grepping the file for network calls, not just reading the UI copy.

## Decisions

`crypto.getRandomValues()` over `Math.random()` for the password generator specifically — every other feature on this page (encoders, hashing) has no randomness to get wrong, but a "password generator" that's secretly seeded by a non-cryptographic PRNG would be actively misleading about what it's for.

Labeled the MD5 implementation as non-cryptographic in the code and left it in anyway — MD5 is still useful for checksums and demonstrating how a hash function is built, which is a legitimate reason to keep it, as long as nothing implies it's safe for passwords or signatures.

## Lessons

<!-- TODO: what you'd do differently -->
