const router = require('express').Router();

const userService = require('../users/user.controller');

router.post('/signup', userService.userRegistration);
// router.post('/userlogin', userService.userLogin);
router.post('/userlogout', userService.userLogout);
router.get('/activateuser/:link', userService.userActivation);
router.get('/refreshtoken', userService.userTokenRefresh);
router.get('/testlogin', userService.testLogin);

module.exports = router;
