const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uplearn', 'root', 'adrian1302', {
  host: 'localhost',
  dialect: 'mysql',
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connect to Sequalize');
  } catch (error) {
    console.error('Error for connecting to Sequelize:', error);
  }
};

module.exports = { sequelize, connect };