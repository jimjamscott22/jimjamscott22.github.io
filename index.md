---
layout: default
title: Jamie Lab
---

# Welcome to Jamie Lab

> A digital workspace for experiments, homelab builds, cyber tinkering and other curiosities.

---

<div id="type-intro" class="typewriter"></div>

<script>
  const msg = "Initializing JamieLab command console...";
  let i = 0;

  function type() {
    if (i < msg.length) {
      document.getElementById("type-intro").textContent += msg.charAt(i);
      i++;
      setTimeout(type, 60);
    }
  }

  document.addEventListener("DOMContentLoaded", type);
</script>

<div id="terminal">
  <div id="output"></div>
  <span class="prompt">lab@jamie:~$ </span><input id="terminal-input" autofocus />
</div>

<script>
document.getElementById("terminal-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const cmd = this.value.trim();
    const output = document.getElementById("output");
    const line = document.createElement("div");

    if (cmd === "help") {
      line.textContent = "Available commands: help, projects, about";
    } else if (cmd === "projects") {
      line.textContent = "Listing repositories...";
    } else if (cmd === "about") {
      line.textContent = "Jamie Lab // Homelab Ops // Cyber tinkering";
    } else {
      line.textContent = "Unknown command: " + cmd;
    }

    output.appendChild(line);
    this.value = "";
    output.scrollTop = output.scrollHeight;
  }
});
</script>

<pre id="ascii-banner"></pre>
<script src="/assets/js/ascii.js"></script>


## Projects

- **ThreatStream Lite**  
  RSS threat intel aggregator built with FastAPI, Tailwind and SQLite.

- **Fort Knox LAN**  
  A network segmentation experiment with VLANs, Pi servers and tunneling tools.

- **Raspberry Pi Lab**  
  Multiple Pi 5 and Pi 4 boards with servers, dashboards, DNS, and log tools.

---

## About

I'm Jamie, and this is my lab.  
I explore systems, networks, automation, security, and infrastructure... usually with too many Raspberry Pis.

---

[Projects](/projects) • [About](/about)

*Site powered by GitHub Pages and the Jekyll Hacker theme.*
