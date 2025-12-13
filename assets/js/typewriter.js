// Typewriter effect for JamieLab CRT Terminal
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("intro");
  if (!el) return;

  const text = el.getAttribute("data-text") || "";

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Respect reduced-motion: show text immediately (no timers).
  if (prefersReducedMotion) {
    el.textContent = text;
    return;
  }

  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40); // speed
    }
  }

  type();
});
