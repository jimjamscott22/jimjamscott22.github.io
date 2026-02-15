---
layout: default
title: Git Commands Cheat Sheet
date: 2026-02-15
category: programming
tags: [git, version-control, tools]
permalink: /info/git-commands/
---

# Git Commands Cheat Sheet

**Category:** Programming | **Updated:** 2026-02-15

Git is a distributed version control system that tracks changes in source code during software development. This cheat sheet covers essential Git commands organized by workflow, from basic operations to advanced techniques.

<!--more-->

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git init` | Initialize repository |
| `git clone <url>` | Clone repository |
| `git status` | Check working tree status |
| `git add <file>` | Stage changes |
| `git commit -m "msg"` | Commit staged changes |
| `git push` | Push commits to remote |
| `git pull` | Fetch and merge changes |
| `git branch` | List branches |
| `git checkout <branch>` | Switch branches |
| `git merge <branch>` | Merge branch |
| `git log` | View commit history |

---

## Setup & Configuration

### Initial Setup

```bash
# Set user name and email (required for commits)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Set default editor
git config --global core.editor "vim"
git config --global core.editor "code --wait"  # VS Code

# Enable colored output
git config --global color.ui auto

# Set line ending preferences
git config --global core.autocrlf input   # Linux/Mac
git config --global core.autocrlf true    # Windows
```

### View Configuration

```bash
# List all settings
git config --list

# List with origin
git config --list --show-origin

# Get specific value
git config user.name
git config user.email

# Edit config file directly
git config --global --edit
```

### Configuration Levels

```bash
# System level (all users)
git config --system

# Global level (current user)
git config --global

# Local level (current repository)
git config --local
```

---

## Creating Repositories

### Initialize New Repository

```bash
# Create new Git repository in current directory
git init

# Create repository with specific name
git init my-project

# Initialize with main as default branch
git init -b main
```

### Clone Existing Repository

```bash
# Clone repository
git clone https://github.com/user/repo.git

# Clone to specific directory
git clone https://github.com/user/repo.git my-folder

# Clone specific branch
git clone -b develop https://github.com/user/repo.git

# Clone with shallow history (faster, less space)
git clone --depth 1 https://github.com/user/repo.git

# Clone without checkout (bare repository)
git clone --bare https://github.com/user/repo.git
```

---

## Basic Workflow

### Checking Status

```bash
# Show working tree status
git status

# Short format
git status -s
git status --short

# Show branch info
git status -b
git status --branch
```

### Staging Changes

```bash
# Stage specific file
git add filename.txt

# Stage all changes in directory
git add .
git add --all

# Stage all modified files (not new untracked files)
git add -u
git add --update

# Interactive staging
git add -i
git add --interactive

# Stage parts of file (patch mode)
git add -p filename.txt
git add --patch filename.txt

# Stage specific file types
git add *.js
git add src/**/*.py
```

### Committing Changes

```bash
# Commit staged changes
git commit -m "Commit message"

# Commit with multiline message
git commit -m "Title" -m "Description line 1" -m "Description line 2"

# Stage all tracked files and commit
git commit -a -m "Commit message"
git commit -am "Commit message"

# Amend last commit (change message or add changes)
git commit --amend -m "New message"

# Amend without changing message
git commit --amend --no-edit

# Commit with detailed message in editor
git commit

# Empty commit (useful for CI triggers)
git commit --allow-empty -m "Trigger build"
```

### Viewing Changes

```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged
git diff --cached

# Show changes in specific file
git diff filename.txt

# Show changes between commits
git diff commit1 commit2

# Show changes between branches
git diff main feature-branch

# Show word-level diff (instead of line)
git diff --word-diff

# Show statistics
git diff --stat
```

---

## Branching

### Creating & Switching Branches

```bash
# List branches
git branch              # Local branches
git branch -r           # Remote branches
git branch -a           # All branches

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch to new branch
git checkout -b feature-name

# Modern alternative (Git 2.23+)
git switch feature-name           # Switch
git switch -c feature-name        # Create and switch

# Create branch from specific commit
git branch feature-name abc123

# Create branch from remote branch
git checkout -b feature-name origin/feature-name
git checkout --track origin/feature-name  # Same as above
```

### Deleting Branches

```bash
# Delete local branch (if merged)
git branch -d feature-name

# Force delete local branch
git branch -D feature-name

# Delete remote branch
git push origin --delete feature-name
git push origin :feature-name  # Alternative syntax

