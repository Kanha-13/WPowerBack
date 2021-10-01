module.exports = {
  sendHelpCords: (socket) => {
    socket.on("help", async (payload) => {
      console.log("recieved")
      io.emit('help', payload);
    })
  }
}