const User = require('../model/User');

const createUser = async (userData) => {
  return await User.create(userData); 
};

const findByUsername = async (username) => {
    return await User.findOne({ where: { username } });
  };

module.exports = {
    createUser,
    findByUsername,
};