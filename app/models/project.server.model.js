'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator'),
	addressValidator = require('address-validator'),
	Address = addressValidator.Address,
	_ = require('underscore');

var validateEmail = function(email){
	return validator.isEmail(email);
};


/**
 * Project Schema
 */
var ProjectSchema = new Schema({
	firstname: {
		type: String,
		default: '',
		required: 'Please fill out first name',
		trim: true
	},
	lastname: {
		type: String,
		default: '',
		required: 'Please fill out last name',
		trim:true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	email: {
		type: String,
		default: '',
		required: '',
		trim: true,
		validate: [validateEmail,'Please inset a correct email']
	},
	story: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	address: {
		type: String,
		default: '',
		required: '',
		trim: true
		// TODO: Add validation for backend will validate addresses on front end
	}
});

mongoose.model('Project', ProjectSchema);