const { Model } = require('sequelize');
const Course = require('../model/Course');
const Discount = require('../model/Discount');

const createCourse = async (courseData,) => {
    return await Course.create(courseData);
}

const getCourses = async () => {
    return await Course.findAll(
        {
            include: [
                {
                    model: Discount,
                    attributes: ['percentage'],
                    require: false
                }
            ]
        }
    );
}

const getCoursesByTeacher = async (teacherId) => {
    return await Course.findAll({
        where : {teacher : teacherId},
        include: [
            {
                model: Discount,
                attributes: ['percentage'],
                require: false
            }
        ]
    })
}

const updateCourse = async (courseId, courseData) => {
    const [rowsUpdated] = await Course.update(
      courseData,
      {
        where: { id: courseId }
      }
    );
}

const deleteCourse = async (courseId) => {
  return await Course.destroy({
      where: { id : courseId}
  });
}

const findById = async (id, transaction = null) => {
    return await Course.findByPk(id, { transaction });
  };
  
const updateSlots = async (id, delta, transaction = null) => {
    const course = await Course.findByPk(id, { transaction });
    if (!course) throw new Error("Course not found");
  
    course.slots += delta;
    if (course.slots < 0) throw new Error("Not enough slots");
  
    await course.save({ transaction });
    return course;
};
  
module.exports = {
    createCourse,
    getCourses,
    getCoursesByTeacher,
    updateCourse,
    deleteCourse,
    findById,
    updateSlots
}