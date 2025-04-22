const enrollService = require("../service/enrollService");

const insertEnroll = async (req, res) => {
    try {
        const enroll = await enrollService.insertEnroll(req.body);
        res.status(201).json(enroll);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
};

const getEnrollsByUser = async (req,res) => {
    const studentId = req.params.id;
    try {
        const enrolls = await enrollService.getEnrollsByUser(studentId);
        res.status(201).json(enrolls);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
};

const isStudentEnrolledInCourse = async (req,res) => {
    const studentId = req.params.student;
    const courseId = req.params.course;
    try {
        const enrolled = await enrollService.isStudentEnrolledInCourse(studentId,courseId);
        res.status(201).json({ enrolled });
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

const getStatsForLastMonths = async (req,res) => {
    const teacherId = req.params.teacher;
    try {
        const enrolled = await enrollService.getStatsForLastMonths(teacherId);
        res.status(201).json({ enrolled });
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

const getEnrollsWithDate = async (req,res) => {
    const teacherId = req.params.teacher;
    try {
        const enrolled = await enrollService.getEnrollsWithDate(teacherId);
        res.status(201).json({ enrolled });
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

const deleteEnrollment = async (req,res) => {
    const studentId = req.params.student;
    const courseId = req.params.course;
    try {
        const deleteEnroll = await enrollService.deleteEnrollment(studentId,courseId);
        res.status(201).json({ deleteEnroll });
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

module.exports = {
    insertEnroll,
    getEnrollsByUser,
    isStudentEnrolledInCourse,
    deleteEnrollment,
    getStatsForLastMonths,
    getEnrollsWithDate
}