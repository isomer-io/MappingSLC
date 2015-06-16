'use strict';

// AuthenticationService service for user variables
angular.module('users').factory('AdminAuthService', ['$window', 'AuthenticationService',
	function($window, AuthenticationService) {
		var auth = AuthenticationService;
		console.log('auth: ', auth.user);
		if(auth.user != '') {
			var isAdmin = {
				user: $window.user.roles[0]
			};
			return isAdmin;
		} else {
			return 'notAdmin';
		}
	}
]);
