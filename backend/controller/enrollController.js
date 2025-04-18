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

module.exports = {
    insertEnroll,
    getEnrollsByUser
}