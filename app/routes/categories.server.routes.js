'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var categories = require('../../app/controllers/categories');

	// Categories Routes
	app.route('/categories')
		.get(categories.list)
		.post(users.requiresLogin, categories.create);

	app.route('/categories/:categoryId')
		.get(categories.read)
		.put(users.requiresLogin, categories.hasAuthorization, categories.update)
		.delete(users.requiresLogin, categories.hasAuthorization, categories.delete);

	// Finish by binding the Category middleware
	app.param('categoryId', categories.categoryByID);
};