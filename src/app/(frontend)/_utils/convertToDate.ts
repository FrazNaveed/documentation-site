import getDateTimeLocale from './getDateTimeLocale'
import type { TLocales } from './getDateTimeLocale'

export type TDateFormat = 'short'

const convertToDate = (
  timestamp: string,
  format: TDateFormat = 'short',
  locale: TLocales = 'en',
): string => {
  const dateFormat: { [key: string]: Intl.DateTimeFormatOptions } = {
    short: {
      month: 'short',
      day: 'numeric',
    },
  }
  const formattedDate = new Date(timestamp).toLocaleDateString(
    getDateTimeLocale(locale),
    dateFormat[format],
  )

  return formattedDate
}

export default convertToDate
