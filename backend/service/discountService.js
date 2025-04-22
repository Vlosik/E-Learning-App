const discountRepo = require("../repo/discountRepo");

const insertDiscount = async (discountData) => {
    return await discountRepo.insertDiscount(discountData);
}

const deleteDiscount = async (discountId) => {
    return await discountRepo.deleteDiscount(discountId);
}

const updateDiscount = async (id, percentage) => {
    return await discountRepo.updateDiscount(id,percentage);
}

const getDiscount = async (courseId) => {
    return await discountRepo.getDiscountByCourse(courseId);
}
module.exports = {
    insertDiscount,
    deleteDiscount,
    updateDiscount,
    getDiscount
}