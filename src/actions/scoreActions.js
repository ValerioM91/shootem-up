import { score } from "..";

const scoreEl = document.getElementById("scoreEl");
const highest = document.getElementById("highest");

export const updateScore = (increase) => {
  score.current += increase;
  scoreEl.innerHTML = score.current;
};

export const updateHighest = () => {
  if (score.current > score.high) {
    score.high = score.current;
    highest.innerHTML = score.high;
    window.localStorage.setItem("high", score.high);
  }
};
