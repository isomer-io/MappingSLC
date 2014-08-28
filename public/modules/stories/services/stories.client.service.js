'use strict';

//Stories service used to communicate Stories REST endpoints
angular.module('stories').factory('Stories', ['$resource',
	function($resource) {
		return $resource('stories/:storyId', { storyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);