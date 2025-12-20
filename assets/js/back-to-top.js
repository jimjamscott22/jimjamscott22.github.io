// assets/js/back-to-top.js
// Add a "back to top" button that appears on scroll

(function () {
  // Create back to top button
  const backToTop = document.createElement('a');
  backToTop.href = '#';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // Scroll to top smoothly
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Listen for scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      toggleBackToTop();
    });
  }, { passive: true });

  // Initial check
  toggleBackToTop();
})();
