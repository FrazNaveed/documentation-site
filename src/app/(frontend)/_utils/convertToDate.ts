import getDateTimeLocale from './getDateTimeLocale'
import type { TLocales } from '../_types/locales'

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
      year: 'numeric',
    },
  }
  const formattedDate = new Date(timestamp).toLocaleDateString(
    getDateTimeLocale(locale),
    dateFormat[format],
  )

  return formattedDate
}

export default convertToDate
