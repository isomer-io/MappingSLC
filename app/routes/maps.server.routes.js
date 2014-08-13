'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var maps = require('../../app/controllers/maps');

	// Maps Routes
	app.route('/maps')
		.get(maps.list)
		.post(users.requiresLogin, maps.create);

	app.route('/maps/:mapId')
		.get(maps.read)
		.put(users.requiresLogin, maps.hasAuthorization, maps.update)
		.delete(users.requiresLogin, maps.hasAuthorization, maps.delete);

	// Finish by binding the Map middleware
	app.param('mapId', maps.mapByID);
};