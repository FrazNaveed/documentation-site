import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import type { News } from 'src/payload-types'

const payload = await getPayloadHMR({ config })

const getNewsData = async (...types: ('Flare Updates' | 'AMA & Interviews' | 'Past Events' | 'Ecosystem' | 'Research' | null)[]) => {
  const newsData = await payload.find({
    collection: 'news',
    where: {
      'type.name': { 
        in: types.filter((type) => type !== null)
      }
    }
  })

  const news: News[] = newsData.docs

  return news
}

export default getNewsData
