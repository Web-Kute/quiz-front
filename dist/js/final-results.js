import { showBurgerMenu } from './menu.js';
import { domElements } from './domelem.js';
import { getLoginId } from './login.js';
import { student, welcomeStudent, studentAnswers, quizList } from './choice.js';

const headTableHtml = `<caption>
        Front-end Web Developer
      </caption>
      <thead>
        <tr>
          <th scope="col"><strong>${studentAnswers[0].student}</strong></th>
          <th scope="col">${studentAnswers[0].currentTime}</th>
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
    <th scope="row"><strong>${quiz.titleQuiz}</strong> => </th>
      <td>${quiz.rating}, </td>
      <td>${quiz.grade}</td>
    </tr>`;
  return (domElements.quizResults.innerHTML = quizRow);
});

domElements.quizTableResults.innerHTML =
  headTableHtml + dataTable.join('') + tfootHtml;
