---
layout: default
title: Project Admin
permalink: /project-admin/
---

# Project Admin

<div class="admin-notice">
  <span class="admin-notice-icon">🔒</span>
  <span>Admin only. Authenticate to create new projects.</span>
</div>

<div class="admin-container">
  <div class="admin-auth-section" id="auth-section">
    <h2>Authenticate</h2>
    <div class="form-group">
      <label for="admin-token">Admin Token</label>
      <input type="password" id="admin-token" placeholder="Enter your admin token" autocomplete="off">
    </div>
    <button type="button" class="admin-btn" id="auth-btn">Authenticate</button>
    <div class="admin-status" id="auth-status"></div>
  </div>

  <div class="admin-form-section" id="form-section" style="display: none;">
    <h2>New Project</h2>
    <form id="project-form" class="project-form">
      <div class="form-row">
        <div class="form-group">
          <label for="project-title">Title <span class="required">*</span></label>
          <input type="text" id="project-title" required placeholder="ThreatStream Lite">
        </div>
        <div class="form-group">
          <label for="project-slug">Slug <span class="required">*</span></label>
          <input type="text" id="project-slug" required placeholder="threatstream-lite">
          <small>Used in URL: /projects/slug/</small>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="project-status">Status <span class="required">*</span></label>
          <select id="project-status" required>
            <option value="">Select status...</option>
            <option value="active">Active</option>
            <option value="building">Building</option>
            <option value="planned">Planned</option>
          </select>
        </div>
        <div class="form-group">
          <label for="project-health">Health (for dashboard)</label>
          <select id="project-health">
            <option value="">None</option>
            <option value="healthy">Healthy</option>
            <option value="degraded">Degraded</option>
            <option value="down">Down</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="project-description">Description <span class="required">*</span></label>
        <textarea id="project-description" required rows="3" placeholder="Lightweight intel aggregator pulling feeds into a local DB..."></textarea>
      </div>

      <div class="form-group">
        <label for="project-tech-stack">Tech Stack (comma-separated)</label>
        <input type="text" id="project-tech-stack" placeholder="python, sqlite, rss">
        <small>Separate tags with commas</small>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="project-uptime">Uptime % (optional)</label>
          <input type="number" id="project-uptime" min="0" max="100" step="0.1" placeholder="99.8">
        </div>
        <div class="form-group">
          <label for="project-last-updated">Last Updated (YYYY-MM-DD)</label>
          <input type="date" id="project-last-updated">
        </div>
      </div>

      <div class="form-group">
        <label for="project-image">Image Path (optional)</label>
        <input type="text" id="project-image" placeholder="/img/project_screenshot.png">
        <small>Upload image to /img/ first, then reference here</small>
      </div>

      <div class="form-group">
        <label for="project-content">Full Content (Markdown)</label>
        <textarea id="project-content" rows="12" placeholder="## Overview

This project does...

## Features

- Feature 1
- Feature 2

## Setup

..."></textarea>
        <small>Full project page content in Markdown format</small>
      </div>

      <div class="form-actions">
        <button type="submit" class="admin-btn admin-btn-primary" id="submit-btn">
          <span id="submit-text">Create Project</span>
          <span id="submit-spinner" style="display: none;">⏳ Creating...</span>
        </button>
        <button type="button" class="admin-btn admin-btn-secondary" id="reset-btn">Reset Form</button>
      </div>

      <div class="admin-status" id="form-status"></div>
    </form>
  </div>
</div>

<script defer src="{{ '/assets/js/project-admin.js' | relative_url }}"></script>
