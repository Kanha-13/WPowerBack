const handelIncommingLocationController = require('../controllers/incommingLocation')
const handelIncommingLocation = (socket) => {
    handelIncommingLocationController.handelIncommingLocation(socket)
    handelIncommingLocationController.handleTypingNotification(socket)
}
module.exports = handelIncommingLocation;