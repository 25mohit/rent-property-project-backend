const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const bcrypt = require('bcryptjs');
const { generateRandomString } = require('../Utils/Functions');

const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, referCode } = req.body;

  if( !name || !email || !password ){
    return res.status(400).json({status: false, m:"re"})
  }
  
  const existingUser = await User.findOne({ $or: [{ email }] });

  if (existingUser) {
    return res.status(400).json({status: false, m:"ex"})
  }

  let uniqueReferCode = generateRandomString()

  const isReferExists = await User.findOne({referCode: uniqueReferCode})

  if(isReferExists){
    uniqueReferCode = generateRandomString()
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await User.create({
    fullName: name,
    email,
    password: hashedPassword,
    referCode: uniqueReferCode
  });

  if (newUser) {
    return res.status(201).json({ status: true, m: "ss"});
  } else {
    return res.status(200).json({ status: false, m: "un" });
  }
})

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

const UpdateProfile = asyncHandler(async (req, res) => {
  const { id, email, mobile, name } = req.body

  if( !id || !email || ( !mobile && !name)){
    return res.status(200).json({status: false, m:"re"})
  }

  if(mobile){
    const isMobileExists = await User.findOne({ mobileNo: mobile}).select('-_id -password -uuid -createdAt -updatedAt -__v -fullName -email -referCode')

    if(isMobileExists){
      return res.status(200).json({status: false, m:"ex"})
    }
  }
  const isExists = await User.findOne({ uuid: id, email })

  if(!isExists){
    return res.status(200).json({status: false, m:"nf"})
  }

  let updatedFields = {};

  if (mobile) {
    updatedFields.mobileNo = mobile;
  }

  if (name) {
    updatedFields.fullName = name;
  }

  await User.updateOne({ uuid: id, email }, { $set: updatedFields });

  return res.status(200).json({status: true, m:"ss"})
})

module.exports = { RegisterUser, LoginUser, UpdateProfile };
