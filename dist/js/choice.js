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

document.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome');
  const chooseNav = document.getElementById('choose-nav');
  const mainContent = document.getElementById('main-content');
  const btnUndo = document.querySelector('.btn-undo');
  const chooseContainer = document.getElementById('choose-container');
  const sliderContainer = document.getElementById('slider-container');
  const quizTitle = document.querySelector('.quiz-title');
  const HIDDEN_CLASS = 'hidden';
  const buttons = document.querySelectorAll('.answer-item');
  const pageBottom = document.getElementById('page-bottom');
  let viewportWidth = window.innerWidth;
  let isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || viewportWidth < 600;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userName = urlParams.get('name');

  function welcomeStudent() {
    if (userName !== null && welcome) {
      welcome.innerHTML = `Bienvenue ${userName}`;
    }
  }

  welcomeStudent();

  function init() {
    buttons.forEach((button) => {
      button.classList.remove('disabled');
      button.disabled = false;
    });
  }

  function renderNavQuizzes() {
    if (chooseNav) {
      chooseNav.addEventListener(
        'click',
        (e) => {
          const target = e.target.closest('div');
          if (target) {
            showSpinner();
            endpointQuiz = target.dataset.endpoint;
            const title = target.dataset.title;
            if (quizTitle && title) {
              quizTitle.innerText = title;
            }
            if (chooseContainer) {
              chooseContainer.outerHTML = htmlQuiz;
            }
            init();
            displayQuestions(endpointQuiz);
            circularClock();
            validateAnswer(endpointQuiz);
          }
          btnUndo.classList.toggle('hidden');
          e.stopPropagation();
        },
        true,
      );
    }
  }

  document.addEventListener('click', scrollToBottomQuiz);
  renderNavQuizzes();

  async function displayQuestions(endpoint) {
    // if (sliderContainer) {
    //   btnUndo.addEventListener(
    //     'click',
    //     () => (sliderContainer.outerHTML = navButtons),
    //   );
    // }

    const container = document.getElementById('container');
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
    initSwiper();
    timerQuiz();
    await paginationSlider();
    hideSpinner();
  }

  async function validateAnswer(quiz) {
    const data = await fetchData(quiz);
    let numberOfQuestions = data.length;
    let scoreUser = 0;
    const buttonsNav = document.querySelectorAll('.swiper__quiz-slider');
    buttonsNav.forEach((navQuestion) => {
      navQuestion.addEventListener(
        'click',
        (e) => {
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
                target.classList.add('correct');
                answered.push(true);
                scoreUser += 1;
                if (container) {
                  const scoreElement = document.querySelector('.score');
                  if (scoreElement) {
                    scoreElement.textContent = `Score : ${scoreUser.toString()} / ${data.length}`;
                  }
                }
              } else {
                target.classList.add('incorrect');
                answered.push(false);
              }
              allButtons.forEach((button) => {
                if (button instanceof HTMLButtonElement) {
                  if (
                    findQuestion &&
                    button.textContent === findQuestion.correctAnswer
                  ) {
                    button.classList.add('correct');
                  }
                  if (
                    !button.classList.contains('correct') &&
                    !button.classList.contains('incorrect')
                  ) {
                    button.disabled = true;
                  }
                }
              });
            }
          }

          results(numberOfQuestions);
          if (answered.length === data.length) {
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
      pageBottom.scrollIntoView();
    }
  }
});
