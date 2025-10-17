const axios = require('axios');
require('dotenv').config();

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const findLearningResources = async (skill) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn('YOUTUBE_API_KEY not found in .env file. Skipping learning resources.');
    return [];
  }

  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        q: `${skill} crash course tutorial for beginners`,
        key: apiKey,
        type: 'video',
        maxResults: 3, 
      },
    });

    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.high.url,
      type: 'Video',
      difficulty: 'Beginner', 
      duration: '45' 
    }));
  } catch (error) {
    console.error('Error fetching from YouTube API:', error.response?.data?.error?.message || error.message);
    return [];
  }
};

module.exports = { findLearningResources };