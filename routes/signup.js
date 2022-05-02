const signup = require('../controllers/signup');
const router = require('express-promise-router')();

router.route('/signup/:emailId')
  .get(signup.getOtp)
  .post(signup.verifyOtp)
// .post(guardian.addGuardians)
module.exports = router;