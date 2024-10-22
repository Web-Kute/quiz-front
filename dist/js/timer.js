import { fetchData } from './utils.js';
import { showModal } from './modal.js';
import { endpointQuiz } from './choice.js';
import { results, answered } from './results.js';

export let elapsedTime = 1000;
let duration = 1000;
let initChrono = 1;
let minutes;
let seconds;
export let clockId = null;
const HIDDEN_CLASS = 'hidden';

export async function timerQuiz() {
  const data = await fetchData(endpointQuiz);

  const startChrono = new Date(1980, 6, 31, 1, initChrono, 0).getTime();
  const endChrono = new Date(1980, 6, 31, 1).getTime();

  elapsedTime = startChrono - endChrono;
  let clockId = setInterval(() => {
    elapsedTime -= 1000;

    minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));

    seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    document.querySelector('.timer').innerHTML = `${minutes} : ${seconds}`;

    if (elapsedTime === 0) {
      clearInterval(clockId);
      results(10);
      showModal();
    }
  }, duration);
}
