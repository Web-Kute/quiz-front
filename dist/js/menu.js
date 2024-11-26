import { domElements } from './domelem.js';
import { clearSessionStorage } from './utils.js';

export function showBurgerMenu() {
  domElements.mainMenu.classList.toggle('show');
}

export const mainMenuHtml = `<ul>
          <li class="main-menu-list quiz-list"><a href="choose.html">Liste Quiz</a></li>
          <li class="main-menu-list show-result"><a href="results.html">Résultats</a></li>
          <li class="main-menu-list logout-btn"><a href="#" id="logout">Se déconnecter</a></li>
        </ul>`;

const closeOutside = (e) => {
  if (
    e.target.id !== 'burger-menu' &&
    e.target.id !== 'main-menu' &&
    e.target.className !== 'main-menu-list'
  ) {
    if (domElements.mainMenu) {
      domElements.mainMenu.classList.add('hide');
      domElements.mainMenu.classList.remove('show');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (domElements.mainMenu) {
    domElements.mainMenu.innerHTML = mainMenuHtml;
  }
  const logout = document.getElementById('logout');
  function confirmLogout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?') === true) {
      clearSessionStorage();
      location.href = 'index.html';
    } else {
      console.log('cancel');
    }
  }
  if (logout) {
    logout.addEventListener('click', confirmLogout);
  }
});

document.addEventListener('click', closeOutside);
if (domElements.burgerMenuBtn) {
  domElements.burgerMenuBtn.addEventListener('click', showBurgerMenu);
}
