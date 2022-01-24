const userProfile = require('../models/userProfile')

module.exports = {
  sendHelpCords: (socket) => {
    socket.on("help", async (payload) => {
      const nearByUser = await userProfile.find({
        loc:
        {
          $nearSphere:
          {
            $geometry: { type: "Point", coordinates: [payload.longitude, payload.latitude] },
            $minDistance: 0000,
            $maxDistance: 10000
          }
        }
      })
      console.log(nearByUser)
      console.log("recieved")
      socket.broadcast.emit('help', { cords: payload, id: socket.id });
    })
  }
}