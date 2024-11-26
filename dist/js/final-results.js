import { showBurgerMenu } from './menu.js';
import { domElements } from './domelem.js';
import { getLoginId } from './login.js';
import { currentTime } from './results.js'
import { student, welcomeStudent, studentAnswers, quizList, capitalize } from './choice.js';

const headTableHtml =`<caption>
        Front-end Web Developer
      </caption>
      <thead>
        <tr>
          <th scope="col">${capitalize(getLoginId[0])}</th>
          <th scope="col">${currentTime}</th>
          <th scope="col">Quiz Front-End</th>
        </tr>
      </thead>`;

const tfootHtml = `<tfoot>
        <tr>
          <th scope="row" colspan="2"></th>
          <td>&nbsp;</td>
        </tr>
      </tfoot>`;

const dataTable = studentAnswers.map((quiz) => {
  let quizRow = `<tr>
    <th scope="row"><strong>${quiz.titleQuiz}</strong>&nbsp;=> </th>
      <td>${quiz.rating}, </td>
      <td>${quiz.grade}</td>
    </tr>`;
  return (domElements.quizResults.innerHTML = quizRow);
});

domElements.quizTableResults.innerHTML =
  headTableHtml + dataTable.join('') + tfootHtml;
