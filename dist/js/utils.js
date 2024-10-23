export async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  const shuffledData = fisherYatesShuffle(data);
  return shuffledData;
}

export function fisherYatesShuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

export function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export function circularClock() {
  const countdownContainer = document.querySelector('.countdown-container');

  // Injecting the countdown into HTML document

  countdownContainer.innerHTML = `
    <svg id="progress-wrapper" width="500" height="500" viewBox="0 0 500 500">
      <circle cx="250" cy="250" r="200" stroke="#c39fe0" stroke-width="25" fill="transparent" id="progress" />
    </svg>
    <span class="seconds" id="seconds"></span>
`;
  countdownContainer.style.position = 'relative';

  const span = document.querySelector('.seconds');

  span.style.position = 'absolute';
  span.style.color = '#e8deee';
  span.style.fontWeight = '900';
  span.style.top = '50%';
  span.style.left = '50%';
  span.style.transform = 'translate(-50%, -50%)';

  const progressWrapper = document.getElementById('progress-wrapper'),
    progress = document.getElementById('progress'),
    timeSpan = document.getElementById('seconds');

  //  Countdown functions

  const options = {
    duration: +countdownContainer.dataset.duration,
    transition: countdownContainer.dataset.transition,
    color: countdownContainer.dataset.color,
    size: +countdownContainer.dataset.size,
    initialPosition: countdownContainer.dataset.position,
  };

  const circularCountdown = ({
    duration,
    transition,
    color,
    size,
    initialPosition,
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

  const renderSeconds = (duration) => {
    timeSpan.innerHTML = duration;
    const secondsCountdown = setInterval(() => {
      duration--;
      timeSpan.innerHTML = duration;
      if (duration === 0) {
        clearInterval(secondsCountdown);
        timeSpan.innerHTML = `<i class="fa-solid fa-check"></i>`;
      }
    }, 1000);
  };

  const adjustFontSize = (size) => {
    timeSpan.style.fontSize = `${size / 5}px`;
  };

  const adjustCircleSize = (size) => {
    progressWrapper.style.width = size;
    progressWrapper.style.height = size;
  };

  const setInitialPosition = (initialPosition) => {
    if (initialPosition === 'up') {
      progressWrapper.style.transform = 'rotate(270deg)';
    } else if (initialPosition === 'left') {
      progressWrapper.style.transform = 'rotate(180deg)';
    } else if (initialPosition === 'down') {
      progressWrapper.style.transform = 'rotate(90deg)';
    }
  };

  const animationStart = (color, transition, duration) => {
    let length = progress.getTotalLength();
    progress.style.stroke = color;
    progressWrapper.style.strokeDasharray = length;
    progressWrapper.style.animation = `progress ${transition} ${duration}s forwards`;
  };

  const init = () => {
    circularCountdown(options);
  };

  init();
}

export function clockwork() {
  // DEFINE CANVAS AND ITS CONTEXT.
  const canvas = document.getElementById('clock');
  const ctx = canvas.getContext('2d');
  let angle;
  const secHandLength = 72;

  // CLEAR EVERYTHING ON THE CANVAS. RE-DRAW NEW ELEMENTS EVERY SECOND.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  function MARK_THE_HOURS() {
    for (let i = 0; i < 12; i += 1) {
      angle = ((i - 3) * (Math.PI * 2)) / 12; // THE ANGLE TO MARK.
      ctx.lineWidth = 1; // HAND WIDTH.
      ctx.beginPath();

      const x1 = canvas.width / 2 + Math.cos(angle) * secHandLength;
      const y1 = canvas.height / 2 + Math.sin(angle) * secHandLength;
      const x2 =
        canvas.width / 2 +
        Math.cos(angle) * (secHandLength - secHandLength / 7);
      const y2 =
        canvas.height / 2 +
        Math.sin(angle) * (secHandLength - secHandLength / 7);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = '#466B76';
      ctx.stroke();
    }
  }

  function MARK_THE_SECONDS() {
    for (let i = 0; i < 60; i += 1) {
      angle = ((i - 3) * (Math.PI * 2)) / 60; // THE ANGLE TO MARK.
      ctx.lineWidth = 1; // HAND WIDTH.
      ctx.beginPath();

      const x1 = canvas.width / 2 + Math.cos(angle) * secHandLength;
      const y1 = canvas.height / 2 + Math.sin(angle) * secHandLength;
      const x2 =
        canvas.width / 2 +
        Math.cos(angle) * (secHandLength - secHandLength / 30);
      const y2 =
        canvas.height / 2 +
        Math.sin(angle) * (secHandLength - secHandLength / 30);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = '#C4D1D5';
      ctx.stroke();
    }
  }

  MARK_THE_HOURS();
  MARK_THE_SECONDS();
}
