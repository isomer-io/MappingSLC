'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
		mongoose = require('mongoose'),
		errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
		Project = mongoose.model('Project'),
		_ = require('lodash'),
		keys = require('../../../users/server/config/private/keys.js'),
		AlchemyAPI = require('alchemy-api'),
		alchemyapi = new AlchemyAPI(keys.alchemyKey),
		sanitizeHtml = require('sanitize-html');
		//Promise = require('bluebird'),
		//fs = Promise.promisifyAll(require('fs')),
		//exports = Promise.promisifyAll(exports);
//
//
//
//var options = {};
//
//var current = Promise.resolve();
//Promise.map(URLs, function(URL) {
//	current = current.then(function () {
//		return needle.getAsync(URL, options);
//	});
//	return current;
//}).map(function(responseAndBody){
//	return JSON.parse(responseAndBody[1]);
//}).then(function (results) {
//	return processAndSaveAllInDB(results);
//});
//
//
//fs.readFileAsync(inputFile)
//	.then(Promise.promisify(process1))
//	.then(Promise.promisify(process2))
//	.then(Promise.promisify(process3))
//	.then(fs.writeFileAsync.bind(fs, outputFile))
//	.then(function(data) {
//		res.status(200).send('processed successfully using bluebird promises');
//	})
//	.catch(function(err) {
//		res.status(500).send(err);
//	});
var projectKeywords = {};


/**
 * Create a Project
 */
exports.create = function (req, res) {
	//console.log('!!!!project create req: \n', req);
	var project = new Project(req.body);
	//var dirty = req.body.story;
	//var nlpText = sanitizeHtml(dirty);

	//todo hookup keyword analysis again
	//alchemyapi.keywords('text', nlpText, {'sentiment': 0},
	//	function (response) {
	//		project.keywords = response.keywords;
			project.user = req.user;

			project.save(function (err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(project);
				}
			});
		//}
	//);
};

/**
 * Show the current Project
 */
exports.read = function (req, res) {
	res.jsonp(req.project);
};

/**
 * Update a Project
 */
exports.update = function (req, res) {
	var project = req.project;

	project = _.extend(project, req.body);

	project.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * Delete an Project
 */
exports.delete = function (req, res) {
	var project = req.project;

	project.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * List of Projects
 *
 * .find({ "invitees._id": req.query.invitation_id })
 * .populate('invitees.user')
 *
 */
exports.list = function (req, res) {
	//run a query in mongoose
	//Project.find(
	//{'projects._id': req.query.}
	//)
	Project.find()
		.sort('-created')
		.populate('user')
		.exec(function (err, projects) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				//projects.user;
				//console.log('projects.user', projects.user);
				res.jsonp(projects);
			}
		});
};

/**
 * List of Projects with status "published"
 *
 * .find({ "invitees._id": req.query.invitation_id })
 * .populate('invitees.user')
 *
 */
exports.listPublished = function (req, res) {
	//req.params
	Project.find({
		'status.type': 'published'
	})
			.sort('-created')
			.populate('user')
			.exec(function (err, projects) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					//projects.user;
					console.log('published projects:\n', projects);
					res.jsonp(projects);
				}
			});
};


/**
 * List of GeoCoordinates for Projects
 */
exports.markerList = function (req, res) {
	Project.find()
		.sort('-created')
		//.populate('status', 'lat', 'lng')
		.exec(function (err, projects) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				//var lng = [];
				//for(var prop in projects) {
				//console.log('projects.lng: ' + prop + ' \n', projects[prop].lng);
				//console.log('projects.lng: \n', projects[prop].lng);
				//console.log('lng: \n', projects[0].lng);
				//res.jsonp(projects[prop].lng);
				//lng = lng.push(projects[prop].lng);
				//console.log('lng: \n', lng);
				//}
				//return lng;
				//console.log('projects: ', projects);
				res.jsonp(projects);
			}
		});
};

/**
 * Project middleware
 */
exports.projectByID = function (req, res, next, id) {
	Project.findById(id)
		.populate('user')
		.exec(function (err, project) {
			if (err) return next(err);
			if (!project) return next(new Error('Failed to load Project ' + id));
			req.project = project;
			next();
		});
};

/**
 * Project authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
	if (req.project.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

/**
 * Alchemy API for NLP
 **/

exports.nlpProjects = function (req, res) {
	var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my app!";
	alchemyapi.sentiment("text", myText, {}, function (response) {
		console.log("Sentiment: " + response["docSentiment"]["type"]);
	});
};

//var nlpSampleText = 'My father worked for the Union Pacific railroad for nearly thirty-five years. For most of my life, he was a yardmaster , a job that entailed maintaining perpetual radio contact with trains approaching and departing the railyard, ensuring that there were no accidents and that the endless train traffic was routed for unloading, repair, or continuation as efficiently as possible. Much like an air traffic controller, he worked in a tower. It was perhaps six or seven stories tall, straddled by tracks on either side, and it gave him a birds-eye view of the yard and nearly every human, animal, or mechanical movement within it. Every day for most of his working life, he climbed the zig-zagging stories of steel grate stairs to the small box overlooking an enormous hub of simultaneous movement and stagnation, the flux of capitalism and the slow rot of industry. Since the day he retired over eight years ago, I have never heard him utter a word about his career or workplace unless asked about it. When told that Top End, the yard in which he worked most of his career, was shutting down and that his tower would be demolished to make way for an enormous Utah Transit Authority hub, he merely shrugged and moved on to the Roper Yard in South Salt Lake, where he spent a couple more years guiding trains.';

//exports.nlpEngine = function (req, res, output) {
//var nlpEngine = function (req, res, output) {

//var getKeywords = function() {
//	alchemyapi.keywords('text', nlpSampleText, {'sentiment': 0},
//		function (response) {
//			var projectKeywords = response.keywords;
//			return projectKeywords;
//			//console.log('response 1: ', projectKeywords);
//		}
//	);
//};
