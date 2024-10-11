// import { fisherYatesShuffle } from './utils';

document.addEventListener('DOMContentLoaded', (): void => {
  const container: HTMLInputElement | null = document.getElementById(
    'container',
  ) as HTMLInputElement;

  async function fetchData(endpoint: string): Promise<string> {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  }

  async function displayQuestions(): Promise<void> {
    const data = await fetchData('data/html.json');

    if (Array.isArray(data)) {
      data.forEach((question: { answers: Array<string>; question: string }) => {
        const div = document.createElement('div');
        div.className = 'swiper-slide';
        container?.appendChild(div);
        const title = document.createElement('h3');
        title.textContent = question.question;
        div.appendChild(title);
        const nav = document.createElement('nav');
        nav.className = 'swiper__quiz-slider';
        // const slider = document.querySelector('.swiper__quiz-slider');
        div.appendChild(nav);
        question.answers.forEach((answer: string) => {
          const button = document.createElement('button');
          button.className = 'answer-item';
          button.textContent = answer;
          nav.appendChild(button);
        });
      });
    }
  }

  displayQuestions();

  async function validateAnswer() {
    const data = await fetchData('data/html.json');
    let scoreUser = 0;
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
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
            findQuestion.correctAnswer.includes(target.textContent)
          ) {
            target.classList.add('correct');
            scoreUser += 1;
            // Use scoreUser to update the score display
            // const scoreElement = document.getElementById('score');
            if (container) {
              const scoreElement = document.querySelector('.score');
              if (scoreElement) {
                scoreElement.textContent = `Score : ${scoreUser.toString()} / ${data.length}`;
              }
            }
          } else {
            target.classList.add('incorrect');
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
    });
  }
  validateAnswer();
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
