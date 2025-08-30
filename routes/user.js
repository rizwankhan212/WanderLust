const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');
const { saveUrl } = require('../middleware/Middleware.js');
const userController = require('../controllers/users.js');
const user = require('../models/user.js');

router.route('/signup')
    .get( userController.renderSignup)
    .post( wrapAsync(userController.signup));


router.route('/login')
    .get( userController.renderLogin)
    .post(saveUrl, 
    passport.authenticate('local', {
    failureFlash: true, failureRedirect: '/login'
}), wrapAsync(userController.login));

router.get('/logout',userController.logout);
module.exports = router;