const express = require('express');
const router = express.Router();
const { analyzeJobSkills, getAssessment } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeJobSkills);
router.get('/assessment', protect, getAssessment);

module.exports = router;