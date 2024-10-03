export type TDateFormat = 'short'

const convertToDate = (
  timestamp: string,
  format: TDateFormat = 'short',
  locale: 'en' | 'es' | 'de' = 'en',
): string => {
  const locales = {
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE',
  }
  const dateFormat: { [key: string]: Intl.DateTimeFormatOptions } = {
    short: {
      month: 'short',
      day: 'numeric',
    },
  }
  const formattedDate = new Date(timestamp).toLocaleDateString(
    locales[locale],
    dateFormat[format],
  )

  return formattedDate
}

export default convertToDate
