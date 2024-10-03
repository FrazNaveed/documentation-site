'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import type { News } from '@/payload-types'

const payload = await getPayloadHMR({ config })

type NewsTypeTypes = 'Flare Updates' | 'AMA & Interviews' | 'Past Events' | 'Ecosystem' | 'Research' | null

const buildWhereClause = (
  type: NewsTypeTypes,
  additionalConditions: object = {},
) => {
  const typeCondition = type ? { 'type.name': { equals: type } } : undefined
  return { ...typeCondition, ...additionalConditions }
}

export const getNewsArchive = async (
  limit = 10,
  page = 1,
  excludedIds: number[] = [],
  type: NewsTypeTypes = null,
) => {
  const newsData = await payload.find({
    collection: 'news',
    limit,
    page,
    sort: '-publishDate',
    where: buildWhereClause(type, {
      id: {
        not_in: excludedIds,
      },
    }),
  })
  return newsData
}

export const getNewsFeatured = async (
  limit = 4,
  type: NewsTypeTypes = null,
) => {
  const newsData = await payload.find({
    collection: 'news',
    limit,
    sort: '-publishDate',
    where: buildWhereClause(type, {
      featuured: {
        equals: true,
      },
    }),
  })

  // Backfill with latest news items if there are fewer than 4 returned from this query
  if (newsData.docs.length < limit) {
    const excludedIds = newsData.docs.map((doc) => doc.id)
    const latestNewsData = await payload.find({
      collection: 'news',
      limit: limit - newsData.docs.length,
      sort: '-publishDate',
      where: buildWhereClause(type, {
        id: {
          not_in: excludedIds,
        },
        featured: {
          not_equals: true,
        },
      }),
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
        equals: slug,
      },
    },
  })

  const news: News[] = newsData.docs

  return news
}
