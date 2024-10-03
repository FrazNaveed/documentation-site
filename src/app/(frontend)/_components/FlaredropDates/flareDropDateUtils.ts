interface DropDate {
    dropDate: string
    flr: number
  }

const parseDropDate = (dropDateStr: string): Date => {
  const [month, day, year] = dropDateStr.split('/')
  return new Date(Date.UTC(+year, +month - 1, +day))
}

const formatDropDate = (dropDateStr: string): string => {
  const dateObj = parseDropDate(dropDateStr)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj)
}

const getNextDropDate = (datesArray: DropDate[]): string => {
  const currentDate = new Date()
  const futureDates = datesArray
    .map((item) => {
      const dropDateObj = parseDropDate(item.dropDate)
      return { ...item, dropDateObj }
    })
    .filter((item) => item.dropDateObj > currentDate)
    .sort((a, b) => a.dropDateObj.getTime() - b.dropDateObj.getTime())

  return futureDates.length > 0
    ? formatDropDate(futureDates[0].dropDate)
    : 'No upcoming drop dates found.'
}

const isDropDateInThePast = (dropDateStr: string): boolean => {
  const dropDate = parseDropDate(dropDateStr)
  dropDate.setUTCHours(23, 59, 59)
  return dropDate < new Date()
}

const getNewYear = (datesArray: DropDate[], index: number): string | false => {
  const currentYear = parseDropDate(datesArray[index].dropDate).getUTCFullYear().toString()
  if (index === 0) return currentYear

  const previousYear = parseDropDate(datesArray[index - 1].dropDate).getUTCFullYear().toString()
  return currentYear !== previousYear ? currentYear : false
}

  interface AggregateResult {
    awarded: number
    toAward: number
  }

const calculateAwardTotals = (datesArray: DropDate[]): AggregateResult => {
  const currentDate = new Date()

  const { awarded, toAward } = datesArray.reduce((acc, item) => {
    const dropDateObj = parseDropDate(item.dropDate)
    if (dropDateObj.getTime() < currentDate.getTime()) {
      acc.awarded += item.flr
    } else {
      acc.toAward += item.flr
    }
    return acc
  }, { awarded: 0, toAward: 0 })

  return { awarded, toAward }
}

export {
  formatDropDate, getNextDropDate, isDropDateInThePast, getNewYear, calculateAwardTotals,
}
