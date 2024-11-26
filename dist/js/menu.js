import { domElements } from './domelem.js';
import { clearSessionStorage } from './utils.js';

export function showBurgerMenu() {
  domElements.mainMenu.classList.toggle('show');
}

export const mainMenuHtml = `<ul>
          <li class="main-menu-list quiz-list"><a href="choose.html">Liste des Quiz</a></li>
          <li class="main-menu-list show-result"><a href="#" id="result">Résultats</a></li>
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
  const urlHash = window.location.href;

  if (domElements.mainMenu) {
    domElements.mainMenu.innerHTML = mainMenuHtml;
  }
  const logout = document.getElementById('logout');
  const result = document.getElementById('result');

  function confirmLogout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?') === true) {
      clearSessionStorage();
      location.href = 'index.html';
    } else {
      console.log('cancel');
    }
  }

  function confirmResult() {
    if (!urlHash.includes('results.html')) {
      if (confirm('Si vous quittez, vous perdrez vos réponses !') === true) {
        location.href = 'results.html';
      } else {
        console.log('cancel');
      }
    }
  }

  if (result) {
    result.addEventListener('click', confirmResult);
  }
  if (logout) {
    logout.addEventListener('click', confirmLogout);
  }
});

document.addEventListener('click', closeOutside);
if (domElements.burgerMenuBtn) {
  domElements.burgerMenuBtn.addEventListener('click', showBurgerMenu);
}
