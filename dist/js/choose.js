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
// import Swiper from 'swiper';
var Swiper = require('swiper');
document.addEventListener('DOMContentLoaded', function () {
    var welcome = document.getElementById('welcome');
    var chooseNav = document.getElementById('choose-nav');
    var mainContent = document.getElementById('main-content');
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var userName = urlParams.get('name');
    if (userName !== null && welcome) {
        welcome.innerHTML = "Bienvenue ".concat(userName);
    }
    if (chooseNav) {
        chooseNav.addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName === 'BUTTON') {
                displayInside();
            }
            // e.stopPropagation();
        });
    }
    var htmlQuiz = "<section id=\"quiz\">\n      <progress title=\"You cannot interact with this cursor\" class=\"update run\" role=\"progressbar\" id=\"progress-bar\"\n        value=\"0\" max=\"100\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" tabindex=\"0\"\n        aria-label=\"Content loading\u2026\"></progress>\n      <!-- Swiper -->\n      <div class=\"swiper swiper-quiz\">\n        <div id=\"container\" class=\"swiper-wrapper\"></div>\n        <div class=\"swiper-button-next\"></div>\n        <div class=\"swiper-button-prev\"></div>\n\n      </div>\n      <p class=\"score\">Score : <span>0</span></p>\n      <aside>\n        <div class=\"countdown-container\" data-duration=\"180\" data-transition=\"linear\" data-color=\"#28af60\"\n          data-size=\"100\" data-position=\"up\"></div>\n      </aside>\n    </section>";
    // const mainContainer = document.getElementsByTagName('main')[0];
    function displayInside() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (mainContent) {
                            mainContent.innerHTML = htmlQuiz;
                        }
                        return [4 /*yield*/, displayQuestions()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // function initSwiper(): void {
    //   const swiper = new Swiper('.swiper-quiz', {
    //     cssMode: true,
    //     direction: 'vertical',
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
    //     pagination: {
    //       el: '.swiper-pagination',
    //     },
    //     mousewheel: true,
    //     keyboard: true,
    //   });
    //   swiper.on('slideChange', function () {
    //     const progressBar = document.getElementById('progress-bar');
    //     if (progressBar instanceof HTMLProgressElement) {
    //       progressBar.value = swiper.progress * 110;
    //     }
    //   });
    // }
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
                        // const shuffledData = fisherYatesShuffle(data);
                        return [2 /*return*/, data];
                }
            });
        });
    }
    function displayQuestions() {
        return __awaiter(this, void 0, void 0, function () {
            var container, data, swiper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('displayQuestions');
                        container = document.getElementById('container');
                        return [4 /*yield*/, fetchData('data/html.json')];
                    case 1:
                        data = _a.sent();
                        if (Array.isArray(data)) {
                            data.forEach(function (question) {
                                var div = document.createElement('div');
                                div.className = 'swiper-slide';
                                if (container) {
                                    container.appendChild(div);
                                }
                                var title = document.createElement('h3');
                                title.textContent = question.question;
                                div.appendChild(title);
                                var nav = document.createElement('nav');
                                nav.className = 'swiper__quiz-slider';
                                div.appendChild(nav);
                                question.answers.forEach(function (answer) {
                                    var button = document.createElement('button');
                                    button.className = 'answer-item';
                                    button.textContent = answer;
                                    nav.appendChild(button);
                                });
                            });
                        }
                        swiper = new Swiper('.swiper-quiz', {
                            cssMode: true,
                            direction: 'vertical',
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            mousewheel: true,
                            keyboard: true,
                        });
                        swiper.on('slideChange', function () {
                            var progressBar = document.getElementById('progress-bar');
                            if (progressBar instanceof HTMLProgressElement) {
                                progressBar.value = swiper.progress * 110;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
});
