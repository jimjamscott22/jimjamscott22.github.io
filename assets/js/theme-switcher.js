// assets/js/theme-switcher.js

(function () {
  const select = document.querySelector("[data-theme-select]");
  const modeToggle = document.getElementById("mode-toggle");
  const modeIcon = document.getElementById("mode-icon");
  const modeText = document.getElementById("mode-text");
  
  if (!select) {
    return;
  }

  // Define dark and light themes
  const LIGHT_THEME = "light";
  const DEFAULT_DARK_THEME = "soft-matrix"; // Default dark theme for toggle
  
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

  const updateModeToggleUI = (currentTheme) => {
    if (modeIcon && modeText) {
      if (currentTheme === LIGHT_THEME) {
        modeIcon.textContent = "🌙";
        modeText.textContent = "Dark Mode";
      } else {
        modeIcon.textContent = "☀️";
        modeText.textContent = "Light Mode";
      }
    }
  };

  // Load saved theme or use default
  const savedTheme = localStorage.getItem("theme") || DEFAULT_DARK_THEME;
  const savedOption = getOptionByValue(savedTheme);
  if (savedOption) {
    select.value = savedTheme;
    swapTheme(savedOption.dataset.themeHref);
    updateModeToggleUI(savedTheme);
  }

  // Theme selector change handler
  select.addEventListener("change", () => {
    const option = select.options[select.selectedIndex];
    if (!option) {
      return;
    }

    swapTheme(option.dataset.themeHref);
    localStorage.setItem("theme", option.value);
    updateModeToggleUI(option.value);
  });

  // Dark/Light mode toggle handler
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      const currentTheme = select.value;
      let newTheme;

      if (currentTheme === LIGHT_THEME) {
        // Switch to last used dark theme or default
        newTheme = localStorage.getItem("lastDarkTheme") || DEFAULT_DARK_THEME;
      } else {
        // Switch to light mode and save current dark theme
        localStorage.setItem("lastDarkTheme", currentTheme);
        newTheme = LIGHT_THEME;
      }

      const newOption = getOptionByValue(newTheme);
      if (newOption) {
        select.value = newTheme;
        swapTheme(newOption.dataset.themeHref);
        localStorage.setItem("theme", newTheme);
        updateModeToggleUI(newTheme);
      }
    });
  }
})();
