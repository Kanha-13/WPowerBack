const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    require: true
  }
  // isActive: {
  //     type: Boolean,
  //     require: true,
  //     default: false
  // }
})

module.exports = mongoose.model('otps', otpSchema);

