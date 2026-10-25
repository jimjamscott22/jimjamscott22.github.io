---
layout: project
title: VillageSim
permalink: /projects/villagesim/
status: building
last_updated: 2026-10-25
tech_stack: [rust, tauri, react, typescript, canvas]
weight: -1
featured: true
description: "A desktop village simulator with autonomous villagers, a Rust simulation, and a React + Canvas renderer that interpolates between world snapshots."
repo: https://github.com/jimjamscott22/Villiage-Sims
---

## Problem

A village simulation needs to keep many systems moving together: villagers need food and rest, crops grow, buildings create jobs, and resources move through the settlement. VillageSim explores how to make those systems interact while keeping world state separate from drawing the screen.

## Approach

Rust owns the authoritative world inside a Tauri desktop app. Player commands flow into the simulation, and snapshots flow out to a React and Canvas interface. The renderer interpolates between snapshots so visual movement can update more often than the simulation clock.

Villagers score possible actions against needs such as hunger, energy, and social satisfaction. A new action must win by a margin before interrupting the current one, reducing rapid switches between nearly equal choices. Pathfinding, farming, production, hauling, and housing connect those decisions to the village economy.

## Decisions

**Keep world ownership in Rust.** A simulation thread owns the world and receives commands through a channel. The interface displays snapshots rather than maintaining a competing authoritative copy of each villager and resource.

**Separate simulation ticks from rendering.** The simulation advances on a fixed clock while the renderer interpolates positions between snapshots. Layered canvases, cached terrain, and viewport culling reduce unnecessary drawing and snapshot work.

**Make content data-driven.** Building and crop definitions live in JSON, keeping costs, footprints, jobs, and growth settings out of the rendering code. Versioned saves and autosave rotation preserve worlds as the simulator evolves.

## Result

VillageSim combines autonomous agents, a village economy, seasonal crops, weather, and persistent worlds in one desktop application. Its command-and-snapshot boundary provides a concrete example of separating simulation logic from a visual interface.

## Current limits

The full Rust simulation runs in the Tauri desktop app and requires its platform dependencies to build. The repository also includes a browser demo backed by a separate in-memory world; that demo is not the authoritative Rust runtime. Performance and behavior need checking in the desktop build as well as the browser renderer.
