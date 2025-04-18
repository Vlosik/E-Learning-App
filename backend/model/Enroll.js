const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Enroll = sequelize.define('Enroll', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Users',         
        key: 'id'               
      },
      onUpdate: 'CASCADE',      
      onDelete: 'CASCADE'
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Courses',         
        key: 'id'               
      },
      onUpdate: 'CASCADE',      
      onDelete: 'CASCADE'
  }
}, {
  timestamps: false,
});

module.exports = Enroll;