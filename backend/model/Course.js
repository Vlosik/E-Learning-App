const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  field: {
    type: DataTypes.ENUM('economic', 'it', 'arts', 'human'),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  sessions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  slots: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teacher: {
    type: DataTypes.INTEGER, 
    allowNull: false,        
    references: {
      model: 'Users',         
      key: 'id'               
    },
    onUpdate: 'CASCADE',      
    onDelete: 'RESTRICT'     
  },
}, {
  timestamps: false,
});

module.exports = Course;