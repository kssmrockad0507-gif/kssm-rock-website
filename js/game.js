const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* PLAYER IMAGE */
const playerImg = new Image();
playerImg.src = "assets/images/player.png";

/* PLAYER OBJECT */
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 25,
  speed: 4
};

/* CONTROLS */
let keys = {};

window.addEventListener("keydown", e => {
  keys[e.key] = true;
});

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

/* GAME LOOP */
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movement
  if (keys["w"] || keys["ArrowUp"]) player.y -= player.speed;
  if (keys["s"] || keys["ArrowDown"]) player.y += player.speed;
  if (keys["a"] || keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["d"] || keys["ArrowRight"]) player.x += player.speed;

  // Draw player
  ctx.drawImage(
    playerImg,
    player.x - player.r,
    player.y - player.r,
    player.r * 2,
    player.r * 2
  );

  requestAnimationFrame(gameLoop);
}

gameLoop();
