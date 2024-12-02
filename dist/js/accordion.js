import { fetchData } from './utils.js';
import { domElements, CLASSNAMES } from './domelem.js';
import { quizList, studentAnswers } from './choice.js';
import { answered } from './results.js';

const { htmlAnswers, cssAnswers, jsAnswers } = domElements;

export async function populateQuizExplanation(endpoint, elem) {
  const data = await fetchData(endpoint);
  data.forEach((question) => {
    const h4 = document.createElement('h4');
    h4.className = 'title-item';
    h4.textContent = question.question;
    const code = document.createElement('code');
    code.className = 'code-item';
    code.textContent = question.correctAnswer;
    const p = document.createElement('p');
    p.className = 'text-item';
    p.textContent = question.explanation;
    elem.appendChild(h4);
    elem.appendChild(code);
    elem.appendChild(p);
  });
}
populateQuizExplanation('./data/html.json', htmlAnswers);
populateQuizExplanation('./data/css.json', cssAnswers);
populateQuizExplanation('./data/javascript.json', jsAnswers);

function checkQuizIsDone(quizList, elem) {
  if (quizList) {
    elem.classList.remove('hidden');
    const parentH2 = elem.parentElement.querySelector('h2');
    if (parentH2) {
      parentH2.classList.add('active');
    }
  } else if (quizList === undefined) {
    elem.classList.add('hidden');
    const parentH2 = elem.parentElement.querySelector('h2');
    if (parentH2) {
      parentH2.classList.remove('active');
    }
  }
}

checkQuizIsDone(quizList.HTML5, htmlAnswers);
checkQuizIsDone(quizList.CSS3, cssAnswers);
checkQuizIsDone(quizList.JavaScript, jsAnswers);
