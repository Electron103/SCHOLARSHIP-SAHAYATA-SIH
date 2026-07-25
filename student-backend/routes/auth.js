// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, createAdmin } = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/create-admin  (temporary; delete after setup)
router.post('/create-admin', createAdmin);

module.exports = router;
