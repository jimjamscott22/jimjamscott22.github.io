---
title: "Self-Hosting Vaultwarden on a Raspberry Pi (With a Disaster-Recovery Fallback)"
date: 2026-01-18 09:00:00 -0500
tags: [homelab, security, self-hosting]
description: "Self-hosting a Bitwarden-compatible password manager on a Raspberry Pi 5, with a warm-standby second Pi as a disaster-recovery fallback."
---

## Why I Self-Host My Password Manager

Password managers sit at the very center of modern digital life. They don’t just store passwords — they store identity, trust, and access. Relying entirely on a third party for that role is convenient, but it also creates a single external point of failure I don’t control.

This project documents how I self-host Vaultwarden (a lightweight Bitwarden-compatible server) on a Raspberry Pi 5, and how I designed a clean disaster-recovery fallback using a second Pi. The goal wasn’t novelty — it was reliability, security, and recoverability.

This post doubles as both a guide and a recovery runbook.

---

## Architecture Overview

### Primary Node (Always On)

- Raspberry Pi 5 (headless, Ethernet)
- Docker + docker-compose
- Vaultwarden bound to localhost
- HTTPS enforced via Caddy
- Local DNS via Pi-hole
- Persistent data stored outside the container

### Secondary Node (Fallback)

- Raspberry Pi 5 (desktop Pi with 1 TB M.2 SSD)
- Vaultwarden installed but stopped
- Receives encrypted backups
- Can be promoted to primary in minutes

Only one Vaultwarden instance runs at a time to avoid database corruption.

---

## Why Vaultwarden?

Vaultwarden is a community-maintained, Rust-based implementation of the Bitwarden server. Compared to the official server, it is:

- Extremely lightweight (ideal for ARM devices)
- Fully compatible with Bitwarden clients
- Easier to self-host securely
- Actively maintained

For single-user or small homelab use, it’s an excellent fit.

---

## Primary Deployment (Headless Pi)

### Directory Layout

    /opt/vaultwarden/
    ├── docker-compose.yml
    └── data/
        ├── db.sqlite3
        ├── attachments/
        └── config/

Only /opt/vaultwarden/data is backed up. Everything else is reproducible.

---

### Docker Compose Configuration

    version: "3.8"

    services:
      vaultwarden:
        image: vaultwarden/server:latest
        container_name: vaultwarden
        restart: unless-stopped
        volumes:
          - /opt/vaultwarden/data:/data
        ports:
          - "127.0.0.1:8080:80"
        environment:
          WEBSOCKET_ENABLED: "true"
          ADMIN_TOKEN: "${ADMIN_TOKEN}"

Key decisions:
- Vaultwarden is bound to localhost only
- No direct LAN exposure
- Secrets live in an .env file
- Automatic restart after reboot

---

### Admin Token & Hardening

Vaultwarden’s admin interface is disabled by default. I explicitly enable it using a strong token:

    openssl rand -base64 48

This token is required to disable signups and manage security settings.

---

## HTTPS With Caddy

Vaultwarden never handles TLS directly. Caddy acts as the HTTPS front door.

### Caddyfile

    vaultwarden.local {
        reverse_proxy 127.0.0.1:8080
    }

This enforces HTTPS, isolates Vaultwarden from the network, and simplifies future expansion.

Local DNS (via Pi-hole) maps vaultwarden.local to the Pi’s IP.

---

## Backup Strategy

MicroSD cards are convenient — and eventually unreliable. I treat the OS as replaceable and the data as sacred.

### What Gets Backed Up

    /opt/vaultwarden/data/

This includes:
- The SQLite database
- Attachments
- Configuration metadata

No disk images. No container layers.

---

### Manual Backup (rsync)

    rsync -av /opt/vaultwarden/data/ user@desktop-pi:/srv/backups/vaultwarden/

This runs over SSH and is easy to automate later with cron.

---

## Fallback Node (Warm Standby)

The desktop Pi mirrors the primary configuration but remains offline.

### Fallback Docker Compose

    version: "3.8"

    services:
      vaultwarden:
        image: vaultwarden/server:latest
        container_name: vaultwarden
        restart: unless-stopped
        volumes:
          - /opt/vaultwarden/data:/data
        ports:
          - "127.0.0.1:8080:80"
        environment:
          WEBSOCKET_ENABLED: "true"
          ADMIN_TOKEN: "${ADMIN_TOKEN}"

Identical configuration means no reconfiguration under stress and no client re-enrollment.

---

## Disaster Recovery Procedure

If the primary Pi fails:

1. Restore the latest backup:

       rsync -av user@desktop-pi:/srv/backups/vaultwarden/ /opt/vaultwarden/data/

2. Start Vaultwarden:

       cd /opt/vaultwarden && docker-compose up -d

3. Update DNS so vaultwarden.local points to the desktop Pi.

4. Clients reconnect automatically.

Recovery time is measured in minutes.

---

## Why This Design Works

- No split-brain risk (single active instance)
- Fast recovery using SQLite + Docker
- Hardware-independent restores
- Security preserved end-to-end
- Easy to test periodically

---

## Lessons Learned

- Infrastructure should be boring, not clever
- Backups are useless without restore tests
- Bind mounts beat full-disk images
- Planning recovery ahead of time reduces stress dramatically

---

<div class="image-gallery">
  <figure>
    <img src="{{ "/img/nas_part2.png" | relative_url }}" alt="NAS backup diagram" loading="lazy" decoding="async" />
    <figcaption>Backup architecture overview</figcaption>
  </figure>
  <figure>
    <img src="{{ "/img/Find-Failed-SSH-Logins.png" | relative_url }}" alt="Failed SSH logins monitoring" loading="lazy" decoding="async" />
    <figcaption>Finding failed logins</figcaption>
  </figure>
</div>

## Final Thoughts

Self-hosting a password manager isn’t about distrust — it’s about ownership. Ownership of data, uptime, and recovery. This setup ensures that even if hardware fails, my digital identity doesn’t disappear with it.

If I never need the fallback Pi, that’s success.  
If I do, I’ll be glad I treated resilience as a first-class feature.
