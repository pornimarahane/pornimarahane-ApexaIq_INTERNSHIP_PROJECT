const express = require('express');
const multer = require('multer');
const { analyzeAndCompareResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// A single protected route for analyzing the resume
router.post('/analyze', protect, upload.single('resume'), analyzeAndCompareResume);

module.exports = router;