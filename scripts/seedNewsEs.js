/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { faker } from '@faker-js/faker'

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api' // Change this to your Payload CMS API URL

const newsIds = await axios.get(`${API_URL}/news`)
  .then((response) => {
    const newsDocs = response.data.docs
    const mappedNewsIds = newsDocs.map((newsType) => +newsType.id)
    return mappedNewsIds
  })
  .catch((error) => console.log(error))

const newsTypesIds = await axios.get(`${API_URL}/news-types`)
  .then((response) => {
    const newsTypesDocs = response.data.docs
    const mappedNewsTypesIds = newsTypesDocs.map((newsType) => +newsType.id)
    return mappedNewsTypesIds
  })
  .catch((error) => console.error(error))

// Function to generate random test data for the news collection
function createNewsFieldsEs() {
  const title = faker.lorem.sentence()
  const titleTagged = `ES ${title}`
  const excerpt = faker.lorem.sentences(3)
  const excerptTagged = `ES ${excerpt}`

  // Randomly assign a type from the list of available types
  const type = faker.helpers.shuffle(newsTypesIds)[0]

  return {
    title: titleTagged,
    excerpt: excerptTagged,
    type,
  }
}

// Functions to seed data into Payload CMS
const seedNewsData = async (newsIdsList, locale) => {
  for (let i = 0; i < newsIdsList.length; i++) {
    const newsId = newsIdsList[i]
    const newsItem = createNewsFieldsEs()
    const restUrl = `${API_URL}/news/${newsId}?locale=${locale}`

    try {
      // console.log(`Trying to POST /news with data: ${JSON.stringify(newsItem)}`);
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.patch(restUrl, newsItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // console.log('POST /news response:', response);
      // console.log(`Created news item ${response.data.id}:`, response.data)
      // console.log(`Created news item ${is + 1}:`, response.data);
    } catch (error) {
      console.warn('Make sure English posts are seeded first.')
      console.error('Error creating news item:', error.response ? error.response.data : error.message)
      console.error('Request headers:', axios.defaults.headers.common)
      console.error('Request body:', newsItem)
    }
  }
}

// Seed news items
seedNewsData(newsIds, 'es')
