---
title: "Setting up basic UFW rules"
date: 2025-12-24 01:30:00 -0500
tags: [homelab, security, linux]
description: "A quick guide on hardening a new Linux VM with UFW."
---

When spinning up a new VM in the lab, one of the first things I do is set up a basic firewall. `ufw` (Uncomplicated Firewall) is perfect for this.

Locking down ingress early reduces the blast radius if a service is misconfigured or exposed during setup. It also forces you to be intentional about what gets opened.

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

## Common mistakes

- Enabling UFW before allowing SSH (or your actual SSH port)
- Forgetting to open a non-default SSH port
- Allowing a web port but missing the protocol (e.g., `80` vs `80/tcp`)

## Allowing a single IP

```bash
sudo ufw allow from x.x.x.x to any port 22
```

## Rate limiting SSH

```bash
sudo ufw limit ssh
```

## Check status

```bash
sudo ufw status numbered
```

## Disable or rollback

```bash
sudo ufw disable
sudo ufw reset
```

Quick, easy, and essential for a secure lab environment.

## Next steps

- [Fail2ban and rate limiting notes]({{ "/projects/vaultwarden-byopm/" | relative_url }})
- [Reverse proxy hardening notes]({{ "/notes/vaultwarden-compose-template/" | relative_url }})

<div class="image-gallery">
  <figure>
    <img src="{{ "/img/ufw.png" | relative_url }}" alt="ufw diagram" loading="lazy" decoding="async" />
    <figcaption>UFW overview</figcaption>
  </figure>
  <figure>
    <img src="{{ "/img/tunneledHTTPSZoom.svg" | relative_url }}" alt="HTTPS tunnel diagram" loading="lazy" decoding="async" />
    <figcaption>Hardening your Services</figcaption>
  </figure>
</div>
