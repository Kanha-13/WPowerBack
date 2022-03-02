const helpCallConrtroller = require('../controllers/helpCall')
const helpCall = (socket, io) => {
  helpCallConrtroller.sendHelpCords(socket, io)
  helpCallConrtroller.createHelpRoom(socket, io)
}
module.exports = helpCall;