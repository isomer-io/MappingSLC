'use strict';

// Authentication service for user variables
angular.module('users').factory('AdminAuthService', ['$window', 'Authentication',
	function($window, Authentication) {
		var auth = Authentication;
		if(auth.user !== '') {
			var isAdmin = {
				user: $window.user.roles[0]
			};
			console.log('isAdmin.user', isAdmin.user);
			return isAdmin;
		} else {
			return 'notAdmin';
		}
	}
]);
