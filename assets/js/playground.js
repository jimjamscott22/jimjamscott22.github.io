/**
 * Code Playground - Interactive code editor and execution environment
 * Supports JavaScript (sandboxed) and Python (via Pyodide)
 */

import {
  EditorView,
  keymap,
  drawSelection,
  lineNumbers,
  highlightActiveLineGutter,
  EditorState,
  Compartment,
  defaultKeymap,
  indentWithTab,
  HighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  tags,
  javascript,
  python
} from './playground-cm.bundle.js';

// ========================================
// STATE
// ========================================

const state = {
  currentLanguage: 'javascript',
  pyodideReady: false,
  pyodideLoading: false,
  pyodide: null,
  executionTimeout: 5000,
  history: []
};

const PYODIDE_VERSION = 'v0.26.4';

const STORAGE = {
  code: (lang) => `playground:code:${lang}`,
  lang: 'playground:lang'
};

let saveTimer = null;
let editorView = null;
const languageConf = new Compartment();

// ========================================
// EXAMPLE CODE SNIPPETS
// ========================================

const examples = {
  javascript: {
    'Hello World': `// Simple Hello World
console.log("Hello, JamieLab!");`,

    'FizzBuzz': `// Classic FizzBuzz
for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,

    'Array Methods': `// Array manipulation examples
const numbers = [1, 2, 3, 4, 5];

// Map: double each number
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter: get even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Reduce: sum all numbers
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);`,

    'Async/Await': `// Async function example
async function fetchData() {
  console.log("Fetching data...");

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const data = { name: "Jamie", role: "Developer" };
  console.log("Data received:", JSON.stringify(data));
  return data;
}

fetchData().then(data => {
  console.log("Name:", data.name);
});`,

    'Object Destructuring': `// Modern JavaScript destructuring
const user = {
  name: "Jamie",
  email: "jamie@jamielab.me",
  skills: ["Python", "JavaScript", "Linux"],
  homelab: {
    servers: 3,
    containers: 12
  }
};

// Object destructuring
const { name, skills, homelab: { servers } } = user;
console.log(\`\${name} has \${servers} servers\`);
console.log("Skills:", skills.join(", "));

// Array destructuring
const [first, second, ...rest] = skills;
console.log("Primary skill:", first);`
  },

  python: {
    'Hello World': `# Simple Hello World
print("Hello, JamieLab!")`,

    'FizzBuzz': `# Classic FizzBuzz
for i in range(1, 21):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,

    'List Comprehensions': `# Python list comprehensions
numbers = [1, 2, 3, 4, 5]

# Square each number
squares = [n ** 2 for n in numbers]
print("Squares:", squares)

# Filter even numbers
evens = [n for n in numbers if n % 2 == 0]
print("Evens:", evens)

# Dictionary comprehension
num_dict = {n: n ** 2 for n in numbers}
print("Number dict:", num_dict)`,

    'Classes': `# Python class example
class Server:
    def __init__(self, name, ip):
        self.name = name
        self.ip = ip
        self.services = []

    def add_service(self, service):
        self.services.append(service)
        print(f"Added {service} to {self.name}")

    def status(self):
        return f"{self.name} ({self.ip}): {len(self.services)} services"

# Create server instances
web = Server("web-01", "192.168.1.10")
web.add_service("nginx")
web.add_service("docker")

db = Server("db-01", "192.168.1.20")
db.add_service("postgres")

print(web.status())
print(db.status())`,

    'Generators': `# Python generators
def fibonacci(n):
    """Generate Fibonacci sequence"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Generate first 10 Fibonacci numbers
fib_sequence = list(fibonacci(10))
print("Fibonacci:", fib_sequence)

# Generator expression
squares_gen = (x ** 2 for x in range(5))
print("Squares:", list(squares_gen))`
  }
};

// ========================================
// DOM ELEMENTS
// ========================================

let elements = {};

function initElements() {
  elements = {
    editorHost: document.getElementById('code-editor'),
    output: document.getElementById('code-output'),
    runBtn: document.getElementById('run-code'),
    clearBtn: document.getElementById('clear-output'),
    langSelect: document.getElementById('language-select'),
    exampleSelect: document.getElementById('example-select'),
    pyodideStatus: document.getElementById('pyodide-status'),
    executionTime: document.getElementById('execution-time'),
    shareBtn: document.getElementById('share-code'),
    copyCodeBtn: document.getElementById('copy-code'),
    copyOutputBtn: document.getElementById('copy-output')
  };
}

// ========================================
// CODE EDITOR (CODEMIRROR)
// ========================================

const cyberHighlight = HighlightStyle.define([
  { tag: tags.content, color: '#9de8b8' },
  { tag: tags.comment, color: 'rgba(100, 200, 130, 0.45)', fontStyle: 'italic' },
  { tag: tags.lineComment, color: 'rgba(100, 200, 130, 0.45)', fontStyle: 'italic' },
  { tag: tags.blockComment, color: 'rgba(100, 200, 130, 0.45)', fontStyle: 'italic' },
  { tag: tags.keyword, color: '#00e5ff', fontWeight: '500' },
  { tag: tags.controlKeyword, color: '#00e5ff', fontWeight: '500' },
  { tag: tags.definitionKeyword, color: '#00e5ff', fontWeight: '500' },
  { tag: tags.modifier, color: '#00e5ff', fontWeight: '500' },
  { tag: tags.string, color: '#ff9966' },
  { tag: tags.special(tags.string), color: '#ff9966' },
  { tag: tags.number, color: '#bd93f9' },
  { tag: tags.integer, color: '#bd93f9' },
  { tag: tags.float, color: '#bd93f9' },
  { tag: tags.function(tags.variableName), color: '#4dff88' },
  { tag: tags.function(tags.propertyName), color: '#4dff88' },
  { tag: tags.definition(tags.variableName), color: '#4dff88' },
  { tag: tags.className, color: '#4dff88' },
  { tag: tags.operator, color: '#ffc53d' },
  { tag: tags.punctuation, color: '#ffc53d' },
  { tag: tags.bracket, color: '#ffc53d' },
  { tag: tags.variableName, color: '#9de8b8' },
  { tag: tags.propertyName, color: '#9de8b8' },
  { tag: tags.bool, color: '#bd93f9' },
  { tag: tags.null, color: '#bd93f9' },
  { tag: tags.self, color: '#00e5ff' },
  { tag: tags.meta, color: 'rgba(100, 200, 130, 0.45)', fontStyle: 'italic' }
]);

const editorTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent',
    color: '#9de8b8'
  },
  '.cm-content': {
    caretColor: 'var(--accent-bright)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    padding: '1rem'
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: 'inherit'
  },
  '.cm-gutters': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRight: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    opacity: '0.45',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
    fontSize: '0.9rem'
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'rgba(0, 255, 136, 0.06)'
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(0, 255, 136, 0.04)'
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: 'rgba(0, 255, 136, 0.15) !important'
  },
  '.cm-cursor': {
    borderLeftColor: 'var(--accent-bright)'
  }
}, { dark: true });

function languageExtension(lang) {
  return lang === 'python' ? python() : javascript();
}

function getCode() {
  return editorView ? editorView.state.doc.toString() : '';
}

function setCode(text) {
  if (!editorView) return;
  editorView.dispatch({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: text
    }
  });
}

function createEditor(host, initialCode, lang) {
  return new EditorView({
    state: EditorState.create({
      doc: initialCode,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        indentOnInput(),
        drawSelection(),
        editorTheme,
        languageConf.of(languageExtension(lang)),
        syntaxHighlighting(cyberHighlight, { fallback: true }),
        keymap.of([
          ...defaultKeymap,
          indentWithTab,
          {
            key: 'Mod-Enter',
            run: () => {
              runCode();
              return true;
            }
          },
          {
            key: 'Mod-s',
            run: () => {
              shareCode();
              return true;
            },
            preventDefault: true
          }
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            scheduleSave();
          }
        })
      ]
    }),
    parent: host
  });
}

// ========================================
// JAVASCRIPT EXECUTION (SANDBOXED)
// ========================================

function executeJavaScript(code) {
  return new Promise((resolve, reject) => {
    const output = [];
    const startTime = performance.now();

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.sandbox = 'allow-scripts';
    document.body.appendChild(iframe);

    const timeoutId = setTimeout(() => {
      document.body.removeChild(iframe);
      reject(new Error('Execution timed out (5s limit)'));
    }, state.executionTimeout);

    const messageHandler = (event) => {
      if (event.source === iframe.contentWindow) {
        if (event.data.type === 'console') {
          output.push(event.data.message);
        } else if (event.data.type === 'error') {
          clearTimeout(timeoutId);
          window.removeEventListener('message', messageHandler);
          document.body.removeChild(iframe);
          reject(new Error(event.data.message));
        } else if (event.data.type === 'done') {
          clearTimeout(timeoutId);
          window.removeEventListener('message', messageHandler);
          document.body.removeChild(iframe);
          const endTime = performance.now();
          resolve({
            output: output.join('\n'),
            executionTime: (endTime - startTime).toFixed(2)
          });
        }
      }
    };

    window.addEventListener('message', messageHandler);

    const wrappedCode = `
      <script>
        const originalConsole = console;
        const output = [];

        console.log = function(...args) {
          const message = args.map(arg => {
            if (typeof arg === 'object') {
              try {
                return JSON.stringify(arg, null, 2);
              } catch (e) {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' ');
          parent.postMessage({ type: 'console', message: message }, '*');
        };

        console.error = console.log;
        console.warn = console.log;
        console.info = console.log;

        try {
          (async function() {
            ${code}
          })().then(() => {
            parent.postMessage({ type: 'done' }, '*');
          }).catch(err => {
            parent.postMessage({ type: 'error', message: err.toString() }, '*');
          });
        } catch (err) {
          parent.postMessage({ type: 'error', message: err.toString() }, '*');
        }
      <\/script>
    `;

    iframe.srcdoc = wrappedCode;
  });
}

// ========================================
// PYTHON EXECUTION (PYODIDE)
// ========================================

async function loadPyodide() {
  if (state.pyodideReady) return;
  if (state.pyodideLoading) {
    while (state.pyodideLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return;
  }

  state.pyodideLoading = true;
  updateStatus('Loading Python runtime...', 'loading');

  try {
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/pyodide.js`;

    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    state.pyodide = await window.loadPyodide({
      indexURL: `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`
    });

    state.pyodideReady = true;
    state.pyodideLoading = false;
    updateStatus('Python ready', 'ready');
  } catch (error) {
    state.pyodideLoading = false;
    updateStatus('Failed to load Python', 'error');
    throw error;
  }
}

async function executePython(code) {
  if (!state.pyodideReady) {
    await loadPyodide();
  }

  const startTime = performance.now();

  try {
    state.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
    `);

    await state.pyodide.runPythonAsync(code);

    const stdout = state.pyodide.runPython('sys.stdout.getvalue()');
    const stderr = state.pyodide.runPython('sys.stderr.getvalue()');

    state.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
    `);

    const endTime = performance.now();

    return {
      output: stdout || '',
      stderr: stderr || '',
      executionTime: (endTime - startTime).toFixed(2)
    };
  } catch (error) {
    try {
      state.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
      `);
    } catch (e) {
      // Ignore cleanup errors
    }
    throw error;
  }
}

// ========================================
// UI FUNCTIONS
// ========================================

function updateStatus(message, type) {
  if (!elements.pyodideStatus) return;

  elements.pyodideStatus.textContent = message;
  elements.pyodideStatus.className = 'status-badge status-' + type;
}

function appendOutput(text, type = 'normal') {
  if (!elements.output) return;

  const line = document.createElement('div');
  line.className = 'output-line output-' + type;
  line.textContent = text;
  elements.output.appendChild(line);
  elements.output.scrollTop = elements.output.scrollHeight;
}

function clearOutput() {
  if (elements.output) {
    elements.output.innerHTML = '';
  }
  if (elements.executionTime) {
    elements.executionTime.textContent = '';
  }
}

function setRunning(running) {
  if (elements.runBtn) {
    elements.runBtn.disabled = running;
    elements.runBtn.textContent = running ? 'Running...' : 'Run';
  }
}

function populateExamples() {
  if (!elements.exampleSelect) return;

  const lang = state.currentLanguage;
  const langExamples = examples[lang] || {};

  elements.exampleSelect.innerHTML = '<option value="">-- Select Example --</option>';

  Object.keys(langExamples).forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    elements.exampleSelect.appendChild(option);
  });
}

function loadExample(name) {
  const lang = state.currentLanguage;
  const code = examples[lang]?.[name];

  if (code) {
    setCode(code);
    scheduleSave();
  }
}

// ========================================
// AUTOSAVE / PERSISTENCE
// ========================================

function saveCodeNow() {
  try {
    localStorage.setItem(STORAGE.code(state.currentLanguage), getCode());
  } catch (e) {
    // localStorage unavailable — fail silently
  }
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveCodeNow, 400);
}

function loadSavedCode(lang) {
  try {
    return localStorage.getItem(STORAGE.code(lang));
  } catch (e) {
    return null;
  }
}

// ========================================
// MAIN EXECUTION
// ========================================

async function runCode() {
  const code = getCode().trim();

  if (!code) {
    appendOutput('No code to execute', 'error');
    return;
  }

  clearOutput();
  setRunning(true);
  appendOutput(`> Running ${state.currentLanguage}...`, 'info');

  try {
    let result;

    if (state.currentLanguage === 'javascript') {
      result = await executeJavaScript(code);
    } else if (state.currentLanguage === 'python') {
      result = await executePython(code);
    }

    clearOutput();

    if (result.output) {
      result.output.split('\n').forEach(line => {
        appendOutput(line);
      });
    }

    if (result.stderr) {
      appendOutput('[stderr]', 'error');
      result.stderr.split('\n').forEach(line => {
        if (line) appendOutput(line, 'error');
      });
    }

    if (!result.output && !result.stderr) {
      appendOutput('(no output)', 'info');
    }

    if (elements.executionTime) {
      elements.executionTime.textContent = `Executed in ${result.executionTime}ms`;
    }

    state.history.push({
      language: state.currentLanguage,
      code: code,
      output: result.output,
      timestamp: Date.now()
    });

  } catch (error) {
    clearOutput();
    appendOutput('Error: ' + error.message, 'error');
  } finally {
    setRunning(false);
  }
}

// ========================================
// SHARE FUNCTIONALITY
// ========================================

function shareCode() {
  const code = getCode();
  const lang = state.currentLanguage;

  const encoded = btoa(unescape(encodeURIComponent(code)));
  const url = `${window.location.origin}${window.location.pathname}?lang=${lang}&code=${encoded}`;

  navigator.clipboard.writeText(url).then(() => {
    const btn = elements.shareBtn;
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = 'Link Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  }).catch(() => {
    appendOutput('Failed to copy share link', 'error');
  });
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  const code = params.get('code');

  let loaded = { lang: null, code: null };

  if (lang && examples[lang]) {
    state.currentLanguage = lang;
    if (elements.langSelect) elements.langSelect.value = lang;
    loaded.lang = lang;
  }

  if (code) {
    try {
      loaded.code = decodeURIComponent(escape(atob(code)));
    } catch (e) {
      // Invalid base64, ignore
    }
  }

  return loaded;
}

// ========================================
// COPY FUNCTIONALITY
// ========================================

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 1500);
    }
  } catch (err) {
    if (button) {
      button.textContent = 'Error';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 1500);
    }
  }
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
  initElements();

  if (!elements.editorHost) return;

  if (elements.runBtn) {
    elements.runBtn.addEventListener('click', runCode);
  }

  if (elements.clearBtn) {
    elements.clearBtn.addEventListener('click', clearOutput);
  }

  if (elements.langSelect) {
    elements.langSelect.addEventListener('change', (e) => {
      saveCodeNow();

      state.currentLanguage = e.target.value;
      populateExamples();

      const saved = loadSavedCode(state.currentLanguage);
      setCode(saved != null
        ? saved
        : (examples[state.currentLanguage]?.['Hello World'] || ''));

      if (editorView) {
        editorView.dispatch({
          effects: languageConf.reconfigure(languageExtension(state.currentLanguage))
        });
      }

      try {
        localStorage.setItem(STORAGE.lang, state.currentLanguage);
      } catch (err) {
        // ignore
      }

      if (state.currentLanguage === 'python' && !state.pyodideReady) {
        updateStatus('Python will load on first run', 'info');
      } else if (state.currentLanguage === 'javascript') {
        updateStatus('JavaScript ready', 'ready');
      }
    });
  }

  if (elements.exampleSelect) {
    elements.exampleSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        loadExample(e.target.value);
      }
    });
  }

  if (elements.shareBtn) {
    elements.shareBtn.addEventListener('click', shareCode);
  }

  if (elements.copyCodeBtn) {
    elements.copyCodeBtn.addEventListener('click', () => {
      copyToClipboard(getCode(), elements.copyCodeBtn);
    });
  }

  if (elements.copyOutputBtn) {
    elements.copyOutputBtn.addEventListener('click', () => {
      copyToClipboard(elements.output?.textContent || '', elements.copyOutputBtn);
    });
  }

  let savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE.lang);
  } catch (e) {
    // ignore
  }
  if (savedLang && examples[savedLang]) {
    state.currentLanguage = savedLang;
    if (elements.langSelect) elements.langSelect.value = savedLang;
  }

  const urlData = loadFromURL();

  populateExamples();

  let initialCode = urlData.code;
  if (initialCode == null) {
    initialCode = loadSavedCode(state.currentLanguage);
  }
  if (initialCode == null) {
    initialCode = examples[state.currentLanguage]?.['Hello World']
      || examples.javascript['Hello World'];
  }

  editorView = createEditor(elements.editorHost, initialCode, state.currentLanguage);

  if (state.currentLanguage === 'python' && !state.pyodideReady) {
    updateStatus('Python will load on first run', 'info');
  } else {
    updateStatus('JavaScript ready', 'ready');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
