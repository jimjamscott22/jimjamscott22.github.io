// Typewriter effect for JamieLab CRT Terminal
// Runs once per page load (no looping). Targets:
//   1. Any element with id="intro" (uses data-text attribute)
//   2. The first <h1> inside .terminal-body on every page
document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeInto(el, text, speed) {
    if (!el || !text) return;

    if (prefersReducedMotion) {
      el.textContent = text;
      return;
    }

    el.textContent = "";
    el.classList.add("typewriter-active");

    let i = 0;
    (function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(step, speed);
      } else {
        el.classList.remove("typewriter-active");
        el.classList.add("typewriter-done");
      }
    })();
  }

  // 1. Legacy #intro support
  const intro = document.getElementById("intro");
  if (intro) {
    typeInto(intro, intro.getAttribute("data-text") || "", 40);
  }

  // 2. First <h1> inside the terminal body on every page
  const heading = document.querySelector(".terminal-body h1");
  if (heading && !heading.dataset.typewriterSkip) {
    const text = heading.textContent.trim();
    // Reserve space so the page doesn't reflow while typing
    heading.style.minHeight = heading.offsetHeight + "px";
    typeInto(heading, text, 35);
  }
});
