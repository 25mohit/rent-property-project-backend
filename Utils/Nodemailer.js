const nodemailer = require('nodemailer');

const generateOTP = () => {
    return Math.floor(Math.random() * 9000) + 1000;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Adjust based on your SMTP server configuration
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// async function InitiateEmail() {
   
    // await transporter.sendMail(mailOptions);
// }

module.exports = {transporter, generateOTP};