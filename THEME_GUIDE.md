# Theme Switcher Guide

I've created **three theme variants** for your cyber-lab aesthetic! Each maintains the hacker vibe but with improved clarity and different color schemes.

## 🎨 Available Themes

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

## 🔧 How to Switch Themes

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

**Important:** Leave the shared image stylesheet enabled:

```html
<link rel="stylesheet" href="{{ "/assets/css/images.css" | relative_url }}?v={{ cache_bust }}">
```

This keeps image presentation consistent even when swapping themes.

### Local Preview:
The Jekyll server is running! Visit:
**http://localhost:4000**

Changes will auto-reload when you save files!

## 📝 Notes

- The themes control the overall color + chrome styling
- Image presentation is kept consistent via `assets/css/images.css`
- I've only implemented the core color system and main components
- Your original `custom.css` is untouched as backup
- The themes use CSS custom properties (variables) for easy tweaking

## 🎯 Customization

Each theme file has a `:root` section at the top with color variables. You can tweak individual colors without changing the whole theme:

```css
:root {
  --accent-bright: #00ff88;  /* Change this to adjust accent color */
  --text-primary: #d0ffe0;   /* Adjust main text color */
  /* etc... */
}
```

## 💡 Recommendation

Try each one and see which feels best! My personal favorites:
- **Cyber Lab** - Best balance of clarity and cyber aesthetic
- **Enhanced Matrix** - If you love the green terminal look
- **Neon Terminal** - Most eye-catching, great for standing out

Let me know which one you prefer, and we can refine it further!
