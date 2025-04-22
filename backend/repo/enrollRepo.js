const { Op } = require('sequelize');
const Enroll = require('../model/Enroll');
const Course = require('../model/Course');
const User = require('../model/User');

const createEnroll = async (enrollData, options = {}) => {
    return await Enroll.create(enrollData,options);
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

const isStudentEnrolledInCourse = async (studentId, courseId) => {
    const enrollment = await Enroll.findOne({
        where: { studentId, courseId },
    });
    return !!enrollment; 
};

const deleteEnrollment = async (studentId,courseId, options = {}) => {
    return await Enroll.destroy({
        where: {
            studentId,
            courseId
        },
        ...options
    })
}

const getStatsForLastMonths = async (courseIds,startDate,endDate) => {
    return await Enroll.findAll({
        where: {
            courseId: { [Op.in] : courseIds},
            enrolledAt: {
                [Op.between]: [startDate.toDate(), endDate.endOf('month').toDate()]
            }
        }
    })
}

const getEnrollsWithDate = async (courseIds) => {
    return await Enroll.findAll({
        where: {
          courseId: { [Op.in]: courseIds }
        },
        include: [
          {
            model: User,
            attributes: ['username'] 
          },
          {
            model: Course,
            attributes: ['title'] 
          }
        ],
        attributes: ['enrolledAt']
    });

}

module.exports = {
    createEnroll,
    getEnrollsByUser,
    isStudentEnrolledInCourse,
    deleteEnrollment,
    getStatsForLastMonths,
    getEnrollsWithDate
}