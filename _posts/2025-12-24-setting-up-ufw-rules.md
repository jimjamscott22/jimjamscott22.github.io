---
title: "Setting up basic UFW rules"
date: 2025-12-24 01:30:00 -0500
tags: [homelab, security, linux]
description: "A quick guide on hardening a new Linux VM with UFW."
---

When spinning up a new VM in the lab, one of the first things I do is set up a basic firewall. `ufw` (Uncomplicated Firewall) is perfect for this.

## The "Safe" Sequence

Always allow SSH before enabling the firewall to avoid locking yourself out!

```bash
# 1. Default deny incoming, allow outgoing
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 2. Allow SSH (and other needed services)
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 3. Enable it
sudo ufw enable
```

## Check status

```bash
sudo ufw status numbered
```

Quick, easy, and essential for a secure lab environment.
