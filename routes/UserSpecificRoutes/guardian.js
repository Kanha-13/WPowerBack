const guardian = require('../../controllers/guardian');
const router = require('express-promise-router')();

router.route('/guardians')
  .get(guardian.getGuardians)
// .post(guardian.addGuardians)
module.exports = router;