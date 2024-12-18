'use server'

// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const getCareersListings = unstable_cache(
  async (
    limit = 100,
    page = 1,
  ) => {
    try {
      const careersData = await payload.find({
        collection: 'careers',
        limit,
        page,
        sort: '-title',
      })
      return careersData
    } catch (error) {
      console.error('Error fetching getCareersListings:', error)
    }
    return null
  },
  [],
  {
    tags: ['careersListings'],
    revalidate: 60,
  },
)

export default getCareersListings
