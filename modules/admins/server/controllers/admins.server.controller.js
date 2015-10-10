'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Admin = mongoose.model('Admin'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a admin
 */
exports.create = function (req, res) {
  var admin = new Admin(req.body);
  admin.user = req.user;

  admin.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(admin);
    }
  });
};

/**
 * Show the current admin
 */
exports.read = function (req, res) {
  res.json(req.admin);
};

/**
 * Update a admin
 */
exports.update = function (req, res) {
  var admin = req.admin;

  admin.title = req.body.title;
  admin.content = req.body.content;

  admin.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(admin);
    }
  });
};

/**
 * Delete an admin
 */
exports.delete = function (req, res) {
  var admin = req.admin;

  admin.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(admin);
    }
  });
};

/**
 * List of Admins
 */
exports.list = function (req, res) {
  Admin.find().sort('-created').populate('user', 'displayName').exec(function (err, admins) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(admins);
    }
  });
};

/**
 * Admin middleware
 */
exports.adminByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Admin is invalid'
    });
  }

  Admin.findById(id).populate('user', 'displayName').exec(function (err, admin) {
    if (err) {
      return next(err);
    } else if (!admin) {
      return res.status(404).send({
        message: 'No admin with that identifier has been found'
      });
    }
    req.admin = admin;
    next();
  });
};
