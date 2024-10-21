export let answered = [];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('name');

export function results(nbOfQuestions) {
  if (answered) {
    if (answered.length === nbOfQuestions) {
      const notation = document.querySelector('.notation');
      const commentNotation = document.querySelector('.comment-notation');
      let correct = answered.filter(Boolean).length;
      const total = Math.round((correct / nbOfQuestions) * 100);
      const student = userName ? `${userName}` : '';
      switch (true) {
        case total <= 25.99:
          notation.textContent = `Score : ${total} %`;
          commentNotation.textContent = `Patience ${student}, les réponses vont venir !`;
          break;
        case total >= 26 && total <= 50.99:
          notation.textContent = `Score : ${total} % `;
          commentNotation.textContent = `Pas si mal, ${student} croyez-en-vous !`;
          break;
        case total >= 51 && total <= 75:
          notation.textContent = `Score : ${total} % `;
          commentNotation.textContent = `Bien, ${student} vous êtes en bonne voie !`;
          break;
        case total >= 76 && total <= 87.5:
          notation.textContent = `Score : ${total} % `;
          commentNotation.textContent = `${student}, Alors là ok, on peut parler`;
          break;
        case total >= 87.6 && total <= 99.99:
          notation.textContent = `Score : ${total} % `;
          commentNotation.textContent = `Incroyable ${student} vous frôlez la perfection. Bravo !`;
          break;
        case total === 100:
          notation.textContent = `Score : ${total} % `;
          commentNotation.textContent = `Incroyable 100%, ${student} on étudie tout cela en laboratoire. Bravo !`;
          break;
        default:
          break;
      }
    }
  }
}
