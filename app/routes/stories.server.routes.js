'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var stories = require('../../app/controllers/stories');

	// Stories Routes
	app.route('/stories')
		.get(stories.list)
		.post(users.requiresLogin, stories.create);

	app.route('/stories/:storyId')
		.get(stories.read)
		.put(users.requiresLogin, stories.hasAuthorization, stories.update)
		.delete(users.requiresLogin, stories.hasAuthorization, stories.delete);

	// Finish by binding the Story middleware
	app.param('storyId', stories.storyByID);
};