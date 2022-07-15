const userProfile = require("../models/userProfile");

module.exports = {
  createNewUser:async(userDetails)=>{
    try {
      const newUser= new userProfile({
        name:userDetails.name,
        email:userDetails.email,
        emailVerified:true
      })
      const resp= await newUser.save();
      return resp;
    } catch (error) {
      console.log(error)
      return error
    }
  },
  getUser: async(req,res) => {
    const mobileNumber= req.params['mobileNumber'];
    console.log(mobileNumber)
    const user = await userProfile.findOne({mobileNumber:mobileNumber});
    console.log(user)
    res.status(200).json({message:"ok"})
  },
  udateUser: async(req,res) => {
    const email= req.body.email
    const mobileNumber= req.body.mobileNumber
    console.log("in update user")
    if(email===undefined){
      await userProfile.updateOne({mobileNumber:mobileNumber},{mobileVerified:true});
    }else{
      await userProfile.updateOne({email:email},{mobileNumber:mobileNumber,mobileVerified:true});
    }
    res.status(200).json({message:"ok"})
  }
}