const courseRepo = require("../repo/courseRepo");

const addCourse = async (courseData) => {
    const newCourse = await courseRepo.createCourse(courseData);

    return newCourse;
}

const getCourses = async () => {
    const courses = await courseRepo.getCourses();

    return courses.map(course => {
        const courseJson = course.toJSON();

        if (courseJson.image) {
            courseJson.image = Buffer.from(courseJson.image).toString('base64');
        }

        return courseJson;
    });
}

const getCoursesByTeacher = async (teacherId) => {
    const courses = await courseRepo.getCoursesByTeacher(teacherId);

    return courses.map(course => {
        const courseJson = course.toJSON();

        if (courseJson.image) {
            courseJson.image = Buffer.from(courseJson.image).toString('base64');
        }

        return courseJson;
    });
}

module.exports = {
    addCourse,
    getCourses,
    getCoursesByTeacher
}