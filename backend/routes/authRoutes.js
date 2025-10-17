// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// When a POST request comes to /api/auth/signup, run the signup function
router.post('/signup', signup);

// When a POST request comes to /api/auth/login, run the login function
router.post('/login', login);

module.exports = router;