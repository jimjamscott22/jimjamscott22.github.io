# Project Admin API

This directory contains the serverless function that powers the project admin interface.

## Overview

The admin API receives project data from `/project-admin/` and creates a new `_projects/*.md` file in your GitHub repository, which triggers a rebuild of your Jekyll site.

## Setup Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy this function**:
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard:
   - `GITHUB_TOKEN`: Personal access token with `repo` scope
   - `GITHUB_REPO`: `jimjamscott22/jimjamscott22.github.io`
   - `ADMIN_TOKEN`: Your secret admin password (generate a strong one)

4. **Update `_config.yml`**:
   ```yaml
   project_admin_api_url: "https://your-vercel-app.vercel.app/api/create-project"
   ```

### Option 2: Netlify Functions

1. **Create `netlify.toml`** in your repo root:
   ```toml
   [build]
     functions = "api"

   [functions]
     node_bundler = "esbuild"
   ```

2. **Deploy** to Netlify

3. **Set environment variables** in Netlify dashboard (same as Vercel)

4. **Update `_config.yml`**:
   ```yaml
   project_admin_api_url: "https://your-site.netlify.app/.netlify/functions/create-project"
   ```

### Option 3: GitHub Actions (No External Service)

If you prefer to keep everything in GitHub:

1. Create a GitHub Actions workflow that listens for repository dispatch events
2. The admin page sends an authenticated webhook to GitHub
3. The workflow creates the `_projects/*.md` file and commits it

See `github-action-example.yml` for implementation.

## Security Notes

- **NEVER commit your `GITHUB_TOKEN` or `ADMIN_TOKEN` to the repository**
- Store them as environment variables in your deployment platform
- The admin token should be a strong, randomly generated string
- Consider adding rate limiting if you expose this publicly
- The function validates the admin token before allowing any operations

## Testing Locally

1. Create `.env` file:
   ```bash
   GITHUB_TOKEN=your_github_token
   GITHUB_REPO=jimjamscott22/jimjamscott22.github.io
   ADMIN_TOKEN=test-token-123
   ```

2. Update `_config.yml` temporarily:
   ```yaml
   project_admin_api_url: "http://localhost:3000/api/create-project"
   ```

3. Run locally:
   ```bash
   vercel dev
   # OR
   netlify dev
   ```

4. Visit `http://localhost:4000/project-admin/` (Jekyll must be running)

## GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy the token and store it securely as an environment variable

## Troubleshooting

- **401 Unauthorized**: Check your admin token matches between form and environment variable
- **403 Forbidden**: GitHub token may be invalid or lack `repo` scope
- **404 Not Found**: Check your API URL is correct in `_config.yml`
- **CORS errors**: Ensure your API function includes proper CORS headers (already included in template)
