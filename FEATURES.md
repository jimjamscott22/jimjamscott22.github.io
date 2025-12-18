# JamieLab Website Features

This document outlines all the features available on the JamieLab website.

## Core Features

### Navigation
- **Sidebar Navigation**: Easy access to all main sections (Home, Projects, Homelab, Notes, Blog, About)
- **Mobile-Responsive**: Toggle navigation for mobile devices
- **Breadcrumb Path**: Current page location displayed in the top bar

### Content Sections
1. **Home**: Landing page with typewriter effect intro and featured image
2. **Projects**: Showcase of active builds and experiments with status badges
3. **Homelab**: Documentation of homelab infrastructure and services
4. **Notes**: Collection of runbooks, commands, and technical notes with interactive note-taking
5. **Blog**: Short informational posts with tags and categories
6. **About**: Personal information and contact form

## New Features Added

### 1. RSS Feed
- **Location**: `/feed.xml`
- **Description**: Subscribe to blog posts via RSS readers
- **Link**: Available on the blog page with an RSS icon
- **Features**: 
  - Last 15 posts included
  - Full post content
  - Tags as categories
  - Proper XML formatting

### 2. Search Functionality
- **Location**: Blog page
- **Description**: Client-side search across all blog posts
- **Features**:
  - Search by title, content, or tags
  - Real-time results as you type
  - Highlighted search terms
  - Result count
  - Debounced input (300ms) for performance
  - Keyboard shortcut: Press ESC to clear search

### 3. Code Copy Buttons
- **Location**: All code blocks throughout the site
- **Description**: One-click copy for code snippets
- **Features**:
  - Automatic detection of all code blocks
  - Visual feedback on copy (checkmark icon)
  - Fallback for older browsers
  - Positioned at top-right of code blocks
  - Accessible via keyboard

### 4. Back to Top Button
- **Location**: Fixed position on all pages
- **Description**: Quick scroll to top of page
- **Features**:
  - Appears after scrolling 300px down
  - Smooth scroll animation
  - Mobile-responsive sizing
  - Keyboard accessible

### 5. 404 Error Page
- **Location**: `/404.html`
- **Description**: Custom themed error page
- **Features**:
  - ASCII art 404 design
  - Error details display
  - Quick navigation links
  - Maintains site theme and styling

### 6. SEO Improvements
- **Sitemap**: `/sitemap.xml` - XML sitemap for search engines
- **Robots.txt**: `/robots.txt` - Search engine crawler instructions
- **Meta Tags**: Open Graph and Twitter Card meta tags for social sharing
- **Meta Description**: Proper page descriptions on all pages
- **RSS Auto-discovery**: Link tag for RSS feed discovery

### 7. Social Links
- **Location**: Sidebar footer
- **Description**: Links to social profiles
- **Current Links**:
  - GitHub profile
- **Expandable**: Easy to add more social links

### 8. Open Graph Meta Tags
- **Description**: Enhanced social media sharing
- **Features**:
  - Proper title, description, and URL for shared links
  - Article type for blog posts
  - Twitter Card support
  - Dynamic content based on page

### 9. Print Stylesheet
- **Description**: Optimized layout for printing
- **Features**:
  - Removes navigation, overlays, and interactive elements
  - Clean, readable text formatting
  - Preserved code blocks and content structure
  - Black and white optimized

## Interactive Features

### Notes System (Existing)
- **Location**: Notes page
- **Description**: Client-side note-taking with localStorage
- **Features**:
  - Add, view, and delete notes
  - Stored locally in browser
  - No server required
  - Timestamp tracking

### Typewriter Effect (Existing)
- **Location**: Home page
- **Description**: Terminal-style typewriter animation
- **Features**:
  - Respects reduced-motion preferences
  - Configurable speed
  - Pure JavaScript implementation

### Contact Form (Existing)
- **Location**: About page
- **Description**: Contact form via Formspree
- **Features**:
  - Name, email, and message fields
  - Form validation
  - Direct submission to email

## Design & Theme

### CRT Terminal Theme (Existing)
- Retro terminal aesthetic
- Green phosphor color scheme
- Noise and scanline overlays
- Custom scrollbars
- Neon glow effects
- Responsive grid layouts

## Technical Stack

- **Static Site Generator**: Jekyll
- **Hosting**: GitHub Pages
- **Frontend**: Vanilla JavaScript (no frameworks)
- **Styling**: Custom CSS with CRT theme
- **Collections**: Posts, Projects, Notes
- **Forms**: Formspree integration

## Browser Support

All features are built with progressive enhancement:
- Modern browsers: Full feature support
- Older browsers: Graceful degradation
- JavaScript disabled: Core content still accessible
- Print-friendly: Dedicated print stylesheet

## Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Respects reduced-motion preferences
- Sufficient color contrast
- Screen reader friendly

## Future Enhancement Ideas

Consider adding these features in the future:

1. **Tag Filtering**: Click tags to filter posts (currently shows all)
2. **Dark/Light Theme Toggle**: Alternative to CRT theme
3. **Reading Progress Bar**: Visual indicator for blog post progress
4. **Related Posts**: Show similar content at bottom of posts
5. **Table of Contents**: Auto-generated TOC for long posts
6. **Comments System**: Giscus or similar for blog comments
7. **Analytics**: Privacy-friendly analytics integration
8. **Performance Monitoring**: Core Web Vitals tracking
9. **Newsletter Signup**: Email subscription option
10. **Portfolio Gallery**: Dedicated image gallery for projects
11. **Code Syntax Highlighting**: Enhanced syntax highlighting themes
12. **Estimated Read Time**: Display on all posts (partially implemented)
13. **Share Buttons**: Quick social sharing buttons
14. **Keyboard Shortcuts**: Additional navigation shortcuts
15. **Easter Eggs**: Hidden terminal commands or features

## Maintenance

### Adding New Features
1. Create JavaScript in `/assets/js/`
2. Add CSS in `/assets/css/custom.css`
3. Update this FEATURES.md file
4. Test on multiple browsers and devices
5. Ensure mobile responsiveness

### Testing New Features
- Test with JavaScript disabled
- Test on mobile devices
- Validate HTML/XML for feeds and sitemap
- Check accessibility with screen readers
- Verify SEO tags with social media debuggers

### Performance Considerations
- Keep JavaScript files small and focused
- Use defer or async for non-critical scripts
- Minimize CSS specificity conflicts
- Optimize images (already using lazy loading)
- Consider CDN for heavy assets if needed

---

Last Updated: December 2025
