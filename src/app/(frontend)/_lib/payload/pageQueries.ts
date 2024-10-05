'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import type { Page } from '@/payload-types'
import type { Locale } from 'src/app/i18n-config'

const payload = await getPayloadHMR({ config })

// eslint-disable-next-line import/prefer-default-export
export const getPageBySlug = async (slug: string, locale: Locale = 'en') => {
  const pageData = await payload.find({
    collection: 'pages',
    limit: 1,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page: Page[] = pageData.docs

  return page
}
