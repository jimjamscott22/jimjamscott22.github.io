---
layout: default
title: Homelab
permalink: /homelab/
description: "Overview of core homelab services including Pi-hole DNS, Tailscale VPN, network infrastructure, and various self-hosted applications."
---

# Homelab

"I forged labs where LEDs cast their glow,
My Fort\-Knox LAN kept every flow;
From Pi\-holes to Tailscale's stream,
tinkering at last became a dream!"

## Core services
<!-- markdownlint-disable MD033 -->
<div class="card-grid">
  <article class="card">
    <img src="{{ "/img/services.webp" | relative_url }}" alt="Dashboard listing the self-hosted services running in the homelab" width="1600" height="846" loading="lazy" decoding="async">
    <header class="card-header">
      <h3>Dashboards</h3>
      <span class="badge status status-active">active</span>
    </header>
    <p>Centralized network dashboards provide real\-time status, traffic insights, and alerts for homelab devices and segments.</p>
    <div class="card-meta">
      <span class="badge tag">pfsense</span>
      <span class="badge tag">vlans</span>
      <span class="badge tag">ruleset</span>
    </div>
    <a class="card-link" href="{{ "/notes/pfsense-rule-tuning/" | relative_url }}">Firewall notes →</a>
  </article>

  <article class="card">
    <img src="{{ "/img/network_topology_var.webp" | relative_url }}" alt="Homelab network diagram: firewall and managed switch linking a Raspberry Pi 4 Docker host, a Synology NAS, and client devices over VLANs and a WireGuard VPN" width="1024" height="1024" loading="lazy" decoding="async">
    <header class="card-header">
      <h3>Tailscale mesh</h3>
      <span class="badge status status-active">active</span>
    </header>
    <p>Exit node, subnet router, and a few devices on the Tailnet for remote admin and quick access to files on my home network.</p>
    <div class="card-meta">
      <span class="badge tag">tailscale</span>
      <span class="badge tag">wireguard</span>
      <span class="badge tag">acl</span>
    </div>
    <a class="card-link" href="{{ "/notes/tailscale-subnet-routing/" | relative_url }}">ACL plan →</a>
  </article>
</div>
<!-- markdownlint-enable MD033 -->

## Monitoring and services
<div class="card-grid">
  <article class="card">
   <img src="{{ "/img/monitoring.JPG" | relative_url }}" alt="Monitoring Diagram" loading="lazy" decoding="async">
    <header class="card-header">
      <h3>Observability stack</h3>
      <span class="badge status status-building">building</span>
    </header>
    <p>Prometheus + Grafana on a small VM; exporters on switches, APs, and Proxmox nodes.</p>
    <div class="card-meta">
      <span class="badge tag">prometheus</span>
      <span class="badge tag">grafana</span>
      <span class="badge tag">proxmox</span>
    </div>
    <a class="card-link" href="{{ "/notes/prometheus-scrape-configs/" | relative_url }}">Dashboards →</a>
  </article>

  <article class="card">
    <img src="{{ "/img/fortinet.jpeg" | relative_url }}" alt="Fortinet diagram" loading="lazy" decoding="async">
    <header class="card-header">
      <h3>VaultWarden-Services VM</h3>
      <span class="badge status status-building">building</span>
    </header>
    <p>Primary Docker host for VaultWarden (self-hosted password manager), with Unbound and a lightweight git/CI runner; all managed via IaC.</p>
    <div class="card-meta">
      <span class="badge tag">docker</span>
      <span class="badge tag">VaultWarden</span>
      <span class="badge tag">dns</span>
    </div>
    <a class="card-link" href="{{ "/notes/vaultwarden-compose-template/" | relative_url }}">Compose template →</a>
  </article>
</div>
