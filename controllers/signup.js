const sendOtp = require('../utils/nodemailer_otp_service')
const otps = require('../models/otps')
const userProfile = require('../models/userProfile')
const { createNewUser } = require('./user')
const ValidateEmail = async (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  // alert("You have entered an invalid email address!")
  return (false)
}
module.exports = {
  getOtp: async (req, res) => {
    try {
      const email = req.params['emailId']
      const isValid = await ValidateEmail(email);
      if (isValid) {
        const user=await userProfile.findOne({email:email})  
        console.log(user)
        if(user){
          if(user.mobileVerified){
            res.status(400).json({error:"user already exist"})
          }else {
            res.status(206).json({error:"user already exist but mobile not verified"})
          }
          return
        }
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
        const userDetails = req.body.user
        if(userDetails.email===undefined||userDetails.name===undefined){
          res.status(400).json({error:"incomplete details provided"})
          return
        }
        if (typeof otp === "number") {
          await otps.deleteOne({ email: email, otp: otp }).then(async(resp)=>{
            if (resp.deletedCount){
              const createUserResp= await createNewUser(userDetails)
              if(createUserResp){
                res.status(200).json(resp)
              }else{
                res.status(500).json({error:"OTP verified, but failed to create user"})
              }
            }
            else
            res.status(401).send("Wrong otp entered");
          })
        } else {
          res.status(401).send("Invalid otp provided")
        }
      } else {
        res.status(401).json({message:"Invalid email provided"})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}

