const iamsafeController = require('../controllers/iamsafe');
const iamsafe = (socket) => {
  iamsafeController.stopMyLocation(socket)
}
module.exports = iamsafe;