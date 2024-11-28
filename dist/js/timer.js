import { fetchData, disabledAllButtons } from './utils.js';
import { showModal } from './modal.js';
import { displayResults, endpointQuiz, setGameOver } from './choice.js';
export let elapsedTime = 1000;
export let clockId = null;
let duration = 1000;
let initChrono = 2;
let minutes;
let seconds;

export function stopTimer() {
  clearInterval(clockId);
}

export async function timerQuiz() {
  const data = await fetchData(endpointQuiz);
  const startChrono = new Date(1980, 6, 31, 1, initChrono, 0).getTime();
  const endChrono = new Date(1980, 6, 31, 1).getTime();
  const buttons = document.querySelectorAll('.answer-item');
  const timerClock = document.querySelector('.timer');

  elapsedTime = startChrono - endChrono;
  clockId = setInterval(() => {
    elapsedTime -= 1000;

    minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));

    seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    if (timerClock) {
      timerClock.innerHTML = `${minutes} : ${seconds}`;
    }

    if (elapsedTime === 0) {
      clearInterval(clockId);
      setGameOver(true); // Using a setter function instead of direct assignment
      displayResults();
      timerClock.classList.add('over');
      disabledAllButtons(buttons);
      showModal();
    }
  }, duration);
}
