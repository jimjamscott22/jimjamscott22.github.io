# Theme Switcher Guide

I've restructured the CSS architecture to make themes **truly swappable** and maintainable!

## Architecture

The CSS is now properly separated:

- **`base.css`** (1450 lines): All structural CSS, layout, typography, components
- **`theme-*.css`** (20-30 lines each): Only CSS variables and theme-specific background gradients

This means changes to layout, structure, or components automatically apply to all themes!

## Available Themes

### 1. **Enhanced Matrix** 
**File:** `theme-enhanced-matrix.css`
- **Colors:** Bright green on dark background
- **Style:** Classic Matrix/terminal with better contrast
- **Best for:** Traditional hacker aesthetic with improved readability

### 2. **Cyber Lab**
**File:** `theme-cyber-lab.css`
- **Colors:** Cyan primary + Green accents on deep blue-black
- **Style:** Research lab / sci-fi control room
- **Best for:** Modern cyber-lab feel, less "terminal", more "command center"

### 3. **Neon Terminal**
**File:** `theme-neon-terminal.css`
- **Colors:** Purple + Cyan on dark purple-black
- **Style:** Vibrant cyberpunk with neon glow effects
- **Best for:** Maximum visual impact, colorful hacker aesthetic

## How to Switch Themes

### Quick Switch Method:
Open `_layouts/default.html` and change the theme stylesheet link from:

```html
<link rel="stylesheet" href="{{ "/assets/css/theme-cyber-lab.css" | relative_url }}?v={{ cache_bust }}">
```

To one of these:

```html
<!-- Option 1: Enhanced Matrix -->
<link rel="stylesheet" href="{{ "/assets/css/theme-enhanced-matrix.css" | relative_url }}?v={{ cache_bust }}">

<!-- Option 2: Cyber Lab -->
<link rel="stylesheet" href="{{ "/assets/css/theme-cyber-lab.css" | relative_url }}?v={{ cache_bust }}">

<!-- Option 3: Neon Terminal -->
<link rel="stylesheet" href="{{ "/assets/css/theme-neon-terminal.css" | relative_url }}?v={{ cache_bust }}">
```

**Important:** Both files must be loaded:
- `base.css` - Always required (contains all structure)
- `theme-*.css` - Choose one theme file

```html
<link rel="stylesheet" href="{{ "/assets/css/base.css" | relative_url }}?v={{ cache_bust }}">
<link rel="stylesheet" href="{{ "/assets/css/theme-cyber-lab.css" | relative_url }}?v={{ cache_bust }}">
```

Also keep the shared image stylesheet enabled:

```html
<link rel="stylesheet" href="{{ "/assets/css/images.css" | relative_url }}?v={{ cache_bust }}">
```

This keeps image presentation consistent even when swapping themes.

### Local Preview:
The Jekyll server auto-reloads when you save files!

Visit: **http://localhost:4000**

## File Sizes

| File | Size | Purpose |
|------|------|---------|
| `base.css` | ~1450 lines | Structure, layout, typography, components |
| `theme-cyber-lab.css` | ~25 lines | Cyan/green colors + gradient |
| `theme-enhanced-matrix.css` | ~25 lines | Bright green colors + gradient |
| `theme-neon-terminal.css` | ~25 lines | Purple/cyan colors + gradient |

All themes are now **truly swappable** - no duplication of structural code!

## Customization

Each theme file has a `:root` section with CSS variables:

```css
:root {
  /* Core colors */
  --bg-primary: #050a0e;
  --bg-secondary: #0a1218;
  --text-primary: #c5f5ff;
  --text-secondary: #9de3f5;
  --accent-bright: #00ff88;
  --accent-glow: #00ff88;
  
  /* Component colors */
  --border-color: rgba(0, 229, 255, 0.4);
  --border-bright: rgba(0, 229, 255, 0.7);
  --glow-color: rgba(0, 229, 255, 0.5);
  --shadow-color: rgba(0, 229, 255, 0.3);
}
```

To customize a theme, just adjust these variables. Changes ripple through the entire site automatically!

## Maintenance Benefits

With this structure:

✅ **DRY Principle**: Layout/structure code written once, reused by all themes  
✅ **Easy Updates**: Fix a bug in one place, all themes benefit  
✅ **True Swappability**: Themes are ~25 lines each instead of 700+  
✅ **Consistent Markup**: All themes use identical HTML, just different colors  
✅ **Easy to Add Themes**: Create new theme in seconds, just define the variables

## Recommendation

Try each one and see which feels best! My personal favorites:
- **Cyber Lab** - Best balance of clarity and cyber aesthetic
- **Enhanced Matrix** - If you love the green terminal look
- **Neon Terminal** - Most eye-catching, great for standing out

Let me know which one you prefer, and we can refine it further!
