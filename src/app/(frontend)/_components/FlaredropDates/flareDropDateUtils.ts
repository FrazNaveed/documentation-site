interface DropDate {
    dropDate: string
    flr: number
  }
  
  const formatDropDate = (dropDateStr: string): string => {
    const [month, day, year] = dropDateStr.split('/')
    const dateObj = new Date(Date.UTC(+year, +month - 1, +day))
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(dateObj)
  }
  
  const getNextDropDate = (datesArray: DropDate[]): string => {
    const currentDate = new Date()
    const futureDates = datesArray
      .map(item => ({
        ...item,
        dropDateObj: new Date(Date.UTC(+item.dropDate.split('/')[2], +item.dropDate.split('/')[0] - 1, +item.dropDate.split('/')[1]))
      }))
      .filter(item => item.dropDateObj > currentDate)
      .sort((a, b) => a.dropDateObj.getTime() - b.dropDateObj.getTime())
  
    return futureDates.length > 0
      ? formatDropDate(futureDates[0].dropDate)
      : 'No upcoming drop dates found.'
  }
  
  const isDropDateInThePast = (dropDateStr: string): boolean => {
    const [month, day, year] = dropDateStr.split('/')
    const dropDate = new Date(Date.UTC(+year, +month - 1, +day, 23, 59, 59))
    return dropDate < new Date()
  }
  
  const getNewYear = (datesArray: DropDate[], index: number): string | false => {
    const currentYear = datesArray[index].dropDate.split('/')[2]
    if (index === 0) return currentYear
  
    const previousYear = datesArray[index - 1].dropDate.split('/')[2]
    return currentYear !== previousYear ? currentYear : false
  }

  interface AggregateResult {
    awarded: number
    toAward: number
  }
  
  const calculateAwardTotals = (datesArray: DropDate[]): AggregateResult => {
    const currentDate = new Date()
    let awarded = 0
    let toAward = 0
  
    datesArray.forEach(item => {
      const [month, day, year] = item.dropDate.split('/')
      const dropDateObj = new Date(Date.UTC(+year, +month - 1, +day))
  
      if (dropDateObj < currentDate) {
        awarded += item.flr
      } else {
        toAward += item.flr
      }
    })
  
    return { awarded, toAward }
  }
  

  export { formatDropDate, getNextDropDate, isDropDateInThePast, getNewYear, calculateAwardTotals }
  