const world = document.getElementById("world");
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

/* WORLD POSITION (camera) */
let worldX = -1200;
let worldY = -2000;

/* MOVEMENT */
let moveX = 0;
let moveY = 0;
const speed = 6;

/* JOYSTICK CONTROL */
joystick.addEventListener("touchmove", (e) => {
  const rect = joystick.getBoundingClientRect();
  const touch = e.touches[0];

  let dx = touch.clientX - rect.left - 60;
  let dy = touch.clientY - rect.top - 60;

  dx = Math.max(-40, Math.min(40, dx));
  dy = Math.max(-40, Math.min(40, dy));

  stick.style.left = 35 + dx + "px";
  stick.style.top  = 35 + dy + "px";

  moveX = dx / 40;
  moveY = dy / 40;
});

joystick.addEventListener("touchend", () => {
  stick.style.left = "35px";
  stick.style.top  = "35px";
  moveX = moveY = 0;
});

/* GAME LOOP */
function gameLoop() {

  /* Camera illusion: world moves, player stays */
  worldX -= moveX * speed;
  worldY -= moveY * speed;

  world.style.transform = `translate(${worldX}px, ${worldY}px)`;

  requestAnimationFrame(gameLoop);
}

gameLoop();
