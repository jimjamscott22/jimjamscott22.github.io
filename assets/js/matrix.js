(function () {
  if (typeof window === 'undefined') return;

  const STORAGE_KEY = 'matrix-rain-enabled';
  var canvas, ctx, drops, columns, rafId, isRunning, lastFrameTs, resizeTimer;
  var fontSize = 14;
  var frameIntervalMs = 60;
  var letters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.ceil(w / fontSize);
    drops = new Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.07)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = 'rgba(0,255,102,0.75)';
    ctx.font = fontSize + 'px monospace';
    for (var i = 0; i < drops.length; i++) {
      var ch = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > window.innerHeight || Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function tick(ts) {
    if (!isRunning) return;
    if (ts - lastFrameTs >= frameIntervalMs) {
      lastFrameTs = ts;
      draw();
    }
    rafId = window.requestAnimationFrame(tick);
  }

  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    lastFrameTs = 0;
    rafId = window.requestAnimationFrame(tick);
  }

  function stopAnimation() {
    if (!isRunning) return;
    isRunning = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  function enable() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'matrix-canvas';
      canvas.style.cssText = [
        'position:fixed', 'top:0', 'left:0', 'width:100%', 'height:100%',
        'z-index:0', 'pointer-events:none', 'opacity:0.18'
      ].join(';');
      document.body.prepend(canvas);
      ctx = canvas.getContext('2d');

      window.addEventListener('resize', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 120);
      });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAnimation(); else startAnimation();
      });
    }
    canvas.style.display = '';
    resize();
    if (!document.hidden) startAnimation();
    localStorage.setItem(STORAGE_KEY, '1');
    updateBtn(true);
  }

  function disable() {
    stopAnimation();
    if (canvas) canvas.style.display = 'none';
    localStorage.setItem(STORAGE_KEY, '0');
    updateBtn(false);
  }

  function toggle() {
    if (isRunning) disable(); else enable();
  }

  function updateBtn(on) {
    var btn = document.getElementById('matrix-toggle-btn');
    if (!btn) return;
    btn.textContent = on ? '[rain: on]' : '[rain: off]';
    btn.setAttribute('aria-pressed', String(on));
  }

  window.matrixRain = { enable: enable, disable: disable, toggle: toggle };

  function init() {
    var btn = document.getElementById('matrix-toggle-btn');
    if (btn) btn.addEventListener('click', toggle);

    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === '1') enable();
    else updateBtn(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