# Prune deleted remote branches
git fetch --prune
git fetch -p
```

### Renaming Branches

```bash
# Rename current branch
git branch -m new-name

# Rename specific branch
git branch -m old-name new-name

# Rename and update remote
git branch -m old-name new-name
git push origin :old-name new-name
git push origin -u new-name
```

---

## Merging

### Basic Merge

```bash
# Merge branch into current branch
git merge feature-branch

# Merge with commit message
git merge feature-branch -m "Merge feature"

# Merge without fast-forward (always create merge commit)
git merge --no-ff feature-branch

# Merge with fast-forward only (fail if not possible)
git merge --ff-only feature-branch
```

### Merge Conflict Resolution

```bash
# View merge conflicts
git status

# View files with conflicts
git diff --name-only --diff-filter=U

# Abort merge
git merge --abort

# After resolving conflicts manually
git add resolved-file.txt
git commit

# Use ours (current branch) for all conflicts
git checkout --ours .
git add .

# Use theirs (merging branch) for all conflicts
git checkout --theirs .
git add .

# Use mergetool
git mergetool
```

---

## Rebasing

### Basic Rebase

```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Interactive rebase from specific commit
git rebase -i abc123

# Continue after resolving conflicts
git rebase --continue

# Skip current commit
git rebase --skip

# Abort rebase
git rebase --abort
```

### Interactive Rebase Commands

In interactive rebase editor:
```
pick abc123 Commit message       # Use commit as-is
reword abc123 Commit message     # Use commit, edit message
edit abc123 Commit message       # Use commit, stop for amending
squash abc123 Commit message     # Meld into previous commit
fixup abc123 Commit message      # Like squash, discard message
drop abc123 Commit message       # Remove commit
```

### Rebase vs Merge

```bash
# Merge (preserves history)
git checkout feature
git merge main

# Rebase (linear history)
git checkout feature
git rebase main
```

---

## Remote Operations

### Managing Remotes

```bash
# List remotes
git remote
git remote -v  # Show URLs

# Add remote
git remote add origin https://github.com/user/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream

# Show remote info
git remote show origin
```

### Fetching & Pulling

```bash
# Fetch all remotes
git fetch

# Fetch specific remote
git fetch origin

# Fetch specific branch
git fetch origin main

# Pull (fetch + merge)
git pull

# Pull with rebase instead of merge
git pull --rebase
git pull -r

# Pull from specific remote and branch
git pull origin main

# Fetch and prune deleted remote branches
git fetch --prune
```

### Pushing

```bash
# Push to remote
git push

# Push and set upstream
git push -u origin main
git push --set-upstream origin main

# Push all branches
git push --all

# Push tags
git push --tags

# Force push (dangerous!)
git push --force
git push -f

# Safer force push (fails if remote has commits you don't have)
git push --force-with-lease

# Push to different branch name
git push origin local-branch:remote-branch

# Delete remote branch
git push origin --delete branch-name
```

---

## Viewing History

### Log Commands

```bash
# View commit history
git log

# One line per commit
git log --oneline

# Show last n commits
git log -n 5
git log -5

# Show commits with changes
git log -p
git log --patch

# Show statistics
git log --stat

# Show graph
git log --graph --oneline --all
git log --graph --decorate --all

# Show commits by author
git log --author="John Doe"

# Show commits with message pattern
git log --grep="fix"

# Show commits in date range
git log --since="2 weeks ago"
git log --after="2024-01-01"
git log --before="2024-12-31"

# Show commits affecting specific file
git log -- filename.txt
git log -p -- filename.txt  # With changes

# Show commits on one branch but not another
git log main..feature-branch
```

### Pretty Formatting

```bash
# Custom format
git log --pretty=format:"%h - %an, %ar : %s"

# Common placeholders:
# %h  = abbreviated commit hash
# %H  = full commit hash
# %an = author name
# %ae = author email
# %ad = author date
# %ar = author date (relative)
# %s  = subject (commit message)

# Nice alias for log
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

### Show Specific Commit

```bash
# Show commit details
git show abc123

# Show specific file from commit
git show abc123:path/to/file.txt

# Show changes in commit
git show abc123 --stat
git show abc123 --name-only
```

---

## Undoing Changes

### Working Directory

```bash
# Discard changes in file
git checkout -- filename.txt
git restore filename.txt  # Modern way (Git 2.23+)

# Discard all changes
git checkout -- .
git restore .

# Remove untracked files
git clean -n   # Dry run
git clean -f   # Remove files
git clean -fd  # Remove files and directories
git clean -fX  # Remove only ignored files
git clean -fx  # Remove untracked and ignored files
```

