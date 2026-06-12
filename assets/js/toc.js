(function () {
  const body = document.querySelector('.post-body');
  if (!body) return;

  const headings = Array.from(body.querySelectorAll('h2, h3'));
  if (headings.length < 3) return; // only show TOC for posts with 3+ headings

  // Ensure each heading has an id for anchor links
  headings.forEach(function (h) {
    if (!h.id) {
      h.id = h.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }
  });

  // Build TOC markup
  const nav = document.createElement('nav');
  nav.id = 'toc';
  nav.setAttribute('aria-label', 'Table of contents');

  const header = document.createElement('div');
  header.className = 'toc-header';

  const title = document.createElement('span');
  title.className = 'toc-title';
  title.textContent = '// contents';

  const toggle = document.createElement('button');
  toggle.className = 'toc-toggle';
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-controls', 'toc-list');
  toggle.textContent = '[−]';

  header.appendChild(title);
  header.appendChild(toggle);
  nav.appendChild(header);

  const list = document.createElement('ol');
  list.id = 'toc-list';
  list.className = 'toc-list';

  headings.forEach(function (h) {
    const li = document.createElement('li');
    li.className = 'toc-item toc-' + h.tagName.toLowerCase();

    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    a.className = 'toc-link';

    li.appendChild(a);
    list.appendChild(li);
  });

  nav.appendChild(list);

  // Insert TOC before post body content
  body.parentNode.insertBefore(nav, body);

  // Collapse toggle
  toggle.addEventListener('click', function () {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.textContent = expanded ? '[+]' : '[−]';
    list.hidden = expanded;
  });

  // Highlight active heading on scroll
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const id = entry.target.id;
        const link = list.querySelector('a[href="#' + id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          list.querySelectorAll('.toc-link').forEach(function (l) {
            l.classList.remove('toc-active');
          });
          link.classList.add('toc-active');
        }
      });
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 }
  );

  headings.forEach(function (h) { observer.observe(h); });
})();
