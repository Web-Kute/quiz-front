import { fetchData, disabledAllButtons } from './utils.js';
import { showModal } from './modal.js';
import { displayResults, endpointQuiz, setGameOver } from './choice.js';
export let elapsedTime = 1000;
export let clockId = null;
export let remainingTime = 0;
export let elapsedTimeAfterBegin = 0;
export let timeDisplay;

let initChrono = 2;
let minutes;
let seconds;

/**
 * Stops the currently running timer by clearing the interval
 * @returns {boolean} True if timer was stopped successfully
 */
export function stopTimer() {
  if (clockId !== null) {
    clearInterval(clockId);
    clockId = null;
  }
  return true;
}

export async function timerQuiz() {
  try {
    const data = await fetchData(endpointQuiz);
    const TIMER_UPDATE_INTERVAL = 1000;
    const BASE_DATE = new Date(1980, 6, 31);
    const startChrono = new Date(
      BASE_DATE.getFullYear(),
      BASE_DATE.getMonth(),
      BASE_DATE.getDate(),
      1,
      initChrono,
      0,
    ).getTime();
    const endChrono = new Date(
      BASE_DATE.getFullYear(),
      BASE_DATE.getMonth(),
      BASE_DATE.getDate(),
      1,
    ).getTime();
    const buttons = document.querySelectorAll('.answer-item');
    const timerClock = document.querySelector('.timer');

    elapsedTime = startChrono - endChrono;
    clockId = setInterval(() => {
      elapsedTime -= TIMER_UPDATE_INTERVAL;

      minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, '0');

      remainingTime = Math.floor(elapsedTime / 1000);
      elapsedTimeAfterBegin = initChrono * 60 - remainingTime;
      timeDisplay = `en ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      if (timerClock) {
        timerClock.innerHTML = `${minutes} : ${seconds}`;
      }

      if (elapsedTime === 0) {
        stopTimer();
        setGameOver(true); // Using a setter function instead of direct assignment
        displayResults();
        timerClock.classList.add('over');
        disabledAllButtons(buttons);
        showModal();
      }
    }, TIMER_UPDATE_INTERVAL);
  } catch (error) {
    console.error('Timer initialization failed:', error);
  }
  // Handle error gracefully}
}
