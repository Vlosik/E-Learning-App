const express = require('express');
const router = express.Router();
const discountController = require('../controller/discountController');

router.post("/create", discountController.createDiscount);
router.get("/getDiscount/by=:courseId", discountController.getDiscountByCourse);
router.delete("/delete/:id", discountController.deleteDiscount);
router.put("/update/:id-:percentage", discountController.updateDiscount);

module.exports = router;