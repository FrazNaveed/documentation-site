'use server'

// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Careers } from '@/payload-types'

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
        depth: 3,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const careerListing: Careers[] = careerListingData.docs

      return careerListing
    } catch (error) {
      console.error(`Error fetching getCareerListingBySlug for ${slug}:`, error)
    }
    return []
  },
  [],
  {
    tags: ['careerListingBySlug'],
    revalidate: 60,
  },
)
