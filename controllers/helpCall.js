const { io } = require('../server');
const userProfile = require('../models/userProfile')

module.exports = {
  sendHelpCords: (socket, io) => {
    socket.on("help", async (payload) => {
      // console.log(socket.clients(payload.mobileNumber))
      console.log(io.sockets)
      console.log("recieved")
      // socket.broadcast.emit('help', { cords: payload.cords, id: socket.id });
      // io.to(payload.mobileNumber).emit("help", { cords: payload.cords, id: socket.id });
      socket.in(payload.mobileNumber).emit("help", { cords: payload.cords, id: socket.id });
    })
  },
  createHelpRoom: (socket, io) => {
    socket.on("create-help-room", async (payload) => {
      const nearByUser = await userProfile.find({
        loc:
        {
          $nearSphere:
          {
            $geometry: { type: "Point", coordinates: [payload.cords.longitude, payload.cords.latitude] },
            $minDistance: 0000,
            $maxDistance: 10000
          }
        }
      })
      nearByUser.map(user => {
        if (JSON.parse(user.socket).id === socket.id) {
        }
        else {
          user.socket.id.join(payload.mobileNumber);
        }
      })
    })
  }
}