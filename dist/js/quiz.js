// import { fisherYatesShuffle } from './utils';
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function fisherYatesShuffle(array) {
    var _a;
    // Clone the array to avoid modifying the original
    var shuffledArray = __spreadArray([], array, true);
    // Iterate through the array in reverse order
    for (var i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index 'j' between 0 and i (inclusive)
        var j = Math.floor(Math.random() * (i + 1));
        // Swap the elements at indices 'i' and 'j'
        _a = [shuffledArray[j], shuffledArray[i]], shuffledArray[i] = _a[0], shuffledArray[j] = _a[1];
    }
    return shuffledArray;
}
var queryStringUrl = window.location.search;
var urlParamsEndpoint = new URLSearchParams(queryStringUrl);
var endpointUrl = urlParamsEndpoint.get('endpoint');
var title = urlParamsEndpoint.get('title');
document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('container');
    var quizTitle = document.querySelector('.quiz-title');
    var htmlQuiz = "<section id=\"quiz\">\n      <progress title=\"You cannot interact with this cursor\" class=\"update run\" role=\"progressbar\" id=\"progress-bar\"\n        value=\"0\" max=\"100\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" tabindex=\"0\"\n        aria-label=\"Content loading\u2026\"></progress>\n      <!-- Swiper -->\n      <div class=\"swiper swiper-quiz\">\n        <div id=\"container\" class=\"swiper-wrapper\"></div>\n        <div class=\"swiper-button-next\"></div>\n        <div class=\"swiper-button-prev\"></div>\n\n      </div>\n      <p class=\"score\">Score : <span>0</span></p>\n      <aside>\n        <div class=\"countdown-container\" data-duration=\"180\" data-transition=\"linear\" data-color=\"#28af60\"\n          data-size=\"100\" data-position=\"up\"></div>\n      </aside>\n    </section>";
    if (quizTitle && title) {
        quizTitle.innerText = title;
    }
    function fetchData(endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, shuffledData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(endpoint)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        shuffledData = fisherYatesShuffle(data);
                        return [2 /*return*/, shuffledData];
                }
            });
        });
    }
    var mainContainer = document.getElementsByTagName('main')[0];
    if (mainContainer) {
        // mainContainer.innerHTML = htmlQuiz;
        console.log("htmlQuiz");
    }
    function displayQuestions(quiz) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchData(quiz)];
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
                                div.appendChild(nav);
                                var shuffleQuestions = fisherYatesShuffle(question.answers);
                                shuffleQuestions.forEach(function (answer) {
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
    function validateAnswer(quiz) {
        return __awaiter(this, void 0, void 0, function () {
            var data, scoreUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchData(quiz)];
                    case 1:
                        data = _a.sent();
                        scoreUser = 0;
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
                                    if (findQuestion_1 &&
                                        findQuestion_1.correctAnswer.includes(target.textContent)) {
                                        target.classList.add('correct');
                                        scoreUser += 1;
                                        if (container) {
                                            var scoreElement = document.querySelector('.score');
                                            if (scoreElement) {
                                                scoreElement.textContent = "Score : ".concat(scoreUser.toString(), " / ").concat(data.length);
                                            }
                                        }
                                    }
                                    else {
                                        target.classList.add('incorrect');
                                    }
                                    allButtons.forEach(function (button) {
                                        if (button instanceof HTMLButtonElement) {
                                            if (findQuestion_1 &&
                                                button.textContent === findQuestion_1.correctAnswer) {
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
    function displayInside() {
        var htmlPart = "<section id=\"quiz\">\n      <progress title=\"You cannot interact with this cursor\" class=\"update run\" role=\"progressbar\" id=\"progress-bar\"\n        value=\"0\" max=\"100\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" tabindex=\"0\"\n        aria-label=\"Content loading\u2026\"></progress>\n      <!-- Swiper -->\n      <div class=\"swiper swiper-quiz\">\n        <div id=\"container\" class=\"swiper-wrapper\"></div>\n        <div class=\"swiper-button-next\"></div>\n        <div class=\"swiper-button-prev\"></div>\n\n      </div>\n      <p class=\"score\">Score : <span>0</span></p>\n      <aside>\n        <div class=\"countdown-container\" data-duration=\"180\" data-transition=\"linear\" data-color=\"#28af60\"\n          data-size=\"100\" data-position=\"up\"></div>\n      </aside>\n    </section>";
        if (mainContainer) {
            mainContainer.innerHTML = htmlPart;
        }
    }
    var selectBtn = document.querySelectorAll('[data-endpoint]');
    selectBtn.forEach(function (btn) {
        if (btn instanceof HTMLElement) {
            var selectedQuiz = btn.dataset.endpoint;
            console.log(selectedQuiz);
        }
    });
    if (endpointUrl) {
        validateAnswer(endpointUrl);
        displayQuestions(endpointUrl);
    }
});
window.onload = function () {
    var swiperSlide = document.querySelectorAll('.swiper-slide');
    swiperSlide.forEach(function (slide) {
        var pagination = slide.getAttribute('aria-label');
        if (pagination !== null) {
            slide.insertAdjacentHTML('beforeend', "<p class=\"pagination\">".concat(pagination, "</p>"));
        }
    });
};
