---
layout: project
title: Waypoint
permalink: /projects/waypoint/
status: building
last_updated: 2026-10-25
tech_stack: [javascript, react, fastify, mariadb, raspberry-pi, tailscale]
weight: -2
featured: true
description: "A private job-search dashboard with application tracking, daily job discovery, follow-up reminders, and outcome analytics backed by MariaDB."
repo: https://github.com/jimjamscott22/waypoint
---

## Problem

A job search produces more than a list of applications. New postings need review, existing applications need follow-ups, and it is easy to lose track of which searches lead anywhere. Waypoint brings that work into one private dashboard.

## Approach

A React and Vite frontend connects to a Fastify API backed by MariaDB. Jobs move through Saved, Applied, Interviewing, Offer, and Closed stages. Pasted URLs create editable drafts, while daily Adzuna ingestion puts new matches into a review queue where they can be saved or dismissed.

The dashboard combines next-action dates with stage history, conversion views, weekly activity, and saved-query performance. Deployment files cover a Raspberry Pi setup using systemd, backups, and Tailscale Serve for private access.

## Decisions

**A shared database rather than separate browser copies.** MariaDB is authoritative, so devices use the same API-backed pipeline. Existing browser data has a one-time import or discard path when moving to server-backed storage.

**Review discoveries before adding them.** Scheduled matches enter a separate queue instead of automatically becoming applications. This keeps finding a posting distinct from deciding to pursue it.

**Record history without inventing it.** Conversion and activity metrics use recorded stage transitions from the Insights migration onward. The interface shows when reliable history starts rather than assigning made-up dates to earlier activity.

## Result

Waypoint connects job discovery, application tracking, follow-up planning, and outcome review. It also brings the application and homelab sides of the project together: a database-backed web app with documented private deployment and backup procedures.

## Current limits

The dashboard is designed primarily for desktop use. Running it requires MariaDB and server configuration; scheduled discovery also needs Adzuna credentials. Private access means there is no public dashboard demo linked here. Database integration tests require a live MariaDB instance and are separate from the unit tests and build checks in CI.
