'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill category title',
		trim: true
	},
    description: {
        type: String,
        default:'',
        trim: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Category', CategorySchema);