const connectionHandelController = require('../controllers/connection')
const connectionHandel = (socket) => {
    connectionHandelController.connectionHandel(socket)
    connectionHandelController.disconnectionHandel(socket)
}
module.exports = connectionHandel;