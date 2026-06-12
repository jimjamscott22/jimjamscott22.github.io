(function () {
  const bar = document.getElementById('tag-filter-bar');
  const list = document.getElementById('filtered-post-list');
  const status = document.getElementById('tag-filter-status');
  if (!bar || !list) return;

  const posts = Array.from(list.querySelectorAll('.post-item'));

  bar.addEventListener('click', function (e) {
    const btn = e.target.closest('.tag-filter-btn');
    if (!btn) return;

    const tag = btn.dataset.tag;

    bar.querySelectorAll('.tag-filter-btn').forEach(function (b) {
      b.classList.remove('tag-filter-active');
    });
    btn.classList.add('tag-filter-active');

    let visible = 0;
    posts.forEach(function (post) {
      if (tag === 'all') {
        post.hidden = false;
        visible++;
      } else {
        const tags = (post.dataset.tags || '').split(',').map(function (t) { return t.trim(); });
        const match = tags.includes(tag);
        post.hidden = !match;
        if (match) visible++;
      }
    });

    if (status) {
      status.textContent = tag === 'all'
        ? ''
        : 'showing ' + visible + ' post' + (visible !== 1 ? 's' : '') + ' tagged "' + btn.textContent.trim() + '"';
    }
  });
})();
