document.addEventListener('DOMContentLoaded', function() {
  const STORAGE_KEY = 'jamielab-archive-state-v1';

  // Load saved state
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  // Save state
  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Fail silently
    }
  }

  const state = loadState();
  const yearElements = document.querySelectorAll('.archive-year');

  // Initialize year states
  yearElements.forEach(yearEl => {
    const year = yearEl.dataset.year;
    const header = yearEl.querySelector('.archive-year-header');

    // Apply saved state (default: expanded)
    if (state[year] === 'collapsed') {
      yearEl.classList.add('collapsed');
    }

    // Toggle on click
    header.addEventListener('click', function() {
      yearEl.classList.toggle('collapsed');
      state[year] = yearEl.classList.contains('collapsed') ? 'collapsed' : 'expanded';
      saveState(state);
    });
  });
});
