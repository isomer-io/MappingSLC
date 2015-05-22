'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};



/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	namePrefix: {
		type: String,
		trim: true,
		default: ''
	},
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	zip: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: '',
		validate: [validateLocalStrategyProperty, 'Please enter your email, and make sure you have not already signed up with this email.'],
		match: [/.+\@.+\..+/, 'That doesn\'t look like an emmail address to us. Please make sure you\'re using a valid email address.']
	},
	newsletter: {
		type: Boolean,
		default: false
	},
	message: {
		type: String,
		required: '',
		trim: true
	}
});

mongoose.model('Contact', ContactSchema);