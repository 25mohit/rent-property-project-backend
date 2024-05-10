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
    mobileNo,
    referCode
  });

  if (newUser) {
    return res.status(201).json({ status: true, m: "ss"});
  } else {
    return res.status(200).json({ status: false, m: "un" });
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if(!email || !password ) {
    return res.status(200).json({status: false, m:"re"})
  }

  const user = await User.findOne({ email }).select('-_id -mobileNo -referCode -createdAt -updatedAt')

  if(!user){
    return res.status(200).json({status: false, m: "nf"})
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(200).json({ status: false, m:"iv" });
  }

  const payload = {
    fullName: user.fullName,
    email: user.email,
    uuid: user.uuid,
  }

  return res.status(200).json({ status: true, m: "ss", d: payload })
})

module.exports = { RegisterUser, LoginUser };
