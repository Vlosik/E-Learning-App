const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

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
        const token = jwt.sign({
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
          phone: user.phone,
          role: user.role
          }, SECRET, { expiresIn: '1h'}
        );
        res.status(201).json({ message: 'User found.', token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

module.exports = {
  register,
  login
};
