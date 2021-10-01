const helpCallConrtroller = require('../controllers/helpCall')
const helpCall = (socket) => {
  helpCallConrtroller.sendHelpCords(socket)
}
module.exports = helpCall;