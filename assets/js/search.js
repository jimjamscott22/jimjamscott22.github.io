// assets/js/search.js
// Client-side search for blog posts and notes

(function () {
  const searchContainer = document.getElementById("search-container");
  if (!searchContainer) return;

  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchCount = document.getElementById("search-count");

  // Build search index from data embedded in the page
  let searchIndex = [];
  
  // Check if search data is available
  if (typeof window.searchData !== 'undefined') {
    searchIndex = window.searchData;
  }

  function normalizeText(text) {
    return text.toLowerCase().trim();
  }

  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function performSearch(query) {
    const normalizedQuery = normalizeText(query);
    
    if (!normalizedQuery || normalizedQuery.length < 2) {
      searchResults.innerHTML = '';
      if (searchCount) searchCount.textContent = '';
      return;
    }

    const results = searchIndex.filter(item => {
      const titleMatch = normalizeText(item.title).includes(normalizedQuery);
      const contentMatch = normalizeText(item.content).includes(normalizedQuery);
      const tagsMatch = item.tags && item.tags.some(tag => 
        normalizeText(tag).includes(normalizedQuery)
      );
      return titleMatch || contentMatch || tagsMatch;
    });

    displayResults(results, normalizedQuery);
  }

  function displayResults(results, query) {
    if (searchCount) {
      searchCount.textContent = results.length === 0 
        ? 'No results found' 
        : `${results.length} result${results.length !== 1 ? 's' : ''} found`;
    }

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-empty">
          <p>No matches for "<strong>${query}</strong>"</p>
          <p class="search-hint">Try different keywords or check your spelling.</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = results.map(item => {
      const excerpt = item.content.substring(0, 200) + '...';
      const highlightedTitle = highlightText(item.title, query);
      const highlightedExcerpt = highlightText(excerpt, query);
      
      return `
        <article class="search-result-item">
          <header class="search-result-header">
            <h3><a href="${item.url}">${highlightedTitle}</a></h3>
            <span class="badge tag">${item.date}</span>
          </header>
          <p class="search-result-excerpt">${highlightedExcerpt}</p>
          ${item.tags && item.tags.length > 0 ? `
            <div class="search-result-tags">
              ${item.tags.map(tag => `<span class="badge tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </article>
      `;
    }).join('');
  }

  // Debounce search to avoid too many searches while typing
  let searchTimeout;
  function debouncedSearch(query) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });

    // Clear search on Escape key
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchResults.innerHTML = '';
        if (searchCount) searchCount.textContent = '';
      }
    });
  }
})();
