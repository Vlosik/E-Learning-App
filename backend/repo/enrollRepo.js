const Enroll = require('../model/Enroll');
const Course = require('../model/Course');

const createEnroll = async (enrollData) => {
    return await Enroll.create(enrollData);
}

const getEnrollsByUser = async (studentId) => {
    return await Enroll.findAll({
        where: { studentId },
        include: [
            {
                model: Course 
            }
        ]
    })
}



module.exports = {
    createEnroll,
    getEnrollsByUser,
}