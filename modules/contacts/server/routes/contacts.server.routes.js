'use strict';

module.exports = function(app) {
	var contactsPolicy = require('../policies/contacts.server.policy'),
			contacts = require('../controllers/contacts.server.controller');

// Contacts collection routes
	//app.route('/api/v1/contacts').all(contactsPolicy.isAllowed)
	app.route('/api/v1/contacts')
			.get(contacts.list)
			.post(contacts.create);

// Single contact routes
	app.route('/api/v1/contacts/:contactId')
			.get(contacts.read)
			.put(contacts.update)
			.delete(contacts.delete);


	// Finish by binding the Contact middleware
	app.param('contactId', contacts.contactByID);
};
