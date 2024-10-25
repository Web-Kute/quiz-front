import {
  fisherYatesShuffle,
  circularClock,
  fetchData,
  showSpinner,
  hideSpinner,
} from './utils.js';
import { htmlQuiz, navButtons } from './htmlpart.js';
import { initSwiper, paginationSlider } from './swiper.js';
import { results, answered } from './results.js';
import { showModal, closeModal, closeModalBtn, overlay } from './modal.js';
import { timerQuiz, elapsedTime } from './timer.js';

export let endpointQuiz = null;
export const CLASSNAMES = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  HIDDEN: 'hidden',
  DISABLED: 'disabled',
};

document.addEventListener('DOMContentLoaded', () => {
  const domElements = {
    welcome: document.getElementById('welcome'),
    chooseNav: document.getElementById('choose-nav'),
    btnUndo: document.querySelector('.btn-undo'),
    mainContent: document.getElementById('main-content'),
    chooseContainer: document.getElementById('choose-container'),
    sliderContainer: document.getElementById('slider-container'),
    quizTitle: document.querySelector('.quiz-title'),
    buttons: document.querySelectorAll('.answer-item'),
    pageBottom: document.getElementById('page-bottom'),
  };
  let viewportWidth = window.innerWidth;
  let isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || viewportWidth < 600;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userName = urlParams.get('name');

  function welcomeStudent() {
    if (userName !== null && domElements.welcome) {
      domElements.welcome.innerHTML = `Bienvenue ${userName}`;
    }
  }

  welcomeStudent();

  function renderNavQuizzes() {
    if (domElements.chooseNav) {
      domElements.chooseNav.addEventListener(
        'click',
        async (e) => {
          const target = e.target.closest('div');
          if (target) {
            showSpinner();
            endpointQuiz = target.dataset.endpoint;
            const title = target.dataset.title;
            if (domElements.quizTitle && title) {
              domElements.quizTitle.innerText = title;
            }
            if (domElements.chooseContainer) {
              domElements.chooseContainer.outerHTML = htmlQuiz;
            }
            // init();
            displayQuestions(endpointQuiz);
            circularClock();
            await validateAnswer(endpointQuiz);
          }
          domElements.btnUndo.classList.toggle(CLASSNAMES['HIDDEN']);
          e.stopPropagation();
        },
        true,
      );
    }
  }

  // Add event listener cleanup
  let eventListeners = [];
  // Store references
  eventListeners.push(['click', scrollToBottomQuiz]);
  // Clean up on component unmount
  function cleanup() {
    eventListeners.forEach(([event, handler]) => {
      document.removeEventListener(event, handler);
    });
  }

  document.addEventListener('click', scrollToBottomQuiz);
  // cleanup();
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
    } catch (error) {
      console.error('Failed to display questions:', error);
    }

    initSwiper();
    timerQuiz();
    await paginationSlider();
    hideSpinner();
  }

  async function validateAnswer(quiz) {
    const data = await fetchData(quiz);
    let totalQuestions = data.length;
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

          results(totalQuestions);
          if (answered.length === totalQuestions) {
            showModal();
          }

          scrollToBottomQuiz();

          closeModalBtn.addEventListener('click', closeModal);
          overlay?.addEventListener('click', closeModal);
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
});
