export async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  const shuffledData = fisherYatesShuffle(data);
  return shuffledData;
}
