import { fetchData } from "./utils.js";
import { answered, results } from './results.js';
const HIDDEN_CLASS = 'hidden';

export async function showModal(quiz) {
  // const data = await fetchData(quiz);
  // let numberOfQuestions = data.length;
  if (answered.length === quiz.length) {
    document.querySelector('.modal').classList.remove(HIDDEN_CLASS);
    document.querySelector('.overlay').classList.remove(HIDDEN_CLASS);
  }
  // results(numberOfQuestions);
}
