// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

// eslint-disable-next-line import/prefer-default-export
export const getDevGuides = unstable_cache(
  async (
    limit = 100,
    page = 1,
  ) => {
    try {
      const devGuideData = await payload.find({
        collection: 'developerGuides',
        limit,
        page,
        sort: '-publishDate',
      })
      return devGuideData
    } catch (error) {
      console.error('Error fetching getDevGuides:', error)
    }
    return null
  },
  [],
  {
    tags: ['developerGuides'],
    revalidate: 60,
  },
)
