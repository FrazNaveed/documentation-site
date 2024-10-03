/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { faker } from '@faker-js/faker'

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api' // Change this to your Payload CMS API URL

// Function to generate random users for the users collection
const createRandomUser = (emailOverride) => {
  const email = emailOverride || faker.internet.email()
  const loginAttempts = Math.floor(Math.random() * 10) + 1
  const password = 'password'

  return {
    email,
    password,
    loginAttempts,
  }
}

// Fetching user IDs from the API
const getUserIds = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`)
    const usersDocs = response.data.docs
    return usersDocs.map((user) => +user.id)
  } catch (error) {
    console.error('Error fetching user IDs:', error.response ? error.response.data : error.message)
    return []
  }
}

// Fetching news types from the API
const getNewsTypesIds = async () => {
  try {
    const response = await axios.get(`${API_URL}/news-types`)
    const newsTypesDocs = response.data.docs
    return newsTypesDocs.map((newsType) => +newsType.id)
  } catch (error) {
    console.error('Error fetching news types:', error.response ? error.response.data : error.message)
    return []
  }
}

// Function to generate random test data for the news collection
const createRandomNewsItem = (userIds, newsTypesIds) => {
  const title = faker.lorem.sentence()
  const slug = faker.helpers.slugify(title.replace(/\.$/, '').toLowerCase())
  const excerpt = faker.lorem.sentences(3)
  const publishDate = faker.date.past()

  // Randomly assign an author from Users collection
  const author = faker.helpers.shuffle(userIds)[0]

  // Randomly assign a type from news types collection
  const type = faker.helpers.shuffle(newsTypesIds)[0]

  return {
    title,
    slug,
    author,
    excerpt,
    publishDate,
    type,
  }
}

// Function to seed user data into Payload CMS
const seedUserData = async (numOfUsers = 5) => {
  const userPromises = []
  for (let i = 0; i < numOfUsers; i++) {
    let user = createRandomUser()
    if (i === 0) { // add one known user to the first iteration
      user = createRandomUser('test@alephsf.com')
    }
    console.log(`POST /users with data: ${JSON.stringify(user)}`)
    userPromises.push(
      axios.post(`${API_URL}/users`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('User created:', response.data)
      }).catch((error) => {
        console.error('Error creating user:', error.response ? error.response.data : error.message)
      }),
    )
  }
  await Promise.all(userPromises)
}

// Function to seed news data into Payload CMS
const seedNewsData = async (userIds, newsTypesIds, numOfItems = 10) => {
  const newsPromises = []
  for (let i = 0; i < numOfItems; i++) {
    const newsItem = createRandomNewsItem(userIds, newsTypesIds)
    console.log(`POST /news with data: ${JSON.stringify(newsItem)}`)
    newsPromises.push(
      axios.post(`${API_URL}/news`, newsItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log(`Created news item ${response.data.id}:`, response.data)
      }).catch((error) => {
        console.error('Error creating news item:', error.response ? error.response.data : error.message)
      }),
    )
  }
  await Promise.all(newsPromises)
}

// Main function to handle the seeding process
const main = async () => {
  // Fetch user IDs before seeding users
  let userIds = await getUserIds()

  // If there are no user IDs, seed users first
  if (userIds.length === 0) {
    console.log('No users found in the database, seeding new users...')
    await seedUserData(5) // Seed 5 users

    // Fetch the user IDs again after seeding new users
    userIds = await getUserIds()

    // If seeding users failed (i.e., userIds is still empty), abort
    if (userIds.length === 0) {
      console.error('Failed to seed users, aborting the process.')
      return
    }
  } else {
    console.log(`Found ${userIds.length} users in the database, proceeding with news item seeding...`)
  }

  // Fetch news type IDs
  const newsTypesIds = await getNewsTypesIds()
  if (newsTypesIds.length === 0) {
    console.error('No news types found, aborting news item creation.')
    return
  }

  // Seed 55 news items
  await seedNewsData(userIds, newsTypesIds, 55)
}

// Start the seeding process
main()
