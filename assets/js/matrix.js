(function () {
  if (typeof window === "undefined") return;

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If the user prefers reduced motion, skip the animation entirely.
  if (prefersReducedMotion) return;

  const init = () => {
    // Create the canvas if it doesn't already exist
    let canvas = document.getElementById("matrix");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "matrix";
      document.body.prepend(canvas); // ensure it sits behind everything
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Layering + styling (kept simple; main layering in CSS)
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";

    // Matrix effect
    const letters = "01";
    const fontSize = 16;
    const frameIntervalMs = 50; // ~20fps (keeps CPU lower than full rAF)

    let drops = [];
    let columns = 0;
    let rafId = null;
    let isRunning = false;
    let lastFrameTs = 0;
    let resizeTimer = null;

    const resize = () => {
      // Keep coordinates in CSS pixels; clamp DPR to avoid extreme GPU/CPU cost.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(w / fontSize);
      drops = new Array(columns).fill(1);
    };

    const draw = () => {
      // Slightly stronger fade makes background cleaner
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop or keep falling
        if (drops[i] * fontSize > window.innerHeight || Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const tick = (ts) => {
      if (!isRunning) return;
      if (ts - lastFrameTs >= frameIntervalMs) {
        lastFrameTs = ts;
        draw();
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (isRunning) return;
      isRunning = true;
      lastFrameTs = 0;
      rafId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!isRunning) return;
      isRunning = false;
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = null;
    };

    window.addEventListener("resize", () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else {
        resize();
        start();
      }
    });

    resize();
    if (!document.hidden) start();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

