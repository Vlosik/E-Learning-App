const { sequelize } = require("../db");
const enrollRepo = require("../repo/enrollRepo");
const courseService = require("./courseService");
const moment = require('moment');

const insertEnroll = async (enrollData) => {
    return await sequelize.transaction(async (t) => {
        const courseId = enrollData.courseId;
        const studentId = enrollData.studentId;

        const enroll = await enrollRepo.createEnroll({ studentId, courseId }, { transaction: t });

        await courseService.updateCourseSlots(courseId, -1, t);

        return enroll;
    });
}

const getEnrollsByUser = async (studentId) => {
    const enrollments =  await enrollRepo.getEnrollsByUser(studentId);

    const courses = enrollments.map(enroll => {
        const course = enroll.Course;

        const courseJson = course.toJSON();

        if (courseJson.image) {
            courseJson.image = Buffer.from(courseJson.image).toString('base64');
        }

        return courseJson;
    });

    return courses;
}

const isStudentEnrolledInCourse = async (studentId,courseId) => {
    return await enrollRepo.isStudentEnrolledInCourse(studentId,courseId);
}

const deleteEnrollment = async (studentId,courseId) => {
    return await sequelize.transaction(async (t) => {
        console.log('studentId:', studentId, typeof studentId);
        console.log('courseId:', courseId, typeof courseId);
        const enroll = await enrollRepo.deleteEnrollment( studentId, courseId, { transaction: t });

        await courseService.updateCourseSlots(courseId, +1, t);

        return enroll;
    });
}

const getStatsForLastMonths = async(teacherId) => {
    const endDate = moment();
    const startDate = moment().subtract(5, 'months').startOf('month');

    const courses = await courseService.getCoursesByTeacher(teacherId);
    const courseIds = courses.map(course => course.id);

    const enrollments = await enrollRepo.getStatsForLastMonths(courseIds,startDate,endDate);

    const monthCounts = {};
    for (let i = 5; i >= 0; i--) {
        const key = moment().subtract(i, 'months').format('MMMM');
        monthCounts[key] = 0;
    }

    enrollments.forEach(enroll => {
        const month = moment(enroll.enrolledAt).format('MMMM');
        if (monthCounts[month] !== undefined) {
            monthCounts[month]++;
        }
    });

    return Object.entries(monthCounts).map(([month, students]) => ({
        month,
        students
    }));
}

const getEnrollsWithDate = async (teacherId) => {
    const courses = await courseService.getCoursesByTeacher(teacherId);
    const courseIds = courses.map(course => course.id);

    const enrolls = await enrollRepo.getEnrollsWithDate(courseIds);

    const result = enrolls.map(enroll => ({
        username: enroll.User.username,
        course: enroll.Course.title,
        joinDate: enroll.enrolledAt
      }));
    
      return result;
}

module.exports = {
    insertEnroll,
    getEnrollsByUser,
    isStudentEnrolledInCourse,
    deleteEnrollment,
    getStatsForLastMonths,
    getEnrollsWithDate
}