import { showBurgerMenu } from './menu.js';
import { domElements } from './domelem.js';
import { getLoginId } from './login.js';
import { currentTime } from './results.js';
import { populateQuizExplanation } from './accordion.js';
import {
  studentAnswers,
  capitalize,
  isMobile,
} from './choice.js';

const { quizResults, quizTableResults } = domElements;
const userStudentName = getLoginId[0] ? capitalize(getLoginId[0]) : 'Jane Doe';

const tableSize = quizTableResults.getBoundingClientRect();
if (isMobile) {
  document
    .querySelector('.accordion-container')
    .style.setProperty('--accordion-size', tableSize.width + 'px');
}

const headTableHtml = `<caption>
        Quiz Front-End
      </caption>
      <thead>
        <tr>
          <th scope="col" colspan="2">${userStudentName}</th>
          <th scope="col">${currentTime}</th>
        </tr>
      </thead>`;

const tfootHtml = `<tfoot>
        <tr>
          <td colspan="3" class="result-footer"><input type="submit" class="btn-print" value="Imprimer les résultats"></td>
        </tr>
      </tfoot>`;

const dataTable = studentAnswers.map((quiz) => {
  let quizRow = `<tr>
    <th scope="row"><strong>${quiz.titleQuiz}</strong></th>
      <td>Score : ${quiz.rating}%</td>
      <td>${quiz.grade}</td>
    </tr>`;
  return (quizResults.innerHTML = quizRow);
});

quizTableResults.innerHTML = headTableHtml + dataTable.join('') + tfootHtml;

const handlePrint = () => {
  window.print();
};

document.querySelector('.btn-print').addEventListener('click', handlePrint);
