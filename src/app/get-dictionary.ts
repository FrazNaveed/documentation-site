import 'server-only'
import type { Locale } from './i18n-config'
import { JsonObject } from 'payload';

const dictionaries = {
  en: () => import('src/app/(frontend)/dictionaries/en.json').then((module) => module.default),
  de: () => import('src/app/(frontend)/dictionaries/de.json').then((module) => module.default),
  es: () => import ('src/app/(frontend)/dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = (locale: Locale): Promise<JsonObject> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
}
