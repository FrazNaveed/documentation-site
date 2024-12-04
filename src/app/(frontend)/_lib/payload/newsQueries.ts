'use server'

// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { News, NewsType } from '@/payload-types'

const payload = await getPayload({ config })

const buildWhereClause = (
  type: number | null,
  additionalConditions: object = {},
) => {
  const typeCondition = type ? { type: { equals: type } } : undefined
  return { ...typeCondition, ...additionalConditions }
}

export const getNewsArchive = unstable_cache(
  async (
    limit = 10,
    page = 1,
    excludedIds: number[] = [],
    type: number | null = null,
  ) => {
    try {
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
    } catch (error) {
      console.error('Error fetching getNewsArchive:', error)
    }
    return null
  },
  [],
  {
    tags: ['newsArchive'],
    revalidate: 60,
  },
)

export const getNewsFeatured = unstable_cache(
  async (
    limit = 4,
    type: number | null | undefined = null,
  ) => {
    try {
      const newsData = await payload.find({
        collection: 'news',
        limit,
        sort: '-publishDate',
        where: buildWhereClause(type, {
          featured: {
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
    } catch (error) {
      console.error('Error fetching getNewsFeatured:', error)
    }
    return []
  },
  [],
  {
    tags: ['newsFeatured'],
    revalidate: 60,
  },
)

export const getNewsBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const newsData = await payload.find({
        collection: 'news',
        limit: 1,
        depth: 3,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const news: News[] = newsData.docs

      return news
    } catch (error) {
      console.error(`Error fetching getNewsBySlug for ${slug}:`, error)
    }
    return []
  },
  [],
  {
    tags: ['newsBySlug'],
    revalidate: 60,
  },
)

export const getNewsTypeBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const newsData = await payload.find({
        collection: 'news-types',
        limit: 1,
        depth: 3,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const newsTypes: NewsType[] = newsData.docs

      return newsTypes
    } catch (error) {
      console.error(`Error fetching getNewsTypeBySlug for ${slug}:`, error)
    }
    return []
  },
  [],
  {
    tags: ['newsTypeBySlug'],
    revalidate: 60,
  },
)
