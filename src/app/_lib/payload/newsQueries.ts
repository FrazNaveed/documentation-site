import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

export const getNewsData = async () => {
  const newsData = await payload.find({
    collection: 'news',
  })

  const news = newsData.docs

  return news
}

export const getNewsDataByType = async (type: ('Flare Updates' | 'AMA & Interviews' | 'Past Events' | 'Ecosystem' | 'Research') | null) => {
  const newsData = await payload.find({
    collection: 'news',
    where: {
      type: {
        equals: type,
      },
    },
  })

  const news = newsData.docs

  return news
}
