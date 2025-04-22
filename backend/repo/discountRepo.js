const Discount  = require("../model/Discount");
const Course = require('../model/Course');

const insertDiscount = async (discountData) => {
    return await Discount.create(discountData);
}

const deleteDiscount = async (discountId) => {
    return await Discount.destroy({
        where: {
            id : discountId
        }
    })
}

const updateDiscount = async (id,percentage) => {
    const discount = await Discount.findByPk(id);
    discount.percentage = percentage;

    await discount.save();
    return discount;
}

const getDiscountByCourse = async (courseId) => {
    return await  Discount.findOne({
        where : {
            courseId
        }
    })
}

module.exports = {
    insertDiscount,
    deleteDiscount,
    updateDiscount,
    getDiscountByCourse
}