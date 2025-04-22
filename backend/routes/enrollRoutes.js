const express = require('express');
const router = express.Router();
const enrollController = require('../controller/enrollController');

router.post("/create", enrollController.insertEnroll);
router.get("/getEnrolls/:id", enrollController.getEnrollsByUser);
router.get("/isEnrolled/in_:course/as_:student", enrollController.isStudentEnrolledInCourse);
router.delete("/deleteEnrolled/in_:course/for_:student", enrollController.deleteEnrollment);
router.get("/getGraphicStats/for_:teacher", enrollController.getStatsForLastMonths);
router.get("/getEnrollsWithDate/for_:teacher", enrollController.getEnrollsWithDate);

module.exports = router;