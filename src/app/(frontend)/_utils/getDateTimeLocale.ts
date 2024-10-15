export type TLocales = 'en' | 'es' | 'de'

const getDateTimeLocale = (
  locale: TLocales = 'en',
): string => {
  const locales = {
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE',
  }

  return locales[locale]
}

export default getDateTimeLocale
