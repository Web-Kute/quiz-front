// Injecting the countdown into HTML document
const countdownContainer = document.querySelector('.countdown-container');

if (countdownContainer) {
  countdownContainer.innerHTML = `
    <svg id="progress-wrapper" width="500" height="500" viewBox="0 0 500 500">
      <circle cx="250" cy="250" r="200" stroke="#c39fe0" stroke-width="25" fill="transparent" id="progress" />
    </svg>
    <span class="seconds" id="seconds"></span>`;
}

if (countdownContainer instanceof HTMLElement) {
  countdownContainer.style.position = 'relative';
}
const span = document.querySelector('.seconds');

if (span instanceof HTMLElement) {
  span.style.position = 'absolute';
  span.style.color = '#e8deee';
  span.style.fontWeight = '900';
  span.style.top = '50%';
  span.style.left = '50%';
  span.style.transform = 'translate(-50%, -50%)';
}

const progressWrapper = document.getElementById('progress-wrapper'),
  progress = document.getElementById('progress'),
  timeSpan = document.getElementById('seconds');

//  Countdown functions
const options = {
  duration: +(countdownContainer?.getAttribute('data-duration') ?? '0'),
  transition: countdownContainer?.getAttribute('data-transition') ?? '',
  color: countdownContainer?.getAttribute('data-color') ?? '',
  size: +(countdownContainer?.getAttribute('data-size') ?? '0'),
  initialPosition: countdownContainer?.getAttribute('data-position') ?? '',
};
// Rendering countdown on HTML
const circularCountdown = ({
  duration,
  transition,
  color,
  size,
  initialPosition,
}: {
  duration: number;
  transition: string;
  color: string;
  size: number;
  initialPosition: string;
}) => {
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
const renderSeconds = (duration: number) => {
  if (timeSpan instanceof HTMLElement) {
    timeSpan.innerHTML = duration.toString();
    const secondsCountdown = setInterval(() => {
      duration--;
      timeSpan.innerHTML = duration.toString();
      if (duration === 0) {
        clearInterval(secondsCountdown);
        timeSpan.innerHTML = `<i class="fa-solid fa-check"></i>`;
      }
    }, 1000);
  }
};
const adjustFontSize = (size: number) => {
  if (timeSpan instanceof HTMLElement) {
    timeSpan.style.fontSize = `${size / 5}px`;
  }
};
const adjustCircleSize = (size: number) => {
  if (progressWrapper) {
    progressWrapper.style.width = `${size}px`;
    progressWrapper.style.height = `${size}px`;
  }
};

const setInitialPosition = (initialPosition: string) => {
  if (progressWrapper) {
    if (initialPosition === 'up') {
      progressWrapper.style.transform = 'rotate(270deg)';
    } else if (initialPosition === 'left') {
      progressWrapper.style.transform = 'rotate(180deg)';
    } else if (initialPosition === 'down') {
      progressWrapper.style.transform = 'rotate(90deg)';
    }
  }
};

const animationStart = (
  color: string,
  transition: string,
  duration: number,
) => {
  if (progress instanceof SVGPathElement && progressWrapper) {
    const length = progress.getTotalLength();
    progress.style.stroke = color;
    progressWrapper.style.strokeDasharray = `${length}`;
    progressWrapper.style.animation = `progress ${transition} ${duration}s forwards`;
  }
};

const init = () => {
  circularCountdown(options);
};

init();