### Unstaging

```bash
# Unstage file (keep changes in working directory)
git reset HEAD filename.txt
git restore --staged filename.txt  # Modern way

# Unstage all files
git reset HEAD
git restore --staged .
```

### Resetting Commits

```bash
# Soft reset: move HEAD, keep changes staged
git reset --soft HEAD~1

# Mixed reset (default): move HEAD, unstage changes
git reset HEAD~1
git reset --mixed HEAD~1

# Hard reset: move HEAD, discard all changes
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard abc123

# Reset specific file to last commit
git checkout HEAD -- filename.txt
```

### Reverting Commits

```bash
# Create new commit that undoes changes
git revert abc123

# Revert last commit
git revert HEAD

# Revert without committing (stage changes)
git revert -n abc123
git revert --no-commit abc123

# Revert merge commit
git revert -m 1 abc123
```

---

## Stashing

### Basic Stash

```bash
# Stash changes
git stash
git stash save "Work in progress"

# Stash including untracked files
git stash -u
git stash --include-untracked

# Stash including ignored files
git stash -a
git stash --all

# List stashes
git stash list

# Show stash contents
git stash show
git stash show -p stash@{0}  # Show as patch

# Apply last stash (keep in stash list)
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Pop last stash (apply and remove)
git stash pop

# Pop specific stash
git stash pop stash@{2}

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### Advanced Stash

```bash
# Create branch from stash
git stash branch feature-name stash@{0}

# Stash only staged changes
git stash --staged

# Stash with interactive selection
git stash -p
git stash --patch
```

---

## Tagging

### Creating Tags

```bash
# Lightweight tag (pointer to commit)
git tag v1.0.0

# Annotated tag (full object, recommended)
git tag -a v1.0.0 -m "Version 1.0.0"

# Tag specific commit
git tag -a v1.0.0 abc123 -m "Version 1.0.0"

# List tags
git tag
git tag -l "v1.*"  # Pattern matching
```

### Pushing Tags

```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push --tags
git push origin --tags

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
git push origin :refs/tags/v1.0.0
```

### Viewing Tags

```bash
# Show tag info
git show v1.0.0

# Checkout tag
git checkout v1.0.0  # Detached HEAD state

# Create branch from tag
git checkout -b branch-name v1.0.0
```

---

## Advanced Operations

### Cherry-pick

```bash
# Apply specific commit to current branch
git cherry-pick abc123

# Cherry-pick multiple commits
git cherry-pick abc123 def456

# Cherry-pick without committing
git cherry-pick -n abc123
git cherry-pick --no-commit abc123

# Cherry-pick from another branch
git cherry-pick feature-branch~2
```

### Bisect (Binary Search for Bugs)

```bash
# Start bisect
git bisect start

# Mark current commit as bad
git bisect bad

# Mark older commit as good
git bisect good abc123

# Git will checkout middle commit, test and mark:
git bisect bad   # If bug present
git bisect good  # If bug not present

# Git automatically finds first bad commit

# Reset after finding bug
git bisect reset
```

### Submodules

```bash
# Add submodule
git submodule add https://github.com/user/repo.git path/to/submodule

# Initialize submodules after cloning
git submodule init
git submodule update

# Clone with submodules
git clone --recursive https://github.com/user/repo.git

# Update submodules
git submodule update --remote

# Remove submodule
git submodule deinit path/to/submodule
git rm path/to/submodule
rm -rf .git/modules/path/to/submodule
```

### Worktree (Multiple Working Directories)

```bash
# List worktrees
git worktree list

# Add new worktree
git worktree add ../feature-dir feature-branch

# Remove worktree
git worktree remove ../feature-dir

# Prune stale worktrees
git worktree prune
```

---

## Inspection & Comparison

### Blame (Find Who Changed Line)

```bash
# Show who last modified each line
git blame filename.txt

# Show blame for specific lines
git blame -L 10,20 filename.txt

# Ignore whitespace changes
git blame -w filename.txt

# Show original commit (follow moves)
git blame -C filename.txt
```

### Grep (Search in Files)

```bash
# Search in tracked files
git grep "search term"

# Show line numbers
git grep -n "search term"

# Show count of matches per file
git grep -c "search term"

# Search in specific commit
git grep "search term" abc123

# Search with context
git grep -A 2 -B 2 "search term"  # 2 lines after and before
```

### Diff Tools

```bash
# Configure difftool
git config --global diff.tool vimdiff
git config --global difftool.prompt false

