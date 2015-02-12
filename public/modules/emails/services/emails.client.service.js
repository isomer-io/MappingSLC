'use strict';

//Emails service used to communicate Emails REST endpoints
angular.module('emails').factory('Emails', ['$resource',
	function($resource) {
		return $resource('emails/:emailId', { emailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);