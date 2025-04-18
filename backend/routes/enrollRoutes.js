const express = require('express');
const router = express.Router();
const enrollController = require('../controller/enrollController');

router.post("/create", enrollController.insertEnroll);
router.get("/getEnrolls/:id", enrollController.getEnrollsByUser);

module.exports = router;