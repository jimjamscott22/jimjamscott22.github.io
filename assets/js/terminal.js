/**
 * JamieLab Interactive Terminal
 * A command-line interface for navigating and exploring the site
 */

(function() {
  'use strict';

  // Terminal state
  const state = {
    history: [],
    historyIndex: -1,
    isOpen: false
  };
  const EMPTY_SITE_DATA = { posts: [], projects: [], notes: [] };
  let siteDataPromise = null;

  // Site launch date for uptime calculation
  const SITE_LAUNCH_DATE = new Date('2025-12-13');

  // Fortune quotes for the fortune command
  const FORTUNES = [
    "There are only two hard things in Computer Science: cache invalidation and naming things. - Phil Karlton",
    "Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke",
    "The best way to predict the future is to invent it. - Alan Kay",
    "Talk is cheap. Show me the code. - Linus Torvalds",
    "First, solve the problem. Then, write the code. - John Johnson",
    "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
    "The most dangerous phrase in the language is: We've always done it this way. - Grace Hopper",
    "Simplicity is the soul of efficiency. - Austin Freeman",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "Make it work, make it right, make it fast. - Kent Beck"
  ];

  // Cowsay template
  function cowsay(message) {
    const maxWidth = 40;
    const words = message.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + ' ' + word).trim().length <= maxWidth) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);

    const width = Math.max(...lines.map(l => l.length));
    const top = ' ' + '_'.repeat(width + 2);
    const bottom = ' ' + '-'.repeat(width + 2);

    let bubble = top + '\n';
    lines.forEach((line, i) => {
      const padded = line.padEnd(width);
      if (lines.length === 1) {
        bubble += `< ${padded} >\n`;
      } else if (i === 0) {
        bubble += `/ ${padded} \\\n`;
      } else if (i === lines.length - 1) {
        bubble += `\\ ${padded} /\n`;
      } else {
        bubble += `| ${padded} |\n`;
      }
    });
    bubble += bottom;

    const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

    return bubble + cow;
  }

  function getSiteDataUrl() {
    if (window.siteDataUrl) return window.siteDataUrl;
    return '/assets/data/site-data.json';
  }

  async function getSiteData() {
    if (window.siteData && typeof window.siteData === 'object') {
      return window.siteData;
    }

    if (siteDataPromise) {
      return siteDataPromise;
    }

    siteDataPromise = fetch(getSiteDataUrl(), { credentials: 'same-origin' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Site data request failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const normalized = {
          posts: Array.isArray(data?.posts) ? data.posts : [],
          projects: Array.isArray(data?.projects) ? data.projects : [],
          notes: Array.isArray(data?.notes) ? data.notes : []
        };
        window.siteData = normalized;
        return normalized;
      })
      .catch((error) => {
        console.warn('Unable to load terminal site data', error);
        window.siteData = EMPTY_SITE_DATA;
        return EMPTY_SITE_DATA;
      });

    return siteDataPromise;
  }

  // Command definitions
  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        return `
<span class="term-accent">JamieLab Terminal v1.0</span>
<span class="term-dim">Type a command and press Enter</span>

<span class="term-header">Navigation</span>
  ls [section]     List pages or content (posts, projects, notes)
  cd <page>        Navigate to a page
  open <page>      Same as cd
  pwd              Show current page path

<span class="term-header">Information</span>
  whoami           Display site owner info
  neofetch         Show system info (site stats)
  uptime           Show site uptime
  date             Show current date/time

<span class="term-header">Utilities</span>
  clear            Clear terminal output
  history          Show command history
  theme <name>     Switch theme (cyber, matrix, neon)
  search <term>    Search posts

<span class="term-header">Easter Eggs</span>
  cowsay <msg>     Make the cow say something
  fortune          Random tech quote
  hack             ???
  matrix           ???

<span class="term-dim">Press \` or Ctrl+\` to toggle terminal</span>
<span class="term-dim">Press Esc to close | Up/Down for history</span>`;
      }
    },

    ls: {
      description: 'List pages or content',
      execute: async (args) => {
        const section = args[0]?.toLowerCase();

        if (!section) {
          return `
<span class="term-accent">Available sections:</span>

  <span class="term-dir">home/</span>        Main landing page
  <span class="term-dir">projects/</span>    Project showcase
  <span class="term-dir">homelab/</span>     Infrastructure overview
  <span class="term-dir">timeline/</span>    Chronological history
  <span class="term-dir">notes/</span>       Knowledge base
  <span class="term-dir">tools/</span>       Utilities
  <span class="term-dir">playground/</span>  Code sandbox
  <span class="term-dir">blog/</span>        Blog posts
  <span class="term-dir">archive/</span>     Post archive
  <span class="term-dir">about/</span>       About me

<span class="term-dim">Usage: ls [posts|projects|notes]</span>`;
        }

        const siteData = await getSiteData();

        if (section === 'posts' || section === 'blog') {
          if (!siteData.posts.length) {
            return '<span class="term-error">No posts found</span>';
          }
          let output = `<span class="term-accent">Blog Posts (${siteData.posts.length})</span>\n\n`;
          siteData.posts.forEach(post => {
            output += `  <span class="term-file">${post.date}</span>  ${post.title}\n`;
          });
          return output;
        }

        if (section === 'projects') {
          if (!siteData.projects.length) {
            return '<span class="term-error">No projects found</span>';
          }
          let output = `<span class="term-accent">Projects (${siteData.projects.length})</span>\n\n`;
          siteData.projects.forEach(project => {
            const status = project.status || 'unknown';
            const statusClass = status === 'active' ? 'term-success' :
                               status === 'building' ? 'term-warning' : 'term-dim';
            output += `  <span class="${statusClass}">[${status}]</span>  ${project.title}\n`;
          });
          return output;
        }

        if (section === 'notes') {
          if (!siteData.notes.length) {
            return '<span class="term-error">No notes found</span>';
          }
          let output = `<span class="term-accent">Notes (${siteData.notes.length})</span>\n\n`;
          siteData.notes.forEach(note => {
            output += `  <span class="term-file">${note.title}</span>\n`;
          });
          return output;
        }

        return `<span class="term-error">Unknown section: ${section}</span>\n<span class="term-dim">Try: ls posts, ls projects, ls notes</span>`;
      }
    },

    cd: {
      description: 'Navigate to a page',
      execute: async (args) => {
        const target = args[0]?.toLowerCase();
        if (!target) {
          return '<span class="term-error">Usage: cd <page></span>\n<span class="term-dim">Example: cd projects</span>';
        }

        const routes = {
          'home': '/',
          '~': '/',
          '/': '/',
          'projects': '/projects/',
          'homelab': '/homelab/',
          'timeline': '/timeline/',
          'notes': '/notes/',
          'tools': '/tools/',
          'playground': '/playground/',
          'blog': '/blog/',
          'archive': '/archive/',
          'about': '/about/'
        };

        if (routes[target]) {
          setTimeout(() => {
            window.location.href = routes[target];
          }, 300);
          return `<span class="term-success">Navigating to ${target}...</span>`;
        }

        const siteData = await getSiteData();

        // Check for post/project/note match
        const allContent = [
          ...siteData.posts,
          ...siteData.projects,
          ...siteData.notes
        ];

        const match = allContent.find(item =>
          item.title.toLowerCase().includes(target) ||
          item.url.toLowerCase().includes(target)
        );

        if (match) {
          setTimeout(() => {
            window.location.href = match.url;
          }, 300);
          return `<span class="term-success">Navigating to ${match.title}...</span>`;
        }

        return `<span class="term-error">Page not found: ${target}</span>\n<span class="term-dim">Try: ls to see available pages</span>`;
      }
    },

    open: {
      description: 'Navigate to a page (alias for cd)',
      execute: (args) => commands.cd.execute(args)
    },

    pwd: {
      description: 'Show current page path',
      execute: () => {
        return `<span class="term-accent">${window.location.pathname}</span>`;
      }
    },

    whoami: {
      description: 'Display site owner info',
      execute: () => {
        return `
<span class="term-accent">jamie</span>

Cybersecurity enthusiast, homelab tinkerer, and code wrangler.
Building secure systems and breaking them (ethically).

<span class="term-dim">Focus areas:</span>
  - Network security & firewall config
  - Self-hosted infrastructure
  - Automation & DevOps
  - Threat detection & analysis

<span class="term-dim">Stack:</span> pfSense, Linux, Docker, k3s, Prometheus, Grafana

<span class="term-link">github.com/jimjamscot22</span>`;
      }
    },

    neofetch: {
      description: 'Show system info',
      execute: async () => {
        const siteData = await getSiteData();
        const posts = siteData.posts.length;
        const projects = siteData.projects.length;
        const notes = siteData.notes.length;
        const currentTheme = localStorage.getItem('selectedTheme') || 'cyber';
        const uptime = getUptime();

        return `
<span class="term-ascii">       _____              _      __          __
      / ____|            (_)     \\ \\        / /
     | |     ___  _ __    _  __ _ \\ \\  /\\  / /__
     | |    / _ \\| '_ \\  | |/ _\` | \\ \\/  \\/ / _ \\
     | |___| (_) | | | | | | (_| |  \\  /\\  /  __/
      \\_____\\___/|_| |_| |_|\\__,_|   \\/  \\/ \\___|   </span>

    <span class="term-accent">jamie</span>@<span class="term-accent">jamielab</span>
    <span class="term-dim">--------------</span>
    <span class="term-label">OS:</span> Jekyll 4.x
    <span class="term-label">Host:</span> GitHub Pages
    <span class="term-label">Uptime:</span> ${uptime}
    <span class="term-label">Posts:</span> ${posts}
    <span class="term-label">Projects:</span> ${projects}
    <span class="term-label">Notes:</span> ${notes}
    <span class="term-label">Theme:</span> ${currentTheme}
    <span class="term-label">Terminal:</span> JamieLab v1.0`;
      }
    },

    uptime: {
      description: 'Show site uptime',
      execute: () => {
        return `<span class="term-accent">Site uptime:</span> ${getUptime()}`;
      }
    },

    date: {
      description: 'Show current date/time',
      execute: () => {
        const now = new Date();
        return `<span class="term-accent">${now.toLocaleString()}</span>`;
      }
    },

    clear: {
      description: 'Clear terminal output',
      execute: () => {
        return '__CLEAR__';
      }
    },

    history: {
      description: 'Show command history',
      execute: () => {
        if (state.history.length === 0) {
          return '<span class="term-dim">No command history</span>';
        }
        let output = '<span class="term-accent">Command History</span>\n\n';
        state.history.forEach((cmd, i) => {
          output += `  <span class="term-dim">${(i + 1).toString().padStart(3)}</span>  ${cmd}\n`;
        });
        return output;
      }
    },

    theme: {
      description: 'Switch theme',
      execute: (args) => {
        const themeName = args[0]?.toLowerCase();
        const themes = {
          'cyber': 'cyber',
          'matrix': 'matrix',
          'neon': 'neon'
        };

        if (!themeName) {
          const current = localStorage.getItem('selectedTheme') || 'cyber';
          return `<span class="term-accent">Current theme:</span> ${current}\n<span class="term-dim">Available: cyber, matrix, neon</span>\n<span class="term-dim">Usage: theme <name></span>`;
        }

        if (!themes[themeName]) {
          return `<span class="term-error">Unknown theme: ${themeName}</span>\n<span class="term-dim">Available: cyber, matrix, neon</span>`;
        }

        // Trigger theme change via the existing theme selector
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
          themeSelect.value = themes[themeName];
          themeSelect.dispatchEvent(new Event('change'));
          return `<span class="term-success">Theme switched to ${themeName}</span>`;
        }

        return '<span class="term-error">Theme switcher not found</span>';
      }
    },

    search: {
      description: 'Search posts',
      execute: async (args) => {
        const query = args.join(' ').toLowerCase();
        if (!query) {
          return '<span class="term-error">Usage: search <term></span>';
        }

        const siteData = await getSiteData();
        const posts = siteData.posts;
        const results = posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          (post.tags && post.tags.some(t => t.toLowerCase().includes(query)))
        );

        if (results.length === 0) {
          return `<span class="term-dim">No results for "${query}"</span>`;
        }

        let output = `<span class="term-accent">Found ${results.length} result(s)</span>\n\n`;
        results.forEach(post => {
          output += `  <span class="term-file">${post.date}</span>  <span class="term-link">${post.title}</span>\n`;
        });
        output += `\n<span class="term-dim">Use: cd <title> to navigate</span>`;
        return output;
      }
    },

    // Easter eggs
    'sudo': {
      description: 'Superuser do',
      execute: (args) => {
        if (args.join(' ').includes('rm -rf')) {
          return `<span class="term-error">Nice try! This terminal doesn't have actual system access.</span>\n<span class="term-dim">But points for trying the classic...</span>`;
        }
        return `<span class="term-warning">sudo: permission denied</span>\n<span class="term-dim">This is a simulated terminal</span>`;
      }
    },

    cowsay: {
      description: 'Make the cow say something',
      execute: (args) => {
        const message = args.join(' ') || 'Moo!';
        return `<span class="term-ascii">${cowsay(message)}</span>`;
      }
    },

    fortune: {
      description: 'Random tech quote',
      execute: () => {
        const quote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        return `<span class="term-quote">"${quote}"</span>`;
      }
    },

    hack: {
      description: 'Hack the mainframe',
      execute: () => {
        // Trigger matrix rain effect if available
        const event = new CustomEvent('triggerMatrixRain');
        document.dispatchEvent(event);
        return `<span class="term-success">ACCESSING MAINFRAME...</span>
<span class="term-dim">Initializing hack sequence...</span>
<span class="term-warning">Just kidding. But check out the matrix effect!</span>`;
      }
    },

    matrix: {
      description: 'Toggle matrix rain',
      execute: () => {
        const event = new CustomEvent('triggerMatrixRain');
        document.dispatchEvent(event);
        return '<span class="term-success">Matrix rain activated</span>';
      }
    },

    echo: {
      description: 'Echo text',
      execute: (args) => args.join(' ') || ''
    },

    cat: {
      description: 'View content preview',
      execute: async (args) => {
        const target = args.join(' ').toLowerCase();
        if (!target) {
          return '<span class="term-error">Usage: cat <post-name></span>';
        }

        const siteData = await getSiteData();
        const allContent = [
          ...siteData.posts,
          ...siteData.projects,
          ...siteData.notes
        ];

        const match = allContent.find(item =>
          item.title.toLowerCase().includes(target)
        );

        if (match) {
          let output = `<span class="term-accent">${match.title}</span>\n`;
          if (match.date) output += `<span class="term-dim">Date: ${match.date}</span>\n`;
          if (match.status) output += `<span class="term-dim">Status: ${match.status}</span>\n`;
          if (match.tags?.length) output += `<span class="term-dim">Tags: ${match.tags.join(', ')}</span>\n`;
          output += `\n<span class="term-dim">Use: cd ${target} to read full content</span>`;
          return output;
        }

        return `<span class="term-error">Not found: ${target}</span>`;
      }
    },

    exit: {
      description: 'Close terminal',
      execute: () => {
        setTimeout(closeTerminal, 200);
        return '<span class="term-dim">Closing terminal...</span>';
      }
    },

    reboot: {
      description: 'Reload page',
      execute: () => {
        setTimeout(() => location.reload(), 500);
        return '<span class="term-warning">Rebooting system...</span>';
      }
    }
  };

  // Utility functions
  function getUptime() {
    const now = new Date();
    const diff = now - SITE_LAUNCH_DATE;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} days, ${hours} hours`;
  }

  async function executeCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return '';

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add to history
    if (trimmed && state.history[state.history.length - 1] !== trimmed) {
      state.history.push(trimmed);
      if (state.history.length > 50) state.history.shift();
    }
    state.historyIndex = state.history.length;

    if (commands[cmd]) {
      return await commands[cmd].execute(args);
    }

    return `<span class="term-error">Command not found: ${cmd}</span>\n<span class="term-dim">Type 'help' for available commands</span>`;
  }

  // DOM manipulation
  function createTerminalHTML() {
    const modal = document.createElement('div');
    modal.className = 'cli-terminal-modal';
    modal.id = 'cli-terminal-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Interactive terminal');

    modal.innerHTML = `
      <div class="cli-terminal-window">
        <div class="cli-terminal-header">
          <div class="cli-terminal-dots">
            <span class="cli-dot cli-dot-red"></span>
            <span class="cli-dot cli-dot-amber"></span>
            <span class="cli-dot cli-dot-green"></span>
          </div>
          <span class="cli-terminal-title">jamie@jamielab:~$</span>
          <button class="cli-terminal-close" aria-label="Close terminal">&times;</button>
        </div>
        <div class="cli-terminal-body" id="cli-terminal-output">
          <div class="cli-terminal-line">
            <span class="term-accent">Welcome to JamieLab Terminal v1.0</span>
          </div>
          <div class="cli-terminal-line">
            <span class="term-dim">Type 'help' for available commands</span>
          </div>
          <div class="cli-terminal-line">&nbsp;</div>
        </div>
        <div class="cli-terminal-input-line">
          <span class="cli-terminal-prompt">jamie@jamielab:~$</span>
          <input type="text" id="cli-terminal-input" autocomplete="off" spellcheck="false" aria-label="Terminal input">
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  function createTriggerButton() {
    const button = document.createElement('button');
    button.className = 'cli-terminal-trigger';
    button.setAttribute('aria-label', 'Open terminal');
    button.innerHTML = '<span class="cli-terminal-icon">&gt;_</span>';
    document.body.appendChild(button);
    return button;
  }

  function appendOutput(text, isCommand = false) {
    const output = document.getElementById('cli-terminal-output');
    if (!output) return;

    if (text === '__CLEAR__') {
      output.innerHTML = '';
      return;
    }

    const line = document.createElement('div');
    line.className = 'cli-terminal-line';

    if (isCommand) {
      line.innerHTML = `<span class="cli-terminal-prompt">jamie@jamielab:~$</span> ${escapeHtml(text)}`;
    } else {
      line.innerHTML = sanitizeTerminalHtml(text);
    }

    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function sanitizeTerminalHtml(html) {
    const escaped = escapeHtml(String(html ?? ''));

    const withSafeBreaks = escaped.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
    const withSafeOpenSpans = withSafeBreaks.replace(
      /&lt;span class=(?:&quot;|&#39;)([^"'<>]+)(?:&quot;|&#39;)&gt;/gi,
      (_, classes) => {
        const safeClasses = classes
          .split(/\s+/)
          .filter(className => /^term-[a-z0-9-]+$/i.test(className));
        return safeClasses.length ? `<span class="${safeClasses.join(' ')}">` : '<span>';
      }
    );

    return withSafeOpenSpans.replace(/&lt;\/span&gt;/gi, '</span>');
  }

  function openTerminal() {
    const modal = document.getElementById('cli-terminal-modal');
    const input = document.getElementById('cli-terminal-input');
    if (modal) {
      modal.classList.add('active');
      state.isOpen = true;
      if (input) {
        input.focus();
      }
    }
  }

  function closeTerminal() {
    const modal = document.getElementById('cli-terminal-modal');
    if (modal) {
      modal.classList.remove('active');
      state.isOpen = false;
    }
  }

  function toggleTerminal() {
    if (state.isOpen) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }

  // Event handlers
  async function handleInputKeydown(e) {
    const input = e.target;

    if (e.key === 'Enter') {
      const value = input.value;
      appendOutput(value, true);
      input.value = '';
      try {
        const result = await executeCommand(value);
        if (result) appendOutput(result);
      } catch (error) {
        console.warn('Terminal command execution failed', error);
        appendOutput('<span class="term-error">Command failed. Please try again.</span>');
      } finally {
        input.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.historyIndex > 0) {
        state.historyIndex--;
        input.value = state.history[state.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        input.value = state.history[state.historyIndex] || '';
      } else {
        state.historyIndex = state.history.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const value = input.value.toLowerCase();
      const cmdNames = Object.keys(commands);
      const matches = cmdNames.filter(cmd => cmd.startsWith(value));
      if (matches.length === 1) {
        input.value = matches[0] + ' ';
      } else if (matches.length > 1 && value) {
        appendOutput(value, true);
        appendOutput(`<span class="term-dim">${matches.join('  ')}</span>`);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      await executeCommand('clear');
      const output = document.getElementById('cli-terminal-output');
      if (output) output.innerHTML = '';
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      input.value = '';
      appendOutput('^C', false);
    }
  }

  function handleGlobalKeydown(e) {
    // Toggle with backtick or Ctrl+`
    if (e.key === '`' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      toggleTerminal();
      return;
    }

    // Close with Escape
    if (e.key === 'Escape' && state.isOpen) {
      closeTerminal();
      return;
    }
  }

  // Initialize
  function init() {
    // Create terminal elements
    createTerminalHTML();
    const triggerBtn = createTriggerButton();

    // Get references
    const modal = document.getElementById('cli-terminal-modal');
    const input = document.getElementById('cli-terminal-input');
    const closeBtn = modal?.querySelector('.cli-terminal-close');

    // Event listeners
    if (triggerBtn) {
      triggerBtn.addEventListener('click', toggleTerminal);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeTerminal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeTerminal();
      });
    }

    if (input) {
      input.addEventListener('keydown', handleInputKeydown);
    }

    document.addEventListener('keydown', handleGlobalKeydown);

    // Restore history from localStorage
    try {
      const saved = localStorage.getItem('terminalHistory');
      if (saved) {
        state.history = JSON.parse(saved);
        state.historyIndex = state.history.length;
      }
    } catch (e) {
      // Ignore localStorage errors
    }

    // Save history on unload
    window.addEventListener('beforeunload', () => {
      try {
        localStorage.setItem('terminalHistory', JSON.stringify(state.history.slice(-50)));
      } catch (e) {
        // Ignore localStorage errors
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
