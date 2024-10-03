export function toShortBillion(num: number) {
  // Divide by 1 billion and round to one decimal place
  let formattedNum = (num / 1e9).toFixed(1);

  // Add the 'b' suffix
  return `${formattedNum}b`;
}
