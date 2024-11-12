export const domElements = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  logged: document.getElementById('logged'),
  form: document.getElementById('login'),
  errorName: document.getElementById('error-name'),
  errorEmail: document.getElementById('error-email'),
  welcome: document.getElementById('welcome'),
  chooseNav: document.getElementById('choose-nav'),
  btnUndo: document.querySelector('.btn-undo'),
  mainContent: document.getElementById('main-content'),
  chooseContainer: document.getElementById('choose-container'),
  sliderContainer: document.getElementById('slider-container'),
  titleQuizElem: document.querySelector('.quiz-title'),
  buttons: document.querySelectorAll('.answer-item'),
  pageBottom: document.getElementById('page-bottom'),
  quizTitle: document.querySelectorAll('.quiz-title'),
  btnSaveFile: document.querySelector('.btn-submit'),
};

export const CLASSNAMES = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  HIDDEN: 'hidden',
  DISABLED: 'disabled',
};
