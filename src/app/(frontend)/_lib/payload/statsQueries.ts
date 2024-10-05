'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

export default async function getStatsBlockFromPage(slug: string) {
  try {
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (result.docs.length === 0) {
      throw new Error('No page found with that slug')
    }

    const pageData = result.docs[0]
    const statsBlock = pageData.components?.find((block) => block.blockType === 'stats')

    if (!statsBlock) {
      throw new Error('No stats block found on the page')
    }

    return statsBlock
  } catch (error) {
    console.error(`Error fetching stats block from page: ${slug}`, error)

    return null
  }
}
