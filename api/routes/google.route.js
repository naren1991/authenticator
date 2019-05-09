const google = require('../controllers/google.controller.js');

router = require('express').Router();

const passport = require('passport')
var auth = require('../config/auth-google.config.js')
auth(passport);
router.use(passport.initialize());

console.log('Passport initialized')
    
router.get('/google', google.authenticate);

router.get('/google/callback', google.callback);

module.exports = router;