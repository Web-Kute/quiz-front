import { gameOver } from './choice.js';
import { domElements } from './domelem.js';
import { clearSessionStorage } from './utils.js';

export function showBurgerMenu() {
  domElements.mainMenu.classList.toggle('show');
}

export const mainMenuHtml = `<ul>
          <li class="main-menu-list quiz-list"><a href="choose.html" class="">Liste des Quiz</a></li>
          <li class="main-menu-list show-result"><a href="#" class="" id="result">Résultats</a></li>
          <li class="main-menu-list logout-btn"><a href="#" class="" id="logout">Se déconnecter</a></li>
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
  // domElements.mainMenu.addEventListener('click', (e) => {
  //   console.log('click', e.target.tagName);
  //   if (e.target.tagName === 'A') {
  //     e.target.classList.toggle('active');
  //   }
  // });
  const urlPath = window.location.pathname;
  // console.log('urlPath: ', urlPath);

  if (domElements.mainMenu) {
    domElements.mainMenu.innerHTML = mainMenuHtml;
  }
  const logout = document.getElementById('logout');
  const result = document.getElementById('result');
  const showResult = document.querySelector('.show-result');

  function confirmLogout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?') === true) {
      clearSessionStorage();
      location.href = 'index.html';
    } else {
      console.log('cancel');
    }
  }

  function confirmResult() {
    const hasParameters = window.location.search.length > 0;
    console.log('urlPath: ', hasParameters);
    if (hasParameters && !gameOver) {
      if (
        confirm('Si vous quittez cette page, vous perdrez vos réponses !') ===
        true
      ) {
        location.href = 'results.html';
      } else {
        console.log('cancel');
      }
    } else {
      location.href = 'results.html';
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
