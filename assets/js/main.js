// assets/js/main.js

(function () {
  const navPanel = document.querySelector(".nav-panel");
  const navToggle = document.querySelector(".nav-toggle");

  if (navPanel && navToggle) {
    navToggle.addEventListener("click", () => {
      navPanel.classList.toggle("nav-collapsed");
    });
  }

  // Reserved for future enhancements:
  // - typewriter intro on homepage
  // - hover glitch on console panels
  // - tiny network-status easter eggs
})();
<<<<<<< HEAD
=======

>>>>>>> 1ce681173520b299c57b7e6f7bc3cad285534561
