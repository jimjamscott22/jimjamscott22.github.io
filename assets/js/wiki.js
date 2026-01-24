document.addEventListener('DOMContentLoaded', function() {
  const STORAGE_KEY = 'jamielab-wiki-filters-v1';
  const searchInput = document.getElementById('wiki-search');
  const wikiGrid = document.getElementById('wiki-grid');
  const wikiCards = wikiGrid ? wikiGrid.querySelectorAll('.wiki-card') : [];
  const countDisplay = document.getElementById('wiki-count');
  const filterButtons = document.querySelectorAll('.wiki-filter-btn');

  if (!wikiGrid || wikiCards.length === 0) {
    return; // Exit if not on wiki page
  }

  let activeCategory = 'all';
  let activeType = 'all';
  let searchTerm = '';

  // Load saved filters
  function loadFilters() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const filters = JSON.parse(saved);
        activeCategory = filters.category || 'all';
        activeType = filters.type || 'all';
      }
    } catch (e) {
      // Fail silently
    }
  }

  // Save filters
  function saveFilters() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        category: activeCategory,
        type: activeType
      }));
    } catch (e) {
      // Fail silently
    }
  }

  // Apply filters
  function applyFilters() {
    let visibleCount = 0;

    wikiCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const cardType = card.dataset.type;
      const cardTitle = card.dataset.title;
      const cardTags = card.dataset.tags;

      const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
      const typeMatch = activeType === 'all' || cardType === activeType;
      const searchMatch = !searchTerm ||
        cardTitle.includes(searchTerm) ||
        cardTags.includes(searchTerm);

      if (categoryMatch && typeMatch && searchMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} of ${wikiCards.length} notes`;
    }
  }

  // Search functionality
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchTerm = this.value.toLowerCase().trim();
        applyFilters();
      }, 300);
    });
  }

  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      const type = this.dataset.type;

      if (category !== undefined) {
        // Update category filter
        document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeCategory = category;
      } else if (type !== undefined) {
        // Update type filter
        document.querySelectorAll('[data-type]').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeType = type;
      }

      saveFilters();
      applyFilters();
    });
  });

  // Initialize
  loadFilters();

  // Apply saved filters to buttons
  const categoryBtn = document.querySelector(`[data-category="${activeCategory}"]`);
  const typeBtn = document.querySelector(`[data-type="${activeType}"]`);

  if (categoryBtn) categoryBtn.classList.add('active');
  if (typeBtn) typeBtn.classList.add('active');

  applyFilters();
});
