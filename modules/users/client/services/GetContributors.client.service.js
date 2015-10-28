'use strict';

// retrieve all contributors' and admins' profile data from users.model

angular.module('users').service('GetContributors', ['$http',
	function($http) {
		this.contributors = function(){
			return $http.get('/api/v1/contributors');
		};
	}
]);
