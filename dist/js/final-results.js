import { showBurgerMenu } from './menu.js';
import { domElements } from './domelem.js';
import { getLoginId } from './login.js';
import { currentTime } from './results.js';
import {
  student,
  welcomeStudent,
  studentAnswers,
  quizList,
  capitalize,
} from './choice.js';
const { quizResults, quizTableResults } = domElements;
const headTableHtml = `<caption>
        Quiz Front-End
      </caption>
      <thead>
        <tr>
          <th scope="col">${capitalize(getLoginId[0])}</th>
          <th scope="col" colspan="2">${currentTime}</th>
        </tr>
      </thead>`;

const tfootHtml = `<tfoot>
        <tr>
          <td colspan="3"><input type="submit" class="btn-print" value="Imprimer les résultats"></td>
        </tr>
      </tfoot>`;

const dataTable = studentAnswers.map((quiz) => {
  let quizRow = `<tr>
    <th scope="row"><strong>${quiz.titleQuiz}</strong>&nbsp;=> </th>
      <td>${quiz.rating}, </td>
      <td>${quiz.grade}</td>
    </tr>`;
  return (quizResults.innerHTML = quizRow);
});

quizTableResults.innerHTML =
  headTableHtml + dataTable.join('') + tfootHtml;

const handlePrint = () => {
  window.print();
};

document.querySelector('.btn-print').addEventListener('click', handlePrint);