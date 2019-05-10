const passport = require('passport')
const googleTask = require('../../tasks/auth-google.task.js')

var _this = this;

// REST APIs
exports.authenticate = (req, res) => {
    var response = googleTask.authenticate(req);
    res.send(response)    
};

exports.callback = (req, res) => {
    var response = googleTask.callback(req)
    res.send(response)
    
};