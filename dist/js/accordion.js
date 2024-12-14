import { fetchData } from './utils.js';
import { domElements } from './domelem.js';
import {
  quizList,
  studentAnswers,
  datahtml,
  datacss,
  datajs,
} from './choice.js';

const { htmlAnswers, cssAnswers, jsAnswers } = domElements;

export async function populateQuizExplanation(quiz, elem, title, endpoint) {
  let quizCorrect =
    studentAnswers.find((answer) => answer.titleQuiz === title)?.correct || 0;
  const data = await fetchData(endpoint);
  const totalQuestions = data.length;
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
  elem.previousElementSibling.childNodes[1].innerHTML = `<div class="header-title"><span>${title}</span>  <span class="ac-header_correct">Bonnes réponses : <strong>${quizCorrect}/${totalQuestions}</strong></span></div>`;
}

datahtml !== null
  ? populateQuizExplanation(datahtml, htmlAnswers, 'HTML5', './data/html.json')
  : null;
datacss !== null
  ? populateQuizExplanation(datacss, cssAnswers, 'CSS3', './data/css.json')
  : null;
datajs !== null
  ? populateQuizExplanation(
      datajs,
      jsAnswers,
      'JavaScript',
      './data/javascript.json',
    )
  : null;

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
