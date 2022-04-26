import { ctx } from "../index";
import MovingItem from "./MovingItem";

const friction = 0.99;
class Particle extends MovingItem {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color, velocity);
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.alpha -= 0.01;
  }
}

export default Particle;
