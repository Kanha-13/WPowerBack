const nodemailer = require('nodemailer');
const secret = require('../Secret')
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: secret.email,
    pass: secret.password
  }
});

const mailOptions = (emailTo, otp) => {
  return {
    from: 'wpower1091@outlook.com',
    to: emailTo,
    subject: 'Otp for ourcommunity app',
    html: `<p>Dear User,</p>
    <p><h3>${otp}</h3> is the OTP for the validation of your email.</p>
    <p>Note: Never share your password or otp with anyone.</p>
    <p>Thank you,</p>
    <p>Team OurCommunity</p>
    `
  }
};

const generateOtp = () => {
  let gen = n => "x".repeat(n).replace(/x/g, x => Math.random() * 10 | 0)
  return (1 + Math.random() * 9 | 0) + gen(5)
}
module.exports = {
  sendOtp: async (emailTo, callBack) => {
    let otp = generateOtp();
    transporter.sendMail(mailOptions(emailTo, otp), function (error, info) {
      if (error) {
        console.log("Error while sending otp ", error);
      } else {
        const response = { otp: otp, message: info.response }
        callBack(response)
        console.log("Logging for success otp send in nodemailer_otp_service", response)
        return 123456
        // return response.otp
      }
    });

  }
}