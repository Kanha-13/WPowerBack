const userProfile = require('../models/userProfile')
module.exports = {
    connectionHandel: async (socket) => {
        const userMobileNumber = socket.handshake.query.mobileNumber
        console.log("New socket connected...")
        await userProfile.updateOne({ mobileNumber: userMobileNumber }, { $set: { mobileNumber: userMobileNumber, socketId: socket.id } }, { new: true, upsert: true });
        // const userCount = await userProfile.countDocuments()
        // io.to(socket.id).emit("yourId", { id: userCount });
        // socket.broadcast.emit("IamOnline", { mobileNumber: userMobileNumber });
    },
    disconnectionHandel: (socket) => {
        // socket.on('disconnect', async () => {
        //     const userMobileNumber = socket.handshake.query.user
        //     await userProfile.updateOne({ name: userMobileNumber }, { $set: { isActive: false } })
        //     socket.broadcast.emit("IamOffline", { userName: userMobileNumber });
        //     console.log("user disconnected")
        // })
    },

}