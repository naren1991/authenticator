const passport = require('passport')
const authConsumer = require('../../comms/consumers/auth.consumers.js')

exports.authenticate = (req, res) => {
    console.log("start auth")
    /*passport.authenticate('google', {
        scope: ['profile', 'email']
    })*/
    //TODO: Implement and test Auth with google
    console.log(req)
    module.exports.callback (req, res)
    console.log("auth request sent")
};

exports.callback = (req, res) => {
    console.log("calling back")
    //TODO: Pass request/ response correctly
    authConsumer.onSuccessfulAuth(req)
 /*   passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log("authenticated")
        console.log(res)
    }*/


};