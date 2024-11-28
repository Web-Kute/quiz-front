import { domElements, CLASSNAMES } from './domelem.js';
import { timerQuiz, stopTimer } from './timer.js';
import { circularClock } from './utils.js';
import { studentAnswers, student } from './choice.js';
import { download_file } from './filesaver.js';

export const modal = document.querySelector('.modal');
export const overlay = document.querySelector('.overlay');
export const modalStart = document.querySelector('.modal-start');
export const overlayStart = document.querySelector('.overlay-start');
export const modalBtnStart = document.querySelector('.btn-modal-start');
export const closeModalBtn = document.querySelector('.btn-close');

let resultsFile;

const { btnSaveFile } = domElements;
const { HIDDEN } = CLASSNAMES;

export async function showModal() {
  modal.classList.remove(HIDDEN);
  overlay.classList.remove(HIDDEN);
  localStorage.setItem('answers', JSON.stringify(studentAnswers));

  resultsFile = studentAnswers
    .map((quiz) => {
      return `${Object.values(quiz)}\u00a0`;
    })
    .join(', ');

  stopTimer();
}

export async function showModalStart() {
  modalStart.classList.remove(HIDDEN);
  overlayStart.classList.remove(HIDDEN);
}

export const closeModal = function () {
  modal.classList.add(HIDDEN);
  overlay.classList.add(HIDDEN);
};

export const closeModalStart = function () {
  modalStart.classList.add(HIDDEN);
  overlayStart.classList.add(HIDDEN);
};

if (modalBtnStart) {
  modalBtnStart.addEventListener('click', closeModalStart);
  modalBtnStart.addEventListener('click', timerQuiz);
  modalBtnStart.addEventListener('click', circularClock);
}

if (btnSaveFile) {
  btnSaveFile.addEventListener('click', () => {
    // download_file(`${student}.txt`, resultsFile);
    location.href = 'results.html';
  });
}
