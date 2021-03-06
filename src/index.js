import Player from "./classes/Player";
import { spawnEnemies, enemiesHandler } from "./actions/enemiesActions";
import {
  shotProjectile,
  projectilesHandler,
} from "./actions/projectilesActions";
import { particlesHandler } from "./actions/particlesActions";
import { updateHighest, updateScore } from "./actions/scoreActions";
import { restoreBombs, explodeAll } from "./actions/bombsActions";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

export const center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

export const player = new Player(center.x, center.y, 20, "white");
export let projectiles = [];
export let enemies = [];
export let particles = [];
export let animationId;
export const score = { current: 0, high: 0 };

let difficulty = "normal";
document.querySelectorAll('input[type="radio"]').forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      difficulty = input.value;
    }
  });
});

const animate = () => {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectilesHandler();
  enemiesHandler(difficulty);
  particlesHandler();
};

const modal = document.querySelector(".modal");
const finalScore = document.querySelector(".finalScore");
const startGameButton = document.getElementById("startGameButton");

let spawnEnemiesInterval;

let stopGame = false;

const startGame = () => {
  projectiles = [];
  enemies = [];
  particles = [];
  updateScore(-score.current);
  player.alpha = 1;
  canvas.addEventListener("click", shotProjectile);
  document.addEventListener("keydown", explodeAll);
  document.addEventListener("touchstart", explodeAll);
  stopGame = false;
  restoreBombs();
  animate();
  spawnEnemiesInterval = spawnEnemies(difficulty);
  modal.style.display = "none";
};

export const endGame = () => {
  if (stopGame) return;
  clearInterval(spawnEnemiesInterval);
  canvas.removeEventListener("click", shotProjectile);
  document.removeEventListener("keydown", explodeAll);
  document.removeEventListener("touchstart", explodeAll);
  setTimeout(() => {
    cancelAnimationFrame(animationId);
    finalScore.innerHTML = score.current;
    updateHighest();
    modal.style.display = "flex";
  }, 1500);
  stopGame = true;
};

startGameButton.addEventListener("click", startGame);

const high = window.localStorage.getItem("high");

if (high) {
  score.high = high;
  document.getElementById("highest").innerHTML = score.high;
}
