'use strict';

//Maps service used to communicate Maps REST endpoints
angular.module('maps').factory('Maps', ['$resource',
	function($resource) {
		return $resource('maps/:mapId', { mapId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);