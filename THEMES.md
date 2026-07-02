# Theme Guide

This document describes all available themes and how to use the theme system.

## Available Themes

### Dark Themes

#### 1. **Cyber Lab** (Default)

- **Color Palette**: Cyan and teal tones
- **Vibe**: Research lab / scientific terminal aesthetic
- **Best For**: Long coding sessions with moderate brightness
- **Colors**:
  - Background: Dark blue-gray (`#050a0e`)
  - Text: Light cyan (`#c5f5ff`)
  - Accent: Bright cyan (`#00ff88`)

#### 2. **Enhanced Matrix**

- **Color Palette**: Bright neon green
- **Vibe**: Classic Matrix movie aesthetic with high intensity
- **Best For**: Short sessions, demonstrations, visual impact
- **Colors**:
  - Background: Very dark green (`#0a0e0a`)
  - Text: Bright mint green (`#d0ffe0`)
  - Accent: Neon green (`#00ff88`)
- **Note**: Higher brightness - may cause eye strain during extended use

#### 3. **Soft Matrix** ✨ NEW

- **Color Palette**: Muted, gentle greens
- **Vibe**: Comfortable Matrix-inspired theme
- **Best For**: Extended reading/coding sessions with reduced eye strain
- **Colors**:
  - Background: Soft dark green (`#0d110d`)
  - Text: Sage green (`#c5d9c0`)
  - Accent: Muted green (`#6fb86f`)
- **Features**:
  - Reduced text glow (2px vs 4-6px)
  - Lower contrast for comfort
  - Warm green tones instead of cool neon

#### 4. **Neon Terminal**

- **Color Palette**: Purple and cyan cyberpunk
- **Vibe**: Synthwave / cyberpunk aesthetic
- **Best For**: Creative work, evening sessions
- **Colors**:
  - Background: Deep purple-black (`#0a0515`)
  - Text: Light lavender (`#e5d4ff`)
  - Accent: Bright purple (`#b866ff`) with cyan highlights

#### 5. **Amber Phosphor**

- **Color Palette**: Warm amber and dark brown-black tones
- **Vibe**: Vintage monochrome CRT terminal
- **Best For**: Archive pages, notes, and long evening reading sessions
- **Colors**:
  - Background: Deep warm black (`#100b04`)
  - Text: Soft amber (`#ffd98a`)
  - Accent: Phosphor amber (`#ffb000`)
- **Features**:
  - Warm retro palette with restrained glow
  - Strong terminal identity without neon-green intensity
  - Body reading surface stays calm while UI chrome keeps the CRT feel

#### 6. **Oceanic Console**

- **Color Palette**: Deep navy with seafoam and blue accents
- **Vibe**: Modern research-console aesthetic
- **Best For**: Projects, tools, and technical pages
- **Colors**:
  - Background: Deep navy (`#031018`)
  - Text: Pale cyan (`#d5fbff`)
  - Accent: Seafoam (`#3df5c5`) with blue glow (`#25b7ff`)
- **Features**:
  - Cleaner blue-toned alternative to Cyber Lab
  - Modern technical feel with moderate contrast
  - Good fit for project showcases and utility pages

#### 7. **Solarized Lab**

- **Color Palette**: Muted blue-green base with ochre accents
- **Vibe**: Documentation-focused terminal theme
- **Best For**: Notes, info pages, and reading-heavy posts
- **Colors**:
  - Background: Solarized blue base (`#002b36`)
  - Text: Warm cream (`#eee8d5`)
  - Accent: Ochre (`#b58900`) with teal glow (`#2aa198`)
- **Features**:
  - Highest comfort among the dark custom themes
  - Muted contrast for long documentation sessions
  - Keeps enough accent color for navigation and UI state

### Light Theme

#### 8. **Light Terminal** ☀️ NEW

- **Color Palette**: Clean whites with subtle green accents
- **Vibe**: Professional, daytime-friendly terminal
- **Best For**: Bright environments, daytime work, reduced screen glare
- **Colors**:
  - Background: Off-white (`#f5f7f5`)
  - Text: Dark gray-green (`#2d3a2d`)
  - Accent: Forest green (`#2d7a2d`)
