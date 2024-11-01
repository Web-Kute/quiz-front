import { fetchData } from './utils.js';
import { results } from './results.js';
import { showModal } from './modal.js';
import { displayResults, endpointQuiz, totalQuestions } from './choice.js';

export let elapsedTime = 1000;
export let clockId = null;
let duration = 1000;
let initChrono = 2;
let minutes;
let seconds;

export async function timerQuiz() {
  const data = await fetchData(endpointQuiz);
  const startChrono = new Date(1980, 6, 31, 1, initChrono, 0).getTime();
  const endChrono = new Date(1980, 6, 31, 1).getTime();
  const buttons = document.querySelectorAll('.answer-item');
  const timerClock = document.querySelector('.timer');
  elapsedTime = startChrono - endChrono;
  let clockId = setInterval(() => {
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
      displayResults();
      timerClock.classList.add('over');
      buttons.forEach((button) => {
        button.classList.add('disabled');
        button.disabled = true;
      });
      showModal();
    }
  }, duration);
}
