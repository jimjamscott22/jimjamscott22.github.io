---
layout: default
title: Prometheus Scrape Configs
date: 2024-08-14
type: checklist
permalink: /notes/prometheus-scrape-configs/
---

# Prometheus Scrape Configs

**Date:** 2024-08-14  
**Type:** Checklist

## Overview

Reference checklist for configuring Prometheus scrape targets and exporters in a homelab environment.

## Configuration File Location

```bash
/etc/prometheus/prometheus.yml
```

## Basic Scrape Config Template

```yaml
scrape_configs:
  - job_name: 'job-name'
    scrape_interval: 15s
    scrape_timeout: 10s
    static_configs:
      - targets: ['hostname:port']
        labels:
          environment: 'homelab'
          location: 'rack1'
```

## Common Exporters Checklist

### ✅ Node Exporter (System Metrics)

```yaml
- job_name: 'node-exporter'
  scrape_interval: 15s
  static_configs:
    - targets:
        - 'server1:9100'
        - 'server2:9100'
        - 'pi1:9100'
      labels:
        group: 'servers'
```

**Installation:**
```bash
# Download and install
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
tar xvfz node_exporter-*.tar.gz
sudo cp node_exporter-*/node_exporter /usr/local/bin/
sudo useradd -rs /bin/false node_exporter

# Create systemd service
sudo nano /etc/systemd/system/node_exporter.service
```

**Service file:**
```ini
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

### ✅ Blackbox Exporter (HTTP/HTTPS Probing)

```yaml
- job_name: 'blackbox-http'
  metrics_path: /probe
  params:
    module: [http_2xx]
  static_configs:
    - targets:
        - https://example.com
        - http://192.168.1.1
  relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: localhost:9115
```

### ✅ cAdvisor (Container Metrics)

```yaml
- job_name: 'cadvisor'
  scrape_interval: 15s
  static_configs:
    - targets:
        - 'docker-host:8080'
```

**Docker Compose:**
```yaml
version: '3'
services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    restart: unless-stopped
```

### ✅ Pi-hole Exporter

```yaml
- job_name: 'pihole'
  scrape_interval: 30s
  static_configs:
    - targets:
        - 'pihole:9617'
```

### ✅ SNMP Exporter (Network Devices)

```yaml
- job_name: 'snmp'
  scrape_interval: 60s
  static_configs:
    - targets:
        - 192.168.1.1  # Router
        - 192.168.1.2  # Switch
  metrics_path: /snmp
  params:
    module: [if_mib]
  relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: localhost:9116
```

### ✅ Nginx Exporter

```yaml
- job_name: 'nginx'
  scrape_interval: 15s
  static_configs:
    - targets:
        - 'webserver:9113'
```

### ✅ PostgreSQL Exporter

```yaml
- job_name: 'postgres'
  scrape_interval: 30s
  static_configs:
    - targets:
        - 'db-server:9187'
```

## Service Discovery (Optional)

### File-based Service Discovery

```yaml
- job_name: 'file-sd'
  file_sd_configs:
    - files:
        - '/etc/prometheus/targets/*.yml'
      refresh_interval: 5m
```

**Example target file (`/etc/prometheus/targets/servers.yml`):**
```yaml
- targets:
    - 'server1:9100'
    - 'server2:9100'
  labels:
    job: 'node-exporter'
    environment: 'production'
```

## Relabeling Examples

### Add Custom Labels

```yaml
relabel_configs:
  - target_label: 'datacenter'
    replacement: 'homelab'
```

### Drop Metrics

```yaml
metric_relabel_configs:
  - source_labels: [__name__]
    regex: 'node_network_.*'
    action: drop
```

## Complete Example Config

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    monitor: 'homelab-monitor'

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets:
          - 'server1:9100'
          - 'server2:9100'
          - 'pi1:9100'

  - job_name: 'cadvisor'
    static_configs:
      - targets:
          - 'docker-host:8080'

  - job_name: 'blackbox'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
          - https://google.com
          - http://192.168.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: localhost:9115
```

## Validation Checklist

- [ ] Config syntax is valid (`promtool check config prometheus.yml`)
- [ ] All target endpoints are reachable
- [ ] Firewall rules allow scraping
- [ ] Exporters are running and responding
- [ ] Metrics appear in Prometheus UI
- [ ] Labels are correctly applied
- [ ] Scrape intervals are appropriate
- [ ] No authentication errors in logs

## Testing Commands

```bash
# Validate config
promtool check config /etc/prometheus/prometheus.yml

# Test scrape endpoint
curl http://target:9100/metrics

# Reload Prometheus config
curl -X POST http://localhost:9090/-/reload
# OR
sudo systemctl reload prometheus

# Check targets status
curl http://localhost:9090/api/v1/targets | jq
```

## Troubleshooting

### Target Down

```bash
# Check if exporter is running
sudo systemctl status node_exporter

# Check if port is listening
sudo netstat -tulpn | grep 9100

# Test connectivity
curl http://target:9100/metrics

# Check Prometheus logs
sudo journalctl -u prometheus -f
```

### High Cardinality Issues

```yaml
# Drop high-cardinality labels
metric_relabel_configs:
  - source_labels: [__name__]
    regex: 'high_cardinality_metric_.*'
    action: drop
```

## Performance Tips

- Use appropriate scrape intervals (don't scrape too frequently)
- Drop unnecessary metrics with `metric_relabel_configs`
- Use recording rules for frequently queried metrics
- Monitor Prometheus resource usage

## Useful Queries

```promql
# Check scrape duration
scrape_duration_seconds

# Check up status
up{job="node-exporter"}

# Count targets by job
count by (job) (up)
```

## References

- [Prometheus Configuration Docs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)
- [Exporter List](https://prometheus.io/docs/instrumenting/exporters/)
- [Best Practices](https://prometheus.io/docs/practices/naming/)
