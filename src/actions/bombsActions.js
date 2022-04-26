import { enemies } from "..";
import { createParticles } from "./particlesActions";
import { updateScore } from "./scoreActions";

const bombSvg = `
<svg
class="bomb"
stroke="currentColor"
fill="currentColor"
stroke-width="0"
viewBox="0 0 24 24"
height="1em"
width="1em"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M21 3.001c-1.4 0-2.584 1.167-2.707 1.293L17.207 5.38l-1.091-1.088a.999.999 0 0 0-1.413.001L13.46 5.537A8.353 8.353 0 0 0 10.5 5C5.813 5 2 8.813 2 13.5S5.813 22 10.5 22s8.5-3.813 8.5-8.5c0-.909-.144-1.8-.428-2.658l1.345-1.345a1.002 1.002 0 0 0-.001-1.415l-1.293-1.29 1.088-1.088c.229-.229.845-.703 1.289-.703h1v-2h-1zm-4.511 7.978c.339.804.511 1.652.511 2.521 0 3.584-2.916 6.5-6.5 6.5S4 17.084 4 13.5 6.916 7 10.5 7c.96 0 1.89.21 2.762.624.381.181.837.103 1.136-.196l1.014-1.014 2.384 2.377-1.092 1.092a.998.998 0 0 0-.215 1.096z"
></path>
<path
  d="M6 13.5a4.47 4.47 0 0 0 1.318 3.182l1.414-1.414C8.26 14.795 8 14.168 8 13.5s.26-1.295.732-1.768A2.484 2.484 0 0 1 10.5 11V9a4.469 4.469 0 0 0-3.182 1.318A4.47 4.47 0 0 0 6 13.5z"
></path>
</svg>`;

const bombsContainer = document.querySelector(".bombs");

export const explodeAll = () => {
  if (document.querySelectorAll(".bomb").length === 0) return;
  const bomb = document.querySelector(".bomb");
  bomb && bomb.remove();

  enemies.forEach((enemy) => {
    createParticles(enemy, enemy);
    setTimeout(() => {
      updateScore(150 * enemies.length);
      enemies.splice(0, enemies.length);
    });
  });
};

export const restoreBombs = () => {
  bombsContainer.innerHTML = bombSvg + bombSvg + bombSvg;
};
