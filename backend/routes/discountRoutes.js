const express = require('express');
const router = express.Router();
const discountController = require('../controller/discountController');
const { authenticateJWT, authorizeRoles } = require('../security/authMiddleware');

router.post("/create", authenticateJWT, authorizeRoles('teacher'), discountController.createDiscount);
router.get("/getDiscount/by=:courseId", authenticateJWT, authorizeRoles('teacher'), discountController.getDiscountByCourse);
router.delete("/delete/:id", authenticateJWT, authorizeRoles('teacher'), discountController.deleteDiscount);
router.put("/update/:id-:percentage", authenticateJWT, authorizeRoles('teacher'), discountController.updateDiscount);

module.exports = router;