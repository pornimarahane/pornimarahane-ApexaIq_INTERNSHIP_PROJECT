const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// This route is protected; only a logged-in user can access it.
router.get('/', protect, getDashboardData);

module.exports = router;