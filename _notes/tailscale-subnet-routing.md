---
layout: default
title: Tailscale Subnet Routing
date: 2024-09-27
type: how-to
permalink: /notes/tailscale-subnet-routing/
---

# Tailscale Subnet Routing

**Date:** 2024-09-27  
**Type:** How-To

## Overview

Guide for setting up Tailscale subnet routing to access your entire home network remotely without installing Tailscale on every device.

## Architecture

```
Internet
   |
   v
Tailscale Network (100.x.x.x)
   |
   v
Subnet Router (advertises 192.168.1.0/24)
   |
   v
Home LAN (192.168.1.0/24)
   |
   +-- Devices without Tailscale
```

## Prerequisites

- Tailscale account
- Linux machine on your LAN (can be Raspberry Pi, VM, etc.)
- Admin access to Tailscale admin console
- Basic networking knowledge

## Setup Steps

### 1. Install Tailscale on Subnet Router

```bash
# Ubuntu/Debian
curl -fsSL https://tailscale.com/install.sh | sh

# Start Tailscale
sudo tailscale up
```

### 2. Enable IP Forwarding

```bash
# Temporary (until reboot)
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
```

### 3. Advertise Subnet Routes

```bash
# Replace with your actual subnet
sudo tailscale up --advertise-routes=192.168.1.0/24 --accept-routes
```

### 4. Approve Routes in Admin Console

1. Go to [Tailscale Admin Console](https://login.tailscale.com/admin/machines)
2. Find your subnet router machine
3. Click the "..." menu
4. Select "Edit route settings"
5. Enable the advertised routes

### 5. Disable Key Expiry (Optional but Recommended)

```bash
# In admin console:
# Machine settings > Disable key expiry
```

## Verification

### From Another Tailscale Device

```bash
# Ping a device on your home network
ping 192.168.1.1

# Check routes
ip route | grep 192.168.1

# Test SSH to a home device
ssh user@192.168.1.10
```

## Advanced Configuration

### Multiple Subnets

```bash
# Advertise multiple subnets
sudo tailscale up --advertise-routes=192.168.1.0/24,10.0.0.0/24
```

### Exit Node (Full Internet Traffic)

```bash
# Make this device an exit node
sudo tailscale up --advertise-routes=192.168.1.0/24 --advertise-exit-node
```

### Firewall Rules

```bash
# If using UFW
sudo ufw allow in on tailscale0
sudo ufw allow 41641/udp  # Tailscale port

# If using iptables
sudo iptables -A FORWARD -i tailscale0 -j ACCEPT
sudo iptables -A FORWARD -o tailscale0 -j ACCEPT
```

## Troubleshooting

### Can't Access Subnet Devices

1. **Check IP forwarding:**
   ```bash
   sysctl net.ipv4.ip_forward
   # Should return: net.ipv4.ip_forward = 1
   ```

2. **Verify routes are approved:**
   - Check Tailscale admin console
   - Ensure routes show as "Enabled"

3. **Check firewall:**
   ```bash
   sudo iptables -L -n -v
   # Look for FORWARD chain rules
   ```

4. **Verify subnet router is online:**
   ```bash
   tailscale status
   ```

### Slow Performance

- Check subnet router hardware (CPU/RAM)
- Verify network bandwidth
- Consider using a more powerful device as subnet router

### Connection Drops

```bash
# Check Tailscale logs
sudo journalctl -u tailscale -f

# Restart Tailscale
sudo systemctl restart tailscale
```

## Security Considerations

- Only advertise subnets you need access to
- Use Tailscale ACLs to restrict access
- Keep subnet router updated
- Monitor access logs regularly

## ACL Example

```json
{
  "acls": [
    {
      "action": "accept",
      "src": ["user@example.com"],
      "dst": ["192.168.1.0/24:*"]
    }
  ]
}
```

## Performance Notes

- Typical latency: +10-30ms vs direct connection
- Throughput: Limited by subnet router hardware and internet connection
- Works great for SSH, RDP, web interfaces
- May not be ideal for large file transfers

## Useful Commands

```bash
# Check Tailscale status
tailscale status

# View current routes
tailscale status --json | jq '.Peer[] | select(.PrimaryRoutes != null)'

# Ping Tailscale device
tailscale ping <hostname>

# Check which routes are being used
ip route get 192.168.1.1
```

## References

- [Tailscale Subnet Routers Docs](https://tailscale.com/kb/1019/subnets/)
- [Tailscale ACL Documentation](https://tailscale.com/kb/1018/acls/)
- [Tailscale Exit Nodes](https://tailscale.com/kb/1103/exit-nodes/)
