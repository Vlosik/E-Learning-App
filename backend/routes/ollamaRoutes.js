const express = require('express');
const router = express.Router();
const ollamaController = require('../controller/ollamaController');

router.post('/chat', ollamaController.handleChat);

module.exports = router;
