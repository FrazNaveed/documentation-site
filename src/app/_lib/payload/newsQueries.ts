import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

const getNewsData = async (...types: ('Flare Updates' | 'AMA & Interviews' | 'Past Events' | 'Ecosystem' | 'Research' | null)[]) => {
  const whereClause: { [key: string]: any } = {}

  if (types.length > 0) {
    whereClause.type = {
      in: types.filter((t) => t !== null),
    }
  }

  const newsData = await payload.find({
    collection: 'news',
    where: whereClause,
  })

  const news = newsData.docs

  return news
}

export default getNewsData
