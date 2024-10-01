import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import type { News } from 'src/payload-types'

const payload = await getPayloadHMR({ config })

export const getNewsData = async (...types: ('Flare Updates' | 'AMA & Interviews' | 'Past Events' | 'Ecosystem' | 'Research' | null)[]) => {
  console.log('types: ', types)
  const newsData = await payload.find({
    collection: 'news',
    sort: '-publishDate',
    where: {
      'type.name': { 
        in: types.filter((type) => type !== null)
      }
    }
  })

  const news: News[] = newsData.docs

  return news
}

export const getNewsBySlug = async (slug: string) => {
  const newsData = await payload.find({
    collection: 'news',
    limit: 1,
    where: {
      slug: {
        equals: slug
      }
    }
  })

  const news: News[] = newsData.docs

  return news
}
