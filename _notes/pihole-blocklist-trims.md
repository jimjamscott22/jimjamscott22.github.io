---
layout: default
title: Pi-hole Blocklist Trims
date: 2024-10-18
type: quick note
permalink: /notes/pihole-blocklist-trims/
---

# Pi-hole Blocklist Trims

**Date:** 2024-10-18  
**Type:** Quick Note

## Overview

Quick reference for trimming and optimizing Pi-hole blocklists to reduce false positives while maintaining effective ad blocking.

## Current Blocklists

### Recommended Lists (Balanced)

```
# Core lists (keep these)
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://v.firebog.net/hosts/AdguardDNS.txt
https://v.firebog.net/hosts/Easylist.txt
```

### Optional Lists (Review periodically)

```
# Can cause false positives:
https://v.firebog.net/hosts/Easyprivacy.txt
https://v.firebog.net/hosts/Prigent-Ads.txt
```

## Common Whitelist Additions

### Microsoft Services

```
# Add to whitelist if using Windows/Office/Xbox
msftconnecttest.com
www.msftconnecttest.com
```

### Smart Home Devices

```
# Amazon Alexa
device-metrics-us-2.amazon.com
```

### Streaming Services

```
# Hulu
ads-fa-darwin.hulustream.com  # (whitelist if ads break playback)
```

## Quick Commands

### Update Gravity

```bash
pihole -g
```

### Check Query Log

```bash
pihole -t
# Or via web: http://pi.hole/admin
```

### Whitelist Domain

```bash
pihole -w example.com
```

### Blacklist Domain

```bash
pihole -b example.com
```

### View Stats

```bash
pihole -c
```

## Maintenance Schedule

- **Weekly:** Review query log for false positives
- **Monthly:** Update blocklists (`pihole -g`)
- **Quarterly:** Audit whitelist/blacklist entries

## Performance Notes

- Current blocklist count: ~1.2M domains
- Query response time: <50ms
- Memory usage: ~200MB

## Troubleshooting

### Site Not Loading

1. Check Pi-hole query log
2. Look for blocked domains
3. Whitelist if legitimate
4. Clear browser cache

### Too Many Ads Getting Through

1. Add more blocklists (cautiously)
2. Check if DNS is properly configured
3. Verify Pi-hole is set as DNS server

## Recent Changes

- **2024-10-18:** Removed overly aggressive crypto mining list (too many false positives)
- **2024-10-18:** Whitelisted `*.microsoft.com` for Windows Update issues

## Links

- [Pi-hole Admin](http://pi.hole/admin)
- [Firebog Blocklists](https://firebog.net/)
- [Pi-hole Discourse](https://discourse.pi-hole.net/)
