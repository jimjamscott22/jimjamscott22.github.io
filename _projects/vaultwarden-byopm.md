---
layout: default
title: VaultWarden BYOPM
permalink: /projects/vaultwarden-byopm/
---

**Status:** Building  
**Tags:** docker, vaultwarden, security, self-hosted

## Overview

Self-hosted password manager built on VaultWarden (Bitwarden-compatible server), running in Docker with Unbound DNS for secure recursive lookups and automated backup systems. Moving password management in-house to maintain full control over credentials while keeping the convenience of modern password management tools.

!["VaultWarden BYOPM Schematic"]({{ "/img/byopm_schematic.webp" | relative_url }})

## Architecture

### Core Services

- **VaultWarden:** Open-source Bitwarden server implementation
- **Unbound DNS:** Recursive DNS resolver for privacy
- **Gitea Runner:** Lightweight CI/CD for automated tasks
- **Backup System:** Automated SQLite backups with retention policy

### Network Design

- Isolated on services VLAN with restricted firewall rules
- Reverse proxy with HTTPS/TLS termination
- Tailscale integration for secure remote access
- Rate limiting and fail2ban protection

## Setup

### Prerequisites
<!-- Document initial requirements, VM specs, etc. -->

### Installation Steps
<!-- Walk through the deployment process -->

For the sanitized Docker Compose template and detailed configuration, see:  
→ [VaultWarden Compose Template](/notes/vaultwarden-compose-template/)

### Security Hardening
<!-- Document security measures implemented -->

## Features & Functionality

### Password Management
<!-- How you're using VaultWarden, client setup, etc. -->

### Backup & Recovery
<!-- Backup strategy, testing recovery procedures -->

### Monitoring
<!-- Prometheus metrics, health checks, alerting -->

## Challenges & Solutions

### Challenge: Secure Remote Access
<!-- How you solved remote access without exposing services -->

### Challenge: Backup Integrity
<!-- Testing and validating backup/restore procedures -->

## Lessons Learned

<!-- What you learned building this -->
<div style="display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; align-items:center;">
  <figure style="margin:0;">
    <img src="{{ "img/byopm_schematic.webp" | relative_url }}" alt="ufw diagram" style="width:100%; height:auto;" />
    <figcaption style="opacity:.8; font-size:.9em; margin-top:.3rem;">SSH overview</figcaption>
  </figure>

## Next Steps

- [ ] Implement automated backup testing
- [ ] Set up Grafana dashboard for service metrics
- [ ] Document disaster recovery runbook
- [ ] Add hardware 2FA support (YubiKey)
- [ ] Configure email notifications for backup failures

## Related Resources

- [VaultWarden Compose Template](/notes/vaultwarden-compose-template/)
- [Tailscale Subnet Routing](/notes/tailscale-subnet-routing/)
- [pfSense Rule Tuning](/notes/pfsense-rule-tuning/)

---
[← Back to Projects](/projects/)
