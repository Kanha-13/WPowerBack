const userProfile = require('../models/userProfile')
module.exports = {
    handelIncommingLocation: (socket) => {
        const connectionFrom = socket.handshake.query.user
        //jo connect hua hai wo emit kiya chat tho ye chalega
        socket.on('location', async (payload) => {
            // io.emit("help", payload)
            console.log(payload)
            socket.broadcast.emit('familyLocation', payload);
            // const userExists = await userProfile.findOne({ name: payload.for })
            // if (userExists) {
            //     const Payload = { ...payload, from: connectionFrom }
            //     io.to(userExists.socketId).emit('chat', Payload)
            //     return
            // }
            // else {
            //     console.log(socket.id)
            //     io.to(socket.id).emit('notfound', "User not found")
            //     return
            // }
        });
    },
    handleTypingNotification: (socket) => {
        socket.on("typing", async (payload) => {
            const connectionFrom = socket.handshake.query.user
            const userExists = await userProfile.findOne({ name: payload.typingFor })
            if (userExists) {
                io.to(userExists.socketId).emit('typing', { name: connectionFrom })
            }
        })
    }
}