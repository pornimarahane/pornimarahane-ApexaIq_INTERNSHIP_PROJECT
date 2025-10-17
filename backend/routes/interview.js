const express = require('express');
const router = express.Router();
const { 
    getUserAppliedJobs, 
    getInterviewQuestions 
} = require('../controllers/mockInterviewController');
const { protect } = require('../middleware/authMiddleware');


router.get('/applied-jobs', protect, getUserAppliedJobs);

// Defines the route for getting questions for a specific role
router.get('/questions/:role', protect, getInterviewQuestions);

module.exports = router;