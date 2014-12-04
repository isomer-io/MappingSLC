'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var projects = require('../../app/controllers/projects.server.controller');

// Projects Routes
	app.route('/projects')
		.get(projects.list)
		.post(users.requiresLogin, projects.create);

	app.route('/projects/:projectId')
		.get(projects.read)
		.put(users.requiresLogin, projects.hasAuthorization, projects.update)
		.delete(users.requiresLogin, projects.hasAuthorization, projects.delete);

	// Finish by binding the Project middleware
	app.param('projectId', projects.projectByID);


	//todo finish building out Admin Panel on backend
//Admin Routes
	/*
	 app.route('/admins')
	 .get(admins.hasAuthorization, admins.list)
	 .post(users.requiresLogin, admins.hasAuthorization, admins.create);

	 app.route('/admins/:adminId')
	 .get(admins.hasAuthorization, admins.read)
	 .put(users.requiresLogin, admins.hasAuthorization, admins.update)
	 .delete(users.requiresLogin, admins.hasAuthorization, admins.delete);

	 // Finish by binding the Admin middleware
	 app.param('adminId', admins.adminByID);
	 */

// Maps Routes

	/*
	 var keys = require('../../config/env/mapKeys.js');

	 app.route('/mapKeys')
	 .get(function(req, res) {
	 res.jsonp(keys);
	 });
	 */


	//var projectObj = require('../models/project.server.model.js');
	//
	//// Maps Routes
	//app.route('/projectObj')
	//    .get(function(req, res) {
	//        res.jsonp(projectObj);
	//    });
};