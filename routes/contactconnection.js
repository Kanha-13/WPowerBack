const handelcontactconnectionController = require('../controllers/contactconnection')
const handelcontactconnection = (socket) => {
    handelcontactconnectionController.checkUserActiveStatus(socket)
}
module.exports = handelcontactconnection;