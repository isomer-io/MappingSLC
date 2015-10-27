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

                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else if (users === null) {
                return false;
            } else {

                if (users._doc.email === currentUniqueId) {
                    return true;
                }
            }
        });
};
//Create a user for the Newsletter
exports.subscriber = function (req,res) {
    if (_checkForExistingUser(req.body.email)) {

        if (req.user.newsletter == false){
            req.user.newsletter = true;
        }
        User.save(function(err){
            if (err) {
                console.log('Houston we got a problem: ', err);
            }else {
                res.json(req.user);
            }
        })
        //profile.update(req,res);

      //res.json(req.user);



    }else {
        //add defaults for other required fields
        //assign email address to user name
        var user = new User({username: req.body.email});
        user.newsletter = true;
        user.email = req.body.email;
        delete req.body.roles;
        console.log('new user: ' ,user);
        user.save(function(err){
            if (err){
                console.log('i gotta an error: ', err);
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }else {
                res.json(user);
            }
        })
        //res.json(user);
        //authenticate.signup(req,res);
    }
    //var user = new User(req.body);
    //user.email = req.body.email;


};
