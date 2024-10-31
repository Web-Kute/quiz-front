import { elapsedTime } from './timer.js';
import { capitalize } from './utils.js';
import { titleQuiz } from './choice.js';
import { htmlQuiz } from './htmlpart.js';

export let answered = [];
export let correct = 0;
export let timeOutAnswered = 0;
export let total;
export let userResults = {};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('name');
const student = userName ? `${capitalize(userName)}` : '';

export function results(nbOfQuestions, rating, grade) {
  if (answered) {
    const notation = document.querySelector('.notation');
    const commentNotation = document.querySelector('.comment-notation');
    const total = Math.round((correct / nbOfQuestions) * 100);
    correct = answered.filter(Boolean).length;
    console.log('total:', total);
    if (correct === 0) {
      rating = `Score : ${total}%`;
      grade = `Patience ${student}, les réponses vont venir\u00a0!`;
    } else {
      timeOutAnswered = Math.round((correct / nbOfQuestions) * 100);
    }

    if (answered.length === nbOfQuestions || timeOutAnswered >= 0) {
      switch (true) {
        case total === 0 || total <= 25.99:
          rating = `Score : ${total}%`;
          grade = `Patience ${student}, les réponses vont venir\u00a0!`;
          break;
        case total >= 26 && total <= 50.99:
          rating = `Score : ${total}%`;
          grade = `Vous avez les bases, ${student} croyez-en-vous\u00a0!`;
          break;
        case total >= 51 && total <= 75.99:
          rating = `Score : ${total}%`;
          grade = `Bravo, ${student} vous êtes en bonne voie\u00a0!`;
          break;
        case total >= 76 && total <= 87.5:
          rating = `Score : ${total}%`;
          grade = `Bravo, ${student} résultats très encourageants\u00a0!`;
          break;
        case total >= 87.6 && total <= 99.99:
          rating = `Score : ${total}%`;
          grade = `Excellents résultats ${student}, vous frôlez la perfection. Bravo\u00a0!`;
          break;
        case total === 100:
          rating = `Score : ${total}%`;
          grade = `100%. Incroyable ${student}. Félicitations, continuez ainsi\u00a0!`;
          break;
        default:
          break;
      }

      if (notation && commentNotation) {
        notation.textContent = userResults.rating;
        commentNotation.textContent = userResults.grade;
      }
      const currentTime = new Date().toLocaleString();
      console.log(currentTime);

      userResults = {
        currentTime,
        titleQuiz,
        rating,
        grade,
        total,
      };

      return userResults;
    }
  }
}
