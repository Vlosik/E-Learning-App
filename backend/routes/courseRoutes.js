const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/insert', upload.single('image'), courseController.create);
router.get('/getAll', courseController.getAll);
router.get("/getAll/:id", courseController.getAllByTeacher);

module.exports = router;