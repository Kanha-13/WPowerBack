const mongoose = require('mongoose');
const userProfileSchema = new mongoose.Schema({
    socket: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    loc: {
        type: Object
    },
    email: {
        type: String,
    },
    emailVerified:{
        type:Boolean
    },
    mobileVerified:{
        type:Boolean
    },
    mobileNumber: {
        type: String,
        require: true,
    },
    emergencyContacts: [{
        type: String,
    }]
})

module.exports = mongoose.model('users', userProfileSchema);

