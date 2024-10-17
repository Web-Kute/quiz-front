import { fisherYatesShuffle } from './random.js';

document.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome');

  const chooseNav = document.getElementById('choose-nav');

  const mainContent = document.getElementById('main-content');

  const quizTitle = document.querySelector('.quiz-title');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userName = urlParams.get('name');
  if (userName !== null && welcome) {
    welcome.innerHTML = `Bienvenue ${userName}`;
  }

  if (chooseNav) {
    chooseNav.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON') {
        const endpointQuiz = target.dataset.endpoint;
        const title = target.dataset.title;
        if (quizTitle && title) {
          quizTitle.innerText = title;
        }
        displayInside();
        displayQuestions(endpointQuiz);
        validateAnswer(endpointQuiz);
      }
      e.stopPropagation();
    });
  }

  const htmlQuiz = `<section id="quiz">
      <progress title="You cannot interact with this cursor" class="update run" role="progressbar" id="progress-bar"
        value="0" max="100" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" tabindex="0"
        aria-label="Content loading…"></progress>
      <!-- Swiper -->
      <div class="swiper swiper-quiz">
        <div id="container" class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>

      </div>
      <p class="score">Score : <span>0</span></p>
      <aside>
        <div class="countdown-container" data-duration="180" data-transition="linear" data-color="#28af60"
          data-size="100" data-position="up"></div>
      </aside>
    </section>`;

  async function displayInside() {
    if (mainContent) {
      mainContent.innerHTML = htmlQuiz;
    }
  }

  function initSwiper() {
    const swiper = new Swiper('.swiper-quiz', {
      cssMode: true,
      direction: 'vertical',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      mousewheel: true,
      keyboard: true,
    });
    swiper.on('slideChange', function () {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar instanceof HTMLProgressElement) {
        progressBar.value = swiper.progress * 110;
      }
    });
  }

  async function pagination() {
    const swiperSlide = document.querySelectorAll('.swiper-slide');

    swiperSlide.forEach((slide) => {
      const pagination = slide.getAttribute('aria-label');
      if (pagination !== null) {
        slide.insertAdjacentHTML(
          'beforeend',
          `<p class="pagination">${pagination}</p>`,
        );
      }
    });
  }

  async function fetchData(endpoint) {
    const response = await fetch(endpoint);
    const data = await response.json();
    const shuffledData = fisherYatesShuffle(data);
    return shuffledData;
  }

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

        question.answers.forEach((answer) => {
          const button = document.createElement('button');
          button.className = 'answer-item';
          button.textContent = answer;
          nav.appendChild(button);
        });
      });
    }
    initSwiper();
    await pagination();
  }

  let answered = [];

  function results() {
    let correct = answered.filter(Boolean).length;
    if (answered) {
      switch (correct) {
        case correct < 3:
          'Essayez encore';
          break;
        case 3 < correct < 5:
          'Pas mal, vous êtes en bonne voie ! ';
          break;
        case 5 < correct < 8:
          'Alors là ok, on peut parler';
          break;
        case 8 < correct < 10:
          "Top gun, c'est un honneur de vous voir ici";
          break;
        case correct === 10:
          'El campeon, je vous laisse les clés !';
          break;
        default:
          break;
      }
    }
  }

  async function validateAnswer(quiz) {
    const data = await fetchData(quiz);
    let scoreUser = 0;
    document.addEventListener('click', (e) => {
      const target = e.target;
      const selectedQuestion = target.closest('.swiper__quiz-slider');

      const allButtons = selectedQuestion
        ? Array.from(selectedQuestion.querySelectorAll('.answer-item'))
        : [];

      if (target.tagName === 'BUTTON') {
        if (Array.isArray(data)) {
          const findQuestion = data.find((question) => {
            return (
              question.question ===
              selectedQuestion?.previousElementSibling?.textContent
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
if(answered.length === quiz.length){

}
      let correct = answered.filter(Boolean).length;

      if (answered) {
        switch (correct) {
          case correct < 3:
            console.log('Essayez encore');
            break;
          case 3 < correct < 5:
            console.log('Pas mal, vous êtes en bonne voie !');
            break;
          case 5 < correct < 8:
            'Alors là ok, on peut parler';
            break;
          case 8 < correct < 10:
            "Top gun, c'est un honneur de vous voir ici";
            break;
          case correct === 10:
            'El campeon, je vous laisse les clés !';
            break;
          default:
            break;
        }
      }
      console.log('answered: ', answered, results());
    });
  }
});
window.onload = function () {
  const swiperSlide = document.querySelectorAll('.swiper-slide');
  swiperSlide.forEach((slide) => {
    const pagination = slide.getAttribute('aria-label');
    if (pagination !== null) {
      slide.insertAdjacentHTML(
        'beforeend',
        `<p class="pagination">${pagination}</p>`,
      );
    }
  });
};
