const mockInterviewService = require('../services/mockInterviewService');
const he = require('he'); // To decode characters like '&'

exports.getUserAppliedJobs = async (req, res) => {
    try {
        // Correctly gets the user ID from the protect middleware
        const userId = req.user.id;
        const jobs = await mockInterviewService.getAppliedJobs(userId);

        // Decode any HTML characters in job titles before sending
        const decodedJobs = jobs.map(job => {
            const jobObject = job.toObject ? job.toObject() : job;
            if (jobObject.title) {
                jobObject.title = he.decode(jobObject.title);
            }
            return jobObject;
        });

        res.json(decodedJobs);

    } catch (error) {
        // This block is crucial. It catches server errors and sends a formatted response.
        console.error("Error in getUserAppliedJobs controller:", error);
        res.status(500).json({ message: 'Server error: Failed to fetch applied jobs.' });
    }
};

exports.getInterviewQuestions = (req, res) => {
    try {
        const { role } = req.params;
        const questions = mockInterviewService.getInterviewQuestions(role);

        if (!questions) {
            return res.status(404).json({ message: `No questions found for role: ${role}` });
        }
        
        res.json(questions);
    } catch (error) {
        console.error("Error in getInterviewQuestions controller:", error);
        res.status(500).json({ message: 'Server error: Failed to fetch questions.' });
    }
};