---
layout: default
title: About
permalink: /about/
---

# About Jamie

Curious, technical, and usually building or breaking something in the homelab.

<div class="about-grid">
  <div class="about-copy">
    <p>I like practical security, network tinkering, and lightweight automation. This site is the public scratchpad for what is running, what broke, and what might get deployed next.</p>

    <h2>Stack & tools</h2>
    <ul>
      <li>pfSense, VLANs, WireGuard/Tailscale</li>
      <li>Linux, Docker, k3s, IaC in Ansible/Terraform lite</li>
      <li>Prometheus, Grafana, simple scripts in Python/Bash</li>
    </ul>

    <h2>Focus areas</h2>
    <ul>
      <li>Repeatable network/security baselines for the lab</li>
      <li>Small services with observability baked in</li>
      <li>Reducing toil with scripts and playbooks</li>
    </ul>

    <h2>Contact</h2>
    <p>Have a question or want to connect? Send me a message:</p>
    
    <form action="https://formspree.io/f/xqarrdda" method="POST" class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      
      <button type="submit">Send Message</button>
    </form>
  </div>

  <div class="about-visual">
    <img src="{{ "/img/hackerdog.PNG" | relative_url }}" alt="Pic of dog" loading="lazy" decoding="async" />
    <p class="about-caption">The site owner's Hacker dog Dozer</p> 
	<img src="{{ "/img/jamiehacker.PNG" | relative_url }}" alt="Pic of website owner" loading="lazy" decoding="async" />
    <p class="about-caption">The site owner</p>
  </div>
</div>
