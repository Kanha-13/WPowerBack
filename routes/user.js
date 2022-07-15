const user = require('../controllers/user');
const router = require('express-promise-router')();

router.route('/user/:mobileNumber')
  .get(user.getUser)
router.route('/user')
  .patch(user.udateUser)
module.exports = router;