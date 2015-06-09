'use strict';

// retrieve user's profile data from users.model
angular.module('users').factory('UserData', ['$http', '$resource',
	function($http, $resource) {
			return $resource('users/:userId', {userId: '@_id'
			}, {
					update: {
						method: 'PUT'
					}
				});

	}
]);