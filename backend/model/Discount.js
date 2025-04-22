const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Discount = sequelize.define('Discount', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

module.exports = Discount;