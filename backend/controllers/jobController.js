const User = require('../models/userModel');
const { fetchJobsFromAdzuna } = require('../services/adzunaService');
const { calculateEnhancedFitScore } = require('../services/matchingService');

const searchJobs = async (req, res) => {
  //  REMOVE userId from the query parameters
  const { what, where } = req.query;
  //  GET the userId securely from the middleware
  const userId = req.user.id;

  if (!what || !where) {
    return res.status(400).json({ message: 'Missing search parameters: what, where' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const adzunaJobs = await fetchJobsFromAdzuna(what, where);

    const jobsWithFitScore = adzunaJobs.map(job => {
      const fitScore = calculateEnhancedFitScore(user, job);
      
      return {
        id: job.id,
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        description: job.description,
        applyUrl: job.redirect_url,
        postedAt: job.created,
        fitScore,
      };
    });

  console.log(`Found ${jobsWithFitScore.length} jobs to send to the frontend.`);

    res.status(200).json(jobsWithFitScore);
  } catch (error) {
    console.error("Error in searchJobs controller:", error);
    res.status(500).json({ message: "Server error while searching for jobs." });
  }
};

module.exports = { searchJobs };