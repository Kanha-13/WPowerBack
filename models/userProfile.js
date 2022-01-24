const mongoose = require('mongoose');
const userProfileSchema = new mongoose.Schema({
    socketId: {
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
    mobileNumber: {
        type: String,
        require: true,
    },
    emergencyContacts: [{
        type: String,
    }]
    // isActive: {
    //     type: Boolean,
    //     require: true,
    //     default: false
    // }
})

module.exports = mongoose.model('users', userProfileSchema);

