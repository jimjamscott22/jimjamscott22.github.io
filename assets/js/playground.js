/**
 * Code Playground - Interactive code editor and execution environment
 * Supports JavaScript (sandboxed) and Python (via Pyodide)
 */

(function() {
  'use strict';

  // ========================================
  // STATE
  // ========================================

  const state = {
    currentLanguage: 'javascript',
    pyodideReady: false,
    pyodideLoading: false,
    pyodide: null,
    executionTimeout: 5000, // 5 second timeout
    history: []
  };

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
      editor: document.getElementById('code-editor'),
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
  // JAVASCRIPT EXECUTION (SANDBOXED)
  // ========================================

  function executeJavaScript(code) {
    return new Promise((resolve, reject) => {
      const output = [];
      const startTime = performance.now();

      // Create sandboxed iframe
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.sandbox = 'allow-scripts';
      document.body.appendChild(iframe);

      // Timeout handler
      const timeoutId = setTimeout(() => {
        document.body.removeChild(iframe);
        reject(new Error('Execution timed out (5s limit)'));
      }, state.executionTimeout);

      // Message handler for console output
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

      // Inject code into iframe
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
            // Wrap in async IIFE to support top-level await
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
      // Wait for existing load to complete
      while (state.pyodideLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return;
    }

    state.pyodideLoading = true;
    updateStatus('Loading Python runtime...', 'loading');

    try {
      // Load Pyodide from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      state.pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
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
      // Redirect stdout to capture print statements
      state.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      // Execute the user code
      await state.pyodide.runPythonAsync(code);

      // Get the output
      const stdout = state.pyodide.runPython('sys.stdout.getvalue()');
      const stderr = state.pyodide.runPython('sys.stderr.getvalue()');

      // Reset stdout/stderr
      state.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
      `);

      const endTime = performance.now();
      let output = stdout;
      if (stderr) {
        output += (output ? '\n' : '') + '[stderr]\n' + stderr;
      }

      return {
        output: output || '(no output)',
        executionTime: (endTime - startTime).toFixed(2)
      };
    } catch (error) {
      // Reset stdout/stderr on error
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

    if (code && elements.editor) {
      elements.editor.value = code;
    }
  }

  // ========================================
  // MAIN EXECUTION
  // ========================================

  async function runCode() {
    const code = elements.editor?.value?.trim();

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

      // Clear the "Running..." message and show output
      clearOutput();

      if (result.output) {
        result.output.split('\n').forEach(line => {
          appendOutput(line);
        });
      }

      if (elements.executionTime) {
        elements.executionTime.textContent = `Executed in ${result.executionTime}ms`;
      }

      // Add to history
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
    const code = elements.editor?.value || '';
    const lang = state.currentLanguage;

    // Encode code to base64 for URL
    const encoded = btoa(unescape(encodeURIComponent(code)));
    const url = `${window.location.origin}${window.location.pathname}?lang=${lang}&code=${encoded}`;

    // Copy to clipboard
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

    if (lang && elements.langSelect) {
      elements.langSelect.value = lang;
      state.currentLanguage = lang;
      populateExamples();
    }

    if (code && elements.editor) {
      try {
        elements.editor.value = decodeURIComponent(escape(atob(code)));
      } catch (e) {
        // Invalid base64, ignore
      }
    }
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
  // KEYBOARD SHORTCUTS
  // ========================================

  function handleKeydown(e) {
    // Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
      return;
    }

    // Ctrl/Cmd + S to share (prevent save dialog)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      shareCode();
      return;
    }

    // Tab in editor for indentation
    if (e.key === 'Tab' && e.target === elements.editor) {
      e.preventDefault();
      const start = elements.editor.selectionStart;
      const end = elements.editor.selectionEnd;
      const value = elements.editor.value;

      elements.editor.value = value.substring(0, start) + '  ' + value.substring(end);
      elements.editor.selectionStart = elements.editor.selectionEnd = start + 2;
    }
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  function init() {
    initElements();

    // If elements don't exist, we're not on the playground page
    if (!elements.editor) return;

    // Set up event listeners
    if (elements.runBtn) {
      elements.runBtn.addEventListener('click', runCode);
    }

    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearOutput);
    }

    if (elements.langSelect) {
      elements.langSelect.addEventListener('change', (e) => {
        state.currentLanguage = e.target.value;
        populateExamples();

        // Show loading status for Python
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
        copyToClipboard(elements.editor?.value || '', elements.copyCodeBtn);
      });
    }

    if (elements.copyOutputBtn) {
      elements.copyOutputBtn.addEventListener('click', () => {
        copyToClipboard(elements.output?.textContent || '', elements.copyOutputBtn);
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeydown);

    // Initialize
    populateExamples();
    loadFromURL();
    updateStatus('JavaScript ready', 'ready');

    // Set default code if empty
    if (!elements.editor.value) {
      elements.editor.value = examples.javascript['Hello World'];
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
