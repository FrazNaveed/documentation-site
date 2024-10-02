import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import type { News } from '@/payload-types'

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

export const getNewsArchive = async (
  limit = 10,
  page = 1,
  excludedIds: number[] = [],
  type: 'Flare Updates' | 'AMA & Interviews' | 'Past Events' | 'Ecosystem' | 'Research' | null = null,
) => {
  console.log('type: ', type)
  const whereType = type ? { 'type.name': { equals: type } } : undefined
  const newsData = await payload.find({
    collection: 'news',
    limit,
    page,
    sort: '-publishDate',
    where: {
      ...whereType,
      id: {
        not_in: excludedIds
      },
    }
  })

  const news: News[] = newsData.docs

  return news
}

export const getNewsPinned = async (
  limit = 4,
  type: 'Flare Updates' | 'AMA & Interviews' | 'Past Events' | 'Ecosystem' | 'Research' | null = null,
) => {
  console.log('type: ', type)
  const whereType = type ? { 'type.name': { equals: type } } : undefined
  const newsData = await payload.find({
    collection: 'news',
    limit,
    sort: 'pinPriority',
    where: {
      ...whereType,
      pin: {
        equals: true,
      }
    }
  })

  // Backfill with latest news items if there are fewer than 4 returned from this query
  if (newsData.docs.length < limit) {
    const latestNewsData = await payload.find({
      collection: 'news',
      limit: limit - newsData.docs.length,
      sort: '-publishDate',
      where: {
        ...whereType,
      }
    })
    newsData.docs.push(...latestNewsData.docs)
  }

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
