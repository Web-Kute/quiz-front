import { gameOver } from './choice.js';
import { domElements } from './domelem.js';
import { getLoginId } from './login.js';
import { clearSessionStorage } from './utils.js';

const { burgerMenuBtn, mainMenu } = domElements;

export const showBurgerMenu = (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') {
    mainMenu.classList.toggle('show');
    if (mainMenu.classList.contains('show')) {
      mainMenu.setAttribute('aria-expanded', 'true');
      burgerMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mainMenu.setAttribute('aria-expanded', 'false');
      burgerMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }
  e.stopPropagation();
};

const loginOut = getLoginId.length === 0 ? 'Se connecter' : 'Se déconnecter';

export const mainMenuHtml = `<ul>
          <li class="main-menu-list quiz-list"><a href="#" class="" id="quiz-list">Liste des Quiz</a></li>
          <li class="main-menu-list show-result"><a href="#" class="" id="result">Résultats</a></li>
          <li class="main-menu-list logout-btn"><a href="#" class="" id="logout">${loginOut}</a></li>
        </ul>`;

const closeOutside = (e) => {
  if (
    e.target.id !== 'burger-menu' &&
    e.target.id !== 'main-menu' &&
    e.target.className !== 'main-menu-list'
  ) {
    if (mainMenu) {
      mainMenu.classList.add('hide');
      mainMenu.classList.remove('show');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const urlPath = window.location.pathname;

  if (mainMenu) {
    mainMenu.innerHTML = mainMenuHtml;
  }

  const quizList = document.getElementById('quiz-list');
  const result = document.getElementById('result');
  const logout = document.getElementById('logout');

  if (urlPath.includes('choose.html') && window.location.search.length === 0) {
    quizList.classList.add('active');
  } else if (window.location.search.length !== 0) {
    quizList.classList.remove('active');
  }

  if (urlPath.includes('results.html')) {
    result.classList.add('active');
  }

  function confirmQuizList() {
    const hasParameters = window.location.search.length > 0;
    if (!gameOver && hasParameters) {
      queueMicrotask(() => {
        if (
          confirm('Si vous quittez cette page, vous perdrez vos réponses !')
        ) {
          window.location.href = 'choose.html';
        }
      });
    } else {
      window.location.href = 'choose.html';
    }
  }

  function confirmResult() {
    const hasParameters = window.location.search.length > 0;
    if (!gameOver && hasParameters) {
      queueMicrotask(() => {
        if (
          confirm('Si vous quittez cette page, vous perdrez vos réponses !')
        ) {
          window.location.href = 'results.html';
        }
      });
    } else {
      window.location.href = 'results.html';
    }
  }

  function confirmLogout() {
    if (loginOut === 'Se connecter') {
      clearSessionStorage();
      window.location.href = 'index.html';
    } else {
      // Use a microtask to defer the heavy operation
      queueMicrotask(() => {
        if (
          confirm(
            'Êtes-vous sûr de vouloir vous déconnecter ? \u000DToutes les données seront perdues.',
          )
        ) {
          clearSessionStorage();
          window.location.href = 'index.html';
        }
      });
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

if (burgerMenuBtn) {
  document
    .querySelector('.togglemenu-container')
    .addEventListener('click', showBurgerMenu);
}
