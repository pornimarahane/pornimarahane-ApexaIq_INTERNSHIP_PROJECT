const express = require('express');
const multer = require('multer');
const { 
  uploadAndParseResume, 
  trackApplication, 
  getAppliedJobTitles 
} = require('../controllers/usercontroller');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Existing protected routes
router.post('/upload-resume', protect, upload.single('resume'), uploadAndParseResume);
router.post('/track-application', protect, trackApplication);

// ADD THE NEW ROUTE for getting the job titles
router.get('/applied-job-titles', protect, getAppliedJobTitles);

module.exports = router;