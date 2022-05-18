const sendOtp = require('../utils/nodemailer_otp_service')
const otps = require('../models/otps')
const ValidateEmail = async (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}
module.exports = {
  getOtp: async (req, res) => {
    try {
      const email = req.params['emailId']
      const isValid = await ValidateEmail(email);
      if (isValid) {
        await sendOtp.sendOtp(email, (response, error) => {
          console.log("sent otp is ", response.otp)
          const res_data = new otps({
            email: email,
            otp: parseInt(response.otp)
          })
          res_data.save();
          console.log(response)
          res.status(200).json({ message: "OTP sent successfully" })
        })
      } else {
        res.status(401).send("Invalid email provided")
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const email = req.params['emailId']
      const isValid = await ValidateEmail(email);
      if (isValid) {
        const otp = parseInt(req.body.otp)
        if (typeof otp === "number") {
          const response = await otps.deleteOne({ email: email, otp: otp })
          if (response.deleteCount)
            res.status(200).json(response)
          else
            res.status(401).send("Invalid otp provided")
        } else {
          res.status(401).send("Invalid otp provided")
        }
      } else {
        res.status(401).send("Invalid email provided")
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}

