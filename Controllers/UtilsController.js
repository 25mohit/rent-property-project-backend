const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const Otp = require('../Model/OtpModel');
const bcrypt = require('bcryptjs');
const { generateOTP, transporter } = require('../Utils/Nodemailer');

const CheckEmailRecord = asyncHandler(async (req, res) => {
    const { email, name } = req.body
    if(!email || !name ){
        return res.status(200).json({status: false, m: "re"})
    }

    const isExists = await User.findOne({ email })

    if(isExists){
        return res.status(200).json({status: true, m: "ex"})
    }

    const newOtp = generateOTP()

    const otpCheckRes = await Otp.findOne({email})
    
    if(otpCheckRes){
        await Otp.findOneAndDelete({ email });
        return res.status(200).json({status: false, m:"cl" , field: 'otp'})
    }

    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 2);

    const saveOTP = new Otp({ email, otp: newOtp, validTill: otpExpiry})
    await saveOTP.save();

    if(!saveOTP){
        return res.status(200).json({status: false, m:"er"})
    }
    
    const mailOptions = {
        from: {
            name: 'Verify OTP',
            address: process.env.EMAIL_USER
        }, // Replace with your sender information
        to: [email],
        subject: 'Your OTP for Verify Admin Login',
        text: `Your one-time password (OTP) for logging in to the Node.js API is: ${newOtp}`,
        html: `<p>Hi, </p></br><p>We received your request for Login on <b>Sell Goods</b></p></br><p>Your one-time-password is: <b style="color: red">${newOtp}</b></p><p>If you didn't request this code, you can safely ignore this email. Someone else might have types your email address by mistake.</p></br><div style="display: grid; grid-template-columns: 1fr"><span>Thanks</span><span>The Sell Goods Teams</span><span>Jaipur, Rajasthan</span></div>`
    };
    const respo = await transporter.sendMail(mailOptions)

    if(!respo){
        return res.status(200).json({status: false, m:"er"})
    } 

    return res.status(200).json({status: true, m:"ss"})
})

const VerifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body

    if(!email || !otp){
        return res.json({status: false, m:"re"})
    }

    const isExists = await Otp.find({email, otp })

    if(!isExists?.length){
        return res.status(200).json({status: false, m:"in"})
    }
    const validTillTime = new Date(isExists?.[0]?.validTill);
    const currentTime = new Date();
    if (validTillTime <= currentTime) {
        await Otp.findOneAndDelete({ email });
        return res.status(200).json({status: false, m:"ex"})
    } 

    await Otp.findOneAndDelete({ email });
    return res.status(200).json({status: true, m: "ss"})
})

const ForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    if(!email ){
        return res.status(200).json({status: false, m:"re"})
    }

    const isExists = await User.find({email})

    if(!isExists?.length){
        return res.status(200).json({status: false, m:"nf"})
    }

    const newOtp = generateOTP()

    const otpCheckRes = await Otp.findOne({email})
    
    if(otpCheckRes){
        await Otp.findOneAndDelete({ email });
        return res.status(200).json({status: false, m:"cl" , field: 'otp'})
    }

    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 2);

    const saveOTP = new Otp({ email, otp: newOtp, validTill: otpExpiry})
    await saveOTP.save();

    if(!saveOTP){
        return res.status(200).json({status: false, m:"er"})
    }
    
    const mailOptions = {
        from: {
            name: 'Reset Password OTP',
            address: process.env.EMAIL_USER
        }, // Replace with your sender information
        to: [email],
        subject: 'Your OTP Resetting Your Password',
        text: `Your one-time password (OTP) for logging in to the Node.js API is: ${newOtp}`,
        html: `<p>Hi, </p></br><p>We received your request for Login on <b>Sell Goods</b></p></br><p>Your one-time-password is: <b style="color: red">${newOtp}</b></p><p>If you didn't request this code, you can safely ignore this email. Someone else might have types your email address by mistake.</p></br><div style="display: grid; grid-template-columns: 1fr"><span>Thanks</span><span>The Sell Goods Teams</span><span>Jaipur, Rajasthan</span></div>`
    };
    const respo = await transporter.sendMail(mailOptions)
    if(!respo){
        return res.status(200).json({status: false, m:"er"})
    } 
    return res.status(200).json({status: true, m:"ss"})
})

const UpdatePassword = asyncHandler(async (req, res) => {
    const { password, email } = req.body

    if(!password || !email){
        return res.status(200).json({status: false, m:"re"})
    }

    const isExists = await User.findOne({ email })
    
    if(!isExists){
        return res.status(200).json({status: false, m:"iv"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    isExists.password = hashedPassword
    await isExists.save()

    return res.status(200).json({status: true, m:"ss"})

})

const ChangePassword = asyncHandler(async (req, res) => {
    const { password, currentPassword, email, id } = req.body

    if(!password || !email || !currentPassword || !id){
        return res.status(200).json({status: false, m:"re"})
    }

    const isExists = await User.findOne({ email, uuid: id }).select('-fullName -email -mobileNo -uuid -referCode -createdAt -updatedAt -__v')
    
    if(!isExists){
        return res.status(200).json({status: false, m:"iv"})
    }
    const passwordMatch = await bcrypt.compare(currentPassword, isExists.password)

    if (!passwordMatch) {
        return res.status(200).json({ status: false, m: "inv" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    isExists.password = hashedPassword
    await isExists.save()

    return res.status(200).json({status: true, m:"ss"})
})

module.exports = { CheckEmailRecord, VerifyOTP, ForgotPassword, UpdatePassword, ChangePassword };
