'use strict';

// AuthenticationService service for user variables
angular.module('users').factory('AuthenticationService', ['$window', function($window) {
		var auth = {
		user: $window.user
	};
	//console.log('auth service: ', auth);
	return auth;
}]);
