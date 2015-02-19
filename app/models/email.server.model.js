'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validate Email
 * */

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

/**
 * Email Schema
 */
var EmailSchema = new Schema({
	name: {
		type: String,
		default: '',
        unique:true,
		required: 'Please enter a valid Email address',
        validate:[validateEmail,'Please fill in a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill in a valid email address'],
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}

});

mongoose.model('Email', EmailSchema);