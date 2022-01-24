const userProfile = require('../models/userProfile')
module.exports = {
    connectionHandel: async (socket) => {
        try {
            const userMobileNumber = socket.handshake.query.mobileNumber
            const userLatitude = socket.handshake.query.latitude
            const userLongitude = socket.handshake.query.longitude
            console.log("New socket connected...")
            await userProfile.updateOne({ mobileNumber: userMobileNumber }, {
                $set: {
                    mobileNumber: userMobileNumber,
                    socketId: socket.id, loc: { type: "Point", coordinates: [Number(userLongitude), Number(userLatitude)] }
                }
            }, { new: true, upsert: true });
        } catch (error) {
            console.log(error)
            // socket.emit('server-error', { errorMsg: "Server error" })
        }
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