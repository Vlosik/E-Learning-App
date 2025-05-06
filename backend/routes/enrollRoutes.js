const express = require('express');
const router = express.Router();
const enrollController = require('../controller/enrollController');
const { authenticateJWT, authorizeRoles } = require('../security/authMiddleware');

router.post("/create", authenticateJWT, authorizeRoles('student'), enrollController.insertEnroll);
router.get("/getEnrolls/:id", authenticateJWT, authorizeRoles('student'), enrollController.getEnrollsByUser);
router.get("/isEnrolled/in_:course/as_:student", authenticateJWT, authorizeRoles('student'), enrollController.isStudentEnrolledInCourse);
router.delete("/deleteEnrolled/in_:course/for_:student", authenticateJWT, authorizeRoles('student'), enrollController.deleteEnrollment);
router.get("/getGraphicStats/for_:teacher", authenticateJWT, authorizeRoles('teacher'), enrollController.getStatsForLastMonths);
router.get("/getEnrollsWithDate/for_:teacher", authenticateJWT, authorizeRoles('teacher'), enrollController.getEnrollsWithDate);

module.exports = router;