---
layout: project
title: VaultWarden BYOPM
permalink: /projects/vaultwarden-byopm/
status: building
last_updated: 2026-01-20
tech_stack: [docker, vaultwarden, unbound, gitea]
milestone_date: 2025-12-01
milestone_text: "Started self-hosted password manager migration"
weight: 2
featured: true
description: "Self-hosted password manager with Docker, Unbound DNS, and automated backups—bringing your own password management home."
image: /img/byopm_schematic.webp
image_alt: "VaultWarden password manager schematic"
---

## Overview

Self-hosted password manager built on VaultWarden (Bitwarden-compatible server), running in Docker with Unbound DNS for secure recursive lookups and automated backup systems. Moving password management in-house to maintain full control over credentials while keeping the convenience of modern password management tools.

<figure class="content-image content-image--wide">
  <img src="{{ "/img/byopm_schematic.webp" | relative_url }}" alt="VaultWarden BYOPM architecture schematic" loading="lazy" decoding="async" />
  <figcaption>System architecture diagram</figcaption>
</figure>

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

For the sanitized Docker Compose template and detailed configuration, see:  
→ [VaultWarden Compose Template](/notes/vaultwarden-compose-template/)

## Decisions

<!-- TODO: 2-3 real tradeoffs made building this, with the option rejected and why -->

## Lessons

<!-- TODO: what you'd do differently -->

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
