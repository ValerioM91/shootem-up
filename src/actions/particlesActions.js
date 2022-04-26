import { particles } from "..";
import Particle from "../classes/Particle";

export const createParticles = (projectile, enemy) => {
  for (let i = 0; i < enemy.radius * 2; i++) {
    particles.push(
      new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
        x: (Math.random() - 0.5) * Math.random() * 4,
        y: (Math.random() - 0.5) * Math.random() * 4,
      })
    );
  }
};

export const particlesHandler = () => {
  particles.forEach((particle, index) => {
    if (particle.alpha < 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });
};
