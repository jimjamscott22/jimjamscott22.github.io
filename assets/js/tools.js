/**
 * Tools.js - Interactive utilities for jamielab
 * Password Generator, ASCII Art, Encoder/Decoder, Hash Generator
 */

(function() {
  'use strict';

  // ========================================
  // PASSWORD GENERATOR
  // ========================================

  const pwLength = document.getElementById('pw-length');
  const pwLengthDisplay = document.getElementById('pw-length-display');
  const pwOutput = document.getElementById('pw-output');
  const pwGenerate = document.getElementById('pw-generate');
  const pwStrength = document.getElementById('pw-strength');

  const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  if (pwLength) {
    pwLength.addEventListener('input', () => {
      pwLengthDisplay.textContent = pwLength.value;
    });
  }

  if (pwGenerate) {
    pwGenerate.addEventListener('click', generatePassword);
    // Generate one on load
    generatePassword();
  }

  function generatePassword() {
    const length = parseInt(pwLength.value, 10);
    let chars = '';

    if (document.getElementById('pw-upper').checked) chars += charSets.upper;
    if (document.getElementById('pw-lower').checked) chars += charSets.lower;
    if (document.getElementById('pw-numbers').checked) chars += charSets.numbers;
    if (document.getElementById('pw-symbols').checked) chars += charSets.symbols;

    if (!chars) {
      pwOutput.value = 'Select at least one character type';
      pwStrength.textContent = '';
      return;
    }

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }

    pwOutput.value = password;
    updateStrength(password);
  }

  function updateStrength(password) {
    let score = 0;
    const length = password.length;

    // Length scoring
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (length >= 24) score += 1;

    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    let strength, color;
    if (score <= 3) {
      strength = 'Weak';
      color = '#ff4444';
    } else if (score <= 5) {
      strength = 'Fair';
      color = '#ffaa00';
    } else if (score <= 7) {
      strength = 'Strong';
      color = '#00ff88';
    } else {
      strength = 'Very Strong';
      color = '#00e5ff';
    }

    pwStrength.textContent = `Strength: ${strength}`;
    pwStrength.style.color = color;
  }

  // ========================================
  // ASCII ART GENERATOR
  // ========================================

  const asciiInput = document.getElementById('ascii-input');
  const asciiFont = document.getElementById('ascii-font');
  const asciiOutput = document.getElementById('ascii-output');

  // ASCII Art fonts (simplified FIGlet-style)
  const fonts = {
    block: {
      height: 5,
      chars: {
        'A': ['█████', '█   █', '█████', '█   █', '█   █'],
        'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
        'C': ['█████', '█    ', '█    ', '█    ', '█████'],
        'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
        'E': ['█████', '█    ', '████ ', '█    ', '█████'],
        'F': ['█████', '█    ', '████ ', '█    ', '█    '],
        'G': ['█████', '█    ', '█  ██', '█   █', '█████'],
        'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
        'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
        'J': ['█████', '   █ ', '   █ ', '█  █ ', '████ '],
        'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
        'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
        'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
        'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
        'O': ['█████', '█   █', '█   █', '█   █', '█████'],
        'P': ['█████', '█   █', '█████', '█    ', '█    '],
        'Q': ['█████', '█   █', '█ █ █', '█  █ ', '████ '],
        'R': ['█████', '█   █', '█████', '█  █ ', '█   █'],
        'S': ['█████', '█    ', '█████', '    █', '█████'],
        'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
        'U': ['█   █', '█   █', '█   █', '█   █', '█████'],
        'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
        'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
        'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
        'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
        'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
        '0': ['█████', '█  ██', '█ █ █', '██  █', '█████'],
        '1': [' ██  ', '  █  ', '  █  ', '  █  ', '█████'],
        '2': ['█████', '    █', '█████', '█    ', '█████'],
        '3': ['█████', '    █', '█████', '    █', '█████'],
        '4': ['█   █', '█   █', '█████', '    █', '    █'],
        '5': ['█████', '█    ', '█████', '    █', '█████'],
        '6': ['█████', '█    ', '█████', '█   █', '█████'],
        '7': ['█████', '    █', '   █ ', '  █  ', '  █  '],
        '8': ['█████', '█   █', '█████', '█   █', '█████'],
        '9': ['█████', '█   █', '█████', '    █', '█████'],
        ' ': ['     ', '     ', '     ', '     ', '     '],
        '!': ['  █  ', '  █  ', '  █  ', '     ', '  █  '],
        '.': ['     ', '     ', '     ', '     ', '  █  '],
        '-': ['     ', '     ', '█████', '     ', '     '],
        '_': ['     ', '     ', '     ', '     ', '█████'],
        '?': ['█████', '    █', '  ██ ', '     ', '  █  ']
      }
    },
    banner: {
      height: 7,
      chars: {
        'A': ['   #   ', '  # #  ', ' #   # ', '#     #', '#######', '#     #', '#     #'],
        'B': ['###### ', '#     #', '###### ', '#     #', '#     #', '#     #', '###### '],
        'C': [' ##### ', '#     #', '#      ', '#      ', '#      ', '#     #', ' ##### '],
        'D': ['###### ', '#     #', '#     #', '#     #', '#     #', '#     #', '###### '],
        'E': ['#######', '#      ', '###### ', '#      ', '#      ', '#      ', '#######'],
        'F': ['#######', '#      ', '###### ', '#      ', '#      ', '#      ', '#      '],
        'G': [' ##### ', '#     #', '#      ', '#  ####', '#     #', '#     #', ' ##### '],
        'H': ['#     #', '#     #', '#######', '#     #', '#     #', '#     #', '#     #'],
        'I': ['#######', '   #   ', '   #   ', '   #   ', '   #   ', '   #   ', '#######'],
        'J': ['#######', '    #  ', '    #  ', '    #  ', '#   #  ', '#   #  ', ' ###   '],
        'K': ['#    # ', '#   #  ', '####   ', '#   #  ', '#    # ', '#     #', '#     #'],
        'L': ['#      ', '#      ', '#      ', '#      ', '#      ', '#      ', '#######'],
        'M': ['#     #', '##   ##', '# # # #', '#  #  #', '#     #', '#     #', '#     #'],
        'N': ['#     #', '##    #', '# #   #', '#  #  #', '#   # #', '#    ##', '#     #'],
        'O': [' ##### ', '#     #', '#     #', '#     #', '#     #', '#     #', ' ##### '],
        'P': ['###### ', '#     #', '###### ', '#      ', '#      ', '#      ', '#      '],
        'Q': [' ##### ', '#     #', '#     #', '#   # #', '#    # ', ' #### #', '      #'],
        'R': ['###### ', '#     #', '###### ', '#   #  ', '#    # ', '#     #', '#     #'],
        'S': [' ##### ', '#     #', ' #     ', '  ###  ', '     # ', '#     #', ' ##### '],
        'T': ['#######', '   #   ', '   #   ', '   #   ', '   #   ', '   #   ', '   #   '],
        'U': ['#     #', '#     #', '#     #', '#     #', '#     #', '#     #', ' ##### '],
        'V': ['#     #', '#     #', '#     #', '#     #', ' #   # ', '  # #  ', '   #   '],
        'W': ['#     #', '#     #', '#     #', '#  #  #', '# # # #', '##   ##', '#     #'],
        'X': ['#     #', ' #   # ', '  # #  ', '   #   ', '  # #  ', ' #   # ', '#     #'],
        'Y': ['#     #', ' #   # ', '  # #  ', '   #   ', '   #   ', '   #   ', '   #   '],
        'Z': ['#######', '     # ', '    #  ', '   #   ', '  #    ', ' #     ', '#######'],
        ' ': ['       ', '       ', '       ', '       ', '       ', '       ', '       '],
        '!': ['  ###  ', '  ###  ', '  ###  ', '   #   ', '       ', '  ###  ', '  ###  '],
        '0': [' ##### ', '#     #', '#   # #', '#  #  #', '# #   #', '#     #', ' ##### '],
        '1': ['   #   ', '  ##   ', '   #   ', '   #   ', '   #   ', '   #   ', ' ##### '],
        '2': [' ##### ', '#     #', '      #', '  #### ', ' #     ', '#      ', '#######'],
        '3': [' ##### ', '#     #', '      #', '   ### ', '      #', '#     #', ' ##### '],
        '4': ['#     #', '#     #', '#     #', ' ######', '      #', '      #', '      #'],
        '5': ['#######', '#      ', '###### ', '      #', '      #', '#     #', ' ##### '],
        '6': [' ##### ', '#      ', '###### ', '#     #', '#     #', '#     #', ' ##### '],
        '7': ['#######', '     # ', '    #  ', '   #   ', '  #    ', '  #    ', '  #    '],
        '8': [' ##### ', '#     #', ' ##### ', '#     #', '#     #', '#     #', ' ##### '],
        '9': [' ##### ', '#     #', '#     #', ' ######', '      #', '#     #', ' ##### ']
      }
    },
    mini: {
      height: 3,
      chars: {
        'A': ['▄█▄', '█▀█', '▀ ▀'],
        'B': ['██▄', '█▄█', '██▀'],
        'C': ['▄██', '█  ', '▀██'],
        'D': ['██▄', '█ █', '██▀'],
        'E': ['███', '█▄ ', '███'],
        'F': ['███', '█▄ ', '█  '],
        'G': ['▄██', '█ █', '▀██'],
        'H': ['█ █', '███', '█ █'],
        'I': ['███', ' █ ', '███'],
        'J': ['███', ' █ ', '██ '],
        'K': ['█▄█', '██ ', '█ █'],
        'L': ['█  ', '█  ', '███'],
        'M': ['█▄█', '█▀█', '█ █'],
        'N': ['█▄█', '█▀█', '█ █'],
        'O': ['▄█▄', '█ █', '▀█▀'],
        'P': ['██▄', '█▀ ', '█  '],
        'Q': ['▄█▄', '█ █', '▀█▄'],
        'R': ['██▄', '█▀ ', '█ █'],
        'S': ['▄██', '▀█▄', '██▀'],
        'T': ['███', ' █ ', ' █ '],
        'U': ['█ █', '█ █', '▀█▀'],
        'V': ['█ █', '█ █', ' ▀ '],
        'W': ['█ █', '█▄█', '█▀█'],
        'X': ['█ █', ' ▀ ', '█ █'],
        'Y': ['█ █', ' █ ', ' █ '],
        'Z': ['██▄', ' █ ', '▀██'],
        ' ': ['   ', '   ', '   '],
        '!': [' █ ', ' █ ', ' ▀ '],
        '0': ['▄█▄', '█ █', '▀█▀'],
        '1': ['▄█ ', ' █ ', '▄█▄'],
        '2': ['▄█▄', '▄█▀', '█▄▄'],
        '3': ['██▄', ' █▄', '██▀'],
        '4': ['█ █', '▀█▀', '  █'],
        '5': ['███', '█▄ ', '▄█▀'],
        '6': ['▄█ ', '██▄', '▀█▀'],
        '7': ['███', '  █', '  █'],
        '8': ['▄█▄', '▄█▄', '▀█▀'],
        '9': ['▄█▄', '▀██', ' █▀']
      }
    },
    slant: {
      height: 5,
      chars: {
        'A': ['    ___   ', '   /   |  ', '  / /| |  ', ' / ___ |  ', '/_/  |_|  '],
        'B': ['    ____ ', '   / __ )', '  / __  |', ' / /_/ / ', '/_____/  '],
        'C': ['   ______', '  / ____/', ' / /     ', '/ /___   ', '\\____/   '],
        'D': ['    ____ ', '   / __ \\', '  / / / /', ' / /_/ / ', '/_____/  '],
        'E': ['    ____', '   / __/', '  / _/  ', ' / /___ ', '/____/  '],
        'F': ['    ____', '   / __/', '  / _/  ', ' / /    ', '/_/     '],
        'G': ['   ______', '  / ____/', ' / / __  ', '/ /_/ /  ', '\\____/   '],
        'H': ['    __  __', '   / / / /', '  / /_/ / ', ' / __  /  ', '/_/ /_/   '],
        'I': ['    ____', '   /  _/', '   / /  ', ' _/ /   ', '/___/   '],
        'J': ['       __', '      / /', ' __  / / ', '/ /_/ /  ', '\\____/   '],
        'K': ['    __ __', '   / //_/', '  / ,<   ', ' / /| |  ', '/_/ |_|  '],
        'L': ['    __ ', '   / / ', '  / /  ', ' / /___', '/_____/'],
        'M': ['    __  ___', '   /  |/  /', '  / /|_/ / ', ' / /  / /  ', '/_/  /_/   '],
        'N': ['    _   __', '   / | / /', '  /  |/ / ', ' / /|  /  ', '/_/ |_/   '],
        'O': ['   ____ ', '  / __ \\', ' / / / /', '/ /_/ / ', '\\____/  '],
        'P': ['    ____ ', '   / __ \\', '  / /_/ /', ' / ____/ ', '/_/      '],
        'Q': ['   ____ ', '  / __ \\', ' / / / /', '/ /_/ / ', '\\___\\_\\ '],
        'R': ['    ____ ', '   / __ \\', '  / /_/ /', ' / _, _/ ', '/_/ |_|  '],
        'S': ['   _____', '  / ___/', '  \\__ \\ ', ' ___/ / ', '/____/  '],
        'T': ['  ______', ' /_  __/', '  / /   ', ' / /    ', '/_/     '],
        'U': ['   __  __', '  / / / /', ' / / / / ', '/ /_/ /  ', '\\____/   '],
        'V': ['   _    __', '  | |  / /', '  | | / / ', ' _| |/ /  ', '|_____/   '],
        'W': ['  _       __', ' | |     / /', ' | | /| / / ', ' | |/ |/ /  ', ' |__/|__/   '],
        'X': ['   _  __', '  | |/ /', '  |   / ', ' /   |  ', '/_/|_|  '],
        'Y': ['__  __', '\\ \\/ /', ' \\  / ', ' / /  ', '/_/   '],
        'Z': ['  _____', ' /__  /', '   / / ', '  / /_ ', ' /___/ '],
        ' ': ['     ', '     ', '     ', '     ', '     '],
        '!': [' _ ', '| |', '| |', '|_|', '(_)'],
        '0': [' ___  ', '/ _ \\ ', '| | | |', '| |_| |', ' \\___/ '],
        '1': ['  __ ', ' /_ |', '  | |', '  | |', '  |_|'],
        '2': [' ___  ', '|__ \\ ', '   ) |', '  / / ', ' |___|'],
        '3': [' ___  ', '|__ \\ ', '   ) |', '  __) |', ' |___/ '],
        '4': [' _  _   ', '| || |  ', '| || |_ ', '|__   _|', '   |_|  '],
        '5': [' _____ ', '| ____|', '| |__  ', '|___ \\ ', ' ___) |'],
        '6': ['   __  ', '  / /  ', ' / /_  ', '| |_ \\ ', ' \\__/ '],
        '7': [' ______ ', '|____  |', '    / / ', '   / /  ', '  /_/   '],
        '8': ['  ___  ', ' ( _ ) ', ' / _ \\ ', '| (_) |', ' \\___/ '],
        '9': ['  ___  ', ' / _ \\ ', '| (_) |', ' \\__, |', '   /_/ ']
      }
    },
    digital: {
      height: 5,
      chars: {
        'A': [' ▄▄▄ ', '█▀ ▀█', '█▀▀▀█', '█   █', '▀   ▀'],
        'B': ['█▀▀▀▄', '█▄▄▄▀', '█   █', '█▄▄▄▀', '     '],
        'C': [' ▄▄▄▄', '█    ', '█    ', '█    ', ' ▀▀▀▀'],
        'D': ['█▀▀▀▄', '█   █', '█   █', '█   █', '█▄▄▄▀'],
        'E': ['█▀▀▀▀', '█▄▄  ', '█    ', '█▄▄▄▄', '     '],
        'F': ['█▀▀▀▀', '█▄▄  ', '█    ', '█    ', '     '],
        'G': [' ▄▄▄▄', '█    ', '█  ▀█', '█   █', ' ▀▀▀▀'],
        'H': ['█   █', '█▄▄▄█', '█▀▀▀█', '█   █', '     '],
        'I': ['▀█▀', ' █ ', ' █ ', '▄█▄', '   '],
        'J': ['   █', '   █', '   █', '█  █', ' ▀▀ '],
        'K': ['█  █', '█▄█ ', '█▀▄ ', '█  █', '    '],
        'L': ['█   ', '█   ', '█   ', '█▄▄▄', '    '],
        'M': ['█▄ ▄█', '█ █ █', '█   █', '█   █', '     '],
        'N': ['█▄  █', '█ █ █', '█  ▀█', '█   █', '     '],
        'O': [' ▄▄▄ ', '█   █', '█   █', '█   █', ' ▀▀▀ '],
        'P': ['█▀▀▀▄', '█   █', '█▀▀▀ ', '█    ', '     '],
        'Q': [' ▄▄▄ ', '█   █', '█ ▄ █', ' ▀▀▀▄', '    ▀'],
        'R': ['█▀▀▀▄', '█   █', '█▀█▀ ', '█  █ ', '     '],
        'S': [' ▄▄▄▄', '█    ', ' ▀▀▀▄', '    █', '▀▀▀▀ '],
        'T': ['▀▀█▀▀', '  █  ', '  █  ', '  █  ', '     '],
        'U': ['█   █', '█   █', '█   █', ' ▀▀▀ ', '     '],
        'V': ['█   █', '█   █', ' █ █ ', '  █  ', '     '],
        'W': ['█   █', '█   █', '█ █ █', '█▀ ▀█', '     '],
        'X': ['█   █', ' ▀▄▀ ', '  █  ', ' ▄▀▄ ', '█   █'],
        'Y': ['█   █', ' ▀▄▀ ', '  █  ', '  █  ', '     '],
        'Z': ['▀▀▀▀█', '   █ ', '  █  ', ' █   ', '█▀▀▀▀'],
        ' ': ['     ', '     ', '     ', '     ', '     '],
        '!': [' █ ', ' █ ', ' █ ', '   ', ' ▀ '],
        '0': [' ▄▄▄ ', '█  ▄█', '█ █ █', '█▄  █', ' ▀▀▀ '],
        '1': [' ▄█ ', '  █ ', '  █ ', ' ▄█▄', '    '],
        '2': [' ▄▄▄ ', '    █', ' ▄▄▄ ', '█    ', '▀▀▀▀▀'],
        '3': ['▀▀▀▀▄', '    █', ' ▀▀▀▄', '    █', '▄▄▄▄▀'],
        '4': ['█   █', '█   █', '▀▀▀▀█', '    █', '     '],
        '5': ['█▀▀▀▀', '█▄▄▄ ', '    █', '    █', '▀▀▀▀ '],
        '6': [' ▄▄▄ ', '█    ', '█▀▀▀▄', '█   █', ' ▀▀▀ '],
        '7': ['▀▀▀▀█', '    █', '   █ ', '  █  ', '     '],
        '8': [' ▄▄▄ ', '█   █', ' ▄▄▄ ', '█   █', ' ▀▀▀ '],
        '9': [' ▄▄▄ ', '█   █', ' ▀▀▀█', '    █', ' ▀▀▀ ']
      }
    }
  };

  function generateAscii(text, fontName) {
    const font = fonts[fontName];
    if (!font) return 'Font not found';

    text = text.toUpperCase();
    const lines = [];

    for (let row = 0; row < font.height; row++) {
      let line = '';
      for (const char of text) {
        const charArt = font.chars[char] || font.chars[' '];
        line += (charArt ? charArt[row] : '     ') + ' ';
      }
      lines.push(line);
    }

    return lines.join('\n');
  }

  if (asciiInput) {
    const updateAscii = () => {
      const text = asciiInput.value || 'HELLO';
      asciiOutput.textContent = generateAscii(text, asciiFont.value);
    };

    asciiInput.addEventListener('input', updateAscii);
    asciiFont.addEventListener('change', updateAscii);

    // Initial render
    updateAscii();
  }

  // ========================================
  // TEXT ENCODER/DECODER
  // ========================================

  const encoderInput = document.getElementById('encoder-input');
  const encoderMode = document.getElementById('encoder-mode');
  const encoderOutput = document.getElementById('encoder-output');
  const encoderConvert = document.getElementById('encoder-convert');
  const encoderSwap = document.getElementById('encoder-swap');

  function encode(text, mode) {
    try {
      switch (mode) {
        case 'base64-encode':
          return btoa(unescape(encodeURIComponent(text)));
        case 'base64-decode':
          return decodeURIComponent(escape(atob(text)));
        case 'binary':
          return text.split('').map(c =>
            c.charCodeAt(0).toString(2).padStart(8, '0')
          ).join(' ');
        case 'binary-decode':
          return text.split(' ').map(b =>
            String.fromCharCode(parseInt(b, 2))
          ).join('');
        case 'hex':
          return text.split('').map(c =>
            c.charCodeAt(0).toString(16).padStart(2, '0')
          ).join(' ');
        case 'hex-decode':
          return text.split(' ').map(h =>
            String.fromCharCode(parseInt(h, 16))
          ).join('');
        case 'rot13':
          return text.replace(/[a-zA-Z]/g, c => {
            const base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
          });
        case 'reverse':
          return text.split('').reverse().join('');
        case 'url-encode':
          return encodeURIComponent(text);
        case 'url-decode':
          return decodeURIComponent(text);
        default:
          return text;
      }
    } catch (e) {
      return 'Error: Invalid input for this encoding';
    }
  }

  if (encoderConvert) {
    encoderConvert.addEventListener('click', () => {
      encoderOutput.value = encode(encoderInput.value, encoderMode.value);
    });
  }

  if (encoderSwap) {
    encoderSwap.addEventListener('click', () => {
      const temp = encoderInput.value;
      encoderInput.value = encoderOutput.value;
      encoderOutput.value = temp;
    });
  }

  // ========================================
  // HASH GENERATOR
  // ========================================

  const hashInput = document.getElementById('hash-input');

  // Simple MD5 implementation (for demonstration - not for security use)
  function md5(string) {
    function md5cycle(x, k) {
      var a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);
      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);
    }

    function cmn(q, a, b, x, s, t) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
    }

    function ff(a, b, c, d, x, s, t) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function md5blk(s) {
      var md5blks = [], i;
      for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) +
          (s.charCodeAt(i + 1) << 8) +
          (s.charCodeAt(i + 2) << 16) +
          (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }

    function md5blk_array(a) {
      var md5blks = [], i;
      for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = a[i] +
          (a[i + 1] << 8) +
          (a[i + 2] << 16) +
          (a[i + 3] << 24);
      }
      return md5blks;
    }

    function add32(a, b) {
      return (a + b) & 0xFFFFFFFF;
    }

    function rhex(n) {
      var s = '', j;
      for (j = 0; j < 4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
      return s;
    }

    function hex(x) {
      for (var i = 0; i < x.length; i++)
        x[i] = rhex(x[i]);
      return x.join('');
    }

    var hex_chr = '0123456789abcdef'.split('');

    function md5_vm(s) {
      var n = s.length,
        state = [1732584193, -271733879, -1732584194, 271733878], i;
      for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0; i < s.length; i++)
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
      }
      tail[14] = n * 8;
      md5cycle(state, tail);
      return state;
    }

    return hex(md5_vm(string));
  }

  // SHA hashing using Web Crypto API
  async function sha(algorithm, text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function updateHashes() {
    const text = hashInput.value;

    if (!text) {
      document.getElementById('hash-md5').value = '';
      document.getElementById('hash-sha1').value = '';
      document.getElementById('hash-sha256').value = '';
      document.getElementById('hash-sha512').value = '';
      return;
    }

    document.getElementById('hash-md5').value = md5(text);
    document.getElementById('hash-sha1').value = await sha('SHA-1', text);
    document.getElementById('hash-sha256').value = await sha('SHA-256', text);
    document.getElementById('hash-sha512').value = await sha('SHA-512', text);
  }

  if (hashInput) {
    hashInput.addEventListener('input', updateHashes);
  }

  // ========================================
  // COPY FUNCTIONALITY
  // ========================================

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      let text = '';

      if (btn.dataset.copy) {
        text = document.getElementById(btn.dataset.copy).value;
      } else if (btn.dataset.copyPre) {
        text = document.getElementById(btn.dataset.copyPre).textContent;
      } else if (btn.dataset.copyTextarea) {
        text = document.getElementById(btn.dataset.copyTextarea).value;
      }

      try {
        await navigator.clipboard.writeText(text);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 1500);
      } catch (err) {
        btn.textContent = 'Error';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 1500);
      }
    });
  });

})();
