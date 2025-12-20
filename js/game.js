const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// PLAYER
let player = {
  x: canvas.width / 2 - 30,
  y: canvas.height - 120,
  size: 60
};

// ENEMY
let enemy = {
  x: canvas.width / 2 - 30,
  y: 120,
  size: 60,
  alive: true
};

let bullets = [];

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawEnemy() {
  if (!enemy.alive) return;
  ctx.fillStyle = "brown";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach((b, i) => {
    b.y -= 12;
    ctx.fillRect(b.x, b.y, 6, 14);

    if (
      enemy.alive &&
      b.x > enemy.x &&
      b.x < enemy.x + enemy.size &&
      b.y < enemy.y + enemy.size
    ) {
      enemy.alive = false;
      bullets.splice(i, 1);
    }
  });
}

document.getElementById("shootBtn").addEventListener("click", () => {
  bullets.push({
    x: player.x + player.size / 2,
    y: player.y
  });
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemy();
  drawBullets();
  requestAnimationFrame(loop);
}
loop();
