const userProfileController = require('../controllers/userProfile')
const userProfile = (socket) => {
  userProfileController.getMyProfile(socket)
  userProfileController.updateMyProfile(socket)
}
module.exports = userProfile;