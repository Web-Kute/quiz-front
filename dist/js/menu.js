import { gameOver } from './choice.js';
import { domElements } from './domelem.js';
import { clearSessionStorage } from './utils.js';

export function showBurgerMenu() {
  domElements.mainMenu.classList.toggle('show');
}

export const mainMenuHtml = `<ul>
          <li class="main-menu-list quiz-list"><a href="#" class="" id="quiz-list">Liste des Quiz</a></li>
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
  const urlPath = window.location.pathname;

  if (domElements.mainMenu) {
    domElements.mainMenu.innerHTML = mainMenuHtml;
  }

  const quizList = document.getElementById('quiz-list');
  const result = document.getElementById('result');
  const logout = document.getElementById('logout');
  const showResult = document.querySelector('.show-result');

  if (urlPath === '/choose.html' && window.location.search.length === 0) {
    quizList.classList.add('active');
  } else if (window.location.search.length !== 0) {
    quizList.classList.remove('active');
  }

  if (urlPath === '/results.html') {
    result.classList.add('active');
  }

  function confirmQuizList() {
    const hasParameters = window.location.search.length > 0;
    if (!gameOver && hasParameters) {
      if (
        confirm('Si vous quittez cette page, vous perdrez vos réponses !') ===
        true
      ) {
        location.href = 'choose.html';
      }
    } else {
      location.href = 'choose.html';
    }
  }

  function confirmResult() {
    const hasParameters = window.location.search.length > 0;
    if (hasParameters && !gameOver) {
      if (
        confirm('Si vous quittez cette page, vous perdrez vos réponses !') ===
        true
      ) {
        location.href = 'results.html';
      }
    } else {
      location.href = 'results.html';
    }
  }

  function confirmLogout() {
    if (
      confirm(
        'Êtes-vous sûr de vouloir vous déconnecter ? Toutes les données seront perdues.',
      ) === true
    ) {
      clearSessionStorage();
      location.href = 'index.html';
    }
  }

  if (quizList) {
    quizList.addEventListener('click', confirmQuizList);
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
