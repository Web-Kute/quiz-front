import { fisherYatesShuffle, circularClock, fetchData } from './utils.js';
import { htmlQuiz } from './htmlpart.js';
import { initSwiper, paginationSlider } from './swiper.js';
import { results, answered } from './results.js';
import { showModal, closeModal, closeModalBtn, overlay } from './modal.js';
import { timerQuiz, elapsedTime } from './timer.js';

export let endpointQuiz = null;

document.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome');
  const chooseNav = document.getElementById('choose-nav');
  const mainContent = document.getElementById('main-content');
  const chooseContainer = document.getElementById('choose-container');
  const quizTitle = document.querySelector('.quiz-title');
  const timer = document.querySelector('.timer');
  const HIDDEN_CLASS = 'hidden';

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userName = urlParams.get('name');

  function init() {
    if (userName !== null && welcome) {
      welcome.innerHTML = `Bienvenue ${userName}`;
    }
  }
  init();

  async function renderQuiz() {
    const data = await fetchData('./data/css.json');
    if (chooseNav) {
      chooseNav.addEventListener(
        'click',
        (e) => {
          const target = e.target.closest('div');
          if (target) {
            endpointQuiz = target.dataset.endpoint;
            const title = target.dataset.title;
            if (quizTitle && title) {
              quizTitle.innerText = title;
            }
            if (chooseContainer) {
              chooseContainer.outerHTML = htmlQuiz;
            }
            displayQuestions(endpointQuiz);
            circularClock();
            validateAnswer(endpointQuiz);
          }
          e.stopPropagation();
        },
        true,
      );
    }
  }

  renderQuiz();

  async function displayQuestions(endpoint) {
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

          closeModalBtn.addEventListener('click', closeModal);
          overlay?.addEventListener('click', closeModal);
        },
        false,
      );
    });
  }
});
