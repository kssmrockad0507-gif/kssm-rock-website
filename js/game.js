const world = document.getElementById("world");
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");
const shootBtn = document.getElementById("shoot");

/* CAMERA (WORLD POSITION) */
let worldX = -1200;
let worldY = -2000;

/* MOVEMENT */
let moveX = 0;
let moveY = 0;
const speed = 6;

/* BULLETS + ENEMY */
let bullets = [];
let enemy = null;

/* CREATE ENEMY (in front of player) */
function spawnEnemy() {
  enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.position = "absolute";
  enemy.style.width = "50px";
  enemy.style.height = "70px";
  enemy.style.background = "red";
  enemy.style.left = "1500px";
  enemy.style.top = "1200px";
  world.appendChild(enemy);
}
spawnEnemy();

/* JOYSTICK */
joystick.addEventListener("touchmove", (e) => {
  const rect = joystick.getBoundingClientRect();
  const t = e.touches[0];

  let dx = t.clientX - rect.left - 60;
  let dy = t.clientY - rect.top - 60;

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

/* SHOOT */
shootBtn.addEventListener("touchstart", () => {
  const bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.position = "absolute";
  bullet.style.width = "10px";
  bullet.style.height = "10px";
  bullet.style.background = "yellow";
  bullet.style.borderRadius = "50%";

  /* Bullet spawn – player forward */
  const bx = 1500;
  const by = 1350;
  bullet.style.left = bx + "px";
  bullet.style.top  = by + "px";

  world.appendChild(bullet);
  bullets.push({ el: bullet, y: by });
});

/* GAME LOOP */
function gameLoop() {

  /* CAMERA MOVE */
  worldX -= moveX * speed;
  worldY -= moveY * speed;
  world.style.transform = `translate(${worldX}px, ${worldY}px)`;

  /* BULLET MOVE (forward) */
  bullets.forEach((b, i) => {
    b.y -= 15;
    b.el.style.top = b.y + "px";

    /* HIT ENEMY */
    if (enemy) {
      const br = b.el.getBoundingClientRect();
      const er = enemy.getBoundingClientRect();

      if (!(br.right < er.left || br.left > er.right ||
            br.bottom < er.top || br.top > er.bottom)) {

        enemy.remove();
        enemy = null;
        b.el.remove();
        bullets.splice(i, 1);
      }
    }

    /* REMOVE BULLET */
    if (b.y < 0) {
      b.el.remove();
      bullets.splice(i, 1);
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();
