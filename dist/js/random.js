export function fisherYatesShuffle(array) {
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
