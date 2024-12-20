'use server'

// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CareerListing } from '../../_components/CareersPage/CareersPage'

const payload = await getPayload({ config })

export const getCareersListings = unstable_cache(
  async (
    limit = 100,
    page = 1,
  ) => {
    try {
      const careersData = await payload.find({
        collection: 'careers',
        limit,
        page,
        sort: 'title',
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

export const getCareerListingBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const careerListingData = await payload.find({
        collection: 'careers',
        limit: 1,
        depth: 1,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const [careerListing] = careerListingData.docs as unknown as CareerListing[]

      return careerListing ? [careerListing] : []
    } catch (error) {
      console.error(`Error fetching getCareerListingBySlug for ${slug}:`, error)
    }
    return [] as CareerListing[]
  },
  [],
  {
    tags: ['careerListingBySlug'],
    revalidate: 60,
  },
)
