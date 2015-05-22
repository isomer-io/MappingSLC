'use strict';

angular.module('users').service('UserDataService', ['$http',
	function($http) {
		// retrieve user's profile data from users.model
		//

		this.getUserData = function(){
			return  $http.get('/userData');
		};
	}
]);