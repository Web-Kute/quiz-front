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
      const allButtons = selectedQuestion ? Array.from(selectedQuestion.querySelectorAll('.answer-item')) : [];
      
      if (target.tagName === 'BUTTON') {
        const button = target as HTMLButtonElement;
        const answer = button.textContent;
        if (Array.isArray(data)) {
          data.forEach((question) => {
            if (question.correctAnswer === answer) {
              target.classList.add('correct');
            }
          });
        }
        allButtons.forEach((button) => {
          if (button instanceof HTMLButtonElement) {
            if (!button.classList.contains('correct')) {
              button.disabled = true;
            }
          }
        });
      }
    });  }

  validateAnswer();
});
