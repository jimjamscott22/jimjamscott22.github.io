# Giscus Comments Setup Instructions

Your website is now configured to use Giscus for blog comments! Follow these steps to complete the setup:

## Prerequisites

1. Your repository must be **public** (it already is on GitHub Pages)
2. The **giscus app** must be installed on your repository
3. The **Discussions** feature must be enabled in your repository settings

## Setup Steps

### Step 1: Enable GitHub Discussions

1. Go to your repository: `https://github.com/jimjamscott22/jimjamscott22.github.io`
2. Click on **Settings** tab
3. Scroll down to the **Features** section
4. Check the box for **Discussions**

### Step 2: Create a Discussion Category for Comments

1. Go to the **Discussions** tab in your repository
2. Click on the pencil icon (✏️) next to "Categories" to edit
3. Create a new category:
   - **Name**: `Comments`
   - **Description**: `Blog post comments via Giscus`
   - **Format**: Choose "Announcement" (so only maintainers can create new discussions, but anyone can comment)

### Step 3: Install the Giscus App

1. Visit: https://github.com/apps/giscus
2. Click **Install** or **Configure**
3. Select your repository: `jimjamscott22/jimjamscott22.github.io`
4. Grant the necessary permissions

### Step 4: Get Your Configuration Values

1. Visit: https://giscus.app
2. Enter your repository: `jimjamscott22/jimjamscott22.github.io`
3. Under "Discussion Category", select the **Comments** category you created
4. Choose the following options:
   - **Page ↔️ Discussions Mapping**: pathname
   - **Discussion Category**: Comments
   - **Features**: Enable reactions
   - **Theme**: dark (matches your CRT theme)

5. Scroll down to see your configuration values. You'll see something like:
   ```
   data-repo-id="R_..."
   data-category-id="DIC_..."
   ```

### Step 5: Update Your Config File

1. Open `_config.yml` in your project
2. Find the giscus section (at the bottom)
3. Fill in the missing values:
   ```yaml
   giscus:
     enabled: true
     repo: "jimjamscott22/jimjamscott22.github.io"
     repo_id: "YOUR_REPO_ID_HERE"  # Paste from giscus.app
     category: "Comments"
     category_id: "YOUR_CATEGORY_ID_HERE"  # Paste from giscus.app
     mapping: "pathname"
     reactions_enabled: true
     emit_metadata: false
     input_position: "bottom"
     theme: "dark"
     lang: "en"
   ```

### Step 6: Test Your Setup

1. Commit and push your changes:
   ```bash
   git add _config.yml
   git commit -m "Add Giscus comments configuration"
   git push
   ```

2. Wait a few minutes for GitHub Pages to rebuild
3. Visit any blog post on your site
4. Scroll to the bottom - you should see the comments section
5. Try signing in with GitHub and leaving a test comment

## Troubleshooting

### Comments not showing up?
- Make sure Discussions are enabled in your repository
- Verify the `repo_id` and `category_id` are correct
- Check that the giscus app is installed on your repository
- Make sure `enabled: true` in your `_config.yml`

### Wrong theme?
- Change the `theme` value in `_config.yml` to one of:
  - `dark`, `dark_dimmed`, `dark_high_contrast`
  - `preferred_color_scheme` (auto switches)
  - `transparent_dark`

### Want to disable comments on specific posts?
Add this to the front matter of any post:
```yaml
comments: false
```

Then update the post layout to check for this:
```liquid
{% if site.giscus.enabled and page.comments != false %}
  <!-- comments section -->
{% endif %}
```

## Features

Your comments system now supports:

- ✅ GitHub authentication (reduces spam)
- ✅ Markdown formatting in comments
- ✅ Reactions (👍, 😄, etc.)
- ✅ Nested replies
- ✅ Edit/delete your own comments
- ✅ Moderation via GitHub Discussions interface
- ✅ Email notifications for new comments
- ✅ Dark theme matching your site

## Management

- **View all comments**: Go to your repository's Discussions tab
- **Moderate comments**: Edit or delete through GitHub Discussions
- **Get notifications**: Configure in your GitHub notification settings
- **Analytics**: GitHub provides basic discussion statistics

---

Once you complete the setup, delete this file or move it to your documentation folder.
