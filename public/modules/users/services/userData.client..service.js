'use strict';

// retrieve user's profile data from users.model

angular.module('users').factory('UserData', ['$resource',
	function($resource) {
		return $resource('users/:userId', {userId: '@_id'}, {
			update: {
				method: 'PUT'
			}
		});

	}
]);