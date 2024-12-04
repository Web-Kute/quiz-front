import { titleQuiz, student, capitalize } from './choice.js';

export let answered = [];
export let correct = 0;
export let total;
export let userResults = {};

export const currentTime = new Date().toLocaleDateString();
let rating = '';
let grade = '';

export function results(nbOfQuestions) {
  if (answered) {
    const notation = document.querySelector('.notation');
    const commentNotation = document.querySelector('.comment-notation');
    total = Math.round((correct / nbOfQuestions) * 100);
    correct = answered.filter(Boolean).length;

    if (correct === 0) {
      total = 0;
    } else {
      total = Math.round((correct / nbOfQuestions) * 100);
    }

    if (answered.length === nbOfQuestions || total >= 0) {
      switch (true) {
        case total === 0 || total <= 25.99:
          rating = `Score : ${total}%`;
          grade = `Patience ${capitalize(student)}, les réponses vont venir\u00a0!`;
          break;
        case total >= 26 && total <= 50.99:
          rating = `Score : ${total}%`;
          grade = `Vous avez les bases, ${capitalize(student)}, croyez-en-vous\u00a0!`;
          break;
        case total >= 51 && total <= 75.99:
          rating = `Score : ${total}%`;
          grade = `Bravo, ${capitalize(student)}, vous êtes en bonne voie\u00a0!`;
          break;
        case total >= 76 && total <= 87.5:
          rating = `Score : ${total}%`;
          grade = `Bravo, ${capitalize(student)}, résultats très encourageants\u00a0!`;
          break;
        case total >= 87.6 && total <= 99.99:
          rating = `Score : ${total}%`;
          grade = `Excellents résultats ${capitalize(student)}, vous frôlez la perfection. Bravo\u00a0!`;
          break;
        case total === 100:
          rating = `Score : ${total}%`;
          grade = `100%. Incroyable ${capitalize(student)}. Félicitations, continuez ainsi\u00a0!`;
          break;
        default:
          break;
      }

      userResults = {
        student,
        currentTime,
        titleQuiz,
        rating,
        grade,
        correct,
      };

      if (notation && commentNotation && userResults) {
        notation.textContent = userResults.rating;
        commentNotation.textContent = userResults.grade;
      } else {
        notation.textContent = 'Sorry';
        commentNotation.textContent = 'Results not available';
      }

      return userResults;
    }
  }
}
