const Course = require('./Course');
const User = require('./User');
const Enroll = require('./Enroll');
const Discount = require('./Discount');


Course.belongsTo(User, {
  foreignKey: 'teacher',
  as: 'owner' 
});

Course.hasOne(Discount, { foreignKey: 'courseId' });

Enroll.belongsTo(Course, { foreignKey: 'courseId' });
Enroll.belongsTo(User, { foreignKey: 'studentId' });

Discount.belongsTo(Course, { foreignKey: 'courseId' });

User.hasMany(Course, {
  foreignKey: 'teacher'
});


module.exports = {
  Course,
  User,
  Enroll,
  Discount
};
