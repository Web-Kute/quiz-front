export let answered = [];
export function results(nbOfQuestions) {
  if (answered) {
    if (answered.length === nbOfQuestions) {
      const notation = document.querySelector('.notation');
      let correct = answered.filter(Boolean).length;
      const total = Math.round((correct / nbOfQuestions) * 100);
      switch (true) {
        case total <= 25:
          notation.textContent = 'Je vous souhaite de trouver votre voie !';
          break;
        case total >= 26 && total <= 50:
          notation.textContent = 'Pas si mal';
          break;
        case total >= 51 && total <= 75:
          notation.textContent = 'Pas mal, vous êtes en bonne voie !';
          break;
        case total >= 76 && total <= 87.5:
          notation.textContent = 'Alors là ok, on peut parler';
          break;
        case total === 100:
          notation.textContent = 'Incroyable 100%, on étudie tout cela en laboratoire. Bravo !';
          break;
        default:
          break;
      }
    }
  }
}
