document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('info-search');
  var infoGrid = document.getElementById('info-grid');
  var infoCards = infoGrid ? infoGrid.querySelectorAll('.info-card') : [];
  var countDisplay = document.getElementById('info-count');
  var filterButtons = document.querySelectorAll('.info-filter-btn');

  if (!infoGrid || infoCards.length === 0) return;

  var activeCategory = 'all';
  var searchTerm = '';

  function applyFilters() {
    var visibleCount = 0;

    infoCards.forEach(function(card) {
      var cardCategory = card.dataset.category;
      var cardTitle = card.dataset.title;
      var cardTags = card.dataset.tags;

      var categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
      var searchMatch = !searchTerm ||
        cardTitle.includes(searchTerm) ||
        cardTags.includes(searchTerm);

      if (categoryMatch && searchMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countDisplay) {
      countDisplay.textContent = 'Showing ' + visibleCount + ' of ' + infoCards.length + ' entries';
    }
  }

  var searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      var input = this;
      searchTimeout = setTimeout(function() {
        searchTerm = input.value.toLowerCase().trim();
        applyFilters();
      }, 300);
    });
  }

  filterButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.info-filter-btn[data-category]').forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      activeCategory = this.dataset.category;
      applyFilters();
    });
  });

  applyFilters();
});
