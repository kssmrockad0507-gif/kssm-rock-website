const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// PLAYER
let player = {
  x: canvas.width / 2,
  y: canvas.height - 150,
  size: 60,
  speed: 5
};

// ENEMY
let enemy = {
  x: canvas.width / 2,
  y: 150,
  size: 60,
  alive: true
};

// BULLETS
let bullets = [];

// DRAW PLAYER
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

// DRAW ENEMY
function drawEnemy() {
  if (!enemy.alive) return;
  ctx.fillStyle = "brown";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
}

// BULLET LOGIC
function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach((b, i) => {
    b.y -= 10;
    ctx.fillRect(b.x, b.y, 8, 15);

    // HIT DETECTION
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

// SHOOT BUTTON
document.getElementById("shootBtn").addEventListener("click", () => {
  bullets.push({
    x: player.x + player.size / 2,
    y: player.y
  });
});

// GAME LOOP
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemy();
  drawBullets();
  requestAnimationFrame(gameLoop);
}

gameLoop();
