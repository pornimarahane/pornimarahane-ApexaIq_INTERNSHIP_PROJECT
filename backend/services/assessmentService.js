const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();


const { mockAssessments } = require('./mockData.js');


const DEMO_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(DEMO_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 Cleans the AI's raw text response to extract a valid JSON string.
 @param {string} rawText - The raw string from the AI, which might be wrapped in ```json ... ```.
 @returns {string} A clean JSON string.
 */

const cleanJsonString = (rawText) => {
const match = rawText.match(/```json\n([\s\S]*?)\n```/);
return match ? match[1] : rawText;
};

/**
 * and falls back to local mock data upon failure.
 * @param {string} skill The skill to be assessed (e.g., 'javascript').
 * @param {string} jobTitle The job title for which the assessment is relevant.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of question objects.
 */
const generateAssessment = async (skill, jobTitle) => {
  const prompt = `
    Generate exactly 5 multiple-choice questions to assess a candidate's proficiency in "${skill}" for a "${jobTitle}" role.
    The questions should range from medium to high complexity.
    Return the response as a single, valid JSON array of objects. Do not include any other text or explanations.
    Each object in the array must have exactly three keys:
    1. "question": A string containing the question text.
    2. "options": An array of exactly 4 string options.
    3. "correctAnswer": A string that is an exact match to one of the 4 options.
 `;

 try {
    console.log("Attempting to fetch assessment from Gemini API...");
    // This API call is guaranteed to fail because the API key is invalid.
   const result = await model.generateContent(prompt);
const response = await result.response;
const rawText = await response.text();
const jsonString = cleanJsonString(rawText);
const questions = JSON.parse(jsonString);

if (!Array.isArray(questions) || questions.length === 0) {
throw new Error('AI returned invalid or empty array.');
}

return questions;

} catch (error) {
    // This catch block will always be executed in the current demo setup.
console.error('Gemini API connection failed. Activating fallback to local mock data.');
    
    const skillKey = skill.toLowerCase();
    if (mockAssessments[skillKey]) {
      console.log(`Successfully loaded mock assessment for skill: "${skillKey}"`);
      // Return the first 5 questions to keep the output consistent with the prompt.
      return mockAssessments[skillKey].slice(0, 5);
    } else {
      console.warn(`No mock data found for skill: "${skill}". Returning empty array.`);
      return [];
    }
}
};

module.exports = { generateAssessment };

