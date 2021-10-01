module.exports = {
  sendHelpCords: (socket) => {
    socket.on("help", async (payload) => {
      console.log("recieved")
      socket.broadcast.emit('help', payload);
    })
  }
}