// assets/js/loader.js
// Terminal-style loading states: page transitions + inline async spinners.
// Exposes window.TermLoader. Safe to call before/without it (callers feature-check).

(function () {
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const FRAMES = ["|", "/", "-", "\\"];
  const FRAME_MS = 90;
  const BAR_WIDTH = 16;

  const pad = (n) => String(n).padStart(2, "0");

  // ---------------------------------------------------------------
  // Inline spinner:  "> label... |"  →  "[ OK ] done"  /  "[FAIL] why"
  // ---------------------------------------------------------------
  function inline(el, label) {
    if (!el) return { update() {}, done() {}, fail() {}, stop() {} };

    let i = 0;
    let text = label || "loading";
    let timer = null;
    let clearTimer = null;

    el.classList.remove("term-status-ok", "term-status-fail");
    el.classList.add("term-status", "term-status-busy");

    const paint = () => {
      el.textContent = `> ${text}... ${reduceMotion ? "" : FRAMES[i % FRAMES.length]}`.trimEnd();
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
      el.classList.remove("term-status-busy");
    };

    const finish = (cls, prefix, msg, holdMs) => {
      stop();
      el.classList.add(cls);
      el.textContent = `${prefix} ${msg}`;
      if (holdMs) {
        clearTimer = setTimeout(() => {
          el.textContent = "";
          el.classList.remove(cls);
        }, holdMs);
      }
    };

    paint();
    if (!reduceMotion) {
      timer = setInterval(() => {
        i++;
        paint();
      }, FRAME_MS);
    }

    return {
      update(next) {
        text = next;
        paint();
      },
      done(msg, holdMs) {
        finish("term-status-ok", "[ OK ]", msg || "done", holdMs === undefined ? 2500 : holdMs);
      },
      fail(msg, holdMs) {
        finish("term-status-fail", "[FAIL]", msg || "failed", holdMs === undefined ? 5000 : holdMs);
      },
      stop() {
        stop();
        if (clearTimer) clearTimeout(clearTimer);
        el.textContent = "";
      },
    };
  }

  // Low-level: call cb(frame) every tick (once, statically, under reduced motion).
  // Returns a stop() function. For callers that own their element's styling.
  function ticker(cb) {
    let i = 0;
    cb(reduceMotion ? "..." : FRAMES[0]);
    if (reduceMotion) return () => {};
    const t = setInterval(() => cb(FRAMES[++i % FRAMES.length]), FRAME_MS);
    return () => clearInterval(t);
  }

  // Run a promise (or fn returning one) under an inline spinner.
  // minMs keeps the spinner up long enough to be perceptible for instant work.
  async function wrap(el, work, opts) {
    const o = opts || {};
    const handle = inline(el, o.label || "working");
    const minMs = reduceMotion ? 0 : o.minMs || 0;
    const started = Date.now();
    try {
      const result = await (typeof work === "function" ? work() : work);
      const wait = minMs - (Date.now() - started);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      handle.done(typeof o.doneLabel === "function" ? o.doneLabel(result) : o.doneLabel);
      return result;
    } catch (err) {
      handle.fail(typeof o.failLabel === "function" ? o.failLabel(err) : o.failLabel || (err && err.message));
      throw err;
    }
  }

  // ---------------------------------------------------------------
  // Page-transition bar:  "> loading /projects/ [####........] 38%"
  // ---------------------------------------------------------------
  let bar = null;
  let barTimer = null;
  let progress = 0;
  let barGuard = null;

  function ensureBar() {
    if (bar) return bar;
    bar = document.createElement("div");
    bar.className = "term-loader-bar";
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");
    bar.hidden = true;
    document.body.appendChild(bar);
    return bar;
  }

  function renderBar(path) {
    const filled = Math.round((progress / 100) * BAR_WIDTH);
    const meter = "#".repeat(filled) + ".".repeat(BAR_WIDTH - filled);
    ensureBar().textContent = `> loading ${path} [${meter}] ${pad(Math.round(progress))}%`;
  }

  function showPageLoader(path) {
    const el = ensureBar();
    progress = 4;
    renderBar(path);
    el.hidden = false;
    el.classList.add("is-visible");
    if (barTimer) clearInterval(barTimer);
    // Safety net: a cancelled navigation (Esc, blocked, download) must not leave the bar up.
    clearTimeout(barGuard);
    barGuard = setTimeout(hidePageLoader, 15000);
    if (reduceMotion) {
      progress = 50;
      renderBar(path);
      return;
    }
    // Ease toward 90% and wait there; the new document replaces this one on arrival.
    barTimer = setInterval(() => {
      progress += (90 - progress) * 0.12;
      renderBar(path);
    }, 80);
  }

  function hidePageLoader() {
    clearTimeout(barGuard);
    if (barTimer) clearInterval(barTimer);
    barTimer = null;
    if (!bar) return;
    bar.classList.remove("is-visible");
    bar.hidden = true;
  }

  function isInternalNavigation(a, event) {
    if (event.defaultPrevented) return false;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    if (!a || !a.href) return false;
    if (a.target && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    if (a.origin !== window.location.origin) return false;
    // Same-page anchors / in-page jumps don't load anything.
    if (a.pathname === window.location.pathname && a.search === window.location.search) return false;
    // Skip direct file links (PDFs, images, etc.) — only show for page-like paths.
    const last = a.pathname.split("/").pop();
    if (last && /\.[a-z0-9]+$/i.test(last) && !/\.html?$/i.test(last)) return false;
    return true;
  }

  document.addEventListener("click", (event) => {
    const a = event.target instanceof Element ? event.target.closest("a") : null;
    if (isInternalNavigation(a, event)) showPageLoader(a.pathname);
  });

  // Back/forward cache restores the old DOM with the bar still showing.
  window.addEventListener("pageshow", hidePageLoader);
  // Navigation cancelled (e.g. Esc during load) — don't leave the bar stuck.
  window.addEventListener("pagehide", () => {
    if (barTimer) clearInterval(barTimer);
  });

  window.TermLoader = {
    inline,
    ticker,
    wrap,
    showPageLoader,
    hidePageLoader,
    reduceMotion,
  };
})();
