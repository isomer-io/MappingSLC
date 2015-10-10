'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Contact = mongoose.model('Contact'),
  User = mongoose.model('User'),
  _ = require('lodash');

var _checkForExistingUser = function (currentUniqueId) {
  User.find({
      'users._id': req.query
    })
    .exec(function (err, users) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        if (users.email === currentUniqueId) {
          return true;
        }
      }
    });
};


/**
 * Create a Contact
 */
exports.create = function (req, res) {
  var contact = new Contact(req.body);
  contact.user = req.user;

  if(req.user._doc._id){  //determine whether user is logged in
    if(req.body.email === req.user._doc.email){    //if true, then put message to current user's document

    }else{    //

    }
  }
  else if(_checkForExistingUser(req.body.email)){
    console.log('update!');
    // if checkForExistingUser() is true, then user already exists
    // and we'll make a put on that document
  }else{
    console.log('create!');
    // if user does not exist, we'll create a new User document
    // and, in either case, we will save the message,
    // and send it to the admin panel
  }
  contact.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contact);
    }
  });
};

/**
 * Show the current Contact
 */
exports.read = function (req, res) {
  res.jsonp(req.contact);
};

/**
 * Update a Contact
 */
exports.update = function (req, res) {
  var contact = req.contact;

  contact = _.extend(contact, req.body);

  contact.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contact);
    }
  });
};

/**
 * Delete an Contact
 */
exports.delete = function (req, res) {
  var contact = req.contact;

  contact.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contact);
    }
  });
};

/**
 * List of Contacts
 */
exports.list = function (req, res) {
  Contact.find().sort('-created').populate('user', 'displayName').exec(function (err, contacts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contacts);
    }
  });
};

/**
 * Contact middleware
 */
exports.contactByID = function (req, res, next, id) {
  Contact.findById(id).populate('user', 'displayName').exec(function (err, contact) {
    if (err) return next(err);
    if (!contact) return next(new Error('Failed to load Contact ' + id));
    req.contact = contact;
    next();
  });
};

/**
 * Contact authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
  if (req.contact.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
