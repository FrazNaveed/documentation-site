/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from 'axios'

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api' // Change this to your Payload CMS API URL

const defaultNewsTypes = [
  { name: 'Flare Updates', slug: 'updates' },
  { name: 'AMA & Interviews', slug: 'ama-interviews' },
  { name: 'Past Events', slug: 'past-events' },
  { name: 'Ecosystem', slug: 'ecosystem' },
  { name: 'Research', slug: 'research' },
]

// Functions to seed data into Payload CMS
const seedNewsTypesData = async (newsTypes) => {
  for (let i = 0; i < newsTypes.length; i++) {
    const newsType = newsTypes[i]
    try {
      // console.log(`Trying to POST /news with data: ${JSON.stringify(newsType)}`);
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.post(`${API_URL}/news-types`, newsType, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // console.log('POST /news-types response:', response);
      // console.log(`Created news item ${is + 1}:`, response.data);
    } catch (error) {
      console.error('Error creating news item:', error.response ? error.response.data : error.message)
      console.error('Request headers:', axios.defaults.headers.common)
      console.error('Request body:', newsType)
    }
  }
}

// Seed default News Types
seedNewsTypesData(defaultNewsTypes)
// .then(() => console.log('Default News types seeded successfully'))
// .catch((error) => console.error('Seeding failed: ', error))
