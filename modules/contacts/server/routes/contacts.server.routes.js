'use strict';

module.exports = function(app) {
	var contactsPolicy = require('../policies/contacts.server.policy'),
			//users = require('../../../users/server/controllers/users.server.controller.js'),
			contacts = require('../controllers/contacts.server.controller');

	//// Contacts Routes
	//app.route('/contacts')
	//	.get(contacts.list)
	//	.post(users.requiresLogin, contacts.create);
  //
	//app.route('/contacts/:contactId')
	//	.get(contacts.read)
	//	.put(users.requiresLogin, contacts.hasAuthorization, contacts.update)
	//	.delete(users.requiresLogin, contacts.hasAuthorization, contacts.delete);

// Contacts collection routes
	app.route('/api/v1/contacts').all(contactsPolicy.isAllowed)
			.get(contacts.list)
			.post(contacts.create);

// Single contact routes
	app.route('/api/v1/contacts/:contactId').all(contactsPolicy.isAllowed)
			.get(contacts.read)
			.put(contacts.update)
			.delete(contacts.delete);


	// Finish by binding the Contact middleware
	app.param('contactId', contacts.contactByID);
};
