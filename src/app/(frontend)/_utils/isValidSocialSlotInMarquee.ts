// Social Links are only allowed in small card slots. Check the index to see if it's a small card slot.
function isValidSocialSlotInMarquee(index: number) {
  const isValidSocialSlot = index === 1 || index === 2 || index === 3
    || index % 10 === 6 || index % 10 === 7 || index % 10 === 8
    || (index > 9 && (index % 10 === 0 || index % 10 === 1 || index % 10 === 2))
  return isValidSocialSlot
}

export default isValidSocialSlotInMarquee
