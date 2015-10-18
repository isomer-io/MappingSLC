/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    profile =  require('./users/users.profile.server.controller'),
    authenticate = require('./users/users.authentication.server.controller'),
    User = mongoose.model('User'),
    _ = require('lodash');

 function _checkForExistingUser (currentUniqueId) {
    User.findOne({
        'email': currentUniqueId
    })
        .exec(function (err, users) {

            console.log('exe made it!\n', users);
            if (err) {
                console.log('err yo! create new user constructor require thingy');
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else if (users === null) {
                console.log('need to create a new user');
                return false;
            } else {
                console.log('here i am', users);
                if (users.email === currentUniqueId) {
                    return true;
                }
            }
        });
};
//Create a user for the Newsletter
exports.subscriber = function (req,res) {
    if (_checkForExistingUser(req.body.email)) {
        req.user = User;
        req.user.newsletter = true;
        profile.update(req,res);

        //User.save(){
        // do code to update newsletter field to true;
        // }



    }else {
        //add defaults for other required fields
        //assign email address to user name
        //User.username = req.body.email;
        authenticate.signup(req,res);
    }
    //var user = new User(req.body);
    //user.email = req.body.email;


};
