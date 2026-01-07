---
title: "Setting up a new dev device"
date: 2026-01-08 09:00:00 -0500
tags: [linux, dev, workflow]
description: "A practical checklist for getting a new machine ready for coding."
---

New machine day. This is the short, repeatable setup I use to get a device ready for development. The examples assume Ubuntu/Debian; adjust for your distro.

## 1. Update the base system

```bash
sudo apt update
sudo apt upgrade -y
```

If this is a fresh install, reboot once so kernel and firmware updates are applied.

## 2. Install essentials

```bash
sudo apt install -y \
  build-essential \
  git \
  curl \
  wget \
  unzip \
  jq \
  tmux \
  htop
```

## 3. Set up Git

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

## 4. Create SSH keys for Git hosting

```bash
ssh-keygen -t ed25519 -C "you@example.com"
ssh-agent -s
ssh-add ~/.ssh/id_ed25519
```

Add the public key to your Git host:

```bash
cat ~/.ssh/id_ed25519.pub
```

## 5. Editor and shell quality-of-life

- Install your editor (VS Code, Neovim, etc.)
- Set a consistent shell prompt theme
- Enable useful aliases

Example for Neovim:

```bash
sudo apt install -y neovim
```

## 6. Language runtimes

Install the languages you use most. I usually start with Python and Node:

```bash
sudo apt install -y python3 python3-venv python3-pip
sudo apt install -y nodejs npm
```

If you prefer version managers, set up `pyenv` or `nvm` early to avoid rework.

## 7. Containers and local services

If you do local development with containers:

```bash
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
```

Log out and back in so the group change applies.

## 8. Restore dotfiles

Pull your dotfiles repo and apply them. Keep this step late so base packages are present.

```bash
git clone git@github.com:yourname/dotfiles.git ~/dotfiles
```

## 9. Quick security pass

- Enable the firewall
- Set up automatic updates if desired
- Make sure disk encryption is enabled on laptops

```bash
sudo ufw enable
sudo ufw allow ssh
```

## 10. Sanity checklist

- `git clone` works over SSH
- Editor launches and has plugins installed
- Your preferred languages run
- Terminal and fonts look right

That is it. After this, I usually keep a small `setup.md` in the repo to record anything specific to that machine.
