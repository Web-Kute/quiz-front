"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASSNAMES = exports.domElements = void 0;
exports.domElements = {
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
    logged: document.getElementById('logged'),
};
exports.CLASSNAMES = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    HIDDEN: 'hidden',
    DISABLED: 'disabled',
};
