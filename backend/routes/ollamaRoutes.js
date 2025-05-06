const express = require('express');
const router = express.Router();
const ollamaController = require('../controller/ollamaController');
const { authenticateJWT, authorizeRoles } = require('../security/authMiddleware');

router.post('/chat', authenticateJWT, authorizeRoles('student'), ollamaController.handleChat);

module.exports = router;
