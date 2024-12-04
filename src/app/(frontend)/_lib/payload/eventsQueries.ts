// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from 'src/app/i18n-config'

const payload = await getPayload({ config })

const today = new Date()
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000) // Add 24 hours in milliseconds
const tomorrowIsoDate = tomorrow.toISOString()

export const getUpcomingEvents = unstable_cache(
  async (
    limit = 100,
    page = 1,
  ) => {
    try {
      const eventsData = await payload.find({
        collection: 'events',
        limit,
        page,
        sort: '-startDate',
        where: {
          or: [
            {
              startDate: {
                greater_than_equal: tomorrowIsoDate,
              },
            },
            {
              endDate: {
                greater_than_equal: tomorrowIsoDate,
              },
            },
          ],
        },
      })
      return eventsData
    } catch (error) {
      console.error('Error fetching getUpcomingEvents:', error)
    }
    return null
  },
  [],
  {
    tags: ['upcomingEvents'],
    revalidate: 60,
  },
)

export const getFeaturedEvent = unstable_cache(
  async (
    limit = 1,
    page = 1,
  ) => {
    try {
      const featuredEventData = await payload.find({
        collection: 'events',
        limit,
        page,
        sort: '-startDate',
        where: {
          and: [
            {
              featured: {
                equals: true,
              },
            },
            {
              or: [
                {
                  startDate: {
                    greater_than_equal: tomorrowIsoDate,
                  },
                },
                {
                  endDate: {
                    greater_than_equal: tomorrowIsoDate,
                  },
                },
              ],
            },
          ],
        },
      })
      const featuredEvent = featuredEventData.docs[0]
      return featuredEvent
    } catch (error) {
      console.error('Error fetching getFeaturedEvent:', error)
    }
    return null
  },
  [],
  {
    tags: ['featuredEvent'],
    revalidate: 60,
  },
)

export const getEventGlobalSettings = async (locale: Locale = 'en') => {
  try {
    const globalEventData = await payload.findGlobal({
      slug: 'eventSettings',
      locale,
    })

    return globalEventData
  } catch (error) {
    console.error('Error fetching getEventGlobalSettings: ', error)
  }
  return null
}
