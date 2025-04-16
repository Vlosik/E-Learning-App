const userService = require('../service/userService');

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User created with success.', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
    try {
        const user = await userService.verifyUser(req.body);
        res.status(201).json({ message: 'User found.', user });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

module.exports = {
  register,
  login
};
