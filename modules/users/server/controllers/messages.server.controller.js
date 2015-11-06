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


//exports.subscriber = function (req, res) {
//    User.findOne({
//        'email': req.body.email
//    }).exec(function (err, user) {
//        if (err) {
//            console.log('houston, we got a problem');
//        } else {
//            if (user) {
//                if (user.newsletter == true) {
//                    res.send('you are already signed up for the newsletter!, Thanks')
//                } else {
//                    user.newsletter = true;
//                    user.save(function (err) {
//                        if (err) {
//                            console.log('problem with saving: ', err);
//                        } else {
//                            res.send('user added to newsletter');
//                        }
//                    });
//                }
//            } else {
//                User.create({
//                    firstName: req.body.email,
//                    lastName: req.body.email,
//                    roles: 'user',
//                    username: req.body.email,
//                    email: req.body.email,
//                    newsletter: true
//                }, function (err) {
//                    if (err) {
//                        console.log('crap out: ', err);
//                    } else {
//                        res.send('We made it : ');
//                    }
//                })
//            }
//        }
//    });
//};

//exports.subscriber = function (req, res) {
//    User.findOne({
//        email: req.body.email
//    },function(err, user) {
//       if (err) {
//           var newUser = {
//               body: {
//                   firstName: '',
//                   lastName: '',
//                   username: req.body.email,
//                   email: req.body.email,
//                   newsletter: true
//               }
//           };
//           authenticate.signup(newUser, res);
//
//       }else {}
//    }).exec(function (err, user) {
//        if (err) {
//            //var newUser = {
//            //    body: {
//            //        firstName: '',
//            //        lastName: '',
//            //        username: req.body.email,
//            //        email: req.body.email,
//            //        newsletter: true
//            //    }
//            //};
//            console.log(err);
//
//        } else {
//             console.log('this is the user!!!: ', user);
//            //if (user.newsletter === true) {
//            //    res.send('you are already signed up for the newsletter!, Thanks')
//            //} else {
//            //    user.newsletter = true;
//            //    user.save(function (err) {
//            //        if (err) {
//            //            console.log('problem with saving: ', err);
//            //        } else {
//            //            res.send('user added to newsletter');
//            //        }
//            //    });
//            //}
//
//        }
//    });
//};
exports.subscriber = function (req, res) {
    console.log('de req', req.body);
    User.findOne({
        email: req.body.email
    }).exec(function (err, user) {
        if(err || user) {
            console.log('back end err! line 19');
            if (err) {
                console.log('back end err!');

            } else {
                console.log('back end user baby!', user);
                if (user.newsletter == true) {
                    res.send('you are already signed up for the newsletter!, Thanks')
                } else {
                    user.newsletter = true;
                    user.save(function (err) {
                        if (err) {
                            console.log('problem with saving: ', err);
                        } else {
                            res.send('user added to newsletter');
                        }
                    });
                }

            }

        } else {
            console.log('gimme new user');
            var newUser = {
                body: {
                    firstName: '',
                    lastName: '',
                    username: req.body.email,
                    email: req.body.email,
                    newsletter: true,
                    password: 'ldsChurchMass12!@'
                }
            };
            authenticate.signup(newUser, res);


        }

    });
};
