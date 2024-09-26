/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { faker } from '@faker-js/faker'

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api' // Change this to your Payload CMS API URL

export const newsTypesIDs = await axios.get(`${API_URL}/news-types`)
  .then((response) => {
    const newsTypesDocs = response.data.docs
    const mappedNewsTypesProp = newsTypesDocs.map((newsType) => +newsType.id)
    // console.log('News Type IDs: ', mappedNewsTypesProp)

    return mappedNewsTypesProp
  })
  .catch((error) => console.error(error))

// Functions to add translations seed data
export const seedNewsTypesDataForTranslations = async (newsTypes, locale) => {
  //  const promises = []

  for (let i = 0; i < newsTypes.length; i++) {
    const newsTypeId = newsTypes[i]
    // const newsTypeEs = defaultNewsTypesEs.find((newsType) => newsType.name === 'Ecosistema')
    // const newsTypeDe = defaultNewsTypesDe.find((newsType) => newsType.name === 'Ökosystem')
    const newsTypeName = faker.lorem.word()
    const newsTypeNameTagged = `${locale.toUpperCase()} ${newsTypeName}`
    const newsTypeSlug = faker.lorem.slug()
    const newsTypeNameSlugTagged = `${locale}-slug-${newsTypeSlug}`

    const restUrl = `${API_URL}/news-types/${newsTypeId}?locale=${locale}`

    if (newsTypesIDs) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const respsonse = await axios.patch(
          restUrl,
          {
            name: newsTypeNameTagged,
            slug: newsTypeNameSlugTagged,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      } catch (error) {
        console.error(
          `Error creating news item for ${locale} locale:`,
          error.response ? error.response.data : error.message,
        )
      }

      // promises.push(
      //   axios.patch(restUrlDe, { name: newsTypeNameDeTagged, slug: newsTypeNameSlugDeTagged }, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   })
      //     .catch((error) => console.error('Error creating news item for de locale:',
      //  error.response ? error.response.data : error.message)),
      // )
    }
  }

  // await Promise.all(promises)
}

// Seed translations
seedNewsTypesDataForTranslations(newsTypesIDs, 'de')
