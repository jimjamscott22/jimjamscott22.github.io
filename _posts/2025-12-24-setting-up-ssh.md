---
title: "Setting up SSH on a Linux Server"
date: 2025-12-24 01:45:00 -0500
tags: [homelab, security, linux]
description: "A quick guide on getting SSH up and running securely."
---

When getting a new Linux server or VM ready for remote access, setting up SSH (Secure Shell) is one of the first tasks. Here’s a quick guide to get you started securely.

## The first steps

1. **Install OpenSSH Server** (if not already installed):

```bash
# 1. Install OpenSSH Server
sudo apt update
sudo apt install openssh-server
```

# 2. Configure SSH
Edit the SSH configuration file to enhance security:

```bash
# 2. Edit SSH configuration
sudo nano /etc/ssh/sshd_config
```
Make the following changes:
- Change the default port (optional but recommended):
  ```Port 2222
  ```
- Disable root login:
  ```PermitRootLogin no
  ```
- Allow only specific users (optional):
  ```AllowUsers your_username
  ```
- Save and exit the file.
- Restart the SSH service to apply changes:
```bash
sudo systemctl restart sshd
```
## Enable UFW Firewall
To secure your SSH server, it's a good idea to set up a firewall using UFW (Uncomplicated Firewall).

```bash
# 1. Default deny incoming, allow outgoing
sudo ufw default deny incoming
sudo ufw default allow outgoing 
# 2. Allow SSH on the new port
sudo ufw allow 2222/tcp
# 3. Enable it
sudo ufw enable
```
## Check status

```bash
sudo ufw status numbered
```
Quick, easy, and essential for a secure lab environment.

<div style="display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; align-items:center;">
  <figure style="margin:0;">
    <img src="{{ "/img/sshdiagram.png" | relative_url }}" alt="SSH diagram" style="width:100%; height:auto;" />
    <figcaption style="opacity:.8; font-size:.9em; margin-top:.3rem;">SSH overview</figcaption>
  </figure>
  <figure style="margin:0;">
    <img src="{{ "/img/Find-Failed-SSH-Logins.png" | relative_url }}" alt="Failed SSH logins" style="width:100%; height:auto;" />
    <figcaption style="opacity:.8; font-size:.9em; margin-top:.3rem;">Finding failed logins</figcaption>
  </figure>
</div>