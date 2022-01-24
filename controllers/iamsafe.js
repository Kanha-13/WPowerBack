module.exports = {
  stopMyLocation: (socket) => {
    socket.on("iamsafe", async (payload) => {
      console.log("got stopping req")
      socket.broadcast.emit('iamsafe', { id: socket.id });
    })
  }
}