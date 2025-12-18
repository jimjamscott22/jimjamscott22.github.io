// assets/js/code-copy.js
// Add copy buttons to code blocks

(function () {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }

  function initCopyButtons() {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre > code, div.highlight > pre');
    
    if (codeBlocks.length === 0) return;

    codeBlocks.forEach((codeBlock, index) => {
      const pre = codeBlock.tagName === 'PRE' ? codeBlock : codeBlock.parentElement;
      
      // Skip if already has a copy button
      if (pre.querySelector('.code-copy-button')) return;

      // Create wrapper if needed
      if (!pre.parentElement.classList.contains('code-block-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentElement.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      }

      // Create copy button
      const button = document.createElement('button');
      button.className = 'code-copy-button';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="9" height="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M3 11V3h8" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        <span class="copy-text">Copy</span>
      `;

      // Add click handler
      button.addEventListener('click', () => {
        const code = codeBlock.textContent || codeBlock.innerText;
        copyToClipboard(code, button);
      });

      pre.parentElement.appendChild(button);
    });
  }

  function copyToClipboard(text, button) {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          showCopySuccess(button);
        })
        .catch(err => {
          console.warn('Clipboard API failed, falling back:', err);
          fallbackCopy(text, button);
        });
    } else {
      fallbackCopy(text, button);
    }
  }

  function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      // Using deprecated execCommand for legacy browser support only
      // Modern browsers should use the clipboard API above
      const successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess(button);
      } else {
        showCopyError(button);
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      showCopyError(button);
    }

    document.body.removeChild(textarea);
  }

  function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
      <svg class="copy-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
      <span class="copy-text">Copied!</span>
    `;
    button.classList.add('copied');

    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 2000);
  }

  function showCopyError(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
      <span class="copy-text">Failed</span>
    `;
    button.classList.add('copy-error');

    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('copy-error');
    }, 2000);
  }
})();
