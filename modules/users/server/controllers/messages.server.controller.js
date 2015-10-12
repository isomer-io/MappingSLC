/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    User = mongoose.model('User'),
    _ = require('lodash');

 function _checkForExistingUser (currentUniqueId) {
    User.find({
        'user.email': req.body.email
    })
        .exec(function (err, users) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log(users);
                if (users.email === currentUniqueId) {
                    return true;
                }
            }
        });
};
//Create a user for the Newsletter
exports.subscriber = function (req,res) {
    var user = new User(req.body);
    user.email = req.body.email;
    function saveUser(){
        user.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(user);
            }
        });
    }

    User.findOne({
        'user.email': req.body.email
    })
        .exec(function (err, users) {
            if (err) {

                return res.status(400).send({

                    message: errorHandler.getErrorMessage(err)
                });
            } else {

                if (user.email === req.body.email) {
                    console.log('Its unique!');
                    saveUser();
                }
            }
        });



};
