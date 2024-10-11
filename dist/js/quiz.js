var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('container');
    function fetchData(endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(endpoint)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    }
    function displayQuestions() {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchData('data/html.json')];
                    case 1:
                        data = _a.sent();
                        if (Array.isArray(data)) {
                            data.forEach(function (question) {
                                var div = document.createElement('div');
                                div.className = 'swiper-slide';
                                container === null || container === void 0 ? void 0 : container.appendChild(div);
                                var title = document.createElement('h3');
                                title.textContent = question.question;
                                div.appendChild(title);
                                var nav = document.createElement('nav');
                                nav.className = 'swiper__quiz-slider';
                                // const slider = document.querySelector('.swiper__quiz-slider');
                                div.appendChild(nav);
                                question.answers.forEach(function (answer) {
                                    var button = document.createElement('button');
                                    button.className = 'answer-item';
                                    button.textContent = answer;
                                    nav.appendChild(button);
                                });
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    displayQuestions();
    // async function findQuestion(correct: string) {
    //   const data = await fetchData('data/html.json');
    //   for (const question of data) {
    //     if (
    //       Array.isArray(question.correctAnswer) &&
    //       question.correctAnswer.includes(correct)
    //     ) {
    //       return question;
    //     }
    //   }
    //   return null;
    // }
    function validateAnswer() {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchData('data/html.json')];
                    case 1:
                        data = _a.sent();
                        document.addEventListener('click', function (e) {
                            var target = e.target;
                            var selectedQuestion = target.closest('.swiper__quiz-slider');
                            var allButtons = selectedQuestion
                                ? Array.from(selectedQuestion.querySelectorAll('.answer-item'))
                                : [];
                            if (target.tagName === 'BUTTON') {
                                if (Array.isArray(data)) {
                                    var findQuestion_1 = data.find(function (question) {
                                        var _a;
                                        return (question.question ===
                                            ((_a = selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.previousElementSibling) === null || _a === void 0 ? void 0 : _a.textContent));
                                    });
                                    if (findQuestion_1.correctAnswer.includes(target.textContent)) {
                                        target.classList.add('correct');
                                    }
                                    else {
                                        target.classList.add('incorrect');
                                    }
                                    allButtons.forEach(function (button) {
                                        if (button instanceof HTMLButtonElement) {
                                            if (button.textContent === findQuestion_1.correctAnswer) {
                                                button.classList.add('correct');
                                            }
                                            if (!button.classList.contains('correct') &&
                                                !button.classList.contains('incorrect')) {
                                                button.disabled = true;
                                            }
                                        }
                                    });
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    validateAnswer();
});
// Vous avez répondu à 2/20 questions.
// Votre score est de 10%.
window.onload = function () {
    var score = document.getElementById('score');
    var scoreValue = localStorage.getItem('score');
    if (score && scoreValue) {
        score.textContent = "Vous avez r\u00E9pondu \u00E0 ".concat(scoreValue, " questions.");
    }
    var swiperSlide = document.querySelectorAll('.swiper-slide');
    swiperSlide.forEach(function (slide) {
        var pagination = slide.getAttribute('aria-label');
        if (pagination !== null) {
            slide.insertAdjacentHTML('beforeend', "<p class=\"pagination\"></p><p class=\"pagination\">".concat(pagination, "</p>"));
        }
    });
};
// si clique sur la bonne réponse, alors on ajoute la classe correct sur le bouton target
// si clique sur la mauvaise réponse, alors on ajoute la classe incorrect sur le bouton target et on ajoute la classe correct sur le bouton de la bonne réponse.
// on ajoute la classe disabled sur les autres boutons.
// async function handleResponse(
//   question: string,
//   answer: string,
//   correctAnswer: string,
// ): Promise<void> {
//   const data = await fetchData('data/html.json');
//   if (Array.isArray(data)) {
//     data.forEach((questionData) => {
// });
//   }
// }
// if (questionData.question === question) {
//   if (questionData.correctAnswer === answer) {
//     const button = document.querySelector(
//       `button[data-answer="${answer}"]`,
//     ) as HTMLButtonElement;
//     button.classList.add('correct');
//   } else {
//     const correctButton = document.querySelector(
//       `button[data-answer="${correctAnswer}"]`,
//     ) as HTMLButtonElement;
//     correctButton.classList.add('correct');
//     const button = document.querySelector(
//       `button[data-answer="${answer}"]`,
//     ) as HTMLButtonElement;
//     button.classList.add('incorrect');
//   }
// }
