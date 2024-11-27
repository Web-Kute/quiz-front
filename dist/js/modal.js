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

export async function showModal() {
  modal.classList.remove(CLASSNAMES['HIDDEN']);
  overlay.classList.remove(CLASSNAMES['HIDDEN']);
  localStorage.setItem('answers', JSON.stringify(studentAnswers));

  resultsFile = studentAnswers
    .map((quiz) => {
      return `${Object.values(quiz)}\u00a0`;
    })
    .join(', ');

  stopTimer();
}

export async function showModalStart() {
  modalStart.classList.remove(CLASSNAMES['HIDDEN']);
  overlayStart.classList.remove(CLASSNAMES['HIDDEN']);
}

export const closeModal = function () {
  modal.classList.add(CLASSNAMES['HIDDEN']);
  overlay.classList.add(CLASSNAMES['HIDDEN']);
};

export const closeModalStart = function () {
  modalStart.classList.add(CLASSNAMES['HIDDEN']);
  overlayStart.classList.add(CLASSNAMES['HIDDEN']);
};

if (modalBtnStart) {
  modalBtnStart.addEventListener('click', closeModalStart);
  modalBtnStart.addEventListener('click', timerQuiz);
  modalBtnStart.addEventListener('click', circularClock);
}

if (domElements.btnSaveFile) {
  domElements.btnSaveFile.addEventListener('click', () => {
    // download_file(`${student}.txt`, resultsFile);
    location.href = 'results.html';
  });
}
