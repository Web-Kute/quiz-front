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

          if (findQuestion.correctAnswer.includes(target.textContent)) {
            target.classList.add('correct');
          } else {
            target.classList.add('incorrect');
          }
          allButtons.forEach((button) => {
            if (button instanceof HTMLButtonElement) {
              if (button.textContent === findQuestion.correctAnswer) {
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

// Vous avez répondu à 2/20 questions.
// Votre score est de 10%.

window.onload = function () {
  const score = document.getElementById('score');
  const scoreValue = localStorage.getItem('score');
  if (score && scoreValue) {
    score.textContent = `Vous avez répondu à ${scoreValue} questions.`;
  }
  const swiperSlide = document.querySelectorAll('.swiper-slide');
  swiperSlide.forEach((slide) => {
    const pagination = slide.getAttribute('aria-label');
    if (pagination !== null) {
      slide.insertAdjacentHTML(
        'beforeend',
        `<p class="pagination"></p><p class="pagination">${pagination}</p>`,
      );
    }
  });
};

// si clique sur la bonne réponse, alors on ajoute la classe correct sur le bouton target
// si clique sur la mauvaise réponse, alors on ajoute la classe incorrect sur le bouton target et on ajoute la classe correct sur le bouton de la bonne réponse.
// on ajoute la classe disabled sur les autres boutons.
