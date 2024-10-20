export let answered = [];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('name');

export function results(nbOfQuestions) {
  if (answered) {
    if (answered.length === nbOfQuestions) {
      const notation = document.querySelector('.notation');
      let correct = answered.filter(Boolean).length;
      const total = Math.round((correct / nbOfQuestions) * 100);
      switch (true) {
        case total <= 25:
          notation.textContent = `${total} % Je vous souhaite de trouver votre voie !`;
          break;
        case total >= 26 && total <= 50:
          notation.textContent = `${total} % Pas si mal`;
          break;
        case total >= 51 && total <= 75:
          notation.textContent = `${total} % Pas mal, ${userName} vous êtes en bonne voie !`;
          break;
        case total >= 76 && total <= 87.5:
          notation.textContent = `${total} % Alors là ok, on peut parler`;
          break;
        case total >= 87.6 && total <= 100:
          notation.textContent = `${total} % Incroyable 100%, ${userName} on étudie tout cela en laboratoire. Bravo !`;
          break;
        default:
          break;
      }
    }
  }
}
