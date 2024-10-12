// import { fisherYatesShuffle } from './utils';

function fisherYatesShuffle<T>(array: T[]): T[] {
  // Clone the array to avoid modifying the original
  const shuffledArray = [...array];

  // Iterate through the array in reverse order
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index 'j' between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices 'i' and 'j'
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

document.addEventListener('DOMContentLoaded', (): void => {
  const container: HTMLInputElement | null = document.getElementById(
    'container',
  ) as HTMLInputElement;

  async function fetchData(endpoint: string): Promise<unknown> {
    const response = await fetch(endpoint);
    const data = await response.json();
    const shuffledData = fisherYatesShuffle(data);
    return shuffledData;
  }

  async function displayQuestions(quiz: string): Promise<void> {
    const data = await fetchData(quiz);

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
        div.appendChild(nav);
        const shuffleQuestions = fisherYatesShuffle(question.answers);
        shuffleQuestions.forEach((answer: string) => {
          const button = document.createElement('button');
          button.className = 'answer-item';
          button.textContent = answer;
          nav.appendChild(button);
        });
      });
    }
  }
  displayQuestions("data/css.json");

  async function validateAnswer(quiz: string): Promise<void> {
    const data = await fetchData(quiz);
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
  validateAnswer('data/css.json');
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
