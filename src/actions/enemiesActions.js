import gsap from "gsap";
import MovingItem from "../classes/MovingItem";
import { center, player, enemies, projectiles, endGame } from "..";
import { createParticles } from "./particlesActions";
import { updateScore } from "./scoreActions";

export const spawnEnemies = (difficulty) => {
  const spawnTime =
    difficulty === "hard" ? 1000 : difficulty === "easy" ? 1500 : 1200;

  return setInterval(() => {
    const radius = Math.random() * 24 + 6;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const color = `hsl(${Math.random() * 360},50%,50%)`;
    const angle = Math.atan2(center.y - y, center.x - x);
    const speed =
      difficulty === "hard"
        ? ((Math.random() + 1) * (86 - radius)) / 80
        : difficulty === "easy"
        ? ((Math.random() * 0.5 + 0.5) * (66 - radius)) / 60
        : ((Math.random() * 0.5 + 0.75) * (66 - radius)) / 60;

    const velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    const enemy = new MovingItem(x, y, radius, color, velocity);
    enemies.push(enemy);
  }, spawnTime);
};

export const enemiesHandler = (difficulty) => {
  const multiplier =
    difficulty === "hard" ? 1.2 : difficulty === "easy" ? 0.8 : 1;
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();

    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    if (distance - enemy.radius - player.radius < 0) {
      endGame();
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );
      if (distance - projectile.radius - enemy.radius < 1) {
        createParticles(projectile, enemy);
        if (enemy.radius - 10 > 5) {
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });

          setTimeout(() => {
            updateScore(100 * multiplier);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            updateScore(250 * multiplier);
            enemies.splice(enemyIndex, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
};
