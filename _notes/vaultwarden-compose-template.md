---
layout: default
title: VaultWarden Services Compose Template
date: 2025-12-28
type: quick-note
category: homelab
tags: [docker, security, vaultwarden]
permalink: /notes/vaultwarden-compose-template/
---

**Date:** 2025-12-28  
**Type:** Reference

## Overview

Sanitized Docker Compose template for running VaultWarden, Unbound DNS, and auxiliary services in a homelab VM. This is a redacted structure showing the general approach without exposing actual network details.

## Prerequisites

- Docker and Docker Compose installed
- Persistent storage volumes configured
- Network firewall rules in place
- SSL/TLS certificates (Let's Encrypt recommended)

## Compose Structure

```yaml
version: '3.8'

services:
  # Password manager service
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      - DOMAIN=https://vault.yourdomain.local
      - SIGNUPS_ALLOWED=false
      - INVITATIONS_ALLOWED=true
      - SHOW_PASSWORD_HINT=false
      - LOG_LEVEL=info
    volumes:
      - /path/to/vaultwarden/data:/data
    ports:
      - "8080:80"
    networks:
      - services_net

  # Recursive DNS resolver
  unbound:
    image: mvance/unbound:latest
    container_name: unbound
    restart: unless-stopped
    volumes:
      - /path/to/unbound/config:/opt/unbound/etc/unbound
      - /path/to/unbound/logs:/opt/unbound/etc/unbound/logs
    ports:
      - "5353:53/tcp"
      - "5353:53/udp"
    networks:
      - services_net
    cap_add:
      - NET_ADMIN

  # Optional: Lightweight CI/CD runner
  gitea-runner:
    image: gitea/act_runner:latest
    container_name: gitea-runner
    restart: unless-stopped
    environment:
      - GITEA_INSTANCE_URL=https://git.yourdomain.local
      - GITEA_RUNNER_REGISTRATION_TOKEN=<TOKEN_HERE>
      - GITEA_RUNNER_NAME=homelab-runner-01
    volumes:
      - /path/to/runner/data:/data
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - services_net

networks:
  services_net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24

volumes:
  vaultwarden_data:
  unbound_config:
  runner_data:
```

## Security Considerations

### VaultWarden

- Disable signups after initial setup
- Use invitation-only mode
- Enable 2FA for all accounts
- Place behind reverse proxy with HTTPS
- Regular automated backups of `/data` volume
- Consider file-level encryption for backup storage

### Unbound

- Configure DNSSEC validation
- Enable query logging for monitoring (rotate logs)
- Restrict recursive queries to trusted networks only
- Use root hints and maintain upstream forwarders
- Implement rate limiting to prevent DNS amplification

### CI/CD Runner

- Limit runner token scope to specific repositories
- Run with minimal privileges (avoid `privileged: true`)
- Isolate build environments
- Scan container images before deployment
- Audit runner logs regularly

## Network Integration

- **VLAN:** Isolate on services VLAN with restricted access rules
- **Firewall:** Allow only necessary ingress from trusted zones
- **Tailscale:** Consider subnet routing for remote management
- **Monitoring:** Expose metrics endpoints for Prometheus scraping

## Backup Strategy

```bash
# Example backup script structure (customize paths)
#!/bin/bash
BACKUP_DIR="/backup/services"
DATE=$(date +%Y%m%d-%H%M%S)

# VaultWarden backup
docker exec vaultwarden sqlite3 /data/db.sqlite3 ".backup '/data/db-backup.sqlite3'"
tar -czf ${BACKUP_DIR}/vaultwarden-${DATE}.tar.gz /path/to/vaultwarden/data

# Unbound config backup
tar -czf ${BACKUP_DIR}/unbound-${DATE}.tar.gz /path/to/unbound/config

# Retain last 7 days
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -delete
```

## Deployment

```bash
# Deploy the stack
docker-compose up -d

# Verify services
docker-compose ps
docker-compose logs -f

# Health checks
curl http://localhost:8080/alive  # VaultWarden
dig @localhost -p 5353 example.com  # Unbound
```

## Maintenance Tasks

- [ ] Weekly: Review logs for anomalies
- [ ] Weekly: Verify backup integrity
- [ ] Monthly: Update container images
- [ ] Monthly: Review and rotate access tokens
- [ ] Quarterly: Test disaster recovery procedure
- [ ] Annually: Review and update security policies

## Related Notes

- [Prometheus Scrape Configs](/notes/prometheus-scrape-configs/)
- [Tailscale Subnet Routing](/notes/tailscale-subnet-routing/)
- [pfSense Rule Tuning](/notes/pfsense-rule-tuning/)

## References

- [VaultWarden Wiki](https://github.com/dani-garcia/vaultwarden/wiki)
- [Unbound Documentation](https://nlnetlabs.nl/documentation/unbound/)
- [Docker Compose Networking](https://docs.docker.com/compose/networking/)
