'use strict';

//Projects service used to communicate Projects REST endpoints
angular.module('projects').factory('Projects', ['$resource',
	function($resource) {
		return $resource('api/v1/projects/:projectId', {
			projectId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		}, {
			create: {
				method: 'POST'
			}
		}, {
			read: {
				method: 'GET'
			}
		}
		);
	}
]);
