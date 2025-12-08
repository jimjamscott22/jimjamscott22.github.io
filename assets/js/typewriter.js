// Typewriter effect for JamieLab CRT Terminal
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("intro");
  if (!el) return;

  const text = el.getAttribute("data-text") || "";
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
