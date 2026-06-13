document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('tool-search');
  var grid = document.getElementById('tool-grid');
  var cards = grid ? grid.querySelectorAll('.tool-card') : [];
  var countDisplay = document.getElementById('tool-count');
  var catButtons = document.querySelectorAll('.tool-cat-btn');
  var costButtons = document.querySelectorAll('.tool-cost-btn');

  if (!grid || cards.length === 0) return;

  var activeCategory = 'all';
  var activeCost = 'all';
  var searchTerm = '';

  function applyFilters() {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var catMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
      var costMatch = activeCost === 'all' || card.dataset.cost === activeCost;
      var searchMatch = !searchTerm ||
        card.dataset.name.includes(searchTerm) ||
        card.dataset.tags.includes(searchTerm);

      if (catMatch && costMatch && searchMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countDisplay) {
      countDisplay.textContent = 'Showing ' + visibleCount + ' of ' + cards.length + ' tools';
    }
  }

  var searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      var input = this;
      searchTimeout = setTimeout(function () {
        searchTerm = input.value.toLowerCase().trim();
        applyFilters();
      }, 300);
    });
  }

  catButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      catButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      activeCategory = this.dataset.category;
      applyFilters();
    });
  });

  costButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      costButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      activeCost = this.dataset.cost;
      applyFilters();
    });
  });

  applyFilters();
});
