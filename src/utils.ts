// Fisher-Yates Shuffle Algorithm for shuffling elements in an array.
// This algorithm guarantees a uniform random permutation.
// Returns a copy of the shuffled array.
// Refer to Fisher-Yates Shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export function fisherYatesShuffle<T>(array: T[]): T[] {
  // Clone the array to avoid modifying the original
  const shuffledArray = [...array];

  // Iterate through the array in reverse order
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index 'j' between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices 'i' and 'j'
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

// Control progress bar
// let progressTime;
// const progressBarTime = () => {
//   const elapsedStartTime = Date.now() / 1000 - startTime;
//   const startHours = Math.floor((elapsedStartTime / 3600) % 24);
//   const startMinutes = Math.floor((elapsedStartTime / 60) % 60);
//   const startSeconds = Math.floor(elapsedStartTime % 60);
//   progressTime =
//     startHours === 0
//       ? `progression: ${startMinutes} minnute ${startSeconds} seconde`
//       : `progression: ${startHours} heure ${startMinutes} minute ${startSeconds} seconde`;
// };

// progressBarTime();

// const updateTimers = () => {
//   const elapsedTime = Date.now() / 1000 - startTime;
//   const sizeProgress = Math.floor((elapsedTime * 100) / durationData);
//   progressBar.style.setProperty('--widthprogress', '0');
//   const percentTime = (originalMediaElement.currentTime * 100) / durationData;

//   const elapsedTimeFromStart = sizeProgress + percentTime;

//   if (elapsedTimeFromStart > 100) {
//     progressBar.style.setProperty('--widthprogress', '100%');
//   }

//   progressBar.style.setProperty(
//     '--widthprogress',
//     `${Math.min(elapsedTimeFromStart.toFixed(3), 100)}%`,
//   );
// };

