const User = require('../models/userModel');
const AppliedJob = require('../models/appliedJobModel');
const { fetchJobsFromAdzuna } = require('../services/adzunaService');
const { calculateEnhancedFitScore } = require('../services/matchingService');

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

   // Get User Data
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    //  Get Progress Stats
    const applicationCount = await AppliedJob.countDocuments({ userId });
    
    // Fetch a few recommended jobs based on user's top skills
    let recommendedJobs = [];
    if (user.skills && user.skills.length > 0) {
        const topSkills = user.skills.slice(0, 2).join(' ');
        const adzunaJobs = await fetchJobsFromAdzuna(topSkills, 'India');
        recommendedJobs = adzunaJobs.slice(0, 3).map(job => { // Take top 3
            const fitScore = calculateEnhancedFitScore(user, job);
            return {
                id: job.id,
                title: job.title,
                company: job.company.display_name,
                location: job.location.display_name,
                fitScore,
                // You can add a placeholder for companyLogo or fetch it from another service
                companyLogo: `https://logo.clearbit.com/${job.company.display_name.toLowerCase().replace(/ /g, '')}.com`
            };
        });
    }

    //  Assemble the dashboard data object
    const dashboardData = {
        userData: {
            fullName: user.name,
            // Placeholder avatar, you can add this to your userModel later
            avatarUrl: 'https://images.pexels.com/photos/3765129/pexels-photo-3765129.jpeg?auto=compress&cs=tinysrgb&w=200'
        },
        userProgress: {
            jobFitScore: 88, // Placeholder, this could be an average of applied jobs
            skillsCompleted: user.skills.length,
            totalSkills: user.skills.length + 5, // Placeholder for total skills to learn
            mockInterviewsDone: 0, // Placeholder until you build the interview session model
            gdSessionsDone: 0 // Placeholder
        },
        detailedStats: {
            resumeScore: '85/100', // Placeholder
            activeApplications: applicationCount
        },
        topJobs: recommendedJobs
    };

    res.status(200).json(dashboardData);

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: 'Server error fetching dashboard data.' });
  }
};

module.exports = { getDashboardData };