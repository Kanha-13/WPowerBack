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
})

module.exports = mongoose.model('otps', otpSchema);

