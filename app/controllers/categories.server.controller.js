'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
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
				message = 'Category already exists';
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
 * Create a Category
 */
exports.create = function(req, res) {
	var category = new Category(req.body);
	category.user = req.user;

	category.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(category);
		}
	});
};

/**
 * Show the current Category
 */
exports.read = function(req, res) {
	res.jsonp(req.category);
};

/**
 * Update a Category
 */
exports.update = function(req, res) {
	var category = req.category ;

	category = _.extend(category , req.body);

	category.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(category);
		}
	});
};

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
	var category = req.category ;

	category.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(category);
		}
	});
};

/**
 * List of Categories
 */
exports.list = function(req, res) { Category.find().sort('-created').populate('user', 'displayName').exec(function(err, categories) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(categories);
		}
	});
};

/**
 * Category middleware
 */
exports.categoryByID = function(req, res, next, id) { Category.findById(id).populate('user', 'displayName').exec(function(err, category) {
		if (err) return next(err);
		if (! category) return next(new Error('Failed to load Category ' + id));
		req.category = category ;
		next();
	});
};

/**
 * Category authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.category.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};