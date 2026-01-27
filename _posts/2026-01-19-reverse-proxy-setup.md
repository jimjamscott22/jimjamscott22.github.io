---
title: "Setting up a reverse proxy"
date: 2026-01-19 11:00:00 -0500
tags: [linux, dev, workflow]
description: "A comprehensive guide for setting up a reverse proxy w/three different apps"
---

## What is a Reverse Proxy?

A **reverse proxy** sits in front of one or more web servers (the *backend*).  
When a client sends an HTTP request, the reverse proxy receives it and forwards
the request to the appropriate backend server.  The response then flows back
through the proxy to the client.

Typical use‑cases

| Use case | Why you’d use a reverse proxy |
|----------|--------------------------------|
| **Load balancing** – distribute traffic across several identical services. |
| **SSL termination** – terminate TLS at the proxy and forward plain HTTP downstream. |
| **Security / WAF** – filter or block malicious requests before they hit your app. |
| **URL rewriting / path routing** – expose many services under a single domain. |
| **Caching / compression** – reduce load on back‑ends. |
| **Micro‑services gateway** – route requests to the right service by host/path. |

Below you’ll find step‑by‑step instructions for three popular reverse proxy stacks:

1. **Nginx** (lightweight, widely used)
2. **Apache HTTP Server** with `mod_proxy`
3. **Traefik** (dynamic, micro‑service friendly)

Feel free to pick the one that best fits your environment and skill set.

---

## 1. NGINX Reverse Proxy

### Prerequisites

- A Linux server (Ubuntu/Debian/RedHat/CentOS) with root or sudo access.
- Backend application running on a port, e.g., `http://localhost:3000`.

### Installation

```bash
# Debian / Ubuntu
sudo apt update
sudo apt install nginx -y

# CentOS / RHEL (EPEL)
sudo yum install epel-release -y
sudo yum install nginx -y
```

### Basic Configuration

Create a new server block in `/etc/nginx/sites-available/example.com`:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Optional: redirect HTTP → HTTPS (see SSL section)
    # return 301 https://$host$request_uri;

    location / {
        proxy_pass http://localhost:3000;          # Backend URL
        proxy_set_header Host $host;              # Preserve original host header
        proxy_set_header X-Real-IP $remote_addr;  # Forward client IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files (optional)
    location /static/ {
        alias /var/www/example.com/static/;
        expires max;
        add_header Cache-Control public;
    }
}
```

Enable the site and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t   # Test config syntax
sudo systemctl reload nginx
```

### SSL/TLS (Let’s Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain a certificate and automatically configure Nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will modify the server block to listen on port 443, add the `ssl_*` directives, and set up auto‑renewal.

### Advanced Options

| Feature | Configuration |
|---------|---------------|
| **Load balancing** (multiple backends) | Use `upstream` directive. |
| **WebSocket support** | Add `proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade";` |
| **Health checks** | Third‑party modules or external scripts. |
| **Rate limiting / DDoS protection** | `limit_req_zone`, `limit_conn_zone`. |

---

## 2. Apache HTTP Server Reverse Proxy

### Prerequisites

- Apache installed (`apache2` on Debian/Ubuntu, `httpd` on CentOS/RHEL).
- Backend application listening on `localhost:3000`.

### Enable Modules

```bash
# Debian / Ubuntu
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers   # optional but recommended
sudo systemctl restart apache2

# CentOS / RHEL
sudo yum install httpd -y
sudo systemctl start httpd
```

### Virtual Host Configuration

Create `/etc/apache2/sites-available/example.com.conf` (Debian) or `/etc/httpd/conf.d/example.com.conf` (CentOS):

```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com

    # Proxy settings
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    # Optional headers for client IP
    RequestHeader set X-Forwarded-Proto "expr=%{REQUEST_SCHEME}"
    RequestHeader set X-Real-IP expr=%{REMOTE_ADDR}
</VirtualHost>
```

Enable the site (Debian) and reload:

```bash
# Debian / Ubuntu
sudo a2ensite example.com.conf
sudo systemctl reload apache2

# CentOS / RHEL – just restart httpd
sudo systemctl reload httpd
```

### SSL/TLS with Let's Encrypt

Same as Nginx: use Certbot with the Apache plugin.

```bash
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache -d example.com -d www.example.com
```

---

## 3. TRAEFIK – Dynamic Reverse Proxy for Micro‑services

Traefik shines when you have many services that start/stop dynamically (Docker, Kubernetes, etc.).  
It auto‑discovers containers and configures routing without manual edits.

### Prerequisites

- Docker (or any container runtime).
- At least one backend service exposing a port (e.g., `node:3000`).

### Quick Start with Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    command:
      - "--api.insecure=true"          # Dashboard (disable in prod)
      - "--providers.docker"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"                    # Traefik dashboard
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"

  app:
    image: node:18-alpine
    command: ["node", "server.js"]     # Your app entrypoint
    expose:
      - "3000"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(`example.com`)"
      - "traefik.http.services.app.loadbalancer.server.port=3000"
```

Run:

```bash
docker compose up -d
```

Traefik will automatically route `http://example.com/` to the `app` container’s port 3000.  
Visit `http://localhost:8080/dashboard/` for the UI.

### Adding TLS

Add Docker labels or a `traefik.yml` config that uses Let’s Encrypt:

```yaml
    - "traefik.http.routers.app.tls=true"
    - "traefik.http.routers.app.tls.certresolver=le"

# In the same compose file, add:
  certs:
    image: traefik/whoami  # dummy service for resolver test
    command: ["-tls"]
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.certs.rule=Host(`acme-challenge.example.com`)"
      - "traefik.http.services.certs.loadbalancer.server.port=80"

  # TLS resolver
  tls-resolver:
    image: traefik/whoami
    command: ["-tls"]
```

Or create a `certificates.yml`:

```yaml
tls:
  certificatesResolvers:
    le:
      acme:
        email: admin@example.com
        storage: /acme.json
        httpChallenge:
          entryPoint: web
```

Mount `/acme.json` as a volume and set appropriate permissions.

---

## Common Troubleshooting Tips

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| 502 Bad Gateway | Backend down or wrong port | Verify backend is running; check `proxy_pass`/`ProxyPass`. |
| No response after HTTPS redirect | SSL cert not installed | Run Certbot again, or manually configure `ssl_*` directives. |
| IP addresses show as proxy IP | Missing headers | Add `X-Forwarded-For`, `X-Real-IP` (Nginx) or `RequestHeader set X-Real-IP`. |
| Slow startup after deploying new config | Syntax error in config | Run `nginx -t` / `apachectl configtest`. |
| Port 80 blocked by firewall | Firewall rules | Allow port 80/443 (`ufw allow http`, `firewall-cmd --add-service=http`). |

---

## Summary Checklist

1. **Choose your proxy** (Nginx, Apache, Traefik, etc.).
2. **Install** the software on a machine that clients can reach.
3. **Configure backend routing** – point to your app’s IP/port.
4. **Add headers** to forward client info if needed.
5. **Secure with TLS** (Let’s Encrypt is free & automated).
6. **Enable logging / monitoring** – logs in `/var/log/nginx/access.log` or Traefik dashboard.
7. **Test**: `curl -I http://example.com`, verify headers, SSL certs.

Once set up, you can expand to load balancing, caching, rate limiting, and even integrate with service meshes. Happy proxying!