import payload from 'payload'

const getNewsData = async () => {
  const newsData = await payload.find({
    collection: 'users',
  })

  return newsData
}

export default getNewsData
