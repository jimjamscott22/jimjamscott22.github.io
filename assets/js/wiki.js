document.addEventListener('DOMContentLoaded', function() {
  const STORAGE_KEY = 'jamielab-wiki-filters-v1';
  const searchInput = document.getElementById('wiki-search');
  const wikiGrid = document.getElementById('wiki-grid');
  const wikiCards = wikiGrid ? wikiGrid.querySelectorAll('.wiki-card') : [];
  const countDisplay = document.getElementById('wiki-count');
  const filterButtons = document.querySelectorAll('.wiki-filter-btn');
  const wikiDataUrl = wikiGrid?.dataset.wikiDataUrl || '/assets/data/wiki-data.json';

  if (!wikiGrid || wikiCards.length === 0) {
    return; // Exit if not on wiki page
  }

  let activeCategory = 'all';
  let activeType = 'all';
  let searchTerm = '';
  let wikiDataMap = null;
  let wikiDataLoadPromise = null;

  function normalizePath(url) {
    try {
      return new URL(url, window.location.origin).pathname.replace(/\/$/, '');
    } catch (e) {
      return '';
    }
  }

  function loadWikiData() {
    if (wikiDataMap) {
      return Promise.resolve(wikiDataMap);
    }

    if (wikiDataLoadPromise) {
      return wikiDataLoadPromise;
    }

    wikiDataLoadPromise = fetch(wikiDataUrl, { credentials: 'same-origin' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Wiki data request failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const map = new Map();
        if (Array.isArray(data)) {
          data.forEach(item => {
            const key = normalizePath(item.url);
            if (key) map.set(key, item);
          });
        }
        wikiDataMap = map;
        return wikiDataMap;
      })
      .catch((error) => {
        console.warn('Unable to load wiki data', error);
        wikiDataMap = new Map();
        return wikiDataMap;
      });

    return wikiDataLoadPromise;
  }

  function getContentMatch(dataMap, cardUrl, term) {
    if (!term || !dataMap || dataMap.size === 0) return false;
    const key = normalizePath(cardUrl);
    const item = dataMap.get(key);
    const content = item?.content ? String(item.content).toLowerCase() : '';
    return content.includes(term);
  }

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
  async function applyFilters() {
    let visibleCount = 0;
    let dataMap = null;
    const shouldSearchContent = searchTerm.length >= 2;
    if (shouldSearchContent) {
      dataMap = await loadWikiData();
    }

    for (const card of wikiCards) {
      const cardCategory = card.dataset.category;
      const cardType = card.dataset.type;
      const cardTitle = card.dataset.title;
      const cardTags = card.dataset.tags;
      const cardUrl = card.dataset.url || '';

      const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
      const typeMatch = activeType === 'all' || cardType === activeType;
      let searchMatch = !searchTerm ||
        cardTitle.includes(searchTerm) ||
        cardTags.includes(searchTerm);

      if (!searchMatch && shouldSearchContent) {
        searchMatch = getContentMatch(dataMap, cardUrl, searchTerm);
      }

      if (categoryMatch && typeMatch && searchMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    }

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
