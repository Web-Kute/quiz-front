// Utility functions
import {
  fisherYatesShuffle,
  fetchData,
  showSpinner,
  hideSpinner,
  disabledAllButtons,
} from './utils.js';

// Core functionality
import { htmlQuiz } from './htmlpart.js';
import { initSwiper, paginationSlider } from './swiper.js';
import { results, answered, userResults } from './results.js';

// UI Components
import {
  showModal,
  showModalStart,
  modalBtnStart,
  closeModal,
  closeModalBtn,
  overlay,
} from './modal.js';
import { domElements, CLASSNAMES } from './domelem.js';
import { showBurgerMenu } from './menu.js';
import { getLoginId } from './login.js';

const {
  welcome,
  quizTitle,
  chooseNav,
  chooseContainer,
  titleQuizElem,
  buttons,
  pageBottom,
  mainContent,
} = domElements;
const { CORRECT, INCORRECT, HIDDEN, DISABLED } = CLASSNAMES;

export let endpointQuiz = null;
export let titleQuiz = null;
export let totalQuestions;
export let gameOver = false;
// setter function to update gameOver
export function setGameOver(value) {
  gameOver = value;
}
export let quizList = {};
quizList = JSON.parse(sessionStorage.getItem('allQuiz')) || {};

export let studentAnswers = JSON.parse(sessionStorage.getItem('answers')) || [];

export function displayResults() {
  results(totalQuestions);
  disabledAllButtons(document.querySelectorAll('.answer-item'));

  !studentAnswers.some((quiz) => quiz.titleQuiz === titleQuiz) &&
  studentAnswers.length <= 2
    ? (studentAnswers.push(userResults),
      sessionStorage.setItem('allQuiz', JSON.stringify(quizList)),
      sessionStorage.setItem('answers', JSON.stringify(studentAnswers)))
    : alert('Ce Quiz a déjà été fait !');
}

export let datahtml = [];
datahtml = JSON.parse(sessionStorage.getItem('datahtml'));
export let datacss = [];
datacss = JSON.parse(sessionStorage.getItem('datacss'));
export let datajs = [];
datajs = JSON.parse(sessionStorage.getItem('datajs'));
let swallowData = [];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('name');
const userLogged = urlParams.get('logged');

export const capitalize = (phrase = '') => {
  return phrase
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
export const student =
  getLoginId[0] !== null ? `${capitalize(getLoginId[0])}` : 'Développeur';

export function welcomeStudent() {
  if (getLoginId[0] && welcome) {
    welcome.innerHTML = `${student}`;
  } else if (welcome) {
    welcome.innerHTML = 'Bienvenue';
  }
}

export let viewportWidth = window.innerWidth;

export let isMobile =
  /Android|webOS|iPhone/i.test(navigator.userAgent) || viewportWidth < 600;

//////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  // Check if a quiz have already been done
  if (quizList !== null) {
    quizTitle.forEach((title) => {
      if (quizList[title.dataset.title]) {
        title.childNodes[1].disabled = true;
        title.childNodes[1].classList.add(DISABLED);
      }
    });
  }

  welcomeStudent();

  function renderNavQuizzes() {
    if (chooseNav) {
      chooseNav.addEventListener(
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

            if (titleQuizElem && titleQuiz) {
              titleQuizElem.innerText = titleQuiz;
            }
            if (chooseContainer) {
              chooseContainer.outerHTML = htmlQuiz;
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
    document.getElementById('quiz-list').classList.remove('active');
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
            buttons.forEach((button) => {
              button.classList.remove(DISABLED);
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
              const currentQuestion = data.find((question) => {
                return (
                  question.question ===
                  questionsGroup?.previousElementSibling?.textContent
                );
              });

              currentQuestion.userAnswer = target.textContent;

              const { correctAnswer, userAnswer } = currentQuestion;

              if (currentQuestion && correctAnswer === target.textContent) {
                target.classList.add(CORRECT);
                answered.push(true);
                scoreUser += 1;
                if (container) {
                  const scoreElement = document.querySelector('.score');
                  if (scoreElement) {
                    scoreElement.textContent = `Score : ${scoreUser.toString()} / ${totalQuestions}`;
                  }
                }
              } else {
                target.classList.add(INCORRECT);
                answered.push(false);
              }

              swallowData.push(currentQuestion);
              if (quiz.includes('html')) {
                sessionStorage.setItem('datahtml', JSON.stringify(swallowData));
              } else if (quiz.includes('css')) {
                sessionStorage.setItem('datacss', JSON.stringify(swallowData));
              } else if (quiz.includes('javascript')) {
                sessionStorage.setItem('datajs', JSON.stringify(swallowData));
              }

              allButtons.forEach((button) => {
                if (button instanceof HTMLButtonElement) {
                  if (currentQuestion && button.textContent === correctAnswer) {
                    button.classList.add(CORRECT);
                  }
                  if (
                    !button.classList.contains(CORRECT) &&
                    !button.classList.contains(INCORRECT)
                  ) {
                    button.disabled = true;
                  }
                }
              });
            }
          }

          if (answered.length === totalQuestions) {
            setGameOver(true);
            displayResults();
            setTimeout(() => {
              showModal();
            }, 1000);
          }

          scrollToBottomQuiz();
        },
        false,
      );
    });
  }

  function scrollToBottomQuiz() {
    if (isMobile) {
      pageBottom.scrollIntoView();
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
  }
  if (mainContent) {
    mainContent.addEventListener('click', scrollToBottomQuiz);
  }
});
