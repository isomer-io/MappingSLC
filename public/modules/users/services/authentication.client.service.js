'use strict';

// AuthenticationService service for user variables
angular.module('users').factory('AuthenticationService', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);
