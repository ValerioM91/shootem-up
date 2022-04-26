import MovingItem from "../classes/MovingItem";
import { canvas, center, projectiles } from "..";

export const shotProjectile = (event) => {
  const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x);
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };
  const projectile = new MovingItem(center.x, center.y, 5, "white", velocity);
  projectiles.push(projectile);
};

export const projectilesHandler = () => {
  projectiles.forEach((projectile, projectileIndex) => {
    if (
      projectile.x - projectile.radius < 0 ||
      projectile.x + projectile.radius > canvas.width ||
      projectile.y - projectile.radius < 0 ||
      projectile.y + projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1);
      }, 0);
    }
    projectile.update();
  });
};
