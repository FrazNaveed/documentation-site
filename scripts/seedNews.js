/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { faker } from '@faker-js/faker'

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api' // Change this to your Payload CMS API URL

// Function to generate random users for the users collection
// While authors are currently not used for news articles, this is a good look into relationships between collections
const createRandomUser = () => {
  const email = faker.internet.email()
  const loginAttempts = Math.floor(Math.random() * 10) + 1
  const password = 'password'

  return {
    email,
    password,
    loginAttempts,
  }
}

const userIds = await axios.get(`${API_URL}/users`)
  .then((response) => {
    const usersDocs = response.data.docs
    const mappedUserIds = usersDocs.map((user) => +user.id)
    return mappedUserIds
  })
  .catch((error) => console.error(error))

const newsTypesIds = await axios.get(`${API_URL}/news-types`)
  .then((response) => {
    const newsTypesDocs = response.data.docs
    const mappedNewsTypesIds = newsTypesDocs.map((newsType) => +newsType.id)
    return mappedNewsTypesIds
  })
  .catch((error) => console.error(error))

// Function to generate random test data for the news collection
function createRandomNewsItem() {
  const title = faker.lorem.sentence()
  const slug = faker.helpers.slugify(title.replace(/\.$/, '').toLowerCase())
  const excerpt = faker.lorem.sentences(3)
  const publishDate = faker.date.past()

  // Randomly assign an author from Users collection
  const author = faker.helpers.shuffle(userIds)[0]

  // Randomly assign a type from a set of predefined types
  // const types = ['Flare Updates', 'AMA & Interviews', 'Past Events', 'Ecosystem', 'Research']
  const type = faker.helpers.shuffle(newsTypesIds)[0]

  // Randomly set pin boolean to true or false
  const pin = faker.datatype.boolean()

  // Randomly set pinPriority to a number between 0 and 3.
  const priorities = ['0', '1', '2', '3']
  const pinPriority = pin ? faker.helpers.shuffle(priorities)[0] : '0'

  return {
    title,
    slug,
    author,
    excerpt,
    publishDate,
    type,
    pin,
    pinPriority,
  }
}

// Functions to seed data into Payload CMS
const seedUserData = async (numOfUsers = 5) => {
  for (let i = 0; i < numOfUsers; i++) {
    const user = createRandomUser()

    try {
      console.log(`Trying to POST /news with data: ${JSON.stringify(user)}`)
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.post(`${API_URL}/users`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('POST /users response:', response)
    } catch (error) {
      console.error('Error creating news item:', error.response ? error.response.data : error.message)
      console.error('Request headers:', axios.defaults.headers.common)
      console.error('Request body:', user)
    }
  }
}

const seedNewsData = async (numOfItems = 10) => {
  for (let i = 0; i < numOfItems; i++) {
    const newsItem = createRandomNewsItem()

    try {
      // console.log(`Trying to POST /news with data: ${JSON.stringify(newsItem)}`);
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.post(`${API_URL}/news`, newsItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // console.log('POST /news response:', response);
      console.log(`Created news item ${response.data.id}:`, response.data)
      // console.log(`Created news item ${is + 1}:`, response.data);
    } catch (error) {
      console.error('Error creating news item:', error.response ? error.response.data : error.message)
      console.error('Request headers:', axios.defaults.headers.common)
      console.error('Request body:', newsItem)
    }
  }
}

// Seed 5 users
// seedUserData();

// Seed 10 news items
seedNewsData(10)
