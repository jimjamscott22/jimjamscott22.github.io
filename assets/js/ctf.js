document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('ctf-search');
  var grid = document.getElementById('ctf-grid');
  var cards = grid ? grid.querySelectorAll('.ctf-card') : [];
  var countDisplay = document.getElementById('ctf-count');
  var catButtons = document.querySelectorAll('.ctf-cat-btn');
  var diffButtons = document.querySelectorAll('.ctf-diff-btn');

  if (!grid || cards.length === 0) return;

  var activeCategory = 'all';
  var activeDifficulty = 'all';
  var searchTerm = '';

  function applyFilters() {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var catMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
      var diffMatch = activeDifficulty === 'all' || card.dataset.difficulty === activeDifficulty;
      var searchMatch = !searchTerm ||
        card.dataset.title.includes(searchTerm) ||
        card.dataset.event.includes(searchTerm) ||
        card.dataset.tags.includes(searchTerm);

      if (catMatch && diffMatch && searchMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countDisplay) {
      countDisplay.textContent = 'Showing ' + visibleCount + ' of ' + cards.length + ' write-ups';
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

  diffButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      diffButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      activeDifficulty = this.dataset.difficulty;
      applyFilters();
    });
  });

  applyFilters();
});
