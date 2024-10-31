import { domElements, CLASSNAMES } from './domelem.js';

export const modal = document.querySelector('.modal');
export const overlay = document.querySelector('.overlay');
export const closeModalBtn = document.querySelector('.btn-close');

export async function showModal() {
  modal.classList.remove(CLASSNAMES['HIDDEN']);
  overlay.classList.remove(CLASSNAMES['HIDDEN']);
}

export const closeModal = function () {
  modal.classList.add(CLASSNAMES['HIDDEN']);
  overlay.classList.add(CLASSNAMES['HIDDEN']);
};
