// const userProfile=require('../models/u')
const userProfile = require('../models/userProfile')
module.exports = {
    checkUserActiveStatus: (socket) => {
        socket.on("checkUserActive", async (payload) => {
            const userStatus = await userProfile.findOne({ name: payload.userName })
            if (userStatus) {
                io.to(socket.id).emit("userActiveStatus", { name: userStatus.name, status: userStatus.isActive })
            }
            else {
                io.to(socket.id).emit("userActiveStatus", { name: payload.userName, status: "User Not Registered" })
            }
        })
    }
}