const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const multer = require('multer');
const { authenticateJWT, authorizeRoles } = require('../security/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/insert', authenticateJWT, authorizeRoles('teacher'), upload.single('image'), courseController.create);
router.get('/getAll', courseController.getAll);
router.get("/getAll/:id", authenticateJWT, authorizeRoles('teacher'), courseController.getAllByTeacher);
router.put("/update/withImage/:id", authenticateJWT, authorizeRoles('teacher'), upload.single('image'), courseController.updateWithImage);
router.put("/update/:id", authenticateJWT, authorizeRoles('teacher'), upload.none(), courseController.updateWithoutImage);
router.delete("/delete/:id", authenticateJWT, authorizeRoles('teacher'), courseController.deleteCourse);

module.exports = router;