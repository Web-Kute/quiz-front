import { domElements } from './domelem.js';

export function showBurgerMenu() {
  domElements.mainMenu.classList.toggle('show');
}

const closeOutside = (e) => {
  if (e.target.id !== 'burger-menu' && e.target.id !== 'main-menu' && e.target.className !== 'main-menu-list') {
    domElements.mainMenu.classList.add('hide');
    domElements.mainMenu.classList.remove('show');
  }
};



document.addEventListener('click', closeOutside);
domElements.burgerMenuBtn.addEventListener('click', showBurgerMenu);
