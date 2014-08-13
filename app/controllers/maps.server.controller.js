'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Map = mongoose.model('Map'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Map already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Map
 */
exports.create = function(req, res) {
	var map = new Map(req.body);
	map.user = req.user;

	map.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(map);
		}
	});
};

/**
 * Show the current Map
 */
exports.read = function(req, res) {
	res.jsonp(req.map);
};

/**
 * Update a Map
 */
exports.update = function(req, res) {
	var map = req.map ;

	map = _.extend(map , req.body);

	map.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(map);
		}
	});
};

/**
 * Delete an Map
 */
exports.delete = function(req, res) {
	var map = req.map ;

	map.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(map);
		}
	});
};

/**
 * List of Maps
 */
exports.list = function(req, res) { Map.find().sort('-created').populate('user', 'displayName').exec(function(err, maps) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(maps);
		}
	});
};

/**
 * Map middleware
 */
exports.mapByID = function(req, res, next, id) { Map.findById(id).populate('user', 'displayName').exec(function(err, map) {
		if (err) return next(err);
		if (! map) return next(new Error('Failed to load Map ' + id));
		req.map = map ;
		next();
	});
};

/**
 * Map authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.map.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};