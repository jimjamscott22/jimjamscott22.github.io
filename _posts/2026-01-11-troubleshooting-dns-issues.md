---
layout: post
title: Troubleshooting DNS Issues
date: 2026-01-11 10:00:00 -0500
tags: [dns, troubleshooting, networking]
description: Common DNS troubleshooting steps and tools to diagnose connectivity problems.
---

# Troubleshooting DNS Issues

DNS problems can be frustrating and hard to track down. Here are some practical steps and tools to diagnose what's going wrong.

## Quick Diagnostic Commands

### Check Your DNS Configuration
First, verify which DNS servers your system is using:

```bash
# Linux/Mac
cat /etc/resolv.conf

# Windows
ipconfig /all
```

### Test DNS Resolution
Use `nslookup` or `dig` to query DNS directly:

```bash
# Simple lookup
nslookup google.com

# Detailed response with dig
dig google.com

# Specify a particular DNS server
dig @8.8.8.8 google.com
```

## Common Issues & Solutions

### DNS Not Resolving
If names aren't resolving to IPs:
- **Check connectivity first** — can you ping the DNS server itself?
- **Try a different DNS server** — test with 8.8.8.8 or 1.1.1.1
- **Flush DNS cache** — `sudo systemctl restart systemd-resolved` (Linux) or `ipconfig /flushdns` (Windows)

### Slow DNS Queries
If resolution is sluggish:
- **Check for timeouts** — use `dig +stats` to see query time
- **Too many hops** — consider switching to a faster DNS provider
- **Local DNS cache issues** — restart your DNS service

### NXDOMAIN Errors
This means the domain doesn't exist in DNS:
- **Verify the domain name** — typos are common
- **Check DNS propagation** — new domains take time to propagate
- **Try another DNS server** — sometimes specific providers don't have updated records

## Tools That Help

- **dig** — most detailed DNS lookups
- **nslookup** — simpler alternative to dig
- **host** — quick hostname resolution
- **dnstracer** — trace the DNS resolution path
- **whois** — check domain registration info

## Prevention

Configure multiple DNS servers for redundancy, and consider using a local DNS cache like Pi-hole to reduce resolution time and add a layer of control.
