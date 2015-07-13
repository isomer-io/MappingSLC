'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Create a User
 */
exports.create = function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Update a User
 */
exports.update = function(req, res) {
    var user = req.currentUser;

    user = _.extend(user, req.body);
	user.updated = Date.now();

    user.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Delete an User
 */
exports.delete = function(req, res) {
    var user = req.currentUser;

    user.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * List of Users
 */
exports.list = function(req, res) {
	User.find(req.query).sort('-firstName').exec(function(err, users) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(users);
        }
    });
};

exports.contributors = function(req, res) {
    var query = User.find(req.query);
    query.or([{ roles: 'contributor' }, { roles: 'admin' }])
        .sort('-lastName')
        .exec( function (err,users) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(users);
            }
        });
};


exports.profileImage = function(req, res, id) {
    var UserImg = req.user;
    UserImg.findById(id)
        .exec(function (err, user) {
            if (err) return next(err);
            if (!User) return next(new Error('Failed to load User Profile ' + id));
            req.user = user;
        });
};


/**
 * Show the current Project
 */
exports.read = function(req, res) {
    res.jsonp(req.user);
};

/**
 * Get User Schema
 */
exports.getSchema = function(req, res) {
	var disabledFields = ['password', 'salt', 'providerData', 'additionalProvidersData', '__v'];
	var output = [];

	User.schema.eachPath(function(pathName, path) {
		if(pathName.length && !_.contains(disabledFields, pathName)) {
			output.push(path);
		}
	});

    res.jsonp(output);
};

/**
 * User middleware
 *
 * Find this method in users.authentication.server.controller.js
 *
**/
exports.userByID = function(req, res, next, id) {
    console.log('working. req, res, next, id : ', req, res, next, id);
    User.findById(id).exec(function(err, user) {
    //User.findById(id).populate('user', 'displayName').exec(function(err, user) {
    //User.find(req.query).sort('-firstName').exec(function(err, users) {
        console.log('err, user: ', err, user);
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.currentUser = user;
        next();
    });
};


/**
 * Find Single User by ID
 */
exports.findUser = function(req, res) {
    //console.log(req.query);
    User.findOne(req.query).sort('-firstName').exec(function(err, users) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(users);
        }
    });
};



/**
 * Admin authorization middleware
 */
exports.isAdmin = function(req, res, next) {
    if (req.user && req.user.roles && _.contains(req.user.roles, 'admin')) {
        return next();
    } else {
        return res.send(403, 'You are not an admin!');
    }
};