# Use difftool
git difftool

# Configure mergetool
git config --global merge.tool vimdiff

# Use mergetool
git mergetool
```

---

## Aliases

### Creating Aliases

```bash
# Create alias
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# Complex aliases
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
git config --global alias.amend 'commit --amend --no-edit'
```

### Useful Aliases

```bash
# Pretty log
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Show branches sorted by last modified
git config --global alias.recent "branch --sort=-committerdate"

# Undo last commit but keep changes
git config --global alias.undo 'reset --soft HEAD~1'

# Show what you've changed since last pull
git config --global alias.new 'log HEAD..origin/main --oneline'

# Delete merged branches
git config --global alias.cleanup "!git branch --merged | grep -v '\\*' | xargs -n 1 git branch -d"
```

---

## .gitignore

### Syntax

```bash
# Ignore specific file
secret.txt

# Ignore all files with extension
*.log
*.tmp

# Ignore directory
node_modules/
.cache/

# Negative pattern (don't ignore)
!important.log

# Ignore files only in current directory (not subdirectories)
/config.json

# Ignore files in any subdirectory
**/temp

# Comments
# This is a comment
```

### Common Patterns

```gitignore
# Dependencies
node_modules/
vendor/
packages/

# Build output
dist/
build/
out/
target/
bin/

# Environment files
.env
.env.local
*.env

# IDE files
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Logs
*.log
logs/
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
*.cache
.cache/
```

### Global .gitignore

```bash
# Create global gitignore
git config --global core.excludesfile ~/.gitignore_global

# Add OS-specific files
echo ".DS_Store" >> ~/.gitignore_global       # macOS
echo "Thumbs.db" >> ~/.gitignore_global        # Windows
echo "*.swp" >> ~/.gitignore_global            # Vim
```

---

## Troubleshooting

### Fixing Common Issues

```bash
# Wrong commit message
git commit --amend -m "Correct message"

# Forgot to add file to last commit
git add forgotten-file.txt
git commit --amend --no-edit

# Committed to wrong branch
git checkout correct-branch
git cherry-pick main  # Cherry-pick from main
git checkout main
git reset --hard HEAD~1  # Remove from main

# Accidentally committed sensitive data
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch sensitive-file.txt" \
  --prune-empty --tag-name-filter cat -- --all

# Or use BFG Repo-Cleaner (faster)
bfg --delete-files sensitive-file.txt

# Recover deleted branch
git reflog  # Find commit hash
git checkout -b recovered-branch abc123

# Recover after hard reset
git reflog
git reset --hard abc123  # Reset to previous state
```

### Reflog (Safety Net)

```bash
# View reference log
git reflog

# View reflog for specific branch
git reflog show feature-branch

# Recover lost commits
git reflog  # Find commit hash
git checkout -b recovered abc123
```

---

## Performance & Maintenance

### Cleanup

```bash
# Garbage collection (cleanup unnecessary files)
git gc

# Aggressive garbage collection
git gc --aggressive --prune=now

# Verify repository integrity
git fsck

# Show repository size
git count-objects -vH

# Prune unreachable objects
git prune

# Clean up and optimize repository
git maintenance run
```

### Large Files

```bash
# Find large files
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sort -n -k 3 | \
  tail -20

# Use Git LFS for large files
git lfs install
git lfs track "*.psd"
git add .gitattributes
```

---

## Best Practices

1. **Commit messages**: Clear, concise, present tense
   ```
   Good: "Add user authentication"
   Bad: "stuff", "fixed bug", "asdfgh"
   ```

2. **Commit often**: Small, logical commits
   - Easier to review
   - Easier to revert
   - Better history

3. **Pull before push**
   ```bash
   git pull --rebase
   git push
   ```

4. **Use branches** for features
   ```bash
   git checkout -b feature/user-auth
   # Work on feature
   git push -u origin feature/user-auth
   ```

5. **Never force push to shared branches**
   - `main` and `develop` should be protected
   - Force push only to your feature branches

6. **Review before committing**
   ```bash
   git diff --staged
   git status
   ```

7. **Keep branches up-to-date**
   ```bash
   git checkout main
   git pull
   git checkout feature-branch
   git rebase main
   ```

8. **.gitignore**: Ignore build artifacts, dependencies, secrets

9. **Sign commits** (optional but recommended)
   ```bash
   git config --global user.signingkey YOUR_GPG_KEY
   git config --global commit.gpgsign true
   ```

10. **Use SSH keys** instead of HTTPS passwords
