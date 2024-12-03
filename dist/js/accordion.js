import { fetchData } from './utils.js';
import { domElements, CLASSNAMES } from './domelem.js';
import {
  quizList,
  studentAnswers,
  datahtml,
  datacss,
  datajs,
} from './choice.js';
import { answered } from './results.js';

const { htmlAnswers, cssAnswers, jsAnswers } = domElements;

export function populateQuizExplanation(quiz, elem) {
  quiz.forEach((question) => {
    const h4 = document.createElement('h4');
    h4.className = 'title-item';
    h4.textContent = question.question;
    const code = document.createElement('code');
    code.className = 'code-item';
    code.textContent = question.correctAnswer;
    const codeUser = document.createElement('code');
    if (question.correctAnswer !== question.userAnswer) {
      codeUser.className = 'code-item error-user';
    } else {
      codeUser.className = 'code-item';
    }
    codeUser.textContent = `Vous : ${question.userAnswer}`;
    const p = document.createElement('p');
    p.className = 'text-item';
    p.textContent = question.explanation;
    elem.appendChild(h4);
    elem.appendChild(code);
    elem.appendChild(codeUser);
    elem.appendChild(p);
  });
}

datahtml !== null ? populateQuizExplanation(datahtml, htmlAnswers) : null;
datacss !== null ? populateQuizExplanation(datacss, cssAnswers) : null;
datajs!== null ? populateQuizExplanation(datajs, jsAnswers) : null;

function highLightAccordionHeader(quizList, elem) {
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

if (quizList) {
  highLightAccordionHeader(quizList.HTML5, htmlAnswers);
  highLightAccordionHeader(quizList.CSS3, cssAnswers);
  highLightAccordionHeader(quizList.JavaScript, jsAnswers);
}
