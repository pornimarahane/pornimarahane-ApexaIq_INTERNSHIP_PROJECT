const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://api.adzuna.com/v1/api/jobs/in/search/1';

const fetchJobsFromAdzuna = async (what, where) => {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    throw new Error('Adzuna API credentials are not defined in .env file.');
  }

  // Parameters sent to the Adzuna API
  const params = {
    app_id: appId,
    app_key: appKey,
    results_per_page: 20,
    what,
    where,
  };

  console.log(`Sending request to Adzuna URL: ${API_URL}`);
  console.log('With params:', params);
  
  try {
    const response = await axios.get(API_URL, { params });
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching jobs from Adzuna:', error.response?.data || error.message);
    return [];
  }
};

module.exports = { fetchJobsFromAdzuna };