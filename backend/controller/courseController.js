const courseService = require("../service/courseService");

const create = async (req, res) => {
  try {
    const {
      title,
      description,
      field,
      startDate,
      endDate,
      sessions,
      slots,
      language,
      price,
      teacher,
    } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const image = req.file.buffer;

    const courseData = {
      title,
      description,
      field,
      startDate,
      endDate,
      sessions,
      slots,
      language,
      price,
      teacher,
      image, 
    }

    const course = await courseService.addCourse(courseData);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const courses = await courseService.getCourses();
    res.status(201).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllByTeacher = async (req, res) => {
  const teacherId = req.params.id;
  try {
    const courses = await courseService.getCoursesByTeacher(teacherId);
    res.status(201).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateWithImage = async (req, res) => {
  const courseId = req.params.id;
  try {
    const {
      title,
      description,
      field,
      startDate,
      endDate,
      sessions,
      slots,
      language,
      price,
      teacher,
    } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const image = req.file.buffer;

    const courseData = {
      title,
      description,
      field,
      startDate,
      endDate,
      sessions,
      slots,
      language,
      price,
      teacher,
      image, 
    }

    await courseService.updateCourse(courseId,courseData);
    res.status(201).json({ message : "Succes"});
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.stack);
  }
};

const updateWithoutImage = async (req, res) => {
  const courseId = req.params.id;
  try {
    const {
      title,
      description,
      field,
      startDate,
      endDate,
      sessions,
      slots,
      language,
      price,
      teacher,
    } = req.body;

    const courseData = {
      title,
      description,
      field,
      startDate,
      endDate,
      sessions,
      slots,
      language,
      price,
      teacher,
    }

    await courseService.updateCourse(courseId,courseData);
    res.status(201).json({ message : "Succes"});
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.stack);
  }
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await courseService.deleteCourse(courseId);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.stack);
  }
};

module.exports = {
  create,
  getAll,
  getAllByTeacher,
  updateWithImage,
  updateWithoutImage,
  deleteCourse
};
