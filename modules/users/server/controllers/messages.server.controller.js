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

 function checkForExistingUser (currentUniqueId) {
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
                    console.log('not a new email!!!');
                    return true;
                }
            }
        });
};
//Create a user for the Newsletter
exports.subscriber = function (req,res) {
    User.findOne({
        'email': req.body.email
    }).exec(function (err, user) {
        if (err) {
            console.log('houston, we got a problem');
        } else {
            if (user) {
                if (user.newsletter == true){
                    res.send('you are already signed up for the newsletter!, Thanks')
                }else{
                    user.newsletter = true;
                    user.save(function (err) {
                        if (err) {
                            console.log('problem with saving: ', err);
                        } else {
                            res.send('user added to newsletter');
                        }
                    });
                }
            } else {
                var newsletteruser = new User();
                delete newsletteruser.roles;
                newsletteruser.newsletter = true;
                newsletteruser.email = req.body.email;
                console.log(newsletteruser);
                newsletteruser.save(function (err) {
                    if (err) {
                        console.log('new user could not save: ', user);
                    } else {
                        req.send('New user added to DATABASE!!!');
                    }
                })
            }
        }
    });
};
//    if (checkForExistingUser(req.body.email)) {
//                console.log('old user');
//        if (req.user.newsletter == false){
//            req.user.newsletter = true;
//            User.save(function(err){
//                if (err) {
//                    console.log('Houston we got a problem: ', err);
//                }else {
//                    res.json(req.user);
//                }
//            });
//        }
//
//    }else {
//        console.log('this is if its a new user');
//        var user = new User({username: req.body.email});
//        user.newsletter = true;
//        user.email = req.body.email;
//        delete req.body.roles;
//        console.log('new user: ' ,user);
//        user.save(function(err){
//            if (err){
//                console.log('i gotta an error: ', err);
//                return res.status(400).send({
//                    message: errorHandler.getErrorMessage(err)
//                });
//            }else {
//                res.json(user);
//            }
//        });
//
//    }
//};
