/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { faker } from '@faker-js/faker'

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api' // Change this to your Payload CMS API URL

const newsTypesIDsEn = await axios.get(`${API_URL}/news-types`)
  .then((response) => {
    const newsTypesDocs = response.data.docs
    const mappedNewsTypesProp = newsTypesDocs.map((newsType) => +newsType.id)
    // console.log('News Type IDs: ', mappedNewsTypesProp)

    return mappedNewsTypesProp
  })
  .catch((error) => console.error(error))

// Functions to add translations seed data
const seedNewsTypesDataForTranslations = async (newsTypes) => {
  const promises = []

  for (let i = 0; i < newsTypes.length; i++) {
    const newsTypeId = newsTypes[i]
    // const newsTypeEs = defaultNewsTypesEs.find((newsType) => newsType.name === 'Ecosistema')
    // const newsTypeDe = defaultNewsTypesDe.find((newsType) => newsType.name === 'Ökosystem')
    const newsTypeNameEs = faker.lorem.word()
    const newsTypeNameEsTagged = `ES ${newsTypeNameEs}`
    const newsTypeSlugEs = faker.lorem.slug()
    const newsTypeNameSlugEsTagged = `es-slug-${newsTypeSlugEs}`
    const newsTypeNameDe = faker.lorem.word()
    const newsTypeNameDeTagged = `DE ${newsTypeNameDe}`
    const newsTypeSlugDe = faker.lorem.slug()
    const newsTypeNameSlugDeTagged = `de-slug-${newsTypeSlugDe}`

    const restUrlEs = `${API_URL}/news-types/${newsTypeId}?locale=es`
    const restUrlDe = `${API_URL}/news-types/${newsTypeId}?locale=de`

    if (newsTypesIDsEn) {
      promises.push(
        axios.patch(restUrlEs, { name: newsTypeNameEsTagged, slug: newsTypeNameSlugEsTagged }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .catch((error) => console.error('Error creating news item for es locale:', error.response ? error.response.data : error.message)),
      )

      promises.push(
        axios.patch(restUrlDe, { name: newsTypeNameDeTagged, slug: newsTypeNameSlugDeTagged }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .catch((error) => console.error('Error creating news item for de locale:', error.response ? error.response.data : error.message)),
      )
    }
  }

  await Promise.all(promises)
}

// Seed translations
seedNewsTypesDataForTranslations(newsTypesIDsEn)
