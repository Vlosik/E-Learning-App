const userRepo = require("../repo/userRepo");
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {
  const existingUser = await userRepo.findByUsername(userData.username);
  if (existingUser) {
    throw new Error("Email already used!");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await userRepo.createUser({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
};

const verifyUser = async (userData) => {
  const user = await userRepo.findByUsername(userData.username);

  if (!user) {
    throw new Error("Invalid Username");
  }

  const isPasswordValid = await bcrypt.compare(userData.password,user.password);

  if (!isPasswordValid) {
    throw new Error("Wrong Password!");
  }

  user.password = userData.password;

  return user;
};

module.exports = {
  registerUser,
  verifyUser,
};
