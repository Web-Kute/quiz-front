const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');
const closeModalBtn = document.querySelector('.btn-close');

const HIDDEN_CLASS = 'hidden';
const ESCAPE_KEY = 'Escape';

if (!modal) {
  console.error('Modal element not found');
  // Handle the error appropriately
}

const openModal = function () {
  modal?.classList.remove(HIDDEN_CLASS);
  overlay?.classList.remove(HIDDEN_CLASS);
};
openModalBtn?.addEventListener('click', openModal);

const closeModal = function () {
  modal?.classList.add(HIDDEN_CLASS);
  overlay?.classList.add(HIDDEN_CLASS);
};

closeModalBtn?.addEventListener('click', closeModal);

// Close the modal outside
overlay?.addEventListener('click', closeModal);
// Close the Modal on Key Press
document.addEventListener('keydown', function (e) {
  if (e.key === ESCAPE_KEY && modal && !modal.classList.contains(HIDDEN_CLASS)) {
    closeModal();
  }
});
