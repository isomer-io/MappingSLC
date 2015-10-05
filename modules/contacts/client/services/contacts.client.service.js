'use strict';

//Contacts service used to communicate Contacts REST endpoints
angular.module('contacts').factory('Contacts', ['$resource',
	function($resource) {
		return $resource('api/v1/contacts/:contactId', { contactId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
