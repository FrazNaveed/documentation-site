import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

const getNewsData = async () => {
  const newsData = await payload.find({
    collection: 'news',
  })

  const news = newsData.docs

  return news
}

export default getNewsData
