'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '@/payload-types'
import type { Locale } from 'src/app/i18n-config'

const payload = await getPayload({ config })

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
