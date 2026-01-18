// assets/js/theme-switcher.js

(function () {
  const select = document.querySelector("[data-theme-select]");
  if (!select) {
    return;
  }

  const getOptionByValue = (value) =>
    select.querySelector(`option[value="${value}"]`);

  const swapTheme = (href) => {
    const current = document.getElementById("theme-stylesheet");
    if (!current || !href) {
      return;
    }

    const currentHref = current.getAttribute("href");
    if (currentHref === href) {
      return;
    }

    const pending = document.getElementById("theme-stylesheet-next");
    if (pending) {
      pending.remove();
    }

    const next = document.createElement("link");
    next.rel = "stylesheet";
    next.href = href;
    next.id = "theme-stylesheet-next";
    next.onload = () => {
      current.remove();
      next.id = "theme-stylesheet";
    };

    document.head.appendChild(next);
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    const savedOption = getOptionByValue(savedTheme);
    if (savedOption) {
      select.value = savedTheme;
      swapTheme(savedOption.dataset.themeHref);
    }
  }

  select.addEventListener("change", () => {
    const option = select.options[select.selectedIndex];
    if (!option) {
      return;
    }

    swapTheme(option.dataset.themeHref);
    localStorage.setItem("theme", option.value);
  });
})();
