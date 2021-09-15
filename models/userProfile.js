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
    location: {
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        }
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

