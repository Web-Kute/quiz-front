import { answered } from "./results.js";
const HIDDEN_CLASS = 'hidden';
export function showModal(quiz) {
  if (answered.length === quiz.length) {
    document.querySelector('.modal').classList.remove(HIDDEN_CLASS);
    document.querySelector('.overlay').classList.remove(HIDDEN_CLASS);
  }
}


