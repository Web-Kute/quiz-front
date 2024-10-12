var _a, _b, _c, _d, _e;
// Injecting the countdown into HTML document
var countdownContainer = document.querySelector('.countdown-container');
if (countdownContainer) {
    countdownContainer.innerHTML = "\n    <svg id=\"progress-wrapper\" width=\"500\" height=\"500\" viewBox=\"0 0 500 500\">\n      <circle cx=\"250\" cy=\"250\" r=\"200\" stroke=\"#c39fe0\" stroke-width=\"25\" fill=\"transparent\" id=\"progress\" />\n    </svg>\n    <span class=\"seconds\" id=\"seconds\"></span>";
}
if (countdownContainer instanceof HTMLElement) {
    countdownContainer.style.position = 'relative';
}
var span = document.querySelector('.seconds');
if (span instanceof HTMLElement) {
    span.style.position = 'absolute';
    span.style.color = '#e8deee';
    span.style.fontWeight = '900';
    span.style.top = '50%';
    span.style.left = '50%';
    span.style.transform = 'translate(-50%, -50%)';
}
var progressWrapper = document.getElementById('progress-wrapper'), progress = document.getElementById('progress'), timeSpan = document.getElementById('seconds');
//  Countdown functions
var options = {
    duration: +((_a = countdownContainer === null || countdownContainer === void 0 ? void 0 : countdownContainer.getAttribute('data-duration')) !== null && _a !== void 0 ? _a : '0'),
    transition: (_b = countdownContainer === null || countdownContainer === void 0 ? void 0 : countdownContainer.getAttribute('data-transition')) !== null && _b !== void 0 ? _b : '',
    color: (_c = countdownContainer === null || countdownContainer === void 0 ? void 0 : countdownContainer.getAttribute('data-color')) !== null && _c !== void 0 ? _c : '',
    size: +((_d = countdownContainer === null || countdownContainer === void 0 ? void 0 : countdownContainer.getAttribute('data-size')) !== null && _d !== void 0 ? _d : '0'),
    initialPosition: (_e = countdownContainer === null || countdownContainer === void 0 ? void 0 : countdownContainer.getAttribute('data-position')) !== null && _e !== void 0 ? _e : '',
};
// Rendering countdown on HTML
var circularCountdown = function (_a) {
    var duration = _a.duration, transition = _a.transition, color = _a.color, size = _a.size, initialPosition = _a.initialPosition;
    // Rendering countdown on HTML
    renderSeconds(duration);
    // Adjusting timer font-size depending of countdown size
    adjustFontSize(size);
    // Adjusting circular countdown size
    adjustCircleSize(size);
    // Setting initial position of countdown
    setInitialPosition(initialPosition);
    // Starting animation (setting transition, color and duration)
    animationStart(color, transition, duration);
};
var renderSeconds = function (duration) {
    if (timeSpan instanceof HTMLElement) {
        timeSpan.innerHTML = duration.toString();
        var secondsCountdown_1 = setInterval(function () {
            duration--;
            timeSpan.innerHTML = duration.toString();
            if (duration === 0) {
                clearInterval(secondsCountdown_1);
                timeSpan.innerHTML = "<i class=\"fa-solid fa-check\"></i>";
            }
        }, 1000);
    }
};
var adjustFontSize = function (size) {
    if (timeSpan instanceof HTMLElement) {
        timeSpan.style.fontSize = "".concat(size / 5, "px");
    }
};
var adjustCircleSize = function (size) {
    if (progressWrapper) {
        progressWrapper.style.width = "".concat(size, "px");
        progressWrapper.style.height = "".concat(size, "px");
    }
};
var setInitialPosition = function (initialPosition) {
    if (progressWrapper) {
        if (initialPosition === 'up') {
            progressWrapper.style.transform = 'rotate(270deg)';
        }
        else if (initialPosition === 'left') {
            progressWrapper.style.transform = 'rotate(180deg)';
        }
        else if (initialPosition === 'down') {
            progressWrapper.style.transform = 'rotate(90deg)';
        }
    }
};
var animationStart = function (color, transition, duration) {
    if (progress instanceof SVGPathElement && progressWrapper) {
        var length_1 = progress.getTotalLength();
        progress.style.stroke = color;
        progressWrapper.style.strokeDasharray = "".concat(length_1);
        progressWrapper.style.animation = "progress ".concat(transition, " ").concat(duration, "s forwards");
    }
};
var init = function () {
    circularCountdown(options);
};
init();
