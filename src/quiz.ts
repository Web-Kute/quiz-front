// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// // import Swiper and modules styles
// import './node_modules/swiper/css/bundle';
// import './node_modules/swiper/css/navigation';
// import './node_modules/swiper/css/pagination';

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
});

// async function displayQuestions(): Promise<void> {
//   const data = await fetchData('data/html.json');
//   const ul = document.createElement('ul');
//   ul.className = 'questions-list';
//   container?.appendChild(ul);
//   if (Array.isArray(data)) {
//     data.forEach((question: { answers: Array<string>; question: string }) => {
//       const li = document.createElement('li');
//       li.className = 'question-item';
//       li.textContent = question.question;
//       ul?.appendChild(li);
//       const answersList = document.createElement('ul');
//       answersList.className = 'answers-list';
//       li.appendChild(answersList);
//       question.answers.forEach((answer: string) => {
//         const liAnswer = document.createElement('li');
//         liAnswer.className = 'answer-item';
//         liAnswer.textContent = answer;
//         answersList.appendChild(liAnswer);
//       });
//     });
//   }
// }
