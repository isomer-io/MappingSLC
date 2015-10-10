'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;


///**
// * A Validation function for local strategy properties
// */
//var validateLocalStrategyProperty = function(property) {
//	return ((this.provider !== 'local' && !this.updated) || property.length);
//};

//validate: [validateLocalStrategyProperty, 'Please enter your email, and make sure you have not already signed up with this email.'],
//		match: [/.+\@.+\..+/, 'That doesn\'t look like an emmail address to us. Please make sure you\'re using a valid email address.']


/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	namePrefix: {
		type: String,
		trim: true,
		default: ''
	},
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	},
	zip: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		trim: true,
		required: ''
	},
	newsletter: {
		type: Boolean,
		default: false
	},
	message: {
		type: String,
		required: '',
		trim: true
	},
	read: {
		type: Boolean,
		required: '',
		default: false
	},
	flag: {
		type: Boolean,
		required: '',
		default: false
	}
});

//create virtual attribute for full name
ContactSchema.virtual('fullName').get(function () {
	return this.firstName + ' ' + this.lastName;
});

mongoose.model('Contact', ContactSchema);
