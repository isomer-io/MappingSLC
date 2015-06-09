'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	users = require('../../app/controllers/users.server.controller'),
	uuid = require('node-uuid'),
	multiparty = require('multiparty'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Project = mongoose.model('Project'),
	User = mongoose.model('User'),
	_ = require('lodash');



exports.fileUploader = function(req,res){
	//console.log('req: ', req);
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		console.log('err: ', err);
		console.log('fields: ', fields);
		console.log('files: ', files);
		var file = files.file[0];
		//console.log('files.file.length: ', files.file.length);
		console.log('files.file[0]: ', files.file[0]);
		var contentType = file.headers['content-type'];
		var tmpPath = file.path;
		//get the file extension type
		var extIndex = tmpPath.lastIndexOf('.');
		var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
		// generate a unique filename
		var fileName = uuid.v4() + extension;
		var destPath = 'app/uploads/users/' + fileName;
		//var destPath = 'public/modules/core/uploads/' + fileName;
		console.log('response: ', res);

		// Server side file type checker.
		if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
			fs.unlink(tmpPath);
			return res.status(400).send('Unsupported file type.');
		}

		var inputStream = fs.createReadStream(tmpPath);
		var outputStream = fs.createWriteStream(destPath);

		if(inputStream.pipe(outputStream)) {
			fs.unlink(tmpPath, function (err) { //To unlink the file from temp path after copy
				if (err) {
					console.log(err);
				}
			});

			return res.json(destPath);
		}else
			return res.json('File not uploaded');
	});
};



/**
 * read the uploaded files from the user model
 */
exports.read = function(req, res) {
	res.jsonp(req.user);
};


/**
 * List of Uploaded Files from User Model
 */
exports.list = function(req, res) {
	//run a query in mongoose
	User.find()
		.sort('-created')
		.populate('user', 'profilePic')
		.exec(function(err, users) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(users);
			}
		});
};