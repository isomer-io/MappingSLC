'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator'),
	_ = require('underscore'),
	mongoosastic = require('mongoosastic');

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
		trim: true
	},
	lastname: {
		type: String,
		default: '',
		trim:true
	},
	status: {
		type: String,
		default: 'Pending'
	},
	created: {
		type: Date,
		default: Date.now
	},
	createdBy: {
		type: String,
		default: ''
		//todo test function that auto-generates current user to make sure it works
		//default: (function(currentUser){
		//	this.Schema.user = currentUser;
		//})
	},
	modified: {
		type: Date,
		default: Date.now
	},
	modifiedBy: {
		type: String,
		default: ''
		//todo test function that auto-generates current user to make sure it works
		//default: (function(currentUser){
		//	this.Schema.user = currentUser;
		//})
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	email: {
		type: String,
		default: '',
		trim: true,
		validate: [validateEmail,'Please insert a correct email']
	},
	street: {
		type: String,
		default: '',
		required: '',
		trim: true
		// TODO: Add validation for backend will validate addresses on front end
	},
	city: {
		type: String,
		default: 'Salt Lake City',
		trim: true
	},
	state: {
		type: String,
		default: 'Utah',
		trim: true
	},
	zip: {
		type: Number,
		default: '',
		required: '',
		trim: true
	},
	story: {
		type: String,
		es_indexed: true,
		default: 'Enter and format your project here',
		required: '',
		trim: true
	},
	title: {
		type: String,
		es_indexed: true,
		default: '',
		required: 'Please fill out the title of your submission',
		trim:true
	},
	url: {
		type: String,
		default: '',
		trim: true
	},
	lat: {
		type: Number,
		default: '',
		trim: true
	},
	lng: {
		type: Number,
		default: '',
		trim: true
	},

	//stores a static map image, created on new project creation
	//calls from mapbox web services static map image:
	//https://www.mapbox.com/developers/api/static/#images
	mapImage: {
		type: String,
		default: '',
		trim: true
	}
});

// Using Mongoosastic to watch what's going on with the MongoDB server and feeding into Elastic Search

ProjectSchema.plugin(mongoosastic);

// Add model

var Project = mongoose.model('Project', ProjectSchema)
	, stream =Project.synchronize()
	, count = 0;

stream.on('data', function(err, doc){
	count++;
});
stream.on('close', function(){
	console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
	//console.log(err);
});

