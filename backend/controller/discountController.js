const discountService = require("../service/discountService");

const createDiscount = async (req, res) => {
    try {
      const discount = await discountService.insertDiscount(req.body);
      res.status(201).json(discount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const deleteDiscount = async (req, res) => {
    discountId = req.params.id;
    try {
      const discount = await discountService.deleteDiscount(discountId);
      res.status(201).json(discount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const getDiscountByCourse = async (req, res) => {
    courseId = req.params.courseId;
    try {
      const discount = await discountService.getDiscount(courseId);
      res.status(201).json(discount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  

const updateDiscount = async (req, res) => {
    discountId = req.params.id;
    percentage = req.params.percentage;
    try {
      const discount = await discountService.updateDiscount(discountId,percentage);
      res.status(201).json(discount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports = {
    createDiscount,
    updateDiscount,
    deleteDiscount,
    getDiscountByCourse
}