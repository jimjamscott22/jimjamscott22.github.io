---
layout: project
title: CodeVault
permalink: /projects/codevault/
status: building
last_updated: 2026-10-25
tech_stack: [rust, tauri, react, typescript, sqlite, codemirror]
weight: -3
featured: true
description: "A local-first desktop vault for reusable code, shell commands, and configs, with searchable snippets, fillable templates, and a companion CLI."
repo: https://github.com/jimjamscott22/Code-Vault
---

## Problem

Useful commands and configuration fragments tend to disappear into shell history, old notes, and previous projects. CodeVault gives them a dedicated home where the code, its purpose, and its tags stay together.

## Approach

The desktop app combines a Rust and Tauri backend with a React and TypeScript interface. SQLite stores the snippets locally, while CodeMirror provides an editor with syntax highlighting. Tags, collections, search, and Markdown notes make a saved command easier to find and understand later.

A separate Rust CLI uses the same database for terminal-driven capture and search. Snippets can also become fillable templates: a dialog collects values, previews the result, and copies the completed command. JSON and Markdown imports bring existing notes into the vault, and JSON exports provide a portable backup.

## Decisions

**Local storage without an account.** SQLite keeps the vault available on the machine where the commands are used. That avoids a hosted service dependency, but moving the library between machines requires an explicit export or backup workflow.

**One database for the desktop app and CLI.** Both interfaces work with the same snippet library instead of maintaining separate copies. The CLI is a separate build, so installing the desktop app alone does not install the terminal tool.

**Preview templates before copying.** Reusable commands often need a different host, path, or port each time. Filling named fields keeps that variation explicit; the app does not execute the command. Entered template values are held only for the current app session.

## Result

CodeVault brings snippet editing, organization, reusable templates, and terminal capture into one local workflow. Launch-time database backups and import conflict choices support maintaining the library as it grows.

## Current limits

This is a native desktop application, so the frontend development server alone cannot provide its backend functionality. Building requires the Rust and Node toolchains plus platform-specific Tauri dependencies. There is no hosted browser demo linked here.
