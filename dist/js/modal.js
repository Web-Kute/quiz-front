export const modal = document.querySelector('.modal');
export const overlay = document.querySelector('.overlay');
export const closeModalBtn = document.querySelector('.btn-close');
const HIDDEN_CLASS = 'hidden';

export async function showModal() {
    modal.classList.remove(HIDDEN_CLASS);
    overlay.classList.remove(HIDDEN_CLASS);
}

export const closeModal = function () {
  modal?.classList.add(HIDDEN_CLASS);
  overlay?.classList.add(HIDDEN_CLASS);
};
