const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const drops = [];
for (let i = 0; i < canvas.width / 12; i++) drops[i] = 1;

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff66";
  ctx.font = "15px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * 12, drops[i] * 20);

    if (drops[i] * 20 > canvas.height || Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(draw, 50);
