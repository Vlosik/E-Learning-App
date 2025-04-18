const enrollRepo = require("../repo/enrollRepo");

const insertEnroll = async (enrollData) => {
    return await enrollRepo.createEnroll(enrollData);
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

module.exports = {
    insertEnroll,
    getEnrollsByUser
}