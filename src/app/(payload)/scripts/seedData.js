import axios from 'axios'
import { faker } from '@faker-js/faker'

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api'; // Change this to your Payload CMS API URL

// Function to generate random test data for the news collection
const createRandomNewsItem = () => {
  const title = faker.lorem.sentence();
  const slug = faker.helpers.slugify(title.replace(/\.$/, '').toLowerCase());
  const excerpt = faker.lorem.sentences(3);
  const publishDate = faker.date.past();
  
  // Randomly assign a type from a set of predefined types
  const types = ['Flare Updates', 'AMA & Interviews', 'Past Events', 'Ecosystem', 'Research'];
  const type = faker.helpers.shuffle(types)[0];

  // Randomly set pin boolean to true or false
  const pin = faker.datatype.boolean();

  // Randomly set pinPriority to a number between 0 and 3.
  const priorities = ['0', '1', '2', '3'];
  const pinPriority = pin ? faker.helpers.shuffle(priorities)[0] : '0';

  return {
    title,
    slug,
    excerpt,
    publishDate,
    type,
    pin,
    pinPriority,
  };
};

// Function to seed data into Payload CMS
const seedNewsData = async (numOfItems = 10) => {
  for (let i = 0; i < numOfItems; i++) {
    const newsItem = createRandomNewsItem();

    try {
      // console.log(`Trying to POST /news with data: ${JSON.stringify(newsItem)}`);
      const response = await axios.post(`${API_URL}/news`, newsItem, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // console.log('POST /news response:', response);
      // console.log(`Created news item ${response.data.id}:`, response.data);
      // console.log(`Created news item ${i + 1}:`, response.data);
    } catch (error) {
      console.error('Error creating news item:', error.response ? error.response.data : error.message);
      console.error('Request headers:', axios.defaults.headers.common);
      console.error('Request body:', newsItem);
    }
  }
};

// Seed 10 news items
seedNewsData(10);