- **Features**:
  - No text glow effects
  - High contrast for readability
  - Reduced overlay opacity
  - Optimized for well-lit rooms

## Using the Theme System

### Theme Selector

Use the dropdown menu in the sidebar to switch between all available themes. Your
selection is automatically saved to localStorage.

### Dark/Light Mode Toggle ✨ NEW

The quick toggle button switches between:

- **Light Mode**: Always uses "Light Terminal" theme
- **Dark Mode**: Switches to your last-used dark theme (or "Soft Matrix" by
  default)

**How it works:**

1. Click the toggle button (☀️/🌙 icon)
2. Theme switches instantly
3. Your dark theme preference is remembered
4. Example: If you're on "Neon Terminal" and toggle to light, then toggle back,
   you'll return to "Neon Terminal"

## Theme Persistence

Themes are saved using `localStorage`:

- `theme`: Currently active theme
- `lastDarkTheme`: Your preferred dark theme (when using the toggle)

## Customizing Themes

All themes follow this structure:

```text
/assets/css/
├── base.css                    # Structure, layout (theme-agnostic)
├── theme-cyber-lab.css         # Cyan/teal theme
├── theme-enhanced-matrix.css   # Bright green theme
├── theme-soft-matrix.css       # Gentle green theme ✨ NEW
├── theme-neon-terminal.css     # Purple/cyan theme
├── theme-amber-phosphor.css    # Warm amber CRT theme
├── theme-oceanic-console.css   # Deep navy/seafoam theme
├── theme-solarized-lab.css     # Muted documentation theme
└── theme-light-terminal.css    # Light mode theme ✨ NEW
```

### Creating a Custom Theme

1. Create a new CSS file: `theme-yourname.css`
2. Define CSS variables:

```css
:root {
  --bg-primary: #000000;
  --bg-secondary: #111111;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --accent-bright: #00ff00;
  --accent-glow: #00ff00;
  --border-color: rgba(0, 255, 0, 0.4);
  --border-bright: rgba(0, 255, 0, 0.7);
  --glow-color: rgba(0, 255, 0, 0.5);
  --shadow-color: rgba(0, 255, 0, 0.3);
}
```

1. Add optional background gradients and overrides
2. Add to `_layouts/default.html` theme selector
3. Update `theme-switcher.js` if needed

## Accessibility Considerations

### Eye Strain Reduction

- **Soft Matrix**: Designed specifically for comfort
- **Solarized Lab**: Comfortable dark theme for documentation-heavy pages
- **Light Terminal**: Reduces blue light, better for daytime
- Text glow effects are reduced or removed on comfortable themes
- `prefers-reduced-motion` media query disables animations

### Contrast Ratios

All themes maintain WCAG AA contrast ratios for:

- Body text vs background
- Links vs background
- Interactive elements

### Color Blindness

Themes use multiple visual cues beyond color:

- Border styles (solid, dashed)
- Text transforms
- Icons and symbols

## Theme Recommendations

| Use Case                   | Recommended Theme             |
| -------------------------- | ----------------------------- |
| Extended coding (4+ hours) | **Soft Matrix**               |
| Daytime work (bright room) | **Light Terminal**            |
| Quick terminal tasks       | Cyber Lab                     |
| Presentations/demos        | Enhanced Matrix               |
| Evening creative work      | Neon Terminal                 |
| Warm retro browsing        | Amber Phosphor                |
| Technical project review   | Oceanic Console               |
| Reading documentation      | Solarized Lab or Soft Matrix  |

## Troubleshooting

### Theme not loading?

- Clear browser cache
- Check browser console for errors
- Verify localStorage isn't full

### Colors look wrong?

- Check if browser has night mode/dark reader extensions
- Verify display color calibration
- Try a different browser

### Toggle not working?

- Ensure JavaScript is enabled
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

## Future Enhancements

Planned features:

- [ ] High contrast mode
- [ ] Customizable accent colors
- [ ] Theme scheduling (auto light/dark by time)
- [ ] Import/export theme settings
- [ ] Theme preview before switching

---

**Last Updated**: 2026-07-01
**Version**: 2.1.0 (Added Amber Phosphor, Oceanic Console, and Solarized Lab themes)
