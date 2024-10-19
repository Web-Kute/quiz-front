// import Swiper from 'swiper';
// const Swiper = require('swiper');

document.addEventListener('DOMContentLoaded', (): void => {
  const welcome: HTMLInputElement | null = document.getElementById(
    'welcome',
  ) as HTMLInputElement;

  const chooseNav: HTMLInputElement | null = document.getElementById(
    'choose-nav',
  ) as HTMLInputElement;

  const mainContent: HTMLInputElement | null = document.getElementById(
    'main-content',
  ) as HTMLInputElement;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userName = urlParams.get('name');
  if (userName !== null && welcome) {
    welcome.innerHTML = `Bienvenue ${userName}`;
  }

  if (chooseNav) {
    chooseNav.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        displayInside();
      }
      // e.stopPropagation();
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

  // const mainContainer = document.getElementsByTagName('main')[0];

  async function displayInside() {
    if (mainContent) {
      mainContent.innerHTML = htmlQuiz;
    }
    await displayQuestions();
  }
  // function initSwiper(): void {
  //   const swiper = new Swiper('.swiper-quiz', {
  //     cssMode: true,
  //     direction: 'vertical',
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //     },
  //     mousewheel: true,
  //     keyboard: true,
  //   });
  //   swiper.on('slideChange', function () {
  //     const progressBar = document.getElementById('progress-bar');
  //     if (progressBar instanceof HTMLProgressElement) {
  //       progressBar.value = swiper.progress * 110;
  //     }
  //   });
  // }

  async function fetchData(endpoint: string): Promise<unknown> {
    const response = await fetch(endpoint);
    const data = await response.json();
    // const shuffledData = fisherYatesShuffle(data);
    return data;
  }

  async function displayQuestions(): Promise<void> {
    console.log('displayQuestions');
    const container = document.getElementById('container');
    const data = await fetchData('data/html.json');
    if (Array.isArray(data)) {
      data.forEach((question: { answers: Array<string>; question: string }) => {
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

        question.answers.forEach((answer: string) => {
          const button = document.createElement('button');
          button.className = 'answer-item';
          button.textContent = answer;
          nav.appendChild(button);
        });
      });
    }

    // const swiper = new Swiper('.swiper-quiz', {
    //   cssMode: true,
    //   direction: 'vertical',
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    //   mousewheel: true,
    //   keyboard: true,
    // });
    // swiper.on('slideChange', function () {
    //   const progressBar = document.getElementById('progress-bar');
    //   if (progressBar instanceof HTMLProgressElement) {
    //     progressBar.value = swiper.progress * 110;
    //   }
    // });
  }
});
