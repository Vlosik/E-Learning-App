const Course = require('../model/Course');

const createCourse = async (courseData) => {
    return await Course.create(courseData);
}

const getCourses = async () => {
    return await Course.findAll();
}

const getCoursesByTeacher = async (teacherId) => {
    return await Course.findAll({
        where : {teacher : teacherId}
    })
}

module.exports = {
    createCourse,
    getCourses,
    getCoursesByTeacher
}