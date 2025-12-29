---
layout: default
title: Homelab
permalink: /homelab/
---

# Homelab

"I built labs where bright LEDs gleam,
My Fort-Knox-LAN locked down every stream;
From Pi‑holes to Tailscale,
my plans did not fail—
I think I turned tinkering into a dream!"

## Core services
<!-- markdownlint-disable MD033 -->
<div class="card-grid">
  <article class="card">
    <img src="{{ "/img/services.png" | relative_url }}" alt="web dash of running services" loading="lazy" decoding="async">
    <header class="card-header">
      <h2>Dashboard + VLANs</h2>
      <span class="badge status status-active">active</span>
    </header>
    <p>pfSense gateway with segmented VLANs for trusted, lab, guests, and IoT; DHCP/DNS split per zone.</p>
    <div class="card-meta">
      <span class="badge tag">pfsense</span>
      <span class="badge tag">vlans</span>
      <span class="badge tag">ruleset</span>
    </div>
    <a class="card-link" href="#">Firewall notes →</a>
  </article>

  <article class="card">
    <img src="{{ "/img/network_topology_var.png" | relative_url }}" alt="network diagram" loading="lazy" decoding="async">
    <header class="card-header">
      <h2>Tailscale mesh</h2>
      <span class="badge status status-active">active</span>
    </header>
    <p>Exit node, subnet router, and a few devices on the tailnet for remote admin and quick jumps.</p>
    <div class="card-meta">
      <span class="badge tag">tailscale</span>
      <span class="badge tag">wireguard</span>
      <span class="badge tag">acl</span>
    </div>
    <a class="card-link" href="#">ACL plan →</a>
  </article>
</div>
<!-- markdownlint-enable MD033 -->

## Monitoring and services
<div class="card-grid">
  <article class="card">
   <img src="{{ "/img/monitoring.JPG" | relative_url }}" alt="Monitoring Diagram" loading="lazy" decoding="async">
    <header class="card-header">
      <h2>Observability stack</h2>
      <span class="badge status status-building">building</span>
    </header>
    <p>Prometheus + Grafana on a small VM; exporters on switches, APs, and Proxmox nodes.</p>
    <div class="card-meta">
      <span class="badge tag">prometheus</span>
      <span class="badge tag">grafana</span>
      <span class="badge tag">proxmox</span>
    </div>
    <a class="card-link" href="#">Dashboards →</a>
  </article>

  <article class="card">
    <img src="{{ "/img/fortinet.jpeg" | relative_url }}" alt="Fortinet diagram" loading="lazy" decoding="async">
    <header class="card-header">
      <h2>VaultWarden-Services VM</h2>
      <span class="badge status status-building">building</span>
    </header>
    <p>Docker Container host for VaultWarden, Unbound, and a small git/CI runner; all IaC-driven.</p>
    <div class="card-meta">
      <span class="badge tag">docker</span>
      <span class="badge tag">VaultWarden</span>
      <span class="badge tag">dns</span>
    </div>
    <a class="card-link" href="{{ "/notes/vaultwarden-compose-template/" | relative_url }}">Compose template →</a>

  </article>
</div>
