import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

// eslint-disable-next-line import/prefer-default-export
export const getDevGuides = async (
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
}
