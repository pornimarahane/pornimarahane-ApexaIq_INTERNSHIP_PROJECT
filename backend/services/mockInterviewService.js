const AppliedJob = require('../models/appliedJobModel');
const { commonQuestions, technicalQuestions } = require('../data/InterviewmockData'); 

/**
 * @param {string} userId 
 * @returns {Promise<Array>} 
 */
const getAppliedJobs = async (userId) => {
   
    return AppliedJob.find({ userId: userId }).select('title');
};

/**
 * @param {string} role - The selected job role.
 * @returns {Object|null} An object with categorized questions or null if not found.
 */
const getInterviewQuestions = (role) => {
    const tech = technicalQuestions[role] || [];
  
    if (tech.length === 0) {
        return null;
    }

    return {
        technical: tech,
        behavioural: commonQuestions.behavioural,
        hr: commonQuestions.hr
    };
};

module.exports = { getAppliedJobs, getInterviewQuestions };