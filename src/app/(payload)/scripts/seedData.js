const axios = require('axios');
const faker = require('faker');

// Define the base URL of your Payload CMS
const API_URL = 'http://localhost:3000/api'; // Change this to your Payload CMS API URL
const API_KEY = 'YOUR_API_KEY'; // Replace with your Payload API key if necessary

// Function to generate random test data for the news collection
const createRandomNewsItem = () => {
  const title = faker.lorem.sentence();
  const slug = faker.helpers.slugify(title);
  const excerpt = faker.lorem.sentences(3);
  const publishDate = faker.date.past();
  
  // Randomly assign a type from a set of predefined types
  const types = ['flareUpdates', 'amaInterviews', 'pastEvents', 'ecosystem', 'research'];
  const type = faker.helpers.randomize(types);

  return {
    title,
    slug,
    excerpt,
    publishDate,
    type
  };
};

// Function to seed data into Payload CMS
const seedNewsData = async (numOfItems = 10) => {
  for (let i = 0; i < numOfItems; i++) {
    const newsItem = createRandomNewsItem();

    try {
      const response = await axios.post(`${API_URL}/news`, newsItem, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(`Created news item ${i + 1}:`, response.data);
    } catch (error: any) {
      console.error('Error creating news item:', error.response ? error.response.data : error.message);
    }
  }
};

// Seed 10 news items
seedNewsData(10);
