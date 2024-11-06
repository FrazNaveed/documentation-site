const inlineBlockMarginStyles = (topMargin?: boolean | null | undefined, bottomMargin?: boolean | null | undefined) => {
  if (!topMargin && !bottomMargin) return undefined

  const classes = []

  if (topMargin) {
    classes.push('standardTopMargin')
  }

  if (bottomMargin) {
    classes.push('standardBottomMargin')
  }

  return classes.join(' ')
}

export default inlineBlockMarginStyles
