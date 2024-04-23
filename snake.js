const $canvas = document.querySelector("canvas");
const $vx = document.getElementById("vx");
const $vy = document.getElementById("vy");
const $dvd = document.getElementById("dvd");
const ctx = $canvas.getContext("2d");
$canvas.width = "500";
$canvas.height = "500";
$canvas.style.border = "1px solid white";

let playerPosition = { x: 0, y: 0 };
let playerAnchor = 80;
let playerHeight = 50;
let velocidadX = 3;
let velocidadY = 1.7;

function handleCollisions() {
  if (playerPosition.x + playerAnchor >= $canvas.width) {
    velocidadX *= -1;
  }
  if (playerPosition.y + playerHeight >= $canvas.height) {
    velocidadY *= -1;
  }
  if (playerPosition.x <= 0) {
    velocidadX *= -1;
  }
  if (playerPosition.y <= 0) {
    velocidadY *= -1;
  }
}

function dibujarPlayer() {
  ctx.drawImage(
    $dvd,
    playerPosition.x,
    playerPosition.y,
    playerAnchor,
    playerHeight
  );
}

function limpiar() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);
}
function actualizar() {
  playerPosition.x += velocidadX;
  playerPosition.y += velocidadY;
}
function dibujar() {
  limpiar();
  dibujarPlayer();
  handleCollisions();
}

function loop() {
  actualizar();
  dibujar();
  window.requestAnimationFrame(loop);
}

loop();

$vx.addEventListener("change", (event) => {
  if (velocidadX >= 0) {
    velocidadX = Number.parseFloat(event.target.value);
  } else {
    velocidadX = -Number.parseFloat(event.target.value);
  }
});

$vy.addEventListener("change", (event) => {
  if (velocidadY >= 0) {
    velocidadY = Number.parseFloat(event.target.value);
  } else {
    velocidadY = -Number.parseFloat(event.target.value);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  $vx.value = velocidadX;
  $vy.value = velocidadY;
});
