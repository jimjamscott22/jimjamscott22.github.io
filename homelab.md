---
layout: default
title: Homelab
permalink: /homelab/
---

# Homelab

Notes from the always-on gear and experiments running in the lab. Replace the image placeholders with rack shots or dashboards when ready.

## Core services
<div class="card-grid">
  <article class="card">
    <div class="placeholder-img" aria-hidden="true">rack photo placeholder</div>
    <header class="card-header">
      <h2>Edge + VLANs</h2>
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
    <div class="placeholder-img" aria-hidden="true">service placeholder</div>
    <header class="card-header">
      <h2>Services VM</h2>
      <span class="badge status status-planned">planned</span>
    </header>
    <p>Container host for Pi-hole, Unbound, and a small git/CI runner; all IaC-driven.</p>
    <div class="card-meta">
      <span class="badge tag">docker</span>
      <span class="badge tag">iac</span>
      <span class="badge tag">dns</span>
    </div>
    <a class="card-link" href="#">Compose file →</a>
  </article>
</div>
