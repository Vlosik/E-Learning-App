const Course = require('./Course');
const User = require('./User');
const Enroll = require('./Enroll');


Course.belongsTo(User, {
  foreignKey: 'teacher',
  as: 'owner' 
});

Enroll.belongsTo(Course, { foreignKey: 'courseId' });
Enroll.belongsTo(User, { foreignKey: 'studentId' });

User.hasMany(Course, {
  foreignKey: 'teacher'
});


module.exports = {
  Course,
  User,
  Enroll
};
