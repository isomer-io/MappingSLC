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
		trim: true
	}
	//,
	//title: {
	//	type: String,
	//	default: '',
	//	required: 'Please fill out the name of your project',
	//	trim:true
	//},
	//created: {
	//	type: Date,
	//	default: Date.now
	//},
	//user: {
	//	type: Schema.ObjectId,
	//	ref: 'User'
	//},
	//email: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true,
	//	validate: [validateEmail,'Please insert a correct email']
	//},
	//story: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true
	//},
	//street: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true
    //
	//},
    //
	//city: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true
	//},
    //
	//state: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true
    //
	//},
    //
	//zip: {
	//	type: Number,
	//	default: '',
	//	required: '',
	//	trim: true
	//},
    //
	//url: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true
	//},
    //
	//lat: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true
	//},
    //
    //
	//long: {
	//	type: String,
	//	default: '',
	//	required: '',
	//	trim: true
	//}

});

mongoose.model('Project', ProjectSchema);