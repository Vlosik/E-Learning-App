const courseRepo = require("../repo/courseRepo");

const addCourse = async (courseData) => {
    const newCourse = await courseRepo.createCourse(courseData);

    return newCourse;
}

const getCourses = async () => {
    const courses = await courseRepo.getCourses(); 

    return courses.map(course => {
        const courseData = course.toJSON();

        if (courseData.image) {
            courseData.image = Buffer.from(courseData.image).toString('base64');
        }

        courseData.percentage = courseData.Discount ? courseData.Discount.percentage : 0;

        delete courseData.Discount;

        return courseData;
    });
};

const getCoursesByTeacher = async (teacherId) => {
    const courses = await courseRepo.getCoursesByTeacher(teacherId);

    return courses.map(course => {
        const courseData = course.toJSON();

        if (courseData.image) {
            courseData.image = Buffer.from(courseData.image).toString('base64');
        }

        courseData.percentage = courseData.Discount ? courseData.Discount.percentage : 0;

        delete courseData.Discount;

        return courseData;
    });
}

const updateCourse = async (courseId, courseData) => {
    courseRepo.updateCourse(courseId, courseData);
}

const deleteCourse = async (courseId) => {
    return await courseRepo.deleteCourse(courseId);
 }

 const getCourseById = async (id, transaction) => {
    return await courseRepo.findById(id, transaction);
  };
  
  const updateCourseSlots = async (id, delta, transaction) => {
    return await courseRepo.updateSlots(id, delta, transaction);
  };

module.exports = {
    addCourse,
    getCourses,
    getCoursesByTeacher,
    updateCourse,
    deleteCourse,
    getCourseById,
    updateCourseSlots
}