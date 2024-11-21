'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import type { Page } from '@/payload-types'
import type { Locale } from 'src/app/i18n-config'

const payload = await getPayloadHMR({ config })

// eslint-disable-next-line import/prefer-default-export
export const getPageBySlug = async (slug: string, locale: Locale = 'en') => {
  try {
    const pageData = await payload.find({
      collection: 'pages',
      limit: 1,
      depth: 3,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    const page: Page[] = pageData.docs

    return page
  } catch (error) {
    console.error(`Error fetching getPageBySlug for ${slug}:`, error)
  }
  return []
}

export const getGlobalSocialChannels = async (locale: Locale = 'en') => {
  try {
    const globalSocialChannelsData = await payload.findGlobal({
      slug: 'social-channels',
      locale,
    })

    return globalSocialChannelsData
  } catch (error) {
    console.error('Error fetching getGlobalSocialChannels: ', error)
  }
  return {}
}

export const getPageFooterCtaSocialChannels = async (locale: Locale = 'en') => {
  try {
    const globalPageFooterCtaSocialChannels = await payload.findGlobal({
      slug: 'selectPageFooterCtaSocialChannels',
      locale,
    })

    return globalPageFooterCtaSocialChannels
  } catch (error) {
    console.error('Error fetching getPageFooterCtaSocialChannels: ', error)
  }
  return { selectSocialChannels: null }
}
