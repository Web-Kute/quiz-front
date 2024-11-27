import {
  fisherYatesShuffle,
  fetchData,
  showSpinner,
  hideSpinner,
  disabledAllButtons,
} from './utils.js';
// import { studentId, getLoginId } from './login.js';
import { htmlQuiz } from './htmlpart.js';
import { initSwiper, paginationSlider } from './swiper.js';
import { results, answered, userResults } from './results.js';
import { modalBtnStart } from './modal.js';
import {
  showModal,
  showModalStart,
  closeModal,
  closeModalBtn,
  overlay,
} from './modal.js';
import { domElements, CLASSNAMES } from './domelem.js';
import { showBurgerMenu } from './menu.js';
import { getLoginId } from './login.js';

export let endpointQuiz = null;
export let titleQuiz = null;
export let totalQuestions;

export let quizList = {};
quizList = JSON.parse(sessionStorage.getItem('allQuiz')) || {};

export let studentAnswers = JSON.parse(sessionStorage.getItem('answers')) || [];

export function displayResults() {
  results(totalQuestions);
  const buttons = document.querySelectorAll('.answer-item');
  disabledAllButtons(buttons);
  const isDuplicateTitle = studentAnswers.some(
    (quiz) => quiz.titleQuiz === titleQuiz,
  );

  if (!isDuplicateTitle && studentAnswers.length <= 2) {
    studentAnswers.push(userResults);
  } else {
    alert('Ce Quiz a déjà été fait !');
  }

  sessionStorage.setItem('allQuiz', JSON.stringify(quizList));
  sessionStorage.setItem('answers', JSON.stringify(studentAnswers));
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('name');
const userLogged = urlParams.get('logged');

export const capitalize = (word = '') => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const student =
  getLoginId[0] !== null ? `${capitalize(getLoginId[0])}` : 'Développeur';

export function welcomeStudent() {
  if (getLoginId[0] && domElements.welcome) {
    domElements.welcome.innerHTML = `${student}`;
  } else {
    domElements.welcome.innerHTML = 'Bienvenue';
  }
}
//////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  // Check if a quiz have already been done
  if (quizList !== null) {
    domElements.quizTitle.forEach((title) => {
      if (quizList[title.dataset.title]) {
        title.childNodes[1].disabled = true;
        title.childNodes[1].classList.add(CLASSNAMES['DISABLED']);
      }
    });
  }

  let viewportWidth = window.innerWidth;
  let isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || viewportWidth < 600;

  welcomeStudent();

  function renderNavQuizzes() {
    if (domElements.chooseNav) {
      domElements.chooseNav.addEventListener(
        'click',
        async (e) => {
          e.preventDefault();
          const target = e.target.closest('div');

          if (!target.childNodes[1].classList.contains('disabled')) {
            showSpinner();
            endpointQuiz = target.dataset.endpoint;
            titleQuiz = target.dataset.title;

            quizList[titleQuiz] = true;
            const url = `?quiz=${titleQuiz}`;

            if (domElements.titleQuizElem && titleQuiz) {
              domElements.titleQuizElem.innerText = titleQuiz;
            }
            if (domElements.chooseContainer) {
              domElements.chooseContainer.outerHTML = htmlQuiz;
            }
            await displayQuestions(endpointQuiz);
            //add parameter to url
            window.history.pushState(
              {},
              '',
              `${location.pathname}?quiz=${titleQuiz}`,
            );

            await validateAnswer(endpointQuiz);
          }
          e.stopPropagation();
        },
        false,
      );
    }
  }

  renderNavQuizzes();

  async function displayQuestions(endpoint) {
    const container = document.getElementById('container');
    try {
      const data = await fetchData(endpoint);
      if (Array.isArray(data)) {
        data.forEach((question) => {
          const div = document.createElement('div');
          div.className = 'swiper-slide';
          if (container) {
            container.appendChild(div);
          }
          const title = document.createElement('h3');
          title.textContent = question.question;
          div.appendChild(title);
          const nav = document.createElement('nav');
          nav.className = 'swiper__quiz-slider';
          div.appendChild(nav);
          const shuffleQuestions = fisherYatesShuffle(question.answers);
          shuffleQuestions.forEach((answer) => {
            const button = document.createElement('button');
            button.className = 'answer-item';
            button.textContent = answer;
            nav.appendChild(button);
          });
        });
      }
      if (studentAnswers.length === 3) {
        const buttons = document.querySelectorAll('.answer-item');
        disabledAllButtons(buttons);
        modalBtnStart.classList.add('hidden');
      }
    } catch (error) {
      console.error('Failed to display questions:', error);
    }

    initSwiper();

    await paginationSlider();
    hideSpinner();
    showModalStart();
  }

  async function validateAnswer(quiz) {
    const data = await fetchData(quiz);
    totalQuestions = data.length;
    let scoreUser = 0;
    const buttonsNav = document.querySelectorAll('.swiper__quiz-slider');
    buttonsNav.forEach((navQuestion) => {
      navQuestion.addEventListener(
        'click',
        (e) => {
          // make sure all buttons is valid
          if (e.target.tagName === 'BUTTON') {
            domElements.buttons.forEach((button) => {
              button.classList.remove(CLASSNAMES['DISABLED']);
              button.disabled = false;
            });
          }
          const target = e.target;
          const questionsGroup = target.closest('.swiper__quiz-slider');
          const allButtons = questionsGroup
            ? Array.from(questionsGroup.querySelectorAll('.answer-item'))
            : [];

          if (target.tagName === 'BUTTON') {
            if (Array.isArray(data)) {
              const findQuestion = data.find((question) => {
                return (
                  question.question ===
                  questionsGroup?.previousElementSibling?.textContent
                );
              });

              if (
                findQuestion &&
                findQuestion.correctAnswer === target.textContent
              ) {
                target.classList.add(CLASSNAMES['CORRECT']);
                answered.push(true);
                scoreUser += 1;
                if (container) {
                  const scoreElement = document.querySelector('.score');
                  if (scoreElement) {
                    scoreElement.textContent = `Score : ${scoreUser.toString()} / ${totalQuestions}`;
                  }
                }
              } else {
                target.classList.add(CLASSNAMES['INCORRECT']);
                answered.push(false);
              }
              allButtons.forEach((button) => {
                if (button instanceof HTMLButtonElement) {
                  if (
                    findQuestion &&
                    button.textContent === findQuestion.correctAnswer
                  ) {
                    button.classList.add(CLASSNAMES['CORRECT']);
                  }
                  if (
                    !button.classList.contains(CLASSNAMES['CORRECT']) &&
                    !button.classList.contains(CLASSNAMES['INCORRECT'])
                  ) {
                    button.disabled = true;
                  }
                }
              });
            }
          }

          if (answered.length === totalQuestions) {
            displayResults();
            showModal();
          }

          scrollToBottomQuiz();
        },
        false,
      );
    });
  }

  function scrollToBottomQuiz() {
    if (isMobile) {
      domElements.pageBottom.scrollIntoView();
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
  }

  domElements.mainContent.addEventListener('click', scrollToBottomQuiz);
});
