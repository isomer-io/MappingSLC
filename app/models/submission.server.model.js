'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Submission Schema
 */
var SubmissionSchema = new Schema({
	//name, user, bio, and email can be pulled from the user information originally put in
	name: {
		type: String,
		default: '',
		required: 'Please fill Submission name',
		trim: true
	},
    bio: {
        type: String,
        required: 'Tell us about yourself'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        required: 'Please put in your email'
    },
	created: {
		type: Date,
		default: Date.now
	},

    projectTitle: {
        type: String,
        required: 'Please enter a project title'
    },
    neighborhood: {
        type: String,
        required: 'Please put the neighborhood that this happened in'
    },
    map: {
        type: String,
        required: 'Please put coordinates here'
    },
    zipCode: {
        type: Number,
        required: '4 digit zip codes only'
    },
    description: {
        type: String,

    },
    // change this once we know how to have it store files
    fileUpload: {
        type: String
    }

});

mongoose.model('Submission', SubmissionSchema);