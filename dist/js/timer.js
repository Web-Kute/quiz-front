import { fetchData } from './utils.js';
import { results, timeOutAnswered } from './results.js';
import { showModal, closeModal, closeModalBtn, overlay } from './modal.js';
import { endpointQuiz } from './choice.js';

export let elapsedTime = 1000;
export let clockId = null;
let duration = 1000;
let initChrono = 1;
let minutes;
let seconds;
const HIDDEN_CLASS = 'hidden';

export async function timerQuiz() {
  const data = await fetchData(endpointQuiz);
  const startChrono = new Date(1980, 6, 31, 1, initChrono, 0).getTime();
  const endChrono = new Date(1980, 6, 31, 1).getTime();
  const buttons = document.querySelectorAll('.answer-item');

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
      results(timeOutAnswered);
      buttons.forEach((button) => {
        button.classList.add('disabled');
        button.disabled = true;
      });
      showModal();
      closeModalBtn.addEventListener('click', closeModal);
      overlay?.addEventListener('click', closeModal);
    }
  }, duration);
}
