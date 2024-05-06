const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');

// Controller for registering a new user
const RegisterUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, mobileNo } = req.body;

  // Check if user with the provided email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user
  const newUser = await User.create({
    fullName,
    email,
    password,
    mobileNo
  });

  res.status(201).json(newUser);
});

module.exports = { RegisterUser };
