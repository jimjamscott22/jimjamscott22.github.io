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

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function highlightText(text, query) {
    if (!query) return escapeHtml(text);
    const escapedQuery = escapeRegex(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const escapedText = escapeHtml(text);
    return escapedText.replace(regex, '<mark>$1</mark>');
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
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'search-empty';
      
      const p1 = document.createElement('p');
      p1.innerHTML = 'No matches for "<strong></strong>"';
      p1.querySelector('strong').textContent = query;
      
      const p2 = document.createElement('p');
      p2.className = 'search-hint';
      p2.textContent = 'Try different keywords or check your spelling.';
      
      emptyDiv.appendChild(p1);
      emptyDiv.appendChild(p2);
      searchResults.innerHTML = '';
      searchResults.appendChild(emptyDiv);
      return;
    }

    searchResults.innerHTML = '';
    
    results.forEach(item => {
      // Truncate at word boundary for better readability
      let excerpt = item.content.substring(0, 200);
      const lastSpace = excerpt.lastIndexOf(' ');
      if (lastSpace > 150) {
        excerpt = excerpt.substring(0, lastSpace);
      }
      excerpt += '...';
      const highlightedTitle = highlightText(item.title, query);
      const highlightedExcerpt = highlightText(excerpt, query);
      
      const article = document.createElement('article');
      article.className = 'search-result-item';
      
      const header = document.createElement('header');
      header.className = 'search-result-header';
      
      const h3 = document.createElement('h3');
      const link = document.createElement('a');
      link.href = item.url;
      link.innerHTML = highlightedTitle;
      h3.appendChild(link);
      
      const dateBadge = document.createElement('span');
      dateBadge.className = 'badge tag';
      dateBadge.textContent = item.date;
      
      header.appendChild(h3);
      header.appendChild(dateBadge);
      
      const excerptP = document.createElement('p');
      excerptP.className = 'search-result-excerpt';
      excerptP.innerHTML = highlightedExcerpt;
      
      article.appendChild(header);
      article.appendChild(excerptP);
      
      if (item.tags && item.tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'search-result-tags';
        item.tags.forEach(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'badge tag';
          tagSpan.textContent = tag;
          tagsDiv.appendChild(tagSpan);
        });
        article.appendChild(tagsDiv);
      }
      
      searchResults.appendChild(article);
    });
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
