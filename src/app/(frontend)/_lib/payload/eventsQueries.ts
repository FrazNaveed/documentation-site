import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

const today = new Date()
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000) // Add 24 hours in milliseconds
const tomorrowIsoDate = tomorrow.toISOString()

export const getEventsArchive = async (
  limit = 100,
  page = 1,
) => {
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
}

export const getFeaturedEvent = async (
  limit = 1,
  page = 1,
) => {
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
}
