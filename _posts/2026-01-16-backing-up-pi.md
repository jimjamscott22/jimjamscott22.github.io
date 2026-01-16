---
title: "Backing Up a Raspberry Pi Home Directory (Without Hoarding 15 GB Forever)"
date: 2026-01-17
categories: [linux, raspberry-pi, backups, homelab]
tags: [raspberry-pi, linux, tar, backups, homelab]
---

Backups are one of those things everyone agrees are important—right up until disk space mysteriously vanishes and no one remembers what’s actually being backed up.

Today I cleaned up my Raspberry Pi desktop backup strategy and replaced a bulky ~15 GB backup with a **compressed, verified, and reproducible archive weighing in at just 4.6 GB**. Same data. Less entropy.

## The Problem

I had previously backed up my Raspberry Pi home directory by copying it directly to an external drive. It worked, but it had a few flaws:

- No compression  
- No clear snapshot date  
- Included caches and trash  
- Owned by `root`, which quietly blocked future writes  

In short: functional, but sloppy.

## The Fix

The goal was simple:  
Create a **compressed, timestamped backup of `/home`**, store it on a mounted external drive, and verify it before touching the old backup.

The solution used good old `tar` with gzip compression, while excluding directories that don’t belong in backups (cache and trash):

```bash
tar --exclude=/home/jimjamscozz22/.cache \
    --exclude=/home/jimjamscozz22/.local/share/Trash \
    -czvf /media/jimjamscozz22/Pi_Backup/pi_backups/home-2026-01-16.tar.gz \
    /home/jimjamscozz22
