import { elapsedTime } from './timer.js';
import { capitalize } from "./utils.js";

export let answered = [];
export let correct = 0;
export let timeOutAnswered = 0;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('name');

export function results(nbOfQuestions) {
  if (answered) {
    const notation = document.querySelector('.notation');
    const commentNotation = document.querySelector('.comment-notation');
    correct = answered.filter(Boolean).length;
    timeOutAnswered =
      answered.length !== 0 && correct !== 0
        ? Math.round((correct / answered.length) * 100)
        : 0;

    if (answered.length === nbOfQuestions || timeOutAnswered >= 0) {
      const total = Math.round((correct / nbOfQuestions) * 100);
      const finalScore = elapsedTime === 0 ? timeOutAnswered : total;
      const student = userName ? `${capitalize(userName)}` : '';
      switch (true) {
        case finalScore <= 25.99:
          notation.textContent = `Score : ${finalScore} %`;
          commentNotation.textContent = `Patience ${student}, les réponses vont venir !`;
          break;
        case finalScore >= 26 && finalScore <= 50.99:
          notation.textContent = `Score : ${finalScore} % `;
          commentNotation.textContent = `Pas si mal, ${student} croyez-en-vous !`;
          break;
        case finalScore >= 51 && finalScore <= 75.99:
          notation.textContent = `Score : ${finalScore} % `;
          commentNotation.textContent = `Bravo, ${student} vous êtes en bonne voie !`;
          break;
        case finalScore >= 76 && finalScore <= 87.5:
          notation.textContent = `Score : ${finalScore} % `;
          commentNotation.textContent = `Très fort, alors là, ${student}, on peut parler`;
          break;
        case finalScore >= 87.6 && finalScore <= 99.99:
          notation.textContent = `Score : ${finalScore} % `;
          commentNotation.textContent = `Incroyable ${student} vous frôlez la perfection. Bravo !`;
          break;
        case finalScore === 100:
          notation.textContent = `Score : ${finalScore} % `;
          commentNotation.textContent = `Incroyable 100%, ${student} on étudie tout cela en laboratoire. Bravo !`;
          break;
        default:
          break;
      }
    }
    return timeOutAnswered;
  }
}
