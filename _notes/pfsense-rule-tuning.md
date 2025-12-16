---
layout: default
title: pfSense Rule Tuning
date: 2024-11-05
type: runbook
permalink: /notes/pfsense-rule-tuning/
---

# pfSense Rule Tuning

**Date:** 2024-11-05  
**Type:** Runbook

## Overview

This runbook covers best practices and procedures for tuning pfSense firewall rules for optimal performance and security.

## Pre-requisites

- Access to pfSense web interface
- Admin credentials
- Understanding of network topology
- Backup of current configuration

## Rule Optimization Steps

### 1. Review Current Rules

```bash
# Access via: Firewall > Rules > [Interface]
# Check for:
# - Duplicate rules
# - Overly permissive rules
# - Rules with no hits (check rule statistics)
```

### 2. Rule Ordering

- Place most frequently matched rules at the top
- Block rules before allow rules (for security)
- Specific rules before general rules

### 3. Enable Rule Statistics

```
Diagnostics > pfTop
# Monitor which rules are being hit most frequently
```

### 4. Optimize State Table

```
System > Advanced > Firewall & NAT
# Adjust:
# - Firewall Maximum States
# - Firewall Maximum Table Entries
```

### 5. Use Aliases

Create aliases for commonly used:
- IP addresses/networks
- Ports
- URLs

```
Firewall > Aliases
# Benefits:
# - Easier maintenance
# - Cleaner rules
# - Reduced errors
```

## Performance Tuning

### State Table Size

```bash
# Check current states
pfctl -s info

# Adjust in System > Advanced > Firewall & NAT
# Recommended: 10% of RAM in bytes / 1000
```

### Hardware Offloading

```
System > Advanced > Networking
# Enable:
# - Hardware Checksum Offloading
# - Hardware TCP Segmentation Offloading (if supported)
```

## Common Issues

### High CPU Usage

- Review logging settings (disable logging on high-traffic rules)
- Check for rule loops
- Verify hardware offloading is enabled

### Dropped Connections

- Increase state table size
- Check for asymmetric routing
- Review timeout values

## Verification

```bash
# After changes, verify:
1. Check pfTop for rule hits
2. Monitor system load
3. Test connectivity
4. Review logs for anomalies
```

## Rollback Procedure

1. Navigate to Diagnostics > Backup & Restore
2. Select previous configuration
3. Click Restore
4. Verify functionality

## Notes

- Always backup before making changes
- Test changes during maintenance windows
- Document all modifications
- Monitor for 24-48 hours after changes

## References

- [pfSense Documentation](https://docs.netgate.com/pfsense/en/latest/)
- [pfSense Performance Tuning](https://docs.netgate.com/pfsense/en/latest/hardware/tuning-and-troubleshooting.html)
