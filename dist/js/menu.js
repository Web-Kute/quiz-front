import { domElements } from './domelem.js';

export function showBurgerMenu() {
  domElements.mainMenu.classList.toggle('show');
}

const closeOutside = (e) => {
  if (
    e.target.id !== 'burger-menu' &&
    e.target.id !== 'main-menu' &&
    e.target.className !== 'main-menu-list'
  ) {
    domElements.mainMenu.classList.add('hide');
    domElements.mainMenu.classList.remove('show');
  }
};

export function mainMenu() {}
// location.href = `choose.html?name=${domElements.name.value}&logged=${domElements.logged.value}`;
export const mainMenuHtml = `<ul>
          <li class="main-menu-list quiz-list"><a href="choose.html">Liste Quiz</a></li>
          <li class="main-menu-list show-result"><a href="results.html">Résultats</a></li>
          <li class="main-menu-list logout-btn"><a href="index.html" id="logout">Se déconnecter</a></li>
        </ul>`;

document.addEventListener('DOMContentLoaded', () => {
  domElements.mainMenu.innerHTML = mainMenuHtml;
});

document.addEventListener('click', closeOutside);
domElements.burgerMenuBtn.addEventListener('click', showBurgerMenu);
