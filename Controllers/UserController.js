const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const bcrypt = require('bcryptjs');

const RegisterUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, mobileNo, referCode } = req.body;

  if( !fullName || !email || !password ){
    return res.status(400).json({status: false, m:"re"})
  }
  const existingUser = await User.findOne({ $or: [{ email }, { mobileNo }] });

  if (existingUser) {
    return res.status(400).json({status: false, m:"ex"})
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create a new user
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    mobileNo
  });

  if (newUser) {
    return res.status(201).json({ status: true, m: "ss", d: newUser});
  } else {
    return res.status(200).json({ status: false, m: "un" });
  }
});

module.exports = { RegisterUser };
