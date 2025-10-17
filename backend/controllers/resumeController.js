const { parseResume } = require('../services/parserService');
const { analyzeResumeSkills } = require('../services/resumeService');
const fs = require('fs');

const analyzeAndCompareResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No resume file uploaded.' });
  }

  try {
    //  Parse the uploaded resume to get the user's skills
    const parsedData = await parseResume(req.file.path);
    if (!parsedData.skills || parsedData.skills.length === 0) {
      return res.status(400).json({ message: 'Could not find any skills in the uploaded resume.' });
    }

    // Analyze the user's skills against the predefined job roles
    const analysisResults = analyzeResumeSkills(parsedData.skills);
    
    //  Send the results back to the frontend
    res.status(200).json(analysisResults);

  } catch (error) {
    console.error('Error during resume analysis:', error);
    res.status(500).json({ message: 'Server error during resume analysis.' });
  } finally {
    //  Clean up the temporary file
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

module.exports = { analyzeAndCompareResume };