// Create the canvas if it doesn't already exist
let canvas = document.getElementById("matrix");
if (!canvas) {
  canvas = document.createElement("canvas");
  canvas.id = "matrix";
  document.body.prepend(canvas); // ensure it sits behind everything
}

const ctx = canvas.getContext("2d");

// Layering + styling (kept simple; main layering in CSS)
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "0";
canvas.style.pointerEvents = "none";

// Initial size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Matrix effect
const letters = "01";
const drops = [];
const fontSize = 16;
const columns = canvas.width / fontSize;

// Initialize drops
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  // Slightly stronger fade makes background cleaner
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff66";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop or keep falling
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 50);

